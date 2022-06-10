<script setup>
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "@/components/HelloWorld.vue"
</script>

<template>
    <div>
        <div class="header">
            <div class="app-name">SKK</div>
            <div class="nav">
                <RouterLink to="/" class="nav-item">Transfers</RouterLink>
                <RouterLink to="/about" class="nav-item">Login</RouterLink>
            </div>
        </div>
        <RouterView />

        <!-- <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink> -->
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
}
body {
    position: relative;
}

.header {
    width: 100%;
    color: white;
    background-color: teal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.app-name {
    font-size: 30px;
    font-weight: bold;
    color: white;
}
.nav {
    display: flex;
    justify-content: end;
    align-items: center;
}
.nav-item {
    margin: 0 10px;
    text-decoration: none;
    color: white;
}
.router-link-active {
    color: blue;
    font-weight: bolder;
}
</style>
