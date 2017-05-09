var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var CallStatus = collection.protocol.CallStatus;
    var Phone = collection.Phone;
    var CallCenter = (function (_super) {
        __extends(CallCenter, _super);
        function CallCenter(page) {
            if (collection.phone.isAvailable()) {
                _super.call(this, page);
            }
            else {
                $("#callCenter").hide();
            }
        }
        CallCenter.prototype.onRefresh = function () {
            var _this = this;
            collection.Phone.getRecords(false).done(function (records) {
                _this.records = records;
                var active = _this.find(".tab-content .active");
                active.removeClass("active");
                _this.find("#cc-callOut").parent().addClass("active");
                _this.updateCallOut("cc-callOut");
                _this.find("#cc-callOut").parent().removeClass("active");
                _this.find("#cc-callMissed").parent().addClass("active");
                _this.updateMissed("cc-callMissed");
                _this.find("#cc-callMissed").parent().removeClass("active");
                _this.find("#cc-callIn").parent().addClass("active");
                _this.updateCallIn("cc-callIn");
                _this.find("#cc-callIn").parent().removeClass("active");
                _this.find("#cc-callInNoec").parent().addClass("active");
                _this.updateCallInNoEC("cc-callInNoec");
                _this.find("#cc-callInNoec").parent().removeClass("active");
                active.addClass("active");
            });
        };
        CallCenter.prototype.createTableAssist = function (pName, titles) {
            var parent = this.find("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            var nodes = [];
            for (var i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: 0,
                    isSortable: false,
                    align: JQTable.TextAlign.Left,
                }));
            }
            return new JQTable.JQGridAssistant(nodes, pName + "Table");
        };
        CallCenter.prototype.updateCallOut = function (tbName) {
            var _this = this;
            var tbAssist = this.createTableAssist(tbName, ["电话号码", "委案编码", "呼出时间"]);
            var data = [];
            var ecCodeMap = {};
            $(this.records).each(function (i, e) {
                var row = [];
                if (e.status == CallStatus.callout) {
                    row.push(e.recId);
                    row.push(e.phoneNum);
                    row.push(e.ecCode);
                    row.push(e.time);
                    data.push(row);
                    ecCodeMap[e.recId] = e.ecCode;
                }
            });
            var enableECCodeClick = function () {
                setTimeout(function () {
                    var rids = _this.find("#" + tbName + "Table").getDataIDs();
                    for (var i = 0; i < rids.length; ++i) {
                        if (ecCodeMap[rids[i]]) {
                            var html = "<div style='color:blue;cursor:pointer' onclick='pages.CallCenter.ins.onclickECCode(" +
                                rids[i] + ")'>" + ecCodeMap[rids[i]] + "</div>";
                            _this.find("#" + tbName + "Table").setCell(rids[i], 1, html);
                        }
                    }
                }, 0);
            };
            this.find("#" + tbName + "Table").jqGrid(tbAssist.decorate({
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
                autoScroll: true,
                pager: '#' + tbName + 'Pager',
                onSortCol: function (index, iCol, sortorder) {
                    enableECCodeClick();
                },
                onPaging: function (btn) {
                    enableECCodeClick();
                }
            }));
            enableECCodeClick();
        };
        CallCenter.prototype.updateMissed = function (tbName) {
            var _this = this;
            var tbAssist = this.createTableAssist(tbName, ["电话号码", "呼叫时间", "是否忽略"]);
            var data = [];
            $(this.records).each(function (i, e) {
                var row = [];
                if (e.status == CallStatus.missed) {
                    row.push(e.recId);
                    row.push(e.phoneNum);
                    row.push(e.time);
                    row.push("");
                    data.push(row);
                }
            });
            var enableSkipClick = function () {
                setTimeout(function () {
                    var rids = _this.find("#" + tbName + "Table").getDataIDs();
                    for (var i = 0; i < rids.length; ++i) {
                        var html = "<div style='color:blue;cursor:pointer' onclick='pages.CallCenter.ins.onclickSkip(" +
                            rids[i] + ")'>" + "忽略" + "</div>";
                        _this.find("#" + tbName + "Table").setCell(rids[i], 2, html);
                    }
                }, 0);
            };
            this.find("#" + tbName + "Table").jqGrid(tbAssist.decorate({
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
                autoScroll: true,
                pager: '#' + tbName + 'Pager',
                onSortCol: function (index, iCol, sortorder) {
                    enableSkipClick();
                },
                onPaging: function (btn) {
                    enableSkipClick();
                }
            }));
            enableSkipClick();
        };
        CallCenter.prototype.onclickRelate = function (recId) {
            alert(recId);
        };
        CallCenter.prototype.onclickECCode = function (recId) {
            alert(recId);
            ;
        };
        CallCenter.prototype.onclickSkip = function (recId) {
            var _this = this;
            Phone.updateStatus(recId, CallStatus.missedSkip).done(function (ret) {
                if (ret.code == 0) {
                    $(_this.records).each(function (i, e) {
                        if (e.recId == recId) {
                            e.status = CallStatus.missedSkip;
                            return false;
                        }
                    });
                    _this.updateMissed("cc-callMissed");
                    route.router.broadcast(route.MSG.NAV_REFRESH);
                }
            });
        };
        CallCenter.prototype.updateCallIn = function (tbName) {
            var _this = this;
            var tbAssist = this.createTableAssist(tbName, ["电话号码", "委案编码", "呼叫时间"]);
            var data = [];
            var ecCodeMap = {};
            $(this.records).each(function (i, e) {
                var row = [];
                if (e.status == CallStatus.callin) {
                    row.push(e.recId);
                    row.push(e.phoneNum);
                    row.push(e.ecCode);
                    row.push(e.time);
                    data.push(row);
                    ecCodeMap[e.recId] = e.ecCode;
                }
            });
            var enableECCodeClick = function () {
                setTimeout(function () {
                    var rids = _this.find("#" + tbName + "Table").getDataIDs();
                    for (var i = 0; i < rids.length; ++i) {
                        if (ecCodeMap[rids[i]]) {
                            var html = "<div style='color:blue;cursor:pointer' onclick='pages.CallCenter.ins.onclickECCode(" +
                                rids[i] + ")'>" + ecCodeMap[rids[i]] + "</div>";
                            _this.find("#" + tbName + "Table").setCell(rids[i], 1, html);
                        }
                    }
                }, 0);
            };
            this.find("#" + tbName + "Table").jqGrid(tbAssist.decorate({
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
                autoScroll: true,
                pager: '#' + tbName + 'Pager',
                onSortCol: function (index, iCol, sortorder) {
                    enableECCodeClick();
                },
                onPaging: function (btn) {
                    enableECCodeClick();
                }
            }));
            enableECCodeClick();
        };
        CallCenter.prototype.updateCallInNoEC = function (tbName) {
            var _this = this;
            var tbAssist = this.createTableAssist(tbName, ["电话号码", "呼叫时间", "关联委案"]);
            var data = [];
            var ecCodeMap = {};
            $(this.records).each(function (i, e) {
                var row = [];
                if (e.status == CallStatus.callin && !e.ecId) {
                    row.push(e.recId);
                    row.push(e.phoneNum);
                    row.push(e.time);
                    row.push("");
                    data.push(row);
                }
            });
            var enableECRelateClick = function () {
                setTimeout(function () {
                    var rids = _this.find("#" + tbName + "Table").getDataIDs();
                    for (var i = 0; i < rids.length; ++i) {
                        var html = "<div style='color:blue;cursor:pointer' onclick='pages.CallCenter.ins.onclickRelate(" +
                            rids[i] + ")'>" + "关联" + "</div>";
                        _this.find("#" + tbName + "Table").setCell(rids[i], 2, html);
                    }
                }, 0);
            };
            this.find("#" + tbName + "Table").jqGrid(tbAssist.decorate({
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
                autoScroll: true,
                pager: '#' + tbName + 'Pager',
                onCellSelect: function (rowid, iCol, cellcontent, e) {
                    if (iCol == 1) {
                        alert(rowid + " " + iCol);
                    }
                },
                onSortCol: function (index, iCol, sortorder) {
                    enableECRelateClick();
                },
                onPaging: function (btn) {
                    enableECRelateClick();
                }
            }));
            enableECRelateClick();
        };
        CallCenter.ins = new CallCenter(pages.PageType.callCenter);
        return CallCenter;
    })(pages.PageImpl);
    pages.CallCenter = CallCenter;
})(pages || (pages = {}));
