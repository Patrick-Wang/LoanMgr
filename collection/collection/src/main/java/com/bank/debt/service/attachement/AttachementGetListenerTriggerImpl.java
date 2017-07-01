package com.bank.debt.service.attachement;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.service.attachement.AttachementService.OnGetAttachement;

@Service()
@Transactional("transaction")
public class AttachementGetListenerTriggerImpl implements AttachementGetListenerTrigger {
	
	
	Map<String, OnGetAttachement> listenerMap = Collections.synchronizedMap(new HashMap<String, OnGetAttachement>());
	
	@Override
	public void addListener(String key, OnGetAttachement listener) {
		listenerMap.put(key, listener);
	}

	@Override
	public void triggerOnGet(String key, AttachementEntity attach) {
		OnGetAttachement listener = listenerMap.remove(key);
		if (null != listener){
			listener.onGetAttachement(attach);
		}
	}
}
