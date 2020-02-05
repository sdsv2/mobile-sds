<template>
  <v-app id="inspire">
  <v-layout row>
    <v-flex xs12>
      <v-card flat>
        <v-toolbar>
          <router-link to="/listrsNumber" tag="span" style="cursor:pointer">
           <v-btn icon>
              <v-icon color="light-blue darken-4">mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          <v-text-field flat color="light-blue darken-4 caption" placeholder="Cari..." v-model="numberRs" v-on:keyup="searchData" autofocus></v-text-field>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
              @click="orderProduct(item.rsNumber, item.outletName, item.rsChipType, item.rsTypeId)"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        appName: "RO/RS",
        items: [
          { header: 'Daftar Nomor RO/RS' },
        ],
        numberRs: ''
      }
    },
    mounted(){
      this.loadData()
    },
    methods: {
      loadData(){
        let dataRs = JSON.parse(localStorage.getItem('dataRsChipCanvasser'))
        dataRs.forEach(this.dataRsChip)
      },
      searchData(event){
        console.log(this.numberRs)
        if(this.numberRs.length > 0){
          this.items.splice(1, this.items.length)
          this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/searchRsNumber/'+this.numberRs).then((response) => {
            console.log(response.data)
            let dataRs = response.data.data
            dataRs.forEach(this.dataRsChip)
          }).catch(function(error){
            console.log(error.message)
          })
        }
      },
      dataRsChip(value, index, array){
        //console.log(index+" : "+value.rs_number+" "+value.outlet_name+" "+value.type_name)
        this.items.push({title: "<span class='font-weight-bold'>"+value.rs_number+"</span>", subtitle:"<span class='text--primary'>"+value.outlet_name+"</span> &mdash; "+value.type_name, rsNumber: value.rs_number, outletName: value.outlet_name, rsChipType: value.rs_chip_type, rsTypeId: value.rs_type_id})
        this.items.push({ divider: true, inset: false })
      },
      orderProduct(rsNumber, outletName, rsChipType, rsTypeId){
        console.log("chip number "+rsNumber)
        this.$router.replace({path: "/orderProduct/"+rsNumber+"/"+outletName+"/"+rsChipType+"/"+rsTypeId})
      }
    }
  }
</script>