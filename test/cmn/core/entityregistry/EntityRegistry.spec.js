define([
   'module',
   'src/cmn/core/entityregistry/module'
], function(module, EntityRegistry) {
   'use strict';
   /*global describe : false, beforeEach : false, inject : false, it : false, expect : false*/

   function Person(name, age) {
      this.name = name;
      this.age = age;
   }

   function Student(course) {
      this.course = course;
   }

   describe(module.id, function() {
      it('should register entity', function() {

         EntityRegistry.register({
            prototype : Person,
            name : 'Person',
            fields : [
               'name',
               'age'
            ]
         });

         EntityRegistry.register({
            prototype : Student,
            parent : 'Person',
            name : 'Student',
            fields : [
               'course'
            ]
         });

         expect(EntityRegistry.getRegistry().Person).toBeDefined();
         expect(EntityRegistry.getRegistry().Student).toBeDefined();
      });

      it('should create entity instances', function() {
         var student = EntityRegistry.create('Student', {
            name : 'student1',
            age : 17,
            course : 4
         });

         expect(student).toBeDefined();
         expect(student instanceof Student).toBeTruthy();
         expect(student instanceof Person).toBeTruthy();
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
   });
});