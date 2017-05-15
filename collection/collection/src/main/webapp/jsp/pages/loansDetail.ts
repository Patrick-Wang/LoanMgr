///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class LoansDetail extends PageImpl{
        static ins = new LoansDetail(PageType.loansDetail);
        lastPage;
        ec:collection.protocol.EC;
        ecType:collection.protocol.EntrustedCaseType;
        constructor(page:pages.PageType) {
            super(page);

            route.router.register(new route.Receiver(PageUtil.getPageId(this.page), (e:route.Event)=>{
                switch (e.id){
                    case route.MSG.EC_DETAIL_ECINFO:
                        this.ec = e.data.ec;
                        this.ecType = e.data.ecType;
                        break;
                }
            }));

            $("#bootbox-clieck-to-working").on('click', function () {
                bootbox.confirm("是否将委案状态修改为工作中？", function (result) {
                    if (result) {
                        collection.EntrustedCase.update(this.ecType, [{id:this.ec.loan[0], wwzt:"工作中"}])
                            .done((ret : collection.protocol.Result)=>{
                            if (ret.code == 0){
                                Toast.success("状态修改成功");
                            }else{
                                Toast.failed(ret.msg);
                            }
                        });
                    }
                });
            });

            $("#bootbox-clieck-to-done").on('click', function () {
                bootbox.confirm("是否将委案状态修改为已退案？", function (result) {
                    if (result) {
                        collection.EntrustedCase.update(this.ecType, [{id:this.ec.loan[0], wwzt:"已退案"}])
                            .done((ret : collection.protocol.Result)=>{
                                if (ret.code == 0){
                                    Toast.success("状态修改成功");
                                }else{
                                    Toast.failed(ret.msg);
                                }
                            });
                    }
                });
            });




            $("#bootbox-record-by-phone").on('click', function () {
               let dialog = bootbox.dialog({
                    message: $("#myModal").html(),
                    title: "电话访谈",
                    className: "modal-darkorange",
                    buttons: {
                        success: {
                            label: "拨打电话",
                            className: "btn-blue",
                            callback: function () {
                                let num = "123123";
                                collection.phone.ringUp(num, route.UUID() + ".MP3", (fName:string)=>{
                                    if (fName){
                                        collection.EntrustedCaseReport.createPhoneOutReport(this.ec.managerId, num, fName)
                                            .done((ret:collection.protocol.Result)=>{
                                            if (ret.code != 0){
                                                Toast.failed("电话关联失败");
                                            }else{
                                                collection.EntrustedCase.search(this.ecType, {mgrId:this.ec.managerId}).done((ec:collection.protocol.EC[])=>{
                                                   this.ec = ec[0];
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

            $("#bootbox-record-work").on('click', function () {
                bootbox.dialog({
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
                            }
                        }
                    }
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

            $("#bootbox-record-work-timeline").on('click', function () {
                bootbox.dialog({
                    message: $("#template_report_work").html(),
                    title: "工作记录录入",
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
                            }
                        }
                    }
                });
            });

            $("#bootbox-modify-attachment-property").on('click', function () {
                bootbox.dialog({
                    message: $("#template_modify_attachment_property").html(),
                    title: "修改委案回款额",
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

        protected onShown(){
            if (this.page != sidebar.getLastPage()){
                this.lastPage = sidebar.getLastPage()
            }
        }

        protected onRefresh():void {

        }
    }
}