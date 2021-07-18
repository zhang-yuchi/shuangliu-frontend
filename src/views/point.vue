<template>
	<div id="">
		<el-card shadow="always">
		    <div class="point-title">
		    	<!-- <div class="return">
		    		<i class="el-icon-arrow-left" @click="back"></i>
		    	</div> -->
				<Back></Back>
		    	<div class="titles">
		    		<div class="numbers">
		    			第一个
		    		</div>
		    		<div class="names">
		    			监测点
		    		</div>
		    	</div>
		    </div>  
		</el-card>
		<div class="long-btn" style="margin-top: 0.625rem;">
			<el-button class="btn-style normal-type" type="success" plain>视频介绍</el-button>
		</div>
		<div class="long-btn"><el-button class="btn-style normal-type" type="success" plain>图像预览</el-button></div>
		<div class="long-btn"><el-button class="btn-style normal-type" type="success" plain>文字介绍</el-button></div>
		<div class="long-btn"><el-button class="btn-style danger-type" type="danger" plain>数据查看</el-button></div>
		
		
		
	</div>
	
</template>

<script>
	import Back from "../components/util/back.vue"
	export default{
		components:{
			Back
		},
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
.point-title{
	/* padding: 0.3125rem 0.9375rem; */
	/* position: relative; */
	font-size: 0.5rem;
}


.numbers{
	margin-bottom: 0.3125rem; /* 5px */
}
.numbers,.names{
	/* margin-bottom: 0.3125rem; */
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	text-align: center;
}
.long-btn{
	padding: 0.3125rem 0;
	text-align: center;
}
.btn-style{
	width: 80%;
}
.normal-type{
border-radius: 0px;
background: #c2e7b0;
box-shadow:  3px 3px 5px #b4d7a4,
             -3px -3px 5px #d0f7bc;
}
.danger-type{
	border-radius: 0px;
	background: #fbc4c4;
	box-shadow:  3px 3px 5px #e9b6b6,
	             -3px -3px 5px #ffd2d2;
}
</style>
