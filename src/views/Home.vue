<template>
  <div class="wrapper">
    <div v-if="error">{{ error }}</div>
    <div v-if="countries">
      <div v-for="country in countries" :key="country.alpha3Code">
        {{ country.name }}
        {{ country.population }}
        {{ country.region }}
        {{ country.capital }}
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: "Home",
  components: {
  },
  setup() {
    const countries = ref(null)
    const error = ref(null)

    onMounted(async () => {
      try {
        const res = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;flag')
        countries.value = await res.json()
      } catch(e) {
        error.value = e
      }
    }) 

    return { countries, error }
  }
};
</script>

<style lang="scss" scoped>
  .wrapper {
    max-width: 1440px;
    margin: 0 auto;
    padding: 20px;
  }
</style>
