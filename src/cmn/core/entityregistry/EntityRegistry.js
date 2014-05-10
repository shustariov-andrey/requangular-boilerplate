define([
   'module',
   'src/cmn/core/loggerfactory/module',
   'lodash'
], function(module, LoggerFactory, _) {
   'use strict';
   
   var logger = LoggerFactory.getInstance(module.id);

   var typeofResults = ['string', 'number', 'boolean', 'object', 'function'];

   /**
    * Registers new Entity, which then can be created with 'create' method
    * @param {String} options.name name of Entity,
    * @param {Array<Object>} [options.fields] fields descriptors array. Each object may be either a string - which will
    * be the name of a field, or an object, which may contain following properties:
    * name - name of field (required)
    * options {
    *    type : 'string|number|boolean|object|function|EntityName
    *    required : true|false
    * }
    * @returns {Object}
    */
   function register(options) {
      var name = options.name;
      logger.trace('Registering entity <' + name + '>');

      /*jshint evil : true*/
      var prototype = new Function(
            "return function " + name + "(){}"
      )();
      var entityClass = prototype;
      var fields = options.fields;
      
      var fieldsDescriptors = {}, fieldOptions = {};
      _.each(fields, function(field) {
         var fieldName;
         if (typeof (field) === 'object') {
            fieldName = field.name;
            fieldOptions[fieldName] = field.options;
         } else {
            fieldName = field;
         }
         var obj = {
            configurable : !!options.isFinal,
            enumerable : false,
            get : function() {
               return this['_' + fieldName];
            },
            set : function(newValue) {
               this['_' + fieldName] = newValue;
            }
         };
         obj['_' + fieldName] = null;
         fieldsDescriptors[fieldName] = obj;
      });
      
      if (options.parent) {
         var parentName = options.parent;
         var ParentEntityClass = registry[parentName].prototype;
         var currentPrototype = entityClass.prototype;
         
         // Classical inheritance
         
         var parentEntityInstance = new ParentEntityClass();
         entityClass.prototype = _.defaults(parentEntityInstance, currentPrototype);
         entityClass.prototype.constructor = entityClass;
         
         _.merge(fieldsDescriptors, registry[parentName].descriptors, fieldsDescriptors);
         _.merge(fieldOptions, registry[parentName].options, fieldOptions);
      }
      registry[name] = {
         prototype   : entityClass,
         descriptors : fieldsDescriptors,
         options : fieldOptions
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
      logger.trace('Creating ' + fieldsArray.length + ' entity(-ies) of type ' + entityName);
      var entity = registry[entityName],
         result = [],
         fieldOptions = entity.options;

      _.each(fieldsArray, function(fields) {

         // validation

         _.forIn(fieldOptions, function(options, fieldName) {
            if (options.required && !fields[fieldName]) {
               throw new Error ('Required field ' + fieldName + ' is not specified for entity ' + entityName);
            }
            if (options.type && fields[fieldName]) {
               if (_.contains(typeofResults, options.type)) {
                  if (typeof(fields[fieldName]) !== options.type) {
                     throw new Error('Field ' + fieldName + ' has incorrect type ' + typeof(fields[fieldName]) + '. ' +
                        options.type + ' is expected');
                  }
               } else if (registry[options.type]) {
                  var entity = registry[options.type];
                  if (!(fields[fieldName] instanceof entity.prototype)) {
                     throw new Error('Field ' + fieldName + ' has incorrect class. ' + options.type + ' is expected');
                  }
               } else {
                  throw new Error('Unknown type or Entity ' + options.type);
               }
            }
         });

         var newObject = new entity.prototype();
         Object.defineProperties(newObject, entity.descriptors);
         _.forIn(fields, function(value, key) {
            newObject[key] = value;
         });

         result.push(newObject);
      });
      return result;
   }
   
   var registry = {};

   return {
      register : register,
      create   : create,
      getRegistry : function() {
         return _.cloneDeep(registry);
      },
      getClassByName : function(className) {
         return registry[className];
      }
   };
});