<template>
    <v-app id="inspire">
        <router-view></router-view>
        <Menu></Menu>
    </v-app>
</template>

<script>
import Menu from './Menu'
export default{
  components: {
        Menu
    }
}
</script>

<style>

</style>
