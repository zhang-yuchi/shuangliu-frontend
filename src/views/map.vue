<template>
	<div id="map">
	  <div class="search">
	    <!-- <input type="text" class="search-input" v-model="query" @input="search(query)">
	    <div class="search-res">
	      <div class="result-block" v-for="(item,index) in Result" @click="MoveTo(index)" :key="index">
	        {{item}}
	      </div>
	    </div> -->
		<el-select @change="entryPoint" v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
	  </div>
	  <div class="avatar" @click="entryUserinfo">
	  	<img src="../assets/useravatar.jpg" style="width: 100%;height: 100%;">
	  </div>
	  <esriMap @loadedMap="mountMap" @click_highlight="whenClick"></esriMap>
<!-- 	  <div class="controller">
	    <div class="controller-block">
	      <div class="title">图层切换</div>
	      <span>2D图层</span><br>
	      <label for class="hidden-controller" v-for="(item,index) in this.baseMap['2d']" :key="item.field">
	        <button @click="changeLayerState(item,index,'2d')">{{item.name}}</button>
	        <br />
	      </label>
	      <span>3D图层</span><br>
	      <label for class="hidden-controller" v-for="(item,index) in this.baseMap['3d']" :key="item.field">
	        <button @click="changeLayerState(item,index,'3d')">{{item.name}}</button>
	        <br />
	      </label>
	    </div>
	    <div class="controller-block">
	      <div class="title">图层隐藏和显示</div>
	      <label for class="hidden-controller" v-for="(item,index) in this.layers" :key="index">
	        <input type="checkbox" :checked="item.visible" @change="changeLayerHidden(item,index)" />
	        {{item.name}}
	        <br />
	      </label>
	    </div>
	  </div> -->
	  <div style="position: fixed; z-index: 999; bottom: 20px; right: 0.625rem;" @click="tipsShown=true">
	  	<svg t="1626487909967" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2431" width="1.25rem" height="1.25rem"><path d="M555.3 716c12.1-11.8 18.1-26.1 18.1-43 0-16.7-6.1-31.2-18.1-43.3-12.1-12.1-26.6-18.2-43.3-18.2-16.7 0-31.2 6.1-43.3 18.2-12.1 12.1-18.1 26.6-18.1 43.3 0 16.8 6.1 31.1 18.1 43 9.3 9 20 14.6 31.9 16.7 3.8 0.2 7.5 0.3 11.4 0.3 3.9 0 7.6-0.1 11.4-0.3 12-2.1 22.6-7.6 31.9-16.7zM541.4 574.7c8-85.4 32-202.8 32-218.8 0-18.6-5.7-34-17.2-46.4-11.5-12.3-26.2-18.5-44.1-18.5-17.9 0-32.6 6.3-44.2 18.8-11.5 12.4-17.2 27.8-17.2 46.1 0 16 26 133.4 33 218.8h57.7z" fill="#db6327" p-id="2432"></path><path d="M512 960.5c-60.5 0-119.3-11.9-174.6-35.3-53.4-22.6-101.4-54.9-142.5-96.1-41.2-41.1-73.5-89.1-96.1-142.5C75.4 631.3 63.5 572.5 63.5 512s11.9-119.3 35.3-174.6c22.6-53.4 54.9-101.4 96.1-142.6 41.2-41.2 89.1-73.5 142.6-96.1 55.2-23.3 114-35.2 174.5-35.2s119.3 11.9 174.6 35.3c53.4 22.6 101.4 54.9 142.6 96.1 41.2 41.2 73.5 89.1 96.1 142.6 23.4 55.3 35.3 114.1 35.3 174.6s-11.9 119.3-35.3 174.6c-22.7 53.3-55 101.3-96.2 142.4-41.2 41.2-89.1 73.5-142.6 96.1-55.2 23.4-114 35.3-174.5 35.3z m0-832c-211.5 0-383.5 172-383.5 383.5s172 383.5 383.5 383.5 383.5-172 383.5-383.5-172-383.5-383.5-383.5z" fill="#db5919" p-id="2433"></path></svg>
	  </div>
	  <el-dialog
	    title="介绍"
	    :visible.sync="tipsShown"
	    width="80%"
	    >
	    <span>这是一段信息</span>
	    <span slot="footer" class="dialog-footer">
	     <!-- <el-button @click="tipsShown = false">取 消</el-button> -->
	      <el-button type="primary" @click="tipsShown = false">确 定</el-button>
	    </span>
	  </el-dialog>

	</div>
</template>

<script>
import esriMap from "../components/map/map";
export default {
  components: {
    esriMap
  },
  name:"basemap",
  data: () => {
    return {
      map:{},
      layers:[],
      baseMap:{
        "2d":[],
        "3d":[]
      },
      query:"",
      searchResult:[],
	  options: [{
	            value: '1',
	            label: '一号监测点'
	          }, {
	            value: '2',
	            label: '二号检测点'
	          }, {
	            value: '3',
	            label: '三号监测点'
	          }, {
	            value: '4',
	            label: '四号检测点'
	          }, {
	            value: '5',
	            label: '五号监测点'
	          }],
	          value: '',
			  tipsShown:false
    };
  },
  computed: {
    Result(){
      console.log(this.searchResult);
      let res = this.searchResult.map(item=>{
        return item.feature.attributes.Name?item.feature.attributes.Name:item.feature.attributes.bianhao
      })
      return res
    }
  },
  watch:{
    map(){
      this.layers = this.map.getCurLayerFeature().map(item=>{
        item.visible = true;
        return item
      })
    }
  },
  methods: {
    //将map对象挂载到父组件,进行操作
    mountMap(map) {
      this.map = map;
      let arr = this.map.filterMap("2d").map(key => {
        return this.map.getBaseMapInfo(key)
      });
      this.baseMap['2d'] = this.map.filterMap('2d').map(item=>{
        return this.map.getBaseMapInfo(item)
      })
      this.baseMap['3d'] = this.map.filterMap('3d').map(item=>{
        return this.map.getBaseMapInfo(item)
      })
    },
    changeLayerState(item, index ,pattern) {
      //切换图层
      this.map.baseMapToggle(item.field,pattern)
      this.layers = this.map.getCurLayerFeature().map(item=>{
        item.visible = true;
        return item
      })
    },
    changeLayerHidden(item, index) {
      //图层隐藏
      item.visible = this.map.featureHidden(item.featureLayer)
    },
    search(query){
      this.map.queryFeature(this.map.currentBaseMap,query).then(res=>{
        this.searchResult = res.results
      })
    },
    MoveTo(index){
      console.log(index);
      this.map.mapMoveByElement(this.searchResult[index]).then(res=>{
        console.log(res.features[0].attributes);
      })
    },
    whenClick(graphic){
      console.log(graphic)
      //当有要素被点击时
      console.log(graphic.attributes);
    },
	entryPoint(value){
		console.log(value)
		this.$router.push(`/point/${value}`)
	},
	entryUserinfo(){
		this.$router.push("/userinfo")
	}
  },
  mounted: () => {}
};
</script>

<style>
	#map {
		height: 100%;
	}
	.search{
	  z-index: 50;
	  position: absolute;
	  top: 0.625rem;
	  left: 50%;
	  transform: translateX(-50%);
	}
	.search-input{
	  padding: 10px ;
	}
	/* .search-res{
	  background-color: black;
	  height: 50px;
	} */
	.avatar{
		width: 1.25rem; /* 20px */
		height: 1.25rem;
		position: fixed;
		z-index: 99;
		border-radius: 50%;
		overflow: hidden;
		right: 0.625rem;
		top: 0.5rem; /* 8px */
	}
	.controller {
	  background-color: white;
	  padding: 30px;
	  position: absolute;
	  top: 30px;
	  right: 30px;
	}
	.title {
	  font-size: 18px;
	}
	.hidden-controller {
	  font-size: 18px;
	}
	.search-res{
	  max-height: 100px;
	  overflow: auto;
	}
	.result-block{
	  cursor: pointer;
	  font-size: 15px;
	  box-sizing: border-box;
	  width: 100%;
	  background-color: white;
	  border-bottom: 1px solid #f1f1f1;
	  padding: 2px;
	}
	.result-block:hover{
	  background-color: #f1f1f1;
	}
</style>
