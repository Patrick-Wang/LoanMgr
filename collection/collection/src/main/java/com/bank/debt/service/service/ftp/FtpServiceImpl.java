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
    	if (!ftpClient.login(username, password)){
    		return null;
    	}
    	if (!ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE)){
    		clearFtpClient(ftpClient);
    		return null;
    	}
    	if (!ftpClient.setFileTransferMode(FTPClient.STREAM_TRANSFER_MODE)){
    		clearFtpClient(ftpClient);
    		return null;
    	}  
    	ftpClient.setControlEncoding("UTF-8");    	
    	return ftpClient;
	}

	@Override
	public boolean updoadFile(String path, String fileName, InputStream is) throws IOException {
		FTPClient ftpClient = getFtpConnection();
		if (null == ftpClient){
			return false;
		}
		
		if (!ftpClient.changeWorkingDirectory("/")){
			clearFtpClient(ftpClient);
			return false;
		}
		
		String[] dirs = path.split("/");
		for(String dir : dirs){
			if (!dir.isEmpty()){
				if (!ftpClient.changeWorkingDirectory(dir)){
					if (!ftpClient.makeDirectory(dir)){
						clearFtpClient(ftpClient);
						return false;
					}
					if (!ftpClient.changeWorkingDirectory(dir)){
						clearFtpClient(ftpClient);
						return false;
					}
				}
			}
		}
		ftpClient.enterLocalPassiveMode();
		boolean result = ftpClient.storeFile(new String(fileName.getBytes("UTF-8"),"iso-8859-1"), is);
		clearFtpClient(ftpClient);
		return result;
	}

	void clearFtpClient(FTPClient ftpClient) throws IOException{
		ftpClient.logout();
		ftpClient.disconnect();
	}
	
	@Override
	public boolean downloadFile(String path, String fileName, OutputStream os) throws IOException {
		FTPClient ftpClient = getFtpConnection();
		if (null == ftpClient){
			return false;
		}
		
		if (!ftpClient.changeWorkingDirectory("/")){
			clearFtpClient(ftpClient);
			return false;
		}
		
		String[] paths = path.split("/");
		for(String dir : paths){
			if (!dir.isEmpty()){
				if (!ftpClient.changeWorkingDirectory(dir)){
					if (!ftpClient.makeDirectory(dir)){
						clearFtpClient(ftpClient);
						return false;
					}
					if (!ftpClient.changeWorkingDirectory(dir)){
						clearFtpClient(ftpClient);
						return false;
					}
				}
			}
		}
		
		ftpClient.enterLocalPassiveMode();
		boolean result = ftpClient.retrieveFile(new String(fileName.getBytes("UTF-8"),"iso-8859-1"), os);
		clearFtpClient(ftpClient);
		return result;
	}
}
