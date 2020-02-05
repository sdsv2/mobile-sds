<template>
  <v-app id="inspire">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-toolbar color="light-blue darken-4" fixed dark app flat>
        <router-link to="/canvasser/dashboard" tag="span" style="cursor:pointer">
          <v-btn icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>
        <v-toolbar-title class="body-2 text-uppercase">
          {{ appName }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card style="margin-top:59px" flat>
        <v-list>
          <v-list-tile @click="riwayatDeposit">
            <v-list-tile-action>
              <v-icon color="">mdi-table-search</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Riwayat Deposit</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="reloadDeposit">
            <v-list-tile-action><v-icon>mdi-wallet</v-icon></v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Reload Deposit</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider ></v-divider>

          <v-list-tile @click="rekapOutlet">
            <v-list-tile-action>
              <v-icon >mdi-account-badge-horizontal</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Rekap Outlet</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      appName: "Menu",
    }),
    methods: {
        riwayatDeposit (){
            this.$router.replace({ path: '/riwayatDeposit' })
        },
        reloadDeposit (){
            this.$router.replace({ path: '/reloadDeposit' })
        },
        rekapOutlet (){
            this.$router.replace({ path: '/rekapOutlet' })
        }
    }
  }
</script>