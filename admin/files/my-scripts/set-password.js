// letiable declaration
let flag
let url_string = window.location.href
const now = Date.now();
let time = parseInt(now / 1000)
let url = new URL(url_string);
let username = url.searchParams.get("username");
let org = url.searchParams.get("org");
let reqid = url.href.split("reqid=")[1];
// Function for checking if user has already set his password or not
function checkUser() {
    let payload = JSON.stringify({
        "username": username,
        "reqid": reqid
    });
    $.ajax({
        url: MAIN_API_PATH + 'get/hris/confirm/check',
        method: POST,
        contentType: Content_Type,
        dataType: 'json',
        data: payload,

        success: function(data, xhr, response) {
            flag = data.exists
        },
        error: function(xhr, error) {}


    });

}
// Document Ready Function

$(document).ready(function () {

    document.getElementById('signinUserName').style.cursor = "not-allowed";
    document.getElementById('signinUserName').value = username
        checkUser()
  $('#resetPasswordForm').validate({
    debug: true,
    focusInvalid: false,
    ignore: [],
    rules: {
      resetNewPassword: {
        strongPassword: true
      },
      resetConfirmPassword: {
        equalTo: '#resetNewPassword'
      }
    },

    // the errorPlacement has to take the table layout into account
    errorPlacement: function (error, element) {
      error.appendTo(element.parent().parent())
    },

    errorClass: 'error invalid-feedback',
    validClass: 'success',
    errorElement: 'span',
    highlight: function (element, errorClass, validClass) {
      $(element).parents('div.control-group').addClass(errorClass).removeClass(validClass)
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents('.error').removeClass(errorClass).addClass(validClass)
    }

  })

  
})
const emG = localStorage.getItem('_emG')
const un = localStorage.getItem('_un')
const pa = localStorage.getItem('_pa')
// if (emG == null || un == null || emG == '' || un == '' || emG === undefined || un == undefined) {
//   window.location.href = 'signin.html'
// } else if (emG.length > 0 && un.length > 0) {
//   $('#emailtext').html(emG)
// }

// Forget Password On Input Function
$('#vailTok').on('input', function () {
  if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)
})


// Submit form
$('#resetPasswordBtn').on('click', function (e) {
  e.preventDefault()
  if ($('#resetPasswordForm').validate().form()) {
    changePassword()
  }
})

// Change Password button click funtion
function changePassword () {
  const reset_password = $('#resetNewPassword').val()
  const reset_repeat_password = $('#resetConfirmPassword').val()
  // Password Encryption
  const hashObj = new jsSHA('SHA-512', 'TEXT')
  hashObj.update(reset_password)
  const hash = hashObj.getHash('HEX')
  hash_password = hash
  if (!reset_password || !reset_repeat_password) {
    return 0
  }
  const requireData = JSON.stringify({
    username: username,
    password: hash_password,
    "time": time,
    "reqid": reqid
  })
  $('#resetPasswordBtn').text('Submitting...')
  $('#resetPasswordBtn').attr('disabled', true)
  $('#resetPasswordBtn').css('cursor', 'not-allowed')
  $.ajax({
    url: MAIN_API_PATH + "get/hris/confirm/password",
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: requireData,
    success: function (xhr, response) {
      $('#resetPasswordBtn').text('Submit')
      $('#resetPasswordBtn').attr('disabled', false)
      $('#resetPasswordBtn').css('cursor', 'pointer')

      localStorage.clear()
      swal({
        title: 'Done!',
        text: `Password set successfully! You can now log in!`,
        type: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK'
      }, function (isConfirm) {
        if (isConfirm) {
          localStorage.clear()
          const current_location = 'signin.html'
          window.location.href = current_location
        }
      })
    },
    error: function (xhr) {
      $('#resetPasswordBtn').text('Submit')
      $('#resetPasswordBtn').attr('disabled', false)
      $('#resetPasswordBtn').css('cursor', 'pointer')

      const errro_show = JSON.parse(xhr.responseText)
      if (xhr.status == 401 || xhr.status == 400 || xhr.status == 404 || xhr.status == 503 || xhr.status == 410) {
        // $("forgotemailUser1").val("");
        swal({
          title: 'Error',
          text: errro_show.message,
          type: 'error'
        })
      }
      else{
        swal({
            title: 'Error',
            text: errro_show.message,
            type: 'error'
          })
      }
    }
  })
}
