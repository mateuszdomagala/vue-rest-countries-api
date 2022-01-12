<template>
  <div class="wrapper">
    <div class="flex">
      <search @get-keyword="searchCountry" />
      <filter-by-region @get-region="changeRegion" />
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="countries" class="grid">
      <countries-list :countries="filterCountries" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import CountriesList from '../components/CountriesList.vue'
import FilterByRegion from '../components/FilterByRegion.vue'
import Search from '../components/Search.vue'

export default {
  name: "Home",
  components: {
    CountriesList,
    FilterByRegion,
    Search
  },
  setup() {
    const countries = ref(null)
    const error = ref(null)
    const selectedRegion = ref('')
    const keyword = ref('')

    onMounted(async () => {
      try {
        const res = await fetch('https://restcountries.com/v2/all?fields=name,capital,region,population,flag,alpha3Code')
        countries.value = await res.json()
      } catch(e) {
        error.value = e
      }
    }) 

    const changeRegion = (region) => {
      selectedRegion.value = region
    }

    const searchCountry = (newKeyword) => {
      keyword.value = newKeyword
    }

    const filterCountries = computed(() => {
      return countries.value
        .filter(country => country.name.toLowerCase().indexOf(keyword.value.toLowerCase()) > -1)
        .filter(country => {
          if (selectedRegion.value !== 'Filter by Region') {
            return !country.region.indexOf(selectedRegion.value)
          }
        return countries.value
      })
    })

    return { countries, error, changeRegion, searchCountry, filterCountries }
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

    @media (min-width: 1420px) {
      grid-gap: 60px;
    }
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