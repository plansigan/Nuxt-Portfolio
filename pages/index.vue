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
          <v-card-text><PortfolioInfo></PortfolioInfo></v-card-text>
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
    export default {
        layout:'mainLayout',
        components:{
            PortfolioInfo,
            PortfolioDetails,
            SocialMedia
        }
    }
</script>

<style scoped>
    .card{
        height:100%;
        
    }
</style>

