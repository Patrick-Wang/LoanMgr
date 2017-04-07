/**
 * Created by Floyd on 2017/4/7.
 */
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
        status:UseStatus;
    }

    export interface CreateUser{
        name:string;
        password:string;
        orgId:number;
        role:number[];
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
        name:string;
        description:string;
    }

    export interface Result {
        code:number;
        msg:string;
    }

    export enum EntrustedCaseType{

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
        content:string;
        attachements:string[];
    }

    export enum MessageStatus{
        unread,
        read
    }

    export interface Message{
        fromId:number;
        fromName:string;
        toId:number;
        toName:string;
        content:string;
        attachements:string[];
        sendTime:string;//2013-12-11 58:11:23
        read:MessageStatus;
    }

    export interface MessageSummary{
        fromId:number;
        fromName:string;
        msgCount:number;
    }

    export interface MessageEntrustedCase{
        entrustedCaseId:number;
        msgSummary:MessageSummary[];
    }
}