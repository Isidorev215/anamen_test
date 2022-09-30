<template>
  <div class="joke-card">
    <div class="content">
      <h2>
        <IconLightning class="thor" />
        {{joke.categories[0] ?? 'Uncategorized'}}
      </h2>
      <p>{{joke.value}}</p>
    </div>
    <router-link :to="{name: 'JokeDetails', params: {id: joke.id} }" class="link">
      SEE STATS
      <IconRightArrow class="arrow" />
    </router-link>
  </div>
</template>

<script setup>
import IconLightning from '../components/icons/IconLightning.vue'
import IconRightArrow from '../components/icons/IconRightArrow.vue'

const props = defineProps({
  joke: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
  .joke-card{
    background: var(--vt-c-white);
    border: 1px solid lightgray;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: space-between;

    &:hover{
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    &:focus{
      border: 1px solid var(--vt-c-blue);
    }
    
    .content h2{
      font-size: 30px;
      font-weight: 600;
      display: flex;
      justify-items: start;
      align-items: center;
      text-transform: capitalize;
      .thor{
        width: 30px;
        height: 30px;
        color: var(--vt-c-light-gold);
      }
    }
    .content p{
      margin-bottom: 25px;
    }

    a.link{
      display: flex;
      justify-content: end;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
      color: var(--vt-c-brown);

      .arrow{
        margin-left: 10px;
        width: 30px;
        height: 30px;
      }
    }
  }
</style>