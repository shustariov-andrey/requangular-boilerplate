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

Applicaiton must be served over HTTP (For simplicity I would recommend [http-server](https://www.npmjs.org/package/http-server)) in most cases to work. Navigate to http://localhost:8080/src/#/ (or http://localhost:8080/out/#/ for compiled version). You should see demo messages application

## Features ##

### ComponentFactory ###

Registers components, that are, basically, [AngularJs directives](https://docs.angularjs.org/guide/directive). Components are fundamental building blocks, that incapsulate logic. All user defined components should be located under `src/app/components` folder.

**Example**

```javascript
// File src/app/components/mycomponent/MyComponent.js

define([
    'module',
    './MyComponent.tpl.html',
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
    })
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
})
```
Component factory will generate ```<my-component></my-component>``` directive, which then may be used as part of another component or be the main component and bootstrap application with itself. To register ```my-component``` component as main ```MainComponentName``` configuration option must point to its name like this:
```JSON
{
    "MainComponentName" : "message",
}
```

In addition, Config, component-specific instance of logger and lodash are injected into $scope injectable, if it is present in controller.

##Licence##

MIT