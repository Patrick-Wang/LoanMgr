create table `organization`(
	 `id` int NOT NULL AUTO_INCREMENT,
	 `parent` int default NULL,
	 `name` varchar(50) NOT NULL,
	 `status` int default 0,
	  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;


create table `user`(
	 `id` int NOT NULL AUTO_INCREMENT,
	 `username` varchar(20) NOT NULL,
	 `password` varchar(20) NOT NULL,
	 `org` int  NOT NULL,
	 `status` int default 0,
	  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;


create table `entrusted_case_manager`(
	`id` int NOT NULL AUTO_INCREMENT,
	`owner` int NOT NULL,
	`assignee` int,
	`type` int,
	`entrustedCase` int not null,
	`createdTime` datetime,
	`lastModifiedTime` datetime,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;


create table `entrusted_case_report`(
	`id` int NOT NULL AUTO_INCREMENT,
	`creator` int NOT NULL,
	`date`	date  NOT NULL,
	`entrustedCaseManager` int not null,
	`title`	text,
	`content`	text,
	`attachements`	text,
	`createdTime` datetime,
	`lastModifiedTime` datetime,
	`modifier` int,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;


create table `message`(
	`id` int NOT NULL AUTO_INCREMENT,
	`from` int NOT NULL,
	`to` int NOT NULL,
	`entrustedCaseManager` int not null,
	`content`	text,
	`attachements`	text,
	`send_time` datetime,
	`read` int default 0,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

create table `role`(
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;


create table `interface`(
	`id` int NOT NULL,
	`address` varchar(250) NOT NULL,
	`description` varchar(1000),
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `user_role`(
	`id` int NOT NULL AUTO_INCREMENT,
	`user` int NOT NULL,
	`role` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

create table `authority`(
	`id` int NOT NULL AUTO_INCREMENT,
	`role` int NOT NULL,
	`intf` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

create table `entrusted_case_car_loan`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	自增主键
	`xh`	int	,--	序号
	`wwrq`	date	,--	委外日期
	`wwdqr`	date	,--	委外到期日
	`jarq`	date	,--	结案日期
	`khxm`	varchar(50)	,--	客户姓名
	`htbh`	varchar(51)	,--	合同编号
	`wbsbh`	varchar(52)	,--	外包商编号
	`wwlx`	varchar(53)	,--	委外类型
	`khxb`	varchar(54)	,--	客户性别
	`khcsrq`	date	,--	客户出生日期
	`khsfzh`	varchar(54)	,--	客户身份证号
	`wwzt`	varchar(54)	,--	委外状态
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
	`bz`	text	,--	备注
	`wwjg`	text	,--	委外结果
	`pcode`	varchar(73)	,--	PCODE
	`ccode`	varchar(73)	,--	CCODE
	PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;	


create table `entrusted_case_credit_loan`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	自增主键
	`khh`	varchar(50)	,--	客户号
	`khxm`	varchar(50)	,--	客户姓名
	`zhh`	varchar(50)	,--	账户号
	`xb`	varchar(50)	,--	性别
	`sfzh`	varchar(50)	,--	身份证号
	`fkjg`	varchar(50)	,--	放款机构
	`qyje`	double	,--	签约金额
	`fkje`	double	,--	放款金额
	`cplx`	varchar(50)	,--	产品类型
	`fksj`	date	,--	放款时间
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

create table `entrusted_case_credit_card`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	自增主键
	`cid`	int	,--	内部管理ID
	`gaxlh`	varchar(50)	,--	个案序列号
	`xm`	varchar(50)	,--	姓名
	`wtf`	varchar(50)	,--	委托方
	`pch`	varchar(50)	,--	批次号
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
	`bz`	varchar(50)	,--	币种
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


insert into organization (parent, name, status) values
(null, 'testorg', 0);

insert into user (username, password, org, status) values
('test', 'test', '0', 0);

insert into `role` (name) values 
('ROLE_ADMIN'),
('ROLE_MANAGER'),
('ROLE_INSIDE_STAFF'),
('ROLE_OUTSIDE_STAFF');

insert into `interface` (id, address, description) values 
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
(21, '/message/unread.do', '获取未读消息'),
(22, '/message/readmessage.do', '标记消息已读'),
(23, '/message/entrusted_case.do', '获取消息委案'),
(24, '/message/receive.do', '获取消息内容'),
(25, '/message/download.do', '附件下载'),
(26, '/phone/records.do', '呼入电话列表'),
(27, '/phone/upload.do', '上传呼入电话'),
(1000, 'entrusted_case_car_loan.id', '自增主键'),
(1001, 'entrusted_case_car_loan.xh', '序号'),
(1002, 'entrusted_case_car_loan.wwrq', '委外日期'),
(1003, 'entrusted_case_car_loan.wwdqr', '委外到期日'),
(1004, 'entrusted_case_car_loan.jarq', '结案日期'),
(1005, 'entrusted_case_car_loan.khxm', '客户姓名'),
(1006, 'entrusted_case_car_loan.htbh', '合同编号'),
(1007, 'entrusted_case_car_loan.wbsbh', '外包商编号'),
(1008, 'entrusted_case_car_loan.wwlx', '委外类型'),
(1009, 'entrusted_case_car_loan.khxb', '客户性别'),
(1010, 'entrusted_case_car_loan.khcsrq', '客户出生日期'),
(1011, 'entrusted_case_car_loan.khsfzh', '客户身份证号'),
(1012, 'entrusted_case_car_loan.wwzt', '委外状态'),
(1013, 'entrusted_case_car_loan.wfqs', '外访期数'),
(1014, 'entrusted_case_car_loan.wfje', '外访金额'),
(1015, 'entrusted_case_car_loan.yqts', '逾期天数'),
(1016, 'entrusted_case_car_loan.yqje', '逾期金额'),
(1017, 'entrusted_case_car_loan.ygckje', '月供车款金额'),
(1018, 'entrusted_case_car_loan.dkqx', '贷款期限'),
(1019, 'entrusted_case_car_loan.yqqs', '逾期期数'),
(1020, 'entrusted_case_car_loan.zjyqcs', '曾经逾期次数'),
(1021, 'entrusted_case_car_loan.hkqs', '还款期数'),
(1022, 'entrusted_case_car_loan.cs', '城市'),
(1023, 'entrusted_case_car_loan.jxs', '经销商'),
(1024, 'entrusted_case_car_loan.khsj', '客户手机'),
(1025, 'entrusted_case_car_loan.khzd', '客户宅电'),
(1026, 'entrusted_case_car_loan.khgs', '客户公司'),
(1027, 'entrusted_case_car_loan.khgsdh', '客户公司电话'),
(1028, 'entrusted_case_car_loan.fq', '分区'),
(1029, 'entrusted_case_car_loan.qh', '区号'),
(1030, 'entrusted_case_car_loan.yb', '邮编'),
(1031, 'entrusted_case_car_loan.poxm', '配偶姓名'),
(1032, 'entrusted_case_car_loan.posj', '配偶手机'),
(1033, 'entrusted_case_car_loan.qtlxfs', '其他联系方式'),
(1034, 'entrusted_case_car_loan.pogs', '配偶公司'),
(1035, 'entrusted_case_car_loan.pogsdh', '配偶公司电话'),
(1036, 'entrusted_case_car_loan.khlx', '客户类型'),
(1037, 'entrusted_case_car_loan.sqrq', '申请日期'),
(1038, 'entrusted_case_car_loan.fkrq', '放款日期'),
(1039, 'entrusted_case_car_loan.hkrq', '还款日'),
(1040, 'entrusted_case_car_loan.bddqr', '保单到期日'),
(1041, 'entrusted_case_car_loan.dkje', '贷款金额'),
(1042, 'entrusted_case_car_loan.dkzl', '贷款种类'),
(1043, 'entrusted_case_car_loan.khll', '客户利率'),
(1044, 'entrusted_case_car_loan.cj', '车价'),
(1045, 'entrusted_case_car_loan.cx', '车型'),
(1046, 'entrusted_case_car_loan.zw', '职位'),
(1047, 'entrusted_case_car_loan.sr', '收入'),
(1048, 'entrusted_case_car_loan.dbrxm', '担保人姓名'),
(1049, 'entrusted_case_car_loan.ysqrgx', '与申请人关系'),
(1050, 'entrusted_case_car_loan.dbrcsrq', '担保人出生日期'),
(1051, 'entrusted_case_car_loan.dbrsfzh', '担保人身份证号'),
(1052, 'entrusted_case_car_loan.dbrsj', '担保人手机'),
(1053, 'entrusted_case_car_loan.dbrgsmc', '担保人公司名称'),
(1054, 'entrusted_case_car_loan.dbrgsdh', '担保人公司电话'),
(1055, 'entrusted_case_car_loan.dbrgsdz', '担保人公司地址'),
(1056, 'entrusted_case_car_loan.yx', '银行'),
(1057, 'entrusted_case_car_loan.zh', '帐号'),
(1058, 'entrusted_case_car_loan.wydcyy', '网银导出原因'),
(1059, 'entrusted_case_car_loan.yqyy', '逾期原因'),
(1060, 'entrusted_case_car_loan.dhqk', '电话情况'),
(1061, 'entrusted_case_car_loan.dhlxr', '电话联系人'),
(1062, 'entrusted_case_car_loan.hkqk', '还款情况'),
(1063, 'entrusted_case_car_loan.hkr', '还款人'),
(1064, 'entrusted_case_car_loan.xxxglb', '信息修改类别'),
(1065, 'entrusted_case_car_loan.clqk', '车辆情况'),
(1066, 'entrusted_case_car_loan.khhztd', '客户合作态度'),
(1067, 'entrusted_case_car_loan.clzt', '处理状态'),
(1068, 'entrusted_case_car_loan.fkuirq', '反馈日期'),
(1069, 'entrusted_case_car_loan.bz', '备注'),
(1070, 'entrusted_case_car_loan.wwjg', '委外结果'),
(1071, 'entrusted_case_car_loan.pcode', 'PCODE'),
(1072, 'entrusted_case_car_loan.ccode', 'CCODE'),
(1200, 'entrusted_case_credit_loan.id', '自增主键'),
(1201, 'entrusted_case_credit_loan.khh', '客户号'),
(1202, 'entrusted_case_credit_loan.khxm', '客户姓名'),
(1203, 'entrusted_case_credit_loan.zhh', '账户号'),
(1204, 'entrusted_case_credit_loan.xb', '性别'),
(1205, 'entrusted_case_credit_loan.sfzh', '身份证号'),
(1206, 'entrusted_case_credit_loan.fkjg', '放款机构'),
(1207, 'entrusted_case_credit_loan.qyje', '签约金额'),
(1208, 'entrusted_case_credit_loan.fkje', '放款金额'),
(1209, 'entrusted_case_credit_loan.cplx', '产品类型'),
(1210, 'entrusted_case_credit_loan.fksj', '放款时间'),
(1211, 'entrusted_case_credit_loan.tqjqje', '提前结清金额'),
(1212, 'entrusted_case_credit_loan.zqs', '总期数'),
(1213, 'entrusted_case_credit_loan.dqqs', '当前期数'),
(1214, 'entrusted_case_credit_loan.yhqs', '已还期数'),
(1215, 'entrusted_case_credit_loan.sybj', '剩余本金'),
(1216, 'entrusted_case_credit_loan.yqlx', '逾期利息'),
(1217, 'entrusted_case_credit_loan.yqfx', '逾期罚息'),
(1218, 'entrusted_case_credit_loan.yqglf', '逾期管理费'),
(1219, 'entrusted_case_credit_loan.yqwyj', '逾期违约金'),
(1220, 'entrusted_case_credit_loan.yqbj', '逾期本金'),
(1221, 'entrusted_case_credit_loan.whbj', '未还本金'),
(1222, 'entrusted_case_credit_loan.yhke', '月还款额'),
(1223, 'entrusted_case_credit_loan.zhm', '账户名'),
(1224, 'entrusted_case_credit_loan.yxm', '银行名'),
(1225, 'entrusted_case_credit_loan.yxzh', '银行帐号'),
(1226, 'entrusted_case_credit_loan.gjgs', '归集公司'),
(1227, 'entrusted_case_credit_loan.yqts', '逾期天数'),
(1228, 'entrusted_case_credit_loan.zl', '账龄'),
(1229, 'entrusted_case_credit_loan.cs', '城市'),
(1230, 'entrusted_case_credit_loan.dzyx', '电子邮箱'),
(1231, 'entrusted_case_credit_loan.hjdh', '户籍电话'),
(1232, 'entrusted_case_credit_loan.hjdz', '户籍地址'),
(1233, 'entrusted_case_credit_loan.sjhm', '手机号码'),
(1234, 'entrusted_case_credit_loan.zzdh', '住宅电话'),
(1235, 'entrusted_case_credit_loan.zzdz', '住宅地址'),
(1236, 'entrusted_case_credit_loan.gsmc', '公司名称'),
(1237, 'entrusted_case_credit_loan.gsdz', '公司地址'),
(1238, 'entrusted_case_credit_loan.gsdh', '公司电话'),
(1239, 'entrusted_case_credit_loan.llr1xm', '联络人1姓名'),
(1240, 'entrusted_case_credit_loan.llr1gx', '联络人1关系'),
(1241, 'entrusted_case_credit_loan.llr1dh', '联络人1电话'),
(1242, 'entrusted_case_credit_loan.llr2xm', '联络人2姓名'),
(1243, 'entrusted_case_credit_loan.llr2gx', '联络人2关系'),
(1244, 'entrusted_case_credit_loan.llr2dh', '联络人2电话'),
(1245, 'entrusted_case_credit_loan.llr3xm', '联络人3姓名'),
(1246, 'entrusted_case_credit_loan.llr3gx', '联络人3关系'),
(1247, 'entrusted_case_credit_loan.llr3dh', '联络人3电话'),
(1248, 'entrusted_case_credit_loan.llr4xm', '联络人4姓名'),
(1249, 'entrusted_case_credit_loan.llr4gx', '联络人4关系'),
(1250, 'entrusted_case_credit_loan.llr4dh', '联络人4电话'),
(1251, 'entrusted_case_credit_loan.llr5xm', '联络人5姓名'),
(1252, 'entrusted_case_credit_loan.llr5gx', '联络人5关系'),
(1253, 'entrusted_case_credit_loan.llr5dh', '联络人5电话'),
(1254, 'entrusted_case_credit_loan.llr6xm', '联络人6姓名'),
(1255, 'entrusted_case_credit_loan.llr6gx', '联络人6关系'),
(1256, 'entrusted_case_credit_loan.llr6dh', '联络人6电话'),
(1257, 'entrusted_case_credit_loan.llr7xm', '联络人7姓名'),
(1258, 'entrusted_case_credit_loan.llr7gx', '联络人7关系'),
(1259, 'entrusted_case_credit_loan.llr7dh', '联络人7电话'),
(1260, 'entrusted_case_credit_loan.llr8xm', '联络人8姓名'),
(1261, 'entrusted_case_credit_loan.llr8gx', '联络人8关系'),
(1262, 'entrusted_case_credit_loan.llr8dh', '联络人8电话'),
(1263, 'entrusted_case_credit_loan.llr9xm', '联络人9姓名'),
(1264, 'entrusted_case_credit_loan.llr9gx', '联络人9关系'),
(1265, 'entrusted_case_credit_loan.llr9dh', '联络人9电话'),
(1266, 'entrusted_case_credit_loan.llr10xm', '联络人10姓名'),
(1267, 'entrusted_case_credit_loan.llr10gx', '联络人10关系'),
(1268, 'entrusted_case_credit_loan.llr10dh', '联络人10电话'),
(1400, 'entrusted_case_credit_card.id', '自增主键'),
(1401, 'entrusted_case_credit_card.cid', '内部管理ID'),
(1402, 'entrusted_case_credit_card.gaxlh', '个案序列号'),
(1403, 'entrusted_case_credit_card.xm', '姓名'),
(1404, 'entrusted_case_credit_card.wtf', '委托方'),
(1405, 'entrusted_case_credit_card.pch', '批次号'),
(1406, 'entrusted_case_credit_card.ajzt', '案件状态'),
(1407, 'entrusted_case_credit_card.zjh', '证件号'),
(1408, 'entrusted_case_credit_card.zjlx', '证件类型'),
(1409, 'entrusted_case_credit_card.xb', '性别'),
(1410, 'entrusted_case_credit_card.cszt', '催收状态'),
(1411, 'entrusted_case_credit_card.wfzt', '外访状态'),
(1412, 'entrusted_case_credit_card.khx', '开户行'),
(1413, 'entrusted_case_credit_card.kh', '卡号'),
(1414, 'entrusted_case_credit_card.zh', '账号'),
(1415, 'entrusted_case_credit_card.zhmc', '账户名称'),
(1416, 'entrusted_case_credit_card.kl', '卡类'),
(1417, 'entrusted_case_credit_card.dah', '档案号'),
(1418, 'entrusted_case_credit_card.warq', '委案日期'),
(1419, 'entrusted_case_credit_card.waje', '委案金额'),
(1420, 'entrusted_case_credit_card.ptpje', 'PTP金额'),
(1421, 'entrusted_case_credit_card.cpje', 'CP金额'),
(1422, 'entrusted_case_credit_card.zxqk（drlxhgx）', '最新欠款（导入利息后更新）'),
(1423, 'entrusted_case_credit_card.rmb', '人民币'),
(1424, 'entrusted_case_credit_card.gb', '港币'),
(1425, 'entrusted_case_credit_card.wb', '外币'),
(1426, 'entrusted_case_credit_card.csy', '催收员'),
(1427, 'entrusted_case_credit_card.csyid', '催收员ID'),
(1428, 'entrusted_case_credit_card.csybm', '催收员部门'),
(1429, 'entrusted_case_credit_card.csqy', '催收区域'),
(1430, 'entrusted_case_credit_card.csxj', '催收小结'),
(1431, 'entrusted_case_credit_card.zhtd', '最后通电'),
(1432, 'entrusted_case_credit_card.yhk', '已还款'),
(1433, 'entrusted_case_credit_card.fpls', '分配历史'),
(1434, 'entrusted_case_credit_card.fpsj', '分配时间'),
(1435, 'entrusted_case_credit_card.xcgjrq', '下次跟进日期'),
(1436, 'entrusted_case_credit_card.gjcs', '跟进次数'),
(1437, 'entrusted_case_credit_card.mzxs', 'M值系数'),
(1438, 'entrusted_case_credit_card.yqzl', '逾期账龄'),
(1439, 'entrusted_case_credit_card.yx', '邮箱'),
(1440, 'entrusted_case_credit_card.qq', 'QQ'),
(1441, 'entrusted_case_credit_card.sj', '手机'),
(1442, 'entrusted_case_credit_card.jthm', '家庭号码'),
(1443, 'entrusted_case_credit_card.dwhm', '单位号码'),
(1444, 'entrusted_case_credit_card.dwmc', '单位名称'),
(1445, 'entrusted_case_credit_card.dwdz', '单位地址'),
(1446, 'entrusted_case_credit_card.dwyb', '单位邮编'),
(1447, 'entrusted_case_credit_card.jtdz', '家庭地址'),
(1448, 'entrusted_case_credit_card.jtyb', '家庭邮编'),
(1449, 'entrusted_case_credit_card.dzddz', '对账单地址'),
(1450, 'entrusted_case_credit_card.dzdyb', '对账单邮编'),
(1451, 'entrusted_case_credit_card.hjdz', '户籍地址'),
(1452, 'entrusted_case_credit_card.hjdyb', '户籍地邮编'),
(1453, 'entrusted_case_credit_card.zw', '职位'),
(1454, 'entrusted_case_credit_card.bm', '部门'),
(1455, 'entrusted_case_credit_card.sf', '省份'),
(1456, 'entrusted_case_credit_card.cs', '城市'),
(1457, 'entrusted_case_credit_card.qx', '区县'),
(1458, 'entrusted_case_credit_card.sr', '生日'),
(1459, 'entrusted_case_credit_card.nl', '年龄'),
(1460, 'entrusted_case_credit_card.wczje', '未出账金额'),
(1461, 'entrusted_case_credit_card.bz', '币种'),
(1462, 'entrusted_case_credit_card.ycsjl', '原催收记录'),
(1463, 'entrusted_case_credit_card.bj', '本金'),
(1464, 'entrusted_case_credit_card.zdhke', '最低还款额'),
(1465, 'entrusted_case_credit_card.xyed', '信用额度'),
(1466, 'entrusted_case_credit_card.tqjb', '拖欠级别'),
(1467, 'entrusted_case_credit_card.xdfl', '信贷分类'),
(1468, 'entrusted_case_credit_card.csfl', '催收分类'),
(1469, 'entrusted_case_credit_card.yqlx', '逾期利息'),
(1470, 'entrusted_case_credit_card.znj', '滞纳金'),
(1471, 'entrusted_case_credit_card.zhhkr', '最后还款日'),
(1472, 'entrusted_case_credit_card.zhxfr', '最后消费日'),
(1473, 'entrusted_case_credit_card.zhtxr', '最后提现日'),
(1474, 'entrusted_case_credit_card.tkr', '停卡日'),
(1475, 'entrusted_case_credit_card.kkr', '开卡日'),
(1476, 'entrusted_case_credit_card.hkqx', '还款期限'),
(1477, 'entrusted_case_credit_card.lxr1xm', '联系人1姓名'),
(1478, 'entrusted_case_credit_card.lxr1zjh', '联系人1证件号'),
(1479, 'entrusted_case_credit_card.lxr1gx', '联系人1关系'),
(1480, 'entrusted_case_credit_card.lxr1dw', '联系人1单位'),
(1481, 'entrusted_case_credit_card.lxr1jtdh', '联系人1家庭电话'),
(1482, 'entrusted_case_credit_card.lxr1dwdh', '联系人1单位电话'),
(1483, 'entrusted_case_credit_card.lxr1sj', '联系人1手机'),
(1484, 'entrusted_case_credit_card.lxr1dz', '联系人1地址'),
(1485, 'entrusted_case_credit_card.lxr2xm', '联系人2姓名'),
(1486, 'entrusted_case_credit_card.lxr2zjh', '联系人2证件号'),
(1487, 'entrusted_case_credit_card.lxr2gx', '联系人2关系'),
(1488, 'entrusted_case_credit_card.lxr2dw', '联系人2单位'),
(1489, 'entrusted_case_credit_card.lxr2jtdh', '联系人2家庭电话'),
(1490, 'entrusted_case_credit_card.lxr2dwdh', '联系人2单位电话'),
(1491, 'entrusted_case_credit_card.lxr2sj', '联系人2手机'),
(1492, 'entrusted_case_credit_card.lxr2dz', '联系人2地址'),
(1493, 'entrusted_case_credit_card.lxr3xm', '联系人3姓名'),
(1494, 'entrusted_case_credit_card.lxr3zjh', '联系人3证件号'),
(1495, 'entrusted_case_credit_card.lxr3gx', '联系人3关系'),
(1496, 'entrusted_case_credit_card.lxr3dw', '联系人3单位'),
(1497, 'entrusted_case_credit_card.lxr3jtdh', '联系人3家庭电话'),
(1498, 'entrusted_case_credit_card.lxr3dwdh', '联系人3单位电话'),
(1499, 'entrusted_case_credit_card.lxr3sj', '联系人3手机'),
(1500, 'entrusted_case_credit_card.lxr3dz', '联系人3地址'),
(1501, 'entrusted_case_credit_card.lxr4xm', '联系人4姓名'),
(1502, 'entrusted_case_credit_card.lxr4zjh', '联系人4证件号'),
(1503, 'entrusted_case_credit_card.lxr4gx', '联系人4关系'),
(1504, 'entrusted_case_credit_card.lxr4dw', '联系人4单位'),
(1505, 'entrusted_case_credit_card.lxr4jtdh', '联系人4家庭电话'),
(1506, 'entrusted_case_credit_card.lxr4dwdh', '联系人4单位电话'),
(1507, 'entrusted_case_credit_card.lxr4sj', '联系人4手机'),
(1508, 'entrusted_case_credit_card.lxr4dz', '联系人4地址'),
(1509, 'entrusted_case_credit_card.lxr5xm', '联系人5姓名'),
(1510, 'entrusted_case_credit_card.lxr5zj', '联系人5证件'),
(1511, 'entrusted_case_credit_card.lxr5gx', '联系人5关系'),
(1512, 'entrusted_case_credit_card.lxr5dw', '联系人5单位'),
(1513, 'entrusted_case_credit_card.lxr5jtdh', '联系人5家庭电话'),
(1514, 'entrusted_case_credit_card.lxr5dwdh', '联系人5单位电话'),
(1515, 'entrusted_case_credit_card.lxr5sj', '联系人5手机'),
(1516, 'entrusted_case_credit_card.lxr5dz', '联系人5地址'),
(1517, 'entrusted_case_credit_card.lxr6xm', '联系人6姓名'),
(1518, 'entrusted_case_credit_card.lxr6zj', '联系人6证件'),
(1519, 'entrusted_case_credit_card.lxr6gx', '联系人6关系'),
(1520, 'entrusted_case_credit_card.lxr6dw', '联系人6单位'),
(1521, 'entrusted_case_credit_card.lxr6jtdh', '联系人6家庭电话'),
(1522, 'entrusted_case_credit_card.lxr6dwdh', '联系人6单位电话'),
(1523, 'entrusted_case_credit_card.lxr6sj', '联系人6手机'),
(1524, 'entrusted_case_credit_card.lxr6dz', '联系人6地址'),
(1525, 'entrusted_case_credit_card.bz1', '备注1'),
(1526, 'entrusted_case_credit_card.bz2', '备注2'),
(1527, 'entrusted_case_credit_card.bz3', '备注3'),
(1528, 'entrusted_case_credit_card.bz4', '备注4'),
(1529, 'entrusted_case_credit_card.bz5', '备注5'),
(1530, 'entrusted_case_credit_card.bz6', '备注6'),
(1531, 'entrusted_case_credit_card.sp', '商品'),
(1532, 'entrusted_case_credit_card.sh', '商户'),
(1533, 'entrusted_case_credit_card.zqk', '总欠款(委案金融+公司佣金)'),
(1534, 'entrusted_case_credit_card.qkye', '欠款余额'),
(1535, 'entrusted_case_credit_card.sqdh', '申请单号'),
(1536, 'entrusted_case_credit_card.yqrq', '逾期日期'),
(1537, 'entrusted_case_credit_card.cssb', '催收手别'),
(1538, 'entrusted_case_credit_card.yqts', '逾期天数'),
(1539, 'entrusted_case_credit_card.wtqx', '委托期限'),
(1540, 'entrusted_case_credit_card.waqs', '委案期数'),
(1541, 'entrusted_case_credit_card.yhqs', '已还期数'),
(1542, 'entrusted_case_credit_card.zdr', '账单日'),
(1543, 'entrusted_case_credit_card.gded', '固定额度'),
(1544, 'entrusted_case_credit_card.zdzq', '账单周期'),
(1545, 'entrusted_case_credit_card.zhhke', '最后还款额'),
(1546, 'entrusted_case_credit_card.yjtar', '预计退案日'),
(1547, 'entrusted_case_credit_card.sfzk', '是否主卡'),
(1548, 'entrusted_case_credit_card.fkkr', '副卡卡人'),
(1549, 'entrusted_case_credit_card.dkrq', '贷款日期'),
(1550, 'entrusted_case_credit_card.sybj', '剩余本金'),
(1551, 'entrusted_case_credit_card.yqqs', '逾期期数'),
(1552, 'entrusted_case_credit_card.zyqcs', '曾逾期次数'),
(1553, 'entrusted_case_credit_card.dkll', '贷款利率'),
(1554, 'entrusted_case_credit_card.myhk', '每月还款'),
(1555, 'entrusted_case_credit_card.yqje', '逾期金额'),
(1556, 'entrusted_case_credit_card.yqbj', '逾期本金'),
(1557, 'entrusted_case_credit_card.yqfx', '逾期罚息'),
(1558, 'entrusted_case_credit_card.yqglf', '逾期管理费'),
(1559, 'entrusted_case_credit_card.wyj', '违约金'),
(1560, 'entrusted_case_credit_card.cxf', '超限费'),
(1561, 'entrusted_case_credit_card.dkjzr', '贷款截止日'),
(1562, 'entrusted_case_credit_card.bzj', '保证金'),
(1563, 'entrusted_case_credit_card.sbdnh', '社保电脑号'),
(1564, 'entrusted_case_credit_card.sbkh', '社保卡号'),
(1565, 'entrusted_case_credit_card.sjtar', '实际退案日'),
(1566, 'entrusted_case_credit_card.cx', '车型'),
(1567, 'entrusted_case_credit_card.pzh', '牌照号'),
(1568, 'entrusted_case_credit_card.cjh', '车架号'),
(1569, 'entrusted_case_credit_card.jg', '警告'),
(1570, 'entrusted_case_credit_card.zdyxx', '自定义信息'),
(1571, 'entrusted_case_credit_card.zxcj', '最新催记');


insert into `authority` (intf, role) values 
((select id from interface where address='/account/org/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/account/org/search.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/account/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/account/update.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/account/create.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/role.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/interface.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/delete.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/authority/add.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/import.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/search.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/search.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/entrusted_case/search.do'), (select id from role where name='ROLE_MANAGER')),
((select id from interface where address='/entrusted_case/download.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/download.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/entrusted_case/download.do'), (select id from role where name='ROLE_MANAGER')),
((select id from interface where address='/entrusted_case/update.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/manager/search.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/manager/update.do'), (select id from role where name='ROLE_ADMIN')),
((select id from interface where address='/entrusted_case/report/submit.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/search.do'), (select id from role where name='ROLE_MANAGER')),
((select id from interface where address='/entrusted_case/report/search.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/search.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/download.do'), (select id from role where name='ROLE_MANAGER')),
((select id from interface where address='/entrusted_case/report/download.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/entrusted_case/report/download.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/send.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/send.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/unread.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/unread.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/readmessage.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/readmessage.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/entrusted_case.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/entrusted_case.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/receive.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/receive.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/message/download.do'), (select id from role where name='ROLE_INSIDE_STAFF')),
((select id from interface where address='/message/download.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/phone/records.do'), (select id from role where name='ROLE_OUTSIDE_STAFF')),
((select id from interface where address='/phone/upload.do'), (select id from role where name='ROLE_OUTSIDE_STAFF'));

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

	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_INSIDE_STAFF'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_OUTSIDE_STAFF'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_ADMIN'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_MANAGER'));
  END LOOP;
  -- 关闭游标
  CLOSE cur;
END$$
DELIMITER ;

call initDataIf();

DROP procedure IF EXISTS `initDataIf`;
