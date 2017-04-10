package com.bank.debt.service.service.ftp;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class FtpServiceImpl implements FtpService {
	@Value("${ftp.username}")
    private String username;

	@Value("${ftp.password}")
    private String password;
	
	@Value("${ftp.url}")
    private String url;
	
	@Value("${ftp.port}")
    private Integer port;
	
	private FTPClient getFtpConnection() throws IOException{
		FTPClient ftpClient = new FTPClient();  
		ftpClient.connect(url, port);
    	ftpClient.login(username, password);
		ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);  
        ftpClient.setFileTransferMode(FTPClient.STREAM_TRANSFER_MODE);
    	return ftpClient;
	}

	@Override
	public boolean updoadFile(String path, String fileName, InputStream is) throws IOException {
		FTPClient ftpClient = getFtpConnection();
		ftpClient.changeWorkingDirectory("/");
		String[] dirs = path.split("/");
		for(String dir : dirs){
			if (!dir.isEmpty()){
				ftpClient.makeDirectory(dir);
				ftpClient.changeWorkingDirectory(dir);
			}
		}
		ftpClient.enterLocalPassiveMode();
		boolean result = ftpClient.storeFile(fileName, is);
		ftpClient.logout();
		ftpClient.disconnect();
		return result;
	}

	@Override
	public boolean downloadFile(String path, String fileName, OutputStream os) throws IOException {
		FTPClient ftpClient = getFtpConnection();
		ftpClient.changeWorkingDirectory("/");
		String[] paths = path.split("/");
		for(String dir : paths){
			if (!dir.isEmpty()){
				ftpClient.makeDirectory(dir);
				ftpClient.changeWorkingDirectory(dir);
			}
		}
		ftpClient.enterLocalPassiveMode();
		boolean result = ftpClient.retrieveFile(fileName, os);
		ftpClient.logout();
		ftpClient.disconnect();
		return result;
	}
}
