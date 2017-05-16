var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var Message = collection.Message;
    var EntrustedCaseReport = collection.EntrustedCaseReport;
    var LoansDetail = (function (_super) {
        __extends(LoansDetail, _super);
        function LoansDetail(page) {
            var _this = this;
            _super.call(this, page);
            this.firstRefresh = true;
            route.router.register(new route.Receiver(pages.PageUtil.getPageId(this.page), function (e) {
                switch (e.id) {
                    case route.MSG.EC_DETAIL_ECINFO:
                        _this.ec = e.data.ec;
                        _this.ecType = e.data.ecType;
                        break;
                }
            }));
            $("#bootbox-click-to-working").on('click', function () {
                bootbox.confirm("是否将委案状态修改为工作中？", function (result) {
                    if (result) {
                        collection.EntrustedCase.update(_this.ecType, [{ id: _this.ec.loan[0], wwzt: "工作中" }])
                            .done(function (ret) {
                            if (ret.code == 0) {
                                _this.refresh();
                                pages.Toast.success("状态修改成功");
                            }
                            else {
                                pages.Toast.failed(ret.msg);
                            }
                        });
                    }
                });
            });
            $("#bootbox-click-to-done").on('click', function () {
                bootbox.confirm("是否将委案状态修改为已退案？", function (result) {
                    if (result) {
                        collection.EntrustedCase.update(_this.ecType, [{ id: _this.ec.loan[0], wwzt: "已退案" }])
                            .done(function (ret) {
                            if (ret.code == 0) {
                                _this.refresh();
                                pages.Toast.success("状态修改成功");
                            }
                            else {
                                pages.Toast.failed(ret.msg);
                            }
                        });
                    }
                });
            });
            $("#bootbox-record-by-phone").on('click', function () {
                var dialog = bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "电话访谈",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "拨打电话",
                            className: "btn-blue",
                            callback: function () {
                                var num = "123123";
                                collection.phone.ringUp(num, route.UUID() + ".MP3", function (fName) {
                                    if (fName) {
                                        collection.EntrustedCaseReport.createPhoneOutReport(_this.ec.managerId, num, fName)
                                            .done(function (ret) {
                                            if (ret.code != 0) {
                                                pages.Toast.failed("电话关联失败");
                                            }
                                            else {
                                                collection.EntrustedCase.search(_this.ecType, { mgrId: _this.ec.managerId }).done(function (ec) {
                                                    _this.ec = ec[0];
                                                    _this.refresh();
                                                });
                                            }
                                        });
                                    }
                                    dialog.modal("hide");
                                });
                                return false;
                            }
                        },
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        }
                    }
                });
            });
            $("#bootbox-record-work,#bootbox-record-work-timeline").on('click', function () {
                $("#template_report_work").children().attr("id", "record-work");
                var dropzs = [];
                var dialog = bootbox.dialog({
                    message: $("#template_report_work").html(),
                    title: "委案工作记录录入",
                    className: "modal-blue",
                    buttons: {
                        "取消": {
                            className: "btn-default",
                            callback: function () {
                            }
                        },
                        success: {
                            label: "上传记录",
                            className: "btn-blue",
                            callback: function () {
                                if ($("#record-work input:eq(0)").val() && $("#record-work textarea:eq(0)").val()) {
                                    if (dropzs[0].getQueuedFiles().length > 0) {
                                        dropzs[0].options.params = { report: EntrustedCaseReport.reportParams(_this.ec.managerId, $("#record-work input:eq(0)").val(), $("#record-work textarea:eq(0)").val()) };
                                        dropzs[0].processQueue();
                                    }
                                    else {
                                        EntrustedCaseReport.createReport(_this.ec.managerId, $("#record-work input:eq(0)").val(), $("#record-work textarea:eq(0)").val())
                                            .done(function (r) {
                                            if (r.code == 0) {
                                                pages.Toast.success("报告上传成功");
                                                _this.refresh();
                                            }
                                            else {
                                                pages.Toast.failed(r.msg);
                                            }
                                        });
                                    }
                                }
                                else {
                                    pages.Toast.warning("信息不完整");
                                    return false;
                                }
                            }
                        }
                    }
                });
                $("#template_report_work").children().removeAttr("id");
                var dropz = new Dropzone("#record-work #ld-dropzone", {
                    url: collection.Net.BASE_URL + "/entrusted_case/report/submit.do",
                    maxFiles: 5,
                    parallelUploads: 5,
                    maxFilesize: 1024 * 100,
                    uploadMultiple: true,
                    paramName: "attachements",
                    autoProcessQueue: false
                });
                dropzs.push(dropz);
                dropz.on("successmultiple", function (file, result, e) {
                    if (result.code == 0) {
                        pages.Toast.success("发送成功");
                        _this.refresh();
                    }
                    else {
                        pages.Toast.failed("发送失败");
                    }
                });
                dropz.on("errormultiple", function (file, message, xhr) {
                    if (message == dropz.options.dictMaxFilesExceeded) {
                        pages.Toast.failed(message);
                    }
                    else if (message == dropz.options.dictInvalidFileType) {
                        pages.Toast.failed(message);
                    }
                    else {
                        pages.Toast.failed("发送失败");
                    }
                });
                dropz.on("completemultiple", function (file) {
                    dialog.modal("hide");
                });
            });
            $("#bootbox-record-work-by-phone").on('click', function () {
                bootbox.dialog({
                    message: $("#template_report_work_by_phone").html(),
                    title: "电话催收记录录入",
                    className: "modal-blue",
                    buttons: {
                        "取消": {
                            className: "btn-default",
                            callback: function () {
                            }
                        },
                        success: {
                            label: "上传记录",
                            className: "btn-blue",
                            callback: function () {
                            }
                        }
                    }
                });
            });
            $("#bootbox-loans-consulting-timeline").on('click', function () {
                bootbox.dialog({
                    message: $("#template_consulting").html(),
                    title: "工作记录录入",
                    className: "modal-darkorange",
                    buttons: {
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        },
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: function () {
                            }
                        }
                    }
                });
            });
            $("#bootbox-loans-consulting").on('click', function () {
                bootbox.dialog({
                    message: $("#template_consulting").html(),
                    title: "咨询委案信息",
                    className: "modal-darkorange",
                    buttons: {
                        "取消": {
                            className: "btn-danger",
                            callback: function () {
                            }
                        },
                        success: {
                            label: "咨询",
                            className: "btn-blue",
                            callback: function () {
                            }
                        }
                    }
                });
            });
            $("#bootbox-modify-repayment").on('click', function () {
                $("#template_modify_repayment").children().attr("id", "modify_repayment");
                $("#modify_repayment #exampleInputyhje").attr("value", _this.ec.loan[collection.protocol.getTitles(_this.ecType).indexOf("已还金额") + 1]);
                bootbox.dialog({
                    message: $("#template_modify_repayment").html(),
                    title: "修改委案回款额",
                    className: "modal-blue",
                    buttons: {
                        "取消": {
                            className: "btn-default",
                            callback: function () {
                            }
                        },
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: function () {
                                if ($("#modify_repayment #exampleInputyhje").val() || $("#modify_repayment #exampleInputsyje").val()) {
                                    collection.EntrustedCase.update(_this.ecType, [{ id: _this.ec.loan[0], yhje: $("#modify_repayment #exampleInputyhje").val() }])
                                        .done(function (r) {
                                        if (r.code == 0) {
                                            _this.refresh();
                                            pages.Toast.success("修改成功");
                                        }
                                        else {
                                            pages.Toast.failed(r.msg);
                                        }
                                    });
                                }
                                else {
                                    pages.Toast.warning("请填写金额");
                                    return false;
                                }
                            }
                        }
                    }
                });
                $("#template_modify_repayment").children().removeAttr("id");
            });
            $("#bootbox-modify-attachment-property").on('click', function () {
                bootbox.dialog({
                    message: $("#template_modify_attachment_property").html(),
                    title: "修改附件属性",
                    className: "modal-darkorange",
                    buttons: {
                        "取消": {
                            className: "btn-default",
                            callback: function () {
                            }
                        },
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: function () {
                            }
                        }
                    }
                });
            });
            $("#bootbox-success").on('click', function () {
                bootbox.dialog({
                    message: $("#modal-success").html(),
                    title: "Success",
                    className: "",
                });
            });
            $(document).ready(function () {
                bootbox.setDefaults('locale', 'zh_CN');
                $("#registrationForm").bootstrapValidator();
                $('#togglingForm').bootstrapValidator({
                    message: 'This value is not valid',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    submitHandler: function (validator, form, submitButton) {
                        // Do nothing
                    },
                    fields: {
                        firstName: {
                            validators: {
                                notEmpty: {
                                    message: 'The first name is required'
                                }
                            }
                        },
                        lastName: {
                            validators: {
                                notEmpty: {
                                    message: 'The last name is required'
                                }
                            }
                        },
                        company: {
                            validators: {
                                notEmpty: {
                                    message: 'The company name is required'
                                }
                            }
                        },
                        // These fields will be validated when being visible
                        job: {
                            validators: {
                                notEmpty: {
                                    message: 'The job title is required'
                                }
                            }
                        },
                        department: {
                            validators: {
                                notEmpty: {
                                    message: 'The department name is required'
                                }
                            }
                        },
                        mobilePhone: {
                            validators: {
                                notEmpty: {
                                    message: 'The mobile phone number is required'
                                },
                                digits: {
                                    message: 'The mobile phone number is not valid'
                                }
                            }
                        },
                        // These fields will be validated when being visible
                        homePhone: {
                            validators: {
                                digits: {
                                    message: 'The home phone number is not valid'
                                }
                            }
                        },
                        officePhone: {
                            validators: {
                                digits: {
                                    message: 'The office phone number is not valid'
                                }
                            }
                        }
                    }
                })
                    .find('button[data-toggle]')
                    .on('click', function () {
                    var $target = $($(_this).attr('data-toggle'));
                    // Show or hide the additional fields
                    // They will or will not be validated based on their visibilities
                    $target.toggle();
                    if (!$target.is(':visible')) {
                        // Enable the submit buttons in case additional fields are not valid
                        $('#togglingForm').data('bootstrapValidator').disableSubmitButtons(false);
                    }
                });
                $('#accountForm').bootstrapValidator({
                    // Only disabled elements are excluded
                    // The invisible elements belonging to inactive tabs must be validated
                    excluded: [':disabled'],
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    submitHandler: function (validator, form, submitButton) {
                        // Do nothing
                    },
                    fields: {
                        fullName: {
                            validators: {
                                notEmpty: {
                                    message: 'The full name is required'
                                }
                            }
                        },
                        company: {
                            validators: {
                                notEmpty: {
                                    message: 'The company name is required'
                                }
                            }
                        },
                        address: {
                            validators: {
                                notEmpty: {
                                    message: 'The address is required'
                                }
                            }
                        },
                        city: {
                            validators: {
                                notEmpty: {
                                    message: 'The city is required'
                                }
                            }
                        }
                    }
                });
                $('#html5Form').bootstrapValidator();
            });
        }
        LoansDetail.prototype.refreshLoan = function () {
            var _this = this;
            var titles = collection.protocol.getTitles(this.ecType);
            $(this.ec.loan).each(function (i, e) {
                if (i > 0) {
                    if (!e) {
                        e = "";
                    }
                    if (i <= 7) {
                        _this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>' + titles[i - 1] + '：</b>' + e +
                            '</div>');
                    }
                    else {
                        _this.find("#ld-special").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-caret-right darkpink"></i><b>' + titles[i - 1] + '：</b>' + e +
                            '</div>');
                    }
                }
            });
        };
        LoansDetail.prototype.onShown = function () {
            var _this = this;
            if (this.page != sidebar.getLastPage()) {
                this.lastPage = sidebar.getLastPage();
            }
            this.find("#ld-timeline li:not(.timeline-node)").remove();
            this.find("#ld-common").empty();
            this.find("#ld-special").empty();
            this.find("#bootbox-record-work-timeline").hide();
            this.find("#bootbox-loans-consulting-timeline").hide();
            if (this.ec) {
                this.refreshLoan();
                if (this.check(this.ec.reports)) {
                    this.refreshReport();
                }
                Message.getMessages(this.ec.managerId).done(function (msgs) {
                    if (_this.check(msgs)) {
                        _this.ec.messages = msgs;
                        _this.refreshMessage();
                    }
                });
            }
        };
        LoansDetail.prototype.onRefresh = function () {
            var _this = this;
            if (!this.firstRefresh) {
                collection.EntrustedCase.search(this.ecType, { mgrId: this.ec.managerId }).done(function (ecs) {
                    _this.ec = ecs[0];
                    _this.onShown();
                });
            }
            else {
                this.firstRefresh = false;
            }
        };
        LoansDetail.prototype.check = function (obj) {
            if (obj instanceof Array) {
                return obj && obj.length > 0;
            }
            return !!obj;
        };
        LoansDetail.prototype.refreshReport = function () {
            var _this = this;
            this.find("#bootbox-record-work-timeline").show();
            $(this.ec.reports).each(function (i, report) {
                var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"className": i % 2 == 0 ? "" : "timeline-inverted"}, React.createElement("div", {"className": "timeline-datetime"}, React.createElement("span", {"className": "timeline-time"}, " ", report.date.substring(11), " "), React.createElement("span", {"className": "timeline-date"}, report.date.substring(0, 10))), React.createElement("div", {"className": "timeline-badge"}, React.createElement("i", {"className": "fa fa-tag sky font-120"})), React.createElement("div", {"className": "timeline-panel bordered-top-3 bordered-azure", "id": "report" + report.id}, React.createElement("div", {"className": "timeline-header bordered-bottom bordered-blue"}, React.createElement("span", {"className": "timeline-title"}, " ", report.title, " ")), React.createElement("div", {"className": "timeline-body"}, React.createElement("p", null, report.content), _this.check(report.attachements) ? (React.createElement("p", null, React.createElement("b", null, "附件："))) : "", _this.check(report.attachements) ? report.attachements.map(function (atta) {
                    return React.createElement("p", null, React.createElement("a", {"href": "#", "className": "danger", "id": "atta" + atta.id}, atta.display));
                }) : ""))));
                _this.find("#bootbox-loans-consulting-timeline").parent().before(html);
            });
        };
        LoansDetail.prototype.refreshMessage = function () {
            var _this = this;
            this.find("#bootbox-loans-consulting-timeline").show();
            var pairs = Message.pairs(this.ec.messages);
            $(pairs).each(function (i, pair) {
                var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"className": i % 2 == 0 ? "" : "timeline-inverted"}, React.createElement("div", {"className": "timeline-datetime"}, React.createElement("span", {"className": "timeline-time"}, " ", pair.ask.sendTime.substring(11), " "), React.createElement("span", {"className": "timeline-date"}, pair.ask.sendTime.substring(0, 10))), React.createElement("div", {"className": "timeline-badge"}, React.createElement("i", {"className": "fa fa-question darkorange font-120"})), React.createElement("div", {"className": "timeline-panel"}, React.createElement("div", {"className": "timeline-header bordered-bottom bordered-blue"}, React.createElement("span", {"className": "timeline-title darkorange"}, " ", pair.ask.title, " ")), React.createElement("div", {"className": "timeline-body"}, React.createElement("p", null, pair.ask.content), pair.answer ? (React.createElement("p", null, React.createElement("b", null, "答复："))) : (React.createElement("p", null, React.createElement("b", null, "未答复"))), pair.answer ? (React.createElement("p", null, pair.answer.content)) : "", pair.ask && _this.check(pair.ask.attachements) || (pair.answer && _this.check(pair.answer.attachements)) ? (React.createElement("p", null, React.createElement("b", null, "附件："))) : "", pair.ask && _this.check(pair.ask.attachements) ? pair.ask.attachements.map(function (atta) {
                    return React.createElement("p", null, React.createElement("a", {"href": "#", "id": "atta" + atta.id}, atta.display));
                }) : "", pair.answer && _this.check(pair.answer.attachements) ? pair.answer.attachements.map(function (atta) {
                    return React.createElement("p", null, React.createElement("a", {"href": "#", "id": "atta" + atta.id}, atta.display));
                }) : ""))));
                _this.find("#bootbox-loans-consulting-timeline").parent().parent().append(html);
            });
        };
        LoansDetail.ins = new LoansDetail(pages.PageType.loansDetail);
        return LoansDetail;
    })(pages.PageImpl);
})(pages || (pages = {}));
