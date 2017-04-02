package com.bank.debt.service.service.ftp;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Before;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class) 
@ContextConfiguration(locations = {
		"file:src/main/webapp/WEB-INF/applicationContext-test.xml",
		"file:src/main/webapp/WEB-INF/applicationContext-services.xml",
		"file:src/main/webapp/WEB-INF/applicationContext-servlet.xml"}) 
public class FtpServiceImplTest {

	@Autowired
	FtpService ftpService;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before(value = "")
	public void setUp() throws Exception {
	}

	@After(value = "")
	public void tearDown() throws Exception {
	}

	@Test
	public final void testUpdoadFile() throws IOException {
		File f = new File("d:/test.zip");
		FileOutputStream fr = new FileOutputStream(f);
		ftpService.downloadFile("/192.168.7.22", "operating_management201612172138log.zip", fr);
		fr.flush();
		fr.close();
	}

	@Test
	public final void testDownloadFile() throws IOException {
		File f = new File("d:/test.zip");
		FileInputStream fr = new FileInputStream(f);
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		ftpService.updoadFile("/192.168.7.22", "test.zip", fr);
		fr.close();
	}

}
