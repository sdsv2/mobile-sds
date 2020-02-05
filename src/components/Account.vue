<template>
  <v-app id="inspire">
    <v-toolbar color="grey lighten-4" fixed app flat>
      <v-toolbar-title class="body-2">
        {{ appName }}
      </v-toolbar-title>
    </v-toolbar>
    <v-toolbar color="grey lighten-4" flat style="margin-top:55px">
      <v-toolbar-title></v-toolbar-title>
    </v-toolbar>
    <v-card class="userAccount" v-if="showProfile" flat color="transparent">
      <v-avatar
        class="mx-auto d-block"
        size="80"
      >
        <img
          src="http://172.24.0.65:4677/images/user.png"
        >
      </v-avatar>
      <v-card-text class="text-xs-center">
        <h6 class="category text-gray font-weight-thin mb-3 text-uppercase">{{ statusLogin }}</h6>
        <h4 class="card-title font-weight-light">{{ userLogin }}</h4>
      </v-card-text>
    </v-card>
    <v-content>
      <v-flex xs12>
      <div class="text-xs-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          v-if="loadingShow"
        ></v-progress-circular>
      </div>
      </v-flex>
      <v-flex xs12 v-if="showProfile">
        <v-toolbar color="white" flat>
          <v-toolbar-title class="caption font-weight-bold">
            Saldo Deposit
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <router-link to="/mutation/account" class="font-weight-bold caption" tag="span" style="cursor:pointer;color:#01579B">
            Lihat Detail
          </router-link>
        </v-toolbar>
        <v-card class="text-xs-center white" flat style="margin-top:-20px">
          <v-icon>mdi-wallet</v-icon><h5 class="body-2">Rp{{ canvasserBalance }}</h5>
        </v-card>
      </v-flex>
      <v-flex xs12 mt-3 flat v-if="showProfile">
        <v-toolbar color="white" flat>
          <v-toolbar-title class="caption font-weight-bold">
            Lainnya
          </v-toolbar-title>
        </v-toolbar>
        <v-card flat>
          <v-list>
            <v-list-tile @click="aboutPage">
              <v-list-tile-action>
                <v-icon color="light-blue darken-4">mdi-information-variant</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Tentang Kami</v-list-tile-title>
                <v-list-tile-sub-title class="caption">Tahu Lebih Dalam Tentang SDS Mobile</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-tile>



            <v-divider></v-divider>

            <v-list-tile @click="logout">
              <v-list-tile-action>
                <v-icon color="yellow darken-2">mdi-logout</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Keluar Aplikasi</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      appName: "Akun Kamu",
      userLogin: "Nama Canvasser",
      statusLogin: "Canvasser",
      canvasserBalance: 0,
      showProfile: false,
      loadingShow: true
    }),
    props: {
      source: String
    },
    methods:{
      logout : function(){
        localStorage.removeItem('token')
        localStorage.removeItem('otpToken')
        this.$router.replace({path: '/canvasser'})
      },
      aboutPage: function(){
        this.$router.replace({path: '/about'});
      },
    },
    mounted (){
      function toRp(a,b,c,d,e){e=function(f){return f.split('').reverse().join('')};b=e(parseInt(a,10).toString());for(c=0,d='';c<b.length;c++){d+=b[c];if((c+1)%3===0&&c!==(b.length-1)){d+=',';}}return'\t'+e(d)+'.00'}

      if (localStorage.getItem('token')) {
        this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/account').then((response) => {
          //console.log(response.data)
          //console.log(response.data.data.member_name)
          setTimeout(() => {
            this.userLogin = response.data.data.member_name
            if(response.data.data.member_type == 'CVS'){
              this.statusLogin = 'Canvasser'
            }else if(response.data.data.member_type == 'SPV'){
              this.statusLogin = 'Supervisor'
            }else if(response.data.data.member_type == 'BM'){
              this.statusLogin = 'Branch Manager'
            }
            this.canvasserBalance = toRp(response.data.data.member_balance)
            this.loadingShow = false
            this.showProfile = true
          },1000)
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
.userAccount {
  z-index: 1;
  margin-top: -55px;
  margin-bottom: -30px;
}
</style>
