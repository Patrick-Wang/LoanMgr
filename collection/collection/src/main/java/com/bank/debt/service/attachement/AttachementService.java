package com.bank.debt.service.attachement;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.protocol.entity.Attachement;

public interface AttachementService {

	public static interface OnGetAttachement{
		void onGetAttachement(AttachementEntity attach);
	}; 
	
	Integer uploadAttachement(Attachement attach, InputStream inputStream) throws IOException;
	Boolean downloadAttachement(Integer attachId, OutputStream os) throws IOException;
	Attachement getAttachement(Integer attachId);
	void getAttachementAsync(String fileName, OnGetAttachement callback);

}
