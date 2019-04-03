<template>
<!-- <v-container grid-list-xl> -->
  <div>
    <v-container>
      <v-toolbar dark color="#212121">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Paolo Luis G. Lansigan</v-toolbar-title>
        <v-btn dark v-if="isLoggedIn"><nuxt-link to="/admin" style="text-decoration:none">Manage Page</nuxt-link></v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
        <v-icon>more_vert</v-icon>
        </v-btn>
    </v-toolbar>
    <v-layout justify-center row>
      <v-flex :class="{'xs3 pt-2 px-1':showProjectDetails,'xs6 pt-2 px-1':!showProjectDetails}">
        <v-card  dark color="accent">
          <fade-transition mode="out-in">
            <v-card-text key="blue" class="card" v-if="!showProjects" ><PortfolioInfo></PortfolioInfo></v-card-text>
            <v-card-text key="red" class="card" v-else><MyProjects :projects="loadedPosts"></MyProjects>
              <v-btn
                color="orange darken-2"
                dark
                absolute
                bottom
                left
                fab
                @click="hideProjects"
                >
                <v-icon>arrow_back</v-icon>
              </v-btn>
            </v-card-text>
          </fade-transition>
          
          
        </v-card>
      </v-flex>
      <v-flex :class="{'xs6 pt-2 px-1':showProjectDetails,'xs3 pt-2 px-1':!showProjectDetails}">
        <v-card class="card" dark color="accent">
          <v-card-text><PortfolioDetails v-show="!showProjectDetails"></PortfolioDetails></v-card-text>
          <v-card-text v-show="showProjectDetails"><MyProjectDetails :projects="loadedPosts"></MyProjectDetails></v-card-text>
        </v-card>   
      </v-flex>
      <v-flex class="xs3 pt-2 px-1">
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
import FadeTransition from '@/components/transitions/FadeTransition'
    export default {

        mounted(){
          this.$root.$on('show-projects',(show)=>{
                this.showProjects = show
          })
          this.$root.$on('show-project-details',(data)=>{
              this.showProjectDetails = data.show
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
            MyProjectDetails,
            FadeTransition
        },
        computed:{
          loadedPosts(){
            return this.$store.getters.loadedPosts
          },
          isLoggedIn(){
             if(this.$store.getters.isAuthenticated){
               return true
             }
          }
        },
        methods:{
          hideProjects(){
                this.$root.$emit('show-projects',false)
                this.$root.$emit('show-project-details',false)
            }
        },
    }
</script>

<style scoped>
    .card{
        height:75vh;
        overflow: hidden;
        overflow-y: scroll;

    }
    .card::-webkit-scrollbar { 
      display: none;
    }
</style>

