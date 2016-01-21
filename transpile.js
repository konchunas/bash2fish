#!/usr/bin/env node
var ohm = require('ohm');
var fs = require('fs');
var source2sourceSemantics = require('./semantics');
require('shelljs/global');

var contents = fs.readFileSync('bash.ohm');
var bash = ohm.grammar(contents);

var script = cat('input.sh');

var m = bash.match(script);
if (m.failed()) {
  console.error('Invalid script');
  exit(1);
}

var s = bash.semantics();
s.addOperation(
  'toJS',
  source2sourceSemantics);

var n = s(m);

console.log(n.toJS());
