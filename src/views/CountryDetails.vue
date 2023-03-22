<template>
  <div :class="isDarkTheme ? 'details dark': 'details'">
    <div class="details_header">
      <router-link :class="isDarkTheme ? 'button dark': 'button'" to="/">&#8592; Back</router-link>
    </div>
    <div class="details_container">
      <img :class="isDarkTheme ? 'dark' : ''" :src="countryDetails.flags.png">
      <div class="details_info">
        <h2>{{ countryDetails.name.common }}</h2>
        <div class="details_info_container">
          <p
          v-for="detail in details"
          :key="detail.name"
          >
            <strong>{{ detail.title }}:</strong>
            {{ contryDataView(detail.name) }}
          </p>
        </div>
        <div class="borders_container" v-if="countryDetails.borders.length > 0">
          <p class="borders_header"><strong>Border Contries: </strong></p>
          <router-link
          :class="isDarkTheme ? 'button dark': 'button'"
          v-for="border in countryDetails.borders"
          :key="border"
          :to="'/details/' + countryNameByCode(border)"
          >
          {{ countryNameByCode(border) }}
          </router-link>
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
        {name: 'subregion', title: 'Sup Region'},
        {name: 'capital', title: 'Capital'},
        {name: 'tld', title: 'Top Level Domain'},
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
      if (viewName === 'tld') {
        return this.countryDetails[viewName].join(', ')
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
    },
    countryNameByCode (code) {
      let country = this.$store.getters.countries.find((country) => country.cca3 === code)
      return country.name.common
    }
  },
  computed: {
    countryDetails () {
      return this.$store.getters.countryDetails
    },
    isDarkTheme () {
      return this.$store.getters.isDarkTheme
    }
  },
  mounted () {
    this.$store.dispatch('initApp')
    this.fetchCountryDetails(this.$route.params.countryName)
  },
  updated () {
    this.fetchCountryDetails(this.$route.params.countryName)
  }
}
</script>

<style scoped>
.details {
  background-color: hsl(0, 0%, 100%);
  height: 81vh;
}
.details.dark {
  background-color: hsl(207, 26%, 17%);
}
.details_header {
  margin: 55px;
  width: fit-content;
}
.button {
  text-decoration: none;
  color: black;
  width: fit-content;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
  padding: 5px 15px;
  border-radius: 5px;
  margin: 3px 5px;
}
.button.dark {
  background-color: hsl(209, 23%, 22%);
  box-shadow: 0 0 5px hsl(200, 15%, 8%);
  color: hsl(0, 0%, 100%);
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
  flex-grow: 3;
}
img {
  object-fit: cover;
  width: 480px;
  height: 320px;
  padding: 0;
  margin:  0 60px;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
}
img.dark {
  box-shadow: 0 0 5px hsl(200, 15%, 8%);
}
.details_info_container {
  display: flex;
  flex-direction: column;
  height: 170px;
  margin: 20px 0;
  flex-wrap: wrap;
  align-content: space-between;
}
p {
  margin: 0;
  padding: 5px 0;
}
.borders_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: safe space-evenly;
  height: fit-content;
}

@media (max-width: 700px) {
.details_container {
  flex-direction: column;
}

.details_info_container {
  height: fit-content;
  margin: 20px 0;
  flex-wrap: nowrap;
  align-content: space-between;
}

img {
  object-fit: cover;
  width: 77%;
  height: auto;
  margin: 0 25px;
}
.details_info {
  margin: 0 25px;
}
.details_header {
  margin: 25px;
}
}
</style>
