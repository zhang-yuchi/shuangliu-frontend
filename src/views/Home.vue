<template>
  <div class="home">
	<el-button style="position: absolute; bottom: 30%; left: 50%; transform: translateX(-50%);" type="primary" @click="entry">开始使用</el-button>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    
  },
  methods:{
	  entry(){
		  this.$router.push("/map")
	  }
  }
}
</script>
