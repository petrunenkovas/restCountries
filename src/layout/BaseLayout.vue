<template>
  <div>
    <div class="header_container">
      <div class="header">
        <h1>Where in the world?</h1>
        <span><font-awesome-icon icon="fa-solid fa-moon" /> Dark mode</span>
      </div>
    </div>
    <div class="main_page">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-layout'
}
</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin: auto;
  background-color: hsl(0, 0%, 100%);
}

.header_container {
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
  margin-bottom: 3px;
}

.main_page {
  width: 100%;
  background-color: hsl(0, 0%, 98%);
}

h1, span {
  font-weight: bolder;
}
h1 {
  font-weight: 800;
}
span {
  font-weight: 600;
}
</style>
