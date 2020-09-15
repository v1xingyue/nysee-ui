<template>
  <section>
    <div class="centertext">
      <a-statistic title="总卡片数" :value="total" style="margin-right: 50px" />
      <a-statistic title="已使用卡片数" :value="used" />
      <a-statistic title="节点数" :value="nodeCount" />
      <a-statistic title="项目数" :value="projectCount" />
      <a-statistic title="软件版本" :value="version" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      used: 0,
      nodeCount: 0,
      projectCount: 0,
      version: ""
    };
  },
  created() {
    this.$request.get("/basic/info").then(res => {
      if (res) {
        this.total = res.data.total;
        this.used = res.data.used;
        this.nodeCount = res.data.nodeCount;
        this.projectCount = res.data.projectCount;
        this.version = res.data.version;
      }
    });
  }
};
</script>

<style>
.centertext {
  padding: 3rem;
}
</style>