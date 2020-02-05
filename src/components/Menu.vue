<template>
    <v-card height="55px">
    <v-bottom-nav
      :active.sync="bottomNav"
      :color="color"
      :value="true"
      fixed
      dark
      shift
    >
      <v-btn dark v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
        <span>{{item.title}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
<script>
//          {icon: 'info', title: 'Tentang', link: '/canvasser/about'}

  export default {
    data () {
      return {
        bottomNav: 4,
        menuItems: [
          {icon: 'dashboard', title: 'Dasbor', link: '/canvasser/dashboard'},
          {icon: 'mdi-swap-horizontal', title: 'Transaksi', link: '/canvasser/transaction'},
          {icon: 'mdi-account', title: 'Akun', link:'/canvasser/account'},
        ],
      }
    },
    computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return 'light-blue darken-4'
          case 1: return 'light-blue darken-4'
          case 2: return 'light-blue darken-4'
          case 3: return 'light-blue darken-4'
          case 4: return 'light-blue darken-4'
        }
      }
    }
  }
</script>
