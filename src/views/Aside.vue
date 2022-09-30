<template>
  <aside class="aside">
    <h3>THE TOP 10 JOKES THIS WEEK</h3>
    <ul v-if="!isPending">
      <li v-for="top10 in limitedJokes" :key="top10.id">
        <router-link :to="{name: 'JokeDetails', params: {id: top10.id} }" >{{top10.value}}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import getDataObject from '../composables/getDataObject';
import { computed } from '@vue/runtime-core';

const { isPending, error, data: jokes } = getDataObject('https://api.chucknorris.io/jokes/search?query=all');

const limitedJokes = computed(() => {
  return jokes.value.result.splice(0, 10)
})
</script>

<style lang="scss">
  aside.aside {
    background-color: var(--vt-c-white);
    padding: 25px;
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));

    h3{
      font-weight: bold;
      margin-bottom: 20px;
    }
    ul{
      list-style-type: none;
      padding: 0;
      max-width: 60%;

      li{
        margin-bottom: 12px;
        text-decoration: underline;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        a{
          color: inherit;
        }
      }
    }
    
  }
</style>
