<template>
    <div v-for="country in countries" :key="country.alpha3Code">
        <country :country="country"/>
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