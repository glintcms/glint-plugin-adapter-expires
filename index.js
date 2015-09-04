/**
 * Module dependencies.
 */
var debug = require('debug')('glint:adapter-plugin-expires');


/**
 * One day in seconds.
 */

var oneDay = 86400;

/**
 *  Expires Adapter Plugin
 *
 *  options:
 *   - ttl: time to live in seconts
 *   - attribute: expires attribute: defaults to `_ttl`
 */
module.exports = function (o) {
  o = o || {};
  o.attribute = o.attribute || '_expires';
  o.ttl = o.ttl || oneDay;

  plugin.api = 'adapter-plugin';
  plugin.name = 'expires';
  function plugin(adapter) {

    adapter.on('pre-save', function () {
      var args = [].slice.apply(arguments);
      var len = args.length, pos = 3;
      if (len <= pos) return debug('missing argument');
      var obj = args[pos];

      // only set expires attribute if not set already
      if ((obj[o.attribute])) return;
      var expires = new Date();
      expires.setSeconds(expires.getSeconds() + o.ttl);
      obj[o.attribute] = expires;

    });

  }

  return plugin;

};
