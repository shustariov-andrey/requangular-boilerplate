({

baseUrl                 : '.',
mainConfigFile          : 'main.js',
name                    : 'main',
out                     : './main-built.js',
paths                   : {
  requireLib : 'libs/require'
},
include                 : ['requireLib'],
excludeShallow          : [],

pragmas                 : {
  mockExclude : true,
  testExclude : true
},

// for configuration files loading
findNestedDependencies  : false,
preserveLicenseComments : false,
generateSourceMaps      : false,
optimize               : 'none',
//               optimize                : 'uglify2',
})