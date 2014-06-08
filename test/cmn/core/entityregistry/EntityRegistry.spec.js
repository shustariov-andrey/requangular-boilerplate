define([
   'module',
   'Squire'
], function(module, Squire) {
   'use strict';
   /*global describe : false, beforeEach : false, afterEach : false, it : false, expect : false*/

   describe(module.id, function() {
      var injector = new Squire('squire'), EntityRegistry, deps = ['src/cmn/core/entityregistry/module'];

      beforeEach(injector.run(deps, function(_EntityRegistry) {
            EntityRegistry = _EntityRegistry;
         }
      ));

      afterEach(function() {
         injector.clean(deps);
      });

      it('should register entity', function() {

         EntityRegistry.register({
            name : 'Person',
            fields : [
               {
                  name : 'name',
                  options : {
                     required : true,
                     type : 'string'
                  }
               },
               'age',
               {
                  name : 'location',
                  options : {
                     type : 'Location'
                  }
               }
            ]
         });

         EntityRegistry.register({
            parent : 'Person',
            name : 'Student',
            fields : [
               'course'
            ]
         });

         EntityRegistry.register({
            name : 'Location',
            fields : [
               {
                  name : 'name',
                  options : {
                     required: true
                  }
               }
            ]
         });

         expect(EntityRegistry.getClassByName('Person')).toBeDefined();
         expect(EntityRegistry.getRegistry().Student).toBeDefined();
      });

      it('should create entity instances', function() {
         var student = EntityRegistry.create('Student', {
            name : 'student1',
            age : 17,
            course : 4
         });

         expect(student).toBeDefined();
         expect(student instanceof EntityRegistry.getClassByName('Student').prototype).toBeTruthy();
         expect(student instanceof EntityRegistry.getClassByName('Person').prototype).toBeTruthy();
         expect(student.name).toEqual('student1');
         expect(student.age).toEqual(17);
         expect(student.course).toEqual(4);

      });

      it('should create array of entity instances', function() {
         var students = EntityRegistry.create('Student', [{
            name : 'student1',
            age : 17,
            course : 4
         }, {
            name : 'student2',
            age : 15,
            course : 3
         }]);

         expect(students.length).toEqual(2);
      });

      it('should throw if required field is not specified', function() {
         function f() {
            EntityRegistry.create('Student', [{
               age : 17,
               course : 4
            }]);
         }

         expect(f).toThrow();
      });

      it('should throw if field is of incorrect type', function() {
         function type() {
            EntityRegistry.create('Student', [{
               name : true
            }]);
         }

         function clazz() {
            EntityRegistry.create('Student', [{
               name : 'name1',
               location : 'Student'
            }]);
         }

         function unknown() {
            EntityRegistry.register({
               name : 'Test',
               fields : [
                  {
                     name : 'name',
                     options : {
                        required : true,
                        type : 'Unknown'
                     }
                  }
               ]
            });
            EntityRegistry.create('Test', {
               name : 'name1'
            });
         }

         expect(type).toThrow();
         expect(clazz).toThrow();
         expect(unknown).toThrow();
      });
   });
});