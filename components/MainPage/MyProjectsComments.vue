<template>
    <div>
        <h1>Comments</h1>
        <v-btn color="blue" flat @click="showComment = !showComment" v-show="!showComment">Add Comment</v-btn>

        <form v-show="showComment" @submit.prevent="submit">
            <v-text-field
                name="comment"
                label="Add Comment"
                :error-messages="commentErrors"
                :counter="100"
                v-model="comment"
                @input="$v.comment.$touch()"
                @blur="$v.comment.$touch()"
            ></v-text-field>
            <v-btn @click="submit" color="primary">Submit</v-btn>
        </form>

        <v-list two-line>
          <template v-for="(comment) in commentList">

            <v-list-tile
              :key="comment.comment"
              avatar
            >
              <v-list-tile-avatar>
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{comment.User}}</v-list-tile-title>
                <v-list-tile-sub-title>{{comment.comment}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{comment.createdDate | date}}</v-list-tile-sub-title>
              </v-list-tile-content>
        </v-list-tile>
        </template>   
        </v-list>
    </div>
</template>


<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength,minLength, email } from 'vuelidate/lib/validators'
    export default {
        mixins:[validationMixin],
        data() {
            return {
                showComment:false,
                comment:''
            }
        },
        validations:{
            comment:{maxLength:maxLength(100),required}
        },
        computed:{
            commentErrors(){
                const errors = []
                if(!this.$v.comment.$dirty) return errors
                !this.$v.comment.maxLength && errors.push('Maximum of 100 characters only')
                !this.$v.comment.required && errors.push('Type Something')
                return errors
            },
            commentList(){
                return this.$store.getters.viewedPostCommentList
            }
        },
        methods:{
            submit(){
                this.$v.$touch
                if (!this.$v.$invalid) {
                    this.$store.dispatch('addComment',{comment:this.comment,createdDate:new Date(),User:this.$store.getters.Guest})
                        .then(()=>{
                            // alert('comment added successfully!')
                            this.comment = ''
                            this.showComment = false
                        })
                    
                }
            },
            clear(){
                this.$v.$reset()
                this.comment = ''
            }
        }
    }
</script>
