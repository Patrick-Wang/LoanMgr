///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{

    import Message = collection.Message;

    class AskSth extends PageImpl {
        static ins = new AskSth(PageType.askSth);

        createTableAssist(pName:string):JQTable.JQGridAssistant {
            var parent = this.find("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            let tableAssist:JQTable.JQGridAssistant = null;
            tableAssist = JQGridAssistantFactory.createTable(pName + "Table", ["委案编码", "责任内勤", "回复时间", "咨询标题", "咨询内容", "回复内容", "相关附件"], 0, JQTable.TextAlign.Left);
            return tableAssist;
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
                            for (let k = 0; k < ecMap[index[j]].length; ++k){
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

            for (let i = 0; i < index.length; ++i) {
                for (let j = 0; j < ecMap[index[i]].length; ++j) {
                    ret.push(this.convertQA(ecMap[index[i]][j][0], ecMap[index[i]][j][1]));
                }
            }
            return ret;
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
            row.push(msg.attachements);
            return row;
        }

        private updateAttachement(data:string[][]){
            let rids = this.find("#as-msgsTable").getDataIDs();
            for (let i = 0; i < rids.length; ++i){
                for (let j = 0; j < data.length; ++j){
                    if (data[j][0] == rids[i]){
                        let html = "";
                        for (let k = 0; k < data[j][7].length; ++k){
                            html += "<div style='color:blue;cursor:pointer' >" + data[j][7][k] + "</div>"
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
                    onSortCol:(index,iCol,sortorder)=>{
                        setTimeout(()=>{
                            this.updateAttachement(data);
                        }, 0);
                    },
                    onPaging:(btn)=>{
                        setTimeout(()=>{
                           this.updateAttachement(data);
                        }, 0);
                    }
                }));

           this.updateAttachement(data);
        }

    }

}