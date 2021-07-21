<template>
    <div class="dropdown" @click="changeRegion" tabindex="0" @blur="closeDropdownList">
          <span v-if="selectedRegion">{{ selectedRegion }}</span>
          <ul class="dropdown__list" v-show="dropdownList">
            <li class="dropdown__list-item" v-for="option in options" :key="option" @click="filteredRegions(option)">{{ option }}</li>
          </ul>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup(props, { emit }) {
        const selectedRegion = ref('Filter by Region')
        const dropdownList = ref(null)
        const options = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'All']

        const changeRegion = () => {
            emit('get-region', selectedRegion.value)
            dropdownList.value = !dropdownList.value
        }

        const closeDropdownList = () => {
            dropdownList.value = false
        }
        
        const filteredRegions = (option) => {
            if (option === 'All') {
                    selectedRegion.value = 'Filter by Region'
                    return;
                }
            selectedRegion.value = option
        }

        return { selectedRegion, dropdownList, options, changeRegion, closeDropdownList, filteredRegions }
    }
}
</script>


<style lang="scss" scoped>
  .dropdown {
    position: relative;
    width: 200px;
    background-color: var(--box-color);
    color: var(--font-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    padding: 15px 25px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;

    &__list {
      position: absolute;
      width: 100%;
      background-color: var(--box-color);
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
      padding: 15px 25px;
      top: 80%;
      left: 0;
      list-style-type: none;  

      &-item {
        margin: 10px 0;  
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 22px;
      right: 15px;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: var(--font-color) transparent transparent transparent;
    }
  }
</style>