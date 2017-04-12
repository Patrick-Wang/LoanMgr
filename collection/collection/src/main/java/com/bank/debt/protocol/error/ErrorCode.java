package com.bank.debt.protocol.error;

import com.bank.debt.protocol.entity.Result;

public class ErrorCode {
	public static int baseCode = 0;
	public final static Result OK = new Result(baseCode++, "成功");
	public final static Result UNIMPLEMENTED = new Result(baseCode++, "未实现");
	public final static Result ACCOUNT_USER_EXIST = new Result(baseCode++, "用户已经存才");
	public final static Result ACCOUNT_USER_INFO_ERROR = new Result(baseCode++, "创建用户信息错误");
	public final static Result ACCOUNT_ORG_NOT_EXIST = new Result(baseCode++, "组织结构不存在");
	public final static Result ACCOUNT_ROLE_NOT_EXIST = new Result(baseCode++, "角色不存在");
	public final static Result ACCOUNT_UPDATE_FALIED = new Result(baseCode++, "更新用户信息失败");
	public final static Result MESSAGE_SEND_FALIED = new Result(baseCode++, "消息发送失败");
	public final static Result EC_IMPORTED_FAILED = new Result(baseCode++, "委案导入失败");
	public final static Result EC_UPDATE_FAILED = new Result(baseCode++, "修改委案失败");
	public final static Result ECM_UPDATE_FAILED = new Result(baseCode++, "委案管理信息修改失败");
	public final static Result ECR_NOT_EXIST = new Result(baseCode++, "报告不存在");
	public final static Result ECR_SUBMIT_FAILED = new Result(baseCode++, "报告提交失败");
}
