package com.bank.debt.service.phone;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import com.bank.debt.protocol.entity.PhoneRecord;
import com.bank.debt.protocol.entity.Result;
import com.bank.debt.protocol.tools.PathUtil.UploadName;

public interface PhoneService {

	List<PhoneRecord> getCallRecords();

	Result uploadRecord(UploadName un, InputStream inputStream) throws IOException;

	Result recordMissedCall(String number, String time);

	Result donwloandRecord(UploadName un, OutputStream os) throws IOException;

}
