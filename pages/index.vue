<template>
<!-- <v-container grid-list-xl> -->
  <div>
    <v-container>
      <v-toolbar dark color="#212121">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Paolo Luis G. Lansigan</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
        <v-icon>more_vert</v-icon>
        </v-btn>
    </v-toolbar>
    <v-layout justify-center fill-height row>
      <v-flex xs6 pt-2 px-1>
        <v-card class="card" dark color="accent" overflow-hidden>
          <v-card-text v-if="!showProjects" ><PortfolioInfo></PortfolioInfo></v-card-text>
          <v-card-text v-if="showProjects"><MyProjects :projects="loadedPosts"></MyProjects></v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 pt-2 px-1>
        <v-card class="card" dark color="accent">
          <v-card-text><PortfolioDetails v-if="!showProjectDetails"></PortfolioDetails></v-card-text>
          <v-card-text v-if="showProjectDetails"><MyProjectDetails :projects="loadedPosts"></MyProjectDetails></v-card-text>
        </v-card>   
      </v-flex>
      <v-flex xs3 pt-2 px-1>
        <v-card class="card" dark color="accent">
          <v-card-text><SocialMedia></SocialMedia></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </div>
      <!-- <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer> -->
    <!-- </v-container> -->
</template>


<script>
import PortfolioInfo from '@/components/MainPage/PortfolioInfo'
import PortfolioDetails from '@/components/MainPage/PortfolioDetails'
import SocialMedia from '@/components/MainPage/SocialMedia'
import MyProjects from '@/components/MainPage/MyProjects'
import MyProjectDetails from '@/components/MainPage/MyProjectDetails'
    export default {

        mounted(){
          this.$root.$on('show-projects',(show)=>{
                this.showProjects = show
          })
          this.$root.$on('project-details',(show)=>{
              this.showProjectDetails = show
          })
        },
        data(){
          return {
            showProjects:false,
            showProjectDetails:false
          }
        },
        components:{
            PortfolioInfo,
            PortfolioDetails,
            SocialMedia,
            MyProjects,
            MyProjectDetails
        },
        computed:{
          loadedPosts(){
            return this.$store.getters.loadedPosts
          }
        }
    }
</script>

<style scoped>
    .card{
        height:100%;
    }
</style>

