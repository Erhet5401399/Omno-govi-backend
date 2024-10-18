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

  // Ашигт малтмал ашиглалтын тусгай зөвшөөрөлтэй талбай static data
  var miningAreaData = [
    {
        "main": [
          {
            'au2' : 'Даланзадгад',
            'count' : '3',
            'area' : '416.02'
          },
          {
            'au2' : 'Баяндалай',
            'count' : '5',
            'area' : '3789.4'
          },
          {
            'au2' : 'Баян-Овоо',
            'count' : '7',
            'area' : '73715.27'
          },
          {
            'au2' : 'Булган',
            'count' : '',
            'area' : '-'
          },
          {
            'au2' : 'Гурвантэс',
            'count' : '26',
            'area' : '86136.24'
          },
          {
            'au2' : 'Мандал-Овоо',
            'count' : '13',
            'area' : '7850.47'
          },
          {
            'au2' : 'Манлай',
            'count' : '7',
            'area' : '24403.56'
          },
          {
            'au2' : 'Ноён',
            'count' : '11',
            'area' : '54322.18'
          },
          {
            'au2' : 'Номгон',
            'count' : '11',
            'area' : '25213.6'
          },
          {
            'au2' : 'Сэврэй',
            'count' : '',
            'area' : '-'
          },
          {
            'au2' : 'Ханбогд',
            'count' : '25',
            'area' : '105845.01'
          },
          {
            'au2' : 'Ханхонгор',
            'count' : '5',
            'area' : '14176.05'
          },
          {
            'au2' : 'Хүрмэн',
            'count' : '9',
            'area' : '8130.95'
          },
          {
            'au2' : 'Цогт-Овоо',
            'count' : '2',
            'area' : '7203.4'
          },
          {
            'au2' : 'Цогт-цэций',
            'count' : '13',
            'area' : '78223.5'
          },
        ],
        "sum": {
          'sumCount' : '137',
          'sumArea' : '489425.65',
        }
    }
  ]
  $.each(miningAreaData[0].main, function (key, value) {
    $('.mining_area_data_fetch').append(`
      <tr>
        <td>
          ${key+1}
        </td>
        <td>
          ${value.au2}
        </td>
        <td>
          ${value.count}
        </td>
        <td>
         ${value.area}
        </td>
      </tr>
    `)
  });
  $('.mining_area_data_fetch').append(`
    <tr>
      <td>
       
      </td>
      <td style="font-weight: bold">
        Нийт
      </td>
      <td>
        ${miningAreaData[0].sum.sumCount}
      </td>
      <td>
        ${miningAreaData[0].sum.sumArea}
      </td>
    </tr>
  `)

  // Кадастрын нэгж талбар static data

  var miningAreaData = [
    {
        "main": [
          {
            'au2' : 'Даланзадгад',
            'count' : '1',
            'area' : '0.15'
          },
          {
            'au2' : 'Баяндалай',
            'count' : '8',
            'area' : '314.99'
          },
          {
            'au2' : 'Баян-Овоо',
            'count' : '63',
            'area' : '861.23'
          },
          {
            'au2' : 'Булган',
            'count' : '',
            'area' : '-'
          },
          {
            'au2' : 'Гурвантэс',
            'count' : '181',
            'area' : '5078.72'
          },
          {
            'au2' : 'Мандал-Овоо',
            'count' : '22',
            'area' : '129'
          },
          {
            'au2' : 'Манлай',
            'count' : '13',
            'area' : '60013.31'
          },
          {
            'au2' : 'Ноён',
            'count' : '100',
            'area' : '2212.54'
          },
          {
            'au2' : 'Номгон',
            'count' : '34',
            'area' : '1331.95'
          },
          {
            'au2' : 'Сэврэй',
            'count' : '',
            'area' : '-'
          },
          {
            'au2' : 'Ханбогд',
            'count' : '130',
            'area' : '14804.62'
          },
          {
            'au2' : 'Ханхонгор',
            'count' : '13',
            'area' : '7630.36'
          },
          {
            'au2' : 'Хүрмэн',
            'count' : '19',
            'area' : '40955.15'
          },
          {
            'au2' : 'Цогт-Овоо',
            'count' : '9',
            'area' : '1.1'
          },
          {
            'au2' : 'Цогт-цэций',
            'count' : '343',
            'area' : '23756.75'
          },
        ],
        "sum": {
          'sumCount' : '936',
          'sumArea' : '157089.85',
        }
    }
  ]
  $.each(miningAreaData[0].main, function (key, value) {
    $('.cadastre_area_data_fetch').append(`
      <tr>
        <td>
          ${key+1}
        </td>
        <td>
          ${value.au2}
        </td>
        <td>
          ${value.count}
        </td>
        <td>
         ${value.area}
        </td>
      </tr>
    `)
  });
  $('.cadastre_area_data_fetch').append(`
    <tr>
      <td>
       
      </td>
      <td style="font-weight: bold">
        Нийт
      </td>
      <td>
        ${miningAreaData[0].sum.sumCount}
      </td>
      <td>
        ${miningAreaData[0].sum.sumArea}
      </td>
    </tr>
  `)


  
  function makeRandomColor() {
    var c = "";
    while (c.length < 6) {
      c += Math.random().toString(16).substr(-6).substr(-1);
    }
    return "#" + c;
  }

  const imageExtent3857 = [11500000, 5400000, 11600000, 5410000];

  const imageExtent4326 = ol.proj.transformExtent(
    imageExtent3857,
    "EPSG:3857",
    "EPSG:4326"
  );

  var globalAu2Code = 0;

  var view = new ol.View({
    projection: "EPSG:4326",
    center: ol.extent.getCenter(imageExtent4326),
    zoom: 8,
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

  const map = new ol.Map({
    controls: ol.control.defaults
      .defaults()
      .extend([new ol.control.FullScreen()]),
    target: "dashboard_map",
    layers: Object.values(baseLayers),
    view: view,
  });

  window["map"] = map;
  var tusgai = false;
  var miningLicense = false;
  var cadastreArea = false;
  var buildingArea = false;
  var satellite_30 = false;

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

  function miningLandUse(useCode) {
    switch (useCode) {
      case 2601:
        return "Ашиглалт, олборлолт явуулж буй уурхайн талбай";
      case 2602:
        return "Уул уурхайн үйлдвэрлэлийн барилга, байгууламж";
      case 2603:
        return "Уурхайн нөөц газар";
      case 3204:
        return "Сайжруулсан шороон зам";
    }
  }

  function numberWithCommas(x, decimalPlaces = null) {
    if (decimalPlaces === null) {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
      return x;
    } else {
      x = parseFloat(x).toFixed(decimalPlaces);
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) {
        x = x.replace(pattern, "$1,$2");
      }
      return x;
    }
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

        var resFeatures = response.features;
        $.each(resFeatures, function (key, value) {
          var randomColor = makeRandomColor();
          var zoneName = value.properties.name;
          var zoneLayerName = "au2-" + value.properties.code;
          const format = new ol.format.GeoJSON();
          const vectorSources = new ol.source.Vector();
          const features = format.readFeatures(value);

          for (var a = 0; a < features.length; a++) {
            // features[a].getGeometry().transform("EPSG:4326", "EPSG:3857");
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
            var zoneLayerName = "tusgai-" + value.properties.gid;
            const format = new ol.format.GeoJSON();
            const vectorSources = new ol.source.Vector();

            const features = format.readFeatures(value);

            for (var a = 0; a < features.length; a++) {
              //   features[a].getGeometry().transform("EPSG:4326", "EPSG:3857");
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
            var zoneName = value.properties.LIC_CODE;
            var zoneLayerName = "miningLicense-" + value.properties.gid;
            const format = new ol.format.GeoJSON();
            const vectorSources = new ol.source.Vector();

            const features = format.readFeatures(value);

            for (var a = 0; a < features.length; a++) {
              vectorSources.addFeature(features[a]);
            }

            const SPECIAL_AREA_LAYER_VECTOR = new ol.layer.Vector({
              source: vectorSources,
              name: zoneLayerName,
              style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: "red",
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
    if (cadastreArea) {
      const layerToRemove = map
        .getLayers()
        .getArray()
        .find((layer) => layer.get("name") === "cadastreArea");
      if (layerToRemove) {
        map.removeLayer(layerToRemove);
        cadastreArea = false;
      }
    } else {
      const SPECIAL_AREA_LAYER_VECTOR = new ol.layer.Tile({
        name: "cadastreArea",
        title: "Кадастрын нэгж талбар",
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
      cadastreArea = true;
    }
  }

  function building_area() {
    if (buildingArea) {
      const layerToRemove = map
        .getLayers()
        .getArray()
        .find((layer) => layer.get("name") === "buildingArea");
      if (layerToRemove) {
        map.removeLayer(layerToRemove);
        buildingArea = false;
      }
    } else {
      const BUILDING_AREA_LAYER_VECTOR = new ol.layer.Tile({
        name: "buildingArea",
        title: "Барилга байгууламж",
        noSwitcherDelete: true,
        source: new ol.source.TileWMS({
          visible: false,
          url: "https://geoserver.egazar.gov.mn/geoserver/geoware/wms",
          params: {
            FORMAT: "image/png",
            VERSION: "1.1.1",
            tiled: true,
            LAYERS: "geoware:ca_046_building_soum",
            exceptions: "application/vnd.ogc.se_inimage",
          },
        }),
      });
      map.addLayer(BUILDING_AREA_LAYER_VECTOR);
      buildingArea = true;
    }
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

    map.on("click", function (evt) {
      map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        if (layer === DATABASE_REGISTER_LAYER_VECTOR) {
          const properties = feature.getProperties();
          databaseRegisterInfo(properties);
        }
      });
    });
  }

  function databaseRegisterInfo(properties) {
    $("#database_register_info_additional").empty();

    $("#database_register_info_additional").append(`
      <table id="table">
        <tr>
            <th style="text-align: left"> Сумын нэр </th>
            <td> ${properties.au2} </td>
        </tr>
        <tr>
            <th style="text-align: left"> Ашигт малтмалын тусгай зөвшөөрлийн дугаар </th>
            <td> ${properties.licence_no} </td>
        </tr>
        <tr>
            <th style="text-align: left"> Байршлын нэр </th>
            <td> ${properties.name} </td>
        </tr>
        <tr>
            <th style="text-align: left"> Талбайн хэмжээ /м<sup>2</sup>/ </th>
            <td> ${numberWithCommas(properties.area)} </td>
        </tr>
        <tr>
            <th style="text-align: left"> Газар ашиглалтын зориулалт </th>
            <td> ${miningLandUse(properties.landuse)} </td>
        </tr>
        <tr>
            <th style="text-align: left"> 1/м<sup>2</sup>/ газрын суурь үнэ/төг/ </th>
            <td> ${numberWithCommas(properties.v1_base_price_m2)}₮</td>
        </tr>
        <tr>
            <th style="text-align: left"> Газрын төлбөр, татварын хувь хэмжээ </th>
            <td> ${properties.v2_confidence_percent} </td>
        </tr>
        <tr>
            <th style="text-align: left"> 1/м<sup>2</sup>/ газрын төлбөр, татвар /төг/ </th>
            <td> ${numberWithCommas(properties.v3_base_fee_per_m2)}₮</td>
        </tr>
        <tr>
            <th style="text-align: left"> Газрын төлбөр, татварын дүн /төг/ </th>
            <td> ${numberWithCommas(properties.v4_payment)}₮</td>
        </tr>
      </table>
    `);

    setTimeout(function () {
      $("#database_register_info_additional").addClass("show");
      $("#database_register_info_additional").css({
        display: "block",
      });
    }, 500); 
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
    if(miningLicense === false){
      $("#mineral_detail_info_additional").addClass("show");
      $("#mineral_detail_info_additional").css({
        display: 'block'
      });
    }else{
      $("#mineral_detail_info_additional").removeClass("show");
      $("#mineral_detail_info_additional").css({
        display: 'none',
      })
    }
  });
  $(document).on("click", ".cadastre_area", function (e) {
    cadastre_area();
    console.log(cadastreArea);
    
    if(cadastreArea !== true){

      $("#cadastre_detail_info_additional").removeClass("show");
      $("#cadastre_detail_info_additional").css({
        display: 'none',
      })
    }else{
      $("#cadastre_detail_info_additional").addClass("show");
      $("#cadastre_detail_info_additional").css({
        display: 'block'
      });
    } 
    
  });

  $(document).on("click", ".building_area", function (e) {
    building_area();
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
    } else {
      var del = mining_land_array.indexOf(m_land);
      mining_land_array.splice(del, 1);
    }
    MiningLandLayer(mining_land_array.toString());
  });

  function COLOR_5_LAYER() {
    if (satellite_30) {
      const layerToRemove = map
        .getLayers()
        .getArray()
        .find((layer) => layer.get("name") === "IMAGE_30_SATELLITE");
      if (layerToRemove) {
        map.removeLayer(layerToRemove);
        satellite_30 = false;
      }
    } else {
      const COLOR_5_10_LAYER_VECTOR = [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        new ol.layer.Image({
          name: "IMAGE_30_SATELLITE",
          source: new ol.source.ImageWMS({
            url: "https://geoserver.erkhet-innovation.com/geoserver/satellite/wms?service=WMS&version=1.1.0&request=GetMap&layers=satellite:omno-govi-layer&bbox=101.051740828,42.854855914,106.928090371,44.386689286&width=768&height=330&srs=EPSG:4326&styles=&format=application/openlayers",
          }),
        }),
      ];

      COLOR_5_10_LAYER_VECTOR.forEach((layer, index) => {
        layer.setZIndex(10 + index); // Increment zIndex for each layer if needed
        map.addLayer(layer);
      });
      satellite_30 = true;
    }
  }

  $(document).on("click", ".satellite_image_30", function (e) {
    COLOR_5_LAYER();
  });

  function tulburTable(au2) {
    $.get("/myadmin/au2/tulbur/" + au2).then((e) => {
      $($(".payCal_scroll")[0]).html(e);
    });
  }
};
