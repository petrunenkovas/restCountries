<template>
  <div class="contry_container">
    <div class="flag">
      <img :src="country.flags.png">
    </div>
    <div class="country_data">
      <h3>{{ country.name.common }}</h3>
      <div class="details">
        <p v-for="detail in details" :key="detail.name"><strong>{{ detail.title }}:</strong> {{ country[detail.name] }}</p>
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
  }
}
</script>

<style scoped>

.contry_container {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 300px;
}

.img {
  width: 100%;
  height: 40%;
  padding: 0;
  margin: 0;

}
</style>
