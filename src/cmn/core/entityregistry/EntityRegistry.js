define([
   'module',
   'src/cmn/core/loggerfactory/module',
   'lodash'
], function(module, LoggerFactory, _) {
   'use strict';
   
   var logger = LoggerFactory.getInstance(module.id);
   
   function register(options) {
      var name = options.name;
      logger.trace('Registering entity <' + name + '>');
      var entityClass = options.prototype;
      var fields = options.fields;
      
      var fieldsDescriptors = {};
      fields.forEach(function(field) {
         var obj = {};
         obj.configurable = !!options.isFinal;
         obj.enumerable = false;
         obj.writable = true;
         obj.value = null;
         fieldsDescriptors[field] = obj;
      });
      
      if (options.parent) {
         var parentName = options.parent;
         var ParentEntityClass = registry[parentName].prototype;
         var currentPrototype = entityClass.prototype;
         
         // Classical inheritance
         
         var parentEntityInstance = new ParentEntityClass();
         entityClass.prototype = _.defaults(parentEntityInstance, currentPrototype);
         entityClass.prototype.constructor = entityClass;
         
         fieldsDescriptors = _.defaults(registry[parentName].descriptors, fieldsDescriptors);
      }
      registry[name] = {
         prototype   : entityClass,
         descriptors : fieldsDescriptors
      };
      logger.trace('Entity <' + name + '> registered');
      return registry[name];
   }
   
   function create(entityName, fields) {
      if (fields instanceof Array) {
         return createArray(entityName, fields);
      } else {
         return createArray(entityName, [fields])[0];
      }
   }
   
   function createArray(entityName, fieldsArray) {
      var entity = registry[entityName], result = [];
      for (var i = 0, len = fieldsArray.length; i < len; ++i) {
         var newObject = new entity.prototype(), fields = fieldsArray[i];
         Object.defineProperties(newObject, entity.descriptors);
         for (var f in fields) {
            if (fields.hasOwnProperty(f)) {
               newObject[f] = fields[f];
            }
         }
         result.push(newObject);
      }
      return result;
   }
   
   var registry = {};
   
   return {
      register : register,
      create   : create,
      getRegistry : function() {
         return _.cloneDeep(registry);
      }
   };
});