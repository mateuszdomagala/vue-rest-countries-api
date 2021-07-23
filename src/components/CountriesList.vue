<template>
    <div v-for="country in countries" :key="country.alpha3Code">
        <router-link :to="{ name: 'CountryPage', params: { name: country.name }}">
            <country :country="country"/>
        </router-link>
    </div>
</template>

<script>
import Country from '../components/Country.vue'

export default {
    name: "CountriesList",
    props: ['countries'],
    components: { Country }
}
</script>

<style lang="scss" scoped>
  a {
      text-decoration: none;
      color: var(--font-color);
  }
</style>