<template>
  <a-select style="width: 100%" @change="handleChange" v-model="value">
    <a-select-option v-for="t in authTypes" :key="t" :value="t">{{t}}</a-select-option>
  </a-select>
</template>
<script>
export default {
  props: {
    value: String
  },
  name: "AuthProtocal",
  data() {
    return {
      authTypes: ["PIN", "OTP", "LDAP", "LDAP_OTP", "PIN_OTP"]
    };
  },
  methods: {
    handleChange() {
      this.$emit("input", this.value);
    }
  }
};
</script>

<style>
</style>