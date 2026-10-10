<template>
  <div>
    <div class="head">
      <div class="search" :class="{dark: isDarkTheme}">
        <font-awesome-icon class="icon" icon="fa-solid fa-magnifying-glass" />
        <input v-model="searchState" type="search" aria-label="Search countries" placeholder="Search for a country...">
      </div>
      <select v-model="selectedRegion" class="filter" :class="{dark: isDarkTheme}" aria-label="Filter countries by region">
        <option value="all">All regions</option>
        <option v-for="region in getAllRegions" :key="region" :value="region">{{ region }}</option>
      </select>
    </div>
    <p v-if="loading" class="status" role="status">Loading countries...</p>
    <p v-else-if="error" class="status" role="alert">Unable to load countries. Please try again later.</p>
    <div class="countriesList">
      <country-card
      v-for="country in searchedAndFilteredCountries"
      :key="country.cca3"
      :country="country"
      />
    </div>
  </div>
</template>

<script>
import countryCard from '../components/CountryCard.vue'

export default {
  name: 'countries-list',
  components: { countryCard },
  data () {
    return {
      searchState: '',
      selectedRegion: 'all',
      loading: false,
      error: false
    }
  },
  mounted () {
    this.initApp()
  },
  methods: {
    initApp () {
      this.loading = true
      this.$store.dispatch('initApp')
        .then(() => { this.loading = false })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    }
  },
  computed: {
    countries () {
      return this.$store.getters.countries
    },
    getAllRegions () {
      let uniqueRegions = new Set()
      this.countries.forEach(country => {
        if (country.region) uniqueRegions.add(country.region)
      })
      return Array.from(uniqueRegions).sort()
    },
    searchedCountries () {
      if (this.searchState) {
        return this.countries.filter(country => country.name.common.toLowerCase().includes(this.searchState.toLowerCase()))
      }
      return this.countries
    },
    searchedAndFilteredCountries () {
      if (this.selectedRegion !== 'all') {
        return this.searchedCountries.filter(country => country.region === this.selectedRegion)
      }
      return this.searchedCountries
    },
    isDarkTheme () {
      return this.$store.getters.isDarkTheme
    }
  }
}
</script>

<style scoped>

.head {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  width: calc(100% - 48px);
  align-items: center;
  margin: auto;
}
.search, .filter {
  margin: 24px 0;
  background-color: hsl(0, 0%, 100%);
  padding: 10px 30px;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
}
.search.dark, .filter.dark {
  background-color: hsl(209, 23%, 22%);
  box-shadow: 0 0 5px hsl(200, 15%, 8%);
}
.search {
  display: flex;
  justify-content:flex-start;
  align-items: center;
  border-radius: 2px;
  width: 300px;
}

input, select {
  border: 0;
  color: inherit;
  background-color: inherit;
}

input:focus, select:focus {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.icon {
  margin-right: 14px;
}

.countriesList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 32px;
  max-width: 1200px;
  padding: 16px 24px 64px;
  margin: auto;
}
.status { max-width: 1200px; margin: 24px auto; text-align: left; padding: 0 24px; }

@media (max-width: 700px) {
  .head {
    width: calc(100% - 48px);
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .search { width: 100%; box-sizing: border-box; margin-bottom: 0; }
  .filter { margin-top: 16px; }
  .countriesList { gap: 24px; }
}
</style>
