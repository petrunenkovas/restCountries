<template>
  <div class="page" :class="{dark: isDarkTheme}">
    <div class='header_container' :class="{dark: isDarkTheme}">
      <div class="header">
        <h1>Where in the world?</h1>
        <button class="theme_toggle" type="button" :aria-pressed="isDarkTheme ? 'true' : 'false'" @click="switchTheme"><font-awesome-icon icon="fa-solid fa-moon" /> Dark mode</button>
      </div>
    </div>
    <div class="main_page" :class="{dark: isDarkTheme}">
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
  max-width: 1200px;
  width: calc(100% - 48px);
  align-items: center;
  margin: auto;
  min-height: 80px;
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
  min-height: calc(100vh - 80px);
  background-color: hsl(0, 0%, 98%);
}

.main_page.dark, .page.dark {
  background-color: hsl(207, 26%, 17%);
  color: hsl(0, 0%, 100%);
}

h1, .theme_toggle {
  font-weight: bolder;
}
h1 {
  font-weight: 800;
}
.theme_toggle {
  font-weight: 600;
  color: inherit;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
}
.theme_toggle:hover { background-color: hsl(0, 0%, 94%); }
.dark .theme_toggle:hover { background-color: hsl(207, 26%, 17%); }
.theme_toggle:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }

@media (max-width: 500px) {
.header {
  font-size: small;
}
h1 { font-size: 1.2em; }
.theme_toggle { white-space: nowrap; }
}
</style>
