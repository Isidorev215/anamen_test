<template>
  <div class="hero-area-wrapper">
    <div class="image-wrapper">
      <img src="../assets/img/asset_1/bitmap.png" alt="Hero-image" />
      <div class="inner-search-wrapper">
        <h1>The Joke Bible</h1>
        <p>Daily Laughs for you and yours</p>

        <div class="input-wrapper dropdown" ref="autoSearchRoot">
          <input @input="searchJoke($event)" type="search" placeholder="How can we make you laugh today?" />
          <IconSearch class="icon" />

          <div v-if="autoSearchResult.length > 0 && !isSearching" class="autocomplete menu-content notch">
            <router-link :class="{ disable: joke.disabled }" v-for="joke in autoSearchResult" :key="joke.id" :to="{name: 'JokeDetails', params: {id: joke.id ?? '#'} }" class="link">
              <IconLightning class="icon"/>
              {{joke.title}}
            </router-link>
          </div>
          <div v-if="isSearching" class="autocomplete menu-content notch">
            <a class="link" :class="{ disable: true }" href="#">Searching...</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconSearch from "../components/icons/IconSearch.vue";
import IconLightning from '../components/icons/IconLightning.vue';
import axios from "axios";
import { ref } from "@vue/reactivity";
import { useClickOutside } from "../composables/useClickOutside";

  const autoSearchResult = ref([]);
  const autoSearchRoot = ref(null);
  const isSearching = ref(false);

  const searchJoke = (event) => {
    let query = event.target.value;
    if (query.length >= 3) {
      isSearching.value = true;
      axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then(res => {
        isSearching.value = false;
        let result = res.data.result;
        if(result.length > 0){
          let limitedResult = result.length > 7 ? result.splice(0, 7) : result;
          autoSearchResult.value = limitedResult.map(joke => {
            return {
              ...joke,
              title: joke.value.split(' ').slice(0, 3).join(' '),
              disabled: false,
            }
          })
        }else{
          autoSearchResult.value = [{
            title: 'No Joke was Found',
            disabled: true
          }]
        }
      })
      .catch(err => {
        isSearching.value = false;
        autoSearchResult.value = [{
          title: err.response.data.message,
          disabled: true
        }]
      })
    }

    if(query.length < 3){
      autoSearchResult.value = []
    }
  };

  useClickOutside(autoSearchRoot, (e) => {
    autoSearchResult.value = [];
  })
</script>

<style lang="scss" scoped>
.hero-area-wrapper {
  .image-wrapper {
    text-align: center;
    position: relative;
    display: block;

    img {
      width: 100%;
    }

    .inner-search-wrapper {
      color: var(--vt-c-white-two);
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      h1 {
        font-size: 48px;
        color: var(--vt-c-brown);
      }
      p {
        font-size: 22px;
      }
      .input-wrapper {
        margin-top: 10px;
        width: 100%;
        background-color: transparent;
        border: 1px solid var(--vt-c-white-two);
        border-radius: 4px;
        color: var(--vt-c-white);
        display: flex;
        align-items: center;
        padding: 0 14px;

        &:focus-within {
          background-color: white;
          color: black;
        }

        &:focus-within > input {
          color: black;
        }

        input {
          border: none;
          outline: none;
          padding: 14px 14px 14px 0px;
          width: 100%;
          background: transparent;
          color: var(--vt-c-white-two);
          font-size: 15px;

          &::placeholder {
            color: var(--vt-c-gray);
            font-size: 15px;
          }
        }

        .icon {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}

div.input-wrapper.dropdown {
  position: relative;
}
.menu-content {
  position: absolute;
  top: 48px;
  left: 0;
  background-color: var(--vt-c-white-two);
  width: 100%;
  margin-top: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  a.link {
    display: block;
    color: var(--vt-c-black);
    border-bottom: 1px solid var(--vt-c-gray);
    margin: 0px 7px;
    font-weight: 500;
    padding: 12px 16px;
    text-decoration: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    .icon{
      width: 25px!important;
      color: var(--vt-c-weird-green);
    }
  }

  a.link:hover {
    color: var(--vt-c-gray);
  }
}

.notch:after {
  left: 0;
  right: auto;
}

.disable{
  pointer-events: none;
}
</style>
