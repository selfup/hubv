function HubV () {
  this.actions = {};
  this.hub = null;
}

HubV.prototype = {
  setup: function () {
    this.hub.$on('dispatch', this.dispatch);
  },
  teardown: function () {
    this.hub.$off('dispatch', this.dispatch);
  },
  install: function (Vue, options) {
    var _self = this;

    _self.hub = new Vue({});
    
    Vue.prototype.$hubv = _self;

    Vue.mixin({
      created: function () {
        _self.setup();
      },
      destroyed: function () {
        _self.teardown();
      },
    });
  },
  dispatchBuilder: function (options) {
    var _self = this;

    Object.keys(options)
      .forEach(function (option) {
        _self.actions[option] = options[option]
      });
  },
  dispatchDestroyer: function (options) {
    var _self = this

    Object.keys(options)
      .forEach(function (option) {
        delete _self.actions[option];
      });
  },
  dispatch: function (options) {
    var action = this.actions[options.action];
    var data = options.data;

    action ? this.fireAction(action, data) : this.noAction();
  },
  noAction: function () {
    console.error('HUBV: No method with that name');
    return null;
  },
  fireAction: function (actionMethod, data) {
    actionMethod(data);
  },
};

module.exports = new HubV();
