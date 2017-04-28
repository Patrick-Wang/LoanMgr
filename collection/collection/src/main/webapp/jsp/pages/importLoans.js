var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var EntrustedCaseType = collection.protocol.EntrustedCaseType;
    var Net = collection.Net;
    var ImportLoans = (function (_super) {
        __extends(ImportLoans, _super);
        function ImportLoans(page) {
            var _this = this;
            _super.call(this, page);
            var target;
            this.find(".plan").hover(function (e) {
                _this.find(".plan").removeClass("popular-plan");
                _this.find(".plan").removeClass("bounce");
                _this.find(e.currentTarget).addClass("popular-plan");
                _this.find(e.currentTarget).addClass("bounce");
            });
            this.find('#il-WiredWizard').wizard();
            this.find('#il-WiredWizard').on('changed', function (evt) {
                if (_this.find('#il-WiredWizard').wizard('selectedItem').step == 1) {
                    _this.find('#il-WiredWizard-actions').hide();
                }
                else {
                    _this.find('#il-WiredWizard-actions').show();
                }
            });
            this.find('#il-WiredWizard').on('change', function (evt, data) {
                if (data.direction == 'next') {
                    if (data.step == 2) {
                        var queFiles = _this.dropz.getQueuedFiles();
                        var size = queFiles.length;
                        if (size == 0) {
                            Notify('请添加要导入的委案', 'top-right', '5000', 'warning', 'fa-warning', true);
                            evt.preventDefault();
                        }
                        else {
                            evt.preventDefault();
                            _this.find(".btn-next").attr("disabled", "disabled");
                            _this.dropz.processQueue();
                            _this.dropz.on("success", function (file, responseText, e) {
                                Notify(file.name + " 导入成功 共" + responseText.msg + "条", 'top-right', '5000', 'success', 'fa-check', true);
                            });
                            _this.dropz.on("complete", function (file) {
                                --size;
                                if (size == 0) {
                                    _this.find(".btn-next").attr("disabled", "");
                                    _this.dropz.off("complete");
                                    _this.dropz.off("success");
                                }
                            });
                        }
                    }
                }
            });
            this.find('#il-WiredWizard').on('finished.fu.wizard', function (evt, data) {
                _this.goStep1();
            });
            this.find("#selcar").click(function () {
                _this.onclickSelectCar();
                return false;
            });
            this.find("#selloan").click(function () {
                _this.onclickSelectLoan();
                return false;
            });
            this.find("#selcard").click(function () {
                _this.onclickSelectCard();
                return false;
            });
            this.find("#pre").click(function () {
                _this.onclickPre();
            });
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
            this.find(".next").attr("disabled", "");
        };
        ImportLoans.prototype.onclickSelectCard = function () {
            this.ecType = EntrustedCaseType.creditCard;
            this.find("#il-wiredstep2 .header").text("选择信用卡文件或拖拽信用卡文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onclickSelectLoan = function () {
            this.ecType = EntrustedCaseType.creditLoan;
            this.find("#il-wiredstep2 .header").text("选择信贷文件或拖拽信贷文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onclickSelectCar = function () {
            this.ecType = EntrustedCaseType.carLoan;
            this.find("#il-wiredstep2 .header").text("选择车贷文件或拖拽车贷文件到此处");
            this.onclickSelect();
        };
        ImportLoans.prototype.onclickSelect = function () {
            this.find('#il-WiredWizard').wizard("next");
            if (undefined != this.dropz) {
                this.dropz.options.url = Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType;
            }
            else {
                this.dropz = new Dropzone("#dropzone", {
                    url: Net.BASE_URL + "/entrusted_case/import.do?type=" + this.ecType,
                    maxFiles: 10,
                    maxFilesize: 512,
                    acceptedFiles: ".xls, xlsx",
                    paramName: "file",
                    autoProcessQueue: false
                });
            }
            //  $("#WiredWizard-actions").show();
        };
        ImportLoans.prototype.onclickPre = function () {
            if (this.dropz != undefined) {
                this.dropz.removeAllFiles();
            }
            //$("#step2").removeClass("active");
            //$("#il-wiredstep2").removeClass("active");
            //$("#il-wiredstep1").addClass("active");
            //$("#WiredWizard-actions").hide();
        };
        ImportLoans.ins = new ImportLoans(pages.PageType.importLoans);
        return ImportLoans;
    })(pages.PageImpl);
})(pages || (pages = {}));
