// var globalAu2Code;

$(document).ready(function () {
  var zorchil_data_boolean = false;
  var mining_land_use_boolean = false;
  var database_register_data_boolean = false;
  var new_payment_data_boolean = false;
  
  $(document).on("click", "#au2_selected_toggle", function (e) {
    additionalModalRemove()

    var customTop = event.pageY + "px";
    $(".au_2_list").empty()
    $("#additional").addClass("show");
    $("#additional").css({
      top: customTop,
      display: 'block'
    });

    $.ajax({
      url: 'https://geoserver.erkhet-innovation.com/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=satellite:au_level2&outputFormat=application/json',
      type: 'GET',
      success: function(response) {
        var au2 = response.features;                
        $.each(au2, function(key, value) {
          $(".au_2_list").append(`
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault-${key+1}">
              <label class="form-check-label au2-filter" id="${value.properties.code}" for="flexRadioDefault-${key+1}" value="${value.properties.code}">
                ${value.properties.name}
              </label>
            </div>
          `)
        })
      },
      error: function(error) {
          console.log(error);
      },
      async: false
    }).done(function(data) {});

  });

  $(document).on("click", ".another_service", function (e) {
    additionalModalRemove()
    $("#another_service_additional").addClass("show");
    var customTop = event.pageY-30 + "px";
    $("#another_service_additional").css({
      top: customTop,
      display: 'block',    
    });

  });


  $(document).on("click", ".database_register_toggle", function (e) {
    additionalModalRemove()

    $("#database_register_additional").addClass("show");
    var customTop = event.pageY-200 + "px";
    $("#database_register_additional").css({
      top: customTop,
      display: 'block',    
    });

    if(database_register_data_boolean === false){
      $("#database_register_detail_info_additional").addClass("show");
      $("#database_register_detail_info_additional").css({
        display: 'block'
      });
      database_register_data_boolean = true;
    }else{
      $("#database_register_detail_info_additional").removeClass("show");
      $("#database_register_detail_info_additional").css({
        display: 'none',
      })
      database_register_data_boolean = false;
    }
  })

  $(document).on("click", ".zorchil_toggle", function (e) {
    additionalModalRemove()

    $("#zorchil_additional").addClass("show");
    var customTop = (event.pageY - 290) + "px";
    $("#zorchil_additional").css({
      top: customTop,
      display: 'block'
    })    

    if(zorchil_data_boolean === false){
      $("#zorchil_detail_info_additional").addClass("show");
      $("#zorchil_detail_info_additional").css({
        display: 'block'
      });
      zorchil_data_boolean = true;
    }else{
      $("#zorchil_detail_info_additional").removeClass("show");
      $("#zorchil_detail_info_additional").css({
        display: 'none',
      })
      zorchil_data_boolean = false;
    }

  })

  $(document).on("click", ".mining_land_toggle", function (e) {
    additionalModalRemove()

    $("#mining_land_additional").addClass("show");
    var customTop = event.pageY-200 + "px";
    $("#mining_land_additional").css({
      top: customTop,
      display: 'block'
    });


    if(mining_land_use_boolean === false){
      $("#mining_land_use_detail_info_additional").addClass("show");
      $("#mining_land_use_detail_info_additional").css({
        display: 'block'
      });
      mining_land_use_boolean = true;
    }else{
      $("#mining_land_use_detail_info_additional").removeClass("show");
      $("#mining_land_use_detail_info_additional").css({
        display: 'none',
      })
      mining_land_use_boolean = false;
    }
  })

  $(document).on("click", ".satellite_image_toggle", function (e) {
    additionalModalRemove()

    $("#satellite_image_additional").addClass("show");
    var customTop = event.pageY-200 + "px";
    $("#satellite_image_additional").css({
      top: customTop,
      display: 'block'
    });
  })


  $(document).on("click", ".pay_calc_toggle", function (e) {    
    additionalModalRemove()

    // $("#payCalc_info_additional").addClass("show");
    // var customTop = event.pageY + "px";
    // $("#payCalc_info_additional").css({
    //   display: 'block'
    // });

    if(new_payment_data_boolean === false){
      $("#new_payCalc_info_additional").addClass("show");
      $("#new_payCalc_info_additional").css({
        display: 'block'
      });
      new_payment_data_boolean = true;
    }else{
      $("#new_payCalc_info_additional").removeClass("show");
      $("#new_payCalc_info_additional").css({
        display: 'none',
      })
      new_payment_data_boolean = false;
    }
  })


  $(document).on("click", "#dashboard_map", function (e) {
    additionalModalRemove()
  });

  

  $(document).on("click", ".mapChange", function (e) {
    baseMap = event.target.id;
    location.reload();
    if (window.sessionStorage) {
      sessionStorage.setItem("mapChange", baseMap);
    }
  });

  function additionalModalRemove(){
    $('.menu li').removeClass('menu_active');

    $("#additional").removeClass("show");
    $("#additional").css({
      display: 'none',
    })

    $("#database_register_info_additional").removeClass("show");
    $("#database_register_info_additional").css({
      display: 'none',
    })
    
    $("#satellite_image_additional").removeClass("show");
    $("#satellite_image_additional").css({
      display: 'none',
    })
    $("#database_register_additional").removeClass("show");
    $("#database_register_additional").css({
      display: 'none',
    })
    $("#zorchil_additional").removeClass("show");
    $("#zorchil_additional").css({
      display: 'none',
    })
    $("#mining_land_additional").removeClass("show");
    $("#mining_land_additional").css({
      display: 'none',
    })
    $("#payCalc_info_additional").removeClass("show");
    $("#payCalc_info_additional").css({
      display: 'none',
    })    

    $("#another_service_additional").removeClass("show");
    $("#another_service_additional").css({
      display: 'none',
    })    
  }

});
