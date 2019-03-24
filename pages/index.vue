<template>
<v-container fluid>
    <v-toolbar dark color="#212121">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Paolo Luis G. Lansigan</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
        <v-icon>more_vert</v-icon>
        </v-btn>
  </v-toolbar>
    <v-layout row>
      <v-flex lg8>
        <v-card class="card" dark color="primary">
          <v-card-text v-if="showProjects == false"><PortfolioInfo></PortfolioInfo></v-card-text>
          <v-card-text v-if="showProjects == true"><MyProjects></MyProjects></v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg6>
        <v-card class="card" dark color="secondary">
          <v-card-text><PortfolioDetails></PortfolioDetails></v-card-text>
        </v-card>   
      </v-flex>
      <v-flex lg6>
        <v-card class="card" dark color="accent">
          <v-card-text><SocialMedia></SocialMedia></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer> -->
  </v-container>
</template>


<script>
import PortfolioInfo from '@/components/MainPage/PortfolioInfo'
import PortfolioDetails from '@/components/MainPage/PortfolioDetails'
import SocialMedia from '@/components/MainPage/SocialMedia'
import MyProjects from '@/components/MainPage/MyProjects'
    export default {
        layout:'mainLayout',
        mounted(){
          this.$root.$on('show-projects',(show)=>{
                this.showProjects = show
            })
        },
        data(){
          return {
            showProjects:false
          }
        },
        components:{
            PortfolioInfo,
            PortfolioDetails,
            SocialMedia,
            MyProjects
        }
    }
</script>

<style scoped>
    .card{
        height:100%;
    }
</style>

