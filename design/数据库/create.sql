SET SQL_SAFE_UPDATES=0;
drop table if exists`organization`;
create table `organization`(
	 `id` int NOT NULL AUTO_INCREMENT,
	 `parent` int default NULL,
	 `name` varchar(50) NOT NULL,
	 `status` int default 0,
	  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists `user`;
create table `user`(
	 `id` int NOT NULL AUTO_INCREMENT,
	 `username` varchar(20) NOT NULL,
	 `password` varchar(20) NOT NULL,
	 `org` int  NOT NULL,
	 `position` varchar(50),
	 `status` int default 0,
	  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `entrusted_case_manager`;
create table `entrusted_case_manager`(
	`id` int NOT NULL AUTO_INCREMENT,
	`owner` int NOT NULL,
	`assignee` int,
	`modifier` int,
	`batchNo` int,
	`type` int,
	`entrustedCase` int not null,
	`createdTime` datetime,
	`lastModifiedTime` datetime,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `entrusted_case_report`;
create table `entrusted_case_report`(
	`id` int NOT NULL AUTO_INCREMENT,
	`creator` int NOT NULL,
	`entrustedCaseManager` int not null,
	`title`	text,
	`content`	text,
	`createdTime` datetime,
	`lastModifiedTime` datetime,
	`modifier` int,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `entrusted_case_report_attachement`;
create table `entrusted_case_report_attachement`(
	`id` int NOT NULL AUTO_INCREMENT,
	`entrustedCaseReport` int NOT NULL,
	`attachement`	int not null,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `message`;
create table `message`(
	`id` int NOT NULL AUTO_INCREMENT,
	`come` int NOT NULL,
	`dest` int NOT NULL,
	`entrustedCaseManager` int not null,
	`title`	text,
	`content`	text,
	`sendTime` datetime,
	`isRead` int default 0,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `message_attach_attachement`;
create table `message_attach_attachement`(
	`id` int NOT NULL AUTO_INCREMENT,
	`msgId` int NOT NULL,
	`attachement`	int not null,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `attachements`;
create table `attachements`(
	`id` int NOT NULL AUTO_INCREMENT,
	`fileAddress` text NOT NULL,
	`display`	text not null,
	`uploadTime` datetime not null,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `role`;
create table `role`(
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `interface`;
create table `interface`(
	`id` int NOT NULL,
	`address` varchar(250) NOT NULL UNIQUE,
	`description` varchar(1000),
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


drop table if exists  `user_role`;
create table `user_role`(
	`id` int NOT NULL AUTO_INCREMENT,
	`user` int NOT NULL,
	`role` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `authority`;
create table `authority`(
	`id` int NOT NULL AUTO_INCREMENT,
	`role` int NOT NULL,
	`intf` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `phone_records`;
create table `phone_records`(
	`id` int NOT NULL AUTO_INCREMENT,
	`status` int,
	`number` varchar(30) NOT NULL,
	`entrustedCase` int,
	`attachement` int,
	`startTime` datetime,
	`endTime` datetime,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `entrusted_case_batch_creator`;
create table `entrusted_case_batch_creator`(
	`id` int NOT NULL AUTO_INCREMENT,
	`createdTime` datetime,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;



drop table if exists  `entrusted_case_car_loan`;
create table `entrusted_case_car_loan`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	自增主键
	`code` varchar(20),
	`pch` varchar(20),
	`wwrq`	date	,--	委外日期
	`wwzt`	varchar(54)	,--	委外状态
	`wwjg` varchar(50)	,
	`wwje` double,
	`yhje` double,
	`syje` double,
	`xh`	int	,--	序号
	`wwdqr`	date	,--	委外到期日
	`jarq`	date	,--	结案日期
	`khxm`	varchar(50)	,--	客户姓名
	`htbh`	varchar(51)	,--	合同编号
	`wbsbh`	varchar(52)	,--	外包商编号
	`wwlx`	varchar(53)	,--	委外类型
	`khxb`	varchar(54)	,--	客户性别
	`khcsrq`	date	,--	客户出生日期
	`khsfzh`	varchar(54)	,--	客户身份证号
	`wfqs`	int	,--	外访期数
	`wfje`	double	,--	外访金额
	`yqts`	double	,--	逾期天数
	`yqje`	double	,--	逾期金额
	`ygckje`	double	,--	月供车款金额
	`dkqx`	double	,--	贷款期限
	`yqqs`	int	,--	逾期期数
	`zjyqcs`	int	,--	曾经逾期次数
	`hkqs`	int	,--	还款期数
	`cs`	varchar(54)	,--	城市
	`jxs`	varchar(55)	,--	经销商
	`khsj`	varchar(56)	,--	客户手机
	`khzd`	varchar(57)	,--	客户宅电
	`khgs`	varchar(58)	,--	客户公司
	`khgsdh`	varchar(59)	,--	客户公司电话
	`fq`	varchar(60)	,--	分区
	`qh`	varchar(61)	,--	区号
	`yb`	varchar(62)	,--	邮编
	`poxm`	varchar(63)	,--	配偶姓名
	`posj`	varchar(64)	,--	配偶手机
	`qtlxfs`	varchar(65)	,--	其他联系方式
	`pogs`	varchar(66)	,--	配偶公司
	`pogsdh`	varchar(67)	,--	配偶公司电话
	`khlx`	varchar(68)	,--	客户类型
	`sqrq`	date	,--	申请日期
	`fkrq`	date	,--	放款日期
	`hkrq`	date	,--	还款日
	`bddqr`	date	,--	保单到期日
	`dkje`	double	,--	贷款金额
	`dkzl`	varchar(68)	,--	贷款种类
	`khll`	double	,--	客户利率
	`cj`	double	,--	车价
	`cx`	varchar(68)	,--	车型
	`zw`	varchar(68)	,--	职位
	`sr`	double	,--	收入
	`dbrxm`	varchar(68)	,--	担保人姓名
	`ysqrgx`	varchar(68)	,--	与申请人关系
	`dbrcsrq`	date	,--	担保人出生日期
	`dbrsfzh`	varchar(68)	,--	担保人身份证号
	`dbrsj`	varchar(69)	,--	担保人手机
	`dbrgsmc`	varchar(70)	,--	担保人公司名称
	`dbrgsdh`	varchar(71)	,--	担保人公司电话
	`dbrgsdz`	varchar(72)	,--	担保人公司地址
	`yx`	varchar(73)	,--	银行
	`zh`	varchar(74)	,--	帐号
	`wydcyy`	text	,--	网银导出原因
	`yqyy`	text	,--	逾期原因
	`dhqk`	text	,--	电话情况
	`dhlxr`	varchar(73)	,--	电话联系人
	`hkqk`	text	,--	还款情况
	`hkr`	varchar(73)	,--	还款人
	`xxxglb`	varchar(73)	,--	信息修改类别
	`clqk`	text	,--	车辆情况
	`khhztd`	text	,--	客户合作态度
	`clzt`	text	,--	处理状态
	`fkuirq`	date	,--	反馈日期
	`wwjieg`	text	,--	委外结果
	`pcode`	varchar(73)	,--	PCODE
	`ccode`	varchar(73)	,--	CCODE
	PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;	

drop table if exists  `entrusted_case_credit_loan`;
create table `entrusted_case_credit_loan`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	自增主键
	`code` varchar(20),
	`pch` varchar(20),
	`wwrq`	date	,--	委外日期
	`wwzt`	varchar(54)	,--	委外状态
	`wwjg` varchar(50)	,
	`wwje` double,
	`yhje` double,
	`syje` double,
	`khh`	varchar(50)	,--	客户号
	`khxm`	varchar(50)	,--	客户姓名
	`zhh`	varchar(50)	,--	账户号
	`xb`	varchar(50)	,--	性别
	`sfzh`	varchar(50)	,--	身份证号
	`fkjg`	varchar(50)	,--	放款机构
	`qyje`	double	,--	签约金额
	`fkje`	double	,--	放款金额
	`cplx`	varchar(50)	,--	产品类型
	`fksj`	datetime	,--	放款时间
	`tqjqje`	double	,--	提前结清金额
	`zqs`	int	,--	总期数
	`dqqs`	int	,--	当前期数
	`yhqs`	int	,--	已还期数
	`sybj`	double	,--	剩余本金
	`yqlx`	double	,--	逾期利息
	`yqfx`	double	,--	逾期罚息
	`yqglf`	double	,--	逾期管理费
	`yqwyj`	double	,--	逾期违约金
	`yqbj`	double	,--	逾期本金
	`whbj`	double	,--	未还本金
	`yhke`	double	,--	月还款额
	`zhm`	varchar(50)	,--	账户名
	`yxm`	varchar(50)	,--	银行名
	`yxzh`	varchar(50)	,--	银行帐号
	`gjgs`	varchar(50)	,--	归集公司
	`yqts`	double	,--	逾期天数
	`zl`	double	,--	账龄
	`cs`	varchar(50)	,--	城市
	`dzyx`	varchar(50)	,--	电子邮箱
	`hjdh`	varchar(50)	,--	户籍电话
	`hjdz`	varchar(50)	,--	户籍地址
	`sjhm`	varchar(50)	,--	手机号码
	`zzdh`	varchar(50)	,--	住宅电话
	`zzdz`	varchar(50)	,--	住宅地址
	`gsmc`	varchar(50)	,--	公司名称
	`gsdz`	varchar(50)	,--	公司地址
	`gsdh`	varchar(50)	,--	公司电话
	`llr1xm`	varchar(50)	,--	联络人1姓名
	`llr1gx`	varchar(50)	,--	联络人1关系
	`llr1dh`	varchar(50)	,--	联络人1电话
	`llr2xm`	varchar(50)	,--	联络人2姓名
	`llr2gx`	varchar(50)	,--	联络人2关系
	`llr2dh`	varchar(50)	,--	联络人2电话
	`llr3xm`	varchar(50)	,--	联络人3姓名
	`llr3gx`	varchar(50)	,--	联络人3关系
	`llr3dh`	varchar(50)	,--	联络人3电话
	`llr4xm`	varchar(50)	,--	联络人4姓名
	`llr4gx`	varchar(50)	,--	联络人4关系
	`llr4dh`	varchar(50)	,--	联络人4电话
	`llr5xm`	varchar(50)	,--	联络人5姓名
	`llr5gx`	varchar(50)	,--	联络人5关系
	`llr5dh`	varchar(50)	,--	联络人5电话
	`llr6xm`	varchar(50)	,--	联络人6姓名
	`llr6gx`	varchar(50)	,--	联络人6关系
	`llr6dh`	varchar(50)	,--	联络人6电话
	`llr7xm`	varchar(50)	,--	联络人7姓名
	`llr7gx`	varchar(50)	,--	联络人7关系
	`llr7dh`	varchar(50)	,--	联络人7电话
	`llr8xm`	varchar(50)	,--	联络人8姓名
	`llr8gx`	varchar(50)	,--	联络人8关系
	`llr8dh`	varchar(50)	,--	联络人8电话
	`llr9xm`	varchar(50)	,--	联络人9姓名
	`llr9gx`	varchar(50)	,--	联络人9关系
	`llr9dh`	varchar(50)	,--	联络人9电话
	`llr10xm`	varchar(50)	,--	联络人10姓名
	`llr10gx`	varchar(50)	,--	联络人10关系
	`llr10dh`	varchar(50)	,--	联络人10电话
	PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `entrusted_case_credit_card`;
create table `entrusted_case_credit_card`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	自增主键
	`code` varchar(20),
	`pch`	varchar(50)	,--	批次号
	`wwrq`	date	,--	委外日期
	`wwzt`	varchar(54)	,--	委外状态
	`wwjg` varchar(50)	,
	`wwje` double,
	`yhje` double,
	`syje` double,
	`tarq` date,
	`gaxlh`	varchar(50)	,--	个案序列号
	`xm`	varchar(50)	,--	姓名
	`wtf`	varchar(50)	,--	委托方
	`ajzt`	varchar(50)	,--	案件状态
	`zjh`	varchar(50)	,--	证件号
	`zjlx`	varchar(50)	,--	证件类型
	`xb`	varchar(50)	,--	性别
	`cszt`	varchar(50)	,--	催收状态
	`wfzt`	varchar(50)	,--	外访状态
	`khx`	varchar(50)	,--	开户行
	`kh`	varchar(50)	,--	卡号
	`zh`	varchar(50)	,--	账号
	`zhmc`	varchar(50)	,--	账户名称
	`kl`	varchar(50)	,--	卡类
	`dah`	varchar(50)	,--	档案号
	`warq`	date	,--	委案日期
	`waje`	double	,--	委案金额
	`ptpje`	double	,--	PTP金额
	`cpje`	double	,--	CP金额
	`zxqk`	double	,--	最新欠款（导入利息后更新）
	`rmb`	varchar(50)	,--	人民币
	`gb`	varchar(50)	,--	港币
	`wb`	varchar(50)	,--	外币
	`csy`	varchar(50)	,--	催收员
	`csyid`	varchar(50)	,--	催收员ID
	`csybm`	varchar(50)	,--	催收员部门
	`csqy`	varchar(50)	,--	催收区域
	`csxj`	text	,--	催收小结
	`zhtd`	varchar(50)	,--	最后通电
	`yhk`	double	,--	已还款
	`fpls`	text	,--	分配历史
	`fpsj`	datetime	,--	分配时间
	`xcgjrq`	date	,--	下次跟进日期
	`gjcs`	int	,--	跟进次数
	`mzxs`	double	,--	M值系数
	`yqzl`	double	,--	逾期账龄
	`yx`	varchar(50)	,--	邮箱
	`qq`	varchar(50)	,--	QQ
	`sj`	varchar(50)	,--	手机
	`jthm`	varchar(50)	,--	家庭号码
	`dwhm`	varchar(50)	,--	单位号码
	`dwmc`	varchar(50)	,--	单位名称
	`dwdz`	varchar(50)	,--	单位地址
	`dwyb`	varchar(50)	,--	单位邮编
	`jtdz`	varchar(50)	,--	家庭地址
	`jtyb`	varchar(50)	,--	家庭邮编
	`dzddz`	varchar(50)	,--	对账单地址
	`dzdyb`	varchar(50)	,--	对账单邮编
	`hjdz`	varchar(50)	,--	户籍地址
	`hjdyb`	varchar(50)	,--	户籍地邮编
	`zw`	varchar(50)	,--	职位
	`bm`	varchar(50)	,--	部门
	`sf`	varchar(50)	,--	省份
	`cs`	varchar(50)	,--	城市
	`qx`	varchar(50)	,--	区县
	`sr`	date	,--	生日
	`nl`	double	,--	年龄
	`wczje`	double	,--	未出账金额
	`biz`	varchar(50)	,--	币种
	`ycsjl`	text	,--	原催收记录
	`bj`	double	,--	本金
	`zdhke`	double	,--	最低还款额
	`xyed`	double	,--	信用额度
	`tqjb`	varchar(50)	,--	拖欠级别
	`xdfl`	varchar(50)	,--	信贷分类
	`csfl`	varchar(50)	,--	催收分类
	`yqlx`	double	,--	逾期利息
	`znj`	double	,--	滞纳金
	`zhhkr`	date	,--	最后还款日
	`zhxfr`	date	,--	最后消费日
	`zhtxr`	date	,--	最后提现日
	`tkr`	date	,--	停卡日
	`kkr`	date	,--	开卡日
	`hkqx`	double	,--	还款期限
	`lxr1xm`	varchar(50)	,--	联系人1姓名
	`lxr1zjh`	varchar(50)	,--	联系人1证件号
	`lxr1gx`	varchar(50)	,--	联系人1关系
	`lxr1dw`	varchar(50)	,--	联系人1单位
	`lxr1jtdh`	varchar(50)	,--	联系人1家庭电话
	`lxr1dwdh`	varchar(50)	,--	联系人1单位电话
	`lxr1sj`	varchar(50)	,--	联系人1手机
	`lxr1dz`	varchar(50)	,--	联系人1地址
	`lxr2xm`	varchar(50)	,--	联系人2姓名
	`lxr2zjh`	varchar(50)	,--	联系人2证件号
	`lxr2gx`	varchar(50)	,--	联系人2关系
	`lxr2dw`	varchar(50)	,--	联系人2单位
	`lxr2jtdh`	varchar(50)	,--	联系人2家庭电话
	`lxr2dwdh`	varchar(50)	,--	联系人2单位电话
	`lxr2sj`	varchar(50)	,--	联系人2手机
	`lxr2dz`	varchar(50)	,--	联系人2地址
	`lxr3xm`	varchar(50)	,--	联系人3姓名
	`lxr3zjh`	varchar(50)	,--	联系人3证件号
	`lxr3gx`	varchar(50)	,--	联系人3关系
	`lxr3dw`	varchar(50)	,--	联系人3单位
	`lxr3jtdh`	varchar(50)	,--	联系人3家庭电话
	`lxr3dwdh`	varchar(50)	,--	联系人3单位电话
	`lxr3sj`	varchar(50)	,--	联系人3手机
	`lxr3dz`	varchar(50)	,--	联系人3地址
	`lxr4xm`	varchar(50)	,--	联系人4姓名
	`lxr4zjh`	varchar(50)	,--	联系人4证件号
	`lxr4gx`	varchar(50)	,--	联系人4关系
	`lxr4dw`	varchar(50)	,--	联系人4单位
	`lxr4jtdh`	varchar(50)	,--	联系人4家庭电话
	`lxr4dwdh`	varchar(50)	,--	联系人4单位电话
	`lxr4sj`	varchar(50)	,--	联系人4手机
	`lxr4dz`	varchar(50)	,--	联系人4地址
	`lxr5xm`	varchar(50)	,--	联系人5姓名
	`lxr5zj`	varchar(50)	,--	联系人5证件
	`lxr5gx`	varchar(50)	,--	联系人5关系
	`lxr5dw`	varchar(50)	,--	联系人5单位
	`lxr5jtdh`	varchar(50)	,--	联系人5家庭电话
	`lxr5dwdh`	varchar(50)	,--	联系人5单位电话
	`lxr5sj`	varchar(50)	,--	联系人5手机
	`lxr5dz`	varchar(50)	,--	联系人5地址
	`lxr6xm`	varchar(50)	,--	联系人6姓名
	`lxr6zj`	varchar(50)	,--	联系人6证件
	`lxr6gx`	varchar(50)	,--	联系人6关系
	`lxr6dw`	varchar(50)	,--	联系人6单位
	`lxr6jtdh`	varchar(50)	,--	联系人6家庭电话
	`lxr6dwdh`	varchar(50)	,--	联系人6单位电话
	`lxr6sj`	varchar(50)	,--	联系人6手机
	`lxr6dz`	varchar(50)	,--	联系人6地址
	`bz1`	text	,--	备注1
	`bz2`	text	,--	备注2
	`bz3`	text	,--	备注3
	`bz4`	text	,--	备注4
	`bz5`	text	,--	备注5
	`bz6`	text	,--	备注6
	`sp`	varchar(50)	,--	商品
	`sh`	varchar(50)	,--	商户
	`zqk`	double	,--	总欠款(委案金融+公司佣金)
	`qkye`	double	,--	欠款余额
	`sqdh`	varchar(50)	,--	申请单号
	`yqrq`	date	,--	逾期日期
	`cssb`	varchar(50)	,--	催收手别
	`yqts`	double	,--	逾期天数
	`wtqx`	double	,--	委托期限
	`waqs`	int	,--	委案期数
	`yhqs`	int	,--	已还期数
	`zdr`	date	,--	账单日
	`gded`	double	,--	固定额度
	`zdzq`	double	,--	账单周期
	`zhhke`	double	,--	最后还款额
	`yjtar`	date	,--	预计退案日
	`sfzk`	varchar(50)	,--	是否主卡
	`fkkr`	varchar(50)	,--	副卡卡人
	`dkrq`	date	,--	贷款日期
	`sybj`	double	,--	剩余本金
	`yqqs`	int	,--	逾期期数
	`zyqcs`	int	,--	曾逾期次数
	`dkll`	double	,--	贷款利率
	`myhk`	double	,--	每月还款
	`yqje`	double	,--	逾期金额
	`yqbj`	double	,--	逾期本金
	`yqfx`	double	,--	逾期罚息
	`yqglf`	double	,--	逾期管理费
	`wyj`	double	,--	违约金
	`cxf`	double	,--	超限费
	`dkjzr`	date	,--	贷款截止日
	`bzj`	double	,--	保证金
	`sbdnh`	varchar(50)	,--	社保电脑号
	`sbkh`	varchar(50)	,--	社保卡号
	`sjtar`	date	,--	实际退案日
	`cx`	varchar(50)	,--	车型
	`pzh`	varchar(50)	,--	牌照号
	`cjh`	varchar(50)	,--	车架号
	`jg`	varchar(50)	,--	警告
	`zdyxx`	text	,--	自定义信息
	`zxcj`	varchar(50)	,--	最新催记
	PRIMARY KEY(`id`)
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

insert into `role` (name) values 
('ROLE_ADMIN'),
('ROLE_INSIDE_MANAGER'),
('ROLE_OUTSIDE_MANAGER'),
('ROLE_INSIDE_STAFF'),
('ROLE_OUTSIDE_STAFF');




insert into `interface` (id, address, description) values 
/*web interface*/
(1, '/login', '登录'),
(2,'/account/org/search.do', '组织结构查询'),
(3, '/account/search.do', '用户查询查询'),
(4, '/account/update.do', '用户信息更新'),
(5, '/account/create.do', '创建用户'),
(6, '/authority/role.do', '获取角色'),
(7, '/authority/interface.do', '获取接口信息'),
(8, '/authority/search.do', '获取角色接口访问权限'),
(9, '/authority/delete.do', '删除角色接口访问权限'),
(10, '/authority/add.do', '增加角色接口访问权限'),
(11, '/entrusted_case/import.do', '委案导入'),
(12, '/entrusted_case/search.do', '委案查询'),
(13, '/entrusted_case/download.do', '委案下载'),
(14, '/entrusted_case/update.do', '委案更新'),
(15, '/entrusted_case/manager/search.do', '委案管理信息查询'),
(16, '/entrusted_case/manager/update.do', '委案管理信息更新'),
(17, '/entrusted_case/report/submit.do', '提交委案汇报'),
(18, '/entrusted_case/report/search.do', '提交汇报查询'),
(19, '/entrusted_case/report/download.do', '提交汇报附件下载'),
(20, '/message/send.do', '发送消息'),
(22, '/message/read_message.do', '标记消息已读'),
(23, '/message/unread_messages.do', '获取消息委案'),
(24, '/message/receive.do', '获取消息内容'),
(25, '/message/download.do', '附件下载'),
(26, '/phone/records.do', '呼入电话列表'),
(27, '/phone/upload.do', '上传呼入电话'),
/*data inteface*/
(1000, '/entrusted_case_manager/get/own', '获取自己的委案管理信息'),
(1001, '/entrusted_case_manager/get/all', '获取所有的委案管理信息'),
/*ui inteface*/
(2000, '/nav/tips/missed_call', '未接电话提示'),
(2001, '/nav/tips/messages', '未处理消息'),
(2002, '/console/summary/owner', '委案所有者摘要'),
(2003, '/console/summary/assigner', '委案接收者摘要'),
(2004, '/console/summary/manager', '委案接收者摘要'),
(2005, '/ec/edit/all', '编辑所有委案'),
(2006, '/ec/edit/owner', '编辑拥有的委案'),
(2007, '/ec/import', '导入委案'),
(2008, '/ec/ask', '委案提问'),
(2009, '/ec/answer', '委案答复'),
(2010, '/ec/assign', '分配委案'),
(2011, '/ec/backup', '委案备份'),
(2012, '/ec/export', '委案导出'),
(2013, '/ec/report', '委案工作汇报'),
(2014, '/user/manager', '管理用户'),
(2015, '/user/ec/assign', '指定委案负责人'),
(2016, '/phone/call', '拨打电话');


insert into `authority` (intf, role) values 
((select id from interface where address='/account/org/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/account/org/search.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/account/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/account/search.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/account/update.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/account/create.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/role.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/interface.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/delete.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/add.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/import.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/search.do'), (select id from role where name='ROLE_INSIDE_MANAGER')),
((select id from interface where address='/entrusted_case/search.do'), (select id from role where name='ROLE_OUTSIDE_MANAGER')),
((select id from interface where address='/entrusted_case/search.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/search.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/entrusted_case/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/download.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/download.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/entrusted_case/download.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/update.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/manager/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/manager/search.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/manager/update.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/manager/update.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/submit.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/report/search.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/search.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/download.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/report/download.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/download.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/send.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/send.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/read_message.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/read_message.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/unread_messages.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/unread_messages.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/receive.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/receive.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/download.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/download.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/phone/records.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/phone/upload.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),

/*data auth*/
((select id from interface where address='/entrusted_case_manager/get/own'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case_manager/get/all'), (select id from role where name='ROLE_ADMIN')),

/*UI auth*/
((select id from interface where address='/nav/tips/missed_call'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/nav/tips/messages'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/nav/tips/messages'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/console/summary/owner'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/console/summary/owner'), (select id from role where name='ROLE_INSIDE_MANAGER')),
((select id from interface where address='/console/summary/assigner'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/console/summary/assigner'), (select id from role where name='ROLE_OUTSIDE_MANAGER')),
((select id from interface where address='/console/summary/manager'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/ec/edit/all'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/ec/edit/all'), (select id from role where name='ROLE_INSIDE_MANAGER')),
((select id from interface where address='/ec/edit/owner'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/ec/import'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/ec/ask'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/ec/answer'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/ec/assign'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/ec/backup'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/ec/export'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/ec/report'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/user/manager'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/user/ec/assign'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/phone/call'), (select id from role where name='ROLE_OUTSIDE_STAFF'));
/*
DROP procedure IF EXISTS `initDataIf`;
USE `collection`;
DROP procedure IF EXISTS `initDataIf`;

DELIMITER $$
USE `collection`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `initDataIf`()
BEGIN
  DECLARE a int;
  
  -- 遍历数据结束标志
  DECLARE done INT DEFAULT FALSE;
  
  -- 游标
  DECLARE cur CURSOR FOR select id from interface where id >= 1000 and id < 2000;

  -- 将结束标志绑定到游标
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  
  -- 打开游标
  OPEN cur;
   
  -- 开始循环 
  read_loop: LOOP
    -- 提取游标里的数据，这里只有一个，多个的话也一样；
    FETCH cur INTO a;
    -- 声明结束的时候
    IF done THEN
      LEAVE read_loop;
    END IF;
    -- 这里做你想做的循环的事件

	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_ADMIN'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_INSIDE_MANAGER'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_OUTSIDE_MANAGER'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_INSIDE_STAFF'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_OUTSIDE_STAFF'));
	

  END LOOP;
  -- 关闭游标
  CLOSE cur;
END$$
DELIMITER ;

call initDataIf();

DROP procedure IF EXISTS `initDataIf`;

delete from authority where intf = 1600 and role = (select id from role where name='ROLE_OUTSIDE_STAFF');
delete from authority where intf = 1600 and role = (select id from role where name='ROLE_INSIDE_STAFF');
delete from authority where intf = 1601 and role = (select id from role where name='ROLE_ADMIN');
delete from authority where intf = 1601 and role = (select id from role where name='ROLE_MANAGER');
*/

/*++++++++++++++++++++++++++++++++++++++++++++++测试数据 +++++++++++++++++++++++++++++++++++++++++++++*/

insert into organization (parent, name, status) values
(null, '总公司', 0),
(1, '上海分公司', 0),
(1, '北京分公司', 0),
(1, '沈阳分公司', 0),
(2, '上海分公司第一分部', 0),
(2, '上海分公司第二分部', 0),
(3, '北京分公司第一分部', 0),
(3, '北京分公司第二分部', 0),
(3, '北京分公司第三分部', 0),
(4, '沈阳分公司第一分部', 0),
(4, '沈阳分公司第二分部', 0),
(4, '沈阳分公司第三分部', 0);

insert into user (username, password, org, position, status) values
('test', '1', 1, '测试职位1', 0),
('test1', '1', 1, '测试职位2', 0),
('admin', '1', 1, '管理层', 0),
('inside', '1', 1, '内勤', 0),
('outside', '1', 1, '外勤', 0),
('insideMgr', '1', 1, '内勤管理', 0),
('outsideMgr', '1', 1, '外勤管理', 0);

insert into `message` (come, dest, entrustedCaseManager, title, content, sendTime)
values
(5, 1, 1, 'test', 'test detail', current_time()),
(1, 5, 1, 'RE:1', 'you are right', current_time()),
(5, 1, 1, 'test', 'test new detail123332', current_time());

insert into `entrusted_case_manager` (owner, assignee, modifier, type, entrustedCase, createdTime, lastModifiedTime, batchNo)
values
(1, 2, 1, 0, 1, current_time(), current_time(), 1);

insert into `entrusted_case_batch_creator` (createdTime)
values
(current_time());


insert into `entrusted_case_car_loan` (code, khxm)
values
('01225412', 'test');

insert into `phone_records` (`number`, `status`, `entrustedCase`, `startTime`, attachement)
values
('15968542364', 2, null, '2010-11-12 18:58:25', 1),
('15968542364', 2, null, '2010-10-12 18:44:25', 1),
('15968542364', 2, null, '2010-12-12 18:36:25', 1),
('15968542364', 1, 1, '2010-11-12 18:58:25', 1),
('15968542364', 1, 1, '2010-10-12 18:44:25', 1),
('15968542364', 1, 1, '2010-12-12 18:36:25', 1),
('15968542364', 0, 1, '2010-11-12 18:58:25', 1),
('15968542364', 0, null, '2010-10-12 18:44:25', 1),
('15968542364', 0, 1, '2010-12-12 18:36:25', 1);

insert into `attachements` (`fileAddress`, `display`, `uploadTime`)
values
('PHONES/faet', "asdfasdfasdf.mp3", current_time());


insert into user_role (user, role) values
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(3, 1),
(6, 2),
(7, 3),
(4, 4),
(5, 5);
