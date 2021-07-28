<template>
        <div class="country" v-for="country in country" :key="country.alpha3Code">
            <img class="country__image" :src="country.flag" alt="country flag">
            <div class="country__content">
                <h2>{{ country.name }}</h2>
                <div class="country__details">
                    <div>
                        <p class="country_paragraph"><span class="country__paragraph--bold">Native Name: </span>{{ country.nativeName }}</p>
                        <p class="country_paragraph"><span class="country__paragraph--bold">Population: </span>{{ country.population }}</p>
                        <p class="country_paragraph"><span class="country__paragraph--bold">Region: </span>{{ country.region }}</p>
                        <p class="country_paragraph"><span class="country__paragraph--bold">Sub Region: </span>{{ country.subregion }}</p>
                        <p class="country_paragraph"><span class="country__paragraph--bold">Capital: </span>{{ country.capital }}</p>
                    </div>
                    <div>
                        <p class="country_paragraph"><span class="country__paragraph--bold">Top Level Domain: </span><span v-for="(domain, index) in country.topLevelDomain" :key="index">{{ domain }}</span></p>
                        <p class="country_paragraph"><span class="country__paragraph--bold">Currencies: </span><span v-for="(currency, index) in country.currencies" :key="index">{{ currency.name }}</span></p>
                        <p class="country_paragraph"><span class="country__paragraph--bold">Languages: </span><span v-for="(language, index) in country.languages" :key="index">{{ language.name + ' '}}</span></p>
                    </div>
                </div>      
            </div>
        </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    props: ['name'],
    setup(props) {
        const country = ref(null)
        const error = ref(null)
        
        onMounted(async () => {
            try {
                const res = await fetch(`https://restcountries.eu/rest/v2/name/${props.name}?fields=name;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;flag`)
                country.value = await res.json()
            } catch(e) {
                error.value = e
            }
        })

        return { country, error }
    }   
}
</script>

<style lang="scss" scoped>
  .country {
    max-width: 1440px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
    }

    & > * {
        flex: 1;
    }

    &__image {
        width: 100%;
    }

    &__content {
        @media (min-width: 1024px) {
            align-self: center;
            margin-left: 50px;
        }
    }

    &__details {
        & > div {
            margin-bottom: 50px;
        }

        @media (min-width: 660px) {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0;
        }
    }

    &__paragraph {
        font-size: .9rem;
        line-height: .7;
        color: var(--font-color);
        
        &--bold {
            font-weight: 600;
        }
    }
  }
</style>