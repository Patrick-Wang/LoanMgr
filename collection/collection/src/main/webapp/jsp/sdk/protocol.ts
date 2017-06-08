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

    export function getPhoneNums(type, ec:string[]):string[]{
        let nums = [];
        if (type == collection.protocol.EntrustedCaseType.carLoan){
            $(collection.protocol.carLoanTitle).each((i, e:string)=>{
                if (e == "客户手机" ||(
                    e.indexOf("联系人") >= 0 && (e.indexOf("手机") > 0 || e.indexOf("电话") > 0))){
                    if (ec[parseInt(i) + 1]){
                        nums.push(ec[parseInt(i) + 1]);
                    }
                }
            });
        }else if(type == collection.protocol.EntrustedCaseType.creditCard){
            $(collection.protocol.creditCardTitle).each((i, e:string)=>{
                if (e == "手机" ||(
                    e.indexOf("联系人") >= 0 && (e.indexOf("手机") > 0 || e.indexOf("电话") > 0))){
                    if (ec[parseInt(i) + 1]){
                        nums.push(ec[parseInt(i) + 1]);
                    }
                }
            });
        }else if(type == collection.protocol.EntrustedCaseType.creditLoan){
            $(collection.protocol.creditLoanTitle).each((i, e:string)=>{
                if (e == "手机号码" ||(
                    e.indexOf("联系人") >= 0 && (e.indexOf("手机") > 0 || e.indexOf("电话") > 0))){
                    if (ec[parseInt(i) + 1]){
                        nums.push(ec[parseInt(i) + 1]);
                    }
                }
            });
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