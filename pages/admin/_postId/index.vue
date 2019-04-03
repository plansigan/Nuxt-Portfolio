<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :formTitle="loadedPost.title" :post="loadedPost" @edit-submit="onSubmitted" ></AdminPostForm>
        </section>
    </div>
</template>

<script>
    import AdminPostForm from '@/components/Admin/adminPost.vue'
    export default {
        components:{
            AdminPostForm
        },
        data(){
            return {
                loadedPost:{}
            }
        },
        mounted(){
            this.$root.$on('edit-post',(data)=>{
                this.loadedPost = data
                console.log(data)
            })
        },
        asyncData(context){
            return context.app.$axios
                    .$get(`${process.env.firebaseURL}/posts/${context.params.postId}.json`)
                    .then(data => {
                        console.log(data)
                        return {
                            loadedPost:{...data,id:context.params.postId}
                        }
                    })
                    .catch(e => context.error(e))
        },
        methods:{
            onSubmitted(editedPost){
                this.$store.dispatch('editPost',editedPost)
                    .then(()=>{
                        this.$router.push('/admin')
                    })
            }
        }
    }
</script>
