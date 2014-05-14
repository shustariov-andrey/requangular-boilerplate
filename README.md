# requangular-boilerplate #
---
[![Build Status](https://travis-ci.org/shustariov-andrey/requangular-boilerplate.svg?branch=master)](https://travis-ci.org/shustariov-andrey/requangular-boilerplate) [![devDependency Status](https://david-dm.org/shustariov-andrey/requangular-boilerplate/dev-status.svg)](https://david-dm.org/shustariov-andrey/requangular-boilerplate#info=devDependencies) [![Code Climate](https://codeclimate.com/github/shustariov-andrey/requangular-boilerplate.png)](https://codeclimate.com/github/shustariov-andrey/requangular-boilerplate) [![Coverage Status](https://coveralls.io/repos/shustariov-andrey/requangular-boilerplate/badge.png)](https://coveralls.io/r/shustariov-andrey/requangular-boilerplate)

## Overview ##
---
This is a boilerplate seed application for projects that will be based on [AngularJs](http://www.angularjs.org/) and [RequireJs](http://requirejs.org/). It provides several abstractions for development in component-oriented architectural style.


## Build ##
---
```SH
npm install -g grunt-cli bower
npm install
bower install
grunt build # lint, run tests, optimize with r.js and put everything into /out folder
```

Applicaiton must be served over HTTP (For simplicity I would recommend [http-server](https://www.npmjs.org/package/http-server)) in most cases to work. Navigate to [http://localhost:8080/src/#/](http://localhost:8080/src/#/) (or [http://localhost:8080/out/#/](http://localhost:8080/out/#/) for compiled version). You should see demo messages application

## Features ##
---

### EntityRegistry ###
(no docs yet)
### ServiceFactory ###
(no docs yet)
### LayoutManager ###
(no docs yet)

### ComponentFactory ###

Registers components, that are, basically, [AngularJs directives](https://docs.angularjs.org/guide/directive). Components are fundamental building blocks, that incapsulate logic. All user defined components should be located under `src/app/components` folder. ComponentFactory is a RequireJs module and should be specified as a dependency.

**Example**

```javascript
// File src/app/components/mycomponent/MyComponent.js

define([
    'module',
    './MyComponent.tpl.html',
    
    // Requesting component factory as requirejs dependency
    'src/cmn/core/componentfactory/ComponentFactory'
], function(module, template, ComponentFactory) {
    'use strict';
    
    ComponentFactory.register(module.id, {
        template : template,
        controller : ['$scope', function($scope) {
            $scope.message = 'Hello, world';
            // $scope.Config is injected
            // $scope.logger is injected
            // $scope._ is injected
        }]
    });
});
```

```HTML
<!-- File src/app/components/mycomponent/MyComponent.tpl.html-->
<span class="my_component">{{message}}</span>
```

```LESS
// File src/app/components/mycomponent/MyComponent.less

.my_component {
    color: green;
}
```

```javascript
// File src/app/components/mycomponent/module.js

define([
    './MyComponent',
    'less!./MyComponent.less'
], function() {
});
```
Component factory will generate ```<my-component></my-component>``` directive, which then may be used as part of another component or be the main component and bootstrap application with itself. To register ```my-component``` component as main, ```MainComponentName``` configuration option must point to its name like this:
```JSON
{
    "MainComponentName" : "my-component",
}
```

In addition, Config, component-specific instance of logger and lodash are injected into $scope injectable, if it is present in controller.

## Config ##

Facade for accessing to application configuration, that may be specfied as:
1. URL search part parms, that match following pattern: ```?config.Core.LogLevel=DEBUG&config.MyConfigParam=42...```
2. config/config.json file. Previous configuration may also be specified in file like this:
```JSON
{
    "Core" : {
        "LogLevel" : "DEBUG"
    },
    "MyConfParam" : 42
}
```
3. Hardcoded predefined default value in [Config.js module](./src/cmn/core/config/Config.js#L7)

Configuration is generated during applicaiton bootstrap from all sources and has the same priority as specified in above list. Config object is injected into ```$scope``` of components controller or in ```this``` of service function for ease of access. To get configuration option use ```getConfig()``` method.

**Example**

```javascript
define([
    'module',
    './MyComponent.tpl.html',
    
    // Requesting component factory as requirejs dependency
    'src/cmn/core/componentfactory/ComponentFactory'
], function(module, template, ComponentFactory) {
    'use strict';
    
    ComponentFactory.register(module.id, {
        template : template,
        controller : ['$scope', function($scope) {
            $scope.message = 'Hello, world';
            
            var logLevel = $scope.Config.getConfig('Core.LogLevel'); // same as $scope.Config.getConfig().Core.LogLevel
            $scope.logger.debug(logLevel); // will display current log level
        }]
    });
});
```

Note, that config/config.json is not required, but Config will try to read it and parse. So in any case it should exist.

### LoggerFactory ###

Used to generate logger instance for specified module name. Mostly used in core part of application to create component- or service- specific instance of logger, but can be specified as AMD dependency to create some custom logger. Such things as LogWriter and MessageFormatters are separated from LoggerFactory and may be easily replaced. Default implementations of LogWriter and MessageFormatter are [ConsoleLogWriter](./src/cmn/core/loggerfactory/ConsoleLogWriter.js) and [DefaultMessageFormatter](./src/cmn/core/loggerfactory/DefaultLogFormatter.js) correspondingly.

So this line of code

```javascript
// Somewhere inside of controlelr of module src/app/components/mycomponent/MyComponent.js

$scope.logger.trace('my message');
```

will produce following console output, using ```DefaultMessageFormatter```:

```22:23:14:801 [TRACE] - [app.components.mycomponent.MyComponent] - my message```

LoggerFactory provides following log levels:

1. TRACE
2. DEBUG
3. INFO
4. WARN
5. ERROR

and has corresponding methods:

1. ```logger.error```
2. ```logger.warn```
3. ```logger.info```
4. ```logger.debug```
5. ```logger.trace```

Log level may be specfied via configuration option ```Core.LogLevel```, or during runtime via setLogLevel method of LoggerFactory.

Note, AngularJs's $log service is also replaced with instance of logger generated by LoggerFactory.

**Example**

```javascript
define([
    'module',
    
    // Requesting logger factory as requirejs dependency
    'src/cmn/core/loggerfactory/LoggerFactory'
], function(module, LoggerFactory) {
    'use strict';
    
    // module.id will contain path to current file and will be used to display something like fully-qualified module
    // name in log messages.
    var logger = LoggerFactory.getInstance(module.id); 
    
    logger.trace('This message will be displayed if log level is trace or lower');
    logger.debug('This message will be displayed if log level is debug or lower');
    logger.info('This message will be displayed if log level is info or lower');
    logger.warn('This message will be displayed if log level is warn or error');
    logger.error('This message will be displayed if log level is error');
});

```

LoggerFactory knows nothing about AngularJs and so, may be used in any other non-AngularJs project.

##Licence##
---
MIT