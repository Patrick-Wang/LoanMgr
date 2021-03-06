///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
///<reference path="../sdk/route/route.ts"/>
///<reference path="importLoans.ts"/>
///<reference path="askSth.tsx"/>
module pages {
    import EntrustedCase = collection.EntrustedCase;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import EC = collection.protocol.EC;
    import Message = collection.Message;
    import AnonymousReceiver = route.AnonymousReceiver;

    export class Console extends PageImpl {
        private static ins = new Console(PageType.console);
        ecs:EC[];
        unassignedEcs:EC[];
        ecType:EntrustedCaseType;
        searchOpt:QueryOption = {
            pageNum:0,
            pageSize:200
        };
        unReadMsgs:collection.protocol.Message[];
        unRespMsgs:collection.protocol.Message[];
        isAssigner:boolean = false;
        isManager:boolean = false;
        isOwner:boolean = false;

        constructor(page:pages.PageType) {
            super(page);
          //  $("#" + PageUtil.getPageId(this.page) + " .dowebok input[checked='checked']").prop("checked", true);
            this.find(".dowebok input").labelauty();
            $("#" + PageUtil.getPageId(this.page) + " #myTab11 a").click(()=> {
                setTimeout(()=>{
                    this.doTabRefresh();
                }, 0);
            });

            this.find(".dowebok input").click(()=>{
                if (this.ecType != this.find(".dowebok input:checked").attr("myid")){
                    this.refresh();
                }
            });

            let enableClick = false;

            route.router.register(new AnonymousReceiver((e:route.Event)=> {
                switch (e.id) {
                    case route.MSG.CONSOLE_ASSIGNER_UNRESPMSGS:
                        this.unRespMsgs = e.data;
                        this.isAssigner = true;
                        if (!enableClick){
                            enableClick = true;
                            $("#" + PageUtil.getPageId(this.page) + " #myTab11 a").click(()=> {
                                setTimeout(()=>{
                                    this.doTabRefresh();
                                }, 0);
                            });
                            this.doTabRefresh();
                        }

                        break;
                    case route.MSG.CONSOLE_OWNER_UNREADMSGS:
                        this.unReadMsgs = e.data
                        this.isOwner = true;
                        if (!enableClick){
                            enableClick = true;
                            $("#" + PageUtil.getPageId(this.page) + " #myTab11 a").click(()=> {
                                setTimeout(()=>{
                                    this.doTabRefresh();
                                }, 0);
                            });
                            this.doTabRefresh();
                        }
                        break;
                    case route.MSG.CONSOLE_IS_MANAGER:
                        this.isManager = true;
                        if (!enableClick){
                            enableClick = true;
                            $("#" + PageUtil.getPageId(this.page) + " #myTab11 a").click(()=> {
                                setTimeout(()=>{
                                    this.doTabRefresh();
                                }, 0);
                            });
                            this.doTabRefresh();
                        }
                        break;
                }
            }));
        }

        protected onRefresh():void {

            let type = this.find(".dowebok input:checked").attr("myid");
            if (authority.ping("/ec/answer")){
                this.find(".nav-tabs a:eq(1)").text("未分配的委案");
            }else{
                this.find(".nav-tabs a:eq(1)").text("未完成的委案");
            }


            EntrustedCase.search(type, this.searchOpt).done((ecs:EC[])=> {
                this.ecs = ecs;
                this.ecType = type;
                this.doTabRefresh();
            });
        }



        doTabRefresh() {
            if (this.ecs != undefined) {
                if ($("#con-allLoans").hasClass("active")) {
                    this.refreshAllLoans(this.ecType);
                }
                if ($("#notAssigned").hasClass("active")) {
                    this.refreshNotAssigned(this.ecType);
                }
            }
            if ($("#notRepliedMsg").hasClass("active")) {
                this.refreshNotRepliedMsg();
            }
            if ($("#waitRepliedMsg").hasClass("active")) {
                this.refreshWaitRepliedMsg();
            }
        }

        protected onShown():void{
           // this.doTabRefresh();
        }

        private refreshNotAssigned(type:any):void {
            let tableAssist:JQTable.JQGridAssistant = pages.JQGridAssistantFactory.createTableAssist("tbNotAssigned", type);
            let loans = [];
            let isLinked:any = {};
            this.unassignedEcs = [];
            if (this.isOwner){
                for (let i = 0; i < this.ecs.length; ++i) {
                    if (!this.ecs[i].assignee) {
                        if (this.ecs[i].loan[1]) {
                            if (this.isManager || this.ecs[i].owner == context.userName) {
                                isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                                loans.push(this.ecs[i].loan);
                                this.unassignedEcs.push(this.ecs[i]);
                            }
                        }
                    }
                }
            }else{
                let index = collection.protocol.getTitles(this.ecType).indexOf("委外状态");
                for (let i = 0; i < this.ecs.length; ++i) {
                    if (this.ecs[i].loan[1] && this.ecs[i].loan[1 + index] == "工作中") {
                        if (this.isManager || this.ecs[i].assignee == context.userName) {
                            isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                            loans.push(this.ecs[i].loan);
                            this.unassignedEcs.push(this.ecs[i]);
                        }
                    }
                }
            }

            if(this.unassignedEcs.length > 0){
                this.unassignedEcs[0] = $.extend({}, this.unassignedEcs[0]);
                this.unassignedEcs[0].pageNum = 0;
                this.unassignedEcs[0].pageCount = 1;
                this.unassignedEcs[0].records = this.unassignedEcs.length;
            }


            $("#tbNotAssignedTable").jqGrid(
                tableAssist.decorate({
                    // url: "TestTable/WGDD_load.do",
                    // datatype: "json",
                    data: tableAssist.getDataWithId(loans),
                    datatype: "local",
                    multiselect: false,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    //                    cellsubmit: 'clientArray',
                    //                    cellEdit: true,
                    height: '100%',
                    //  width:  $("#allLoans").width() - 30,
                    shrinkToFit: false,
                    rowNum: 10,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    pager: '#tbNotAssignedPager',
                    //onCellSelect:(rowid,iCol,cellcontent,e)=>{
                    //    if (iCol == 1 &&  isLinked[rowid]){
                    //        alert(rowid + " " +  iCol);
                    //    }
                    //},
                    onSortCol:(index,iCol,sortorder)=>{
                        setTimeout(()=>{
                            let rids = $("#tbNotAssignedTable").getDataIDs();
                            for (let i =0; i < rids.length; ++i){
                                if (undefined != isLinked[rids[i]]) {
                                    $("#tbNotAssignedTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                                        "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                                }
                            }
                        }, 0);
                    },
                    onPaging:(btn)=>{
                        setTimeout(()=>{
                            let rids = $("#tbNotAssignedTable").getDataIDs();
                            for (let i =0; i < rids.length; ++i){
                                if (undefined != isLinked[rids[i]]) {
                                    $("#tbNotAssignedTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                                        "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                                }
                            }
                        }, 0);
                    }
                }));
            let rids = $("#tbNotAssignedTable").getDataIDs();
            for (let i =0; i < rids.length; ++i){
                if (undefined != isLinked[rids[i]]) {
                    $("#tbNotAssignedTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                        "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                }
            }
            this.adjustWidth("tbNotAssigned", $("#tbNotAssignedTable"));
        }

        private refreshNotRepliedMsg():void {

            var parent = $("#tbNotRepliedMsg");
            parent.empty();
            parent.append("<table id='tbNotRepliedMsgTable'></table><div id='tbNotRepliedMsgPager'></div>");
            let data = [];
            for (let i = 0; i < this.unReadMsgs.length; ++i) {
                let row = [];
                row.push(this.unReadMsgs[i].ecCode);
                row.push(this.unReadMsgs[i].fromName);
                row.push(this.unReadMsgs[i].title);
                row.push(this.unReadMsgs[i].content);
                row.push(this.unReadMsgs[i].sendTime);
                data.push(row);
            }

            let tableAssist:JQTable.JQGridAssistant = pages.JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["委案编码", "发送人", "标题", "内容", "发送时间"], 0);
            $("#tbNotRepliedMsgTable").jqGrid(
                tableAssist.decorate({
                    data: tableAssist.getData(data),
                    datatype: "local",
                    multiselect: false,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    //  width:  $("#allLoans").width() - 30,
                    shrinkToFit: true,
                    rowNum: 10,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    pager: '#tbNotRepliedMsgPager'
                }));
            this.adjustWidth("tbNotRepliedMsg", $("#tbNotRepliedMsgTable"));
        }

        private adjustWidth(name:string, jqgrid:any){
            if ($("#" + name).width() != $("#" + name).children().eq(0).width()){
                jqgrid.setGridWidth($("#" + name).width() );
            }
        }


        getEcByRid(rid:string):number{
            for (let i = 0; i < this.ecs.length; ++i){
                if (this.ecs[i].loan[0] == rid){
                    return i;
                }
            }
            return undefined;
        }

        getUnassignedEcByRid(rid:string):number{
            for (let i = 0; i < this.unassignedEcs.length; ++i){
                if (this.unassignedEcs[i].loan[0] == rid){
                    return i;
                }
            }
            return undefined;
        }

        onClickLink(rid:string){

            if ($("#notAssigned").hasClass("active")){
                let index = this.getUnassignedEcByRid(rid);
                route.router.to(PageUtil.getPageId(PageType.loansDetail)).send(route.MSG.EC_DETAIL_ECINFO, {
                    ecs : this.unassignedEcs,
                    index : index,
                    ec : this.unassignedEcs[index],
                    ecType : this.ecType,
                    searchOpt : this.searchOpt,
                });
            }else{
                let index = this.getEcByRid(rid);
                route.router.to(PageUtil.getPageId(PageType.loansDetail)).send(route.MSG.EC_DETAIL_ECINFO, {
                    ecs : this.ecs,
                    index : index,
                    ec : this.ecs[index],
                    ecType : this.ecType,
                    searchOpt : this.searchOpt,
                });
            }

            sidebar.switchPage(PageType.loansDetail);
        }

        private refreshAllLoans(type:any):void {
            let tableAssist:JQTable.JQGridAssistant = pages.JQGridAssistantFactory.createTableAssist("tbAll", type);
            let loans = [];
            let isLinked:any = {};
            for (let i = 0; i < this.ecs.length; ++i) {
                if (this.ecs[i].loan[1]){
                    if (this.isManager){
                        isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                        loans.push(this.ecs[i].loan);
                    }else if (this.isOwner && this.ecs[i].owner == context.userName ||
                        this.isAssigner && this.ecs[i].assignee == context.userName){
                        isLinked[this.ecs[i].loan[0]] = this.ecs[i].loan[1];
                        loans.push(this.ecs[i].loan);
                    }
                }
            }

            $("#tbAllTable").jqGrid(
                tableAssist.decorate({
                    data: tableAssist.getDataWithId(loans),
                    datatype: "local",
                    multiselect: false,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    shrinkToFit: false,
                    rowNum: 10,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    pager: '#tbAllPager',
                    //onCellSelect:(rowid,iCol,cellcontent,e)=>{
                    //    if (iCol == 1){
                    //        alert(rowid + " " +  iCol);
                    //    }
                    //},
                    onSortCol:(index,iCol,sortorder)=>{
                        setTimeout(()=>{
                            let rids = $("#tbAllTable").getDataIDs();
                            for (let i =0; i < rids.length; ++i){
                                if (undefined != isLinked[rids[i]]) {
                                    $("#tbAllTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                                        "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                                }
                            }
                        }, 0);
                    },
                    onPaging:(btn)=>{
                        setTimeout(()=>{
                            let rids = $("#tbAllTable").getDataIDs();
                            for (let i =0; i < rids.length; ++i){
                                if (undefined != isLinked[rids[i]]) {
                                    $("#tbAllTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                                        "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                                }
                            }
                        }, 0);
                    }
                }));

            let rids = $("#tbAllTable").getDataIDs();
            for (let i = 0; i < rids.length; ++i){
                if (undefined != isLinked[rids[i]]) {
                    $("#tbAllTable").setCell(rids[i], 0, "<div style='color:blue;cursor:pointer' " +
                        "onclick='pages.Console.ins.onClickLink(" + rids[i] + ")'>" + isLinked[rids[i]] + "</div>");
                }
            }
            this.adjustWidth("tbAll",  $("#tbAllTable"));
        }

        private refreshWaitRepliedMsg():void {
            var parent = $("#tbWaitRepliedMsg");
            parent.empty();
            parent.append("<table id='tbWaitRepliedMsgTable'></table><div id='tbWaitRepliedMsgPager'></div>");
            let data = [];
            for (let i = 0; i < this.unRespMsgs.length; ++i) {
                let row = [];
                row.push(this.unRespMsgs[i].ecCode);
                row.push(this.unRespMsgs[i].toName);
                row.push(this.unRespMsgs[i].title);
                row.push(this.unRespMsgs[i].content);
                row.push(this.unRespMsgs[i].sendTime);
                data.push(row);
            }

            let tableAssist:JQTable.JQGridAssistant = pages.JQGridAssistantFactory.createTable("tbNotRepliedMsgTable", ["委案编码", "回复人", "标题", "内容", "发送时间"], 0);
            $("#tbWaitRepliedMsgTable").jqGrid(
                tableAssist.decorate({
                    data: tableAssist.getData(data),
                    datatype: "local",
                    multiselect: false,
                    drag: false,
                    resize: false,
                    autowidth: true,
                    viewrecords: true,
                    sortable: true,
                    height: '100%',
                    //  width:  $("#allLoans").width() - 30,
                    shrinkToFit: true,
                    rowNum: 10,
                    rowList:[10,20,50,100],
                    autoScroll: true,
                    pager: '#tbWaitRepliedMsgPager'
                }));
            this.adjustWidth("tbWaitRepliedMsg", $("#tbWaitRepliedMsgTable"));
        }
    }
}