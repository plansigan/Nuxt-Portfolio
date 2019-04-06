<template>
    <v-layout row>
        <v-flex>
        <v-card class="chatCard">
            <v-toolbar color="light-blue" dark>
                <v-toolbar-title>My Chat app</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-list two-line class="chatList">
                <template v-for="(message,index) in messages" >
                    <div :key="index">
                        <v-container >
                            <v-layout justify-end v-if="message.type == 0">
                                <div class="chatMessageContainer from">
                                    <h3 style="float:right">{{message.user}}</h3>
                                    <br>
                                    <br>
                                    <div style="float:right;width:100%;">
                                        <p>{{message.message}}</p>
                                    </div>
                                </div>
                            </v-layout>
                            <v-layout align-start justify-start v-else-if="message.type == 2">
                                <div class="chatMessageContainer to">
                                    <h3 style="float:left">{{message.user}}</h3>
                                    <br>
                                    <br>
                                    <p>{{message.message}}</p>

                                </div>
                            </v-layout>

                            <v-layout align-start justify-start v-else>
                                <div class="chatMessageContainer past">
                                    <h3 style="float:left">{{message.user}}</h3>
                                    <br>
                                    <br>
                                    <p>{{message.message}}</p>
                                </div>
                            </v-layout>
                        </v-container>
                    <v-divider></v-divider>
                    </div>
                    
                </template>
            </v-list>   

            <v-container>
                <v-form @submit.prevent="submit">
                    <v-text-field
                    v-model="message"
                    label="Chat me!"
                    >
                    </v-text-field>
                </v-form>
            </v-container>
        </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import io from 'socket.io-client'

var socket = io.connect(window.location.origin || 'http://localhost');

export default {
  created() {
      //on create get all messages from client
    socket.emit('Created')
    socket.on('Created',(data)=>{
        console.log(data)
      this.messages = data
    })

    socket.on('chat-message',data=>{
      this.messages.push({user:data.user,message:data.message,type:1})
    })
  },
  data() {
    return {
      message:null,
      messages:[]
    }
  },
  methods:{
    submit(){
      var message = {user:this.Guest,message:this.message,type:0}
      socket.emit('chat-message',message)
      this.messages.push(message)
      this.message = null
    }
  },
  computed:{
    Guest(){
      return this.$store.getters.Guest
    }
  }
}
</script>


<style scoped>
  .User{
      float:right;
  }
  .chatMessageContainer{
      padding:10px;
      border-radius: 10px;
      display:inline-block;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
      word-wrap: break-word;
      width:100%
  }

  .chatMessageContainer.from {
      background-color:darkslategray;
  }

  .chatMessageContainer.to {
      background-color:darkcyan;
  }

  .chatMessageContainer.past {
      background-color:gray;
  }
  .chatList{
      overflow-y: scroll;
      max-height: 50vh;
  }

  .chatCard{
      border-radius: 10px;
      width:100%;
  }
</style>
