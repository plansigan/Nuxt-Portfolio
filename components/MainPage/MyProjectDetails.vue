<template>
    <div>
        
        <v-img v-if="project.image" :src="project.image" max-height="500"/>
        <br>
        <h1>{{project.title}}</h1>
        <p>{{project.content}}</p>
        
        <div class="project-link" v-if="project.link">
            <h2>Project Link:</h2>
            <a :href="project.link" target="_blank">{{project.link}}</a>
        </div>

        <div class="project-link" v-else>
            <h2>Project Link:</h2>
            <p>Sorry, The project is a private app. :(</p>
        </div>
        <br>
        <div class="project-link" v-if="project.toolsSelected">
            <h2>Tools Used:</h2>
            <template v-for="(tool,i) in project.toolsSelected">
                <v-chip :style="{backgroundColor: randomColor()}" text-color="white" :key="i">{{tool}}</v-chip>
            </template>
            
        </div>
    </div>
</template>



<script>
    export default {
        data(){
            return {
                project:{}
            }
        },
        mounted(){
            this.$root.$on('show-project-details',(data)=>{
                this.project = data
            })
        },
        methods:{
            randomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
        }   
    }
</script>
