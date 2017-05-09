package com.bank.debt.service.ecmanager;

import java.util.List;

import com.bank.debt.protocol.entity.EntrustedCaseManageInfo;
import com.bank.debt.protocol.entity.Result;

public interface ECManagerService {

	List<EntrustedCaseManageInfo> getManageInfos(String userName);

	Result updateManageInfo(String userName, List<EntrustedCaseManageInfo> ecmis);



}
