<template>
  <router-view />
</template>

<style>
@media screen and (max-width: 600px) {
  #app {
    padding: 10px 10px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
  #app {
    padding: 18px 20px;
  }
}

@media screen and (min-width: 1200px) {
  #app {
    padding: 18px 30px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 370px;
  max-width: 1920px;
  margin: 0px auto;
}

.hr {
  height: 1px;
  background-color: #C0C0C0;
}
</style>
