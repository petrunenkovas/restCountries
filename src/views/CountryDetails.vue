<template>
  <div>
    <h1>{{ countryDetails.name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'country-details',
  methods: {
    fetchCountryDetails (countryName) {
        this.$store.dispatch('fetchCountryDetails', countryName)
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

</style>
