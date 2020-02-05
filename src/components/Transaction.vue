<template>

  <v-app id="inspire">

    <v-toolbar color="grey lighten-4" fixed app flat>
      <v-toolbar-title class="body-2">
        {{ appName }}
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs
          v-model="model"
          centered
          color="grey lighten-4"
          slider-color="light-blue draken-4" grow light
          :change="changeTab(model)"
        >
          <v-tab class="text-capitalize"
            v-for="tab in tabMenu"
            :key="tab.id"
            :href="`#${tab.text}`"
          >
            {{ tab.text }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-tabs-items v-model="model">
            <v-tab-item
              v-for="tab in tabMenu"
              :key="tab.id"
              :value="tab.text"
            >
            <v-layout row wrap >
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
              <v-spacer></v-spacer>
              <v-card flat style="margin-top:-60px">
                <v-card-text class="white--text" v-text="textInfo"></v-card-text>
              </v-card>
              <div class="text-xs-center" style="margin-top:80px" v-if="loadingShow">
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              </v-layout>
              <v-card flat>
                <v-container
                  fluid
                  grid-list-md
                >
                  <v-layout row wrap>
                    <v-flex
                      v-for="card in items"
                      :key="card.showKey"
                      v-bind="{ [`xs${card.flex}`]: true }"
                    >
                      <v-card
                        :key="card.showKey"
                        avatar to="#"
                        @click="detailSales(card.type, card.title, card.keyword, card.qty, card.tpTs, card.tpStatus, card.errorMsg, card.logID, card.logMsg)"
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
                              <span class="subheading font-weight-bold" >{{ headNQ }}</span>
                              <v-spacer></v-spacer>
                              <span class="caption" v-text="card.qty"></span>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <v-card-actions>
                          <span class="font-weight-thin">{{ card.errorMsg }}</span>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-layout>
      </v-container>
    </v-content>
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
            to="/listrsNumber"
          >
            <v-icon >mdi-plus</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-speed-dial>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      appName: "Transaksi",
      model: 'Penjualan',
      textInfo: '',
      tabMenu: [
        {id: 1, text : 'Deposit'},
        {id: 2, text : 'Penjualan'}
      ],
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
      oneLoad : '',
      items: [],
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      loadingShow: false,
      headNQ : 'Quantity'
    }),
    props: {
      source: String
    },
    methods: {
      toNominal(a,b,c,d,e){e=function(f){return f.split('').reverse().join('')};b=e(parseInt(a,10).toString());for(c=0,d='';c<b.length;c++){d+=b[c];if((c+1)%3===0&&c!==(b.length-1)){d+=',';}}return'\t'+e(d)+''},
      loadData(tabsInfo, requestDate, typeUrl){
        this.textInfo = tabsInfo
        //this.textInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        if (localStorage.getItem('token')) {
          this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/'+typeUrl+'/'+requestDate).then((response) => {
            //console.log(response.data)
            let data = response.data.data
            //console.log("data "+data)
            setTimeout(() => {
              this.loadingShow = false
              try{
                if(tabsInfo == 'Data Deposit Canvasser'){
                  //console.log("deposit")
                  data.forEach(this.listDataDeposit)
                }else{
                  //console.log("penjualan")
                  data.forEach(this.listData)
                }
              }catch(error){
                //console.log(error.message)
                this.items.splice(0, this.items.length)
              }
            },1000)
          }).catch(function(){
            //console.log(error.message)
            setTimeout(() => {
              this.loadingShow = false
            },1000)
            localStorage.removeItem('token')
            localStorage.removeItem('otpToken')
            this.$router.replace({path: '/getOtp'})
          })
        } else {
          this.$router.replace({ path: '/getOtp' })
        }
      },
      listData(value, index){
        this.items.splice(index, 1, {title: value.rs_number, subtitle: value.keyword+':'+this.toNominal(value.nominal), keyword: value.keyword, qty: value.topup_qty, errorMsg : value.error_msg, type:'sales', tpTs: value.topup_ts, tpStatus: value.topup_status, showKey: value.keyword+'_'+value.rs_number+'_'+value.topup_ts, logID: value.log_id, logMsg: value.log_msg, flex:12})
      },
      listDataDeposit(value, index){
        this.headNQ = 'Nominal'
        this.items.splice(index, 1, {title: value.trans_time, subtitle: '', keyword: value.keyword, qty: this.toNominal(value.amount), errorMsg : '', type: 'dep', showKey: value.keyword+'_'+value.amount+'_'+value.trans_time, logID: '', logMsg:'',flex:12})
      },
      changeTab(typeTransaction){
        //console.log("change "+typeTransaction)
        if(this.oneLoad != typeTransaction){
          this.loadingShow = true
          this.items.splice(0, this.items.length)
          if(typeTransaction == 'Penjualan'){
            this.loadData('Data Penjualan Canvasser',this.date,'transaction/sales')
          }else if(typeTransaction == 'Deposit'){
            this.loadData('Data Deposit Canvasser',this.date,'transaction/deposit')
          }else if(typeTransaction == 'Retur'){
            this.loadData('Data Retur Canvasser',this.date,'transaction/reversal')
          }
        }
        this.oneLoad = typeTransaction
      },
      save(date){
        this.modal= false
        //console.log(date + "is")
        this.loadingShow = true
        this.items.splice(0, this.items.length)
        if(this.model == 'Penjualan'){
          this.loadData('Data Penjualan Canvasser',date,'transaction/sales')
        }else if(this.model == 'Deposit'){
          this.loadData('Data Deposit Canvasser',date,'transaction/deposit')
        }
      },
      detailSales(type, rsNumber, keyword, qty, tpTs, tpStatus, errorMsg, logID, logMsg){
        if(type == 'sales'){
          tpTs = tpTs.replace('T',' ')
          tpTs = tpTs.replace('.000Z','')
          errorMsg = errorMsg.replace('/', ' atau ')
          if(!errorMsg && !logID){
            errorMsg = 'sedang diproses';
          }
          if(logID){
            errorMsg = logMsg;
            errorMsg = errorMsg.match(/([^]+). Sisa/)[1];
          }
          this.$router.replace({path: '/detailSales/'+rsNumber+'/'+keyword+'/'+qty+'/'+tpTs+'/'+tpStatus+'/'+errorMsg})
        }
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

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
