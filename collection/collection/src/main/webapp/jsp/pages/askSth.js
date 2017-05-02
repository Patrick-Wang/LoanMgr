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
    var AskSth = (function (_super) {
        __extends(AskSth, _super);
        function AskSth(page) {
            _super.call(this, page);
        }
        AskSth.prototype.createTableAssist = function (pName) {
            var parent = this.find("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            var tableAssist = null;
            tableAssist = pages.JQGridAssistantFactory.createTable(pName + "Table", ["委案编码", "责任内勤", "回复时间", "咨询标题", "咨询内容", "回复内容", "相关附件"], 0, JQTable.TextAlign.Left);
            return tableAssist;
        };
        AskSth.prototype.onRefresh = function () {
            var _this = this;
            Message.getMessages().done(function (msgs) {
                _this.updateTable(_this.trans(msgs));
            });
        };
        AskSth.prototype.trans = function (msgs) {
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
            for (var i = 0; i < index.length; ++i) {
                for (var j = 0; j < ecMap[index[i]].length; ++j) {
                    ret.push(this.convertQA(ecMap[index[i]][j][0], ecMap[index[i]][j][1]));
                }
            }
            return ret;
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
            row.push(msg.attachements);
            return row;
        };
        AskSth.prototype.updateAttachement = function (data) {
            var rids = this.find("#as-msgsTable").getDataIDs();
            for (var i = 0; i < rids.length; ++i) {
                for (var j = 0; j < data.length; ++j) {
                    if (data[j][0] == rids[i]) {
                        var html = "";
                        for (var k = 0; k < data[j][7].length; ++k) {
                            html += "<div style='color:blue;cursor:pointer' >" + data[j][7][k] + "</div>";
                        }
                        this.find("#as-msgsTable").setCell(rids[i], 6, html);
                        break;
                    }
                }
            }
        };
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
                autoScroll: true,
                multiselect: false,
                pager: '#as-msgsPager',
                onSortCol: function (index, iCol, sortorder) {
                    setTimeout(function () {
                        _this.updateAttachement(data);
                    }, 0);
                },
                onPaging: function (btn) {
                    setTimeout(function () {
                        _this.updateAttachement(data);
                    }, 0);
                }
            }));
            this.updateAttachement(data);
        };
        AskSth.ins = new AskSth(pages.PageType.askSth);
        return AskSth;
    })(pages.PageImpl);
})(pages || (pages = {}));
