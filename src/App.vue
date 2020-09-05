<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default{
  beforeCreate(){

  }
}
</script>
<style lang="scss">


@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: "Raleway";
}
body {
  height: 100vh;
}
#app {
  height: inherit;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
