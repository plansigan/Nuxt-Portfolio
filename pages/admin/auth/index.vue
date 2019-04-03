<template>
    <v-content>
        <v-container fluid fill-height>
           <v-layout align-cemter justify-center>
                <v-flex x12 sm8 md4>
                    <form @submit.prevent="submit">
                        <h1>{{ isLogin ? 'Login' : 'Sign Up' }}</h1>
                        <!-- email -->
                        <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        type="email"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        >
                        </v-text-field>

                        <!-- password -->
                        <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        label="password"
                        type="password"
                        required
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        >
                        </v-text-field>

                        <!-- repeatPassword -->
                        <!-- <v-text-field
                        v-model="repeatPassword"
                        
                        :error-messages="repeatPasswordErrors"
                        label="repeat password"
                        type="password"
                        :required="isLogin ? false : true"
                        @input="$v.repeatPassword.$touch()"
                        @blur="$v.repeatPassword.$touch()"
                        >
                        </v-text-field> -->

                        <!-- <v-btn color="dark blue" @click="isLogin = !isLogin" dark>Switch to {{ isLogin ? 'Signup' : 'Login' }}</v-btn> -->
                        <v-btn type="submit" color="dark green" style="float:right;">{{ isLogin ? 'Login' : 'Sign Up' }}</v-btn>
                        

                    </form>
                </v-flex>
           </v-layout>
        </v-container>
    </v-content>
</template>



<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength,minLength, email,sameAs } from 'vuelidate/lib/validators'

    export default {
        middleware:['alreadyAuth'],
        name: 'AdminAuthPage',
        layout:'admin',
        mixins:[validationMixin],
        data(){
            return {
                isLogin:true,
                email:'',
                password:'',
                repeatPassword:''

            }
        },
        validations:{
            email:{required,email},
            password:{required,minLength:minLength(6)},
            // repeatPassword:isLogin ? {} : {sameAsPassword:sameAs('password')}
        },
        computed:{
            emailErrors(){
                const errors = []
                if(!this.$v.email.$dirty) return errors
                !this.$v.email.required && errors.push('Email is required.')
                !this.$v.email.email && errors.push('must be an email')
                return errors
            },
            passwordErrors(){
                const errors = []
                if(!this.$v.password.$dirty) return errors
                !this.$v.password.minLength && errors.push('Password must be atleast 6 characters long')
                !this.$v.password.required && errors.push('Password is required')
                return errors
            }
            // repeatPasswordErrors(){
            //     const errors = []
            //     if(!this.isLogin){
            //     if(!this.$v.repeatPassword.$dirty) return errors
            //     !this.$v.repeatPassword.sameAsPassword && errors.push('Passwords not the same')
            //     }
            //     return errors
            // }
        },
        methods:{
            submit(){
                //validate sign in/ log in
                this.$v.$touch()
                if(!this.$v.$invalid){
                    this.$store.dispatch('authenticateUser',{
                        isLogin:this.isLogin,
                        email:this.email,
                        password:this.password
                    }).then(()=>{
                        this.$router.push('/admin')
                    })
                } else {
                    alert('error')
                }
            }
        }
        
    }
</script>
