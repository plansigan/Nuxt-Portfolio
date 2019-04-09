<template>
<v-content>
      <v-container fluid fill-height>
          <v-layout align-center justify-center>
              <v-flex x12 sm8 md4>
                <form >
                    <h1>{{formTitle}}</h1>
                    <v-text-field
                    v-model="editedPost.title"
                    :error-messages="titleErrors"
                    label="Title"
                    required
                    @input="$v.editedPost.title.$touch()"
                    @blur="$v.editedPost.title.$touch()"
                    ></v-text-field>
                    <v-text-field
                    v-model="editedPost.previewContent"
                    :error-messages="previewContentErrors"
                    label="Preview Content"
                    required
                    @input="$v.editedPost.previewContent.$touch()"
                    @blur="$v.editedPost.previewContent.$touch()"
                    ></v-text-field>
                    <v-textarea
                    v-model="editedPost.content"
                    :error-messages="contentErrors"
                    name="contentPost"
                    label="Content"
                    value=""
                    hint="Tell something about this post"
                    @input="$v.editedPost.content.$touch()"
                    @blur="$v.editedPost.content.$touch()"
                    ></v-textarea>

                    <tools/>
                    <v-text-field
                    v-model="editedPost.link"
                    label="Project link"
                    >
                    </v-text-field>

                    <v-text-field
                    v-model="editedPost.image"
                    label="Project Image"
                    >
                    </v-text-field>

                    <v-checkbox
                    v-model="editedPost.isDisplayed"
                    label="is Displayed"
                    required
                    @change="$v.editedPost.isDisplayed.$touch()"
                    @blur="$v.editedPost.isDisplayed.$touch()"
                    ></v-checkbox>
                    
                    <div class="btns">
                      <v-btn color="dark green" @click="submit">submit</v-btn>
                      <nuxt-link to="./" style="text-decoration:none;"><v-btn color="dark red">Back</v-btn></nuxt-link>
                      <v-btn color="primary" @click="clear">clear</v-btn>
                    </div>
                    
                </form>
              </v-flex>
          </v-layout>
      </v-container>
  </v-content>
</template>


<script>
  import tools from '@/components/modals/tools'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength,minLength, email } from 'vuelidate/lib/validators'

  export default {
    mounted(){
      this.$root.$on('tools-used',data=>{
        this.editedPost.toolsSelected = data
      })
    },
    components:{
      tools
    },
    mixins: [validationMixin],

    validations: {
      editedPost:{
        title: { required,minLength:minLength(5) },
        previewContent: { required },
        isDisplayed: {
          checked (val) {
            return val
          }
        },
        content:{required, minLength:minLength(20)}
      }
      
    },
    props:{
            post:{
                type:Object,
                required:false,

            },
            formTitle:{
              type:String,
              required:true
            }
        },
    data(){
      return {
        editedPost:this.post ? {...this.post}:
      {
        title: '',
        previewContent: '',
        toolsSelected:[],
        select: null,
        content:'',
        link:'',
        image:'',
        isDisplayed: false
      }
      }
    },

    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.editedPost.title.$dirty) return errors
        !this.$v.editedPost.title.minLength && errors.push('Title must be atleast 5 characters long')
        !this.$v.editedPost.title.required && errors.push('Title is required.')
        return errors
      },
      previewContentErrors () {
        const errors = []
        if (!this.$v.editedPost.previewContent.$dirty) return errors
        !this.$v.editedPost.previewContent.required && errors.push('preview content is required')
        return errors
      },
      contentErrors () {
        const errors = []
        if (!this.$v.editedPost.content.$dirty) return errors
        !this.$v.editedPost.content.minLength && errors.push('Content must be atleast 20 characters long')
        !this.$v.editedPost.content.required && errors.push('Content is required')
        return errors
      }
    },

    methods: {
      submit () {
        //validate post
           if(!this.post){
                this.$v.$touch()
                if(!this.$v.$invalid){
                const Post = {
                          title:this.editedPost.title,
                          previewContent:this.editedPost.previewContent,
                          content:this.editedPost.content,
                          link:this.editedPost.link,
                          image:this.editedPost.image,
                          toolsUsed:this.editedPost.toolsSelected,
                          displayed:this.editedPost.isDisplayed,
                          updatedDate:new Date()
                }
                this.$emit('create-submit',Post)
              }
           } else {
              this.$emit('edit-submit',this.editedPost)
           }
      },
      clear () {
        this.$v.$reset()
        this.editedPost.title = ''
        this.editedPost.previewContent = ''
        this.editedPost.link = '',
        this.editedPost.image='',
        this.editPost.toolsSelected=[]
        this.editedPost.isDisplayed = false
        this.editedPost.content = ''
      }
    }
  }
</script>



<style scoped>
  .btns {
    float:right
  }
</style>
