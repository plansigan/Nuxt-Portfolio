<template>
  <v-app dark :class="{mainPage:!Guest}">
      <transition name="page">
        <nuxt v-show="Guest" class="hidden-sm-and-down"/>
      </transition>
      <v-container class="hidden-md-and-up"><h1>Sorry, this size is currently not available for now.</h1></v-container>
      <welcomeModal></welcomeModal>
  </v-app>
</template>


<script>
import welcomeModal from '@/components/modals/welcome'
import io from 'socket.io-client'

var socket = io.connect(process.env.baseURL);

export default {
  beforeMount(){
                socket.emit('Created')


                //messaging sockets
                socket.on('Created',(data)=>{
                  this.$store.dispatch('setMessages',data)
                })

                socket.on('chat-message',(data)=>{
                  this.$store.dispatch('pushMessage',{user:data.user,message:data.message,type:1})
                })

                this.$root.$on('send-to-all',message=>{
                  socket.emit('send-to-all',message)
                })
                
                //admin connected sockets
                socket.on('is-admin-connected',(data)=>{
                    this.$store.dispatch('setAdmin',data)
                })
                
                socket.on('is-admin-logged-in',(data)=>{
                    this.$store.dispatch('setAdmin',data)
                })

                this.$root.$on('is-admin-logged-in',data=>{
                  socket.emit('is-admin-logged-in',data)
                })
                
  },
  computed:{
    Guest(){
      return this.$store.getters.Guest
    }
  },
  components:{
    welcomeModal
  }
}
</script>

<style scoped>
  .mainPage{
    animation:1s;
    background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))
  }
</style>

