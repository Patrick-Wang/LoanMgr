var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var EntrustedCaseType = collection.protocol.EntrustedCaseType;
    var Net = collection.Net;
    var ImportLoans = (function (_super) {
        __extends(ImportLoans, _super);
        function ImportLoans(page) {
            var _this = _super.call(this, page) || this;
            _this.find(".plan").hover(function (e) {
                _this.find(".plan").removeClass("popular-plan");
                _this.find(".plan").removeClass("bounce");
                _this.find(e.currentTarget).addClass("popular-plan");
                _this.find(e.currentTarget).addClass("bounce");
            });
            _this.find('#il-WiredWizard').wizard();
            _this.find('#il-WiredWizard').on('changed', function (evt) {
                if (_this.find('#il-WiredWizard').wizard('selectedItem').step == 1) {
                    _this.find('#il-WiredWizard-actions').hide();
                }
                else {
                    _this.find('#il-WiredWizard-actions').show();
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
            _this.find('#il-WiredWizard').on('finished.fu.wizard', function (evt, data) {
                var queFiles = _this.dropz.getQueuedFiles();
                var size = queFiles.length;
                if (size == 0) {
                    pages.Toast.warning('请添加要导入的委案');
                }
                else {
                    _this.find(".btn-next").attr("disabled", true);
                    _this.dropz.options.params = {
                        batchTime: _this.batchTime
                    };
                    _this.dropz.processQueue();
                }
                evt.preventDefault();
            });
            _this.find("#selcar").click(function () {
                _this.onclickSelectCar();
                return false;
            });
            _this.find("#selloan").click(function () {
                _this.onclickSelectLoan();
                return false;
            });
            _this.find("#selcard").click(function () {
                _this.onclickSelectCard();
                return false;
            });
            return _this;
        }
        ImportLoans.prototype.goStep1 = function () {
            var step = this.find('#il-WiredWizard').wizard('selectedItem').step;
            while (step > 1) {
                --step;
                this.find('#il-WiredWizard').wizard("previous");
            }
        };
        ImportLoans.prototype.onRefresh = function () {
            if (undefined != this.dropz) {
                this.dropz.removeAllFiles();
            }
            //this.find(".btn-next").attr("disabled", false);
        };
        ImportLoans.prototype.onclickSelectCard = function () {
            if (this.ecType != EntrustedCaseType.creditCard) {
                if (undefined != this.dropz) {
                    this.dropz.removeAllFiles();
                }
            }
            this.ecType = EntrustedCaseType.creditCard;
            this.find("#il-wiredstep2 .header").text("选择信用卡文件或拖拽信用卡文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onShown = function () {
            this.batchTime = Date.now() + "";
            _super.prototype.onShown.call(this);
        };
        ImportLoans.prototype.onclickSelectLoan = function () {
            if (this.ecType != EntrustedCaseType.creditLoan) {
                if (undefined != this.dropz) {
                    this.dropz.removeAllFiles();
                }
            }
            this.ecType = EntrustedCaseType.creditLoan;
            this.find("#il-wiredstep2 .header").text("选择信贷文件或拖拽信贷文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onclickSelectCar = function () {
            if (this.ecType != EntrustedCaseType.carLoan) {
                if (undefined != this.dropz) {
                    this.dropz.removeAllFiles();
                }
            }
            this.ecType = EntrustedCaseType.carLoan;
            this.find("#il-wiredstep2 .header").text("选择车贷文件或拖拽车贷文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onclickSelect = function () {
            var _this = this;
            this.find('#il-WiredWizard').wizard("next");
            if (undefined != this.dropz) {
                this.dropz.options.url = Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType;
            }
            else {
                this.dropz = new Dropzone("#dropzone", {
                    url: Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType,
                    maxFiles: 5,
                    parallelUploads: 1,
                    maxFilesize: 1024 * 10,
                    acceptedFiles: ".xlsx,.xls",
                    paramName: "file",
                    autoProcessQueue: false
                });
                this.dropz.on("success", function (file, result, e) {
                    if (result.code == 0) {
                        pages.Toast.success(file.name + " 导入成功 共" + result.msg + "条");
                    }
                    else {
                        pages.Toast.failed(file.name + " 导入失败 : " + result.msg);
                    }
                });
                this.dropz.on("error", function (file, message, xhr) {
                    if (message == _this.dropz.options.dictMaxFilesExceeded) {
                        pages.Toast.failed(message);
                        //this.dropz.removeFile(file);
                    }
                    else if (message == _this.dropz.options.dictInvalidFileType) {
                        pages.Toast.failed(message);
                        //this.dropz.removeFile(file);
                    }
                    else {
                        pages.Toast.failed(file.name + " 导入失败");
                    }
                });
                this.dropz.on("complete", function (file) {
                    _this.dropz.removeFile(file);
                    if (_this.dropz.getQueuedFiles().length == 0) {
                        _this.find(".btn-next").attr("disabled", false);
                        _this.goStep1();
                    }
                    else {
                        _this.dropz.processQueue();
                    }
                });
            }
        };
        ImportLoans.ins = new ImportLoans(pages.PageType.importLoans);
        return ImportLoans;
    }(pages.PageImpl));
})(pages || (pages = {}));
