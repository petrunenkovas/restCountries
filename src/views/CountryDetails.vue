<template>
  <div class="details" :class="{dark: isDarkTheme}">
    <div class="details_header">
      <router-link class="button" :class="{dark: isDarkTheme}" to="/">&#8592; Back</router-link>
    </div>
    <p v-if="loading" class="status" role="status">Loading country...</p>
    <p v-else-if="error" class="status" role="alert">Unable to load this country. Please try again later.</p>
    <div v-else-if="countryDetails" class="details_container">
      <img :src="countryDetails.flags && (countryDetails.flags.svg || countryDetails.flags.png)" :alt="'Flag of ' + countryDetails.name.common">
      <div class="details_info">
        <h2>{{ countryDetails.name.common }}</h2>
        <div class="details_info_container">
          <p v-for="detail in details" :key="detail.name">
            <strong>{{ detail.title }}:</strong> {{ countryDataView(detail.name) }}
          </p>
        </div>
        <div v-if="countryDetails.borders && countryDetails.borders.length" class="borders_container">
          <p class="borders_header"><strong>Border Countries:</strong></p>
          <template v-for="border in countryDetails.borders">
            <router-link
              v-if="countryNameByCode(border)"
              :key="border"
              class="button"
              :class="{dark: isDarkTheme}"
              :to="'/details/' + encodeURIComponent(countryNameByCode(border))"
            >{{ countryNameByCode(border) }}</router-link>
            <span v-else :key="border" class="border_code">{{ border }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'country-details',
  data () {
    return {
      countryDetails: null,
      loading: false,
      error: false,
      requestId: 0,
      details: [
        {name: 'nativeName', title: 'Native Name'},
        {name: 'population', title: 'Population'},
        {name: 'region', title: 'Region'},
        {name: 'subregion', title: 'Subregion'},
        {name: 'capital', title: 'Capital'},
        {name: 'tld', title: 'Top Level Domain'},
        {name: 'currencies', title: 'Currencies'},
        {name: 'languages', title: 'Languages'}
      ]
    }
  },
  computed: {
    isDarkTheme () {
      return this.$store.getters.isDarkTheme
    },
    countries () {
      return this.$store.getters.countries
    }
  },
  watch: {
    '$route.params.countryName': 'fetchCountryDetails'
  },
  mounted () {
    this.$store.dispatch('initApp').catch(() => {})
    this.fetchCountryDetails(this.$route.params.countryName)
  },
  beforeDestroy () {
    this.requestId++
  },
  methods: {
    fetchCountryDetails (countryName) {
      const requestId = ++this.requestId
      this.countryDetails = null
      this.loading = true
      this.error = false
      this.$store.dispatch('fetchCountryDetails', countryName)
        .then(country => {
          if (requestId !== this.requestId) return
          if (!country || !country.name) throw new Error('Country data missing')
          this.countryDetails = country
          this.loading = false
        })
        .catch(() => {
          if (requestId !== this.requestId) return
          this.error = true
          this.loading = false
        })
    },
    countryDataView (viewName) {
      const country = this.countryDetails
      if (viewName === 'nativeName') {
        const names = country.name && country.name.nativeName
        return names ? Object.values(names).map(name => name.official).join(', ') : '—'
      }
      const value = country[viewName]
      if (value == null || (Array.isArray(value) && !value.length)) return '—'
      if (viewName === 'population') return Number(value).toLocaleString()
      if (viewName === 'currencies') return Object.values(value).map(currency => currency.name).join(', ') || '—'
      if (viewName === 'languages') return Object.values(value).join(', ') || '—'
      if (Array.isArray(value)) return value.join(', ')
      return value || '—'
    },
    countryNameByCode (code) {
      const country = this.countries.find(country => country.cca3 === code)
      return country && country.name ? country.name.common : null
    }
  }
}
</script>

<style scoped>
.details {
  min-height: calc(100vh - 90px);
  padding: 48px max(24px, calc((100% - 1200px) / 2));
  background-color: hsl(0, 0%, 98%);
  box-sizing: border-box;
}
.details.dark { background-color: hsl(207, 26%, 17%); }
.details_header { margin-bottom: 56px; }
.button, .border_code {
  display: inline-block;
  text-decoration: none;
  color: inherit;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 2px 8px hsl(0, 0%, 80%);
  padding: 8px 18px;
  border-radius: 5px;
  margin: 4px 8px 4px 0;
}
.button.dark, .dark .border_code {
  background-color: hsl(209, 23%, 22%);
  box-shadow: 0 2px 8px hsl(200, 15%, 8%);
}
.button:hover { transform: translateY(-2px); }
.button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
.details_container { display: flex; align-items: center; gap: 64px; }
.details_container img {
  object-fit: cover;
  width: min(42%, 500px);
  height: auto;
  max-height: 340px;
  box-shadow: 0 2px 10px hsl(0, 0%, 80%);
}
.dark .details_container img { box-shadow: 0 2px 10px hsl(200, 15%, 8%); }
.details_info { text-align: left; flex: 1; min-width: 0; }
.details_info h2 { margin-top: 0; }
.details_info_container { columns: 2; column-gap: 32px; margin: 24px 0 32px; }
.details_info_container p { break-inside: avoid; margin: 0 0 12px; }
.borders_container { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; }
.borders_header { margin-right: 12px; }
.status { text-align: left; }
@media (max-width: 800px) {
  .details { padding: 28px 24px 64px; }
  .details_header { margin-bottom: 48px; }
  .details_container { flex-direction: column; align-items: stretch; gap: 36px; }
  .details_container img { width: 100%; max-height: none; }
  .details_info_container { columns: 1; }
}
</style>
