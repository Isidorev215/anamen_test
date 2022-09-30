<template>
  <div class="hero-area-wrapper">
    <div class="image-wrapper">
      <img src="../assets/img/asset_1/bitmap.png" alt="Hero-image">
      <div class="inner-search-wrapper">
        <h1>The Joke Bible</h1>
        <p>Daily Laughs for you and yours</p>

        <input type="search" placeholder="How can we make you laugh today?">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.hero-area-wrapper{

  .image-wrapper{
    text-align: center;
    position: relative;
    display: block;

    img{
      width: 100%;
    }

    .inner-search-wrapper{
      color: var(--vt-c-white-two);
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);

      h1{
        font-size: 48px;
        color: var(--vt-c-brown);
      }
      p{
        font-size: 22px;
      }
      input{
        margin-top: 10px;
        width: 100%;
        padding: 14px;
        background: none;
        border: 1px solid var(--vt-c-white-two);
        border-radius: 4px;
        font-size: 14px;
        color: var(--vt-c-white);

        &:focus{
          background: white;
          color: black;
        }
      }
    }
  }

}
</style>