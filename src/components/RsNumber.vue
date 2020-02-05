<template>
  <v-app id="inspire">
  <v-layout row>
    <v-flex xs12>
      <v-card flat>
        <v-toolbar color="light-blue darken-4" dark flat>
          <router-link to="/canvasser/transaction" tag="span" style="cursor:pointer">
           <v-btn icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          <v-toolbar-title class="body-2">{{ appName }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <router-link to="/searchrsNumber" tag="span" style="cursor:pointer">
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </router-link>
        </v-toolbar>
        <div class="text-xs-center">
          <v-progress-circular style="margin-top:200px"
            :size="50"
            color="primary"
            indeterminate
            v-if="loadingShow"
          ></v-progress-circular>
        </div>
        <v-list two-line v-if="rsShow">
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
        loadingShow: true,
        rsShow: false
      }
    },
    mounted(){
      this.loadData()
    },
    methods: {
      loadData (){
        this.$http.get(process.env.VUE_APP_CENTER_MOBILE+'/rsNumber').then((response) => {
          console.log(response.data)
          let dataRs = response.data.data
          setTimeout(() =>{
            localStorage.setItem('dataRsChipCanvasser', JSON.stringify(dataRs))
            dataRs.forEach(this.dataRsChip)
            this.loadingShow = false
            this.rsShow = true
          },1000)
        }).catch(function(error){
          console.log(error.message);
        })
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