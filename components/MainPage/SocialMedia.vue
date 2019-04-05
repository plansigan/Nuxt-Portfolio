<template>
    <div>
        <Twitter v-show="socialMedia == 'Twitter'"></Twitter>
        <Instagram v-show="socialMedia == 'Instagram'"></Instagram>
        <Reddit v-show="socialMedia == 'Reddit'"></Reddit>
            
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

