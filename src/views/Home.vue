<template>
  <div class="wrapper">
    <div v-if="error">{{ error }}</div>
    <div v-if="countries">
      <div v-if="countries" class="grid">
        <countries-list :countries="countries" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import CountriesList from '../components/CountriesList.vue'

export default {
  name: "Home",
  components: {
    CountriesList
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
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 60px 20px;
    justify-items: center;
  }
</style>