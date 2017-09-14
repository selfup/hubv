function HubV () {
  this.actions = {};
  this.disptach = this.dispatch.bind(this);
}

HubV.prototype = {
  install: function (Vue, options) {
    Vue.prototype.$hubv = this;
  },
  dispatchBuilder: function (options) {
    var _self = this;

    Object.keys(options)
      .forEach(function (option) {
        _self.actions[option] = options[option]
      });
  },
  dispatchDestroyer: function (options) {
    var _self = this;

    Object.keys(options)
      .forEach(function (option) {
        delete _self.actions[option];
      });
  },
  dispatch: function (options) {
    var action = this.actions[options.action];
    var data = options.data;

    return (action != null)
      ? this.fireAction(action, data)
      : this.noAction(options.action);
  },
  noAction: function (name) {
    console.error('HUBV: No method with the name ' + name);
    return null;
  },
  fireAction: function (actionMethod, data) {
    return actionMethod(data);
  },
};

export default new HubV();
