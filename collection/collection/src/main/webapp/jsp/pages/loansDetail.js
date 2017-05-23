var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="askSth.tsx"/>
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
            $("#bootbox-record-work, #bootbox-record-work-timeline").on('click', function () {
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
                                        dropzs[0].options.params = {
                                            report: EntrustedCaseReport.reportParams(_this.ec.managerId, $("#record-work input:eq(0)").val(), $("#record-work textarea:eq(0)").val())
                                        };
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
                $("#template_report_work_by_phone").children().attr("id", "report_work_by_phone_");
                var fNewName = route.UUID() + ".MP3";
                var dialog = bootbox.dialog({
                    message: $("#template_report_work_by_phone").html(),
                    title: "电话催收记录录入",
                    className: "modal-blue",
                    closeButton: false,
                    buttons: {
                        "取消": {
                            className: "btn-default mycancel",
                            callback: function () {
                            }
                        },
                        success: {
                            label: "上传记录",
                            className: "btn-blue myupload",
                            callback: function () {
                                if ($("#report_work_by_phone_ input:eq(0)").val() && $("#report_work_by_phone_ textarea").val()) {
                                    collection.EntrustedCaseReport.createPhoneOutReport(_this.ec.managerId, $("#report_work_by_phone_ input:eq(0)").val(), $("#report_work_by_phone_ textarea").val(), fNewName)
                                        .done(function (ret) {
                                        if (ret.code != 0) {
                                            pages.Toast.failed("电话关联失败");
                                        }
                                        else {
                                            _this.refresh();
                                            pages.Toast.success("上传报告成功");
                                        }
                                    });
                                }
                                else {
                                    pages.Toast.warning("请填写记录信息");
                                }
                            }
                        }
                    }
                });
                $("#template_report_work_by_phone").children().removeAttr("id");
                $(".myupload").prop("disabled", true);
                $("#report_work_by_phone_ a:eq(0)").hide();
                $("#report_work_by_phone_ a:eq(0)").click(function () {
                    collection.phone.hangUp();
                });
                if (_this.ecType == collection.protocol.EntrustedCaseType.carLoan) {
                    var i = collection.protocol.getTitles(_this.ecType).indexOf("客户手机");
                    $("#report_work_by_phone_ input:eq(1)").val(_this.ec.loan[i + 1]);
                }
                else if (_this.ecType == collection.protocol.EntrustedCaseType.creditLoan) {
                    var i = collection.protocol.getTitles(_this.ecType).indexOf("手机");
                    $("#report_work_by_phone_ input:eq(1)").val(_this.ec.loan[i + 1]);
                }
                else if (collection.protocol.EntrustedCaseType.creditCard) {
                    var i = collection.protocol.getTitles(_this.ecType).indexOf("手机号码");
                    $("#report_work_by_phone_ input:eq(1)").val(_this.ec.loan[i + 1]);
                }
                $("#report_work_by_phone_ input:eq(1)").click();
                $("#report_work_by_phone_ a:eq(1)").click(function () {
                    var num = $("#report_work_by_phone_ input:eq(1)").val();
                    if (num) {
                        $(".mycancel, .myupload").prop("disabled", true);
                        $("#report_work_by_phone_ a:eq(1)").hide();
                        $("#report_work_by_phone_ a:eq(0)").show();
                        collection.phone.ringUp(num.replace(/-/g, ""), fNewName, function (fName) {
                            $(".mycancel, .myupload").prop("disabled", false);
                            if (fName) {
                                $("#report_work_by_phone_ a").hide();
                                $(".mycancel, .myupload").prop("disabled", false);
                            }
                            else {
                                $("#report_work_by_phone_ a:eq(0)").hide();
                                $("#report_work_by_phone_ a:eq(1)").show();
                                $(".mycancel, .myupload").prop("disabled", true);
                            }
                        });
                    }
                    else {
                        pages.Toast.warning("请填写电话号码");
                    }
                });
            });
            $("#bootbox-loans-consulting-timeline, #bootbox-loans-consulting").on('click', function () {
                $("#template_consulting").children().attr("id", "template_consulting_sub");
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
                                if ($("#template_consulting_sub input:eq(0)").val() || $("#template_consulting_sub textarea:eq(0)").val()) {
                                    Message.sendMessage(_this.ec.managerId, _this.ec.ownerId, $("#template_consulting_sub input:eq(0)").val(), $("#template_consulting_sub textarea:eq(0)").val())
                                        .done(function (r) {
                                        if (r.code == 0) {
                                            pages.Toast.success("咨询提交成功");
                                            _this.refresh();
                                        }
                                        else {
                                            pages.Toast.failed(r.msg);
                                        }
                                    });
                                }
                                else {
                                    pages.Toast.warning("请填完整写信息");
                                    return false;
                                }
                            }
                        }
                    }
                });
                $("#template_consulting").children().removeAttr("id");
            });
            //if (this.ec.assigneeId != context.userId){
            //    $("#bootbox-loans-consulting-timeline, #bootbox-loans-consulting").prop("disabled", true);
            //}
            $("#bootbox-modify-repayment").on('click', function () {
                $("#template_modify_repayment").children().attr("id", "modify_repayment");
                $("#modify_repayment #exampleInputyhje").attr("value", _this.ec.loan[collection.protocol.getTitles(_this.ecType).indexOf("已还金额") + 1]);
                $("#modify_repayment #exampleInputsyje").attr("value", _this.ec.loan[collection.protocol.getTitles(_this.ecType).indexOf("剩余金额") + 1]);
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
                                    collection.EntrustedCase.update(_this.ecType, [{
                                            id: _this.ec.loan[0],
                                            yhje: $("#modify_repayment #exampleInputyhje").val(),
                                            syje: $("#modify_repayment #exampleInputsyje").val()
                                        }])
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
                if ($(".attachement__").length == 0) {
                    pages.Toast.warning("没有可以修改的附件");
                    return;
                }
                $("#template_modify_attachment_property").empty();
                $(".attachement__").each(function (i, e) {
                    var html = ReactDOMServer.renderToStaticMarkup(React.createElement("div", {"className": "row", "data-id": $(e).attr("value")}, React.createElement("div", {"className": "col-md-12"}, React.createElement("div", {"className": "form-group"}, React.createElement("label", {"className": "col-sm-4 control-label no-padding-right"}, $(e).text()), React.createElement("div", {"className": "col-sm-4"}, React.createElement("input", {"className": "form-control", "value": $(e).text(), "data-edit": "false"})), React.createElement("div", {"className": "col-sm-4"}, React.createElement("input", {"className": "form-control", "data-mask": "9999-99-99 99:99:99", "value": $(e).attr("data-time")}))))));
                    $("#template_modify_attachment_property").append(html);
                });
                $("#template_modify_attachment_property").children().addClass("modify_attachment_property");
                var dialog = bootbox.dialog({
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
                                var attachs = [];
                                $(".modify_attachment_property").each(function (i, e) {
                                    var attach = {
                                        id: $(e).attr("data-id"),
                                        display: $(e).find("input:eq(0)").val() ? $(e).find("input:eq(0)").val() : undefined,
                                        uploadTime: $(e).find("input:eq(1)").val() && $(e).find("input:eq(1)").val().indexOf("__") < 0 ?
                                            $(e).find("input:eq(1)").val() :
                                            undefined
                                    };
                                    if (attach.display || attach.uploadTime) {
                                        attachs.push(attach);
                                    }
                                });
                                if (attachs.length > 0) {
                                    collection.EntrustedCase.updateAttachement(attachs).done(function (r) {
                                        if (r.code == 0) {
                                            pages.Toast.success("附件修改成功");
                                            _this.refresh();
                                            dialog.modal("hide");
                                        }
                                        else {
                                            pages.Toast.failed(r.msg);
                                        }
                                    }).fail(function (r) {
                                        pages.Toast.failed("附件修改失败");
                                    });
                                }
                                else {
                                    pages.Toast.warning("请修改附件信息");
                                }
                                return false;
                            }
                        }
                    }
                });
                $("#template_modify_attachment_property").children().removeClass("modify_attachment_property");
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
                    if (i < 8) {
                        _this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>' + titles[i - 1] + '：</b>' + e +
                            '</div>');
                    }
                    else if (i == 8) {
                        _this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>' + titles[i - 1] + '：</b>' + e +
                            '</div>');
                        _this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>分配内勤：</b>' + _this.ec.owner +
                            '</div>');
                        _this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>责任业务员：</b>' + _this.ec.assignee +
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
            //this.find("#bootbox-record-work-timeline").hide();
            //this.find("#bootbox-loans-consulting-timeline").hide();
            if (this.ec) {
                this.find("#ld-eccode").text("委案编码：" + this.ec.loan[1]);
                this.refreshLoan();
                if (this.check(this.ec.reports)) {
                    this.refreshReport();
                }
                Message.getMessages(this.ec.managerId).done(function (msgs) {
                    if (_this.check(msgs)) {
                        _this.ec.messages = msgs;
                        _this.refreshMessage();
                        route.router.broadcast(route.MSG.EC_DETAIL_REFRESH);
                    }
                });
                route.router.broadcast(route.MSG.EC_DETAIL_REFRESH);
            }
        };
        LoansDetail.prototype.onRefresh = function () {
            var _this = this;
            collection.EntrustedCase.search(this.ecType, { mgrId: this.ec.managerId }).done(function (ecs) {
                _this.ec = ecs[0];
                _this.onShown();
            });
        };
        LoansDetail.prototype.check = function (obj) {
            if (obj instanceof Array) {
                return obj && obj.length > 0;
            }
            return !!obj;
        };
        LoansDetail.prototype.refreshReport = function () {
            var _this = this;
            //this.find("#bootbox-record-work-timeline").show();
            $(this.ec.reports).each(function (i, report) {
                var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"className": i % 2 == 0 ? "" : "timeline-inverted"}, React.createElement("div", {"className": "timeline-datetime"}, React.createElement("span", {"className": "timeline-time"}, " ", report.date.substring(11), " "), React.createElement("span", {"className": "timeline-date"}, report.date.substring(0, 10))), React.createElement("div", {"className": "timeline-badge"}, React.createElement("i", {"className": "fa fa-tag sky font-120"})), React.createElement("div", {"className": "timeline-panel bordered-top-3 bordered-azure", "id": "report" + report.id}, React.createElement("div", {"className": "timeline-header bordered-bottom bordered-blue"}, React.createElement("span", {"className": "timeline-title"}, " ", report.title, " ")), React.createElement("div", {"className": "timeline-body"}, React.createElement("p", null, report.content), _this.check(report.attachements) ? (React.createElement("p", null, React.createElement("b", null, "附件："))) : "", _this.check(report.attachements) ? report.attachements.map(function (atta) {
                    return React.createElement("p", null, React.createElement("a", {"href": "#", "className": "danger attachement__", "value": atta.id, "data-time": atta.uploadTime}, atta.display));
                }) : ""))));
                _this.find("#bootbox-loans-consulting-timeline").parent().before(html);
            });
        };
        LoansDetail.prototype.refreshMessage = function () {
            var _this = this;
            //this.find("#bootbox-loans-consulting-timeline").show();
            var pairs = Message.pairs(this.ec.messages);
            $(pairs).each(function (i, pair) {
                var html = ReactDOMServer.renderToStaticMarkup(React.createElement("li", {"className": i % 2 == 0 ? "" : "timeline-inverted"}, React.createElement("div", {"className": "timeline-datetime"}, React.createElement("span", {"className": "timeline-time"}, " ", pair.ask.sendTime.substring(11), " "), React.createElement("span", {"className": "timeline-date"}, pair.ask.sendTime.substring(0, 10))), React.createElement("div", {"className": "timeline-badge"}, React.createElement("i", {"className": "fa fa-question darkorange font-120"})), React.createElement("div", {"className": "timeline-panel"}, React.createElement("div", {"className": "timeline-header bordered-bottom bordered-blue"}, React.createElement("span", {"className": "timeline-title darkorange"}, " ", pair.ask.title, " ")), React.createElement("div", {"className": "timeline-body"}, React.createElement("p", null, pair.ask.content), pair.answer ? (React.createElement("p", null, React.createElement("b", null, "答复："))) : (React.createElement("p", null, React.createElement("b", null, "未答复"))), pair.answer ? (React.createElement("p", null, pair.answer.content)) : "", pair.ask && _this.check(pair.ask.attachements) || (pair.answer && _this.check(pair.answer.attachements)) ? (React.createElement("p", null, React.createElement("b", null, "附件："))) : "", pair.ask && _this.check(pair.ask.attachements) ? pair.ask.attachements.map(function (atta) {
                    return React.createElement("p", null, React.createElement("a", {"href": "#", "className": "attachement__", "value": atta.id, "data-time": atta.uploadTime}, atta.display));
                }) : "", pair.answer && _this.check(pair.answer.attachements) ? pair.answer.attachements.map(function (atta) {
                    return React.createElement("p", null, React.createElement("a", {"href": "#", "className": "attachement__", "value": atta.id, "data-time": atta.uploadTime}, atta.display));
                }) : ""))));
                _this.find("#bootbox-loans-consulting-timeline").parent().parent().append(html);
            });
        };
        LoansDetail.ins = new LoansDetail(pages.PageType.loansDetail);
        return LoansDetail;
    })(pages.PageImpl);
})(pages || (pages = {}));
