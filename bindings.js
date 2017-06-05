const jitterbuffer = require('./node_modules/jitterbuffer/build/Release/node-jitterbuffer.node');
const celt = require('./node_modules/celt/build/Release/node-celt.node');
const opus = require('./node_modules/node-opus/build/Release/node-opus.node');
const bindings = require('./node_modules/lame/build/Release/bindings.node');

exports = (str) => {
  switch (str) {
    case 'node-jitterbuffer':
      return jitterbuffer;
    case 'node-celt':
      return celt;
    case 'node-opus':
      return opus;
    case 'bindings':
      return bindings;
    default:
      return null;
  }
};

module.exports = exports;
