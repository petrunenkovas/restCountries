<template>
  <div :class="isDarkTheme ? 'country_container dark' : 'country_container'" @click="handleClick">
    <div class="flag">
      <img :src="country.flags.png">
    </div>
    <div class="country_data">
      <h4>{{ country.name.common }}</h4>
      <div class="details">
        <p v-for="detail in details" :key="detail.name"><strong>{{ detail.title }}:</strong> {{ contryDataView(detail.name) }}</p>
      </div>
    </div>
  </div>
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
        return this.country[viewName][0]
      }
      if (viewName === 'population') {
        return Number(this.country[viewName]).toLocaleString()
      }
      return this.country[viewName]
    },
    handleClick (e) {
      this.$router.push('/details/' + this.country.name.common)
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
  height: 300px;
  width: 240px;
  margin: 20px;
  background-color: hsl(0, 0%, 100%);
  text-align: left;
  border-radius: 5px;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
}
.country_container.dark {
  background-color: hsl(209, 23%, 22%);
  box-shadow: 0 0 5px hsl(200, 15%, 8%);
}

img {
  object-fit: cover;
  width: 240px;
  height: 140px;
  padding: 0;
  margin-bottom: 10px;
  border-radius: 5px 5px 0 0;
}
.country_data {
  padding-left: 20px;
}
h4, p {
  margin: 5px;
}
p {
  font-size: small;
}
</style>
