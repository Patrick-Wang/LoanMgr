///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class Backup extends PageImpl{
        static ins = new Backup(PageType.backup);

        constructor(page:pages.PageType) {
            super(page);
        }

        protected onRefresh():void {
            collection.EntrustedCaseManager.getBatchNOs().done((batchNOs:number[])=>{

            });
        }
    }
}