<template>
  <router-link :to="'/details/' + encodeURIComponent(country.name.common)" class="country_container" :class="{dark: isDarkTheme}">
    <div class="flag">
      <img :src="country.flags && (country.flags.svg || country.flags.png)" :alt="'Flag of ' + country.name.common">
    </div>
    <div class="country_data">
      <h4>{{ country.name.common }}</h4>
      <div class="details">
        <p v-for="detail in details" :key="detail.name"><strong>{{ detail.title }}:</strong> {{ contryDataView(detail.name) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'country-card',

  props: {
    country: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      details: [
        { name: 'population', title: 'Population' },
        { name: 'region', title: 'Region' },
        { name: 'capital', title: 'Capital' }
      ]
    }
  },

  methods: {
    contryDataView (viewName) {
      if (viewName === 'capital') {
        return this.country.capital && this.country.capital.length ? this.country.capital[0] : '—'
      }
      if (viewName === 'population') {
        return this.country.population == null ? '—' : Number(this.country.population).toLocaleString()
      }
      return this.country[viewName] || '—'
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

.country_container {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  min-width: 0;
  background-color: hsl(0, 0%, 100%);
  text-align: left;
  border-radius: 5px;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.country_container:hover { transform: translateY(-4px); box-shadow: 0 6px 16px hsl(0, 0%, 75%); }
.country_container:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
.country_container.dark {
  background-color: hsl(209, 23%, 22%);
  box-shadow: 0 0 5px hsl(200, 15%, 8%);
}

img {
  object-fit: cover;
  width: 100%;
  height: 140px;
  padding: 0;
  margin-bottom: 10px;
  border-radius: 5px 5px 0 0;
}
.country_data {
  padding: 0 20px 20px;
}
h4, p {
  margin: 5px;
}
p {
  font-size: small;
}
</style>
