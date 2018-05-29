import ServerContext = collection.protocol.ServerContext;
module collection.protocol {

    export let carLoanTitle:string[] = [];

    export let creditLoanTitle:string[] = [];

    export let creditCardTitle:string[] = [];

    export function getTitles(type):string[]{
        let titles = undefined;
        if (type == collection.protocol.EntrustedCaseType.carLoan){
            titles = collection.protocol.carLoanTitle;
        }else if(type == collection.protocol.EntrustedCaseType.creditCard){
            titles = collection.protocol.creditCardTitle;
        }else if(type == collection.protocol.EntrustedCaseType.creditLoan){
            titles = collection.protocol.creditLoanTitle;
        }
        return titles;
    }

    function getPhone(ec, index){
        if (index >= 0){
            return ec[1 + index];
        }
    }

    function getCommonPhone(lxr :string, titles:string[], clientName:string, ec:string[], nums :string[]){
        let  name = getPhone(ec, titles.indexOf(lxr + '姓名'));
        let num = getPhone(ec, titles.indexOf(lxr + '家庭电话'));
        if (num && name){
            nums.push(lxr + " " + name + " 家庭电话:" + num);
        }
        num = getPhone(ec, titles.indexOf(lxr + '单位电话'));
        if (num && name){
            nums.push(lxr + " " + name + " 单位电话:" + num);
        }
        num = getPhone(ec, titles.indexOf(lxr + '手机'));
        if (num && name){
            nums.push(lxr + " " + name + " 手机:" + num);
        }
    }

    function getCommonNums(titles:string[], clientName:string, ec:string[], nums :string[]){
        getCommonPhone("联系人1", titles, clientName, ec, nums);
        getCommonPhone("联系人2", titles, clientName, ec, nums);
        getCommonPhone("联系人3", titles, clientName, ec, nums);
        getCommonPhone("联系人4", titles, clientName, ec, nums);
        getCommonPhone("联系人5", titles, clientName, ec, nums);
        getCommonPhone("联系人6", titles, clientName, ec, nums);
        getCommonPhone("联系人7", titles, clientName, ec, nums);
        getCommonPhone("联系人8", titles, clientName, ec, nums);
        getCommonPhone("联系人9", titles, clientName, ec, nums);
        getCommonPhone("联系人10", titles, clientName, ec, nums);
    }

    function getCarloanPhone(ec:string[]): string[]{
        let clientName =getPhone(ec, collection.protocol.carLoanTitle.indexOf('客户姓名'));
        let nums = [];
        let num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('客户手机'));
        if (num){
            nums.push(clientName + " 手机:" + num);
        }
        num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('客户宅电'));
        if (num){
            nums.push(clientName + " 宅电:" + num);
        }
        num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('客户公司电话'));
        if (num){
            nums.push(clientName + " 公司电话:" + num);
        }
        num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('配偶手机'));
        if (num){
            nums.push(clientName + " 配偶手机:" + num);
        }
        num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('配偶公司电话'));
        if (num){
            nums.push(clientName + " 配偶公司电话:" + num);
        }
        num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('担保人手机'));
        if (num){
            nums.push(clientName + " 担保人手机:" + num);
        }
        num = getPhone(ec, collection.protocol.carLoanTitle.indexOf('担保人公司电话'));
        if (num){
            nums.push(clientName + " 担保人公司电话:" + num);
        }
        getCommonNums(collection.protocol.carLoanTitle, clientName, ec, nums);
        return nums;
    }

    function getCreditLoanPhone(ec:string[]): string[]{
        let clientName =getPhone(ec, collection.protocol.creditLoanTitle.indexOf('客户姓名'));
        let nums = [];
        let num = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('户籍电话'));
        if (num){
            nums.push(clientName + " 户籍电话:" + num);
        }
        num = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('手机号码'));
        if (num){
            nums.push(clientName + " 手机:" + num);
        }
        num = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('住宅电话'));
        if (num){
            nums.push(clientName + " 住宅电话:" + num);
        }
        num = getPhone(ec, collection.protocol.creditLoanTitle.indexOf('公司电话'));
        if (num){
            nums.push(clientName + " 公司电话:" + num);
        }
        getCommonNums(collection.protocol.creditLoanTitle, clientName, ec, nums);
        return nums;
    }

    function getCreditCardPhone(ec:string[]): string[]{
        let clientName =getPhone(ec, collection.protocol.creditCardTitle.indexOf('姓名'));
        let nums = [];
        let num = getPhone(ec, collection.protocol.creditCardTitle.indexOf('手机'));
        if (num){
            nums.push(clientName + " 手机:" + num);
        }
        num = getPhone(ec, collection.protocol.creditCardTitle.indexOf('家庭号码'));
        if (num){
            nums.push(clientName + " 家庭号码:" + num);
        }
        num = getPhone(ec, collection.protocol.creditCardTitle.indexOf('单位号码'));
        if (num){
            nums.push(clientName + " 单位号码:" + num);
        }
        getCommonNums(collection.protocol.creditCardTitle, clientName, ec, nums);
        return nums;
    }


    export function getPhoneNums(type, ec:string[]):string[]{
        let nums = [];
        if (type == collection.protocol.EntrustedCaseType.carLoan){
            nums = getCarloanPhone(ec);
        }else if(type == collection.protocol.EntrustedCaseType.creditCard){
            nums = getCreditCardPhone(ec);
        }else if(type == collection.protocol.EntrustedCaseType.creditLoan){
            nums = getCreditLoanPhone(ec);
        }
        return nums;
    }

    export class PhoneRecordName {
        ecId:number;
        numb:string;
        time:string;

        static  isPhoneAttach(attach:string):boolean {
            return attach.indexOf("phone:") == 0;
        }

        toName():string {
            return this.ecId + "_" + this.numb + "_" + this.time;
        }
    }

    export enum UseStatus{
        inuse,
        stop
    }

    export let ROLE = ["none", "管理员","内勤管理员","业务管理员","内勤","业务员"];

    export enum RoleEN{
       NONE, ADMIN, INSIDE_MGR, OUTSIDE_MGR, INSIDE, OUTSIDE
    }

    export interface User {
        id:number;
        name?:string;
        orgId:number;
        orgName?:string;
        password?:string;
        roles?:number[];
        position:string;
        status?:UseStatus;
    }

    export interface CreateUser {
        name:string;
        password:string;
        orgId:number;
        position:string;
        roles:number[];
    }

    export interface Organization {
        id:number;
        name:string;
        status:UseStatus;
        subOrgs?:Organization[];
    }

    export interface Role {
        id:number;
        name:string;
    }

    export interface IF {
        id:number;
        address:string;
        description:string;
    }

    export interface Result {
        code:number;
        msg:string;
    }

    export enum EntrustedCaseType{
        carLoan,
        creditLoan,
        creditCard
    }

    export enum ECStatus{
        unassign,
        assign,
        complete
    }

    export interface EntrustedCaseManageInfo {
        id:number;
        ownerId?:number;
        ownerName?:string;
        assigneeId?:number;
        assigneeName?:string;
    }

    export interface EntrustedCaseReport {
        id?:number;
        entrustedCaseId:number;
        date?:string;//2012-3-4
        title?:string;
        content?:string;
        phoneRecId?:number;
        attachements?:Attachement[];
    }

    export interface Attachement{
        id?:number;
        fileAddress?:string;
        display?:string;
        uploadTime?:string;
    }

    export enum MessageStatus{
        unread,
        read
    }

    export interface Message {
        msgId:number
        ecCode:string;
        ecType:number;
        ecMgrId:number;
        fromId:number;
        fromName:string;
        toId:number;
        toName:string;
        title:string;
        content:string;
        attachements:Attachement[];
        sendTime:string;//2013-12-11 58:11:23
        read:MessageStatus;
    }

    export interface EC {
        reports:EntrustedCaseReport[];
        messages:Message[];
        managerId:number;
        owner?:string;
        ownerId?:number;
        assignee?:string;
        assigneeId?:number;
        pageCount?:number;
        pageNum?:number;
        records?:number;
        loan:any[];
    }

    export interface QueryOption {
        name?:string;
        PIN?:string;
        code?:string;//卡号，客户号、车牌号
        wwrq?:string;//委外日期
        wwjg?:string;//委外机构
        wwzt?:string;//委外状态：未分配、工作中、已结案
        mgrId?:number;
        assignToMe?:boolean;
        myOwn?:boolean;
        limit?:number;
        pageNum?:number;
        pageSize?:number;
        yqtsStartOpen?:number;
        yqtsEndClose?:number;
        assignee?:number;
        pch?:string;
        shuffle?:boolean;
    }

    export interface Promise<S> {
        done(sFn:(sResult:S)=>void):Promise<S>;
        fail(fFn:(fResult:any)=>void):Promise<S>;
    }

    export enum CallStatus{
        callin,
        callout,
        missed,
        missedSkip,
        missedNotifySkip
    }

    export interface PhoneRecord {
        recId:number;
        status : CallStatus;
        phoneNum:string;
        time:string;
        ecId:number;
        ecCode:string;
        ecType:number;
    }

    export interface ServerContext {
        userName:string;
        userId:number;
        position:string;
        org:string;
        pOrg:string;
        sipServerIP:string;
    }

    export interface AssignSummary {
        total:number;
        unassign:number;
        assign:number;
        complete:number;
    }
    export interface AcceptSummary {
        total:number;
        complete:number;
    }

    export interface ManagerSummary {
        ljje:number;
        yhje:number;
        ygs:number;
    }
}

declare var context:ServerContext;