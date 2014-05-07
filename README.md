angularjs-requirejs
===================

[![Build status](https://api.travis-ci.org/shustariov-andrey/angularjs-requirejs.png?branch=master)](https://travis-ci.org/shustariov-andrey/angularjs-requirejs) [![Dependencies](https://david-dm.org/shustariov-andrey/angularjs-requirejs.png)](https://david-dm.org/shustariov-andrey/angularjs-requirejs) [![Dev dependencies](https://david-dm.org/shustariov-andrey/angularjs-requirejs/dev-status.png)](https://david-dm.org/shustariov-andrey/angularjs-requirejs#info=devDependencies) [![Code Climate](https://codeclimate.com/github/shustariov-andrey/angularjs-requirejs.png)](https://codeclimate.com/github/shustariov-andrey/angularjs-requirejs)

Overview
--------

Simple boilerplate code for application, which will be based on [AngularJs](http://www.angularjs.org/) and [RequireJs](http://requirejs.org/)

Warning!
Works only via http!

[NodeJs](http://nodejs.org/) should be installed for proper work of build

Execute:

`npm install -g grunt-cli bower`

`npm install`

`bower install`

`grunt build`

To build code (lint, test, concatenate and minify), run: `grunt build`. Compiled version of application will be availabe at `/out` folder. Serve this folder via http, to access it

In development mode, use grunt (alias to grunt watch), to allow grunt automatically watch changes ant run linters and tests.
