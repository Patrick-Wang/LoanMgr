
module collection.protocol{

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

    export interface MissedCall{
        call:string;//2013-12-11 58:11:23
        phoneNum:string;
    }
}