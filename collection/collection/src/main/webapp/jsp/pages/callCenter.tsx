///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    import CallStatus = collection.protocol.CallStatus;
    import Phone = collection.Phone;
    import PhoneRecord = collection.protocol.PhoneRecord;
    export class CallCenter extends PageImpl{
        static ins = new CallCenter(PageType.callCenter);
        records:collection.protocol.PhoneRecord[];
        constructor(page:pages.PageType) {
            if (collection.phone.isAvailable()){
                super(page);

                collection.phone.start((num:string)=>{
                    return this.onCallIn(num);
                });
            }else{
                $("#callCenter").hide();
            }
        }

        private onHangUp(fileName:String):void {
            if (fileName){
                alert(fileName);
            }
        }

        onCallIn(num:string){
            let html =  ReactDOMServer.renderToStaticMarkup(
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group"  id="cc-callInNum">
                               来电话了 : {num}
                            </div>
                        </div>
                    </div>);
            let dialog = bootbox.dialog({
                message: html,
                title: "来电话了",
                className: "modal-darkorange",
                closeButton:false,
                buttons: {
                    success: {
                        label: "接听",
                        className: "btn-blue",
                        callback: ()=>{
                            $("#cc-callInNum").text("正在通话 : " + num);
                            return false;
                        }
                    },
                    "挂断": {
                        className: "btn-danger",
                        callback: ()=>{
                            collection.phone.hangUp();
                        }
                    }
                }
            });
            return (fileName:string) =>{
                dialog.modal("hide");
                this.onHangUp(fileName);
            };
        }

        protected onRefresh():void {
            collection.Phone.getRecords(false).done((records:collection.protocol.PhoneRecord[])=>{
                this.records = records;
                let active = this.find(".tab-content .active");
                active.removeClass("active");

                this.find("#cc-callOut").parent().addClass("active");
                this.updateCallOut("cc-callOut");
                this.find("#cc-callOut").parent().removeClass("active");
                this.find("#cc-callMissed").parent().addClass("active");
                this.updateMissed("cc-callMissed");
                this.find("#cc-callMissed").parent().removeClass("active");
                this.find("#cc-callIn").parent().addClass("active");
                this.updateCallIn("cc-callIn");
                this.find("#cc-callIn").parent().removeClass("active");
                this.find("#cc-callInNoec").parent().addClass("active");
                this.updateCallInNoEC("cc-callInNoec");
                this.find("#cc-callInNoec").parent().removeClass("active");

                active.addClass("active");
            })
        }

        createTableAssist(pName:string, titles:string[]):JQTable.JQGridAssistant {
            var parent = this.find("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            let nodes = [];
            for (let i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: 0,
                    isSortable: false,
                    align: JQTable.TextAlign.Left,
                }));
            }
            return new JQTable.JQGridAssistant(nodes, pName + "Table");
        }

        private updateCallOut(tbName:string):void {
            let tbAssist:JQTable.JQGridAssistant = this.createTableAssist(tbName, ["电话号码", "委案编码", "呼出时间"]);
            let data = [];
            let ecCodeMap={};
            $(this.records).each((i, e:collection.protocol.PhoneRecord)=>{
                let row = [];
                if (e.status == CallStatus.callout){
                    row.push(e.recId);
                    row.push(e.phoneNum);
                    row.push(e.ecCode);
                    row.push(e.time);
                    data.push(row);
                    ecCodeMap[e.recId] = e.ecCode;
                }
            });

            let enableECCodeClick = ()=>{
                setTimeout(()=>{
                    let rids = this.find("#" + tbName + "Table").getDataIDs();
                    for (let i =0; i < rids.length; ++i){
                        if (ecCodeMap[rids[i]]){
                            let html = "<div style='color:blue;cursor:pointer' onclick='pages.CallCenter.ins.onclickECCode(" +
                                rids[i] + ")'>" + ecCodeMap[rids[i]] + "</div>";
                            this.find("#" + tbName + "Table").setCell(rids[i], 1, html);
                        }
                    }
                }, 0);
            };

            this.find("#" + tbName + "Table").jqGrid(
                tbAssist.decorate({
                    data: tbAssist.getDataWithId(data),
                    datatype: "local",
                    drag: false,
                    resize: false,
                    viewrecords: true,
                    autowidth: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: true,
                    rowNum: 10,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    pager: '#' + tbName + 'Pager',
                    onSortCol:(index,iCol,sortorder)=>{
                        enableECCodeClick();
                    },
                    onPaging:(btn)=>{
                        enableECCodeClick();
                    }
                }));
            enableECCodeClick();
        }

        private updateMissed(tbName:string):void {
            let tbAssist:JQTable.JQGridAssistant = this.createTableAssist(tbName, ["电话号码" , "呼叫时间", "是否忽略"]);
            let data = [];
            $(this.records).each((i, e:collection.protocol.PhoneRecord)=>{
                let row = [];
                if (e.status == CallStatus.missed){
                    row.push(e.recId);
                    row.push(e.phoneNum);
                    row.push(e.time);
                    row.push("");
                    data.push(row);
                }
            });

            let enableSkipClick = ()=>{
                setTimeout(()=>{
                    let rids = this.find("#" + tbName + "Table").getDataIDs();
                    for (let i =0; i < rids.length; ++i){
                        let html = "<div style='color:blue;cursor:pointer' onclick='pages.CallCenter.ins.onclickSkip(" +
                            rids[i] + ")'>" + "忽略" + "</div>"
                        this.find("#" + tbName + "Table").setCell(rids[i], 2, html);
                    }
                }, 0);
            };

            this.find("#" + tbName + "Table").jqGrid(
                tbAssist.decorate({
                    data: tbAssist.getDataWithId(data),
                    datatype: "local",
                    drag: false,
                    resize: false,
                    viewrecords: true,
                    autowidth: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: true,
                    rowNum: 10,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    pager: '#' + tbName + 'Pager',
                    onSortCol:(index,iCol,sortorder)=>{
                        enableSkipClick();
                    },
                    onPaging:(btn)=>{
                        enableSkipClick();
                    }
                }));
            enableSkipClick();
        }

        onclickRelate(recId:number){
            let record:PhoneRecord;
            $( this.records).each((i, e:PhoneRecord)=>{
                if (e.recId == recId){
                    record = e;
                    return false;
                }
            });

            bootbox.prompt("请输入委案编码",  (result) => {
                if (result === null) {

                } else {
                    if (result){
                    collection.EntrustedCaseReport.createPhoneInReport(parseInt(result), record.phoneNum, record.recId)
                        .done((ret:collection.protocol.Result)=>{
                            if (ret.code == 0){
                                record.ecId = parseInt(result);
                                this.updateCallInNoEC("cc-callInNoec");
                            }else{
                                Toast.failed(ret.msg);
                            }
                        });
                    }else{
                        Toast.warning("请输入委案编码");
                        return false;
                    }
                }
            });





            //route.router.register(new route.Receiver(PageUtil.getPageId(this.page), (e:route.Event)=> {
            //    switch (e.id) {
            //        case route.MSG.EC_SELECT_RESPONSE:
            //            sidebar.enable();
            //            sidebar.switchPage(this.page);
            //            if (e.data){
            //                collection.EntrustedCaseReport.createPhoneInReport(e.data, record.phoneNum, record.recId)
            //                    .done((ret:collection.protocol.Result)=>{
            //                        if (ret.code == 0){
            //                            record.ecId = e.data;
            //                            this.updateCallInNoEC("cc-callInNoec");
            //                        }
            //                    });
            //            }
            //            break;
            //    }
            //}));
            //route.router
            //    .from(PageUtil.getPageId(this.page))
            //    .to(PageUtil.getPageId(PageType.loansMgr))
            //    .send(route.MSG.EC_SELECT_REQUEST);
            //sidebar.switchPage(PageType.loansMgr);
            //sidebar.disable();
        }

        onclickECCode(recId:number){
            let record:PhoneRecord;
            $( this.records).each((i, e:PhoneRecord)=>{
                if (e.recId == recId){
                    record = e;
                    return false;
                }
            });

            route.router.to(PageUtil.getPageId(PageType.loansDetail)).send(route.MSG.EC_DETAIL_ECINFO, {
                ec : {managerId: record.ecId},
                ecType:record.ecType
            });
            sidebar.switchPage(PageType.loansDetail);
        }

        onclickSkip(recId:number){
            Phone.updateStatus(recId, CallStatus.missedSkip).done((ret:collection.protocol.Result)=>{
                if (ret.code == 0){
                    $( this.records).each((i, e:PhoneRecord)=>{
                        if (e.recId == recId){
                            e.status = CallStatus.missedSkip;
                            return false;
                        }
                    });
                    this.updateMissed("cc-callMissed");
                    route.router.broadcast(route.MSG.NAV_REFRESH);
                }
            });
        }

        private updateCallIn(tbName:string):void {
            let tbAssist:JQTable.JQGridAssistant = this.createTableAssist(tbName, ["电话号码" , "委案编码", "呼叫时间"]);
            let data = [];
            let ecCodeMap={};
            $(this.records).each((i, e:collection.protocol.PhoneRecord)=>{
                let row = [];
                if (e.status == CallStatus.callin){
                    row.push(e.recId);
                    row.push(e.phoneNum);
                    row.push(e.ecCode);
                    row.push(e.time);
                    data.push(row);
                    ecCodeMap[e.recId] = e.ecCode;
                }
            });

            let enableECCodeClick = ()=>{
                setTimeout(()=>{
                    let rids = this.find("#" + tbName + "Table").getDataIDs();
                    for (let i =0; i < rids.length; ++i){
                        if (ecCodeMap[rids[i]]){
                            let html = "<div style='color:blue;cursor:pointer' onclick='pages.CallCenter.ins.onclickECCode(" +
                                rids[i] + ")'>" + ecCodeMap[rids[i]] + "</div>";
                            this.find("#" + tbName + "Table").setCell(rids[i], 1, html);
                        }
                    }
                }, 0);
            };

            this.find("#" + tbName + "Table").jqGrid(
                tbAssist.decorate({
                    data: tbAssist.getDataWithId(data),
                    datatype: "local",
                    drag: false,
                    resize: false,
                    viewrecords: true,
                    autowidth: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: true,
                    rowNum: 10,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    pager: '#' + tbName + 'Pager',
                    onSortCol:(index,iCol,sortorder)=>{
                        enableECCodeClick();
                    },
                    onPaging:(btn)=>{
                        enableECCodeClick();
                    }
                }));
            enableECCodeClick();
        }

        private updateCallInNoEC(tbName:string):void {
            let tbAssist:JQTable.JQGridAssistant = this.createTableAssist(tbName, ["电话号码" , "呼叫时间", "关联委案"]);
            let data = [];
            $(this.records).each((i, e:collection.protocol.PhoneRecord)=>{
                let row = [];
                if (e.status == CallStatus.callin && !e.ecId){
                    row.push(e.recId);
                    row.push(e.phoneNum);
                    row.push(e.time);
                    row.push("");
                    data.push(row);
                }
            });

            let enableECRelateClick = ()=>{
                setTimeout(()=>{
                    let rids = this.find("#" + tbName + "Table").getDataIDs();
                    for (let i =0; i < rids.length; ++i){
                        let html = "<div style='color:blue;cursor:pointer' onclick='pages.CallCenter.ins.onclickRelate(" +
                            rids[i] + ")'>" + "关联" + "</div>"
                        this.find("#" + tbName + "Table").setCell(rids[i], 2, html);
                    }
                }, 0);
            };

            this.find("#" + tbName + "Table").jqGrid(
                tbAssist.decorate({
                    data: tbAssist.getDataWithId(data),
                    datatype: "local",
                    drag: false,
                    resize: false,
                    viewrecords: true,
                    autowidth: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: true,
                    rowNum: 10,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    pager: '#' + tbName + 'Pager',
                    onCellSelect:(rowid,iCol,cellcontent,e)=>{
                        if (iCol == 1){
                            alert(rowid + " " +  iCol);
                        }
                    },
                    onSortCol:(index,iCol,sortorder)=>{
                        enableECRelateClick();
                    },
                    onPaging:(btn)=>{
                        enableECRelateClick();
                    }
                }));
            enableECRelateClick();
        }


    }
}