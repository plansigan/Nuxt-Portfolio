<template>
    <div>
        <Twitter v-show="socialMedia == 'Twitter'"></Twitter>
        <Instagram v-show="socialMedia == 'Instagram'"></Instagram>
        <Reddit v-show="socialMedia == 'Reddit'"></Reddit>
        

        <div id="feedIcons"              
              
               >
            <v-btn
              color="blue"
              fab
              dark
              @click="switchFeed('Twitter')" medium
            >
              <v-icon>fab fa-twitter</v-icon>
            </v-btn>
            <v-btn
              color="pink"
              fab
              dark
              @click="switchFeed('Instagram')"
            >
              <v-icon>fab fa-instagram</v-icon>
            </v-btn>
            <v-btn
              color="red"
               fab
              dark
              @click="switchFeed('Reddit')"
            >
              <v-icon>fab fa-reddit-alien</v-icon>
            </v-btn>
        </div>
    </div>
</template>


<script>
import Twitter from '@/components/MainPage/SocialMedia/Twitter'
import Instagram from '@/components/MainPage/SocialMedia/Instagram'
import Reddit from '@/components/MainPage/SocialMedia/Reddit'
export default {
    data(){
        return {
            socialMedia:'Twitter'
        }
    },
    components:{
        Twitter,
        Instagram,
        Reddit
    },
    methods:{
        switchFeed(feed){
            this.socialMedia = feed
        }
    }
}
</script>

<style scoped>
    #feedIcons{
        position: fixed;
        bottom: 15%;
        left: 94%;
    }
    /* #feedIcons > *{
        margin:0% 10%;
    } */

    @media only screen and (max-width:1904px){
        #feedIcons{
            position: fixed;
            font-size:5px;
            bottom: 10%;
            left: 90%;
        }
    }
</style>

