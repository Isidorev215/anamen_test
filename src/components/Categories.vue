<template>
  <ul class="categories">
    <li @click="getJokeInCategory(category.name)" v-for="category in categories" :key="category.id" :style="{backgroundColor: category.color}">{{category.name}}</li>
    <li>
      VIEW ALL
      <IconDownArrow class="arrow" />
    </li>
  </ul>
</template>

<script setup>
import IconDownArrow from '../components/icons/IconDownArrow.vue';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import getArrayData from '../composables/getArrayData';
import getDataObject from '../composables/getDataObject';
import { useRouter } from 'vue-router';

  const router = useRouter();

  const { isPending, data: categoriesData, error, load } = getArrayData('https://api.chucknorris.io/jokes/categories');
  load();

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max)
  }

  const getRandomColor = () => {
    const h = getRandomNumber(360);
    const s = getRandomNumber(100 + 1);
    const l = getRandomNumber(100/2 + 1);

    return `hsl(${h}deg, ${s}%, ${l}%)`;
  }

  const categories = computed(() => {
    return categoriesData.value.map(category => {
      return { 
        id: Math.random(),
        name: category, 
        color: getRandomColor()
      }
    })
  })

  const getJokeInCategory = async (category) => {
    const { data, load: getJoke, error: getCategoryError } = getDataObject(`https://api.chucknorris.io/jokes/random?category=${category}`)
    await getJoke();

    if(!getCategoryError.value){
      router.push({name: 'JokeDetails', params: {id: data.value.id} })
    }else{
      //subsequent error handling
      alert(getCategoryError.value.response.data.message)
    }
  }

</script>

<style lang="scss">
  ul.categories{
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-gap: 15px;
    padding: 0;

    li{
      padding: 13px 0px;
      color: white;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      border-radius: 3px;
      text-align: center;
      cursor: pointer;
      

      &:last-child{
        background: none;
        color: var(--vt-c-brown);
        border: 2px solid var(--vt-c-brown);
        position: relative;
        
        &:hover{
          background: var(--vt-c-gray);
          color: white;
          border: 1px solid transparent;
        }
        .arrow{
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          font-size: 20px;
          font-weight: 700;
          width: 30px;
          height: 30px;
        }
      }
    }
  }

</style>