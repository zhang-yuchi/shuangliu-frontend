<template>
	<div class="return">
		<i class="el-icon-arrow-left" @click="back"></i>
	</div>
</template>

<script>
	export default{
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	.return{
		position: absolute;
		left: 0.5rem;
		top: 0.5rem;
		font-size: 0.5rem;
	}
</style>
