import Vue from 'nativescript-vue';
import Home from './components/Home.vue';
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { setString, getString, remove } from 'tns-core-modules/application-settings';

// Đặt Vue.config.silent thành false
Vue.config.silent = false;

Vue.registerElement(
  'CheckBox',
  () => CheckBox,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
);

Vue.prototype.$localStorage = {
  setItem(key, value) {
    setString(key, JSON.stringify(value));
  },
  getItem(key) {
    const value = getString(key);
    return value ? JSON.parse(value) : null;
  },
  removeItem(key) {
    remove(key);
  }
};

// Khởi tạo ứng dụng và render
new Vue({
  template: `
    <Frame>
      <Home />
    </Frame>`,
  components: {
    Home
  }
}).$start();