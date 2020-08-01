<template>
  <vue-editor v-model="myContent" text-change="handleTextChange" style="width: 100%"></vue-editor>
</template>

<script>

import { VueEditor, Quill } from "vue2-editor";

export default {
    props: {
        handleTextChange: Function,
        content: String
    },
    components: {
        VueEditor
    },
    
    data: () => ({
        myContent: ''
    }),

    watch: {
        content: function(newVal, oldval){
            this.myContent = newVal;
        }
    },
    
    created(){
        this.myContent = this.$props.content;
    } 
}
</script>

<style>
.ql-editor {
    max-height: 600px!important;
}
</style>