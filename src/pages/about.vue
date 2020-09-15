<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item>About</a-breadcrumb-item>
    </a-breadcrumb>
    <a-card class="centertext">
      <p>这里是 Libra 认证系统配置中心</p>
      <p>请</p>
      <p>一定</p>
      <p>一定</p>
      <p>小心谨慎操作....</p>
      <p></p>
      <p>{{hnsAddr}}</p>
    </a-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      hnsAddr: "hs1qq9e06lkzhjccy7a6nqds7xu7a7qafx68s5uc0c"
    };
  }
};
</script>

<style scoped>
.centertext {
  margin-top: 5rem;
  text-align: center;
  margin-right: 8rem;
  margin-left: 3rem;
}
</style>