<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <HomePage></HomePage>
  </div>
</template>
<script>
import HeaderBar from './Header';
import HomePage from './Home.vue';

export default {
    name: "Base",
    components: {
        HeaderBar,
        HomePage
    }
}
</script>