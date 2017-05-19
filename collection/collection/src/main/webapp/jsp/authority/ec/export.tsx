
module authority.ec.exporter{
    import Receiver = route.Receiver;
    import QueryOption = collection.protocol.QueryOption;
    import EntrustedCaseType = collection.protocol.EntrustedCaseType;
    import EntrustedCaseManager = collection.EntrustedCaseManager;
    import Toast = pages.Toast;
    import PageType = pages.PageType;
    import EntrustedCase = collection.EntrustedCase;
    let ADDR:string = "/ec/export";
    authority.register(ADDR, () => {
        let html = ReactDOMServer.renderToStaticMarkup(
            <form id="lm-exportForm" method="post" style={{display: "none"}}>
                <input id = "lm-export" type="submit" value="导出"/>
            </form>
        );

        pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export").append(html);
        html = ReactDOMServer.renderToStaticMarkup(
            <a id="lm-export-Btn" className="btn btn-default" style={{float:"right"}}>导出</a>
        );
        pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export").append(html);
        html = ReactDOMServer.renderToStaticMarkup(
            <a id="lm-delete-Btn" className="btn btn-default" style={{float:"right",marginRight:5}}>删除</a>
        );
        pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export").append(html);

        let exporter = new Export();
    });

    export class Export{

        constructor(){
            pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export-Btn").click(()=>{
                this.onClickExport();
                return false;
            });

            pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-delete-Btn").click(()=>{
                this.onClickDelete();
                return false;
            });
        }

        private onClickExport():void {
            let qOpt :QueryOption = route.router.to(pages.PageUtil.getPageId(pages.PageType.loansMgr)).send(route.MSG.LOANMGR_GET_QOPT);
            let type :EntrustedCaseType = route.router.to(pages.PageUtil.getPageId(pages.PageType.loansMgr)).send(route.MSG.LOANMGR_GET_TYPE);
            let action = collection.Net.BASE_URL + "/entrusted_case/download.do?type=" + type + "&query=" + JSON.stringify(qOpt);
            pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-exportForm").attr("action", action);
            pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-exportForm")[0].submit();
        }

        private onClickDelete():void {
            let ec = route.router.to(pages.PageUtil.getPageId(pages.PageType.loansMgr)).send(route.MSG.LOANMGR_GET_SELECTED);
            if (ec.ids.length > 0){
                EntrustedCase.delete(ec.type, ec.ids).done((r)=>{
                    if (r.code == 0){
                        Toast.success("委案删除成功");
                        sidebar.switchPage(PageType.loansMgr);
                    }else{
                        Toast.failed("委案删除失败");
                    }
                });
            }
            else{
                Toast.warning("请选择要删除的委案");
            }
        }
    }
}