<template>
    <div>
        <div class="project-list" style="position: relative">
            <h1>My Projects</h1>
                <br>
                <v-layout row>
                    <v-flex>
                        <v-card flat>
                            <v-list two-line>
                                <template v-for="(project,index) in projects">
                                    <v-list-tile
                                    :key="project.title"
                                    avatar
                                    ripple
                                    @click="projectDetails(index)"
                                    >
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{project.title}}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{project.previewContent}}</v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    </v-list-tile>
                                    <v-divider
                                    v-if="index + 1 < project.length"
                                    :key="index"
                                    ></v-divider>
                                </template>
                            </v-list>
                        </v-card>
                    </v-flex>
                </v-layout>
                <!-- <v-btn depressed normal @click="hideProjects">Go Back</v-btn> -->
        </div>

    </div>
</template>

<script>
    export default {
        props:['projects'],
        methods:{
            projectDetails(index){
                // alert(index)
                this.$root.$emit('show-project-details',{...this.projects[index],show:true,index})
            }
        }   
    }
</script>

<style scoped>
    .back-button{
        top:73vh;
        position:absolute !important;
    }
</style>


