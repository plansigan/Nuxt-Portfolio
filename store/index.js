import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state:{
            loadedPosts:[]
        },
        mutations:{
            addPost(state,post){
                state.loadedPosts.push(post)
            },
            setPosts(state,posts){

                state.loadedPosts = posts
                console.log(state.loadedPosts)
            },
            editPost(state,editedPost){
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
                state.loadedPosts[postIndex] = editedPost 
            },
            deletePost(state,index){
                state.loadedPosts.splice(index,1)
            }
        },
        actions:{
            nuxtServerInit(vuexContext,context){
                return context.app.$axios
                        .$get(`${process.env.firebaseURL}/posts.json`)
                        .then(data=>{
                            const postsArray = []
                            for(const key in data){
                                postsArray.push({...data[key],id:key})
                            }
                            vuexContext.commit('setPosts',postsArray)
                        })
            },
            addPost(vuexContext,createdPost){
                return this.$axios
                        .$post(`${process.env.firebaseURL}/posts.json`,createdPost)
                        .then(data=>{
                        vuexContext.commit('addPost',{...createdPost,id:data.name})
                        // this.clear()
                        // alert('post successfully created');
                        this.$router.push('/')
                        })
                        .catch(e =>{
                        console.log(e)
                        })
            },
            editPost(vuexContext,editedPost){
                return this.$axios
                    // .$put(`${process.env.firebaseURL}/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,editedPost)
                    .$put(`${process.env.firebaseURL}/posts/${editedPost.id}.json`,editedPost)
                    .then(data => {
                        vuexContext.commit('editPost',editedPost)
                    })
                    .catch(e => {console.log(e)})
            },
            deletePosts(vuexContext,postsToDelete){
                // var newLoadedPosts = state.loadedPosts;
                return postsToDelete.forEach(e=>{
                        this.$axios
                            .$delete(`${process.env.firebaseURL}/posts/${vuexContext.state.loadedPosts[e].id}.json`)
                            .then(data => {
                                vuexContext.commit('deletePost',e)
                            })
                        })
            }
        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts
            }
        }
    })
}

export default createStore