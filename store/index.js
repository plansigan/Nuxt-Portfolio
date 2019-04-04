import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state:{
            loadedPosts:[],
            token:null,
            Guest:''
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
            },
            setToken(state,token){
                state.token = token
                
            },
            clearToken(state){
                state.token = null
            },
            setGuest(state,Guest){
                state.Guest = Guest
                
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
                    .$put(`${process.env.firebaseURL}/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,editedPost)
                    // .$put(`${process.env.firebaseURL}/posts/${editedPost.id}.json`,editedPost)
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
            },
            authenticateUser(vuexContext,authData){
                let authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.fbAPIKey}`

                if(!authData.isLogin){
                    authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.fbAPIKey}`
                }

                this.$axios.$post(authUrl,{
                    email:authData.email,
                    password:authData.password,
                    returnSecureToken:true
                }).then(result => {
                    //store the token to state.token
                    vuexContext.commit('setToken',result.idToken);
                    localStorage.setItem('token',result.idToken);
                    localStorage.setItem('tokenExpiration',new Date().getTime()  + Number.parseInt(result.expiresIn) * 1000);
                    Cookie.set('jwt',result.idToken)
                    Cookie.set('expirationDate', new Date().getTime()  + Number.parseInt(result.expiresIn) * 1000)
                })
                .catch(e=>{console.log(e)})
            },
            initAuth(vuexContext,req){
                let token;
                let expirationDate;
                if(req) {
                    if(!req.headers.cookie){
                        return
                    }

                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
                    const guestCookie = req.headers.Guest;

                    if(guestCookie) {
                        vuexContext.commit('setGuest',guestCookie)
                    }

                    if(!jwtCookie) {
                        return
                    }

                    token = jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1];
                } else {
                    
                    token = localStorage.getItem('token')
                    expirationDate = localStorage.getItem('tokenExpiration');
                }
                
                if(new Date().getTime() > +expirationDate || !token){
                    vuexContext.dispatch('logout')
                    return;
                }
                
                vuexContext.commit('setToken',token);
                
            },
            logout(vuexContext){
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');

                if(process.client){
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }

                this.$router.push('/admin/auth')
                
            },
            setGuest(vuexContext,Guest){

                if(Guest) {
                    vuexContext.commit('setGuest', Guest)
                    
                    if(process.client){
                        localStorage.setItem('Guest',Guest);
                    }
                    //setting up guest on cookie
                    
                    Cookie.set('Guest',Guest)
                } else {
                    if(process.client){
                        vuexContext.commit('setGuest',localStorage.getItem('Guest'))
                    }   
                }
                
            }
        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts
            },
            isAuthenticated(state){
                return state.token != null
            },
            Guest(state){
                return state.Guest
            }
        }
    })
}

export default createStore