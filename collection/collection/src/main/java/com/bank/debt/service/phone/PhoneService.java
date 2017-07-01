package com.bank.debt.service.phone;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.List;

import javax.servlet.ServletInputStream;

import com.bank.debt.protocol.entity.PhoneRecord;
import com.bank.debt.protocol.entity.ProtocolEntityImpl;
import com.bank.debt.protocol.entity.Result;

public interface PhoneService {

	List<PhoneRecord> getCallRecords();

	Result uploadRecord(String number, Integer status, String name, InputStream inputStream) throws IOException;

	Result recordMissedCall(String number, String time) throws ParseException;

	Result donwloandRecord(Integer attachId, OutputStream os) throws IOException;

	Result updateStatus(Integer recId, Integer status);

}
