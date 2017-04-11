package com.bank.debt.service.ecmanager;

import java.util.List;

import com.bank.debt.protocol.entity.EntrustedCaseManageInfo;

public interface ECManagerService {

	List<EntrustedCaseManageInfo> getManageInfos(String userName);


}
