/* global CryptoJS, signinAPI, signupAPI, forgotPasswordAPI, setNewPages */

let osName = ''
let osVersion = ''
let browserName = ''
let signinEmail = ''
let hashPassword = ''
const url2 = new URL(window.location);
const newUrl2 = url2.origin;

let userRole

// Check if the URL is not "https://compliance.nuari.org"
if (newUrl2 !== "https://compliance.nuari.org") {
    // Show the #recaptchaDisable div (remove 'd-none' class)
    $("#recaptchaDisable").removeClass("d-none");
  
} else {
  // Hide the #recaptchaDisable div when the URL is https://compliance.nuari.org
  $("#recaptchaDisable").addClass("d-none");
}
// Document Ready Function
$(document).ready(function () {

 userRole = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('signupUserRole', false);



  $('#signUpForm').validate({
    debug: true,
    rules: {
      signupFirstName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true

      },
      signupLastName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true

      },
      signupUserName: {
        onlyDigitsNotAllowed: true,
        atLeastOneCharacter: true,
        SpecialCharactersAllowedWithNotSpace: true


      },
      signupUserEmail: {
        required: true,
        email: true
      },
      signupUserPassword: {
        strongPassword: true
      },
      signupUserRepeatPassword: {
        equalTo: '#signupUserPassword'
      },
      signupUserOrgnization: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        onlyDigitsNotAllowed: true
      },
      signupUserRole: {
        required: true
      }

    },
    messages: {
      // signupUserName: {
      //   chractesDotHypenUnderscore: "Permitted special characters: '-', '_', '.'"
      // }
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
          $(element)
            .parents('.error')
            .removeClass(errorClass)
            .addClass(validClass)
        },
        // the errorPlacement has to take the table layout into account
        errorPlacement: function (error, element) {
          if (element.is('#signupUserRole')) { error.appendTo(element.parent().parent()) } else {
            error.appendTo(element.parent())
          }
        }
  })

  // Forgot password form
  $('#forgotPasswordForm').validate({
    debug: true,
    rules: {
      forgotPasswordUsername: {
        chractesDotHypenUnderscore: true
      },
      forgotPasswordEmail: {
        required: true,
        email: true
      }
    },
    messages: {
      forgotPasswordUsername: {
        chractesDotHypenUnderscore: "Permitted special characters: '-', '_', '.'"
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
  });


// Function to detect the browser name
function getBrowserName() {
  const userAgent = navigator.userAgent;

  // Check if it's Opera first, since Opera uses Chromium engine
  if (userAgent.indexOf("OPR") !== -1) return 'Opera';
  if (userAgent.indexOf("Chrome") !== -1) return 'Chrome';
  if (userAgent.indexOf("Safari") !== -1) return 'Safari';
  if (userAgent.indexOf("Firefox") !== -1) return 'Firefox';
  if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) return 'Internet Explorer';
  if (userAgent.indexOf("Edge") !== -1) return 'Edge';
  return 'Unknown Browser';
}

// Function to detect the operating system
function getOperatingSystem() {
  const userAgent = navigator.userAgent;

  // Common operating systems
  if (userAgent.indexOf('Windows NT 10.0') !== -1) return 'Windows 10';
  if (userAgent.indexOf('Windows NT 6.2') !== -1) return 'Windows 8';
  if (userAgent.indexOf('Windows NT 6.1') !== -1) return 'Windows 7';
  if (userAgent.indexOf('Mac') !== -1) return 'Mac OS';
  if (userAgent.indexOf('Linux') !== -1) return 'Linux'; // Explicit check for Linux
  if (userAgent.indexOf('X11') !== -1) return 'Unix'; // Keep as a fallback for Unix-based systems

  return 'Unknown OS';
}

// Function to detect the operating system version
function getOperatingSystemVersion() {
 
  const userAgent = navigator.userAgent;
  console.log("userAgent",userAgent)
  let version = 'Unknown version';

  // For Windows
  if (userAgent.indexOf('Windows NT 10.0') !== -1) version = '10';
  else if (userAgent.indexOf('Windows NT 6.2') !== -1) version = '8';
  else if (userAgent.indexOf('Windows NT 6.1') !== -1) version = '7';
  
  // For Linux (attempting version detection from the userAgent)
  if (userAgent.indexOf('Linux') !== -1) {
      const versionMatch = userAgent.match(/Linux (\d+[\.\d]+)/);
      if (versionMatch) version = versionMatch[1];
  }

  // For MacOS
  if (userAgent.indexOf('Mac OS X') !== -1) {
      const versionMatch = userAgent.match(/Mac OS X (\d+[_\.\d]+)/);
      if (versionMatch) version = versionMatch[1];
  }

  return version;
}


// Get the details
 osName = getOperatingSystem();
 browserName = getBrowserName();
 osVersion = getOperatingSystemVersion();
  $.ajaxSetup({
    cache: false
  })

  $('#forgotpassForm').attr('action', 'javascript:void(0);')
  $('#forgotUserForm').attr('action', 'javascript:void(0);')
})


// Sign Up Form Submission
$(document).ready(function() {
  // Initialize the validation on the form
  $('#signUpForm').validate(); // Ensure your form has this ID

  $('#signupBtn').on("click", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Validate the form
    if (!$('#signUpForm').valid()) { // Use .valid() instead of .form()
      return; // If validation fails, stop further execution
    }

    // Get form values
    const fname = $('#signupFirstName').val();
    const lname = $('#signupLastName').val();
    // const uname = $('#signupUserName').val();
    const password = $('#signupUserPassword').val();
    const email = $('#signupUserEmail').val();
    const org = $('#signupUserOrgnization').val();
    const role = $('#signupUserRole').val(); // Get the selected role value

    // Encrypt Password
    const hashObj = new jsSHA('SHA-512', 'TEXT');
    hashObj.update(password);
    const hashPassword = hashObj.getHash('HEX');

    // Recaptcha Response Validation
    const newUrl2 = window.location.origin; // Get the current origin dynamically
    // let response = grecaptcha.getResponse();

    if (newUrl2 !== "https://compliance.nuari.org") {
      // if (response.length === 0) {
      //   $('#captchaerror').html("Please verify you're human");
      //   return; // Prevent form submission
      // } else {
      //   $('#captchaerror').html(""); // Clear any previous error
      // }
    } else {
      console.log("On the compliance.nuari.org domain, skipping captcha check");
    }

    // Disable the button to prevent multiple submissions
    $('#signupBtn').text('Signing Up...');
    $('#signupBtn').attr('disabled', true);
    $('#signupBtn').css('cursor', 'not-allowed');

    let signupPayload = {
      // username: uname,
      password: hashPassword,
      email: email,
      first_name: fname,
      last_name: lname,
      organization: org,
      role: 'admin'
    };


    // Check localStorage items
    const parentOrg = localStorage.getItem("prnt_org");
    const governingOrg = localStorage.getItem("gvrn_org");

    if (parentOrg !== 'undefined' && parentOrg !== null) {
      signupPayload.parent_org = parentOrg === 'false' ? false : parentOrg;
    }

    if (governingOrg !== 'undefined' && governingOrg !== null) {
      signupPayload.governing_org = governingOrg === 'false' ? false : governingOrg;
    }

    signupPayload = JSON.stringify(signupPayload); 

    // AJAX request to submit the form
    $.ajax({
      url: MAIN_API_PATH + signupAPI,
      method: 'POST',
      contentType: Content_Type,
      dataType: 'json',
      data: signupPayload,
      statusCode: {
        200: function (xhr) {
          // localStorage.setItem('_composit_id', xhr.composit_id);
          swal({
            title: 'Success',
            text: 'User created successfully',
            type: 'success'
          }, function () {
            window.location.href = 'signin.html';
          });
          resetButtonState();
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.error("Signup error:", textStatus, errorThrown);
        $('#captchaerror').html(""); // Display a user-friendly error message
          $('#signupBtn').text('Sign Up')
          $('#signupBtn').attr('disabled', false)
          $('#signupBtn').css('cursor', 'pointer')
          $('#captchaerror').html("");
          // 401 Organization already exists
          // 404 organization key not found
          // 400 organization key not exist
          // 503 Service error
          resetButtonState()
          if (xhr.status === 400) {
            swal({
              title: 'Info',
              text:
                'Only one (1) sign up is allowed. If you previously signed up, reset your credentials at:' +
                "<a href='signin.html' style='text-decoration: underline;color: #0056b3'>Cytex account management</a>",
              html:
                'Only one (1) sign up is allowed. If you previously signed up, reset your credentials at:' +
                "<a href='signin.html' style='text-decoration: underline;color: #0056b3'>Cytex account management</a>",
              type: 'info'
            })
          } else if (xhr.status === 401) {
            swal({
              title: 'Error',
              text: xhr.responseJSON.message,
              type: 'error'
            })
          } else if (xhr.status === 402) {
            swal({
              title: 'Error',
              text: xhr.responseJSON.message,
              type: 'error'
            })
          } else if (xhr.status === 403) {
            swal({
              title: 'Error',
              text: xhr.responseJSON.message,
              type: 'error'
            })
          } else if (xhr.status === 404) {
            swal({
              title: 'Error',
              text: xhr.responseJSON.message,
              type: 'error'
            })
          } else if (xhr.status === 400) {
            swal({
              title: 'Error',
              text: xhr.responseJSON.message,
              type: 'error'
            })
          } else if (xhr.status === 409) {
            swal({
              title: 'Error',
              text: xhr.responseJSON.message,
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
    });

    // Function to reset button state after submission
    function resetButtonState() {
      $('#signupBtn').text('Sign Up');
      $('#signupBtn').attr('disabled', false);
      $('#signupBtn').css('cursor', 'pointer');
    }
  });
});




$('#forgotPasswordSubmitBtn').on('click', function (e) {
  if ($('#forgotPasswordForm').validate().form()) {
    forgotPasswordFuncation()
  }
})

// Forgot Password
function forgotPasswordFuncation () {
  // get email from user
  const forgetUserName = $('#forgotPasswordUsername').val()
  const forgetUserEmail = $('#forgotPasswordUserEmail').val()
  const requireData = JSON.stringify({
    // username: forgetUserName,
    email: forgetUserEmail
  })
  $('#forgotPasswordSubmitBtn').text('Submiting...')
  $('#forgotPasswordSubmitBtn').attr('disabled', true)
  $('#forgotPasswordSubmitBtn').css('cursor', 'not-allowed')
  $.ajax({
    url: MAIN_API_PATH + forgotPasswordAPI,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: requireData,
    success: function (xhr, response) {
      $('#forgotPasswordSubmitBtn').text('Submit')
      $('#forgotPasswordSubmitBtn').attr('disabled', false)
      $('#forgotPasswordSubmitBtn').css('cursor', 'pointer')
      $('#forgotPasswrodEmialDiv').removeClass('d-none')
      $('#forgotPasswordUsername').val('')
      $('#forgotPasswordUserEmail').val('')
      localStorage.setItem('_emG', xhr.message)
      localStorage.setItem('_emG_get', forgetUserEmail)
      // localStorage.setItem('_un', forgetUserName)
      window.location.href = 'forgot-password.html'
    },
    error: function (xhr) {
      $('#forgotPasswordSubmitBtn').text('Submit')
      $('#forgotPasswordSubmitBtn').attr('disabled', false)
      $('#forgotPasswordSubmitBtn').css('cursor', 'pointer')
      const errroShow = JSON.parse(xhr.responseText)
      if (
        xhr.status === 401 ||
        xhr.status === 400 ||
        xhr.status === 404 ||
        xhr.status === 503
      ) {
        $('#forgotPasswordUserEmail').val('')
        swal({
          title: 'Error',
          text: errroShow.message,
          type: 'error'
        })
      }
      if (xhr.status === 303) {
        $('#forgotPasswrodEmialDiv').removeClass('d-none')
      } else {
        $('#forgotPasswrodEmialDiv').addClass('d-none')
      }
    }
  })
}

// Clear Modal Box Errors
$('#forgotPasswordModal').on('hidden.bs.modal', function () {
  $('.error').html('')
  $('#forgotPasswordUsername').val('')
  $('#forgotPasswordUserEmail').val('')
})
// Set new pages funcation from Constant file
// setNewPages()