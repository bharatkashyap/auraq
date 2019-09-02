<template> 
    <div class="d-flex justify-content-center align-self-center align-items-center main-loader">
        <g-image class="loader-main" src="~/assets/img/delhi_loader.svg" />
    </div>
</template>

<script>
export default {
    name: "Loader"
}
</script>

<style>
.loader-main {
  height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
}
</style>