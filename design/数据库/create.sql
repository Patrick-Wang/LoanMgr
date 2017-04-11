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
	`id`	int NOT NULL AUTO_INCREMENT	,--	��������
	`xh`	int	,--	���
	`wwrq`	date	,--	ί������
	`wwdqr`	date	,--	ί�⵽����
	`jarq`	date	,--	�᰸����
	`khxm`	varchar(50)	,--	�ͻ�����
	`htbh`	varchar(51)	,--	��ͬ���
	`wbsbh`	varchar(52)	,--	����̱��
	`wwlx`	varchar(53)	,--	ί������
	`khxb`	varchar(54)	,--	�ͻ��Ա�
	`khcsrq`	date	,--	�ͻ���������
	`khsfzh`	varchar(54)	,--	�ͻ����֤��
	`wwzt`	varchar(54)	,--	ί��״̬
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
	`bz`	text	,--	��ע
	`wwjg`	text	,--	ί����
	`pcode`	varchar(73)	,--	PCODE
	`ccode`	varchar(73)	,--	CCODE
	PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;	


create table `entrusted_case_credit_loan`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	��������
	`khh`	varchar(50)	,--	�ͻ���
	`khxm`	varchar(50)	,--	�ͻ�����
	`zhh`	varchar(50)	,--	�˻���
	`xb`	varchar(50)	,--	�Ա�
	`sfzh`	varchar(50)	,--	���֤��
	`fkjg`	varchar(50)	,--	�ſ����
	`qyje`	double	,--	ǩԼ���
	`fkje`	double	,--	�ſ���
	`cplx`	varchar(50)	,--	��Ʒ����
	`fksj`	date	,--	�ſ�ʱ��
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

create table `entrusted_case_credit_card`(				
	`id`	int NOT NULL AUTO_INCREMENT	,--	��������
	`cid`	int	,--	�ڲ�����ID
	`gaxlh`	varchar(50)	,--	�������к�
	`xm`	varchar(50)	,--	����
	`wtf`	varchar(50)	,--	ί�з�
	`pch`	varchar(50)	,--	���κ�
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
	`bz`	varchar(50)	,--	����
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
(21, '/message/unread.do', '��ȡδ����Ϣ'),
(22, '/message/readmessage.do', '�����Ϣ�Ѷ�'),
(23, '/message/entrusted_case.do', '��ȡ��Ϣί��'),
(24, '/message/receive.do', '��ȡ��Ϣ����'),
(25, '/message/download.do', '��������'),
(26, '/phone/records.do', '����绰�б�'),
(27, '/phone/upload.do', '�ϴ�����绰'),
(1000, 'entrusted_case_car_loan.id', '��������'),
(1001, 'entrusted_case_car_loan.xh', '���'),
(1002, 'entrusted_case_car_loan.wwrq', 'ί������'),
(1003, 'entrusted_case_car_loan.wwdqr', 'ί�⵽����'),
(1004, 'entrusted_case_car_loan.jarq', '�᰸����'),
(1005, 'entrusted_case_car_loan.khxm', '�ͻ�����'),
(1006, 'entrusted_case_car_loan.htbh', '��ͬ���'),
(1007, 'entrusted_case_car_loan.wbsbh', '����̱��'),
(1008, 'entrusted_case_car_loan.wwlx', 'ί������'),
(1009, 'entrusted_case_car_loan.khxb', '�ͻ��Ա�'),
(1010, 'entrusted_case_car_loan.khcsrq', '�ͻ���������'),
(1011, 'entrusted_case_car_loan.khsfzh', '�ͻ����֤��'),
(1012, 'entrusted_case_car_loan.wwzt', 'ί��״̬'),
(1013, 'entrusted_case_car_loan.wfqs', '�������'),
(1014, 'entrusted_case_car_loan.wfje', '��ý��'),
(1015, 'entrusted_case_car_loan.yqts', '��������'),
(1016, 'entrusted_case_car_loan.yqje', '���ڽ��'),
(1017, 'entrusted_case_car_loan.ygckje', '�¹�������'),
(1018, 'entrusted_case_car_loan.dkqx', '��������'),
(1019, 'entrusted_case_car_loan.yqqs', '��������'),
(1020, 'entrusted_case_car_loan.zjyqcs', '�������ڴ���'),
(1021, 'entrusted_case_car_loan.hkqs', '��������'),
(1022, 'entrusted_case_car_loan.cs', '����'),
(1023, 'entrusted_case_car_loan.jxs', '������'),
(1024, 'entrusted_case_car_loan.khsj', '�ͻ��ֻ�'),
(1025, 'entrusted_case_car_loan.khzd', '�ͻ�լ��'),
(1026, 'entrusted_case_car_loan.khgs', '�ͻ���˾'),
(1027, 'entrusted_case_car_loan.khgsdh', '�ͻ���˾�绰'),
(1028, 'entrusted_case_car_loan.fq', '����'),
(1029, 'entrusted_case_car_loan.qh', '����'),
(1030, 'entrusted_case_car_loan.yb', '�ʱ�'),
(1031, 'entrusted_case_car_loan.poxm', '��ż����'),
(1032, 'entrusted_case_car_loan.posj', '��ż�ֻ�'),
(1033, 'entrusted_case_car_loan.qtlxfs', '������ϵ��ʽ'),
(1034, 'entrusted_case_car_loan.pogs', '��ż��˾'),
(1035, 'entrusted_case_car_loan.pogsdh', '��ż��˾�绰'),
(1036, 'entrusted_case_car_loan.khlx', '�ͻ�����'),
(1037, 'entrusted_case_car_loan.sqrq', '��������'),
(1038, 'entrusted_case_car_loan.fkrq', '�ſ�����'),
(1039, 'entrusted_case_car_loan.hkrq', '������'),
(1040, 'entrusted_case_car_loan.bddqr', '����������'),
(1041, 'entrusted_case_car_loan.dkje', '������'),
(1042, 'entrusted_case_car_loan.dkzl', '��������'),
(1043, 'entrusted_case_car_loan.khll', '�ͻ�����'),
(1044, 'entrusted_case_car_loan.cj', '����'),
(1045, 'entrusted_case_car_loan.cx', '����'),
(1046, 'entrusted_case_car_loan.zw', 'ְλ'),
(1047, 'entrusted_case_car_loan.sr', '����'),
(1048, 'entrusted_case_car_loan.dbrxm', '����������'),
(1049, 'entrusted_case_car_loan.ysqrgx', '�������˹�ϵ'),
(1050, 'entrusted_case_car_loan.dbrcsrq', '�����˳�������'),
(1051, 'entrusted_case_car_loan.dbrsfzh', '���������֤��'),
(1052, 'entrusted_case_car_loan.dbrsj', '�������ֻ�'),
(1053, 'entrusted_case_car_loan.dbrgsmc', '�����˹�˾����'),
(1054, 'entrusted_case_car_loan.dbrgsdh', '�����˹�˾�绰'),
(1055, 'entrusted_case_car_loan.dbrgsdz', '�����˹�˾��ַ'),
(1056, 'entrusted_case_car_loan.yx', '����'),
(1057, 'entrusted_case_car_loan.zh', '�ʺ�'),
(1058, 'entrusted_case_car_loan.wydcyy', '��������ԭ��'),
(1059, 'entrusted_case_car_loan.yqyy', '����ԭ��'),
(1060, 'entrusted_case_car_loan.dhqk', '�绰���'),
(1061, 'entrusted_case_car_loan.dhlxr', '�绰��ϵ��'),
(1062, 'entrusted_case_car_loan.hkqk', '�������'),
(1063, 'entrusted_case_car_loan.hkr', '������'),
(1064, 'entrusted_case_car_loan.xxxglb', '��Ϣ�޸����'),
(1065, 'entrusted_case_car_loan.clqk', '�������'),
(1066, 'entrusted_case_car_loan.khhztd', '�ͻ�����̬��'),
(1067, 'entrusted_case_car_loan.clzt', '����״̬'),
(1068, 'entrusted_case_car_loan.fkuirq', '��������'),
(1069, 'entrusted_case_car_loan.bz', '��ע'),
(1070, 'entrusted_case_car_loan.wwjg', 'ί����'),
(1071, 'entrusted_case_car_loan.pcode', 'PCODE'),
(1072, 'entrusted_case_car_loan.ccode', 'CCODE'),
(1200, 'entrusted_case_credit_loan.id', '��������'),
(1201, 'entrusted_case_credit_loan.khh', '�ͻ���'),
(1202, 'entrusted_case_credit_loan.khxm', '�ͻ�����'),
(1203, 'entrusted_case_credit_loan.zhh', '�˻���'),
(1204, 'entrusted_case_credit_loan.xb', '�Ա�'),
(1205, 'entrusted_case_credit_loan.sfzh', '���֤��'),
(1206, 'entrusted_case_credit_loan.fkjg', '�ſ����'),
(1207, 'entrusted_case_credit_loan.qyje', 'ǩԼ���'),
(1208, 'entrusted_case_credit_loan.fkje', '�ſ���'),
(1209, 'entrusted_case_credit_loan.cplx', '��Ʒ����'),
(1210, 'entrusted_case_credit_loan.fksj', '�ſ�ʱ��'),
(1211, 'entrusted_case_credit_loan.tqjqje', '��ǰ������'),
(1212, 'entrusted_case_credit_loan.zqs', '������'),
(1213, 'entrusted_case_credit_loan.dqqs', '��ǰ����'),
(1214, 'entrusted_case_credit_loan.yhqs', '�ѻ�����'),
(1215, 'entrusted_case_credit_loan.sybj', 'ʣ�౾��'),
(1216, 'entrusted_case_credit_loan.yqlx', '������Ϣ'),
(1217, 'entrusted_case_credit_loan.yqfx', '���ڷ�Ϣ'),
(1218, 'entrusted_case_credit_loan.yqglf', '���ڹ����'),
(1219, 'entrusted_case_credit_loan.yqwyj', '����ΥԼ��'),
(1220, 'entrusted_case_credit_loan.yqbj', '���ڱ���'),
(1221, 'entrusted_case_credit_loan.whbj', 'δ������'),
(1222, 'entrusted_case_credit_loan.yhke', '�»����'),
(1223, 'entrusted_case_credit_loan.zhm', '�˻���'),
(1224, 'entrusted_case_credit_loan.yxm', '������'),
(1225, 'entrusted_case_credit_loan.yxzh', '�����ʺ�'),
(1226, 'entrusted_case_credit_loan.gjgs', '�鼯��˾'),
(1227, 'entrusted_case_credit_loan.yqts', '��������'),
(1228, 'entrusted_case_credit_loan.zl', '����'),
(1229, 'entrusted_case_credit_loan.cs', '����'),
(1230, 'entrusted_case_credit_loan.dzyx', '��������'),
(1231, 'entrusted_case_credit_loan.hjdh', '�����绰'),
(1232, 'entrusted_case_credit_loan.hjdz', '������ַ'),
(1233, 'entrusted_case_credit_loan.sjhm', '�ֻ�����'),
(1234, 'entrusted_case_credit_loan.zzdh', 'סլ�绰'),
(1235, 'entrusted_case_credit_loan.zzdz', 'סլ��ַ'),
(1236, 'entrusted_case_credit_loan.gsmc', '��˾����'),
(1237, 'entrusted_case_credit_loan.gsdz', '��˾��ַ'),
(1238, 'entrusted_case_credit_loan.gsdh', '��˾�绰'),
(1239, 'entrusted_case_credit_loan.llr1xm', '������1����'),
(1240, 'entrusted_case_credit_loan.llr1gx', '������1��ϵ'),
(1241, 'entrusted_case_credit_loan.llr1dh', '������1�绰'),
(1242, 'entrusted_case_credit_loan.llr2xm', '������2����'),
(1243, 'entrusted_case_credit_loan.llr2gx', '������2��ϵ'),
(1244, 'entrusted_case_credit_loan.llr2dh', '������2�绰'),
(1245, 'entrusted_case_credit_loan.llr3xm', '������3����'),
(1246, 'entrusted_case_credit_loan.llr3gx', '������3��ϵ'),
(1247, 'entrusted_case_credit_loan.llr3dh', '������3�绰'),
(1248, 'entrusted_case_credit_loan.llr4xm', '������4����'),
(1249, 'entrusted_case_credit_loan.llr4gx', '������4��ϵ'),
(1250, 'entrusted_case_credit_loan.llr4dh', '������4�绰'),
(1251, 'entrusted_case_credit_loan.llr5xm', '������5����'),
(1252, 'entrusted_case_credit_loan.llr5gx', '������5��ϵ'),
(1253, 'entrusted_case_credit_loan.llr5dh', '������5�绰'),
(1254, 'entrusted_case_credit_loan.llr6xm', '������6����'),
(1255, 'entrusted_case_credit_loan.llr6gx', '������6��ϵ'),
(1256, 'entrusted_case_credit_loan.llr6dh', '������6�绰'),
(1257, 'entrusted_case_credit_loan.llr7xm', '������7����'),
(1258, 'entrusted_case_credit_loan.llr7gx', '������7��ϵ'),
(1259, 'entrusted_case_credit_loan.llr7dh', '������7�绰'),
(1260, 'entrusted_case_credit_loan.llr8xm', '������8����'),
(1261, 'entrusted_case_credit_loan.llr8gx', '������8��ϵ'),
(1262, 'entrusted_case_credit_loan.llr8dh', '������8�绰'),
(1263, 'entrusted_case_credit_loan.llr9xm', '������9����'),
(1264, 'entrusted_case_credit_loan.llr9gx', '������9��ϵ'),
(1265, 'entrusted_case_credit_loan.llr9dh', '������9�绰'),
(1266, 'entrusted_case_credit_loan.llr10xm', '������10����'),
(1267, 'entrusted_case_credit_loan.llr10gx', '������10��ϵ'),
(1268, 'entrusted_case_credit_loan.llr10dh', '������10�绰'),
(1400, 'entrusted_case_credit_card.id', '��������'),
(1401, 'entrusted_case_credit_card.cid', '�ڲ�����ID'),
(1402, 'entrusted_case_credit_card.gaxlh', '�������к�'),
(1403, 'entrusted_case_credit_card.xm', '����'),
(1404, 'entrusted_case_credit_card.wtf', 'ί�з�'),
(1405, 'entrusted_case_credit_card.pch', '���κ�'),
(1406, 'entrusted_case_credit_card.ajzt', '����״̬'),
(1407, 'entrusted_case_credit_card.zjh', '֤����'),
(1408, 'entrusted_case_credit_card.zjlx', '֤������'),
(1409, 'entrusted_case_credit_card.xb', '�Ա�'),
(1410, 'entrusted_case_credit_card.cszt', '����״̬'),
(1411, 'entrusted_case_credit_card.wfzt', '���״̬'),
(1412, 'entrusted_case_credit_card.khx', '������'),
(1413, 'entrusted_case_credit_card.kh', '����'),
(1414, 'entrusted_case_credit_card.zh', '�˺�'),
(1415, 'entrusted_case_credit_card.zhmc', '�˻�����'),
(1416, 'entrusted_case_credit_card.kl', '����'),
(1417, 'entrusted_case_credit_card.dah', '������'),
(1418, 'entrusted_case_credit_card.warq', 'ί������'),
(1419, 'entrusted_case_credit_card.waje', 'ί�����'),
(1420, 'entrusted_case_credit_card.ptpje', 'PTP���'),
(1421, 'entrusted_case_credit_card.cpje', 'CP���'),
(1422, 'entrusted_case_credit_card.zxqk��drlxhgx��', '����Ƿ�������Ϣ����£�'),
(1423, 'entrusted_case_credit_card.rmb', '�����'),
(1424, 'entrusted_case_credit_card.gb', '�۱�'),
(1425, 'entrusted_case_credit_card.wb', '���'),
(1426, 'entrusted_case_credit_card.csy', '����Ա'),
(1427, 'entrusted_case_credit_card.csyid', '����ԱID'),
(1428, 'entrusted_case_credit_card.csybm', '����Ա����'),
(1429, 'entrusted_case_credit_card.csqy', '��������'),
(1430, 'entrusted_case_credit_card.csxj', '����С��'),
(1431, 'entrusted_case_credit_card.zhtd', '���ͨ��'),
(1432, 'entrusted_case_credit_card.yhk', '�ѻ���'),
(1433, 'entrusted_case_credit_card.fpls', '������ʷ'),
(1434, 'entrusted_case_credit_card.fpsj', '����ʱ��'),
(1435, 'entrusted_case_credit_card.xcgjrq', '�´θ�������'),
(1436, 'entrusted_case_credit_card.gjcs', '��������'),
(1437, 'entrusted_case_credit_card.mzxs', 'Mֵϵ��'),
(1438, 'entrusted_case_credit_card.yqzl', '��������'),
(1439, 'entrusted_case_credit_card.yx', '����'),
(1440, 'entrusted_case_credit_card.qq', 'QQ'),
(1441, 'entrusted_case_credit_card.sj', '�ֻ�'),
(1442, 'entrusted_case_credit_card.jthm', '��ͥ����'),
(1443, 'entrusted_case_credit_card.dwhm', '��λ����'),
(1444, 'entrusted_case_credit_card.dwmc', '��λ����'),
(1445, 'entrusted_case_credit_card.dwdz', '��λ��ַ'),
(1446, 'entrusted_case_credit_card.dwyb', '��λ�ʱ�'),
(1447, 'entrusted_case_credit_card.jtdz', '��ͥ��ַ'),
(1448, 'entrusted_case_credit_card.jtyb', '��ͥ�ʱ�'),
(1449, 'entrusted_case_credit_card.dzddz', '���˵���ַ'),
(1450, 'entrusted_case_credit_card.dzdyb', '���˵��ʱ�'),
(1451, 'entrusted_case_credit_card.hjdz', '������ַ'),
(1452, 'entrusted_case_credit_card.hjdyb', '�������ʱ�'),
(1453, 'entrusted_case_credit_card.zw', 'ְλ'),
(1454, 'entrusted_case_credit_card.bm', '����'),
(1455, 'entrusted_case_credit_card.sf', 'ʡ��'),
(1456, 'entrusted_case_credit_card.cs', '����'),
(1457, 'entrusted_case_credit_card.qx', '����'),
(1458, 'entrusted_case_credit_card.sr', '����'),
(1459, 'entrusted_case_credit_card.nl', '����'),
(1460, 'entrusted_case_credit_card.wczje', 'δ���˽��'),
(1461, 'entrusted_case_credit_card.bz', '����'),
(1462, 'entrusted_case_credit_card.ycsjl', 'ԭ���ռ�¼'),
(1463, 'entrusted_case_credit_card.bj', '����'),
(1464, 'entrusted_case_credit_card.zdhke', '��ͻ����'),
(1465, 'entrusted_case_credit_card.xyed', '���ö��'),
(1466, 'entrusted_case_credit_card.tqjb', '��Ƿ����'),
(1467, 'entrusted_case_credit_card.xdfl', '�Ŵ�����'),
(1468, 'entrusted_case_credit_card.csfl', '���շ���'),
(1469, 'entrusted_case_credit_card.yqlx', '������Ϣ'),
(1470, 'entrusted_case_credit_card.znj', '���ɽ�'),
(1471, 'entrusted_case_credit_card.zhhkr', '��󻹿���'),
(1472, 'entrusted_case_credit_card.zhxfr', '���������'),
(1473, 'entrusted_case_credit_card.zhtxr', '���������'),
(1474, 'entrusted_case_credit_card.tkr', 'ͣ����'),
(1475, 'entrusted_case_credit_card.kkr', '������'),
(1476, 'entrusted_case_credit_card.hkqx', '��������'),
(1477, 'entrusted_case_credit_card.lxr1xm', '��ϵ��1����'),
(1478, 'entrusted_case_credit_card.lxr1zjh', '��ϵ��1֤����'),
(1479, 'entrusted_case_credit_card.lxr1gx', '��ϵ��1��ϵ'),
(1480, 'entrusted_case_credit_card.lxr1dw', '��ϵ��1��λ'),
(1481, 'entrusted_case_credit_card.lxr1jtdh', '��ϵ��1��ͥ�绰'),
(1482, 'entrusted_case_credit_card.lxr1dwdh', '��ϵ��1��λ�绰'),
(1483, 'entrusted_case_credit_card.lxr1sj', '��ϵ��1�ֻ�'),
(1484, 'entrusted_case_credit_card.lxr1dz', '��ϵ��1��ַ'),
(1485, 'entrusted_case_credit_card.lxr2xm', '��ϵ��2����'),
(1486, 'entrusted_case_credit_card.lxr2zjh', '��ϵ��2֤����'),
(1487, 'entrusted_case_credit_card.lxr2gx', '��ϵ��2��ϵ'),
(1488, 'entrusted_case_credit_card.lxr2dw', '��ϵ��2��λ'),
(1489, 'entrusted_case_credit_card.lxr2jtdh', '��ϵ��2��ͥ�绰'),
(1490, 'entrusted_case_credit_card.lxr2dwdh', '��ϵ��2��λ�绰'),
(1491, 'entrusted_case_credit_card.lxr2sj', '��ϵ��2�ֻ�'),
(1492, 'entrusted_case_credit_card.lxr2dz', '��ϵ��2��ַ'),
(1493, 'entrusted_case_credit_card.lxr3xm', '��ϵ��3����'),
(1494, 'entrusted_case_credit_card.lxr3zjh', '��ϵ��3֤����'),
(1495, 'entrusted_case_credit_card.lxr3gx', '��ϵ��3��ϵ'),
(1496, 'entrusted_case_credit_card.lxr3dw', '��ϵ��3��λ'),
(1497, 'entrusted_case_credit_card.lxr3jtdh', '��ϵ��3��ͥ�绰'),
(1498, 'entrusted_case_credit_card.lxr3dwdh', '��ϵ��3��λ�绰'),
(1499, 'entrusted_case_credit_card.lxr3sj', '��ϵ��3�ֻ�'),
(1500, 'entrusted_case_credit_card.lxr3dz', '��ϵ��3��ַ'),
(1501, 'entrusted_case_credit_card.lxr4xm', '��ϵ��4����'),
(1502, 'entrusted_case_credit_card.lxr4zjh', '��ϵ��4֤����'),
(1503, 'entrusted_case_credit_card.lxr4gx', '��ϵ��4��ϵ'),
(1504, 'entrusted_case_credit_card.lxr4dw', '��ϵ��4��λ'),
(1505, 'entrusted_case_credit_card.lxr4jtdh', '��ϵ��4��ͥ�绰'),
(1506, 'entrusted_case_credit_card.lxr4dwdh', '��ϵ��4��λ�绰'),
(1507, 'entrusted_case_credit_card.lxr4sj', '��ϵ��4�ֻ�'),
(1508, 'entrusted_case_credit_card.lxr4dz', '��ϵ��4��ַ'),
(1509, 'entrusted_case_credit_card.lxr5xm', '��ϵ��5����'),
(1510, 'entrusted_case_credit_card.lxr5zj', '��ϵ��5֤��'),
(1511, 'entrusted_case_credit_card.lxr5gx', '��ϵ��5��ϵ'),
(1512, 'entrusted_case_credit_card.lxr5dw', '��ϵ��5��λ'),
(1513, 'entrusted_case_credit_card.lxr5jtdh', '��ϵ��5��ͥ�绰'),
(1514, 'entrusted_case_credit_card.lxr5dwdh', '��ϵ��5��λ�绰'),
(1515, 'entrusted_case_credit_card.lxr5sj', '��ϵ��5�ֻ�'),
(1516, 'entrusted_case_credit_card.lxr5dz', '��ϵ��5��ַ'),
(1517, 'entrusted_case_credit_card.lxr6xm', '��ϵ��6����'),
(1518, 'entrusted_case_credit_card.lxr6zj', '��ϵ��6֤��'),
(1519, 'entrusted_case_credit_card.lxr6gx', '��ϵ��6��ϵ'),
(1520, 'entrusted_case_credit_card.lxr6dw', '��ϵ��6��λ'),
(1521, 'entrusted_case_credit_card.lxr6jtdh', '��ϵ��6��ͥ�绰'),
(1522, 'entrusted_case_credit_card.lxr6dwdh', '��ϵ��6��λ�绰'),
(1523, 'entrusted_case_credit_card.lxr6sj', '��ϵ��6�ֻ�'),
(1524, 'entrusted_case_credit_card.lxr6dz', '��ϵ��6��ַ'),
(1525, 'entrusted_case_credit_card.bz1', '��ע1'),
(1526, 'entrusted_case_credit_card.bz2', '��ע2'),
(1527, 'entrusted_case_credit_card.bz3', '��ע3'),
(1528, 'entrusted_case_credit_card.bz4', '��ע4'),
(1529, 'entrusted_case_credit_card.bz5', '��ע5'),
(1530, 'entrusted_case_credit_card.bz6', '��ע6'),
(1531, 'entrusted_case_credit_card.sp', '��Ʒ'),
(1532, 'entrusted_case_credit_card.sh', '�̻�'),
(1533, 'entrusted_case_credit_card.zqk', '��Ƿ��(ί������+��˾Ӷ��)'),
(1534, 'entrusted_case_credit_card.qkye', 'Ƿ�����'),
(1535, 'entrusted_case_credit_card.sqdh', '���뵥��'),
(1536, 'entrusted_case_credit_card.yqrq', '��������'),
(1537, 'entrusted_case_credit_card.cssb', '�����ֱ�'),
(1538, 'entrusted_case_credit_card.yqts', '��������'),
(1539, 'entrusted_case_credit_card.wtqx', 'ί������'),
(1540, 'entrusted_case_credit_card.waqs', 'ί������'),
(1541, 'entrusted_case_credit_card.yhqs', '�ѻ�����'),
(1542, 'entrusted_case_credit_card.zdr', '�˵���'),
(1543, 'entrusted_case_credit_card.gded', '�̶����'),
(1544, 'entrusted_case_credit_card.zdzq', '�˵�����'),
(1545, 'entrusted_case_credit_card.zhhke', '��󻹿��'),
(1546, 'entrusted_case_credit_card.yjtar', 'Ԥ���˰���'),
(1547, 'entrusted_case_credit_card.sfzk', '�Ƿ�����'),
(1548, 'entrusted_case_credit_card.fkkr', '��������'),
(1549, 'entrusted_case_credit_card.dkrq', '��������'),
(1550, 'entrusted_case_credit_card.sybj', 'ʣ�౾��'),
(1551, 'entrusted_case_credit_card.yqqs', '��������'),
(1552, 'entrusted_case_credit_card.zyqcs', '�����ڴ���'),
(1553, 'entrusted_case_credit_card.dkll', '��������'),
(1554, 'entrusted_case_credit_card.myhk', 'ÿ�»���'),
(1555, 'entrusted_case_credit_card.yqje', '���ڽ��'),
(1556, 'entrusted_case_credit_card.yqbj', '���ڱ���'),
(1557, 'entrusted_case_credit_card.yqfx', '���ڷ�Ϣ'),
(1558, 'entrusted_case_credit_card.yqglf', '���ڹ����'),
(1559, 'entrusted_case_credit_card.wyj', 'ΥԼ��'),
(1560, 'entrusted_case_credit_card.cxf', '���޷�'),
(1561, 'entrusted_case_credit_card.dkjzr', '�����ֹ��'),
(1562, 'entrusted_case_credit_card.bzj', '��֤��'),
(1563, 'entrusted_case_credit_card.sbdnh', '�籣���Ժ�'),
(1564, 'entrusted_case_credit_card.sbkh', '�籣����'),
(1565, 'entrusted_case_credit_card.sjtar', 'ʵ���˰���'),
(1566, 'entrusted_case_credit_card.cx', '����'),
(1567, 'entrusted_case_credit_card.pzh', '���պ�'),
(1568, 'entrusted_case_credit_card.cjh', '���ܺ�'),
(1569, 'entrusted_case_credit_card.jg', '����'),
(1570, 'entrusted_case_credit_card.zdyxx', '�Զ�����Ϣ'),
(1571, 'entrusted_case_credit_card.zxcj', '���´߼�');


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

	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_INSIDE_STAFF'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_OUTSIDE_STAFF'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_ADMIN'));
	insert into `authority` (intf, role) values (a, (select id from role where name='ROLE_MANAGER'));
  END LOOP;
  -- �ر��α�
  CLOSE cur;
END$$
DELIMITER ;

call initDataIf();

DROP procedure IF EXISTS `initDataIf`;
