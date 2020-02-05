<template>
  <v-app id="inspire">
  <v-layout row>
    <v-flex xs12 style="margin-left:20px;margin-right:20px">
      <v-card flat>
        <v-toolbar color="light-blue darken-4" dark  app flat>
          <v-btn @click="homePage" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title class="body-2">
            {{ appName }}
          </v-toolbar-title>
        </v-toolbar>
        <v-layout row wrap xs12>
          <v-flex xs12 style="z-index:1">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value="date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Tanggal"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
          <template>
            <v-flex xs12 style="z-index:1">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value="date"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Tanggal"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex>    
              <div class="text-xs-center" style="margin-top:80px" v-if="loadingShow">
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
            </v-flex>
            <v-flex
              v-for="card in items"
              :key="card.keyword"
              v-bind="{ [`xs${card.flex}`]: true }"
            > 
              <v-card
                :key="card.keyword"
                avatar to="#"
                style="margin-top:20px"
              >
                <v-container
                  fill-height
                  fluid
                  pa-2
                >
                  <v-layout>
                    <v-flex xs12>
                      <span class="subheading font-weight-bold" v-text="card.title"></span>
                      <v-spacer></v-spacer>
                      <span class="caption" v-text="card.subtitle"></span>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12>
                      <span class="subheading font-weight-bold">Nominal</span>
                      <v-spacer></v-spacer>
                      <span class="caption" v-text="card.amount"></span>
                    </v-flex>
                    <v-flex xs12>
                      <span class="subheading font-weight-bold">Saldo</span>
                      <v-spacer></v-spacer>
                      <span class="caption" v-text="card.balance"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card-actions>
                  <span class="font-weight-thin">{{ card.errorMsg }}</span>
                </v-card-actions>
              </v-card>
            </v-flex>
          </template>
      </v-card>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      appName: "Mutasi Anda",
      items: [],
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      loadingShow: false,
    }),
    props: {
      source: String
    },
    mounted() {
      this.loadingShow = true
      this.loadData(this.date,'account/mutation')
    },
    methods: {
      toNominal(a,b,c,d,e){e=function(f){return f.split('').reverse().join('')};b=e(parseInt(a,10).toString());for(c=0,d='';c<b.length;c++){d+=b[c];if((c+1)%3===0&&c!==(b.length-1)){d+=',';}}return'\t'+e(d)+''},
      loadData(requestDate, typeUrl){
        if (localStorage.getItem('token')) {
          this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/'+typeUrl+'/'+requestDate).then((response) => {
            console.log(response.data)
            let data = response.data.data
            console.log("data "+data)
            setTimeout(() => {
              this.loadingShow = false
              try{
                data.forEach(this.listData)
              }catch(error){
                console.log(error.message)
                this.items.splice(0, this.items.length)
              }
            },1000)
          }).catch(function(error){
            console.log(error.message)
            setTimeout(() => {
              this.loadingShow = false
            },1000)
            localStorage.removeItem('token')
            localStorage.removeItem('otpToken')
            this.$router.replace({path: '/canvasser'})
          })
        } else {
          this.$router.replace({ path: '/getOtp' })
        }
      },
      listData(value, index){
        this.headNQ = 'Nominal'
        let typeName = 'Deposit'
        if(value.trans_type == 'top'){
          typeName = 'Topup'
        }else if(value.trans_type == 'rev'){
          typeName = 'Reversal'
        }
        if(value.amount > 0){
          this.items.splice(index, 1, {title: typeName, subtitle: value.trans_time, keyword: value.keyword, amount: this.toNominal(value.amount), balance: this.toNominal(value.balance), errorMsg : '', flex:12})
        }else{
          this.items.splice(index, 1, {title: typeName, subtitle: value.trans_time, keyword: value.keyword, amount: '-'+this.toNominal(-value.amount), balance: this.toNominal(value.balance), errorMsg : '', flex:12})
        }
        
      },
      save(date){
        this.modal= false
        console.log(date + "is")
        this.loadingShow = true
        this.items.splice(0, this.items.length)
        this.loadData(date,'account/mutation')
      },
      homePage(){
          this.$router.replace({path: '/canvasser/'+this.$route.params.backHome})
      }
    }
  }

</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
