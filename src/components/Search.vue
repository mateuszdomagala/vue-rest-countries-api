<template>
    <input v-model="keyword" @keyup="searchCountry" type="search" placeholder="Search for a country...">
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
  input {
    background-color: var(--box-color);
    border: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    padding: 15px 25px;
    border-radius: 5px;
    color: var(--font-color);
    margin-bottom: 30px;

    @media (min-width: 660px) {
        width: 400px;
      }
  }
</style>