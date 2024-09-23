// var globalAu2Code;

$(document).ready(function () {
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
  })

  $(document).on("click", ".zorchil_toggle", function (e) {
    additionalModalRemove()

    $("#zorchil_additional").addClass("show");
    var customTop = (event.pageY - 290) + "px";
    $("#zorchil_additional").css({
      top: customTop,
      display: 'block'
    });
  })

  $(document).on("click", ".mining_land_toggle", function (e) {
    additionalModalRemove()

    $("#mining_land_additional").addClass("show");
    var customTop = event.pageY-200 + "px";
    $("#mining_land_additional").css({
      top: customTop,
      display: 'block'
    });
  })


  $(document).on("click", ".pay_calc_toggle", function (e) {    
    additionalModalRemove()

    $("#payCalc_info_additional").addClass("show");
    var customTop = event.pageY + "px";
    $("#payCalc_info_additional").css({
      display: 'block'
    });
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
