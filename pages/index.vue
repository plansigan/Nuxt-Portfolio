<template>
<!-- <v-container grid-list-xl> -->
  <div>

      <v-toolbar dark color="#212121">
        <v-icon color="green" class="pulse">fa-circle</v-icon>
        <v-toolbar-title class="white--text">Welcome to my portfolio {{Guest ? Guest : 'Human'}}</v-toolbar-title>
        <v-btn dark v-if="isLoggedIn"><nuxt-link to="/admin" style="text-decoration:none">Manage Page</nuxt-link></v-btn>
        <v-spacer></v-spacer>

        <v-btn icon dark color="transparent" @click="expand =! expand">
          ?
        </v-btn>
        
        <v-expand-transition>
          <div v-show="expand">
            <v-btn icon >
              <a href="https://www.linkedin.com/in/paolo-luis-l-55682092/" target="_blank" style="text-decoration:none;"><v-icon color="white">fab fa-linkedin</v-icon></a>
            </v-btn>
            <v-btn icon>
              <a href="https://github.com/plansigan" target="_blank" style="text-decoration:none;"><v-icon color="white">fab fa-github</v-icon></a>
            </v-btn>
          </div>
        </v-expand-transition>
        
        
        
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
          <v-container>
            <SocialMedia v-show="socialMedia"></SocialMedia>
            <Comments v-show="!socialMedia"></Comments>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <template>
  <welcomeModal></welcomeModal>
</template>

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
import welcomeModal from '@/components/modals/welcome'
import Comments from '@/components/MainPage/MyProjectsComments'
    export default {

        mounted(){
          this.$root.$on('show-projects',(show)=>{
                this.showProjects = show
          })
          this.$root.$on('show-project-details',(data)=>{
              this.showProjectDetails = data.show
              this.socialMedia = !data.show
          })
        },
        data(){
          return {
            showProjects:false,
            showProjectDetails:false,
            socialMedia:true,
            expand:false
          }
        },
        components:{
            PortfolioInfo,
            PortfolioDetails,
            SocialMedia,
            MyProjects,
            MyProjectDetails,
            Comments,
            FadeTransition,
            welcomeModal
        },
        computed:{
          loadedPosts(){
            return this.$store.getters.loadedPosts
          },
          isLoggedIn(){
             if(this.$store.getters.isAuthenticated){
               return true
             }
          },
          Guest(){
             return this.$store.getters.Guest
          }
        },
        methods:{
          hideProjects(){
                this.$root.$emit('show-projects',false)
                this.$root.$emit('show-project-details',false)
            },
            getUser(user){
              this.user = user
            }
        }
    }
</script>

<style scoped>
    .card{
        height:85vh;
        overflow: hidden;
        overflow-y: scroll;

    }
    .card::-webkit-scrollbar { 
      display: none;
    }

    .iconBtn{
      color:white !important;
    }


    /* pulse animation */
    @keyframes pulse_animation {
        0% { transform: scale(1); }
        30% { transform: scale(1); }
        40% { transform: scale(1.3); }
        50% { transform: scale(1); }
        60% { transform: scale(1); }
        70% { transform: scale(1.1); }
        80% { transform: scale(1); }
        100% { transform: scale(1); }
    }
    .pulse {
        animation-name: pulse_animation;
        animation-duration: 2000ms;
        transform-origin:70% 70%;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
</style>

