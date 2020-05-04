<template>
  <div class="content text-center">
      <h1 class="heading-404">404</h1>
      <div class="page-not-found">PAGE NOT FOUND</div>
      <P style="margin-top: 30px">You seem to be trying to find this way home</P>
      <p class="text-center" style="margin-top: 20px">
          <router-link class="btn" to="/">BACK TO HOME</router-link>
      </p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .heading-404{
        font-size: 10em;
        font-weight: bold;
    }
    div.page-not-found{
        font-weight: bold;
        font-size: 3em;
    }
    .btn{
        border-radius: 20px;
        background-color: rgb(5, 114, 5);
        font-weight: 700;
        padding: 10px 25px;
        color: #fff!important;
        text-decoration: none;
    }
</style>