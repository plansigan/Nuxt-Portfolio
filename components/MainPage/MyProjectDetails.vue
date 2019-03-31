<template>
    <div>
        
        <v-img v-if="project.image" :src="project.image" max-height="600"/>

        <h1>{{project.title}}</h1>
        <p>{{project.content}}</p>
        
        <div class="project-link" v-if="project.link">
            <h2>Project Link:</h2>
            <a :href="project.link" target="_blank">{{project.link}}</a>
        </div>
    </div>
</template>



<script>
    export default {
        data(){
            return {
                project:{}
            }
        },
        mounted(){
            this.$root.$on('show-project-details',(data)=>{
                this.project = data
            })
        }   
    }
</script>
