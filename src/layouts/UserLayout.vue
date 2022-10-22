<template>
  <div class="user-layout">
    <Header />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/user/Header.vue";
export default {
  name: "UserLayout",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
.user-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content-wrapper {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
    padding: 0px 20px;
  }
}
</style>
