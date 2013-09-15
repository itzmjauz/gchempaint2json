'use strict';
var xml = ''
  , convert = require('./')

process.stdin
  .on('data', function(chunk) { xml += chunk })
  .on('end', function() {
    process.stdout.write(JSON.stringify(convert(xml), null, 2))
  })
