import Vue from 'vue';
import HubV from '../lib';

test('HubV can install correctly and can be called from Vue instance', () => {
  Vue.use(HubV);

  const vm = new Vue({});

  expect(typeof vm.$hubv).toBe('object');
});

test('HubV can update parent state from child', () => {
  Vue.use(HubV);

  const vm = new Vue({
    data() {
      return {
        msg: 'wow',
      };
    },
    methods: {
      capMsg() {
        this.msg = this.msg.toUpperCase();
      },
    },
    created() {
      const { capMsg } = this;
      this.$hubv.dispatchBuilder({ capMsg });
    },
    destroyed() {
      const { capMsg } = this;
      this.$hubv.dispatchDestroyer({ capMsg });
    },
  });

  expect(vm.msg).toBe('wow');

  vm.$hubv.dispatch({ action: 'capMsg' });
  expect(vm.msg).toBe('WOW');

  vm.$hubv.dispatch({ action: 'doesnotexist' });
  expect(vm.msg).toBe('WOW');

  vm.$destroy();
});
