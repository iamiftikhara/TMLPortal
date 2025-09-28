//Document Ready Function
$(document).ready(function() {
  //Add Labels To Html File
  $('#signinForm').validate({
    debug: true, 
    rules: {
      password: {
        required: true,
      }
    },
    errorClass: 'error invalid-feedback',
    validClass: 'success',
    errorElement: 'span',
    highlight: function (element, errorClass, validClass) {
      $(element)
        .parents('div.control-group')
        .addClass(errorClass)
        .removeClass(validClass)
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents('.error').removeClass(errorClass).addClass(validClass)
    }
  })
  
})
var emG = localStorage.getItem('_emG')
if(emG == null || emG === undefined ){
    window.location.href = 'signin.html';
}
else if(emG.length > 0){
    $('#emailtext').html(emG)
}

// Submit form
$('#signinForm').submit(function (e) {
  e.preventDefault()
  if ($(this).validate().form()) {
    verificationToken()
  }
})

  function verificationToken () {
    var tokk = document.getElementById("signinUserPassword").value;
    let requireData = JSON.stringify({
      'code': tokk,
      composit_id: localStorage.getItem('_composit_id')
    })
    $('#signinBtn').text('Submiting...')
    $('#signinBtn').attr('disabled', true)
    $('#signinBtn').css('cursor', 'not-allowed')
    $.ajax({
      url: MAIN_API_PATH + singinCodeConfirmation,
      method: POST,
      contentType: Content_Type,
      dataType: 'json',
      data: requireData,
      statusCode: {
        200: function (xhr) {
          window.location.href = 'signin.html';
        },
      },
      error: function (xhr) {
        let errro_show = JSON.parse(xhr.responseText)
        $('#signinBtn').text('Submit')
        $('#signinBtn').attr('disabled', false)
        $('#signinBtn').css('cursor', 'pointer')
        if (xhr.status === 400) {
          swal({
            title: 'Error',
            text: invalidRequest400Error,
            type: 'error'
          })
        } else if (xhr.status === 401) {
          swal({
            title: 'Error',
            text: unauthorizedRequest401Error,
            type: 'error'
          })
        } else if (xhr.status === 404) {
          swal({
            title: 'Error',
            text: notFound404Error,
            type: 'error'
          })
        } else if (xhr.status === 503) {
          swal({
            title: 'Error',
            text: serverError503Error,
            type: 'error'
          })
        } else {
          swal({
            title: 'Error',
            text: serverError503Error,
            type: 'error'
          })
        }
      }
    })
  }