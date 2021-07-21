<template>
  <div class="wrapper">
    <div class="flex">
      <div>Search</div>
      <filter-by-region @get-region="changeRegion" />
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="countries">
      <div v-if="countries" class="grid">
        <countries-list :countries="filterByRegion" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import CountriesList from '../components/CountriesList.vue'
import FilterByRegion from '../components/FilterByRegion.vue'

export default {
  name: "Home",
  components: {
    CountriesList,
    FilterByRegion
  },
  setup() {
    const countries = ref(null)
    const error = ref(null)
    const selectedRegion = ref('')

    onMounted(async () => {
      try {
        const res = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;flag')
        countries.value = await res.json()
      } catch(e) {
        error.value = e
      }
    }) 

    const changeRegion = (region) => {
      selectedRegion.value = region
    }

    const filterByRegion = computed( () => {
        
        if (countries.value && selectedRegion.value != 'Filter by Region') {
            return countries.value
              .filter(country => !country.region.indexOf(selectedRegion.value))
        } else {
            return countries.value
        }
    })


    return { countries, error, changeRegion, filterByRegion }
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
  
  .flex {
    display: flex;
    flex-direction: column;

    @media (min-width: 660px) {
        flex-direction: row;
        justify-content: space-between;
      }
  }
</style>