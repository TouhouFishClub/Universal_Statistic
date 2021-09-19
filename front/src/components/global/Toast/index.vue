<template>
  <div :class="['toast-container', showToast? 'show': '', toastActive? 'active': '']">
    <div :class="['toast-main', theme ? theme : '']">
      <p v-for="m in msg.split('\n')">{{m}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    data() {
      return {
        showToast: false,
        toastActive: false,
        timerArr: []
      }
    },
    beforeDestroy() {
      this.timerArr.forEach(t => {
        clearTimeout(t)
      })
    },
    methods: {
      show() {
        // console.log(this.msg)
        this.toastActive = false
        this.timerArr.forEach(t => {
          clearTimeout(t)
        })
        /* show toast */
        this.showToast = true
        this.timerArr[0] = setTimeout(() => {
          this.toastActive = true
        }, 10)
        this.timerArr[1] = setTimeout(() => {
          this.toastActive = false
        }, this.duration)
        this.timerArr[2] = setTimeout(() => {
          this.showToast = false
        }, this.duration + 300)
      }
    },
    props: {
      msg: {
        default: 'toast'
      },
      duration: {
        default: 1500
      },
      theme: {
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toast-container {
    display: none;
    width: 100%;
    position: fixed;
    bottom: 100px;
    left: 0;
    text-align: center;
    opacity: 0;
    transition: 300ms;
    z-index: 300000;
    &.show{
      display: block;
    }
    &.active {
      opacity: 1;
    }
    .toast-main {
      max-width: 80%;
      word-break: break-all;
      padding: 10px 20px;
      background: rgba(0, 0, 0, 0.5);
      display: inline-block;
      color: #fff;
      border-radius: 8px;
      font-size: 0.14rem;
      &.light-theme {
        background: rgba(255, 255, 255, 0.9);
        color: #000;
      }
    }
  }
</style>
