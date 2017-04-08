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
(27, '/phone/upload.do', '�ϴ�����绰');


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