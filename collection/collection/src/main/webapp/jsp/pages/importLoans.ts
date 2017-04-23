///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{

    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import Net = collection.Net;
    declare let Dropzone:any;
    class ImportLoans extends PageImpl{
        static ins = new ImportLoans(PageType.importLoans);
        ecType:collection.protocol.EntrustedCaseType;
        dropz;any;
        constructor(page:pages.PageType) {
            super(page);
            let target;
            $(".plan").hover(
                (e:any)=>{
                    $(".plan").removeClass("popular-plan");
                    $(".plan").removeClass("bounce");
                    $(e.currentTarget).addClass("popular-plan");
                    $(e.currentTarget).addClass("bounce");
                });

            $("#selcar").click(()=>{
                this.onclickSelectCar();
                return false;
            });

            $("#selloan").click(()=>{
                this.onclickSelectLoan();
                return false;
            });

            $("#selcard").click(()=>{
                this.onclickSelectCard();
                return false;
            });

            $("#pre").click(()=>{
                this.onclickPre();
            });
        }

        protected onRefresh():void {
            if (undefined != this.dropz){
                this.dropz.removeAllFiles();
            }
        }

        private onclickSelectCard():void {
            this.ecType = EntrustedCaseType.creditCard;
            $("#wiredstep2 .header").text("选择信用卡文件或拖拽信用卡文件到此处");
            this.onclickSelect();
        }

        private onclickSelectLoan():void {
            this.ecType = EntrustedCaseType.creditLoan;
            $("#wiredstep2 .header").text("选择信贷文件或拖拽信贷文件到此处");
            this.onclickSelect();
        }

        private onclickSelectCar():void {
            this.ecType = EntrustedCaseType.carLoan;
            $("#wiredstep2 .header").text("选择车贷文件或拖拽车贷文件到此处");
            this.onclickSelect();
        }

        onclickSelect(){
            $("#step2").addClass("active");
            $("#wiredstep1").removeClass("active");
            $("#wiredstep2").addClass("active");
            if (undefined != this.dropz){
                this.dropz.options.url = Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType;
            }else{
                this.dropz = new Dropzone("#dropzone", {
                    url: Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType,
                    maxFiles: 10,
                    maxFilesize: 512,
                    acceptedFiles: ".xls, xlsx",
                    paramName:"file"
                });
            }
            $("#WiredWizard-actions").show();

        }

        private onclickPre():void {
            if (this.dropz != undefined){
                this.dropz.removeAllFiles();
            }
            $("#step2").removeClass("active");
            $("#wiredstep2").removeClass("active");
            $("#wiredstep1").addClass("active");
            $("#WiredWizard-actions").hide();
        }

    }
}