<template>
    <div>
        <h1>My Projects</h1>
        <br>
        <v-btn depressed normal @click="hideProjects">Go Back</v-btn>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                showProjects:''
            }
        },
        methods:{
            hideProjects(){
                this.$root.$emit('show-projects',false)
            }
        }   
    }
</script>

