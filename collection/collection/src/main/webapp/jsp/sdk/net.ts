///<reference path="protocol.ts"/>
///<reference path="account.ts"/>
module collection{
    import Promise = collection.protocol.Promise;
    export class Net{
        static BASE_URL = window.document.location.pathname.substring(0, window.document.location.pathname.indexOf("/", 1));

        static post(url:string,data?:any):Promise<any>{
            let deferred = $.Deferred();
            $.ajax({
                type: 'POST',
                url: url,
            }).done((obj:string)=>{
                let jobj = JSON.parse(obj);
                if (jobj != undefined &&
                    jobj.redirect != undefined &&
                    jobj.error == "invalidate session"){
                    window.location.href = jobj.redirect;
                }else {
                    deferred.resolve(jobj);
                }
            }).fail((err:any)=>{
                deferred.reject(err);
            });
            return deferred.promise();
        }
    }
}
