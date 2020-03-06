<template>
  <div class="game">
    <div>{{$store.state.Info.Count}}</div>
    <a-button @click="$store.commit('Info/Increment')">Count++</a-button>
    <a-button @click="$store.dispatch('Info/Increment')">Count++ Async</a-button>
  </div>
</template>

<script>
export default {
  mounted() {}
};
</script>

<style scope>
div.game {
  font-size: 3rem;
  margin: 2rem;
}
</style>