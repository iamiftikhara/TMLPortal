function showNotificationError(colorName, text, placementFrom, placementAlign, animateEnter, animateExit, customVal) {

    if (colorName === "bg-red") {
        colorName = "alert-danger";
    } else if (colorName === "bg-green") {
        colorName = "alert-success";
    } else if (colorName === "bg-orange") {
        colorName = "alert-warning";
    }


    if (colorName === null || colorName === '') { colorName = 'red'; }
    if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;
    // colorName = 'bg-deep-orange';
    placementFrom = 'top';
    placementAlign = 'center';
    $.notify({
        message:customVal 

    },
        {
            type: colorName,
            allow_dismiss: allowDismiss,
            newest_on_top: true,
            timer: 1000,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            animate: {
                enter: animateEnter,
                exit: animateExit
            },
        //   template: '<div class="alert' + colorName + '" role="alert" style="text-align: center !important;">' + customVal + '</div>'
            template: '<div class="alert ' + colorName + '" role="alert" style="text-align: center !important; width:25% !important;">' + customVal + '</div>'

            
        });
            console.log("Notification shown with message: " + colorName, customVal);

}