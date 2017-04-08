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
(27, '/phone/upload.do', '上传呼入电话');


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