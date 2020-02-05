<template>
  <v-app id="inspire">
  <v-layout row>
    <v-flex xs12>
      <v-card flat>
        <v-toolbar color="light-blue darken-4" dark flat>
          <router-link to="/canvasser/account" tag="span" style="cursor:pointer">
           <v-btn icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          <v-toolbar-title class="body-2">{{ appName }}</v-toolbar-title>

          <v-spacer></v-spacer>

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
        appName: "Tentang Aplikasi",
        items: [
          { header: 'Mobile SDS' },
        ],
      }
    },
    mounted(){
      this.loadData()
    },
    methods: {
      loadData (){
        
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