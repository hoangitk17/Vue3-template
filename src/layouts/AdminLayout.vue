<template>
  <div class="admin-layout">
    <Header />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/admin/Header.vue";
export default {
  name: "AdminLayout",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
.admin-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0px 20px;
  }

  .ct-button-blue,
  .ct-button-gray {
    font-weight: bold;
  }
}
</style>
