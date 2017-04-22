///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{

    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import Net = collection.Net;
    declare let Dropzone:any;
    class ImportLoans extends PageImpl{
        static ins = new ImportLoans(PageType.importLoans);
        ecType:collection.protocol.EntrustedCaseType;
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
        }

        protected onRefresh():void {

        }

        private onclickSelectCard():void {
            this.ecType = EntrustedCaseType.creditCard;
            this.onclickSelect();
        }

        private onclickSelectLoan():void {
            this.ecType = EntrustedCaseType.creditLoan;
            this.onclickSelect();
        }

        private onclickSelectCar():void {
            this.ecType = EntrustedCaseType.carLoan;
            this.onclickSelect();
        }

        onclickSelect(){
            $("#step2").addClass("active");
            $("#wiredstep1").removeClass("active");
            $("#wiredstep2").addClass("active");
            var dropz = new Dropzone("#dropzone", {
                url: Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType,
                maxFiles: 10,
                maxFilesize: 512,
                acceptedFiles: ".xls, xlsx",
                paramName:"file"
            });
        }
    }
}