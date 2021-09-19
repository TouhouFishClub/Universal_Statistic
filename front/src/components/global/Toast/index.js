import ToastComponent from './index.vue'

const Toast = {};

// 注册Toast
Toast.install = (Vue, options) => {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const ToastConstructor = Vue.extend(ToastComponent)
  // 生成一个该子类的实例
  const instance = new ToastConstructor();

  const registToast = (msg, duration = 1500, theme = null) => {
    // console.log(duration)

    // 将这个实例挂载在创建的div上
    // 并将此div加入全局挂载点内部
    // 当需要toast时再挂载实例

    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    instance.msg = msg
    instance.duration = duration
    instance.theme = theme
    // console.log(instance)

    instance.show()
    // instance.message = msg;
    // instance.visible = true;
  }

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  Vue.prototype.$toast = registToast

  window.$toast = registToast
}

export default Toast