define([
   'module',
   'lodash'
], function(module, _) {
   'use strict';

   var defaultConfig = {
      Core : {
         LogLevel : 'INFO'
      }
   };

   var config = {};

   /**
    * Parse object with provided expression and return corresponding value or undefined;
    *
    * @param {object} object which will be parsed with expression
    * @param {string} expression string of follwing format: 'Key1.SubKey2.AnotherSubKey6'
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

   function readConfigFile(path, callback) {
      path = 'json!' + path;
      require([path], function(result) {
         callback(result);
      }, function() {
         callback({});
      });
   }

   /**
    * Parses configuration files (config/config.json and config/local.json) and url parameters
    * in order to create config object
    *
    * Priority of config sources:
    * 1. url params
    * 2. config.json
    * 4. defaultConfig object
    *
    * @param {string} path directory, where to search for configuration
    * @param {function} callback will be called after configuration parsing
    */
   function init(path, callback) {
      path = path || './config.json';
      readConfigFile(path, function(fileConfig) {
         config = _.extend(defaultConfig, fileConfig);
         callback(config);
      });
   }

   return {
      init : init,
      getConfig : getConfig
   };
});