<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card flat>
        <v-toolbar color="light-blue darken-4" dark flat>
          <router-link to="/canvasser/transaction" tag="span" style="cursor:pointer">
           <v-btn icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>

          <v-toolbar-title class="body-2">Detail Penjualan</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list
          subheader
          three-line
        >
          <v-subheader>Data Transaksi</v-subheader>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="body-2">No RO/RS</v-list-tile-title>
              <v-list-tile-sub-title>{{ rsNumber }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="body-2">Kode Produk & Qty</v-list-tile-title>
              <v-list-tile-sub-title>{{ keyword }} : {{ qty }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="body-2">Jam Transaksi</v-list-tile-title>
              <v-list-tile-sub-title>{{ tpTs }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="body-2">Status Transaksi</v-list-tile-title>
              <v-list-tile-sub-title>{{ tpStatus }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="body-2">Keterangan</v-list-tile-title>
              <v-list-tile-sub-title>{{ errorMsg }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default{
    data (){
      return {
        rsNumber : this.$route.params.rsNumber,
        keyword : this.$route.params.keyword,
        qty : this.$route.params.qty,
        tpTs: this.$route.params.tpTs,
        tpStatus: this.$route.params.tpStatus,
        errorMsg: this.$route.params.errorMsg
      }
    },
    mounted(){
      this.loadData()
    },
    methods: {
      loadData (){
        this.errorMsg = this.errorMsg.replace(' atau ', '/')
      }
    }
  }
</script>