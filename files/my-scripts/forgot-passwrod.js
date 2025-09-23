// Document Ready Function
$(document).ready(function () {
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

  $('#forgotPasswordTokenForm').validate({
    debug: true,
    rules: {
      text: {
        required: true
      }
    },
    messages: {
      text: {
        required: 'This field is required'
      }
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
if (emG == null || un == null || emG == '' || un == '' || emG === undefined || un == undefined) {
  // window.location.href = 'signin.html'
} else if (emG.length > 0 && un.length > 0) {
  $('#emailtext').html(emG)
}
if (pa == null || pa == '' || pa == undefined) {
  $('#resetPasswordForm').addClass('d-none')
  $('#forgotPasswordTokenForm').removeClass('d-none')
} else if (pa === 'true') {
  $('#resetPasswordForm').removeClass('d-none')
  $('#forgotPasswordTokenForm').addClass('d-none')
}

// Forget Password On Input Function
$('#vailTok').on('input', function () {
  if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength)
})

// Forget Password Click function
$('#verifyTokenBtn').on('click', function (e) {
  e.preventDefault()
  $('#forgotPasswordTokenForm').validate().form()

  let tokk = document.getElementById('forgotPasswordToken').value
  if (tokk == '') {
    // document.getElementById("forgotem").textContent = empty_token;
    return 0
  } else {
    const error = ' '
    // document.getElementById("forgotem").textContent = error;
    tokk = document.getElementById('forgotPasswordToken').value
  }
  if (localStorage.getItem('_emG_get') == undefined || localStorage.getItem('_emG_get') == null) {
    var email_pas = ''
  } else {
    var email_pas = localStorage.getItem('_emG_get')
  }

  const requireData = JSON.stringify({
    email: email_pas,
    username: un,
    code: tokk
  })
  $('#verifyTokenBtn').text('Verifying...')
  $('#verifyTokenBtn').attr('disabled', true)
  $('#verifyTokenBtn').css('cursor', 'not-allowed')

  $.ajax({
    url: MAIN_API_PATH + passwordCodeAPI,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: requireData,
    success: function (xhr, response) {
      setTimeout(function () {
        $('#verifyTokenBtn').text('Verify')
        $('#verifyTokenBtn').attr('disabled', false)
        $('#verifyTokenBtn').css('cursor', 'pointer')
        $('#forgotPasswordTokenForm').addClass('d-none')
        $('#resetPasswordForm').removeClass('d-none')
        localStorage.setItem('tk', tokk)
        localStorage.setItem('_pa', true)
      }, 1000)
    },
    error: function (xhr) {
      $('#verifyTokenBtn').text('Verify')
      $('#verifyTokenBtn').attr('disabled', false)
      $('#verifyTokenBtn').css('cursor', 'pointer')

      const errro_show = JSON.parse(xhr.responseText)
      if (xhr.status == 401 || xhr.status == 400 || xhr.status == 404 || xhr.status == 503) {
        swal({
          title: 'Error',
          text: errro_show.message,
          type: 'error'
        })
      }
    }
  })
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
  if (localStorage.getItem('_emG_get') == undefined || localStorage.getItem('_emG_get') == null) {
    var email_pas = ''
  } else {
    var email_pas = localStorage.getItem('_emG_get')
  }
  // Password Encryption
  const hashObj = new jsSHA('SHA-512', 'TEXT')
  hashObj.update(reset_password)
  const hash = hashObj.getHash('HEX')
  hash_password = hash
  if (!reset_password || !reset_repeat_password) {
    return 0
  }
  const requireData = JSON.stringify({
    username: un,
    password: hash_password,
    code: localStorage.getItem('tk'),
    email: email_pas
  })
  $('#resetPasswordBtn').text('Submitting...')
  $('#resetPasswordBtn').attr('disabled', true)
  $('#resetPasswordBtn').css('cursor', 'not-allowed')
  $.ajax({
    url: MAIN_API_PATH + changePasswordAPI,
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
        text: pswd_change_success,
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
      if (xhr.status == 401 || xhr.status == 400 || xhr.status == 404 || xhr.status == 503) {
        // $("forgotemailUser1").val("");
        swal({
          title: 'Error',
          text: errro_show.message,
          type: 'error'
        })
      }
    }
  })
}
