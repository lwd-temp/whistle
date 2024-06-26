var Transform = require('pipestream').Transform;
var util = require('util');

function ReplaceStringTransform(str, value, isSSE) {
  Transform.call(this);
  this._str = str;
  this._length = this._str.length;
  this._value = value == null ? '' : value + '';
  this._isSSE = isSSE;
  this._rest = '';
}

util.inherits(ReplaceStringTransform, Transform);

var proto = ReplaceStringTransform.prototype;
proto._transform = function (chunk, _, callback) {
  if (chunk != null) {
    chunk = this._rest + chunk;
    var minIndex = chunk.length + 1 - this._length;
    var index = chunk.lastIndexOf(this._str);

    if (index != -1) {
      index = Math.max(minIndex, index + this._length);
    } else {
      index = minIndex;
    }
    if (this._isSSE) {
      var endIndex = chunk.lastIndexOf('\n\n');
      if (endIndex !== -1) {
        index = Math.max(endIndex + 2, index);
      }
    }
    this._rest = chunk.substring(index);
    chunk = chunk.substring(0, index);
  } else {
    chunk = this._rest;
  }

  callback(null, replace(chunk, this._str, this._value));
};

function replace(chunk, str, value) {
  return chunk ? chunk.split(str).join(value) : null;
}

module.exports = ReplaceStringTransform;
