
import ServerContext = collection.protocol.ServerContext;
module collection.protocol{

    export class PhoneRecordName{
        ecId:number;
        numb:string;
        time:string;
        static  isPhoneAttach(attach:string):boolean{
            return attach.indexOf("phone:") == 0;
        }

        toName():string{
            return this.ecId + "_" + this.numb + "_" + this.time;
        }
    }

    export enum UseStatus{
        inuse,
        stop
    }

    export interface User {
        id:number;
        name:string;
        orgId:number;
        orgName?:string;
        passwrod?:string;
        rol?:number[];
        position:string;
        status:UseStatus;
    }

    export interface CreateUser{
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

    export interface EntrustedCaseManageInfo{
        id:number;
        ownerId:number;
        ownerName?:string;
        assigneeId:number;
        assigneeName?:string;
    }

    export interface EntrustedCaseReport{
        id:number;
        entrustedCaseId:number;
        date:string;//2012-3-4
        title:string;
        content:string;
        attachements:string[];
    }

    export enum MessageStatus{
        unread,
        read
    }

    export interface Message{
        msgId:number
        fromId:number;
        fromName:string;
        toId:number;
        toName:string;
        content:string;
        attachements:string[];
        sendTime:string;//2013-12-11 58:11:23
        read:MessageStatus;
    }

    export interface UnreadMessage{
        msgId:number;
        fromId:number;
        fromName:string;
        title:string;
        content:string;
        sendTime:string;//2013-12-11 58:11:23
    }

    export interface BaseEC{
        reports:EntrustedCaseReport[];
        messages:Message[];
        managerId:number;
    }

    export interface ECCarLoan extends BaseEC{

    }

    export interface ECCreditCard extends BaseEC{

    }

    export interface ECCreditLoan extends BaseEC{

    }

    export interface QueryOption{
        name:string;
        PIN:string;
        code:string;//卡号，客户号、车牌号
        wwrq:string;//委外日期
        wwjg:string;//委外机构
        wwzt:string;//委外状态：未分配、已分配、已结束
    }

    export interface ECQueryInfo{
        editIds:number[];
        carLoan?:ECCarLoan[];
        creditLoan?:ECCreditLoan[];
        creditCard?:ECCreditCard[];
    }

    export interface Promise<S>{
        done(sFn : (sResult : S)=>void):Promise<S>;
        fail(fFn : (fResult : any)=>void):Promise<S>;
    }

    export enum CallStatus{
        callin,
        callout,
        missed
    }

    export interface PhoneRecord{
        status : CallStatus;
        phoneNum:string;
        time:string;
        ecId:string;
    }

    export interface ServerContext{
        userName:string;
        position:string;
        org:string;
        pOrg:string;
    }

    export interface AssignSummary{
        totoal:number;
        unassign:number;
        assign:number;
        complete:number;
    }
    export interface AcceptSummary{
        totoal:number;
        complete:number;
    }
}

declare var context : ServerContext;