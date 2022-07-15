<template>
  <iframe ref="iframe" :src="src" class="iframe"></iframe>
</template>

<script>

export default {
  data(){
    return {
      src: ''
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.iframe.onload = () => {
        
        console.log(this.$refs.iframe.contentDocument.querySelector('.content'))
      };
      this.src = decodeURIComponent(this.$route.query.url)
    })
  },
  methods: {
    
  }
}
</script>
<style>
body {
  margin: 0;
}
body, #__nuxt {
  overflow: hidden;
}
.iframe {
  width: 100%;
  height: 100vh;
}
</style>
