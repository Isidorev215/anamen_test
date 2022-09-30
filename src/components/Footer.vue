<template>
  <div class="footer-wrapper">
    <div class="content">
      <h3>GOT JOKES? GET PAID FOR SUBMITTING!</h3>
      <a href="#" class="link">
        SUBMIT JOKE
        <IconRightArrow class="arrow" />
      </a>
    </div>
  </div>
</template>

<script setup>
import IconRightArrow from '../components/icons/IconRightArrow.vue';
</script>

<style lang="scss" scoped>
  .footer-wrapper{
    position: relative;
    background-image: url('../assets/img/asset_1/bitmap_2.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 250px;
    padding: 50px 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    div.content{
      color: var(--vt-c-white-two);
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      h3{
        margin-bottom: 10px;
      }
      
      a.link{
        display: flex;
        justify-content: end;
        align-items: center;
        font-size: 17px;
        font-weight: 600;
        color: var(--vt-c-brown);

        .arrow{
          margin-left: 10px;
          width: 30px;
          height: 30px;
        }
      }
    }
 }
</style>