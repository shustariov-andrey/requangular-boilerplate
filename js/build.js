({

baseUrl                 : '.',
mainConfigFile          : 'main.js',
name                    : 'myModule',
out                     : './main-built.js',
paths                   : {
  requireLib : 'libs/require'
},
include                 : ['requireLib'],
// for configuration files loading
findNestedDependencies  : false,
preserveLicenseComments : false,
generateSourceMaps      : false,
optimize               : 'none',
//               optimize                : 'uglify2',
})