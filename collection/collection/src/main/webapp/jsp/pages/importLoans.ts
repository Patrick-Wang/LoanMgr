///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{

    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
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
        }

        private onclickSelectLoan():void {
            this.ecType = EntrustedCaseType.creditLoan;
        }

        private onclickSelectCar():void {
            this.ecType = EntrustedCaseType.carLoan;
        }

        onclicSelect(){
            $("step1").removeClass("active");
            $("step2").addClass("active");
        }
    }
}