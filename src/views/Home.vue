<template>
  <div class="home">
    <div class="content">
      <span>num: {{$store.state.num}}</span>
      <span>getNum: {{$store.getters.getNum}}</span>
      <button @click="$store.commit('incre',1)">增加</button>
      <button @click="$store.commit('minus',1)">减少</button>
      <button @click="$store.dispatch('asyncTncre',2)">异步增加</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {}
};
</script>
<style lang="less" scoped>
</style>
