import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state:{
            loadedPost:[]
        },
        mutations:{},
        actions:{},
        getters:{}
    })
}

export default createStore