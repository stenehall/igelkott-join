var assert = require('chai').assert,
    Stream = require('stream'),
    Igelkott = require('igelkott'),
    JOIN = require('../igelkott-join.js').Plugin;

describe('JOIN', function() {

  var igelkott,
  config,
  s,
  server;

  it('Should JOIN all channels in config', function(done) {

    s = new Stream.PassThrough({objectMode: true});
    config = {
      plugins: {},
      server: {
        channels: ['#one', '#two'],
      },
      'adapter': s, 'connect': function() { this.server.emit('connect'); }
    };

    igelkott = new Igelkott(config);
    igelkott.plugin.load('JOIN', {}, JOIN);

    var channels = [];

    igelkott.on('JOIN', function(message) {
      channels.push(message.parameters[0]);
      if (channels.length == 2)
      {
        assert.deepEqual(channels, ['#one', '#two']);
        done();
      }
    });

    igelkott.connect();
    s.write(':cameron.freenode.net 001 jsmith :Welcome to the freenode Internet Relay Chat Network jsmith\r\n');

  });

});

