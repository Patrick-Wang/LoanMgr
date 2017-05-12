
module authority.ec.exporter{
    import Receiver = route.Receiver;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    let ADDR:string = "/ec/export";
    authority.register(ADDR, () => {
        let html = ReactDOMServer.renderToStaticMarkup(
            <form id="lm-exportForm" method="post" style={{display: "none"}}>
                <input id = "lm-export" type="submit" value="导出"/>
            </form>
        );

        pages.PageUtil.jqPage(pages.PageType.loansMgr).find(".buttons-preview:eq(0)").append(html);
        pages.PageUtil.jqPage(pages.PageType.loansMgr).find(".buttons-preview:eq(0)").append(ReactDOMServer.renderToStaticMarkup(
            <a id="lm-export-Btn" className="btn btn-default">导出</a>
        ));

        let exporter = new Export();
    });

    export class Export{

        constructor(){
            pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export-Btn").click(()=>{
                this.onClickExport();
                return false;
            });
        }

        private onClickExport():void {
            let qOpt :QueryOption = route.router.to("loansMgr").send(route.MSG.LOANMGR_GET_QOPT);
            let type :EntrustedCaseType = route.router.to("loansMgr").send(route.MSG.LOANMGR_GET_TYPE);
            let action = collection.Net.BASE_URL + "/entrusted_case/download.do?type=" + type + "&query=" + JSON.stringify(qOpt);
            pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-exportForm").attr("action", action);
            pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-exportForm")[0].submit();
        }
    }
}