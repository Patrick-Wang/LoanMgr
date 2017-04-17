authority.register("/nav/tips/messages", function() {
    $("#accountarea").children(":last").before(ReactDOMServer.renderToStaticMarkup(
        React.createElement("li", null, 
            React.createElement("a", {className: "dropdown-toggle", "data-toggle": "dropdown", title: "Tasks", href: "#"}, 
                React.createElement("i", {className: "icon fa fa-tasks"}), 
                React.createElement("span", {id: "msgCount", className: "badge"}, "0")
            ), 
            React.createElement("ul", {className: "pull-right dropdown-menu dropdown-messages dropdown-arrow "}, 
                React.createElement("li", {id: "msgCountDetail", className: "dropdown-header bordered-darkorange"}, 
                    React.createElement("i", {className: "fa fa-tasks"}), 
                    "0 条委消息"
                ), 
                React.createElement("li", {className: "dropdown-footer"}, 
                    React.createElement("a", {id: "queryAllMsgs", href: "#"}, 
                        "查看全部咨询信息"
                    )
                )
            )
        )
    ));
    navbar.NavBar.openMessageTips();

});
