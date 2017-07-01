package com.bank.debt.service.attachement;

import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.service.attachement.AttachementService.OnGetAttachement;

public interface AttachementGetListenerTrigger {

	void addListener(String key, OnGetAttachement listener);
	void triggerOnGet(String key, AttachementEntity attach);

}
