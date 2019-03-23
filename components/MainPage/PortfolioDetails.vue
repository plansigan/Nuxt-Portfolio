<template>
    <div>
        <WhoAmI v-if="showDetail == 'WhoAmI'"></WhoAmI>
        <WhatIDo  v-if="showDetail == 'WhatIDo'"></WhatIDo>
        <MyProjects v-if="showDetail == 'MyProjects'"></MyProjects>
    </div>
</template>

<script>
import WhatIDo from '@/components/MainPage/PortfolioDetails/WhatIDo'
import WhoAmI from '@/components/MainPage/PortfolioDetails/WhoAmI'
import MyProjects from '@/components/MainPage/PortfolioDetails/MyProjects'
    export default {
        data(){
            return {
                // postDetail:{}
                showDetail:'WhoAmI'
            }
        },
        mounted(){
            this.$root.$on('show-details',(details)=>{
                this.showDetail = details
            })
        },
        components:{
            WhatIDo,
            WhoAmI,
            MyProjects
        }
    }
</script>
