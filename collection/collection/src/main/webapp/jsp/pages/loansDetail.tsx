///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="askSth.tsx"/>
///<reference path="importLoans.ts"/>
module pages {
    import Message = collection.Message;
    import EntrustedCaseReport = collection.EntrustedCaseReport;


    interface ECInfo{
        ecs:collection.protocol.EC[];
        ec:collection.protocol.EC;
        ecType:collection.protocol.EntrustedCaseType;
        searchOpt: collection.protocol.QueryOption;
        index : number;
    }

    class LoansDetail extends PageImpl {
        static ins = new LoansDetail(PageType.loansDetail);
        lastPage;
        ec:collection.protocol.EC;
        ecType:collection.protocol.EntrustedCaseType;
        firstRefresh:boolean = true;
        ecInfo:ECInfo;
        constructor(page:pages.PageType) {
            super(page);

            route.router.register(new route.Receiver(PageUtil.getPageId(this.page), (e:route.Event)=> {
                switch (e.id) {
                    case route.MSG.EC_DETAIL_ECINFO:
                        this.ec = e.data.ec;
                        this.ecType = e.data.ecType;
                        this.ecInfo = e.data;
                        break;
                }
            }));

            $("#bootbox-click-to-ppg").on("click", ()=>{
                --this.ecInfo.index;
                this.refresh();
            });
            $("#bootbox-click-to-npg").on("click", ()=>{
                ++this.ecInfo.index;
                this.refresh();
            });

            $("#return-back").on("click", ()=>{
                if (this.lastPage) {
                    sidebar.switchPage(this.lastPage);
                }
            });

            $("#bootbox-click-to-working").on('click', () => {
                bootbox.confirm("是否将委案状态修改为工作中？", (result) => {
                    if (result) {
                        collection.EntrustedCase.update(this.ecType, [{id: this.ec.loan[0], wwzt: "工作中"}])
                            .done((ret:collection.protocol.Result)=> {
                                if (ret.code == 0) {
                                    this.refresh();
                                    Toast.success("状态修改成功");
                                } else {
                                    Toast.failed(ret.msg);
                                }
                            });
                    }
                });
            });

            $("#bootbox-click-to-done").on('click', () => {
                bootbox.confirm("是否将委案状态修改为已退案？", (result) => {
                    if (result) {
                        collection.EntrustedCase.update(this.ecType, [{id: this.ec.loan[0], wwzt: "已退案"}])
                            .done((ret:collection.protocol.Result)=> {
                                if (ret.code == 0) {
                                    this.refresh();
                                    Toast.success("状态修改成功");
                                } else {
                                    Toast.failed(ret.msg);
                                }
                            });
                    }
                });
            });


            $("#bootbox-record-work").on('click', () => {

                $("#template_report_work").children().attr("id", "record-work");

                let dropzs = [];

                let dialog = bootbox.dialog({
                    message: $("#template_report_work").html(),
                    title: "委案工作记录录入",
                    className: "modal-blue",
                    buttons: {
                        "取消": {
                            className: "btn-default",
                            callback: () => {

                            }
                        },
                        success: {
                            label: "上传记录",
                            className: "btn-blue",
                            callback: () => {
                                if ($("#record-work input:eq(0)").val() && $("#record-work textarea:eq(0)").val()) {

                                    if (dropzs[0].getQueuedFiles().length > 0) {
                                        dropzs[0].options.params = {
                                            report: EntrustedCaseReport.reportParams(
                                                this.ec.managerId,
                                                $("#record-work input:eq(0)").val(),
                                                $("#record-work textarea:eq(0)").val())
                                        };

                                        dropzs[0].processQueue();
                                    } else {
                                        EntrustedCaseReport.createReport(
                                            this.ec.managerId,
                                            $("#record-work input:eq(0)").val(),
                                            $("#record-work textarea:eq(0)").val())
                                            .done((r)=> {
                                                if (r.code == 0) {
                                                    Toast.success("报告上传成功");
                                                    this.refresh();
                                                } else {
                                                    Toast.failed(r.msg);
                                                }
                                            });
                                    }
                                } else {
                                    Toast.warning("信息不完整");
                                    return false;
                                }
                            }
                        }
                    }
                });
                $("#template_report_work").children().removeAttr("id");


                let dropz = new Dropzone("#record-work #ld-dropzone", {
                    url: collection.Net.BASE_URL + "/entrusted_case/report/submit.do",
                    maxFiles: 5,
                    parallelUploads: 5,
                    maxFilesize: 1024 * 100,
                    uploadMultiple: true,
                    paramName: "attachements",
                    autoProcessQueue: false
                });

                dropzs.push(dropz);

                dropz.on("successmultiple", (file, result:collection.protocol.Result, e)=> {
                    if (result.code == 0) {
                        Toast.success("发送成功");
                        this.refresh();
                    } else {
                        Toast.failed("发送失败");
                    }
                });

                dropz.on("errormultiple", (file, message, xhr)=> {
                    if (message == dropz.options.dictMaxFilesExceeded) {
                        Toast.failed(message);
                    } else if (message == dropz.options.dictInvalidFileType) {
                        Toast.failed(message);
                    } else {
                        Toast.failed("发送失败");
                    }
                });

                dropz.on("completemultiple", (file)=> {
                    dialog.modal("hide");
                });
            });

            $("#bootbox-record-work-by-phone").on('click', () => {

                $("#template_report_work_by_phone").children().attr("id", "report_work_by_phone_");
                let fNewName = route.UUID() + ".wav";
                let dialog = bootbox.dialog({
                    message: $("#template_report_work_by_phone").html(),
                    title: "电话催收记录录入",
                    className: "modal-blue",
                    closeButton: false,
                    buttons: {
                        "取消": {
                            className: "btn-default mycancel",
                            callback: () => {
                                setTimeout(()=>{
                                    $(".modal-dialog").removeClass("phone-call");
                                    $(".modal-backdrop").removeClass("phone-call-mash");
                                }, 1000);
                            }
                        },
                        success: {
                            label: "上传记录",
                            className: "btn-blue myupload",
                            callback: () => {
                                if ($("#report_work_by_phone_ input:eq(0)").val() && $("#report_work_by_phone_ textarea").val()) {
                                    collection.EntrustedCaseReport.createPhoneOutReport(this.ec.managerId,
                                        $("#report_work_by_phone_ input:eq(0)").val(),
                                        $("#report_work_by_phone_ textarea").val(),
                                        fNewName)
                                        .done((ret:collection.protocol.Result)=> {
                                            if (ret.code != 0) {
                                                Toast.failed("电话关联失败");
                                            } else {
                                                this.refresh();
                                                Toast.success("上传报告成功");
                                            }
                                        });
                                    setTimeout(()=>{
                                        $(".modal-dialog").removeClass("phone-call");
                                        $(".modal-backdrop").removeClass("phone-call-mash");
                                    }, 1000);
                                } else {
                                    Toast.warning("请填写记录信息");
                                    return false;
                                }
                            }
                        }
                    }
                });

                $(".modal-dialog").addClass("phone-call");
                $(".modal-backdrop").addClass("phone-call-mash");


                $("#template_report_work_by_phone").children().removeAttr("id");
                $(".myupload").prop("disabled", true);
                $("#report_work_by_phone_ a:eq(0)").hide();
                $("#report_work_by_phone_ a:eq(0)").click(()=> {
                    collection.phone.hangUp();
                });


                let nums = collection.protocol.getPhoneNums(this.ecType, this.ec.loan);
                $("#report_work_by_phone_ select").empty();
                $(nums).each((i, e)=>{
                    $("#report_work_by_phone_ select").append(
                        "<option value='" + e +  "'>" + e + "</option>"
                    );
                });
                $("#report_work_by_phone_ select").comboSelect();
                $("#report_work_by_phone_ select").parent().find("input")
                    .addClass("form-control");

                //if (this.ecType == collection.protocol.EntrustedCaseType.carLoan) {
                //    let i = collection.protocol.getTitles(this.ecType).indexOf("客户手机");
                //    $("#report_work_by_phone_ input:eq(1)").val(this.ec.loan[i + 1]);
                //}
                //else if (this.ecType == collection.protocol.EntrustedCaseType.creditLoan) {
                //    let i = collection.protocol.getTitles(this.ecType).indexOf("手机号码");
                //    $("#report_work_by_phone_ input:eq(1)").val(this.ec.loan[i + 1]);
                //}
                //else if (collection.protocol.EntrustedCaseType.creditCard) {
                //    let i = collection.protocol.getTitles(this.ecType).indexOf("手机");
                //    $("#report_work_by_phone_ input:eq(1)").val(this.ec.loan[i + 1]);
                //}

                $("#report_work_by_phone_ a:eq(1)").click(()=> {
                    let num = $("#report_work_by_phone_ input:eq(1)").val();
                    let index = num.indexOf(":");
                    if (index >= 0){
                        num = num.substring(index + 1);
                    }
                    if (num) {

                        $(".mycancel, .myupload").prop("disabled", true);
                        $("#report_work_by_phone_ a:eq(1)").hide();
                        $("#report_work_by_phone_ a:eq(0)").show();
                        collection.phone.ringUp(num.replace(/-/g, ""), fNewName, (fName:string)=> {
                            $(".mycancel, .myupload").prop("disabled", false);
                            $("#report_work_by_phone_ a:eq(0)").hide();
                            $("#report_work_by_phone_ a:eq(1)").show();
                            if (!fName) {
                                $(".myupload").prop("disabled", true);
                            }
                        });
                    } else {
                        Toast.warning("请填写电话号码");
                    }
                });
            });

            $("#bootbox-loans-consulting").on('click', () => {
                $("#template_consulting").children().attr("id", "template_consulting_sub");
                bootbox.dialog({
                    message: $("#template_consulting").html(),
                    title: "咨询委案信息",
                    className: "modal-darkorange",
                    buttons: {
                        "取消": {
                            className: "btn-danger",
                            callback: () => {
                            }
                        },
                        success: {
                            label: "咨询",
                            className: "btn-blue",
                            callback: () => {
                                if ($("#template_consulting_sub input:eq(0)").val() || $("#template_consulting_sub textarea:eq(0)").val()) {
                                    Message.sendMessage(this.ec.managerId,
                                        this.ec.ownerId,
                                        $("#template_consulting_sub input:eq(0)").val(),
                                        $("#template_consulting_sub textarea:eq(0)").val())
                                        .done((r:collection.protocol.Result)=> {
                                            if (r.code == 0) {
                                                Toast.success("咨询提交成功");
                                                this.refresh();
                                            } else {
                                                Toast.failed(r.msg);
                                            }
                                        });
                                } else {
                                    Toast.warning("请填完整写信息");
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


            $("#bootbox-modify-repayment").on('click', () => {
                $("#template_modify_repayment").children().attr("id", "modify_repayment");
                $("#modify_repayment #exampleInputyhje").attr("value", this.ec.loan[collection.protocol.getTitles(this.ecType).indexOf("已还金额") + 1]);
                $("#modify_repayment #exampleInputsyje").attr("value", this.ec.loan[collection.protocol.getTitles(this.ecType).indexOf("剩余金额") + 1]);
                bootbox.dialog({
                    message: $("#template_modify_repayment").html(),
                    title: "修改委案回款额",
                    className: "modal-blue",
                    buttons: {
                        "取消": {
                            className: "btn-default",
                            callback: () => {
                            }
                        },
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: () => {
                                if ($("#modify_repayment #exampleInputyhje").val() || $("#modify_repayment #exampleInputsyje").val()) {
                                    collection.EntrustedCase.update(this.ecType, [{
                                            id: this.ec.loan[0],
                                            yhje: $("#modify_repayment #exampleInputyhje").val(),
                                            syje: $("#modify_repayment #exampleInputsyje").val()
                                        }])
                                        .done((r:collection.protocol.Result)=> {
                                            if (r.code == 0) {
                                                this.refresh();
                                                Toast.success("修改成功");
                                            } else {
                                                Toast.failed(r.msg);
                                            }
                                        });
                                } else {
                                    Toast.warning("请填写金额");
                                    return false;
                                }
                            }
                        }
                    }
                });
                $("#template_modify_repayment").children().removeAttr("id");
            });


            $("#bootbox-modify-attachment-property").on('click', () => {


                if ($(".attachement__").length == 0) {
                    Toast.warning("没有可以修改的附件");
                    return;
                }

                $("#template_modify_attachment_property").empty();


                $(".attachement__").each((i, e)=> {
                    let html = ReactDOMServer.renderToStaticMarkup(
                        <div className="row" data-id={$(e).attr("value")}>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="col-sm-4 control-label no-padding-right">{$(e).text()}</label>
                                    <div className="col-sm-4">
                                        <input className="form-control" value={$(e).text()}
                                               data-edit="false"></input>
                                    </div>
                                    <div className="col-sm-4">
                                        <input className="form-control" data-mask="9999-99-99 99:99:99"
                                               value={$(e).attr("data-time")}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                    $("#template_modify_attachment_property").append(html);
                });

                $("#template_modify_attachment_property").children().addClass("modify_attachment_property");
                let dialog = bootbox.dialog({
                    message: $("#template_modify_attachment_property").html(),
                    title: "修改附件属性",
                    className: "modal-darkorange",
                    buttons: {
                        "取消": {
                            className: "btn-default",
                            callback: () => {

                            }
                        },
                        success: {
                            label: "确定",
                            className: "btn-blue",
                            callback: () => {
                                let attachs:collection.protocol.Attachement[] = [];
                                $(".modify_attachment_property").each((i, e)=> {
                                    let attach:collection.protocol.Attachement = {
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
                                    collection.EntrustedCase.updateAttachement(attachs).done((r:collection.protocol.Result)=> {
                                        if (r.code == 0) {
                                            Toast.success("附件修改成功");
                                            this.refresh();
                                            dialog.modal("hide");
                                        } else {
                                            Toast.failed(r.msg);
                                        }
                                    }).fail((r:any)=> {
                                        Toast.failed("附件修改失败");
                                    });
                                } else {
                                    Toast.warning("请修改附件信息");
                                }
                                return false;
                            }
                        }
                    }
                });
                $("#template_modify_attachment_property").children().removeClass("modify_attachment_property");
            });

            $(document).ready(() => {

                bootbox.setDefaults('locale', 'zh_CN');

                $("#registrationForm").bootstrapValidator();

                $('#togglingForm').bootstrapValidator({
                        message: 'This value is not valid',
                        feedbackIcons: {
                            valid: 'glyphicon glyphicon-ok',
                            invalid: 'glyphicon glyphicon-remove',
                            validating: 'glyphicon glyphicon-refresh'
                        },
                        submitHandler: (validator, form, submitButton) => {
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
                    .on('click', () => {
                        var $target = $($(this).attr('data-toggle'));
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
                    submitHandler: (validator, form, submitButton) => {
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

        protected refreshLoan() {
            let titles = collection.protocol.getTitles(this.ecType);
            $(this.ec.loan).each((i, e)=> {
                if (i > 0) {
                    if (!e) {
                        e = "";
                    }
                    if (i < 8) {
                        this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>' + titles[i - 1] + '：</b>' + e +
                            '</div>');
                    } else if (i == 8) {
                        this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>' + titles[i - 1] + '：</b>' + e +
                            '</div>');
                        this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>分配内勤：</b>' + this.ec.owner +
                            '</div>');
                        this.find("#ld-common").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-square-o darkpink"></i><b>责任业务员：</b>' + this.ec.assignee +
                            '</div>');
                    } else {
                        this.find("#ld-special").append('<div class="fa-hover col-md-4 col-sm-6">' +
                            '<i class="fa fa-caret-right darkpink"></i><b>' + titles[i - 1] + '：</b>' + e +
                            '</div>');
                    }
                }
            });

        }

        protected onShown() {
            if (this.page != sidebar.getLastPage()) {
                this.lastPage = sidebar.getLastPage()
            }
            this.find("#ld-timeline li:not(.timeline-node)").remove();
            this.find("#ld-common").empty();
            this.find("#ld-special").empty();
            //this.find("#bootbox-record-work-timeline").hide();
            //this.find("#bootbox-loans-consulting-timeline").hide();
            if (this.ec) {
                this.find("#ld-eccode").text("委案：" + this.ec.loan[1]);
                this.refreshLoan();
                if (this.check(this.ec.reports)) {
                    this.refreshReport();
                }
                Message.getMessages(this.ec.managerId).done((msgs:collection.protocol.Message[])=> {
                    if (this.check(msgs)) {
                        this.ec.messages = msgs;
                        this.refreshMessage();
                        route.router.broadcast(route.MSG.EC_DETAIL_REFRESH);
                    }
                });
                route.router.broadcast(route.MSG.EC_DETAIL_REFRESH);
            }
        }

        private globalIndex():number{
            let base = (this.ecInfo.ecs[0].pageNum) * this.ecInfo.searchOpt.pageSize;
            return base + this.ecInfo.index;
        }

        protected onRefresh():void {
            if (this.ecInfo.searchOpt){
                this.ec = this.ecInfo.ec;

                $("#bootbox-click-to-ppg").parent().show();
                if (this.globalIndex() <= 0){
                    $("#bootbox-click-to-ppg").prop("disabled", true);
                }else{
                    $("#bootbox-click-to-ppg").prop("disabled", false);
                }

                if (this.globalIndex() + 1 >= this.ecInfo.ecs[0].records){
                    $("#bootbox-click-to-npg").prop("disabled", true);
                }else{
                    $("#bootbox-click-to-npg").prop("disabled", false);
                }

                $("#bootbox-click-to-pgnum").text((this.globalIndex() + 1) + "/" + this.ecInfo.ecs[0].records);

                if (this.ecInfo.index >= this.ecInfo.searchOpt.pageSize){
                    this.ecInfo.index = 0;
                    ++this.ecInfo.searchOpt.pageNum;
                    collection.EntrustedCase.search(this.ecType, this.ecInfo.searchOpt).done((ecs:collection.protocol.EC[])=> {
                        this.ecInfo.ecs = ecs;
                        this.ecInfo.ec = ecs[0];
                        this.refresh();
                    });
                }else if (this.ecInfo.index < 0){
                    this.ecInfo.index = this.ecInfo.searchOpt.pageSize - 1;
                    --this.ecInfo.searchOpt.pageNum;
                    collection.EntrustedCase.search(this.ecType, this.ecInfo.searchOpt).done((ecs:collection.protocol.EC[])=> {
                        this.ecInfo.ecs = ecs;
                        this.ecInfo.ec = ecs[0];
                        this.refresh();
                    });
                }else{
                    this.ec = this.ecInfo.ecs[this.ecInfo.index];
                    this.onShown();
                }
            }else{
                collection.EntrustedCase.search(this.ecType, {mgrId: this.ec.managerId}).done((ecs:collection.protocol.EC[])=> {
                    this.ec = ecs[0];
                    this.onShown();
                });
                $("#bootbox-click-to-ppg").parent().hide();
            }

        }

        private check(obj):boolean {
            if (obj instanceof Array) {
                return obj && obj.length > 0
            }
            return !!obj;
        }




        private refreshReport():void {
            //this.find("#bootbox-record-work-timeline").show();
            $(this.ec.reports).each((i, report:collection.protocol.EntrustedCaseReport)=> {
                let html = ReactDOMServer.renderToStaticMarkup(
                    <li className={i % 2 == 0 ? "" : "timeline-inverted"}>
                        <div className="timeline-datetime">
                            <span className="timeline-time"> {report.date.substring(11)} </span>
                            <span className="timeline-date">{report.date.substring(0, 10)}</span>
                        </div>
                        <div className="timeline-badge">
                            <i className="fa fa-tag sky font-120"></i>
                        </div>
                        <div className="timeline-panel bordered-top-3 bordered-azure" id={"report" + report.id}>
                            <div className="timeline-header bordered-bottom bordered-blue">
                                <span className="timeline-title"> {report.title} </span>
                            </div>
                            <div className="timeline-body">
                                <p>{report.content}</p>
                                {this.check(report.attachements) ? (
                                <p>
                                    <b>附件：</b>
                                </p> ):""
                                    }
                                {
                                    this.check(report.attachements) ? report.attachements.map((atta:collection.protocol.Attachement)=>{
                                        return <p>
                                            <a href="#" className="danger attachement__"
                                               value={atta.id}
                                               data-time={atta.uploadTime}>{atta.display}</a>
                                        </p>;
                                        }) : ""
                                    }
                            </div>
                        </div>
                    </li>
                );
                this.find("#bootbox-loans-consulting-timeline").parent().before(html);
            });
            $(".attachement__").on("click", (e, v1, v2, v3)=>{
                let form = $("#downloadForm")[0];
                form.action = collection.Net.BASE_URL + "/entrusted_case/report/download.do?attachement=" + e.target.getAttribute("value");
                form.submit();
            })
        }

        private refreshMessage():void {
            //this.find("#bootbox-loans-consulting-timeline").show();
            let pairs:collection.MsgPair[] = Message.pairs(this.ec.messages);
            $(pairs).each((i, pair:collection.MsgPair)=> {
                let html = ReactDOMServer.renderToStaticMarkup(
                    <li className={i % 2 == 0 ? "" : "timeline-inverted"}>
                        <div className="timeline-datetime">
                            <span className="timeline-time"> {pair.ask.sendTime.substring(11)} </span>
                            <span className="timeline-date">{pair.ask.sendTime.substring(0, 10)}</span>
                        </div>
                        <div className="timeline-badge">
                            <i className="fa fa-question darkorange font-120"></i>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-header bordered-bottom bordered-blue">
                                <span className="timeline-title darkorange"> {pair.ask.title} </span>
                            </div>
                            <div className="timeline-body">
                                <p>{pair.ask.content}</p>
                                {pair.answer ? (<p>
                                    <b>答复：</b>
                                </p>):(<p>
                                    <b>未答复</b>
                                </p>)}
                                {pair.answer ? (<p>{pair.answer.content}</p>):""}
                                {pair.ask && this.check(pair.ask.attachements) || (pair.answer && this.check(pair.answer.attachements)) ? (
                                <p>
                                    <b>附件：</b>
                                </p> ):""}
                                {pair.ask && this.check(pair.ask.attachements) ? pair.ask.attachements.map((atta:collection.protocol.Attachement)=>{
                                    return <p>
                                        <a href="#" className="attachement__" value={atta.id}
                                           data-time={atta.uploadTime}>{atta.display}</a>
                                    </p>;}) : ""}
                                {pair.answer && this.check(pair.answer.attachements) ? pair.answer.attachements.map((atta:collection.protocol.Attachement)=>{
                                    return <p>
                                        <a href="#" className="attachement__" value={atta.id}
                                           data-time={atta.uploadTime}>{atta.display}</a>
                                    </p>;}) : ""}
                            </div>
                        </div>
                    </li>
                );
                this.find("#bootbox-loans-consulting-timeline").parent().parent().append(html);
            });

        }
    }
}