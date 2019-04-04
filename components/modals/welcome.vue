<template>
    <div class="text-xs-center">
    <v-dialog persistent
      v-model="dialogUser"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <div style="display:none">
          <v-btn
          color="transparent"
          v-on="on"
        >
        </v-btn>
        </div>
      </template>

      <v-card>
        <!-- <v-card-title
          class="headline"
          primary-title
        >
          Welcome
        </v-card-title> -->

        <v-card-text>
          <h2>What's your name?</h2>
          <v-flex align-center>
            <v-text-field v-model="Guest"
              placeholder="Jordan Schlansky"
            ></v-text-field>
          </v-flex>
          <b>NOTE</b>: this website uses cookies. to maximize the user experience of this website please enable your cookies.
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
             flat
            @click="dialog"
          >
            Yep, this is absolutely me
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
    export default {
        data(){
            return {
                dialogUser:true,
                Guest:''
            }
        },
        created(){
                this.$store.dispatch('setGuest',false)

                if(this.$store.getters.Guest) {
                    this.dialogUser = false
                }
        },
        methods:{
            dialog(){
                if(this.Guest){
                    this.dialogUser = false
                    this.$store.dispatch('setGuest',this.Guest)
                }
            }
        }
    }
</script>
