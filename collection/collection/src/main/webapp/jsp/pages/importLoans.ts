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
                }
            });

            //this.find('#il-WiredWizard').on('change', (evt, data) => {
            //    if (data.direction == 'next'){
            //        if (data.step == 2){
            //            let queFiles = this.dropz.getQueuedFiles();
            //            let size = queFiles.length;
            //            if (size == 0){
            //                Toast.warning('请添加要导入的委案');
            //            }else{
            //                //this.find(".btn-next").attr("disabled", true);
            //                this.dropz.processQueue();
            //            }
            //            evt.preventDefault();
            //        }
            //    }
            //});

            this.find('#il-WiredWizard').on('finished.fu.wizard', (evt, data) => {
                let queFiles = this.dropz.getQueuedFiles();
                let size = queFiles.length;
                if (size == 0){
                    Toast.warning('请添加要导入的委案');
                }else{
                    this.find(".btn-next").attr("disabled", true);
                    this.dropz.processQueue();
                }
                evt.preventDefault();
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
            //this.find(".btn-next").attr("disabled", false);
        }

        private onclickSelectCard():void {
            if (this.ecType != EntrustedCaseType.creditCard){
                if (undefined != this.dropz){
                    this.dropz.removeAllFiles();
                }
            }
            this.ecType = EntrustedCaseType.creditCard;
            this.find("#il-wiredstep2 .header").text("选择信用卡文件或拖拽信用卡文件到此处");
            this.onclickSelect();
        }

        private onclickSelectLoan():void {
            if (this.ecType != EntrustedCaseType.creditLoan){
                if (undefined != this.dropz){
                    this.dropz.removeAllFiles();
                }
            }
            this.ecType = EntrustedCaseType.creditLoan;
            this.find("#il-wiredstep2 .header").text("选择信贷文件或拖拽信贷文件到此处");
            this.onclickSelect();
        }

        private onclickSelectCar():void {
            if (this.ecType != EntrustedCaseType.carLoan){
                if (undefined != this.dropz){
                    this.dropz.removeAllFiles();
                }
            }
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
                    maxFiles: 5,
                    parallelUploads:1,
                    maxFilesize: 1024*10,
                    acceptedFiles: ".xls, xlsx",
                    paramName:"file",
                    autoProcessQueue:false
                });

                this.dropz.on("success", (file, result:collection.protocol.Result, e)=>{
                    if (result.code == 0){
                        Toast.success(file.name + " 导入成功 共" + result.msg + "条");
                    }else{
                        Toast.failed(file.name + " 导入失败 : " + result.msg);
                    }
                });

                this.dropz.on("error", (file, message, xhr)=>{
                    if (message == this.dropz.options.dictMaxFilesExceeded){
                        Toast.failed(message);
                        //this.dropz.removeFile(file);
                    }else if (message == this.dropz.options.dictInvalidFileType){
                        Toast.failed(message);
                        //this.dropz.removeFile(file);
                    }else{
                        Toast.failed(file.name + " 导入失败");
                    }
                });

                this.dropz.on("complete", (file)=>{
                    this.dropz.removeFile(file);
                    if ( this.dropz.getQueuedFiles().length == 0){
                        this.find(".btn-next").attr("disabled", false);
                        this.goStep1();
                    }else{
                        this.dropz.processQueue();
                    }
                });
            }

        }
    }
}