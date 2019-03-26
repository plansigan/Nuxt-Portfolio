<template>
    <div>
        <Twitter v-if="socialMedia == 'Twitter'"></Twitter>
        <Instagram v-if="socialMedia == 'Instagram'"></Instagram>
        <Reddit v-if="socialMedia == 'Reddit'"></Reddit>

        <div id="feedIcons">
            <v-icon @click="switchFeed('Twitter')" large>whatshot</v-icon>
            <v-icon @click="switchFeed('Instagram')" large>party_mode</v-icon>
            <v-icon @click="switchFeed('Reddit')" large>account_circle</v-icon>
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
        position: absolute;
        bottom: 5%;
        left: 75%;
    }
    /* #feedIcons > *{
        margin:0% 10%;
    } */
</style>

