<template>
  <div class="container">
    <Categories />
    
    <div v-if="!isPending" class="jokes-list">
      <JokeCard v-for="joke in limitedJokes" :key="joke.id" :joke="joke" />
    </div>

    <div class="pagination">
      <button>
        VIEW MORE
        <IconDownArrow class="arrow" />
      </button>
    </div>
  </div>
</template>

<script setup>
import IconDownArrow from '../components/icons/IconDownArrow.vue';
import Categories from '../components/Categories.vue'
import JokeCard from '../components/JokeCard.vue';
import getDataObject from '../composables/getDataObject';
import { computed } from '@vue/runtime-core';

const { isPending, error, data: jokes } = getDataObject('https://api.chucknorris.io/jokes/search?query=all');

const limitedJokes = computed(() => {
  return jokes.value.result.splice(0, 6)
})

</script>

<style lang="scss">
  .container{
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-gap: 50px;
  }
  .jokes-list{
    border-top: 2px solid var(--vt-c-gray);
    padding: 50px 0px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
  .pagination{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button{
      width: 25%;
      background: none;
      color: var(--vt-c-brown);
      border: 1px solid var(--vt-c-brown);
      position: relative;
      padding: 20px 0px;
      font-size: 18px;
      font-weight: 600;
      text-transform: uppercase;
      border-radius: 3px;
      text-align: center;
      cursor: pointer;

      &:hover{
        background-color: white;
        color: var(--vt-c-gray);
        border: 1px solid gray;
      }

      .arrow{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 20px;
        font-weight: 700;
        width: 30px;
        height: 30px;
      }
    }
  }
</style>