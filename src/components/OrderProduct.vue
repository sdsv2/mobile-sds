<template>
  <v-app id="inspire">
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogHeadline }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Quantity" type="number" v-model="qtyKeyword"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Tutup</v-btn>
          <v-btn color="blue darken-1" flat @click="tambahQty">Tambah</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs12>
      <v-toolbar color="light-blue darken-4" dark flat>
  
          <router-link to="/listrsNumber" tag="span" style="cursor:pointer">
           <v-btn icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          <v-toolbar-title class="body-2">{{ outletName }} - {{rsNumber}}</v-toolbar-title>

          <v-spacer></v-spacer>

        </v-toolbar>
      <v-card v-if="loadingShow" style="margin-top:140px" flat>
        <div class="text-xs-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card>
      <v-card flat>
        <v-container
          fluid
          grid-list-md
        >
        
          <v-layout row wrap v-if="orderShow">
            <v-flex
              v-for="card in items"
              :key="card.title"
              v-bind="{ [`xs${card.flex}`]: true }"
            >
            <v-subheader
              v-if="card.header"
              :key="card.header" class="text-capitalize"
            >
              {{ card.header }}
            </v-subheader>
              <v-card v-else
              :key="card.title"
              avatar to="#"
              v-on:click="orderQty(card.keyword)"
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
                        <span class="subheading font-weight-bold" >Quantity</span>
                        <v-spacer></v-spacer>
                        <span class="caption" v-text="card.qty"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                <v-card-actions>
                  <span class="font-weight-bold">Harga</span>
                  <v-spacer></v-spacer>
                  <span class="font-weight-bold">{{ card.priceRp }}</span>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout v-if="orderShow">
            <v-flex>
              <v-card flat>
                <v-card-title style="margin-left:-7px; margin-right:-7px" class="font-weight-bold">Total <v-spacer></v-spacer>{{ toRp(totalOrder)}}</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-4" class="white--text" :loading="loading" :disabled="loading" @click="submit" >TOPUP</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
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
    data () {
      return {
        drawer: null,
        appName: "No Rs: ",
        items: [
          {header: this.$route.params.rsChipType, flex: 12}
        ],
        outletName: this.$route.params.outletName,
        rsNumber: this.$route.params.rsNumber,
        rsChipType: this.$route.params.rsChipType,
        rsTypeId: this.$route.params.rsTypeId,
        qtyKeyword: '',
        dialog: false,
        dialogHeadline: '',
        totalOrder : 0,
        loading: false,
        snackbar: false,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 6000,
        text: '',
        formatMessage: '',
        loadingShow: true,
        orderShow: false
      }
    },
    mounted(){
      this.loadData()
    },
    methods: {
      toNominal(a,b,c,d,e){e=function(f){return f.split('').reverse().join('')};b=e(parseInt(a,10).toString());for(c=0,d='';c<b.length;c++){d+=b[c];if((c+1)%3===0&&c!==(b.length-1)){d+=',';}}return'\t'+e(d)+''},
      toRp(a,b,c,d,e){e=function(f){return f.split('').reverse().join('')};b=e(parseInt(a,10).toString());for(c=0,d='';c<b.length;c++){d+=b[c];if((c+1)%3===0&&c!==(b.length-1)){d+=',';}}return'\t'+e(d)+'.00'},
      loadData(){
        this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/orderProduct/'+this.rsChipType+'/'+this.rsTypeId).then((response) => {
          console.log(response.data)
          let dataProduct = response.data.data
          setTimeout(() =>{
            dataProduct.forEach(this.listProduct)
            this.orderShow = true
            this.loadingShow = false
          },1000)
        }).catch(function(error){
          console.log(error.message);
        })
      },
      listProduct(value, index, array){
        //console.log(index+" : "+value.rs_number+" "+value.outlet_name+" "+value.type_name)
        if(value.keyword == 'XLN'){
          this.items.push({title: value.stock_ref_name, subtitle: value.keyword, keyword: value.keyword, qty: 0, qtyCount: 0, priceRp: value.price+"%", price: value.price, flex:12})
        }else{
          this.items.push({title: value.stock_ref_name, subtitle: value.keyword+':'+this.toNominal(value.nominal), keyword: value.keyword, qty: 0, qtyCount:0, priceRp: 'Rp'+this.toRp(value.price), price: value.price, flex:12})
        }
      },
      orderQty(keyword){
        console.log(keyword)
        this.dialog = true
        this.dialogHeadline = keyword
      },
      tambahQty(){
        console.log(this.qtyKeyword)
        console.log(this.dialogHeadline)
        let newItems = this.items
        //this.items.splice(1, this.items.length)
        newItems.forEach(this.newListProduct)
        this.qtyKeyword = ''
        this.dialog = false
        this.totalOrder = 0
        newItems.forEach(this.countListProduct)
      },
      newListProduct(value, index){
        if(index > 0){
          if(this.dialogHeadline == value.keyword){
            this.items.splice(index,1, {title: value.title, subtitle: value.subtitle, keyword: value.keyword, qty: this.toNominal(this.qtyKeyword), qtyCount: this.qtyKeyword, priceRp: value.priceRp, price: value.price, flex: value.flex})
          }
        }
      },
      countListProduct(value, index){
        if(index > 0){
          if(value.keyword == 'XLN'){
            this.totalOrder += value.qtyCount - (value.qtyCount * value.price / 100)
          }else{
            this.totalOrder += value.qtyCount * value.price
          }
        }
      },
      dataRequestTopup(value, index){
        if(index > 0){
          if(value.qtyCount > 0){
            this.formatMessage = this.formatMessage+value.keyword+"."+value.qtyCount+"."
          }
        }
      },
      submit(){
        this.loading = true
        this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/account').then((response) => {
          console.log(response.data)
          console.log(response.data.data.member_balance)
          console.log(this.totalOrder)
          if(response.data.data.member_balance < this.totalOrder){
            this.loading = false
            this.snackbar = true
            this.text = "Saldo anda tidak cukup"
          }else{
            this.formatMessage = ''
            let dataTopup = this.items
            dataTopup.forEach(this.dataRequestTopup)
            console.log("data topup "+this.formatMessage)
            if(!this.formatMessage){
              this.snackbar = true
              this.text = "Qty belum diisi"
              this.loading= false
            }else{
              this.formatMessage = this.formatMessage+this.rsNumber
              this.$http.post(process.env.VUE_APP_CENTER_MOBILE+'/topup/'+this.formatMessage).then((response) =>{
                console.log(response.data)
                this.$router.replace({path : '/canvasser/transaction'})
              }).catch(error => {
                if(error.response){
                  console.log(error.response)
                  this.text = 'Data tidak diproses'
                  this.snackbar = true
                  this.loading = false
              }
              }).finally(() => {
                this.loading = false
              })
            }
          }
        }).catch(error => {
          if (error.response) {
            console.log(error.response)
            this.loading = false
          }
        })
      }
    }
  }
</script>