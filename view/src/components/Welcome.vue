<template>
    <div class="welcome-body">
        <div class="welcome-logo">
            <img class="logo-img" src="../assets/logo.svg">
            <span class="logo-span">Classroom Management System</span>
        </div>
        <div class="welcome-title">
            <span class="title-en">College Classroom Management System</span>
            <span class="title-cn">高校教室申请管理系统</span>
        </div>
        <div class="welcome-btn-group">
            <router-link :to="{ path: '/login', query: { type: 'user' } }">
                <button class="btn btn-apply">申请教室</button>
            </router-link>
            <router-link to="/dashboard">
                <button class="btn btn-dashboard">数据面板</button>
            </router-link>
            <router-link :to="{ path: '/login', query: { type: 'admin' } }">
                <button class="btn btn-control">后台管理</button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
@media screen and (max-width: 600px) {
    .logo-img {
        width: 48px;
        height: 48px;
    }

    .logo-span {
        font-size: 1rem;
        margin-left: 4px;
    }

    .welcome-title {
        font-size: 1.2rem;
        padding: 120px 0px;
    }

    .welcome-btn-group button {
        font-size: 0.9rem;
        padding: 8px 22px;
        margin: 0px 6px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .logo-img {
        width: 52px;
        height: 52px;
    }

    .logo-span {
        font-size: 1.3rem;
        margin-left: 12px;
        letter-spacing: 2px;
    }

    .welcome-title {
        font-size: 1.6rem;
        letter-spacing: 2px;
        padding: 80px 0px;
    }

    .welcome-btn-group button {
        padding: 7px 34px;
        margin: 0px 10px;
    }
}

@media screen and (min-width: 1200px) {
    .logo-img {
        width: 58px;
        height: 58px;
    }

    .logo-span {
        font-size: 1.6rem;
        margin-left: 18px;
        letter-spacing: 2px;
    }

    .welcome-title {
        font-size: 1.8rem;
        letter-spacing: 3px;
        padding: 110px 0px;
    }

    .welcome-btn-group button {
        font-size: 1.1rem;
        padding: 8px 42px;
        margin: 0px 28px;
    }

    .welcome-btn-group button:hover {
        font-size: 1.1rem;
        padding: 8px 52px;
    }
}

.welcome-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to bottom right, rgba(162, 210, 255, 0.2), rgba(205, 180, 219, 0.2));
}

.welcome-logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.logo-span {
    font-weight: 700;
}

.welcome-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 800;
}

.title-cn {
    margin-top: 32px;
}

.welcome-btn-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.welcome-btn-group button {
    border-radius: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.15);
    transition: all 0.1s linear;
    opacity: 0.9;
    border: 2px solid rgba(86, 145, 200, 0.8);
    color: rgba(69, 127, 202, 1);
    background-image: linear-gradient(to bottom right, rgba(100, 179, 244, 0.2), rgba(194, 229, 156, 0.2));
}
</style>