authority.register("/console/summary/owner", function() {
    function update(){
        $("#console-status>div:eq(0)>div").eq(0)
            .text("manager").next().text("已导入委案");
        $("#console-status>div:eq(1)>div").eq(0)
            .text("manager").next().text("未分配委案");
        $("#console-status>div:eq(2)>div").eq(0)
            .text("manager").next().text("未处理委案咨询");
    }
    route.router.register({
        getAddr : function(){
            return "/console/summary"
        },
        onEvent: function(e){
            switch (e.id){
                case pages.Console.ON_PANEL_REFRESH:
                    update();
                    break;
            }
        }
    });
});