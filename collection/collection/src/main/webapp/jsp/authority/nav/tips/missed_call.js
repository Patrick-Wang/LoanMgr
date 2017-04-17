authority.register("/nav/tips/missed_call", function() {
    $("#accountarea").children(":first").before(ReactDOMServer.renderToStaticMarkup(
        React.createElement("li", null, 
            React.createElement("a", {className: " dropdown-toggle", "data-toggle": "dropdown", title: "Notifications", href: "#"}, 
                React.createElement("i", {className: "icon fa fa-warning red"}), 
                React.createElement("span", {className: "badge"}, "2")
            ), 
            React.createElement("ul", {className: "pull-right dropdown-menu dropdown-arrow dropdown-notifications"}, 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#"}, 
                        React.createElement("div", {className: "clearfix"}, 
                            React.createElement("div", {className: "notification-icon"}, 
                                React.createElement("i", {className: "fa fa-phone bg-themeprimary white"})
                            ), 
                            React.createElement("div", {className: "notification-body"}, 
                                React.createElement("span", {className: "title red"}, "未接来电：138-0240-9977"), 
                                React.createElement("span", {className: "description"}, "今天 上午 9点18分30秒")
                            )
                        )
                    )
                ), 
                React.createElement("li", null, 
                    React.createElement("a", {href: "#"}, 
                        React.createElement("div", {className: "clearfix"}, 
                            React.createElement("div", {className: "notification-icon"}, 
                                React.createElement("i", {className: "fa fa-phone bg-themeprimary white"})
                            ), 
                            React.createElement("div", {className: "notification-body"}, 
                                React.createElement("span", {className: "title red"}, "未接来电：186-2402-0715"), 
                                React.createElement("span", {className: "description"}, "今天 下午 3点42分18秒")
                            )
                        )
                    )
                ), 
                React.createElement("li", {className: "dropdown-footer "}, 
			                    React.createElement("span", null, 
			                        "前往呼叫中心"
			                    )
                )
            )
        )
    ));
});
