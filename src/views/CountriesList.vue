<template>
  <div>
    <div class="head">
      <div class="search">
        <font-awesome-icon class="icon" icon="fa-solid fa-magnifying-glass" />
        <input v-model="searchState" type="text" placeholder="Search for a country...">
      </div>
      <select class="filter" v-model="selectedRegion">
        <option>Filter by Region</option>
        <option v-for="region in getAllRegions">{{ region }}</option>
      </select>
    </div>
    <div class="countriesList">
      <country-card
      v-for="country in searchedAndFilteredCountries"
      :key="country.demonym"
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
      selectedRegion: 'all'
    }
  },
  mounted () {
    this.initApp()
  },
  methods: {
    initApp () {
      this.$store.dispatch('initApp')
    }
  },
  computed: {
    countries () {
      return this.$store.getters.countries
    },
    getAllRegions () {
      let uniqueRegions = new Set()
      this.countries.forEach((country => uniqueRegions.add(country.region)))
      console.log(uniqueRegions);
      return uniqueRegions
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
    }
  }
}
</script>

<style scoped>

.head {
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  margin: auto;
}
.search, .filter {
  margin: 20px;
  background-color: hsl(0, 0%, 100%);
  padding: 10px 30px;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
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
}

input:focus {
  outline: none;
}

icon {
  margin: 10px;
}

.countriesList {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
