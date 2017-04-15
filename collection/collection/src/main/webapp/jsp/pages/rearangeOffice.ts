///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class RearangeOffice extends PageImpl{
        static ins = new RearangeOffice(PageType.rearangeOffice);

        constructor(page:pages.PageType) {
            super(page);
        }
    }
}