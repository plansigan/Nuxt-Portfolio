<template>
    <new-post formTitle="New Post" @create-submit="onSubmitted"></new-post>
</template>

<script>
    import newPost from '@/components/Admin/adminPost'
    export default {
        layout:'admin',
        middleware:['auth'],
        components:{
            newPost
        },
        methods:{
            onSubmitted(postData){
                this.$store.dispatch('addPost',postData)
                    .then(()=>{
                        this.$router.push('/')
                    })
            }
        }
    }
</script>