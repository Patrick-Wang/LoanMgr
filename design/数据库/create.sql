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
	`id`	int NOT NULL AUTO_INCREMENT	,--	��������
	`code` varchar(20),
	`pch` varchar(20),
	`wwrq`	date	,--	ί������
	`wwzt`	varchar(54)	,--	ί��״̬
	`wwjg` varchar(50)	,
	`wwje` double,
	`yhje` double,
	`syje` double,
	`xh`	int	,--	���
	`wwdqr`	date	,--	ί�⵽����
	`jarq`	date	,--	�᰸����
	`khxm`	varchar(50)	,--	�ͻ�����
	`htbh`	varchar(51)	,--	��ͬ���
	`wbsbh`	varchar(52)	,--	����̱��
	`wwlx`	varchar(53)	,--	ί������
	`khxb`	varchar(54)	,--	�ͻ��Ա�
	`khcsrq`	date	,--	�ͻ���������
	`khsfzh`	varchar(54)	,--	�ͻ����֤��
	`wfqs`	int	,--	�������
	`wfje`	double	,--	��ý��
	`yqts`	double	,--	��������
	`yqje`	double	,--	���ڽ��
	`ygckje`	double	,--	�¹�������
	`dkqx`	double	,--	��������
	`yqqs`	int	,--	��������
	`zjyqcs`	int	,--	�������ڴ���
	`hkqs`	int	,--	��������
	`cs`	varchar(54)	,--	����
	`jxs`	varchar(55)	,--	������
	`khsj`	varchar(56)	,--	�ͻ��ֻ�
	`khzd`	varchar(57)	,--	�ͻ�լ��
	`khgs`	varchar(58)	,--	�ͻ���˾
	`khgsdh`	varchar(59)	,--	�ͻ���˾�绰
	`fq`	varchar(60)	,--	����
	`qh`	varchar(61)	,--	����
	`yb`	varchar(62)	,--	�ʱ�
	`poxm`	varchar(63)	,--	��ż����
	`posj`	varchar(64)	,--	��ż�ֻ�
	`qtlxfs`	varchar(65)	,--	������ϵ��ʽ
	`pogs`	varchar(66)	,--	��ż��˾
	`pogsdh`	varchar(67)	,--	��ż��˾�绰
	`khlx`	varchar(68)	,--	�ͻ�����
	`sqrq`	date	,--	��������
	`fkrq`	date	,--	�ſ�����
	`hkrq`	date	,--	������
	`bddqr`	date	,--	����������
	`dkje`	double	,--	������
	`dkzl`	varchar(68)	,--	��������
	`khll`	double	,--	�ͻ�����
	`cj`	double	,--	����
	`cx`	varchar(68)	,--	����
	`zw`	varchar(68)	,--	ְλ
	`sr`	double	,--	����
	`dbrxm`	varchar(68)	,--	����������
	`ysqrgx`	varchar(68)	,--	�������˹�ϵ
	`dbrcsrq`	date	,--	�����˳�������
	`dbrsfzh`	varchar(68)	,--	���������֤��
	`dbrsj`	varchar(69)	,--	�������ֻ�
	`dbrgsmc`	varchar(70)	,--	�����˹�˾����
	`dbrgsdh`	varchar(71)	,--	�����˹�˾�绰
	`dbrgsdz`	varchar(72)	,--	�����˹�˾��ַ
	`yx`	varchar(73)	,--	����
	`zh`	varchar(74)	,--	�ʺ�
	`wydcyy`	text	,--	��������ԭ��
	`yqyy`	text	,--	����ԭ��
	`dhqk`	text	,--	�绰���
	`dhlxr`	varchar(73)	,--	�绰��ϵ��
	`hkqk`	text	,--	�������
	`hkr`	varchar(73)	,--	������
	`xxxglb`	varchar(73)	,--	��Ϣ�޸����
	`clqk`	text	,--	�������
	`khhztd`	text	,--	�ͻ�����̬��
	`clzt`	text	,--	����״̬
	`fkuirq`	date	,--	��������
	`wwjieg`	text	,--	ί����
	`pcode`	varchar(73)	,--	PCODE
	`ccode`	varchar(73)	,--	CCODE
	PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;	

drop table if exists  `entrusted_case_credit_loan`;
create table `entrusted_case_credit_loan`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	��������
	`code` varchar(20),
	`pch` varchar(20),
	`wwrq`	date	,--	ί������
	`wwzt`	varchar(54)	,--	ί��״̬
	`wwjg` varchar(50)	,
	`wwje` double,
	`yhje` double,
	`syje` double,
	`khh`	varchar(50)	,--	�ͻ���
	`khxm`	varchar(50)	,--	�ͻ�����
	`zhh`	varchar(50)	,--	�˻���
	`xb`	varchar(50)	,--	�Ա�
	`sfzh`	varchar(50)	,--	���֤��
	`fkjg`	varchar(50)	,--	�ſ����
	`qyje`	double	,--	ǩԼ���
	`fkje`	double	,--	�ſ���
	`cplx`	varchar(50)	,--	��Ʒ����
	`fksj`	datetime	,--	�ſ�ʱ��
	`tqjqje`	double	,--	��ǰ������
	`zqs`	int	,--	������
	`dqqs`	int	,--	��ǰ����
	`yhqs`	int	,--	�ѻ�����
	`sybj`	double	,--	ʣ�౾��
	`yqlx`	double	,--	������Ϣ
	`yqfx`	double	,--	���ڷ�Ϣ
	`yqglf`	double	,--	���ڹ����
	`yqwyj`	double	,--	����ΥԼ��
	`yqbj`	double	,--	���ڱ���
	`whbj`	double	,--	δ������
	`yhke`	double	,--	�»����
	`zhm`	varchar(50)	,--	�˻���
	`yxm`	varchar(50)	,--	������
	`yxzh`	varchar(50)	,--	�����ʺ�
	`gjgs`	varchar(50)	,--	�鼯��˾
	`yqts`	double	,--	��������
	`zl`	double	,--	����
	`cs`	varchar(50)	,--	����
	`dzyx`	varchar(50)	,--	��������
	`hjdh`	varchar(50)	,--	�����绰
	`hjdz`	varchar(50)	,--	������ַ
	`sjhm`	varchar(50)	,--	�ֻ�����
	`zzdh`	varchar(50)	,--	סլ�绰
	`zzdz`	varchar(50)	,--	סլ��ַ
	`gsmc`	varchar(50)	,--	��˾����
	`gsdz`	varchar(50)	,--	��˾��ַ
	`gsdh`	varchar(50)	,--	��˾�绰
	`llr1xm`	varchar(50)	,--	������1����
	`llr1gx`	varchar(50)	,--	������1��ϵ
	`llr1dh`	varchar(50)	,--	������1�绰
	`llr2xm`	varchar(50)	,--	������2����
	`llr2gx`	varchar(50)	,--	������2��ϵ
	`llr2dh`	varchar(50)	,--	������2�绰
	`llr3xm`	varchar(50)	,--	������3����
	`llr3gx`	varchar(50)	,--	������3��ϵ
	`llr3dh`	varchar(50)	,--	������3�绰
	`llr4xm`	varchar(50)	,--	������4����
	`llr4gx`	varchar(50)	,--	������4��ϵ
	`llr4dh`	varchar(50)	,--	������4�绰
	`llr5xm`	varchar(50)	,--	������5����
	`llr5gx`	varchar(50)	,--	������5��ϵ
	`llr5dh`	varchar(50)	,--	������5�绰
	`llr6xm`	varchar(50)	,--	������6����
	`llr6gx`	varchar(50)	,--	������6��ϵ
	`llr6dh`	varchar(50)	,--	������6�绰
	`llr7xm`	varchar(50)	,--	������7����
	`llr7gx`	varchar(50)	,--	������7��ϵ
	`llr7dh`	varchar(50)	,--	������7�绰
	`llr8xm`	varchar(50)	,--	������8����
	`llr8gx`	varchar(50)	,--	������8��ϵ
	`llr8dh`	varchar(50)	,--	������8�绰
	`llr9xm`	varchar(50)	,--	������9����
	`llr9gx`	varchar(50)	,--	������9��ϵ
	`llr9dh`	varchar(50)	,--	������9�绰
	`llr10xm`	varchar(50)	,--	������10����
	`llr10gx`	varchar(50)	,--	������10��ϵ
	`llr10dh`	varchar(50)	,--	������10�绰
	PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

drop table if exists  `entrusted_case_credit_card`;
create table `entrusted_case_credit_card`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	��������
	`code` varchar(20),
	`pch`	varchar(50)	,--	���κ�
	`wwrq`	date	,--	ί������
	`wwzt`	varchar(54)	,--	ί��״̬
	`wwjg` varchar(50)	,
	`wwje` double,
	`yhje` double,
	`syje` double,
	`tarq` date,
	`gaxlh`	varchar(50)	,--	�������к�
	`xm`	varchar(50)	,--	����
	`wtf`	varchar(50)	,--	ί�з�
	`ajzt`	varchar(50)	,--	����״̬
	`zjh`	varchar(50)	,--	֤����
	`zjlx`	varchar(50)	,--	֤������
	`xb`	varchar(50)	,--	�Ա�
	`cszt`	varchar(50)	,--	����״̬
	`wfzt`	varchar(50)	,--	���״̬
	`khx`	varchar(50)	,--	������
	`kh`	varchar(50)	,--	����
	`zh`	varchar(50)	,--	�˺�
	`zhmc`	varchar(50)	,--	�˻�����
	`kl`	varchar(50)	,--	����
	`dah`	varchar(50)	,--	������
	`warq`	date	,--	ί������
	`waje`	double	,--	ί�����
	`ptpje`	double	,--	PTP���
	`cpje`	double	,--	CP���
	`zxqk`	double	,--	����Ƿ�������Ϣ����£�
	`rmb`	varchar(50)	,--	�����
	`gb`	varchar(50)	,--	�۱�
	`wb`	varchar(50)	,--	���
	`csy`	varchar(50)	,--	����Ա
	`csyid`	varchar(50)	,--	����ԱID
	`csybm`	varchar(50)	,--	����Ա����
	`csqy`	varchar(50)	,--	��������
	`csxj`	text	,--	����С��
	`zhtd`	varchar(50)	,--	���ͨ��
	`yhk`	double	,--	�ѻ���
	`fpls`	text	,--	������ʷ
	`fpsj`	datetime	,--	����ʱ��
	`xcgjrq`	date	,--	�´θ�������
	`gjcs`	int	,--	��������
	`mzxs`	double	,--	Mֵϵ��
	`yqzl`	double	,--	��������
	`yx`	varchar(50)	,--	����
	`qq`	varchar(50)	,--	QQ
	`sj`	varchar(50)	,--	�ֻ�
	`jthm`	varchar(50)	,--	��ͥ����
	`dwhm`	varchar(50)	,--	��λ����
	`dwmc`	varchar(50)	,--	��λ����
	`dwdz`	varchar(50)	,--	��λ��ַ
	`dwyb`	varchar(50)	,--	��λ�ʱ�
	`jtdz`	varchar(50)	,--	��ͥ��ַ
	`jtyb`	varchar(50)	,--	��ͥ�ʱ�
	`dzddz`	varchar(50)	,--	���˵���ַ
	`dzdyb`	varchar(50)	,--	���˵��ʱ�
	`hjdz`	varchar(50)	,--	������ַ
	`hjdyb`	varchar(50)	,--	�������ʱ�
	`zw`	varchar(50)	,--	ְλ
	`bm`	varchar(50)	,--	����
	`sf`	varchar(50)	,--	ʡ��
	`cs`	varchar(50)	,--	����
	`qx`	varchar(50)	,--	����
	`sr`	date	,--	����
	`nl`	double	,--	����
	`wczje`	double	,--	δ���˽��
	`biz`	varchar(50)	,--	����
	`ycsjl`	text	,--	ԭ���ռ�¼
	`bj`	double	,--	����
	`zdhke`	double	,--	��ͻ����
	`xyed`	double	,--	���ö��
	`tqjb`	varchar(50)	,--	��Ƿ����
	`xdfl`	varchar(50)	,--	�Ŵ�����
	`csfl`	varchar(50)	,--	���շ���
	`yqlx`	double	,--	������Ϣ
	`znj`	double	,--	���ɽ�
	`zhhkr`	date	,--	��󻹿���
	`zhxfr`	date	,--	���������
	`zhtxr`	date	,--	���������
	`tkr`	date	,--	ͣ����
	`kkr`	date	,--	������
	`hkqx`	double	,--	��������
	`lxr1xm`	varchar(50)	,--	��ϵ��1����
	`lxr1zjh`	varchar(50)	,--	��ϵ��1֤����
	`lxr1gx`	varchar(50)	,--	��ϵ��1��ϵ
	`lxr1dw`	varchar(50)	,--	��ϵ��1��λ
	`lxr1jtdh`	varchar(50)	,--	��ϵ��1��ͥ�绰
	`lxr1dwdh`	varchar(50)	,--	��ϵ��1��λ�绰
	`lxr1sj`	varchar(50)	,--	��ϵ��1�ֻ�
	`lxr1dz`	varchar(50)	,--	��ϵ��1��ַ
	`lxr2xm`	varchar(50)	,--	��ϵ��2����
	`lxr2zjh`	varchar(50)	,--	��ϵ��2֤����
	`lxr2gx`	varchar(50)	,--	��ϵ��2��ϵ
	`lxr2dw`	varchar(50)	,--	��ϵ��2��λ
	`lxr2jtdh`	varchar(50)	,--	��ϵ��2��ͥ�绰
	`lxr2dwdh`	varchar(50)	,--	��ϵ��2��λ�绰
	`lxr2sj`	varchar(50)	,--	��ϵ��2�ֻ�
	`lxr2dz`	varchar(50)	,--	��ϵ��2��ַ
	`lxr3xm`	varchar(50)	,--	��ϵ��3����
	`lxr3zjh`	varchar(50)	,--	��ϵ��3֤����
	`lxr3gx`	varchar(50)	,--	��ϵ��3��ϵ
	`lxr3dw`	varchar(50)	,--	��ϵ��3��λ
	`lxr3jtdh`	varchar(50)	,--	��ϵ��3��ͥ�绰
	`lxr3dwdh`	varchar(50)	,--	��ϵ��3��λ�绰
	`lxr3sj`	varchar(50)	,--	��ϵ��3�ֻ�
	`lxr3dz`	varchar(50)	,--	��ϵ��3��ַ
	`lxr4xm`	varchar(50)	,--	��ϵ��4����
	`lxr4zjh`	varchar(50)	,--	��ϵ��4֤����
	`lxr4gx`	varchar(50)	,--	��ϵ��4��ϵ
	`lxr4dw`	varchar(50)	,--	��ϵ��4��λ
	`lxr4jtdh`	varchar(50)	,--	��ϵ��4��ͥ�绰
	`lxr4dwdh`	varchar(50)	,--	��ϵ��4��λ�绰
	`lxr4sj`	varchar(50)	,--	��ϵ��4�ֻ�
	`lxr4dz`	varchar(50)	,--	��ϵ��4��ַ
	`lxr5xm`	varchar(50)	,--	��ϵ��5����
	`lxr5zj`	varchar(50)	,--	��ϵ��5֤��
	`lxr5gx`	varchar(50)	,--	��ϵ��5��ϵ
	`lxr5dw`	varchar(50)	,--	��ϵ��5��λ
	`lxr5jtdh`	varchar(50)	,--	��ϵ��5��ͥ�绰
	`lxr5dwdh`	varchar(50)	,--	��ϵ��5��λ�绰
	`lxr5sj`	varchar(50)	,--	��ϵ��5�ֻ�
	`lxr5dz`	varchar(50)	,--	��ϵ��5��ַ
	`lxr6xm`	varchar(50)	,--	��ϵ��6����
	`lxr6zj`	varchar(50)	,--	��ϵ��6֤��
	`lxr6gx`	varchar(50)	,--	��ϵ��6��ϵ
	`lxr6dw`	varchar(50)	,--	��ϵ��6��λ
	`lxr6jtdh`	varchar(50)	,--	��ϵ��6��ͥ�绰
	`lxr6dwdh`	varchar(50)	,--	��ϵ��6��λ�绰
	`lxr6sj`	varchar(50)	,--	��ϵ��6�ֻ�
	`lxr6dz`	varchar(50)	,--	��ϵ��6��ַ
	`bz1`	text	,--	��ע1
	`bz2`	text	,--	��ע2
	`bz3`	text	,--	��ע3
	`bz4`	text	,--	��ע4
	`bz5`	text	,--	��ע5
	`bz6`	text	,--	��ע6
	`sp`	varchar(50)	,--	��Ʒ
	`sh`	varchar(50)	,--	�̻�
	`zqk`	double	,--	��Ƿ��(ί������+��˾Ӷ��)
	`qkye`	double	,--	Ƿ�����
	`sqdh`	varchar(50)	,--	���뵥��
	`yqrq`	date	,--	��������
	`cssb`	varchar(50)	,--	�����ֱ�
	`yqts`	double	,--	��������
	`wtqx`	double	,--	ί������
	`waqs`	int	,--	ί������
	`yhqs`	int	,--	�ѻ�����
	`zdr`	date	,--	�˵���
	`gded`	double	,--	�̶����
	`zdzq`	double	,--	�˵�����
	`zhhke`	double	,--	��󻹿��
	`yjtar`	date	,--	Ԥ���˰���
	`sfzk`	varchar(50)	,--	�Ƿ�����
	`fkkr`	varchar(50)	,--	��������
	`dkrq`	date	,--	��������
	`sybj`	double	,--	ʣ�౾��
	`yqqs`	int	,--	��������
	`zyqcs`	int	,--	�����ڴ���
	`dkll`	double	,--	��������
	`myhk`	double	,--	ÿ�»���
	`yqje`	double	,--	���ڽ��
	`yqbj`	double	,--	���ڱ���
	`yqfx`	double	,--	���ڷ�Ϣ
	`yqglf`	double	,--	���ڹ����
	`wyj`	double	,--	ΥԼ��
	`cxf`	double	,--	���޷�
	`dkjzr`	date	,--	�����ֹ��
	`bzj`	double	,--	��֤��
	`sbdnh`	varchar(50)	,--	�籣���Ժ�
	`sbkh`	varchar(50)	,--	�籣����
	`sjtar`	date	,--	ʵ���˰���
	`cx`	varchar(50)	,--	����
	`pzh`	varchar(50)	,--	���պ�
	`cjh`	varchar(50)	,--	���ܺ�
	`jg`	varchar(50)	,--	����
	`zdyxx`	text	,--	�Զ�����Ϣ
	`zxcj`	varchar(50)	,--	���´߼�
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
(1, '/login', '��¼'),
(2,'/account/org/search.do', '��֯�ṹ��ѯ'),
(3, '/account/search.do', '�û���ѯ��ѯ'),
(4, '/account/update.do', '�û���Ϣ����'),
(5, '/account/create.do', '�����û�'),
(6, '/authority/role.do', '��ȡ��ɫ'),
(7, '/authority/interface.do', '��ȡ�ӿ���Ϣ'),
(8, '/authority/search.do', '��ȡ��ɫ�ӿڷ���Ȩ��'),
(9, '/authority/delete.do', 'ɾ����ɫ�ӿڷ���Ȩ��'),
(10, '/authority/add.do', '���ӽ�ɫ�ӿڷ���Ȩ��'),
(11, '/entrusted_case/import.do', 'ί������'),
(12, '/entrusted_case/search.do', 'ί����ѯ'),
(13, '/entrusted_case/download.do', 'ί������'),
(14, '/entrusted_case/update.do', 'ί������'),
(15, '/entrusted_case/manager/search.do', 'ί��������Ϣ��ѯ'),
(16, '/entrusted_case/manager/update.do', 'ί��������Ϣ����'),
(17, '/entrusted_case/report/submit.do', '�ύί���㱨'),
(18, '/entrusted_case/report/search.do', '�ύ�㱨��ѯ'),
(19, '/entrusted_case/report/download.do', '�ύ�㱨��������'),
(20, '/message/send.do', '������Ϣ'),
(22, '/message/read_message.do', '�����Ϣ�Ѷ�'),
(23, '/message/unread_messages.do', '��ȡ��Ϣί��'),
(24, '/message/receive.do', '��ȡ��Ϣ����'),
(25, '/message/download.do', '��������'),
(26, '/phone/records.do', '����绰�б�'),
(27, '/phone/upload.do', '�ϴ�����绰'),
/*data inteface*/
(1000, '/entrusted_case_manager/get/own', '��ȡ�Լ���ί��������Ϣ'),
(1001, '/entrusted_case_manager/get/all', '��ȡ���е�ί��������Ϣ'),
/*ui inteface*/
(2000, '/nav/tips/missed_call', 'δ�ӵ绰��ʾ'),
(2001, '/nav/tips/messages', 'δ������Ϣ'),
(2002, '/console/summary/owner', 'ί��������ժҪ'),
(2003, '/console/summary/assigner', 'ί��������ժҪ'),
(2004, '/console/summary/manager', 'ί��������ժҪ'),
(2005, '/ec/edit/all', '�༭����ί��'),
(2006, '/ec/edit/owner', '�༭ӵ�е�ί��'),
(2007, '/ec/import', '����ί��'),
(2008, '/ec/ask', 'ί������'),
(2009, '/ec/answer', 'ί����'),
(2010, '/ec/assign', '����ί��'),
(2011, '/ec/backup', 'ί������'),
(2012, '/ec/export', 'ί������'),
(2013, '/ec/report', 'ί�������㱨'),
(2014, '/user/manager', '�����û�'),
(2015, '/user/ec/assign', 'ָ��ί��������'),
(2016, '/phone/call', '����绰');


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
  
  -- �������ݽ�����־
  DECLARE done INT DEFAULT FALSE;
  
  -- �α�
  DECLARE cur CURSOR FOR select id from interface where id >= 1000 and id < 2000;

  -- ��������־�󶨵��α�
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  
  -- ���α�
  OPEN cur;
   
  -- ��ʼѭ�� 
  read_loop: LOOP
    -- ��ȡ�α�������ݣ�����ֻ��һ��������Ļ�Ҳһ����
    FETCH cur INTO a;
    -- ����������ʱ��
    IF done THEN
      LEAVE read_loop;
    END IF;
    -- ��������������ѭ�����¼�

	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_ADMIN'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_INSIDE_MANAGER'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_OUTSIDE_MANAGER'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_INSIDE_STAFF'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_OUTSIDE_STAFF'));
	

  END LOOP;
  -- �ر��α�
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

/*++++++++++++++++++++++++++++++++++++++++++++++�������� +++++++++++++++++++++++++++++++++++++++++++++*/

insert into organization (parent, name, status) values
(null, '�ܹ�˾', 0),
(1, '�Ϻ��ֹ�˾', 0),
(1, '�����ֹ�˾', 0),
(1, '�����ֹ�˾', 0),
(2, '�Ϻ��ֹ�˾��һ�ֲ�', 0),
(2, '�Ϻ��ֹ�˾�ڶ��ֲ�', 0),
(3, '�����ֹ�˾��һ�ֲ�', 0),
(3, '�����ֹ�˾�ڶ��ֲ�', 0),
(3, '�����ֹ�˾�����ֲ�', 0),
(4, '�����ֹ�˾��һ�ֲ�', 0),
(4, '�����ֹ�˾�ڶ��ֲ�', 0),
(4, '�����ֹ�˾�����ֲ�', 0);

insert into user (username, password, org, position, status) values
('test', '1', 1, '����ְλ1', 0),
('test1', '1', 1, '����ְλ2', 0),
('admin', '1', 1, '�����', 0),
('inside', '1', 1, '����', 0),
('outside', '1', 1, '����', 0),
('insideMgr', '1', 1, '���ڹ���', 0),
('outsideMgr', '1', 1, '���ڹ���', 0);

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
