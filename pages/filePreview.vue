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
        const document = this.$refs.iframe.contentDocument

        // 修改样式
        var style = document.createElement('style')
        style.innerText = `div {
          -webkit-line-clamp: unset !important;
          user-select: auto !important;
        }`
        document.body.append(style)


        var script = document.createElement('script')

        script.innerHTML = `
        function custom () {
          var audio = document.querySelector('audio');

          if(!audio) {return}
          audio.controls = true;
          audio.onerror = function () {
            var typeArr = ['mp3', 'm4a', 'mp4', 'mkv'];
            var oldType = this.src.replace(location.href.replace(/html$/, ''), '');
            var index = typeArr.indexOf(oldType);
            ~index && index++;
            var type = typeArr[index];
            if(!type) return
            setTimeout(function() {
              audio.src = location.href.replace(/htm(l)?$/, type)
            }, 200)
          };
          audio.src = location.href.replace(/htm(l)?$/, 'mp3');
          audio.style = 'position: fixed;top:6px;left:0;z-index: 10000;width: 100%';
        }
        custom()
        `

        setTimeout(() => {
          document.body.append(script)
        }, 200)
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
.__layout {
  height: 100vh;
  overflow: auto;
}
.iframe {
  width: 100%;
  height: 100vh;
}
</style>
