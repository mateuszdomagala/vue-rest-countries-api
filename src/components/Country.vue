<template>
    <div class="box">
        <img :src="country.flag" alt="country flag">
        <div class="box__content">
            <h2 class="box__title">{{ country.name }}</h2>
            <p class="box__paragraph"><span class="box__paragraph--bold">Population: </span>{{ country.population }}</p>
            <p class="box__paragraph"><span class="box__paragraph--bold">Region: </span>{{ country.region }}</p>
            <p class="box__paragraph"><span class="box__paragraph--bold">Capital: </span>{{ country.capital }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Country",
    props: ['country']
}
</script>

<style lang="scss" scoped>
  .box {
    width: 300px;
    background-color: var(--box-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;

    img {
        width: 100%;
        min-height: 200px;
        max-height: 200px;
        object-fit: cover;
    }

    &__content {
        padding: 0 25px 30px 25px;
    }

    &__title {
        font-size: 1.2rem
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