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
    height: 40px;
  }

  .logo-div-img {
    width: 1.8rem;
    height: 1.8rem;
  }

  .logo-div-img:hover {
    width: 2.2rem;
    height: 2.2rem;
  }

  .logo-div-span {
    font-size: 0.8rem;
    margin-left: 10px;
  }

  .logo-div-span:hover {
    font-size: 0.9rem;
  }

  .main-title-div {
    height: 500px;
  }

  .title-div-en {
    font-size: 1rem;
  }

  .title-div-en:hover {
    font-size: 1.1rem;
  }

  .title-div-cn {
    font-size: 0.8rem;
    margin-top: 10px;
  }

  .title-div-cn:hover {
    font-size: 0.9rem;
  }

  .main-btn-group {
    height: 40px;
  }

  .btn-group-btn {
    width: 6rem;
    height: 2rem;
    font-size: 0.6rem;
    border-radius: 8px;
  }

  .btn-group-btn:hover {
    width: 7rem;
    height: 2.1rem;
    font-size: 0.7rem;
  }

  .btn-group-data {
    margin: 0px 16px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
  .main-logo-div {
    height: 50px;
  }

  .logo-div-img {
    width: 2.4rem;
    height: 2.4rem;
  }

  .logo-div-img:hover {
    width: 2.8rem;
    height: 2.8rem;
  }

  .logo-div-span {
    font-size: 1.2rem;
    margin-left: 30px;
    letter-spacing: 1px;
  }

  .logo-div-span:hover {
    font-size: 1.3rem;
  }

  .main-title-div {
    height: 360px;
  }

  .title-div-en {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  .title-div-en:hover {
    font-size: 1.6rem;
  }

  .title-div-cn {
    font-size: 1.3rem;
    margin-top: 15px;
    letter-spacing: 1px;
  }

  .title-div-cn:hover {
    font-size: 1.4rem
  }

  .main-btn-group {
    height: 50px;
  }

  .btn-group-btn {
    width: 9rem;
    height: 2.2rem;
    font-size: 0.8rem;
    border-radius: 12px;
  }

  .btn-group-btn:hover {
    width: 10rem;
    height: 2.3rem;
    font-size: 0.9rem;
  }

  .btn-group-data {
    margin: 0px 56px;
  }
}

@media screen and (min-width: 1200px) {
  .main-logo-div {
    height: 60px;
  }

  .logo-div-img {
    width: 3rem;
    height: 3rem;
  }

  .logo-div-img:hover {
    width: 3.4rem;
    height: 3.4rem;
  }

  .logo-div-span {
    font-size: 1.6rem;
    margin-left: 40px;
    letter-spacing: 1px;
  }

  .logo-div-span:hover {
    font-size: 1.7em;
  }

  .main-title-div {
    height: 420px;
  }

  .title-div-en {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .title-div-en:hover {
    font-size: 2.1rem;
  }

  .title-div-cn {
    font-size: 1.8rem;
    margin-top: 20px;
    letter-spacing: 1px;
  }

  .title-div-cn:hover {
    font-size: 1.9rem;
  }

  .main-btn-group {
    height: 60px;
  }

  .btn-group-btn {
    width: 11rem;
    height: 2.6rem;
    font-size: 1rem;
    border-radius: 15px;
  }

  .btn-group-btn:hover {
    width: 12rem;
    height: 2.7rem;
    font-size: 1.1rem
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

.logo-div-img {
  transition: all 0.1s linear 0s;
}


.logo-div-span {
  font-weight: 600;
  transition: all 0.2s linear 0s;
}

.main-title-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title-div-en {
  font-weight: 700;
  transition: all 0.2s linear 0s;
}

.title-div-cn {
  font-weight: 600;
  transition: all 0.2s linear 0s;
}

.main-btn-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.btn-group-btn {
  font-weight: 600;
  letter-spacing: 1px;
  border: 1px solid rgba(134, 134, 134, 0.6);
  transition: all 0.1s linear 0s;
}
</style>