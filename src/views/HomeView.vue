<template>
  <div class="container">
    <Categories />

    <div v-if="isPending" class="loading">
      <img class="loading-gif" src="../assets/img/chuckNorris_1.webp" alt="" />
    </div>
    <div v-else class="jokes-list">
      <div class="inner-list-wrap">
        <JokeCard class="jokecard" v-for="joke in currentJokes" :key="joke" :joke="joke" />
      </div>
    </div>

    <Pagination :total="jokes?.result.length" :perPage="perpage" :currentPage="currentLimitPosition" @pagechanged="onPageChanged" />
  </div>
</template>

<script setup>
import IconDownArrow from "../components/icons/IconDownArrow.vue";
import Categories from "../components/Categories.vue";
import JokeCard from "../components/JokeCard.vue";
import Pagination from "../components/Pagination.vue";
import getDataObject from "../composables/getDataObject";
import { computed, ref, watch } from "@vue/runtime-core";

const currentLimitPosition = ref(1);
const perpage = 50;
const currentJokes = ref([]);

const { isPending, error, data: jokes } = getDataObject("https://api.chucknorris.io/jokes/search?query=all");

const sortedArray = computed(() => {
  return jokes.value?.result.sort((a, b) => {
    let keyA = new Date(a.updated_at);
    let keyB = new Date(b.updated_at);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
});

const limitJokes = (position) => {
  let pos = position - 1;
  return sortedArray.value.splice(pos, perpage);
};

watch(jokes, () => {
  if (jokes.value !== null) {
    currentJokes.value = limitJokes(currentLimitPosition.value);
  }
});

const onPageChanged = (page) => {
  currentLimitPosition.value = page;
  currentJokes.value = limitJokes(currentLimitPosition.value);
};
</script>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 50px;
}
.jokes-list {
  // scrolling
  height: 600px;
  overflow-y: auto;
  border-top: 2px solid var(--vt-c-gray);
  border-bottom: 2px solid var(--vt-c-gray);

  .inner-list-wrap {
    padding: 50px 0px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
}

.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: relative;
  background-color: var(--vt-c-white);
  z-index: 0;
  min-height: 300px;

  .loading-gif {
    height: 150px;
    width: 150px;
    border-radius: 100%;
    animation: bounce 1s infinite;
  }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
