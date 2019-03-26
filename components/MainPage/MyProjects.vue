<template>
    <div>
        <h1>My Projects</h1>
        <br>
        <v-layout row>
            <v-flex>
                <v-card>
                    <v-list two-line>
                        <template v-for="(project,index) in projects">
                            <v-list-tile
                            :key="project.title"
                            avatar
                            ripple
                            @click="toggle(index),projectDetails(index)"
                            >
                            <v-list-tile-content>
                                <v-list-tile-title>{{project.title}}</v-list-tile-title>
                                <v-list-tile-sub-title>{{project.previewContent}}</v-list-tile-sub-title>
                            </v-list-tile-content>


                            <v-list-tile-action>
                            <v-list-tile-action-text>Read more</v-list-tile-action-text>
                            <v-icon
                            v-if="selected.indexOf(index) < 0"
                            color="grey lighten-1"
                            >
                            star_border
                            </v-icon>

                            <v-icon
                            v-else
                            color="yellow darken-2"
                            >
                            star
                            </v-icon>
                        </v-list-tile-action>


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
        <v-btn depressed normal @click="hideProjects">Go Back</v-btn>
        
    </div>
</template>

<script>
    export default {
        props:['projects'],
        data(){
            return {
                selected: [2],
            }
        },
        methods:{
            hideProjects(){
                this.$root.$emit('show-projects',false)
                this.$root.$emit('project-details',false)
            },
            toggle (index) {
                const i = this.selected.indexOf(index)

                if (i > -1) {
                this.selected.splice(i, 1)
                } else {
                this.selected.push(index)
                }


            },
            projectDetails(index){
                // alert(index)
                this.$root.$emit('project-details',true)
            }
        }   
    }
</script>

