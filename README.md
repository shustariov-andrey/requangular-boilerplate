requangular-boilerplate
===================

[![Build Status](https://travis-ci.org/shustariov-andrey/requangular-boilerplate.svg?branch=master)](https://travis-ci.org/shustariov-andrey/requangular-boilerplate) [![Dependencies](https://david-dm.org/shustariov-andrey/angularjs-requirejs.png)](https://david-dm.org/shustariov-andrey/angularjs-requirejs) [![Dev dependencies](https://david-dm.org/shustariov-andrey/angularjs-requirejs/dev-status.png)](https://david-dm.org/shustariov-andrey/angularjs-requirejs#info=devDependencies) [![Code Climate](https://codeclimate.com/github/shustariov-andrey/angularjs-requirejs.png)](https://codeclimate.com/github/shustariov-andrey/angularjs-requirejs) [![Coverage Status](https://coveralls.io/repos/shustariov-andrey/angularjs-requirejs/badge.png?branch=master)](https://coveralls.io/r/shustariov-andrey/angularjs-requirejs?branch=master)

Overview
--------

This is a boilerplate seed application for projects that will be based on [AngularJs](http://www.angularjs.org/) and [RequireJs](http://requirejs.org/). It has several abstactions for component-oriented development style, like component factory, which utilizes [AngularJs directives](https://docs.angularjs.org/guide/directive). Also provides configuration, layout, service and entity management, uses its own logger implementation.


Usage
--------

`npm install -g grunt-cli bower`

`npm install`

`bower install`

`grunt build`

To build code (lint, test, concatenate and minify), run: `grunt build`. Compiled version of application will be availabe at `/out` folder. Serve this folder via http, to access it

In development mode, use grunt (alias to grunt watch), to allow grunt automatically watch changes ant run linters and tests.
