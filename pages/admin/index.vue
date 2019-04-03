<template>
        <v-layout row>
            <v-flex xs12>
                <v-btn @click="$router.push('/')" flat dark>Main Page</v-btn>
                <v-btn color="dark green" @click="$router.push('/admin/new-post')" dark>Create post +</v-btn>
                <transition name="fade">
                    <v-btn color="dark red" @click="deletePosts(selected)" v-if="selected.length > 0">Delete ({{selected.length}})</v-btn>
                </transition>
                <v-btn style="float:right" color="dark grey" @click="logout">Log-out</v-btn>
                <h2>List of Posts</h2>
                <br>
                <v-card>
                    <v-list two-line>
                        
                        <template class="list" v-for="(post, index) in loadedPosts">
                            <v-list-tile
                            :key="post.title"
                            avatar
                            ripple
                            >
                            <v-list-tile-content @click="editPost(index)" style="cursor:pointer">
                                <v-list-tile-title>{{ post.title }}</v-list-tile-title>
                                <v-list-tile-sub-title class="text--primary">{{ post.previewContent }}</v-list-tile-sub-title>
                                <!-- <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title> -->
                            </v-list-tile-content>


                            <v-list-tile-action @click="toggle(index)">
                                <v-icon
                                v-if="selected.indexOf(index) < 0"
                                >
                                fa-trash
                                </v-icon>

                                <v-icon
                                v-else
                                color="red darken-2"
                                >
                                fa-trash
                                </v-icon>
                            </v-list-tile-action>
                            

                            </v-list-tile>
                            <v-divider
                            v-if="index + 1 < loadedPosts.length"
                            :key="index"
                            ></v-divider>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
</template>


<script>
    export default {
        name:'admin',
        layout:'admin',
        middleware:['check-auth','auth'],
        data(){
            return {
                selected:[]
            }
        },
        computed:{
          loadedPosts(){
            return this.$store.getters.loadedPosts
          }
        },
        methods:{
            editPost(index){
                this.$router.push(`/admin/${this.loadedPosts[index].id}`)
            },
            toggle (index) {
                const i = this.selected.indexOf(index)

                if (i > -1) {
                this.selected.splice(i, 1)
                } else {
                this.selected.push(index)
                }
            },
            deletePosts(selected){
                if(confirm(`are you sure you want to delete ${selected.length} post(s)?`)){
                    alert('posts has been deleted!')
                    this.$store.dispatch('deletePosts',selected,this.loadedPosts)
                        .then(()=>{
                            // this.$router.go('.')
                            this.selected = []
                        })
                    
                }
            },
            logout(){
                this.$store.dispatch('logout')
            }
        }  
    }
</script>
