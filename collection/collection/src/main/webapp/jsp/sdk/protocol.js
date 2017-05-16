var collection;
(function (collection) {
    var protocol;
    (function (protocol) {
        protocol.carLoanTitle = ["序号", "委案编号", "批次号", "委外日期", "委外状态", "委外机构", "委外金额", "已还金额", "备注", "委外到期日", "结案日期", "客户姓名",
            "合同编号", "外包商编号", "委外类型", "客户性别", "客户出生日期", "客户身份证号", "外访期数", "外访金额", "逾期天数", "逾期金额", "月供车款金额", "贷款期限",
            "逾期期数", "曾经逾期次数", "还款期数", "城市", "经销商", "客户手机", "客户宅电", "客户公司", "客户公司电话", "分区", "区号", "邮编", "配偶姓名", "配偶手机",
            "其他联系方式", "配偶公司", "配偶公司电话", "客户类型", "申请日期", "放款日期", "还款日", "保单到期日", "贷款金额", "贷款种类", "客户利率", "车价", "车型",
            "职位", "收入", "担保人姓名", "与申请人关系", "担保人出生日期", "担保人身份证号", "担保人手机", "担保人公司名称", "担保人公司电话", "担保人公司地址", "银行", "帐号",
            "网银导出原因", "逾期原因", "电话情况", "电话联系人", "还款情况", "还款人", "信息修改类别", "车辆情况", "客户合作态度", "处理状态", "反馈日期", "委外结果",
            "PCODE", "CCODE"];
        protocol.creditLoanTitle = ["序号", "委案编号", "批次号", "委外日期", "委外状态", "委外机构", "委外金额", "已还金额", "备注",
            "客户号", "客户姓名", "账户号", "性别", "身份证号", "放款机构", "签约金额", "放款金额", "产品类型", "放款时间", "提前结清金额", "总期数", "当前期数", "已还期数",
            "剩余本金", "逾期利息", "逾期罚息", "逾期管理费", "逾期违约金", "逾期本金", "未还本金", "月还款额", "账户名", "银行名", "银行帐号", "归集公司", "逾期天数",
            "账龄", "城市", "电子邮箱", "户籍电话", "户籍地址", "手机号码", "住宅电话", "住宅地址", "公司名称", "公司地址", "公司电话", "联络人1姓名", "联络人1关系",
            "联络人1电话", "联络人2姓名", "联络人2关系", "联络人2电话", "联络人3姓名", "联络人3关系", "联络人3电话", "联络人4姓名", "联络人4关系", "联络人4电话",
            "联络人5姓名", "联络人5关系", "联络人5电话", "联络人6姓名", "联络人6关系", "联络人6电话", "联络人7姓名", "联络人7关系", "联络人7电话", "联络人8姓名",
            "联络人8关系", "联络人8电话", "联络人9姓名", "联络人9关系", "联络人9电话", "联络人10姓名", "联络人10关系", "联络人10电话"];
        protocol.creditCardTitle = ["ID", "委案编号", "批次号", "委外日期", "委外状态", "委外机构", "委外金额", "已还金额",
            "退案日期", "备注", "个案序列号", "姓名", "委托方", "案件状态", "证件号", "证件类型", "性别", "催收状态", "外访状态", "开户行", "卡号", "账号",
            "账户名称", "卡类", "档案号", "委案日期", "委案金额", "PTP金额", "CP金额", "最新欠款（导入利息后更新）", "人民币", "港币", "外币", "催收员", "催收员ID",
            "催收员部门", "催收区域", "催收小结", "最后通电", "已还款", "分配历史", "分配时间", "下次跟进日期", "跟进次数", "M值系数", "逾期账龄", "邮箱", "QQ", "手机",
            "家庭号码", "单位号码", "单位名称", "单位地址", "单位邮编", "家庭地址", "家庭邮编", "对账单地址", "对账单邮编", "户籍地址", "户籍地邮编", "职位", "部门", "省份",
            "城市", "区县", "生日", "年龄", "未出账金额", "币种", "原催收记录", "本金", "最低还款额", "信用额度", "拖欠级别", "信贷分类", "催收分类", "逾期利息",
            "滞纳金", "最后还款日", "最后消费日", "最后提现日", "停卡日", "开卡日", "还款期限", "联系人1姓名", "联系人1证件号", "联系人1关系", "联系人1单位", "联系人1家庭电话",
            "联系人1单位电话", "联系人1手机", "联系人1地址", "联系人2姓名", "联系人2证件号", "联系人2关系", "联系人2单位", "联系人2家庭电话", "联系人2单位电话", "联系人2手机",
            "联系人2地址", "联系人3姓名", "联系人3证件号", "联系人3关系", "联系人3单位", "联系人3家庭电话", "联系人3单位电话", "联系人3手机", "联系人3地址", "联系人4姓名",
            "联系人4证件号", "联系人4关系", "联系人4单位", "联系人4家庭电话", "联系人4单位电话", "联系人4手机", "联系人4地址", "联系人5姓名", "联系人5证件", "联系人5关系",
            "联系人5单位", "联系人5家庭电话", "联系人5单位电话", "联系人5手机", "联系人5地址", "联系人6姓名", "联系人6证件", "联系人6关系", "联系人6单位", "联系人6家庭电话",
            "联系人6单位电话", "联系人6手机", "联系人6地址", "备注1", "备注2", "备注3", "备注4", "备注5", "备注6", "商品", "商户", "总欠款(委案金融+公司佣金)",
            "欠款余额", "申请单号", "逾期日期", "催收手别", "逾期天数", "委托期限", "委案期数", "已还期数", "账单日", "固定额度", "账单周期", "最后还款额", "预计退案日",
            "是否主卡", "副卡卡人", "贷款日期", "剩余本金", "逾期期数", "曾逾期次数", "贷款利率", "每月还款", "逾期金额", "逾期本金", "逾期罚息", "逾期管理费", "违约金",
            "超限费", "贷款截止日", "保证金", "社保电脑号", "社保卡号", "实际退案日", "车型", "牌照号", "车架号", "警告", "自定义信息", "最新催记"];
        function getTitles(type) {
            var titles = undefined;
            if (type == collection.protocol.EntrustedCaseType.carLoan) {
                titles = collection.protocol.carLoanTitle;
            }
            else if (type == collection.protocol.EntrustedCaseType.creditCard) {
                titles = collection.protocol.creditCardTitle;
            }
            else if (type == collection.protocol.EntrustedCaseType.creditLoan) {
                titles = collection.protocol.creditLoanTitle;
            }
            return titles;
        }
        protocol.getTitles = getTitles;
        var PhoneRecordName = (function () {
            function PhoneRecordName() {
            }
            PhoneRecordName.isPhoneAttach = function (attach) {
                return attach.indexOf("phone:") == 0;
            };
            PhoneRecordName.prototype.toName = function () {
                return this.ecId + "_" + this.numb + "_" + this.time;
            };
            return PhoneRecordName;
        })();
        protocol.PhoneRecordName = PhoneRecordName;
        (function (UseStatus) {
            UseStatus[UseStatus["inuse"] = 0] = "inuse";
            UseStatus[UseStatus["stop"] = 1] = "stop";
        })(protocol.UseStatus || (protocol.UseStatus = {}));
        var UseStatus = protocol.UseStatus;
        protocol.ROLE = ["none", "管理员", "内勤管理员", "业务管理员", "内勤", "业务员"];
        (function (EntrustedCaseType) {
            EntrustedCaseType[EntrustedCaseType["carLoan"] = 0] = "carLoan";
            EntrustedCaseType[EntrustedCaseType["creditLoan"] = 1] = "creditLoan";
            EntrustedCaseType[EntrustedCaseType["creditCard"] = 2] = "creditCard";
        })(protocol.EntrustedCaseType || (protocol.EntrustedCaseType = {}));
        var EntrustedCaseType = protocol.EntrustedCaseType;
        (function (ECStatus) {
            ECStatus[ECStatus["unassign"] = 0] = "unassign";
            ECStatus[ECStatus["assign"] = 1] = "assign";
            ECStatus[ECStatus["complete"] = 2] = "complete";
        })(protocol.ECStatus || (protocol.ECStatus = {}));
        var ECStatus = protocol.ECStatus;
        (function (MessageStatus) {
            MessageStatus[MessageStatus["unread"] = 0] = "unread";
            MessageStatus[MessageStatus["read"] = 1] = "read";
        })(protocol.MessageStatus || (protocol.MessageStatus = {}));
        var MessageStatus = protocol.MessageStatus;
        (function (CallStatus) {
            CallStatus[CallStatus["callin"] = 0] = "callin";
            CallStatus[CallStatus["callout"] = 1] = "callout";
            CallStatus[CallStatus["missed"] = 2] = "missed";
            CallStatus[CallStatus["missedSkip"] = 3] = "missedSkip";
        })(protocol.CallStatus || (protocol.CallStatus = {}));
        var CallStatus = protocol.CallStatus;
    })(protocol = collection.protocol || (collection.protocol = {}));
})(collection || (collection = {}));
