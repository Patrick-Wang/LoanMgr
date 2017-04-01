package com.bank.debt.service.service.ftp;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public interface FtpService {
	boolean updoadFile(String path, String fileName, InputStream is) throws IOException;
	boolean downloadFile(String path, String fileName, OutputStream os) throws IOException;
}
