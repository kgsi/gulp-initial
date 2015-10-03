var requireDir = require('require-dir');

console.log('test');
requireDir('./gulp/tasks', { recurse: true });