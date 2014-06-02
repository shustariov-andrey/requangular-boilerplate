define([
   'module',
   'lodash'
], function(module, _) {
   'use strict';

   var defaultConfig = {
      Core : {
         LogLevel : 'INFO',
         Expose : true
      },
      IgnoreConfigFile : false,
      NamePrefix : 'ra'
   };

   var config = {};

   /**
    * Parse object with provided expression and return corresponding value or undefined;
    *
    * @param {object} object which will be parsed with expression
    * @param {string} expression string of following format: 'Key1.SubKey2.AnotherSubKey6'
    */
   function parseExpression(object, expression) {

      function parseArrayExpression(object, keys) {
         if (keys.length) {
            var key = keys.shift();
            if (object.hasOwnProperty(key)) {
               return parseArrayExpression(object[key], keys);
            } else {
               return;
            }
         } else {
            return object;
         }
      }

      var keys = expression.split('.');
      return parseArrayExpression(object, keys);
   }

   /**
    * Provides access to application configuration
    *
    * @param expression string of follwing format: 'Key1.SubKey2.AnotherSubKey6'
    * @returns {*} config object if no expression specified, otherwise returns result
    * of parsing config object with given expression
    */
   function getConfig(expression) {
      if (expression) {
         return parseExpression(config, expression);
      } else {
         return config;
      }
   }

   /**
    * Parses configuration files (config/config.json and config/local.json) and url parameters
    * in order to create config object
    *
    * Priority of config sources:
    * 1. url params
    * 2. config.json
    * 3. defaultConfig object
    *
    * @param {function} callback will be called after configuration parsing
    * @param {string} [optional] path to config.json

    */

   function readConfigFile(path, callback) {
      path = 'json!' + path;
      require([path], function(result) {
         callback(result);
      }, function() {
         callback({});
      });
   }

   function init(callback, path, location) {
      location = location || window.location;
      var urlParams = parseUrl(location);
      if (urlParams && urlParams.IgnoreConfigFile) {
         config = _.merge(defaultConfig, urlParams);
         callback(config);
      } else {
         path = path || 'config/config.json';
         readConfigFile(path, function (fileConfig) {
            config = _.merge(defaultConfig, fileConfig, urlParams);
            callback(config);
         });
      }
   }

   /**
    * Parses given location object's search string. Tries to convert booleans to boolean
    * numbers to numbers
    *
    * @param location
    * @returns {Object}
    */
   function parseUrl(location) {
      // remove first symbol which is '?'
      var params = location.search.substring(1).split('&');
      var configParams = _.filter(params, function(param) {
         return param.match(/^config(\.\w)+/);
      });

      var obj = _.reduce(configParams, function(result, current) {
         var key = current.split('=')[0];
         var value = decodeURIComponent(current.split('=')[1]);
         if (value === 'false') {
            value = false;
         } else if (value === 'true') {
            value = true;
         } else if (value.match(/^\d+$/)) {
            value = parseFloat(value);
         }

         var keys = key.split('.');
         var currentResult = result;
         while (keys.length) {
            var currentKey = keys.shift();
            currentResult = currentResult[currentKey] = currentResult[currentKey] || (keys.length ? {} : value);
         }
         return result;
      }, {});

      return obj.config;
   }

   return {
      init : init,
      getConfig : getConfig,
      setConfig : function(_config) {
         config = _config;
      }
   };
});