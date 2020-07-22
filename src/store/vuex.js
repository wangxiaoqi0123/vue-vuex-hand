import Vue from 'vue';
class Store {
  constructor(options) {
    // state
    this.vm = new Vue({
      // 实现数据双向绑定
      data: {
        state: options.state
      }
    })

    // getters
    let getters = options.getters || {} // 传入的getters
    this.getters = {} // 当前实例getters
    // 传入的getters复制到实例上
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state)
        }
      })
    })

    // mutations
    let mutations = options.mutations || {} // 传入的mutations
    this.mutations = {} // 当前实例mutations
    // 传入的mutations复制到实例上
    Object.keys(mutations).forEach(mutationName => {
      this.mutations[mutationName] = payload => {
        mutations[mutationName](this.state, payload)
      }
    })

    // actions
    let actions = options.actions || {} // 传入的actions
    this.actions = {}
    // 传入的actions复制到实例上
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] = payload => {
        actions[actionName](this, payload)
      }
    })

  }

  // 创建调用mutations内方法的函数
  commit = (method, payload) => {
    // 注意：使用箭头函数，避免dispatch 嵌套使用时 this 指向问题
    this.mutations[method](payload)
  }

  // 创建调用actions内方法的函数
  dispatch = (method, payload) => {
    // 注意：使用箭头函数，避免dispatch 嵌套使用时 this 指向问题
    this.actions[method](payload)
  }

  // 创建并暴露state引用
  get state() {
    return this.vm.state
  }
}
const install = (Vue) => {
  Vue.mixin({
    beforeCreate() {
      // 备注：组件渲染是从根节点向子节点渲染
      // 使每个组件上都存在根节点的store
      if (this.$options && this.$options.store) {
        // 从根节点上拿到store
        this.$store = this.$options.store
      } else {
        // 从父组件上查找
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}
export default {
  install,
  Store
}