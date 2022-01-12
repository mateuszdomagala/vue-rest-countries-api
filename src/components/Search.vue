<template>
    <div class="search">
        <font-awesome-icon class="search__icon" icon="search" />
        <input class="search__input" v-model="keyword" @keyup="searchCountry" type="search" placeholder="Search for a country...">
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup(props, { emit }) {
        const keyword = ref('')

        const searchCountry = () => {
            emit('get-keyword', keyword.value)
        }

        return { keyword, searchCountry }
    }
}
</script>

<style lang="scss" scoped>
  .search {
    background-color: var(--box-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    padding: 15px 25px;
    border-radius: 5px;
    color: var(--font-color);
    margin-bottom: 30px;

    &__icon {
        color: inherit;
        margin-right: 15px;
    }

    &__input {
        border: 0;
        background-color: inherit;
        color: inherit;
        width: 80%;
        outline: 0;
    }

    @media (min-width: 660px) {
        width: 400px;
      }
  }
</style>