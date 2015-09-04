var Emitter = require('events').EventEmitter;
var debug = require('debug')('glint:plugin-adapter-expires');
var merge = require('utils-merge');

/**
 * Expose `Task`.
 */

module.exports = Task;

/**
 * `Task` Constructor function.
 */
function Task(opts) {
  if (!(this instanceof Task)) return new Task(opts);
  merge(this, opts);
  this.init();
}

/**
 * Inherit from `Emitter.prototype`.
 */

Task.prototype.__proto__ = Emitter.prototype;

Task.prototype.checkInterval = 60 * 60; // 1h in s

/// Task functions
Task.prototype.init = function () {
  this.checkCount = 0;
  return this;
};

Task.prototype.start = function () {
  var self = this;
  this.init();

  self.task();
  this.intervalHandler = setInterval(function () {
    self.task();
  }, (self.checkInterval * 1000));
  return this;
};

Task.prototype.stop = function () {
  clearInterval(this.intervalHandler);
  this.init();
  return this;
};

Task.prototype.task = function () {
  var self = this;

  this.checkCount++;
  this.lastCheck = Date.now();
  debug('check count', this.checkCount);

  // TODO implement

  return this;
};
