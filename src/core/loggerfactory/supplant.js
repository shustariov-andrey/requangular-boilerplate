/**
 * String supplant global utility (similar to but more powerful than sprintf() ).
 * Usages:
 *
 * var user = { first : "Thomas", last : "Burleson", address : { city : "West
 * Des Moines", state: "Iowa" }, contact : { email : "ThomasBurleson@Gmail.com"
 * url : "http://www.gridlinked.info" } }, message = "Hello Mr. {first} {last}.
 * How's life in {address.city}, {address.state} ?";
 *
 * return supplant( message, user );
 *
 *
 * @author Thomas Burleson
 *
 */

define(function() {
   'use strict';
   // supplant() method from Crockfords `Remedial Javascript`

   return function(template, values, pattern) {
      pattern = pattern || /\{([^\{\}]*)\}/g;

      values = values || [];
      values = values.map(function(item) {
         if (typeof(item) === 'string') {
            return item;
         }
         else {
            return JSON.stringify(item);
         }
      });

      return template.replace(pattern, function(a, b) {
         var p = b.split('.'), r = values;

         try {
            for (var s in p) {
               if (p.hasOwnProperty(s)) {
                  r = r[p[s]];
               }
            }
         } catch (e) {
            r = a;
         }

         return (typeof r === 'string' || typeof r === 'number') ? r : a;
      });
   };

});
