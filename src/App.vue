<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <Navbar />
  <RouterView class="route-wrapper" />

  <div class="details">
    <RouterView name="details" class="route" />
    <Router-view name="aside" class="aside"/>
  </div>

  <Footer />
</template>

<style lang="scss">
.route-wrapper{
  padding: 25px 50px;
  margin-bottom: 50px;
}

.details{
  padding: 25px 50px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-column-gap: 20px;

  .route{
    grid-column: span 2 / span 2;
  }
  .aside{
    grid-column: span 1 / span 1;
  }
}
</style>
