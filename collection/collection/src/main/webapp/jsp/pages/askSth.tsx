///<reference path="pages.ts"/>
///<reference path="importLoans.ts"/>
module pages{

    import Message = collection.Message;


    export class AskSth extends PageImpl {
        static ins = new AskSth(PageType.askSth);
        msgs:collection.protocol.Message[];
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

            if (authority.ping("/ec/answer")){
                nodes.push(JQTable.Node.create({
                    name: "",
                    width: 0,
                    isSortable: false,
                    align: JQTable.TextAlign.Center,
                }));
            }

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

        private clickAnswer(msgId:any){
            alert(msgId);
        }

        private updateAnswer(data:string[][]){
            if (authority.ping("/ec/answer")){
                let rids = this.find("#as-msgsTable").getDataIDs();
                for (let i = 0; i < rids.length; ++i){
                    for (var j = 0; j < data.length; ++j){
                        if (data[j][0] == rids[i]){
                            let html = ReactDOMServer.renderToStaticMarkup(<div>
                                <a id={data[j][0]} className="btn btn-default btn-xs purple" ><i className="fa fa-share"></i>回复</a>
                                </div>
                            );
                            this.find("#as-msgsTable").setCell(rids[i], 7, html);
                            this.find("#as-msgsTable #" + data[j][0] + " a").click(()=>{
                                this.clickAnswer(data[j][0]);
                            });
                            break;
                        }
                    }
                }
            }
        }

        onclickAttachement(msgId:number, attach:string){
            for (let i = 0; i < this.msgs.length; ++i){
                if (msgId == this.msgs[i].msgId){
                    this.find("#as-downloadForm [name=entrusted_case]").val(this.msgs[i].ecMgrId);
                    this.find("#as-downloadForm [name=from]").val(this.msgs[i].fromId);
                    this.find("#as-downloadForm [name=to]").val(this.msgs[i].toId);
                    this.find("#as-downloadForm [name=attachement]").val(attach);
                    this.find("#as-downloadForm").submit();
                    break;
                }
            }
        }

        private updateAttachement(data:string[][]){
            let rids = this.find("#as-msgsTable").getDataIDs();
            for (let i = 0; i < rids.length; ++i){
                for (let j = 0; j < data.length; ++j){
                    if (data[j][0] == rids[i]){
                        let html = "";
                        for (let k = 0; k < data[j][7].length; ++k){
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
                    onSortCol:(index,iCol,sortorder)=>{
                        setTimeout(()=>{
                            this.updateAttachement(data);
                            this.updateAnswer(data);
                        }, 0);
                    },
                    onPaging:(btn)=>{
                        setTimeout(()=>{
                           this.updateAttachement(data);
                            this.updateAnswer(data);
                        }, 0);
                    }
                }));

           this.updateAttachement(data);
            this.updateAnswer(data);
        }

    }

}