<template>
  <v-app id="inspire">
    <v-parallax id="parallax-hero"
      dark
      :src="image.background"
    >
      <v-toolbar dark color="transparent" class="align-center" flat>
        <v-btn icon>
          <router-link to="/getOtp" tag="span" style="cursor:pointer">
            <v-icon>mdi-arrow-left</v-icon>
          </router-link>
        </v-btn>
        <v-toolbar-title><span class="display-1 font-weight-black">SDS</span><span class="display-1 font-weight-thin">Mobile</span></v-toolbar-title>
      </v-toolbar>
      <v-content class="align-center justify-center">
        <blockquote class="blockquote">
          <h5 class="align-center headline">Login</h5>
        </blockquote>
        <v-flex xs12>
          <v-card flat color="transparent">
            <v-card-title primary-title>
              <p class="font-weight-thin white--text">Kode login telah dikirimkan ke no HP anda, Silahkan masukkan kode login, untuk memulai sesi anda</p>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field prepend-icon="lock" v-model="kodeLogin" label="Kode Login" color="white" type="password" :rules="kodeLoginRules" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-4" class="white--text" :loading="loading" :disabled="loading" @click="submit" >LOGIN</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-content>
    </v-parallax>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      loader: null,
      loading: false,
      valid: true,
      kodeLogin: '',
      kodeLoginRules: [
        v => !!v || 'Kode login masih kosong',
      ],
      image: {
        background: 'https://mobileapi.sds-akses.c.host2host.id/images/banner.jpg'
      },
      snackbar: false,
      y: 'top',
      x: 'right',
      mode: '',
      timeout: 6000,
      text: ''
    }),
    props: {
      source: String
    },
    mounted() {
      document.getElementById('parallax-hero').style.height = '100vh'
    },
    methods: {
      submit(){
        if(this.$refs.form.validate()){
          this.loading = true
          this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/loginUser/'+this.kodeLogin).then((response) => {
            this.loading = false
            this.snackbar = true
            //console.log(response.data)
            //console.log(response.data.message)
            //console.log(response.data.data.token)
            this.text = response.data.message
            if(response.data.data.token){
              localStorage.setItem('token', response.data.data.token)
              this.$router.replace({path: '/canvasser'})
            }
          })
          .catch(error => {
            if (error.response) {
              this.loading = false
              this.snackbar = true
              this.text = error.response.data.message
            }
          })
          .finally(() => {
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style>
</style>
