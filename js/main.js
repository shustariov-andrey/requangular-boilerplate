require.config({
    baseUrl: "js",
    paths: {
        "angular": "libs/angular",
        "angular-route": "libs/angular-route",
        
        domReady : 'libs/domReady',
		text 	 : 'libs/text'
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-route" : {
			exports: "angular",
			deps : ["angular"]
        }
    }
});

