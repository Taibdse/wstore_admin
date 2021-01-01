<template>
    <div>
        <small style="float: right">Size: {{sizeContent}} kb</small>
        <div style="clear: both"></div>
        <vue-editor ref="vueEditor" v-model="myContent" :text-change="handleTextChange()" style="width: 100%"></vue-editor>

    </div>
</template>

<script>

import { VueEditor, Quill } from "vue2-editor";
import { getByteSize } from '../../utils/strings';

export default {
    props: {
        // handleTextChange: Function,
        content: String
    },

    components: {
        VueEditor
    },
    
    data: () => ({
        myContent: '',
        sizeContent: 0
    }),

    methods: {
        handleTextChange: function(val) {
        }
    },

    watch: {
        content: function(newVal, oldval){
            this.myContent = newVal;
            

        },
        myContent: function(newVal, oldVal) {
            this.sizeContent = getByteSize(newVal);
        }
    },
    
    created(){
        this.myContent = this.$props.content;
        this.sizeContent = getByteSize(this.myContent);
    } 
}
</script>

<style>
.ql-editor {
    max-height: 400px!important;
}
</style>