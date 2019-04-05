<template>
    <div>
        <Twitter v-show="socialMedia == 'Twitter'"></Twitter>
        <Instagram v-show="socialMedia == 'Instagram'"></Instagram>
        <Reddit v-show="socialMedia == 'Reddit'"></Reddit>
        
        <div class="socialIcons">
            <v-speed-dial
                bottom
                right
                direction="top"
                :open-on-hover="true"
            >
                <template v-slot:activator>
                    <v-btn
                    v-model="fab"
                    color="blue darken-2"
                    dark
                    fab
                    >
                    <v-icon>account_circle</v-icon>
                    <v-icon>close</v-icon>
                    </v-btn>
                </template>
                        <v-btn
                        class="socialBtn"
                        color="blue"
                        fab
                            dark
                            medium
                        @click="switchFeed('Twitter')"
                        >
                        <v-icon>fab fa-twitter</v-icon>
                        </v-btn>
                        <v-btn
                        class="socialBtn"
                        color="pink"
                        fab
                            dark
                            medium
                        @click="switchFeed('Instagram')"
                        >
                        <v-icon>fab fa-instagram</v-icon>
                        </v-btn>
                        <v-btn
                        class="socialBtn"
                        color="red"
                        fab
                            dark
                            medium
                        @click="switchFeed('Reddit')"
                        >
                        <v-icon>fab fa-reddit-alien</v-icon>
                        </v-btn>
                
            </v-speed-dial>
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
            socialMedia:'Twitter',
            fab:false
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
    .v-speed-dial {
        position: absolute;
    }
    .v-btn--floating {
        position: relative;
    }
    .socialIcons{
        position:fixed;
        top:92%;
        left:99%;
    }
</style>


