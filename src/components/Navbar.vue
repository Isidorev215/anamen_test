<template>
  <header class="navbar">
    <nav>
      <a class="links" href="#">SONDERANGEBOTE</a>
      <a class="links" href="#">SO FUNKTIONIERT'S</a>
      <div class="dropdown-menu" ref="dropdownRoot">
        <button @click="toggleDropdown()" class="menu-btn">
          <IconUser style="margin-right: 10px" />
          MEIN BEREICH
          <span style="margin-left: 40px">&#9660;</span>
        </button>
        <div class="menu-content notch" :class="{'dropdown-closed': dropdownIsOpen === false, 'dropdown-open': dropdownIsOpen === true}">
          <a class="links-hidden" href="#">My published jokes</a>
          <a class="links-hidden" href="#">My Saved jokes</a>
          <a class="links-hidden" href="#">Account information</a>
          <a class="links-hidden" href="#">Publish new joke</a>
        </div>
      </div>
    </nav>
  </header>
  <HeroArea class="hero-area-mount" />
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useClickOutside } from '../composables/useClickOutside';
import { useToggle } from '@vueuse/core';
import IconUser from "./icons/IconUser.vue";
import HeroArea from '../components/HeroArea.vue';
  
  const dropdownRoot = ref(null);
  const dropdownIsOpen = ref(false);

  const toggleDropdown = useToggle(dropdownIsOpen);
  useClickOutside(dropdownRoot, () => {
    dropdownIsOpen.value = false;
  })

</script>

<style lang="scss">

nav {
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  background-color: var(--vt-c-black);
  padding: 0px 50px;
  display: flex;
  justify-content: flex-end;
}

.hero-area-mount{
  margin-top: 50px;
}

.menu-btn {
  background-color: inherit;
  color: var(--vt-c-white-two);
  padding: 16px;
  border: none;
  outline: none;
  cursor: pointer;
}
.dropdown-menu {
  position: relative;
  display: inline-block;
}
.menu-content {
  position: absolute;
  background-color: var(--vt-c-white-two);
  width: 100%;
  margin-top: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.dropdown-closed{
  display: none;
}
.dropdown-open{
  display: block;
}


.links,
.links-hidden {
  display: inline-block;
  color: var(--vt-c-white-two);
  padding: 12px 16px;
  text-decoration: none;
}
.links-hidden {
  display: block;
  color: var(--vt-c-black);
  border-bottom: 1px solid var(--vt-c-gray);
  margin: 0px 7px;
  font-weight: 500;

  &:last-child{
    border-bottom: none;
    color: var(--vt-c-brown);
  }
  &:hover{
    color: var(--vt-c-gray);
  }
}
.links {
  display: inline-block;
}

.links:hover {
  background-color: var(--vt-c-gray);
}
.dropdown-menu:hover .menu-btn {
  background-color: var(--vt-c-gray);
}

.notch:after {
  content: " ";
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  left: auto;
  right: 0;
  top: -22px;
  bottom: auto;
  border: 16px solid;
  border-color: transparent transparent var(--vt-c-white-two) transparent;
}
</style>
