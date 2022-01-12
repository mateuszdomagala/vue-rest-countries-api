<template>
        <div class="back">
            <router-link :to="{ name: 'Home'}"><font-awesome-icon icon="arrow-left" />Back</router-link>
        </div>
        <div v-if="country" class="country">
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
                <div class="country__borders">
                    <p class="country__paragraph--bold">Border Countries: </p>
                    <div v-if="borderCountries && borderCountries.length" class="country__borders__links"> 
                        <div v-for="borderDetails in borderCountries" :key="borderDetails">
                            <router-link :to="{ name: 'CountryPage', params: { name: borderDetails.name }}">
                                {{ borderDetails.name }} 
                            </router-link>
                        </div>
                    </div>     
                    <div v-else>No border countries</div>
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
        const alpha3Codes = ref(null)
        const borderCountries = ref(null)
        
        onMounted(async () => {
            try {
                const countryResponse = await fetch(`https://restcountries.com/v2/name/${props.name}?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders,flag`)
                country.value = await countryResponse.json()
                country.value = country.value[0]
                alpha3Codes.value = country.value.borders.join(',')

                const bordersResponse = await fetch(`https://restcountries.com/v2/alpha?codes=${alpha3Codes.value}`)
                borderCountries.value = await bordersResponse.json()
            } catch(e) {
                error.value = e
            }
        })

        return { country, error, borderCountries }
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
            
            @media (min-width: 1024px) {
                width: 450px;
        }
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

    &__borders {
        display: flex;
        flex-direction: column;

        @media (min-width: 1024px) {
            flex-direction: row;
        }

        & p {
            @media (min-width: 1024px) {
                margin: 0 15px 0 0;
            }
        }

        &__links {
            display: flex;
            flex-wrap: wrap;
            gap: 15px 5px;

            & a {
                background-color: var(--box-color);
                box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
                color: var(--font-color);
                padding: 5px 20px;
                text-decoration: none;
            }
        }
    }
  }

  .back {
    max-width: 1440px;
    margin: 0 auto;
    padding: 20px;
    
    & a {
        background-color: var(--box-color);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
        border-radius: 5px;
        color: var(--font-color);
        padding: 10px 35px;
        text-decoration: none;
    }

    & .fa-arrow-left {
        margin-right: 10px;
    }
  }
</style>