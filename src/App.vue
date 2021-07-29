<template>
  <Header />
  <router-view :key="$route.path" />
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: { Header }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
  :root {
    --font-color: hsl(200, 15%, 8%);
    --background-color: hsl(0, 0%, 98%);
    --box-color: hsl(0, 0%, 100%);
  }

  [data-theme="dark"] {
    --font-color: hsl(0, 0%, 100%);
    --box-color: hsl(209, 23%, 22%);
    --background-color: hsl(207, 26%, 17%);
  }

  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Nunito Sans', sans-serif;
    color: var(--font-color);
    margin: 0 auto;
    background-color: var(--background-color);
  }
</style>
