// import View from "ol/View";
// import { getCenter } from "ol/extent";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import Map from "ol/Map";
// import { FullScreen, defaults as defaultControls } from "ol/control.js";
// import { Source, XYZ } from "ol/source";
// import VectorLayer from "ol/layer/Vector.js";
// import VectorSource from "ol/source/Vector.js";
// import GeoJSON from "ol/format/GeoJSON.js";
// import Style from "ol/style/Style";
// import Stroke from "ol/style/Stroke";
// import Fill from "ol/style/Fill";
// import Text from "ol/style/Text";

// const imageExtent = [9218917.1074, 4799022.3839, 13873626.3819, 7178965.6965];
window.onload = function () {
  function makeRandomColor() {
    var c = "";
    while (c.length < 6) {
      c += Math.random().toString(16).substr(-6).substr(-1);
    }
    return "#" + c;
  }

  // const imageExtent = [
  //   11571954.611273594, 5409907.187402343, 11571954.611273594, 5409907.187402343,
  // ];

  const imageExtent = [
    43.640051111111106, 103.95263694444444, 43.640051111111106,
    103.95263694444444,
  ];
  // var imageExtent = [9628837.998896, 5055333.171471, 13488444.190902, 6870205.771979];
  var globalAu2Code = 0;

  var view = new ol.View({
    // projection: 'EPSG:3857',
    projection: "EPSG:4326",
    // center: ol.extent.getCenter(imageExtent),
    center: [103.4100747286699, 43.75153448905352],
    // center: [0,0],
    zoom: 7.5,
    minZoom: 3,
    maxZoom: 20,
  });

  baseMap =
    sessionStorage.getItem("mapChange") === null
      ? baseMap
      : sessionStorage.getItem("mapChange");

  const baseLayers = {
    osm: new ol.layer.Tile({
      source: new ol.source.OSM(),
      visible: baseMap === "openstreet", // Set visibility based on current base layer
    }),
    xyz: new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}@2x.png",
      }),
      visible: baseMap === "voyager", // Set visibility based on current base layer
    }),
    google: new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      }),
      visible: baseMap === "google", // Set visibility based on current base layer
    }),
    topo: new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
      }),
      visible: baseMap === "topo", // Set visibility based on current base layer
    }),
    // Add more base layers as needed
  };

  // var proj = new ol.proj.Projection({
  //   code: 'EPSG:4326',
  //   units: 'm'
  // });

  const map = new ol.Map({
    controls: ol.control.defaults
      .defaults()
      .extend([new ol.control.FullScreen()]),
    target: "dashboard_map",
    // projection: proj,
    layers: Object.values(baseLayers),
    view: view,
  });

  window["map"] = map;
  var tusgai = false;
  var miningLicense = false;
  var cadastreArea = false;

  var parcelBool = false;
  // var parcel = new ol.layer.Tile({
  //   name: 'parcel',
  //   title: "Нэгж талбар",
  //   noSwitcherDelete: true,
  //   source: new ol.source.TileWMS({
  //   visible:false,
  //   url: `https://geoserver.egazar.gov.mn/geoserver/geoware/wms`,
  //   params: {'FORMAT': 'image/png',
  //           'VERSION': '1.1.1',
  //           tiled: true,
  //           "LAYERS": 'geoware:ca_046_parcel_tbl',
  //           "exceptions": 'application/vnd.ogc.se_inimage',
  //     }
  //     })
  // });

  // map.addLayer(parcel);
  // parcel.setVisible(false);

  function removeVectorLayer(prefix) {
    var layersToRemove = [];
    map.getLayers().forEach(function (layer) {
      // Давхарга бол vector layer байхыг шалгах
      if (
        layer instanceof ol.layer.Vector &&
        layer.get("name") &&
        layer.get("name").startsWith(prefix)
      ) {
        layersToRemove.push(layer);
      }
    });

    // Устгах
    layersToRemove.forEach(function (layer) {
      map.getLayers().remove(layer);
    });
  }

  function au2LayerRefresh() {
    $.ajax({
      url: `https://geoserver.erkhet-innovation.com/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=satellite:au_level2&outputFormat=application/json${
        parseInt(globalAu2Code) !== 0
          ? `&CQL_FILTER=code='${globalAu2Code}'`
          : ""
      }`,
      type: "GET",
      success: function (response) {
        removeVectorLayer("au2-");
        // if (layerDelete === true) {
        //   console.log('iishee');
        // map.getLayers().forEach(function (layer) {
        //   console.log('---------------');
        //   console.log(layer);
        //   if(layer?.get("name")?.startsWith("au-") === true && layer.get("name") !== undefined){
        //     map.removeLayer(layer);
        //     console.log('edn');
        //   }

        // if (layer.get("name") !== zoneLayerName && layer.get("name") !== undefined) {
        //   map.removeLayer(layer);
        // }
        // });
        // }

        var resFeatures = response.features;
        $.each(resFeatures, function (key, value) {
          var randomColor = makeRandomColor();
          // console.log(randomColor);
          var zoneName = value.properties.name;
          var zoneLayerName = "au2-" + value.properties.code;
          const format = new ol.format.GeoJSON();
          const vectorSources = new ol.source.Vector();
          const features = format.readFeatures(value);

          for (var a = 0; a < features.length; a++) {
            features[a].getGeometry().transform("EPSG:4326", "EPSG:3857");
            vectorSources.addFeature(features[a]);
          }

          const AU2_LAYER_VECTOR = new ol.layer.Vector({
            source: vectorSources,
            name: zoneLayerName,
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: "#000",
                width: 2,
              }),
              fill: new ol.style.Fill({
                // color: `${randomColor}`,
                color: `#D3D3D350`,
              }),
              text: new ol.style.Text({
                text: zoneName,
                fill: new ol.style.Fill({
                  color: "#000",
                }),
              }),
            }),
          });

          AU2_LAYER_VECTOR.setZIndex(30);
          map.addLayer(AU2_LAYER_VECTOR);
        });
      },
      error: function (error) {
        console.log(error);
      },
    }).done(function (data) {});
  }

  function specialAreaLayer() {
    $.ajax({
      url: "https://geoserver.erkhet-innovation.com/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=satellite:SPA&outputFormat=application/json",
      type: "GET",
      success: function (response) {
        if (tusgai) {
          removeVectorLayer("tusgai-");
        } else {
          var resFeatures = response.features;
          $.each(resFeatures, function (key, value) {
            var zoneName = value.properties.spa_name;
            // console.log(zoneName);
            var zoneLayerName = "tusgai-" + value.properties.gid;
            const format = new ol.format.GeoJSON();
            const vectorSources = new ol.source.Vector();
            const features = format.readFeatures(value);

            for (var a = 0; a < features.length; a++) {
              features[a].getGeometry().transform("EPSG:4326", "EPSG:3857");
              vectorSources.addFeature(features[a]);
            }

            const SPECIAL_AREA_LAYER_VECTOR = new ol.layer.Vector({
              source: vectorSources,
              name: zoneLayerName,
              style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: "gold",
                  width: 2,
                }),
                fill: new ol.style.Fill({
                  // color: `${randomColor}`,
                  color: `#ffffff50`,
                }),
                text: new ol.style.Text({
                  text: zoneName,
                  fill: new ol.style.Fill({
                    color: "#000",
                  }),
                }),
              }),
            });

            SPECIAL_AREA_LAYER_VECTOR.setZIndex(40);
            map.addLayer(SPECIAL_AREA_LAYER_VECTOR);
          });
        }
        tusgai = !tusgai;
      },
      error: function (error) {
        console.log(error);
      },
    }).done(function (data) {});
  }
  function miningAreaLayer() {
    $.ajax({
      url: "https://geoserver.egazar.gov.mn/geoserver/geoware/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=geoware%3AMINING-polygon&outputFormat=application/json",
      type: "GET",
      success: function (response) {
        if (miningLicense) {
          removeVectorLayer("miningLicense-");
        } else {
          var resFeatures = response.features;
          $.each(resFeatures, function (key, value) {
            var zoneName = value.properties.spa_name;
            // console.log(zoneName);
            var zoneLayerName = "miningLicense-" + value.properties.gid;
            const format = new ol.format.GeoJSON();
            const vectorSources = new ol.source.Vector();
            const features = format.readFeatures(value);

            for (var a = 0; a < features.length; a++) {
              features[a].getGeometry().transform("EPSG:4326", "EPSG:3857");
              vectorSources.addFeature(features[a]);
            }

            const SPECIAL_AREA_LAYER_VECTOR = new ol.layer.Vector({
              source: vectorSources,
              name: zoneLayerName,
              style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: "gold",
                  width: 2,
                }),
                fill: new ol.style.Fill({
                  // color: `${randomColor}`,
                  color: `#ffffff50`,
                }),
                text: new ol.style.Text({
                  text: zoneName,
                  fill: new ol.style.Fill({
                    color: "#000",
                  }),
                }),
              }),
            });

            SPECIAL_AREA_LAYER_VECTOR.setZIndex(50);
            map.addLayer(SPECIAL_AREA_LAYER_VECTOR);
          });
        }
        miningLicense = !miningLicense;
      },
      error: function (error) {
        console.log(error);
      },
    }).done(function (data) {});
  }

  // function cadastre_area() {
  //   parcel.setVisible(!parcelBool)
  //   parcelBool=!parcelBool;
  // }

  function cadastre_area() {
    const SPECIAL_AREA_LAYER_VECTOR = new ol.layer.Tile({
      name: "aimagLayer",
      title: "Аймаг / Нийслэл",
      noSwitcherDelete: true,
      source: new ol.source.TileWMS({
        visible: false,
        url: "https://geoserver.egazar.gov.mn/geoserver/geoware/wms",
        params: {
          FORMAT: "image/png",
          VERSION: "1.1.1",
          tiled: true,
          LAYERS: "geoware:ca_046_parcel_tbl",
          exceptions: "application/vnd.ogc.se_inimage",
        },
      }),
    });
    map.addLayer(SPECIAL_AREA_LAYER_VECTOR);
    // SPECIAL_AREA_LAYER_VECTOR.setVisible(true);

    // const SPECIAL_AREA_LAYER_VECTOR = [
    //   new ol.layer.Tile({
    //     source: new ol.source.OSM(),
    //   }),
    //   new ol.layer.Image({
    //     source: new ol.source.ImageWMS({
    //       url: 'https://geoserver.egazar.gov.mn/geoserver/geoware/wms?service=WMS&version=1.1.0&request=GetMap&layers=geoware%3Aca_046_parcel_tbl&bbox=99.9334926200801%2C42.0256400951319%2C108.043417225674%2C45.1660379562724&width=768&height=330&srs=EPSG%3A404000&format=application/openlayers',
    //     }),
    //   }),
    // ];

    // SPECIAL_AREA_LAYER_VECTOR.forEach((layer, index) => {
    //   console.log(layer);

    //   layer.setZIndex(20 + index); // Increment zIndex for each layer if needed
    //   map.addLayer(layer);
    // });

    // https://geoserver.egazar.gov.mn/geoserver/geoware/WMS?service=WMS&version=1.1.0&request=GetMap&layers=geoware%3Aca_046_parcel_tbl&format=application/openlayers
    // $.ajax({
    //   url: "https://geoserver.egazar.gov.mn/geoserver/geoware/WMS?service=WMS&version=1.1.0&request=GetMap&layers=geoware%3Aca_046_parcel_tbl&format=application/openlayers",
    //   type: "GET",
    //   success: function (response) {
    //     if(cadastreArea)
    //     {
    //       removeVectorLayer("cadastreArea-")
    //     }else{

    //       var resFeatures = response.features;
    //       $.each(resFeatures, function (key, value) {
    //         var zoneName = value.properties.spa_name;
    //         // console.log(zoneName);
    //         var zoneLayerName = "cadastreArea-" + value.properties.gid;
    //         const format = new ol.format.GeoJSON();
    //         const vectorSources = new ol.source.Vector();
    //         const features = format.readFeatures(value);

    //         for (var a = 0; a < features.length; a++) {
    //           features[a].getGeometry().transform("EPSG:4326", "EPSG:3857");
    //           vectorSources.addFeature(features[a]);
    //         }

    //         const SPECIAL_AREA_LAYER_VECTOR = new ol.layer.Vector({
    //           source: vectorSources,
    //           name: zoneLayerName,
    //           style: new ol.style.Style({
    //             stroke: new ol.style.Stroke({
    //               color: "gold",
    //               width: 2,
    //             }),
    //             fill: new ol.style.Fill({
    //               // color: `${randomColor}`,
    //               color: `#ffffff50`,
    //             }),
    //             text: new ol.style.Text({
    //               text: zoneName,
    //               fill: new ol.style.Fill({
    //                 color: "#000",
    //               }),
    //             }),
    //           }),
    //         });

    //         SPECIAL_AREA_LAYER_VECTOR.setZIndex(60);
    //         map.addLayer(SPECIAL_AREA_LAYER_VECTOR);
    //       });
    //     }
    //     cadastreArea=!cadastreArea;
    //   },
    //   error: function (error) {
    //     console.log(error);
    //   },
    // }).done(function (data) {});
  }

  function databaseRegisterLayer(landUses) {
    const DATABASE_REGISTER_LAYER_VECTOR = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: `https://geoserver.erkhet-innovation.com/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=satellite:zurchil_database_info&outputFormat=application/json&CQL_FILTER=landuse in(${landUses})`,
        format: new ol.format.GeoJSON(),
      }),
      name: "DATABASE_REGISTER_Layer",
    });

    map.getLayers().forEach(function (layer) {
      if (layer.get("name") == "DATABASE_REGISTER_Layer") {
        map.removeLayer(layer);
      }
    });

    DATABASE_REGISTER_LAYER_VECTOR.setZIndex(70);
    map.addLayer(DATABASE_REGISTER_LAYER_VECTOR);
  }

  function zorchilLayer(zorchilType) {
    const ZORCHIL_LAYER_VECTOR = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: `https://geoserver.erkhet-innovation.com/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=satellite:zorchil_last&outputFormat=application/json&CQL_FILTER=type_code in(${zorchilType})`,
        format: new ol.format.GeoJSON(),
      }),
      name: "ZORCHIL_Layer",
    });

    map.getLayers().forEach(function (layer) {
      if (layer.get("name") == "ZORCHIL_Layer") {
        map.removeLayer(layer);
      }
    });

    ZORCHIL_LAYER_VECTOR.setZIndex(80);
    map.addLayer(ZORCHIL_LAYER_VECTOR);
  }

  function MiningLandLayer(m_land_use) {
    const MINING_LAND_LAYER_VECTOR = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: `https://geoserver.erkhet-innovation.com/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=satellite:Mining_land&outputFormat=application/json&CQL_FILTER=landuse in(${m_land_use})`,
        format: new ol.format.GeoJSON(),
      }),
      name: "MINING_LAND_Layer",
    });

    map.getLayers().forEach(function (layer) {
      if (layer.get("name") == "MINING_LAND_Layer") {
        map.removeLayer(layer);
      }
    });

    MINING_LAND_LAYER_VECTOR.setZIndex(90);
    map.addLayer(MINING_LAND_LAYER_VECTOR);
  }

  if (globalAu2Code === 0) {
    au2LayerRefresh();
  }
  $(document).on("click", ".au2-filter", function (e) {
    // console.log(event.target.id);
    globalAu2Code = event.target.id;
    au2LayerRefresh();
    tulburTable(globalAu2Code);
  });

  var db_reg_array = [];
  $(document).on("click", ".dbReg_filter", function (e) {
    var landUse = event.target.id;
    if (db_reg_array.indexOf(landUse) === -1) {
      db_reg_array.push(landUse);
    } else {
      var del = db_reg_array.indexOf(landUse);
      db_reg_array.splice(del, 1);
    }
    databaseRegisterLayer(db_reg_array.toString());
  });

  $(document).on("click", ".special_area", function (e) {
    specialAreaLayer();
  });

  $(document).on("click", ".mining_area", function (e) {
    miningAreaLayer();
  });
  $(document).on("click", ".cadastre_area", function (e) {
    cadastre_area();
  });

  var zorchil_filter_array = [];
  $(document).on("click", ".zorchil_filter", function (e) {
    var z_type_1 = event.target.id;
    if (zorchil_filter_array.indexOf(z_type_1) === -1) {
      zorchil_filter_array.push(z_type_1);
    } else {
      var del = zorchil_filter_array.indexOf(z_type_1);
      zorchil_filter_array.splice(del, 1);
    }
    zorchilLayer(zorchil_filter_array.toString());
  });

  var mining_land_array = [];
  $(document).on("click", ".m_land_filter", function (e) {
    var m_land = event.target.id;
    if (mining_land_array.indexOf(m_land) === -1) {
      mining_land_array.push(m_land);
      console.log("nemsen");
    } else {
      console.log("hassan");
      var del = mining_land_array.indexOf(m_land);
      mining_land_array.splice(del, 1);
    }
    MiningLandLayer(mining_land_array.toString());
  });

  function COLOR_5_LAYER() {
    const COLOR_5_10_LAYER_VECTOR = [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      new ol.layer.Image({
        source: new ol.source.ImageWMS({
          url: "https://geoserver.erkhet-innovation.com/geoserver/satellite/wms?service=WMS&version=1.1.0&request=GetMap&layers=satellite:omno-govi-layer&bbox=101.051740828,42.854855914,106.928090371,44.386689286&width=768&height=330&srs=EPSG:4326&styles=&format=application/openlayers",
        }),
      }),
    ];

    COLOR_5_10_LAYER_VECTOR.forEach((layer, index) => {
      layer.setZIndex(10 + index); // Increment zIndex for each layer if needed
      map.addLayer(layer);
    });
  }

  $(document).on("click", ".5_10_color_toggle", function (e) {
    COLOR_5_LAYER();
  });

  function tulburTable(au2) {
    $.get("/myadmin/au2/tulbur/" + au2).then((e) => {
      $($(".payCal_scroll")[0]).html(e);
    });
  }
};
