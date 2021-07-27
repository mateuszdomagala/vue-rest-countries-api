<template>
    <header class="header">
        <div class="header__content">
            <h1 class="header__title">Where in the world?</h1>
            <button class="header__button" @click="toggleTheme">
                <font-awesome-icon v-if="!darkMode" :icon="['far', 'moon']" />
                <font-awesome-icon v-else :icon="['fas', 'moon']" />
                <span class="header__button__text">Dark Mode</span>
            </button>
        </div>
    </header>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const theme = ref(null)
    const darkMode = ref(null)
  
    const toggleTheme = () => {
      if (theme.value == "dark") {
        theme.value = "light"
        document.documentElement.setAttribute("data-theme", "light")
        localStorage.setItem("theme", "light")
      } else {
        theme.value = "dark"
        document.documentElement.setAttribute("data-theme", "dark")
        localStorage.setItem("theme", "dark")
      }
      darkMode.value = !darkMode.value
    }

    onMounted(() => {
      theme.value = localStorage.getItem('theme')
      if (theme.value) {
        document.documentElement.setAttribute("data-theme", theme.value)
        if (theme.value == "dark") {
          darkMode.value = true;
        } 
      }
    })

    return { theme, toggleTheme, darkMode }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background-color: var(--box-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    margin-bottom: 20px;

    &__content {
        max-width: 1440px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__title {
        margin: 0;
        color: var(--font-color);
        font-size: 1.2rem;

        @media (min-width: 660px) {
            font-size: 1.7rem;
        }
    }

    &__button {
        border: none;
        background-color: var(--box-color);
        color: var(--font-color);
        margin: 0;
        padding: 0;
        font-size: .9rem;
        cursor: pointer;

        @media (min-width: 660px) {
            font-size: 1rem;
        }

        &__text {
            margin-left: 5px;
        }
    }
  }
</style>