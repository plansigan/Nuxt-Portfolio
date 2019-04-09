<template>
    <div>
        <h2>Tools Used</h2>
        <br>
        <v-text-field
      v-model="tool"
      label="Add new tools"
      solo
      @keydown.enter="create"
    >
      <v-fade-transition v-slot:append>
        <v-icon
          v-if="tool"
          @click="create"
        >
          add_circle
        </v-icon>
      </v-fade-transition>
    </v-text-field>

    <v-divider class="mt-3"></v-divider>

    <v-card v-if="tools.length > 0">
      <v-slide-y-transition
        class="py-0"
        group
      >
        <template v-for="(tool, i) in tools">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>
            
          <v-list-tile :key="`${i}-${tool.text}`" overflow-y-hidden style="max-height:500px">
            <v-list-tile-action >
              <v-checkbox
                v-model="toolsSelected"
                color="info darken-3"
                :value="tool.text"
              >
                <template v-slot:label>
                  <div
                    :class="tool.done && 'grey--text' || 'text--primary'"
                    class="ml-3"
                    v-text="tool.text"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-tile-action>

            <v-spacer></v-spacer>
            
            <v-scroll-x-transition>
               <v-icon class="deleteTool" v-if="!tool.done" @click="deleteTool(i)"  color="red">fa-times</v-icon>
              <v-icon
                v-if="tool.done"
                color="success"
              >
                check
              </v-icon>
            </v-scroll-x-transition>
          </v-list-tile>
        </template>
      </v-slide-y-transition>
    </v-card>
    <br>
    <v-btn color="primary" @click="saveTools">Save tools</v-btn>
    </div>
</template>


<script>
  export default {
    watch:{
        toolsSelected(){
            this.setTools()
        }
    },
    created(){
        this.getTools()
    },
    data: () => ({
      tools: [],
      tool: null,
      toolsSelected:[]
    }),

    computed: {
      completedtools () {
        return this.tools.filter(tool => tool.done).length
      },
      progress () {
        return this.completedtools / this.tools.length * 100
      },
      remainingtools () {
        return this.tools.length - this.completedtools
      }
    },
    methods: {
      create () {
        this.tools.push({
          done: false,
          text: this.tool
        })
        this.tool = null
        
      },
      getTools(){
          this.$axios.$get(`${process.env.firebaseURL}/tools/-LbzZw0I5eiquXAVOCRK.json`)
            .then((data)=>{
                this.tools = data
            })
      },
      saveTools(){
            this.$axios.$put(`${process.env.firebaseURL}/tools/-LbzZw0I5eiquXAVOCRK.json`,this.tools)
                .then(()=>{
                    alert('saved tools!')
                })
      },
      deleteTool(index){
          this.tools.splice(index,1)
      },
      setTools(){
        this.$root.$emit('tools-used',this.toolsSelected)
        console.log(this)
      }
    }
    
  }
</script>

<style scoped>
    .deleteTool:hover{
        cursor:pointer;
    }
</style>
