package com.bank.debt.protocol.tools;

import static org.junit.Assert.fail;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;

import com.bank.debt.protocol.entity.User;

import net.sf.json.JSONObject;

public class JsonUtilTest {

	@Test
	public void testToJson() {
		String s = String.format("00%08d", 123);
		
		User usr = new User();
		usr.setId(1);
		usr.setName("123");
		System.out.println(JsonUtil.toJson(usr));
	}

	@Test
	public void testToUtf8Json() throws ParseException {
		
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date d = sdf.parse("2017-5-6 15:32:15");
		
		fail("Not yet implemented");
	}

	@Test
	public void testToObject() throws IOException {
		User usr = new User();
		usr.setId(1);
		usr.setName("123");
		String json = JsonUtil.toJson(usr);
		User usr2 = new User();
		JsonUtil.toObject(JSONObject.fromObject(json), usr2, null);
		System.out.println(usr2.toString());
	}

}
