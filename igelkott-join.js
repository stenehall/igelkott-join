 var join = function join() {
  this.listeners = {'001': this.join};
};

join.prototype.join = function join() {
  this.igelkott.config.server.channels.forEach(function (channel) {
    var obj = {'command': 'JOIN', 'parameters': [ channel ]};
    this.igelkott.push(obj);
  }, this);
};

exports.Plugin = join;

