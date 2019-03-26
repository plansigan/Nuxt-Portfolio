<template>
<v-content>
      <v-container fluid fill-height>
          <v-layout align-center justify-center>
              <v-flex x12 sm8 md4>
                <form >
                    <h1>{{formTitle}}</h1>
                    <v-text-field
                    v-model="title"
                    :error-messages="titleErrors"
                    :counter="15"
                    label="Title"
                    required
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                    ></v-text-field>
                    <v-text-field
                    v-model="previewContent"
                    :error-messages="previewContentErrors"
                    label="Preview Content"
                    required
                    @input="$v.previewContent.$touch()"
                    @blur="$v.previewContent.$touch()"
                    ></v-text-field>
                    <v-textarea
                    v-model="content"
                    :error-messages="contentErrors"
                    name="contentPost"
                    label="Content"
                    value=""
                    hint="Tell something about this post"
                    @input="$v.content.$touch()"
                    @blur="$v.content.$touch()"
                    ></v-textarea>
                    <v-checkbox
                    v-model="isDisplayed"
                    label="is Displayed"
                    required
                    @change="$v.isDisplayed.$touch()"
                    @blur="$v.isDisplayed.$touch()"
                    ></v-checkbox>

                    <v-btn @click="submit">submit</v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </form>
              </v-flex>
          </v-layout>
      </v-container>
  </v-content>
</template>


<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength,minLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      title: { required, maxLength: maxLength(15),minLength:minLength(5) },
      previewContent: { required },
      isDisplayed: {
        checked (val) {
          return val
        }
      },
      content:{required, minLength:minLength(20)}
    },
    props:['formTitle'],
    data: () => ({
      title: '',
      previewContent: '',
      select: null,
      content:'',
      isDisplayed: false
    }),

    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.maxLength && errors.push('Title must be at most 15 characters long')
        !this.$v.title.minLength && errors.push('Title must be atleast 5 characters long')
        !this.$v.title.required && errors.push('Title is required.')
        return errors
      },
      previewContentErrors () {
        const errors = []
        if (!this.$v.previewContent.$dirty) return errors
        !this.$v.previewContent.required && errors.push('preview content is required')
        return errors
      },
      contentErrors () {
        const errors = []
        if (!this.$v.content.$dirty) return errors
        !this.$v.content.minLength && errors.push('Content must be atleast 20 characters long')
        !this.$v.content.required && errors.push('Content is required')
        return errors
      }
    },

    methods: {
      submit () {
        //validate post
         this.$v.$touch()
         if(!this.$v.$invalid){
           const createdPost = {
                    title:this.title,
                    previewContent:this.previewContent,
                    content:this.content,
                    displayed:this.isDisplayed,
                    updatedDate:new Date()
            }
           this.$emit('submit',createdPost)
         }
      },
      clear () {
        this.$v.$reset()
        this.title = ''
        this.previewContent = ''
        this.select = null
        this.isDisplayed = false
        this.content = ''
      }
    }
  }
</script>