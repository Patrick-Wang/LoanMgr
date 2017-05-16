///<reference path="pages.ts"/>
///<reference path="importLoans.ts"/>
module pages {

    import Message = collection.Message;
    import MsgPair = collection.MsgPair;
    import Attachement = collection.protocol.Attachement;



    export class AskSth extends PageImpl {
        static ins = new AskSth(PageType.askSth);
        msgs:collection.protocol.Message[];
        msgPairs:MsgPair[];
        dropz:any;
        data:any[][];
        createTableAssist(pName:string):JQTable.JQGridAssistant {
            var parent = this.find("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            let titles = ["委案编码", "责任内勤", "回复时间", "咨询标题", "咨询内容", "回复内容", "相关附件"];
            let nodes = [];
            for (let i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: 0,
                    isSortable: true,
                    align: JQTable.TextAlign.Left,
                }));
            }

            nodes.push(JQTable.Node.create({
                name: "",
                width: 0,
                isSortable: false,
                align: JQTable.TextAlign.Center,
            }));

            return new JQTable.JQGridAssistant(nodes, pName + "Table");
        }

        constructor(page:PageType) {
            super(page);
        }

        protected onRefresh():void {
            Message.getMessages().done((msgs:collection.protocol.Message[])=> {
                this.updateTable(this.trans(msgs));
            });
        }

        private trans(msgs:collection.protocol.Message[]):any {
            this.msgs = msgs;
            let ret:any = [];
            let ecMap:any = {};
            let index:any[] = [];
            for (let i = 0; i < msgs.length; ++i) {
                if (!ecMap[msgs[i].ecMgrId] && (msgs[i].title == undefined || msgs[i].title.indexOf("RE:") < 0)) {
                    ecMap[msgs[i].ecMgrId] = [];
                    index.push(msgs[i].ecMgrId);
                }

                if (ecMap[msgs[i].ecMgrId]) {
                    if (msgs[i].title != undefined && msgs[i].title.indexOf("RE:") == 0) {
                        let msgId = msgs[i].title.substring(3);
                        for (let j = 0; j < index.length; ++j) {
                            for (let k = 0; k < ecMap[index[j]].length; ++k) {
                                if (ecMap[index[j]][k][0].msgId == msgId) {
                                    ecMap[index[j]][k].push(msgs[i]);
                                    break;
                                }
                            }
                        }
                    } else {
                        ecMap[msgs[i].ecMgrId].push([msgs[i]]);
                    }
                }
            }
            this.msgPairs = [];
            for (let i = 0; i < index.length; ++i) {
                for (let j = 0; j < ecMap[index[i]].length; ++j) {
                    let pair:MsgPair = {
                        ecId: index[i],
                        ask: ecMap[index[i]][j][0],
                        answer: ecMap[index[i]][j][1]
                    };
                    this.msgPairs.push(pair);
                    ret.push(this.convertQA(pair.ask, pair.answer));
                }
            }
            this.data = ret;
            return ret;
        }

        updateReplay(msgPair:MsgPair):void{
            $(this.data).each((i, e)=>{
                if (e[0] == msgPair.ask.msgId){
                    let row = this.convertQA(msgPair.ask, msgPair.answer);
                    this.data[i] = row;
                    return false;
                }
            })
            this.updateTable(this.data);
        }

        private convertQA(msg:collection.protocol.Message, reMsg:collection.protocol.Message):string[] {
            let row = [];
            row.push(msg.msgId);
            row.push(msg.ecCode);
            row.push(msg.toName);
            row.push(reMsg != undefined ? reMsg.sendTime : "--");
            row.push(msg.title);
            row.push(msg.content);
            row.push(reMsg != undefined ? reMsg.content : "--");
            let atts = [];
            $(msg.attachements).each((i, e:Attachement)=>{
                atts.push(e.display);
            });

            row.push(atts);
            row.push("");
            return row;
        }

        private clickAnswer(msgId:any) {
            $("#as-replyDialog").children(0).attr("id", "as-reply");
            let msgPair:MsgPair = this.findMsgPair(msgId);
            let attachCount =0;
            let dialog = bootbox.dialog({
                message: $("#as-replyDialog").html(),
                title: "咨询回复",
                className: "modal-darkorange",
                buttons: {
                    success: {
                        label: "回复",
                        className: "btn-blue",
                        callback: () => {
                            let param:any = {
                                entrusted_case: msgPair.ecId,
                                to: msgPair.ask.fromId,
                                title: "RE:" + msgPair.ask.msgId,
                                message: $("#as-reply").find("#content").val()
                            };
                            attachCount = this.dropz.getQueuedFiles();
                            if (this.dropz.getQueuedFiles().length > 0) {
                                this.dropz.options.params = param;
                                this.dropz.processQueue();
                            } else {
                                Message.sendMessage(param.entrusted_case, param.to, param.title, param.message).done((ret:collection.protocol.Result)=> {
                                    if (ret.code == 0) {
                                        Toast.success("发送成功");
                                        msgPair.answer = JSON.parse(ret.msg);
                                        this.updateReplay(msgPair);
                                        Message.setMessageRead([msgPair.ask.msgId]).done((ret:collection.protocol.Result)=>{
                                            route.router.broadcast(route.MSG.NAV_REFRESH);
                                        });
                                    } else {
                                        Toast.failed("发送失败");
                                    }
                                    dialog.modal("hide");
                                });
                            }
                            return false;
                        }
                    },
                    "取消": {
                        className: "btn-default",
                        callback: function () {
                        }
                    }
                }
            });
            $("#as-replyDialog").children(0).removeAttr("id");

            this.dropz = new Dropzone("#as-reply #as-dropzone", {
                url: collection.Net.BASE_URL + "/message/send.do",
                maxFiles: 5,
                parallelUploads: 5,
                maxFilesize: 1024 * 100,
                uploadMultiple: true,
                paramName: "attachements",
                autoProcessQueue: false
            });

            this.dropz.on("successmultiple", (file, result:collection.protocol.Result, e)=> {
                if (result.code == 0) {
                    Toast.success("发送成功");
                    msgPair.answer = JSON.parse(result.msg);
                    this.updateReplay(msgPair);
                    Message.setMessageRead([msgPair.ask.msgId]).done((ret:collection.protocol.Result)=>{
                        route.router.broadcast(route.MSG.NAV_REFRESH);
                    });
                } else {
                    Toast.failed("发送失败");
                }
            });

            this.dropz.on("errormultiple", (file, message, xhr)=> {
                if (message == this.dropz.options.dictMaxFilesExceeded) {
                    Toast.failed(message);
                } else if (message == this.dropz.options.dictInvalidFileType) {
                    Toast.failed(message);
                } else {
                    Toast.failed("发送失败");
                }
            });

            this.dropz.on("completemultiple", (file)=> {
                dialog.modal("hide");
            });
        }

        findMsgPair(msgId:number):MsgPair{
            let msgPair:MsgPair;
            $(this.msgPairs).each((i, e:MsgPair)=> {
                if (e.ask.msgId == msgId) {
                    msgPair = e;
                    return false;
                }
            });
            return msgPair;
        }

        private clickGo(msgId:any) {
            alert(msgId);
        }

        private updateAnswerGo(data:string[][]) {
            let rids = this.find("#as-msgsTable").getDataIDs();
            for (let i = 0; i < rids.length; ++i) {

                let msgPair:MsgPair = this.findMsgPair(rids[i]);
                if (msgPair.answer != undefined){
                    continue;
                }

                for (var j = 0; j < data.length; ++j) {
                    if (data[j][0] == rids[i]) {
                        if (authority.ping("/ec/answer")) {
                            let html = ReactDOMServer.renderToStaticMarkup(<div>
                                    <a id={data[j][0]} className="btn btn-default btn-xs purple"><i
                                        className="fa fa-share"></i>回复
                                    </a>
                                </div>
                            );
                            this.find("#as-msgsTable").setCell(rids[i], 7, html);
                            this.find("#as-msgsTable #" + data[j][0] + " a").click(()=> {
                                this.clickAnswer(data[j][0]);
                            });
                        } else {
                            let html = ReactDOMServer.renderToStaticMarkup(<div>
                                    <a id={data[j][0]} className="btn btn-default btn-xs purple"><i
                                        className="fa fa-share"></i>前往
                                    </a>
                                </div>
                            );
                            this.find("#as-msgsTable").setCell(rids[i], 7, html);
                            this.find("#as-msgsTable #" + data[j][0] + " a").click(()=> {
                                this.clickGo(data[j][0]);
                            });
                        }

                        break;
                    }
                }
            }
        }

        onclickAttachement(msgId:number, attach:string) {
            for (let i = 0; i < this.msgs.length; ++i) {
                if (msgId == this.msgs[i].msgId) {
                    this.find("#as-downloadForm [name=entrusted_case]").val(this.msgs[i].ecMgrId);
                    this.find("#as-downloadForm [name=from]").val(this.msgs[i].fromId);
                    this.find("#as-downloadForm [name=to]").val(this.msgs[i].toId);
                    this.find("#as-downloadForm [name=attachement]").val(attach);
                    this.find("#as-downloadForm").submit();
                    break;
                }
            }
        }

        private updateAttachement(data:string[][]) {
            let rids = this.find("#as-msgsTable").getDataIDs();
            for (let i = 0; i < rids.length; ++i) {
                for (let j = 0; j < data.length; ++j) {
                    if (data[j][0] == rids[i]) {
                        let html = "";
                        for (let k = 0; k < data[j][7].length; ++k) {
                            html += "<div style='color:blue;cursor:pointer' onclick='pages.AskSth.ins.onclickAttachement(" +
                                data[j][0] + ",\"" +
                                data[j][7][k] + "\")'>" + data[j][7][k] + "</div>"
                        }
                        this.find("#as-msgsTable").setCell(rids[i], 6, html);
                        break;
                    }
                }
            }
        }

        private updateTable(data:string[][]):void {
            let tableAssist:JQTable.JQGridAssistant = this.createTableAssist("as-msgs");
            this.find("#as-msgsTable").jqGrid(
                tableAssist.decorate({
                    data: tableAssist.getDataWithId(data),
                    datatype: "local",
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: true,
                    rowNum: 10,
                    autoScroll: true,
                    multiselect: false,
                    pager: '#as-msgsPager',
                    onSortCol: (index, iCol, sortorder)=> {
                        setTimeout(()=> {
                            this.updateAttachement(data);
                            this.updateAnswerGo(data);
                        }, 0);
                    },
                    onPaging: (btn)=> {
                        setTimeout(()=> {
                            this.updateAttachement(data);
                            this.updateAnswerGo(data);
                        }, 0);
                    }
                }));

            this.updateAttachement(data);
            this.updateAnswerGo(data);
        }

    }

}