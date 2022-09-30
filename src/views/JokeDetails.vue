<template>
  <div class="joke-detail">
    <button class="back-button" @click="$router.go(-1)">
      <img src="../assets/img/back-button.png" alt="" />
    </button>

    <div class="content">
      <div class="top">
        <div class="text pill">
          <span class="dot"></span>
          {{ joke?.categories[0] ?? "uncategorized" }}
        </div>
        <span class="text">
          <span class="dot"></span>
          Trending
        </span>
      </div>
      <h2>{{ joke?.value }}</h2>
      <p>{{ joke?.value }}</p>
    </div>

    <div class="like-buttons">
      <button class="button">
        <IconThumbUp class="icon like" />
        <span class="count">128</span>
      </button>
      <button class="button">
        <IconThumbDown class="icon dislike" />
        <span class="count">96</span>
      </button>
    </div>

    <div class="movement-buttons">
      <button>
        <IconChevronLeft class="icons" />
        PREV JOKE
      </button>
      <button>
        NEXT JOKE
        <IconChevronRight class="icons" />
      </button>
    </div>
  </div>
</template>

<script setup>
import IconThumbDown from "../components/icons/IconThumbDown.vue";
import IconThumbUp from "../components/icons/IconThumbUp.vue";
import IconChevronLeft from "../components/icons/IconChevronLeft.vue";
import IconChevronRight from "../components/icons/IconChevronRight.vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import getDataObject from "../composables/getDataObject";
import { onMounted, ref } from "@vue/runtime-core";

const route = useRoute();
const url = ref(`https://api.chucknorris.io/jokes/${route.params.id}`);

const { isPending, error, data: joke } = getDataObject(url);

onBeforeRouteUpdate((to, from) => {
  url.value = `https://api.chucknorris.io/jokes/${to.params.id}`;
});
</script>

<style lang="scss" scoped>
.joke-detail {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  overflow: hidden;
}
.joke-detail button {
  outline: none;
  border: none;
  cursor: pointer;
}
.joke-detail .back-button {
  background: transparent;
  margin-bottom: 20px;
}
.content {
  background-color: var(--vt-c-white);
  padding: 25px;
  filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  margin-bottom: 20px;
  width: 100%;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
      font-weight: 600;
      text-transform: uppercase;
      color: var(--vt-c-light-gold);
      display: flex;
      justify-content: center;
      align-items: center;

      .dot {
        background-color: var(--vt-c-light-gold);
      }
    }
    .text.pill {
      color: var(--vt-c-white-two);
      padding: 5px 40px;
      background-color: var(--vt-c-weird-green);
      border-radius: 9999px;
      font-size: 14px;
      .dot {
        background-color: var(--vt-c-white-two);
      }
    }
  }

  h2 {
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 34px;
    font-weight: 600;
    color: var(--vt-c-brown);
  }
}

.content .top .text span.dot {
  width: 6px;
  height: 6px;
  border-radius: 100%;
  margin-right: 8px;
}

.like-buttons {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button.button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: none;

    .icon {
      padding: 5px;
      border-radius: 100%;
      width: 40px;
      color: white;
      margin-bottom: 5px;
    }

    .like {
      background-color: var(--vt-c-weird-green);
      margin: 0 10px;
      + span {
        color: var(--vt-c-weird-green);
        font-weight: 700;
      }
    }
    .dislike {
      background-color: var(--vt-c-red);
      margin: 0 10px;
      + span {
        color: var(--vt-c-red);
        font-weight: 700;
      }
    }
  }
}

.movement-buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    background-color: var(--vt-c-white-two);
    padding: 10px 20px;
    border: 1px solid var(--vt-c-brown);
    font-size: 14px;
    font-weight: 600;
    color: var(--vt-c-brown);
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    &:first-child {
      margin-right: 5px;
    }
    &:last-child {
      margin-left: 5px;
    }

    .icons {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
