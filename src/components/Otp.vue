<template>
  <v-app id="inspire">
    <v-parallax id="parallax-hero"
      dark
      :src="image.background"
    >
      <v-content class="align-center justify-center">
        <blockquote class="blockquote">
          <h5 class="headline">Selamat Datang</h5>
          <p>di <span class="font-weight-regular">SDS Mobile</span> </p>
        </blockquote>
        <v-flex xs12>
          <v-card flat color="transparent">
            <v-card-title primary-title>
              <p class="font-weight-thin white--text">Silahkan Masukkan No HP Anda, kemudian klik tombol KIRIM OTP untuk mendapatkan kode login</p>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field  prepend-icon="mdi-cellphone-android" v-model="hp_number"  color="white" :rules="hpNumberRules" label="No HP" type="number" counter="number" required ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-4" class="white--text" :loading="loading" :disabled="loading" @click="submit" >Kirim OTP</v-btn>
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
      hp_number: '',
      hpNumberRules: [
        v => !!v || 'No HP belum diisi',
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
          this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/codeOtp/'+this.hp_number).then((response) => {
            this.loading = false
            this.snackbar = true
            //console.log(response.data)
            //console.log(response.data.message)
            //console.log(response.data.data.tokenOtp)
            this.text = response.data.message
            if(response.data.data.tokenOtp){
              localStorage.setItem('otpToken', response.data.data.tokenOtp)
              this.$router.replace({path: '/login'})
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
