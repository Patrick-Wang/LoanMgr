package com.bank.debt.protocol.tools.map;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.bank.debt.model.dao.message.MessageDao;
import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.model.entity.MessageEntity;
import com.bank.debt.protocol.entity.Attachement;
import com.bank.debt.protocol.entity.EC;
import com.bank.debt.protocol.entity.EntrustedCaseReport;
import com.bank.debt.protocol.entity.Message;
import com.bank.debt.protocol.tools.PathUtil;
import com.bank.debt.protocol.tools.ValidationException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

class MsgPair {
	public Integer ecMgrId;
	public MessageEntity ask;
	public MessageEntity answer;
}


public class EC2XlsMapping implements Mapping<List<EC>, OutputStream> {


	static List<MsgPair> pairs(List<MessageEntity> msgs){
        List<MsgPair> pairs = new ArrayList<MsgPair>();
        for (int i = 0; msgs != null && i < msgs.size(); ++i) {
        	MsgPair pair = new MsgPair();
        	if (msgs.get(i).getTitle().indexOf("RE:") < 0){
        		pair.ask = msgs.get(i);
        		pairs.add(pair);
        		for (int j = i + 1; j < msgs.size(); ++j){
        			if (msgs.get(j).getTitle().indexOf("RE:") == 0){
        				 Integer msgId = Integer.valueOf(msgs.get(j).getTitle().substring(3));
        				 if (msgId.equals(msgs.get(i).getId())){
        					 pair.answer = msgs.get(j);
        					 msgs.remove(j);
        					 break;
        				 }
        			}
        		}
        	}else{
        		pair.answer = msgs.get(i);
        		Integer msgId = Integer.valueOf(msgs.get(i).getTitle().substring(3));
        		for (int j = i + 1; j < msgs.size(); ++j){
        			if (msgs.get(j).getTitle().indexOf("RE:") < 0){
        				 if (msgId.equals(msgs.get(j).getId())){
        					 pair.ask = msgs.get(j);
        					 msgs.remove(j);
        					 break;
        				 }
        			}
        		}
        	}
        }
   
        return pairs;
    }
	
	public static String[] carLoanTitle = new String[] { 
			"委案编码",
			"批次号",
			"委外日期",
			"委外状态",
			"委外机构",
			"委外金额",
			"已还金额",
			"剩余金额",
			"委外到期日",
			"结案日期",
			"客户姓名",
			"合同编号",
			"外包商编号",
			"委外类型",
			"客户性别",
			"客户出生日期",
			"客户身份证号",
			"区域",
			"外访期数",
			"外访金额",
			"逾期天数",
			"逾期金额",
			"月供车款金额",
			"贷款期限",
			"逾期期数",
			"曾经逾期次数",
			"还款期数",
			"城市",
			"经销商",
			"客户手机",
			"客户宅电",
			"客户公司",
			"客户公司电话",
			"分区",
			"区号",
			"邮编",
			"配偶姓名",
			"配偶手机",
			"其他联系方式",
			"配偶公司",
			"配偶公司电话",
			"客户类型",
			"申请日期",
			"放款日期",
			"还款日",
			"保单到期日",
			"贷款金额",
			"贷款种类",
			"客户利率",
			"车价",
			"车型",
			"职位",
			"收入",
			"担保人姓名",
			"与申请人关系",
			"担保人出生日期",
			"担保人身份证号",
			"担保人手机",
			"担保人公司名称",
			"担保人公司电话",
			"担保人公司地址",
			"银行",
			"帐号",
			"网银导出原因",
			"逾期原因",
			"电话情况",
			"电话联系人",
			"还款情况",
			"还款人",
			"信息修改类别",
			"车辆情况",
			"客户合作态度",
			"处理状态",
			"反馈日期",
			"委外结果",
			"PCODE",
			"CCODE",
			"联系人1姓名",
			"联系人1证件号",
			"联系人1关系",
			"联系人1单位",
			"联系人1家庭电话",
			"联系人1单位电话",
			"联系人1手机",
			"联系人1地址",
			"备注1",
			"联系人2姓名",
			"联系人2证件号",
			"联系人2关系",
			"联系人2单位",
			"联系人2家庭电话",
			"联系人2单位电话",
			"联系人2手机",
			"联系人2地址",
			"备注2",
			"联系人3姓名",
			"联系人3证件号",
			"联系人3关系",
			"联系人3单位",
			"联系人3家庭电话",
			"联系人3单位电话",
			"联系人3手机",
			"联系人3地址",
			"备注3",
			"联系人4姓名",
			"联系人4证件号",
			"联系人4关系",
			"联系人4单位",
			"联系人4家庭电话",
			"联系人4单位电话",
			"联系人4手机",
			"联系人4地址",
			"备注4",
			"联系人5姓名",
			"联系人5证件号",
			"联系人5关系",
			"联系人5单位",
			"联系人5家庭电话",
			"联系人5单位电话",
			"联系人5手机",
			"联系人5地址",
			"备注5",
			"联系人6姓名",
			"联系人6证件号",
			"联系人6关系",
			"联系人6单位",
			"联系人6家庭电话",
			"联系人6单位电话",
			"联系人6手机",
			"联系人6地址",
			"备注6",
			"联系人7姓名",
			"联系人7证件号",
			"联系人7关系",
			"联系人7单位",
			"联系人7家庭电话",
			"联系人7单位电话",
			"联系人7手机",
			"联系人7地址",
			"备注7",
			"联系人8姓名",
			"联系人8证件号",
			"联系人8关系",
			"联系人8单位",
			"联系人8家庭电话",
			"联系人8单位电话",
			"联系人8手机",
			"联系人8地址",
			"备注8",
			"联系人9姓名",
			"联系人9证件号",
			"联系人9关系",
			"联系人9单位",
			"联系人9家庭电话",
			"联系人9单位电话",
			"联系人9手机",
			"联系人9地址",
			"备注9",
			"联系人10姓名",
			"联系人10证件号",
			"联系人10关系",
			"联系人10单位",
			"联系人10家庭电话",
			"联系人10单位电话",
			"联系人10手机",
			"联系人10地址",
			"备注10"};

	public static String[] creditLoanTitle = new String[] {
			"委案编码",
			"批次号",
			"委外日期",
			"委外状态",
			"委外机构",
			"委外金额",
			"已还金额",
			"剩余金额",
			"客户号",
			"客户姓名",
			"账户号",
			"性别",
			"身份证号",
			"区域",
			"放款机构",
			"签约金额",
			"放款金额",
			"产品类型",
			"放款时间",
			"提前结清金额",
			"总期数",
			"当前期数",
			"已还期数",
			"剩余本金",
			"逾期利息",
			"逾期罚息",
			"逾期管理费",
			"逾期违约金",
			"逾期本金",
			"未还本金",
			"月还款额",
			"账户名",
			"银行名",
			"银行帐号",
			"归集公司",
			"逾期天数",
			"账龄",
			"城市",
			"电子邮箱",
			"户籍电话",
			"户籍地址",
			"手机号码",
			"住宅电话",
			"住宅地址",
			"公司名称",
			"公司地址",
			"公司电话",
			"联系人1姓名",
			"联系人1证件号",
			"联系人1关系",
			"联系人1单位",
			"联系人1家庭电话",
			"联系人1单位电话",
			"联系人1手机",
			"联系人1地址",
			"备注1",
			"联系人2姓名",
			"联系人2证件号",
			"联系人2关系",
			"联系人2单位",
			"联系人2家庭电话",
			"联系人2单位电话",
			"联系人2手机",
			"联系人2地址",
			"备注2",
			"联系人3姓名",
			"联系人3证件号",
			"联系人3关系",
			"联系人3单位",
			"联系人3家庭电话",
			"联系人3单位电话",
			"联系人3手机",
			"联系人3地址",
			"备注3",
			"联系人4姓名",
			"联系人4证件号",
			"联系人4关系",
			"联系人4单位",
			"联系人4家庭电话",
			"联系人4单位电话",
			"联系人4手机",
			"联系人4地址",
			"备注4",
			"联系人5姓名",
			"联系人5证件号",
			"联系人5关系",
			"联系人5单位",
			"联系人5家庭电话",
			"联系人5单位电话",
			"联系人5手机",
			"联系人5地址",
			"备注5",
			"联系人6姓名",
			"联系人6证件号",
			"联系人6关系",
			"联系人6单位",
			"联系人6家庭电话",
			"联系人6单位电话",
			"联系人6手机",
			"联系人6地址",
			"备注6",
			"联系人7姓名",
			"联系人7证件号",
			"联系人7关系",
			"联系人7单位",
			"联系人7家庭电话",
			"联系人7单位电话",
			"联系人7手机",
			"联系人7地址",
			"备注7",
			"联系人8姓名",
			"联系人8证件号",
			"联系人8关系",
			"联系人8单位",
			"联系人8家庭电话",
			"联系人8单位电话",
			"联系人8手机",
			"联系人8地址",
			"备注8",
			"联系人9姓名",
			"联系人9证件号",
			"联系人9关系",
			"联系人9单位",
			"联系人9家庭电话",
			"联系人9单位电话",
			"联系人9手机",
			"联系人9地址",
			"备注9",
			"联系人10姓名",
			"联系人10证件号",
			"联系人10关系",
			"联系人10单位",
			"联系人10家庭电话",
			"联系人10单位电话",
			"联系人10手机",
			"联系人10地址",
			"备注10" };

	public static String[] creditCardTitle = new String[] {
			"委案编码",
			"批次号",
			"委外日期",
			"委外状态",
			"委外机构",
			"委外金额",
			"已还金额",
			"剩余金额",
			"退案日期",
			"个案序列号",
			"姓名",
			"委托方",
			"案件状态",
			"证件号",
			"区域",
			"证件类型",
			"性别",
			"催收状态",
			"外访状态",
			"开户行",
			"卡号",
			"账号",
			"账户名称",
			"卡类",
			"档案号",
			"委案日期",
			"委案金额",
			"PTP金额",
			"CP金额",
			"最新欠款（导入利息后更新）",
			"人民币",
			"港币",
			"外币",
			"催收员",
			"催收员ID",
			"催收员部门",
			"催收区域",
			"催收小结",
			"最后通电",
			"已还款",
			"分配历史",
			"分配时间",
			"下次跟进日期",
			"跟进次数",
			"M值系数",
			"逾期账龄",
			"邮箱",
			"QQ",
			"手机",
			"家庭号码",
			"单位号码",
			"单位名称",
			"单位地址",
			"单位邮编",
			"家庭地址",
			"家庭邮编",
			"对账单地址",
			"对账单邮编",
			"户籍地址",
			"户籍地邮编",
			"职位",
			"部门",
			"省份",
			"城市",
			"区县",
			"生日",
			"年龄",
			"未出账金额",
			"币种",
			"原催收记录",
			"本金",
			"最低还款额",
			"信用额度",
			"拖欠级别",
			"信贷分类",
			"催收分类",
			"逾期利息",
			"滞纳金",
			"最后还款日",
			"最后消费日",
			"最后提现日",
			"停卡日",
			"开卡日",
			"还款期限",
			"商品",
			"商户",
			"总欠款(委案金融+公司佣金)",
			"欠款余额",
			"申请单号",
			"逾期日期",
			"催收手别",
			"逾期天数",
			"委托期限",
			"委案期数",
			"已还期数",
			"账单日",
			"固定额度",
			"账单周期",
			"最后还款额",
			"预计退案日",
			"是否主卡",
			"副卡卡人",
			"贷款日期",
			"剩余本金",
			"逾期期数",
			"曾逾期次数",
			"贷款利率",
			"每月还款",
			"逾期金额",
			"逾期本金",
			"逾期罚息",
			"逾期管理费",
			"违约金",
			"超限费",
			"贷款截止日",
			"保证金",
			"社保电脑号",
			"社保卡号",
			"实际退案日",
			"车型",
			"牌照号",
			"车架号",
			"警告",
			"自定义信息",
			"最新催记",
			"联系人1姓名",
			"联系人1证件号",
			"联系人1关系",
			"联系人1单位",
			"联系人1家庭电话",
			"联系人1单位电话",
			"联系人1手机",
			"联系人1地址",
			"备注1",
			"联系人2姓名",
			"联系人2证件号",
			"联系人2关系",
			"联系人2单位",
			"联系人2家庭电话",
			"联系人2单位电话",
			"联系人2手机",
			"联系人2地址",
			"备注2",
			"联系人3姓名",
			"联系人3证件号",
			"联系人3关系",
			"联系人3单位",
			"联系人3家庭电话",
			"联系人3单位电话",
			"联系人3手机",
			"联系人3地址",
			"备注3",
			"联系人4姓名",
			"联系人4证件号",
			"联系人4关系",
			"联系人4单位",
			"联系人4家庭电话",
			"联系人4单位电话",
			"联系人4手机",
			"联系人4地址",
			"备注4",
			"联系人5姓名",
			"联系人5证件号",
			"联系人5关系",
			"联系人5单位",
			"联系人5家庭电话",
			"联系人5单位电话",
			"联系人5手机",
			"联系人5地址",
			"备注5",
			"联系人6姓名",
			"联系人6证件号",
			"联系人6关系",
			"联系人6单位",
			"联系人6家庭电话",
			"联系人6单位电话",
			"联系人6手机",
			"联系人6地址",
			"备注6",
			"联系人7姓名",
			"联系人7证件号",
			"联系人7关系",
			"联系人7单位",
			"联系人7家庭电话",
			"联系人7单位电话",
			"联系人7手机",
			"联系人7地址",
			"备注7",
			"联系人8姓名",
			"联系人8证件号",
			"联系人8关系",
			"联系人8单位",
			"联系人8家庭电话",
			"联系人8单位电话",
			"联系人8手机",
			"联系人8地址",
			"备注8",
			"联系人9姓名",
			"联系人9证件号",
			"联系人9关系",
			"联系人9单位",
			"联系人9家庭电话",
			"联系人9单位电话",
			"联系人9手机",
			"联系人9地址",
			"备注9",
			"联系人10姓名",
			"联系人10证件号",
			"联系人10关系",
			"联系人10单位",
			"联系人10家庭电话",
			"联系人10单位电话",
			"联系人10手机",
			"联系人10地址",
			"备注10"};
 
//	
//	public static int getTitleIndex(String[] title, String val){
//		for (int i = 0; i < title.length; ++i){
//			if (title[i].equals(val)){
//				return i;
//			}
//		}
//		return -1;
//	}
	
	MessageDao messageDao;
	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	JSONArray transMsgs(List<MessageEntity> list){
		List<MsgPair> pairs = pairs(list);
		JSONArray zxxx = new JSONArray();
		
		for (MsgPair pair : pairs){
			JSONObject zx = new JSONObject();
			if (pair.ask != null){
				zx.put("业务员", pair.ask.getCome().getUsername());
				zx.put("责任内勤", pair.ask.getDest().getUsername());
				zx.put("咨询标题", pair.ask.getTitle());
				zx.put("咨询内容", pair.ask.getContent());
				zx.put("咨询时间", formatter.format(pair.ask.getSendTime()));
			}
			
			if (pair.answer != null){
				zx.put("回复内容", pair.answer.getContent());
				zx.put("回复时间", formatter.format(pair.answer.getSendTime()));
				if (null != pair.answer.getAttachements()){
					JSONArray at = new JSONArray();
					for(AttachementEntity atta : pair.answer.getAttachements()){
						at.add(atta.getId() + "_" + atta.getDisplay());
					}
					zx.put("附件", at);
				}
			}
			zxxx.add(zx);
		}
		return zxxx;
	}
	
	JSONArray transReports(List<EntrustedCaseReport> reports){
		JSONArray gzjls = new JSONArray();
		if (reports != null){
			for (EntrustedCaseReport report : reports){
				JSONObject gzjl = new JSONObject();
				if (report.getTitle() != null){
					gzjl.put("标题", report.getTitle());
				}
				if (report.getContent() != null){
					gzjl.put("内容", report.getContent());
				}
				if (report.getDate() != null){
					gzjl.put("时间", report.getDate());
				}
				if (report.getAttachements() != null){
					JSONArray at = new JSONArray();
					for (Attachement atta : report.getAttachements()){
						at.add(atta.getId() + "_" + atta.getDisplay());
					}
					gzjl.put("附件", at);
				}
				gzjls.add(gzjl);
			}
		}
		return gzjls;
	}
	
	String[] titles = null;

	public EC2XlsMapping(String[] titles, MessageDao messageDao) {
		this.titles = titles;
		this.messageDao = messageDao;
	}

	@SuppressWarnings("unused")
	private OutputStream doMapping(List<EC> ecqi) throws IOException, ValidationException, MappingFailedException {

		Class<?> cls = null;

		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet("委案");
		HSSFRow title = sheet.createRow(0);
		
		for (int i = 0; i < titles.length; ++i) {
			HSSFCell tCol = title.createCell(i);
			tCol.setCellValue(titles[i]);
		}

		//添加附件信息
		HSSFCell tCol = title.createCell(titles.length);
		tCol.setCellValue("备注");

		for (int j = 0; j < ecqi.size(); ++j) {
			HSSFRow row = sheet.createRow(sheet.getLastRowNum() + 1);
			for (int i = 0; i < titles.length; ++i) {
				HSSFCell cell = row.createCell(i);
				cell.setCellValue(null != ecqi.get(j).getLoan().get(i + 1) ? ecqi.get(j).getLoan().get(i + 1) + "" : "");
			}
			HSSFCell cell = row.createCell(titles.length);
			JSONObject bz = new JSONObject();
			bz.put("工作记录", transReports(ecqi.get(j).getReports()));
			bz.put("咨询记录", transMsgs(messageDao.getECMsgs(ecqi.get(j).getManagerId())));
			cell.setCellValue(bz.toString());
		}

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		workbook.write(baos);
		return baos;
	}

	@Override
	public OutputStream onMap(List<EC> from) throws MappingFailedException {
		try {
			return doMapping(from);
		} catch (IOException | ValidationException e) {
			throw new MappingFailedException(e);
		}
	}
}
