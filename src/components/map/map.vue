<template>
  <div></div>
</template>

<script>
import { loadModules } from "esri-loader";
import esriMap from "../../assets/map/index";
export default {
  name: "web-map",
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/BaseTileLayer",
        "esri/request",
        "esri/layers/FeatureLayer",
        "esri/WebMap",
        "esri/WebScene",
        "esri/views/SceneView",
        "esri/tasks/FindTask",
        "esri/tasks/support/FindParameters"
      ],
      { css: true },
      {
        //添加本地api地址
        url: esriMap.config.url,
        css: esriMap.config.css
      }
    ).then(
      ([
        ArcGISMap,
        MapView,
        BaseTileLayer,
        esriRequest,
        FeatureLayer,
        WebMap,
        WebScene,
        SceneView,
        FindTask,
        FindParameters
      ]) => {
        var esrimap = new esriMap(); //创建地图对象
        this.view = new MapView({
          container: this.$el,//挂载道当前对象
          map: null,
          center: [esriMap.config.coordinate.x, esriMap.config.coordinate.y],
          zoom: esrimap.scale, //min 3   max 18
          constraints: {
            minZoom: esriMap.config.zoom.minZoom,
            maxZoom: esriMap.config.zoom.maxZoom
          }
        });
		console.log(this.view)
        //地图的初始化
        esrimap.initMap({
          view: this.view,
          modules: {
            ArcGISMap,
            MapView,
            BaseTileLayer,
            esriRequest,
            FeatureLayer,
            WebMap,
            WebScene,
            SceneView,
            FindTask,
            FindParameters
          }
        });
        //监听
        esrimap.listenView(this);
        this.$emit("loadedMap", esrimap);
      }
    );
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
};
</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.controller {
  position: absolute;
  z-index: 999;
}
</style>