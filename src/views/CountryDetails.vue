<template>
  <div class="details">
    <div class="details_header">
      <router-link class="backToMain" to="/">&#8592; Back</router-link>
    </div>
    <div class="details_container">
      <img :src="countryDetails.flags.png">
      <div class="details_info">
        <h2>{{ countryDetails.name.common }}</h2>
        <p
        v-for="detail in details"
        :key="detail.name"
        >
          <strong>{{ detail.title }}:</strong>
          {{ contryDataView(detail.name) }}
        </p>
        <div class="b">

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
      details: [
        {name: 'nativeName', title: 'Native Name'},
        {name: 'population', title: 'Population'},
        {name: 'region', title: 'Region'},
        {name: 'subRegion', title: 'Sup Region'},
        {name: 'capital', title: 'Capital'},
        {name: 'topLevelDomain', title: 'Top Level Domain'},
        {name: 'currencies', title: 'Currencies'},
        {name: 'languages', title: 'Languages'}
      ]
    }
  },
  methods: {
    fetchCountryDetails (countryName) {
      this.$store.dispatch('fetchCountryDetails', countryName)
    },
    contryDataView (viewName) {
      if (viewName === 'capital') {
        return this.countryDetails[viewName][0]
      }
      if (viewName === 'population') {
        return Number(this.countryDetails[viewName]).toLocaleString()
      }
      if (viewName === 'currencies') {
        let currencies = Object.values(this.countryDetails[viewName]).map((currency) => currency.name)
        return currencies.join(', ')
      }
      if (viewName === 'languages') {
        let languages = Object.values(this.countryDetails[viewName])
        return languages.join(', ')
      }
      if (viewName === 'nativeName') {
        let nativeNames = Object.values(this.countryDetails.name[viewName]).map((name) => name.official)
        return nativeNames.join(', ')
      }
      return this.countryDetails[viewName]
    }
  },
  computed: {
    countryDetails () {
      return this.$store.getters.countryDetails
    }
  },
  mounted () {
    this.fetchCountryDetails(this.$route.params.countryName)
  }
}
</script>

<style scoped>
.details {
  background-color: hsl(0, 0%, 100%);
}
.details_header {
  margin: 60px;
  width: fit-content;
}
.backToMain {
  text-decoration: none;
  color: black;
  width: 50px;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
  padding: 5px 15px;
  border-radius: 5px;
}
.details_container {
  margin: auto;
  display: flex;
  justify-content:flex-start;
  margin: 0;
}
.details_info {
  text-align: left;
  margin:  0 60px;
}
img {
  object-fit: cover;
  width: 480px;
  height: 320px;
  padding: 0;
  margin:  0 60px;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
}
</style>
