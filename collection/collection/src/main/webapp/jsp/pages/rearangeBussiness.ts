///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class RearangeBussiness extends PageImpl{
        static ins = new RearangeBussiness(PageType.rearangeBussiness);

        constructor(page:pages.PageType) {
            super(page);
        }
    }
}