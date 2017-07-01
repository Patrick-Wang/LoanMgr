package com.bank.debt.service.attachement;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.dao.attachement.AttachementDao;
import com.bank.debt.model.dao.attachement.AttachementDaoImpl;
import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.protocol.entity.Attachement;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.error.ErrorCode;
import com.bank.debt.protocol.tools.map.AttachMapping;
import com.bank.debt.protocol.tools.map.Mapper;
import com.bank.debt.service.service.ftp.FtpService;

@Service(AttachementServiceImpl.NAME)
@Transactional("transaction")
public class AttachementServiceImpl implements AttachementService, Runnable {
	@Resource(name = AttachementDaoImpl.NAME)
	AttachementDao attachementDao;

	@Autowired
	FtpService ftpService;

	@Value("${attachment.querytask.timeout}")
    private Long maxQueryTime;
	
	class AttachQueryTask{
		String displayName;
		OnGetAttachement notification;
		Long startTime;
		public AttachQueryTask(String displayName, OnGetAttachement notification) {
			super();
			this.displayName = displayName;
			this.notification = notification;
			this.startTime = System.currentTimeMillis();
		}
		public String getDisplayName() {
			return displayName;
		}
		public void setDisplayName(String displayName) {
			this.displayName = displayName;
		}
		public OnGetAttachement getNotification() {
			return notification;
		}
		public void setNotification(OnGetAttachement notification) {
			this.notification = notification;
		}
		public Long getStartTime() {
			return startTime;
		}
		public void setStartTime(Long startTime) {
			this.startTime = startTime;
		}
	}
	
	BlockingQueue<AttachQueryTask> attachQueryQueue = new LinkedBlockingQueue<AttachQueryTask>();
	
	@Autowired
	AttachementGetListenerTrigger listenerTrigger;
	public final static String NAME = "AttachementServiceImpl";

	@Autowired
	public void init(){
		new Thread(this).start();
	}
	
	@Override
	public Integer uploadAttachement(Attachement attach, InputStream inputStream) throws IOException {
		Integer index = attach.getFileAddress().lastIndexOf("/");
		String path = attach.getFileAddress().substring(0, index);
		String fileName = attach.getFileAddress().substring(index + 1);
		if (ftpService.updoadFile(path, fileName, inputStream)) {
			Mapper<Attachement, AttachementEntity> attachMapper = new Mapper<Attachement, AttachementEntity>(AttachMapping.a2aeMapping);
			AttachementEntity ae = attachementDao.merge(attachMapper.forceMap(attach));
			return ae.getId();
		}
		return null;
	}

	@Override
	public Attachement getAttachement(Integer attachId) {
		Mapper<AttachementEntity, Attachement> mapper = new Mapper<AttachementEntity, Attachement>(AttachMapping.ae2aMapping);
		return mapper.forceMap(attachementDao.getById(attachId));
	}

	@Override
	public Boolean downloadAttachement(Integer attachId, OutputStream os) throws IOException {
		AttachementEntity ae = attachementDao.getById(attachId);
		Integer index = ae.getFileAddress().lastIndexOf("/");
		String path = ae.getFileAddress().substring(0, index);
		String fileName = ae.getFileAddress().substring(index + 1);
		return ftpService.downloadFile(path, fileName, os);
	}

	@Override
	public void getAttachementAsync(String fileName, OnGetAttachement callback) {
		this.listenerTrigger.addListener(fileName, callback);
		attachQueryQueue.add(new AttachQueryTask(fileName, new OnGetAttachement(){

			@Override
			public void onGetAttachement(AttachementEntity attach) {
				listenerTrigger.triggerOnGet(attach.getDisplay(), attach);
			}
			
		}));
	}

	@Override
	public void run() {
		List<AttachQueryTask> tmpTasks = new ArrayList<AttachQueryTask>();
		for (;;) {
			try {
				AttachQueryTask task = this.attachQueryQueue.take();
				AttachementEntity ae = attachementDao.getByDisplayName(task.getDisplayName());
				if (ae != null) {
					task.getNotification().onGetAttachement(ae);
				}else{
					tmpTasks.add(task);
					if (this.attachQueryQueue.isEmpty()){
						for (AttachQueryTask tsk : tmpTasks){
							if ((System.currentTimeMillis() - tsk.getStartTime()) <= maxQueryTime){
								this.attachQueryQueue.put(tsk);
							}
						}
						tmpTasks.clear();
						Thread.sleep(5000);
					}
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public Result update(List<Attachement> attas) {
		
		List<AttachementEntity> aes = new ArrayList<AttachementEntity>();
		for (Attachement atta : attas){
			AttachementEntity ae = attachementDao.getById(atta.getId());
			if (null == ae){
				Result r = ErrorCode.ATTACH_NOT_EXIST.clone();
				r.setMsg(r.getMsg() + atta.getId());
				return r;
			}
			
			if (atta.getDisplay() != null){
				ae.setDisplay(atta.getDisplay());
			}
			if (atta.getUploadTime() != null){
				ae.setUploadTime(atta.getUploadTime());
			}
			
			aes.add(ae);
		}
		
		attachementDao.merge(aes);
		return ErrorCode.OK;
	}
}
