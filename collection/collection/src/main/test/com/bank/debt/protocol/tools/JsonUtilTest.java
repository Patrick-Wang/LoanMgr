package com.bank.debt.protocol.tools;

import static org.junit.Assert.fail;

import java.io.IOException;

import org.junit.Test;

import com.bank.debt.protocol.entity.User;

import net.sf.json.JSONObject;

public class JsonUtilTest {

	@Test
	public void testToJson() {
		User usr = new User();
		usr.setId(1);
		usr.setName("123");
		System.out.println(JsonUtil.toJson(usr));
	}

	@Test
	public void testToUtf8Json() {
		fail("Not yet implemented");
	}

	@Test
	public void testToObject() throws IOException {
		User usr = new User();
		usr.setId(1);
		usr.setName("123");
		String json = JsonUtil.toJson(usr);
		User usr2 = new User();
		JsonUtil.toObject(JSONObject.fromObject(json), usr2);
		System.out.println(usr2.toString());
	}

}
