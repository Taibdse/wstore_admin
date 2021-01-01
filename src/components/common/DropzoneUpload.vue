<template>
 <div>
    <vue-dropzone 
        ref="dropzone" 
        :id="id" 
        :options="dropzoneOptions"
        :include-styling="true"
        :vdropzone-sending="sendingEvent"
        :vdropzone-removed-file="handleRemoveFile"
        :duplicateCheck="true"
        :vdropzone-canceled="handleCancelFile"
        >
        <div class="dropzone-custom-content">
            <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
            <div class="subtitle">...or click to select a file from your computer</div>
        </div>
    </vue-dropzone>
    <!-- <button @click="getFiles">get files</button> -->
 </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
      id: String,
      uploadMultiple: Boolean,
      uploadedFiles: Array
  },

  created(){
    
  },

  mounted(){
    this.showUploadedFilesOnDropzone();
  },

  data: function () {
    return {
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" },
          addRemoveLinks: true,
          dictDefaultMessage: 'Upload here',
          uploadMultiple: this.$props.uploadMultiple,
          maxFiles: this.$props.uploadMultiple ? 10 : 1, 
          thumbnailMethod: 'crop',
          acceptedMimeTypes: 'image/*',
      }
    }
  },
  
  methods: {
        showUploadedFilesOnDropzone: function(){
            this.uploadedFiles.forEach(file => {
                const options = { size: 123, name: file.name, type: "image/png" };
                this.$refs.dropzone.manuallyAddFile(options, file.url);
            })
        },
        
        removeAllFiles() {
            this.$refs.dropzone.removeAllFiles();
        },
        
        sendingEvent: function(){
        },

        handleRemoveFile: function(file, error, xhr){
        
        },

        handleCancelFile: function(file){
        },

        getAllFiles: function(){
            return this.$refs.dropzone.dropzone.files
        },

        getManuallyAddedFiles: function(){
            return this.getAllFiles().filter(file => file.manuallyAdded);
        },

        getUploadedFiles: function(){
            return this.getAllFiles().filter(file => !file.manuallyAdded);
        }
        
  }

}
</script>

<style>
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
</style>