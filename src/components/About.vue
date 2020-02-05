<template>
  <v-app id="inspire">
    <v-toolbar color="cyan" dark fixed app>
      <v-btn icon>
        <router-link to="/" tag="span" style="cursor:pointer">
          <v-icon>mdi-arrow-left</v-icon>
        </router-link>
      </v-btn>
      <v-toolbar-title>
        {{ appName }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--v-btn icon>
        <v-badge>
          <template v-slot:badge>
            <span>6</span>
          </template>
        <v-icon>search</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon>
        <v-badge color="red">
          <template v-slot:badge>
            <span>6</span>
          </template>
        <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn-->
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <h1>This about page</h1>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      appName: "Tentang",
      userLogin: "Arif Suwadji",
    }),
    props: {
      source: String
    },
    mounted () {
      localStorage.removeItem('token')
    }
  }
</script>