<template>
  <v-app id="inspire" >
    <v-toolbar color="grey lighten-4" fixed app flat>
      <v-toolbar-title>
        <router-link to="/mutation/dashboard" tag="span" style="cursor:pointer">
          <h6 >
            <v-icon small>mdi-wallet</v-icon>Rp{{ canvasserBalance }}
            <v-icon small>mdi-chevron-right</v-icon>
          </h6>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout column class="fab-container" >
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="light-blue darken-4"
            dark
            fab
            to="/menuCanvasser"
          >
            <v-icon >mdi-view-day</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-speed-dial>
    </v-layout>
    <v-container fluid grid-list-sm style="margin-top:55px">
      <v-layout row wrap>
        <v-flex xs12 v-if="loadingShow" style="margin-top:140px">
        <div class="text-xs-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        </v-flex>
        <v-flex d-flex xs12 v-if="dashboardShow">
          <v-card color="grey lighten-3" tile flat>
            <v-card-title primary-title class="body-2 font-weight-bold" style="margin-top:-10px;">
              Total sell-in saldo MOBO
            </v-card-title>
            <v-layout align-center justify-center mt-4>
              <v-flex xs4 style="margin-top:-20px;">
                <v-card-text style="margin-top:-20px;">Target</v-card-text>
                <v-card-text style="margin-top:-20px;">Realisasi</v-card-text>
              </v-flex>
              <v-flex xs5 style="margin-top:-20px;">
                <v-card-text class="text-xs-right" style="margin-top:-20px;">40.000.000</v-card-text>
                <v-card-text class="text-xs-right" style="margin-top:-20px;">0</v-card-text>
              </v-flex>
              <v-flex xs3 style="margin-top:-20px;">
                <v-card-text style="margin-top:-20px" class="text-xs-right">0 %</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 v-if="dashboardShow">
          <v-card color="grey lighten-3" tile flat>
            <v-card-title primary-title class="body-2 font-weight-bold" style="margin-top:-10px;">
              Data Mobo/Channel
            </v-card-title>
            <v-layout align-center justify-center mt-4>
              <v-flex xs4 style="margin-top:-20px;">
                <v-card-text style="margin-top:-20px;">Target</v-card-text>
                <v-card-text style="margin-top:-20px;">Realisasi</v-card-text>
              </v-flex>
              <v-flex xs5 style="margin-top:-20px;">
                <v-card-text class="text-xs-right" style="margin-top:-20px;">20.000.000</v-card-text>
                <v-card-text class="text-xs-right" style="margin-top:-20px;">0</v-card-text>
              </v-flex>
              <v-flex xs3 style="margin-top:-20px;">
                <v-card-text style="margin-top:-20px" class="text-xs-right">0 %</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 v-if="dashboardShow">
          <v-card color="grey lighten-3" tile flat>
            <v-card-title primary-title class="body-2 font-weight-bold" style="margin-top:-10px;">
              HIT Paket Mobo
            </v-card-title>
            <v-layout align-center justify-center mt-4>
              <v-flex xs4 style="margin-top:-20px;">
                <v-card-text style="margin-top:-20px;">Target</v-card-text>
                <v-card-text style="margin-top:-20px;">Realisasi</v-card-text>
              </v-flex>
              <v-flex xs5 style="margin-top:-20px;">
                <v-card-text class="text-xs-right" style="margin-top:-20px;">20.000.000</v-card-text>
                <v-card-text class="text-xs-right" style="margin-top:-20px;">0</v-card-text>
              </v-flex>
              <v-flex xs3 style="margin-top:-20px;">
                <v-card-text style="margin-top:-20px" class="text-xs-right">0 %</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 v-if="dashboardShow">
          <v-card color="grey lighten-3" tile flat>
            <v-card-title primary-title class="body-2 font-weight-bold" style="margin-top:-10px;">
              Komisi
            </v-card-title>
            <v-layout align-center justify-center mt-4>
              <v-flex xs7 style="margin-top:-20px;">
                <v-card-text style="margin-top:-20px;">Total sell-in saldo MOBO</v-card-text>
                <v-card-text style="margin-top:-20px;">Data Mobo/Channel</v-card-text>
              </v-flex>
              <v-flex xs5 style="margin-top:-20px;">
                <v-card-text class="text-xs-right" style="margin-top:-20px;">0</v-card-text>
                <v-card-text class="text-xs-right" style="margin-top:-20px;">0</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </v-app>
</template>

<script>

  export default {
    data: () => ({
      appName: "Dashboard",
      drawer: null,
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      canvasserBalance: 0,
      loadingShow: true,
      dashboardShow: false
    }),
    mounted (){
      function toRp(a,b,c,d,e){e=function(f){return f.split('').reverse().join('')};b=e(parseInt(a,10).toString());for(c=0,d='';c<b.length;c++){d+=b[c];if((c+1)%3===0&&c!==(b.length-1)){d+=',';}}return'\t'+e(d)+'.00'}

      if (localStorage.getItem('token')) {
        this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/dashboard').then((response) => {
          //console.log(response.data)
          //console.log(response.data.message)
          if(response.data.message == 'api key failed'){
            localStorage.removeItem('token')
            localStorage.removeItem('otpToken')
            this.$router.replace({path: '/getOtp'})
          }else{
            setTimeout(() => {
            this.canvasserBalance = toRp(response.data.data.member_balance)
            this.loadingShow = false
            this.dashboardShow = true
            },1000)
          }
        }).catch(function(){
          //console.log(error.message);
          localStorage.removeItem('token')
          localStorage.removeItem('otpToken')
          this.$router.replace({path: '/getOtp'})
        })
      } else {
        this.$router.replace({ path: '/getOtp' })
      }
    }
  }
</script>

<style>
.fab-container {
  position: fixed;
  bottom: 40px;
  right: 0;
  z-index: 1;
}
</style>
