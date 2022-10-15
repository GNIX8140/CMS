<template>
  <div class="main">
    <div class="main-logo-div">
      <img class="logo-div-img" src="../assets/logo.svg">
      <span class="logo-div-span">Classroom Management System</span>
    </div>
    <div class="main-title-div">
      <span class="title-div-en">Welcome To BGD Classroom Management System</span>
      <span class="title-div-cn">北京工业大学耿丹学院教室管理系统</span>
    </div>
    <div class="main-btn-group">
      <button class="btn btn-secondary btn-group-btn btn-group-user">用户登陆</button>
      <button class="btn btn-primary btn-group-btn btn-group-data">数据面板</button>
      <button class="btn btn-secondary btn-group-btn btn-group-admin">控制面板</button>
    </div>
  </div>
</template>

<script>
</script>
<style>
@media screen and (max-width: 600px) {
  .main-logo-div {
    padding: 6px 0px;
  }

  .logo-div-img {
    width: 32px;
    height: 32px;
  }

  .logo-div-span {
    font-size: 0.8rem;
    margin-left: 10px;
  }

  .main-title-div {
    padding: 120px 0px;
  }

  .title-div-en {
    font-size: 1rem;
  }

  .title-div-cn {
    font-size: 0.8rem;
    margin-top: 10px;
  }

  .main-btn-group {
    padding: 6px 0px;
  }

  .btn-group-btn {
    width: 108px;
    height: 32px;
    font-size: 0.6rem;
    border-radius: 8px;
  }

  .btn-group-data {
    margin: 0px 8px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
  .main-logo-div {
    padding: 8px 0px;
  }

  .logo-div-img {
    width: 36px;
    height: 36px;
  }

  .logo-div-span {
    font-size: 1.2rem;
    margin-left: 30px;
    letter-spacing: 1px;
  }

  .main-title-div {
    padding: 140px 0px;
  }

  .title-div-en {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  .title-div-cn {
    font-size: 1.3rem;
    margin-top: 15px;
    letter-spacing: 1px;
  }

  .main-btn-group {
    padding: 8px 0px;
  }

  .btn-group-btn {
    width: 162px;
    height: 36px;
    font-size: 0.8rem;
    border-radius: 12px;
  }

  .btn-group-data {
    margin: 0px 56px;
  }
}

@media screen and (min-width: 1200px) {
  .main-logo-div {
    padding: 10px 0px;
  }

  .logo-div-img {
    width: 48px;
    height: 48px;
  }

  .logo-div-span {
    font-size: 1.6rem;
    margin-left: 40px;
    letter-spacing: 1px;
  }

  .main-title-div {
    padding: 160px 0px;
  }

  .title-div-en {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .title-div-cn {
    font-size: 1.8rem;
    margin-top: 20px;
    letter-spacing: 1px;
  }

  .main-btn-group {
    padding: 10px 0px;
  }

  .btn-group-btn {
    width: 216px;
    height: 48px;
    font-size: 1rem;
    border-radius: 15px;
  }

  .btn-group-data {
    margin: 0px 96px;
  }
}

@media (prefers-color-scheme: light) {}

@media (prefers-color-scheme: dark) {}

#app {
  height: calc(100vh);
  background-image: linear-gradient(to bottom right, rgba(162, 210, 255, 0.3), rgba(205, 180, 219, 0.3));
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.main {
  display: flex;
  flex-direction: column;
}

.main-logo-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}


.logo-div-span {
  font-weight: 600;
}

.main-title-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title-div-en {
  font-weight: 700;
}

.title-div-cn {
  font-weight: 600;
}

.main-btn-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.btn-group-btn {
  border: 1px solid rgba(134, 134, 134, 0.6);
}
</style>