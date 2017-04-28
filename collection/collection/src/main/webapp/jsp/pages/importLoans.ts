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
            this.find(".plan").hover(
                (e:any)=>{
                    this.find(".plan").removeClass("popular-plan");
                    this.find(".plan").removeClass("bounce");
                    this.find(e.currentTarget).addClass("popular-plan");
                    this.find(e.currentTarget).addClass("bounce");
                });

            this.find('#il-WiredWizard').wizard();

            this.find('#il-WiredWizard').on('changed', (evt) => {
                if (this.find('#il-WiredWizard').wizard('selectedItem').step == 1){
                    this.find('#il-WiredWizard-actions').hide();
                }else{
                    this.find('#il-WiredWizard-actions').show();
                    //if (this.find('#il-WiredWizard').wizard('selectedItem').step == 2){
                    //    this.find('.btn-prev').attr("disabled","disabled");
                    //}else{
                    //    this.find('.btn-prev').attr("disabled","");
                    //}
                }
            });

            this.find('#il-WiredWizard').on('change', (evt, data) => {
                if (data.direction == 'next'){
                    if (data.step == 2){
                        let queFiles = this.dropz.getQueuedFiles();
                        let size = queFiles.length;
                        if (size == 0){
                            Notify('请添加要导入的委案', 'top-right', '5000', 'warning', 'fa-warning', true);
                            evt.preventDefault();
                        }else{
                            evt.preventDefault();
                            this.find(".btn-next").attr("disabled", "disabled");
                            this.dropz.processQueue();
                            this.dropz.on("success", (file, responseText, e)=>{
                                Notify(file.name + " 导入成功 共" + responseText.msg + "条", 'top-right', '5000', 'success', 'fa-check', true);
                            });
                            this.dropz.on("complete", (file)=>{
                                --size;
                                if (size == 0){
                                    this.find(".btn-next").attr("disabled", "");
                                    this.dropz.off("complete");
                                    this.dropz.off("success");
                                }
                            });
                        }
                    }
                }
            });

            this.find('#il-WiredWizard').on('finished.fu.wizard', (evt, data) => {
                this.goStep1();
            });

            this.find("#selcar").click(()=>{
                this.onclickSelectCar();
                return false;
            });

            this.find("#selloan").click(()=>{
                this.onclickSelectLoan();
                return false;
            });

            this.find("#selcard").click(()=>{
                this.onclickSelectCard();
                return false;
            });

            this.find("#pre").click(()=>{
                this.onclickPre();
            });
        }

        private goStep1() {
            let step = this.find('#il-WiredWizard').wizard('selectedItem').step;
            while(step > 1){
                --step;
                this.find('#il-WiredWizard').wizard("previous");
            }
        }

        protected onRefresh():void {
            if (undefined != this.dropz){
                this.dropz.removeAllFiles();
            }
            this.find(".next").attr("disabled", "");
        }

        private onclickSelectCard():void {
            this.ecType = EntrustedCaseType.creditCard;
            this.find("#il-wiredstep2 .header").text("选择信用卡文件或拖拽信用卡文件到此处");
            this.onclickSelect();
        }

        private onclickSelectLoan():void {
            this.ecType = EntrustedCaseType.creditLoan;
            this.find("#il-wiredstep2 .header").text("选择信贷文件或拖拽信贷文件到此处");
            this.onclickSelect();
        }

        private onclickSelectCar():void {
            this.ecType = EntrustedCaseType.carLoan;
            this.find("#il-wiredstep2 .header").text("选择车贷文件或拖拽车贷文件到此处");
            this.onclickSelect();
        }

        onclickSelect(){
            this.find('#il-WiredWizard').wizard("next");
            if (undefined != this.dropz){
                this.dropz.options.url = Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType;
            }else{
                this.dropz = new Dropzone("#dropzone", {
                    url: Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType,
                    maxFiles: 10,
                    maxFilesize: 512,
                    acceptedFiles: ".xls, xlsx",
                    paramName:"file",
                    autoProcessQueue:false
                });
            }
          //  $("#WiredWizard-actions").show();

        }

        private onclickPre():void {
            if (this.dropz != undefined){
                this.dropz.removeAllFiles();
            }
            //$("#step2").removeClass("active");
            //$("#il-wiredstep2").removeClass("active");
            //$("#il-wiredstep1").addClass("active");
            //$("#WiredWizard-actions").hide();
        }

    }
}