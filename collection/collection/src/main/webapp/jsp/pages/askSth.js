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
///<reference path="importLoans.ts"/>
var pages;
(function (pages) {
    var Message = collection.Message;
    var AskSth = (function (_super) {
        __extends(AskSth, _super);
        function AskSth(page) {
            return _super.call(this, page) || this;
        }
        AskSth.prototype.createTableAssist = function (pName) {
            var parent = this.find("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            var titles = ["委案编码", "责任内勤", "回复时间", "咨询标题", "咨询内容", "回复内容"];
            var nodes = [];
            for (var i = 0; i < titles.length; ++i) {
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
        };
        AskSth.prototype.onRefresh = function () {
            var _this = this;
            Message.getMessages().done(function (msgs) {
                _this.updateTable(_this.trans(msgs));
            });
        };
        AskSth.prototype.trans = function (msgs) {
            this.msgs = msgs;
            var ret = [];
            var ecMap = {};
            var index = [];
            for (var i = 0; i < msgs.length; ++i) {
                if (!ecMap[msgs[i].ecMgrId] && (msgs[i].title == undefined || msgs[i].title.indexOf("RE:") < 0)) {
                    ecMap[msgs[i].ecMgrId] = [];
                    index.push(msgs[i].ecMgrId);
                }
                if (ecMap[msgs[i].ecMgrId]) {
                    if (msgs[i].title != undefined && msgs[i].title.indexOf("RE:") == 0) {
                        var msgId = msgs[i].title.substring(3);
                        for (var j = 0; j < index.length; ++j) {
                            for (var k = 0; k < ecMap[index[j]].length; ++k) {
                                if (ecMap[index[j]][k][0].msgId == msgId) {
                                    ecMap[index[j]][k].push(msgs[i]);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        ecMap[msgs[i].ecMgrId].push([msgs[i]]);
                    }
                }
            }
            this.msgPairs = [];
            for (var i = 0; i < index.length; ++i) {
                for (var j = 0; j < ecMap[index[i]].length; ++j) {
                    var pair = {
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
        };
        AskSth.prototype.updateReplay = function (msgPair) {
            var _this = this;
            $(this.data).each(function (i, e) {
                if (e[0] == msgPair.ask.msgId) {
                    var row = _this.convertQA(msgPair.ask, msgPair.answer);
                    _this.data[i] = row;
                    return false;
                }
            });
            this.updateTable(this.data);
        };
        AskSth.prototype.convertQA = function (msg, reMsg) {
            var row = [];
            row.push(msg.msgId);
            row.push(msg.ecCode);
            row.push(msg.toName);
            row.push(reMsg != undefined ? reMsg.sendTime : "--");
            row.push(msg.title);
            row.push(msg.content);
            row.push(reMsg != undefined ? reMsg.content : "--");
            //let atts = [];
            //$(msg.attachements).each((i, e:Attachement)=>{
            //    atts.push(e.display);
            //});
            //
            //row.push(atts);
            row.push("");
            return row;
        };
        AskSth.prototype.clickAnswer = function (msgId) {
            var _this = this;
            $("#as-replyDialog").children(0).attr("id", "as-reply");
            var msgPair = this.findMsgPair(msgId);
            var attachCount = 0;
            var dialog = bootbox.dialog({
                message: $("#as-replyDialog").html(),
                title: "咨询回复",
                className: "modal-darkorange",
                buttons: {
                    success: {
                        label: "回复",
                        className: "btn-blue",
                        callback: function () {
                            var param = {
                                entrusted_case: msgPair.ecId,
                                to: msgPair.ask.fromId,
                                title: "RE:" + msgPair.ask.msgId,
                                message: $("#as-reply").find("#content").val()
                            };
                            attachCount = _this.dropz.getQueuedFiles();
                            if (_this.dropz.getQueuedFiles().length > 0) {
                                _this.dropz.options.params = param;
                                _this.dropz.processQueue();
                            }
                            else {
                                Message.sendMessage(param.entrusted_case, param.to, param.title, param.message).done(function (ret) {
                                    if (ret.code == 0) {
                                        pages.Toast.success("发送成功");
                                        msgPair.answer = JSON.parse(ret.msg);
                                        _this.updateReplay(msgPair);
                                        Message.setMessageRead([msgPair.ask.msgId]).done(function (ret) {
                                            route.router.broadcast(route.MSG.NAV_REFRESH);
                                        });
                                    }
                                    else {
                                        pages.Toast.failed("发送失败");
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
            this.dropz.on("successmultiple", function (file, result, e) {
                if (result.code == 0) {
                    pages.Toast.success("发送成功");
                    msgPair.answer = JSON.parse(result.msg);
                    _this.updateReplay(msgPair);
                    Message.setMessageRead([msgPair.ask.msgId]).done(function (ret) {
                        route.router.broadcast(route.MSG.NAV_REFRESH);
                    });
                }
                else {
                    pages.Toast.failed("发送失败");
                }
            });
            this.dropz.on("errormultiple", function (file, message, xhr) {
                if (message == _this.dropz.options.dictMaxFilesExceeded) {
                    pages.Toast.failed(message);
                }
                else if (message == _this.dropz.options.dictInvalidFileType) {
                    pages.Toast.failed(message);
                }
                else {
                    pages.Toast.failed("发送失败");
                }
            });
            this.dropz.on("completemultiple", function (file) {
                dialog.modal("hide");
            });
        };
        AskSth.prototype.findMsgPair = function (msgId) {
            var msgPair;
            $(this.msgPairs).each(function (i, e) {
                if (e.ask.msgId == msgId) {
                    msgPair = e;
                    return false;
                }
            });
            return msgPair;
        };
        AskSth.prototype.clickGo = function (msgId) {
            var msg = null;
            $(this.msgs).each(function (i, e) {
                if (e.msgId == msgId) {
                    msg = e;
                    return false;
                }
            });
            route.router.to(pages.PageUtil.getPageId(pages.PageType.loansDetail)).send(route.MSG.EC_DETAIL_ECINFO, {
                ec: { managerId: msg.ecMgrId },
                ecType: msg.ecType
            });
            sidebar.switchPage(pages.PageType.loansDetail);
        };
        AskSth.prototype.updateAnswerGo = function (data) {
            var _this = this;
            var rids = this.find("#as-msgsTable").getDataIDs();
            for (var i = 0; i < rids.length; ++i) {
                //let msgPair:MsgPair = this.findMsgPair(rids[i]);
                //if (msgPair.answer != undefined){
                //    continue;
                //}
                for (var j = 0; j < data.length; ++j) {
                    if (data[j][0] == rids[i]) {
                        if (authority.ping("/ec/answer")) {
                            var html = ReactDOMServer.renderToStaticMarkup(React.createElement("div", { id: "" },
                                React.createElement("a", { value: data[j][0], className: "btn btn-default btn-xs purple" },
                                    React.createElement("i", { className: "fa fa-share" }),
                                    "\u56DE\u590D"),
                                React.createElement("a", { value: data[j][0], className: "btn btn-default btn-xs purple" },
                                    React.createElement("i", { className: "fa fa-share" }),
                                    "\u524D\u5F80")));
                            this.find("#as-msgsTable").setCell(rids[i], 6, html);
                            this.find("#as-msgsTable a[value=" + data[j][0] + "]:eq(0)").click(function (e) {
                                _this.clickAnswer($(e.currentTarget).attr("value"));
                            });
                            this.find("#as-msgsTable a[value=" + data[j][0] + "]:eq(1)").click(function (e) {
                                _this.clickGo($(e.currentTarget).attr("value"));
                            });
                        }
                        else {
                            var html = ReactDOMServer.renderToStaticMarkup(React.createElement("div", null,
                                React.createElement("a", { id: data[j][0], className: "btn btn-default btn-xs purple" },
                                    React.createElement("i", { className: "fa fa-share" }),
                                    "\u524D\u5F80")));
                            this.find("#as-msgsTable").setCell(rids[i], 6, html);
                            this.find("#as-msgsTable #" + data[j][0]).click(function (e) {
                                _this.clickGo(e.currentTarget.id);
                            });
                        }
                        break;
                    }
                }
            }
        };
        //onclickAttachement(msgId:number, attach:string) {
        //    for (let i = 0; i < this.msgs.length; ++i) {
        //        if (msgId == this.msgs[i].msgId) {
        //            this.find("#as-downloadForm [name=entrusted_case]").val(this.msgs[i].ecMgrId);
        //            this.find("#as-downloadForm [name=from]").val(this.msgs[i].fromId);
        //            this.find("#as-downloadForm [name=to]").val(this.msgs[i].toId);
        //            this.find("#as-downloadForm [name=attachement]").val(attach);
        //            this.find("#as-downloadForm").submit();
        //            break;
        //        }
        //    }
        //}
        //private updateAttachement(data:string[][]) {
        //    let rids = this.find("#as-msgsTable").getDataIDs();
        //    for (let i = 0; i < rids.length; ++i) {
        //        for (let j = 0; j < data.length; ++j) {
        //            if (data[j][0] == rids[i]) {
        //                let html = "";
        //                for (let k = 0; k < data[j][7].length; ++k) {
        //                    html += "<div style='color:blue;cursor:pointer' onclick='pages.AskSth.ins.onclickAttachement(" +
        //                        data[j][0] + ",\"" +
        //                        data[j][7][k] + "\")'>" + data[j][7][k] + "</div>"
        //                }
        //                this.find("#as-msgsTable").setCell(rids[i], 6, html);
        //                break;
        //            }
        //        }
        //    }
        //}
        AskSth.prototype.updateTable = function (data) {
            var _this = this;
            var tableAssist = this.createTableAssist("as-msgs");
            this.find("#as-msgsTable").jqGrid(tableAssist.decorate({
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
                rowList: [10, 20, 50, 100],
                autoScroll: true,
                multiselect: false,
                pager: '#as-msgsPager',
                onSortCol: function (index, iCol, sortorder) {
                    setTimeout(function () {
                        //this.updateAttachement(data);
                        _this.updateAnswerGo(data);
                    }, 0);
                },
                onPaging: function (btn) {
                    setTimeout(function () {
                        //this.updateAttachement(data);
                        _this.updateAnswerGo(data);
                    }, 0);
                }
            }));
            //this.updateAttachement(data);
            this.updateAnswerGo(data);
        };
        AskSth.ins = new AskSth(pages.PageType.askSth);
        return AskSth;
    }(pages.PageImpl));
    pages.AskSth = AskSth;
})(pages || (pages = {}));
