<template>
  <div id="app">
	  <keep-alive include="basemap">
		  <router-view />
	  </keep-alive>
    
  </div>
</template>

<script>
// import esriMap from "./components/map/map";
// export default {
//   components: {
//     esriMap
//   },
//   data: () => {
//     return {
//       map:{},
//       layers:[],
//       baseMap:{
//         "2d":[],
//         "3d":[]
//       },
//       query:"",
//       searchResult:[]
//     };
//   },
//   computed: {
//     Result(){
//       console.log(this.searchResult);
//       let res = this.searchResult.map(item=>{
//         return item.feature.attributes.Name?item.feature.attributes.Name:item.feature.attributes.bianhao
//       })
//       return res
//     }
//   },
//   watch:{
//     map(){
//       this.layers = this.map.getCurLayerFeature().map(item=>{
//         item.visible = true;
//         return item
//       })
//     }
//   },
//   methods: {
//     //将map对象挂载到父组件,进行操作
//     mountMap(map) {
//       this.map = map;
//       let arr = this.map.filterMap("2d").map(key => {
//         return this.map.getBaseMapInfo(key)
//       });
//       this.baseMap['2d'] = this.map.filterMap('2d').map(item=>{
//         return this.map.getBaseMapInfo(item)
//       })
//       this.baseMap['3d'] = this.map.filterMap('3d').map(item=>{
//         return this.map.getBaseMapInfo(item)
//       })
//     },
//     changeLayerState(item, index ,pattern) {
//       //切换图层
//       this.map.baseMapToggle(item.field,pattern)
//       this.layers = this.map.getCurLayerFeature().map(item=>{
//         item.visible = true;
//         return item
//       })
//     },
//     changeLayerHidden(item, index) {
//       //图层隐藏
//       item.visible = this.map.featureHidden(item.featureLayer)
//     },
//     search(query){
//       this.map.queryFeature(this.map.currentBaseMap,query).then(res=>{
//         this.searchResult = res.results
//       })
//     },
//     MoveTo(index){
//       console.log(index);
//       this.map.mapMoveByElement(this.searchResult[index]).then(res=>{
//         console.log(res.features[0].attributes);
//       })
//     },
//     whenClick(graphic){
//       console.log(graphic)
//       //当有要素被点击时
//       console.log(graphic.attributes);
//     }
//   },
//   mounted: () => {}
// };
</script>
<style>
body,
html,
#app {
  height: 100%;
}
</style>
