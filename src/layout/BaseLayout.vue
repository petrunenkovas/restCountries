<template>
  <div :class="isDarkTheme ? 'page dark': 'page'">
    <div :class="isDarkTheme ? 'header_container dark': 'header_container'">
      <div class="header">
        <h1>Where in the world?</h1>
        <span @click="switchTheme"><font-awesome-icon icon="fa-solid fa-moon" /> Dark mode</span>
      </div>
    </div>
    <div :class="isDarkTheme ? 'main_page dark' : 'main_page'">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-layout',
  methods: {
    switchTheme () {
      this.$store.commit('switch_dark_theme')
    }
  },
  computed: {
    isDarkTheme () {
      return this.$store.getters.isDarkTheme
    }
  }
}
</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin: auto;
}
.header_container {
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
  margin-bottom: 3px;
  color: hsl(200, 15%, 8%);
}
.header_container.dark {
  background-color: hsl(209, 23%, 22%);
  box-shadow: 0 0 5px hsl(200, 15%, 8%);
  color: hsl(0, 0%, 100%);
}

.main_page {
  width: 100%;
  background-color: hsl(0, 0%, 98%);
}

.main_page.dark, .page.dark {
  background-color: hsl(207, 26%, 17%);
  color: hsl(0, 0%, 100%);
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
