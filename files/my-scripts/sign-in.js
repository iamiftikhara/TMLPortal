/* global CryptoJS, signinAPI, signupAPI, forgotPasswordAPI, setNewPages */

let osName = ''
let osVersion = ''
let browserName = ''
let signinEmail = ''
let hashPassword = ''

// Document Ready Function
$(document).ready(function () {
  localStorage.clear()
  $('#signinForm').validate({
    debug: true,
    rules: {
      signInUsername: {
        chractesDotHypenUnderscore: true
      },
      signInUserEmail: {
        required: true,
        email: true
      },
      signInUserPassword: {
        strongPassword: true
      }
    },
    messages: {

      signInUsername: {
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
  // (function () {
  //   'use strict';
  
  //   const module = {
  //     header: [
  //       navigator.platform,
  //       navigator.userAgent,
  //       navigator.appVersion,
  //       navigator.vendor,
  //       window.opera
  //     ],
  //     dataos: [
  //       { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
  //       { name: 'Windows', value: 'Win', version: 'NT' },
  //       { name: 'iPhone', value: 'iPhone', version: 'OS' },
  //       { name: 'iPad', value: 'iPad', version: 'OS' },
  //       { name: 'Android', value: 'Android', version: 'Android' },
  //       { name: 'Macintosh', value: 'Mac', version: 'OS X' },
  //       { name: 'Linux', value: 'Linux', version: '' }
  //     ],
  //     databrowser: [
  //       { name: 'Opera', value: 'OPR', version: 'OPR' },
  //       { name: 'Edge', value: 'Edg', version: 'Edg' },
  //       { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
  //       { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
  //       { name: 'Safari', value: 'Safari', version: 'Version' },
  //       { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' }
  //     ],
  //     init: function () {
  //       const agent = this.header.join(' ');
  //       const os = this.matchItem(agent, this.dataos);
  //       const browser = this.matchItem(agent, this.databrowser);
  
  //       return { os, browser };
  //     },
  //     matchItem: function (string, data) {
  //       for (let item of data) {
          
  //         const regex = new RegExp(item.value, 'i');
  //         if (regex.test(string)) {
  //           const versionRegex = new RegExp(item.version + '[- /:;]([\\d._]+)', 'i');
  //           // console.log("versionRegex",versionRegex)
  //           const matches = string.match(versionRegex);
  //           let version = matches ? matches[1]?.replace(/_/g, '.') : 'Unknown';
  //           console.log("versionRegex",version)
  
  //           // Handle special cases for macOS versions
  //           if (item.name === 'Macintosh') {
  //             // Explicitly check for macOS versions
  //             if (string.includes('Mac OS X 11_')) {
  //               version = '11.x'; // Big Sur (macOS 11) or later
  //             } else if (string.includes('Mac OS X 12_')) {
  //               version = '12.x'; // Monterey
  //             } else if (string.includes('Mac OS X 13_')) {
  //               version = '13.x'; // Ventura
  //             } else if (string.includes('Mac OS X 10_15')) {
  //               version = '10.15'; // Catalina
  //             }
  //           }
  
  //           return { name: item.name, version };
  //         }
  //       }
  //       return { name: 'Unknown', version: 'Unknown' };
  //     }
  //   };
  
  //   // Initialize detection
  //   const detection = module.init();
  
  //   // Assigning values
  //    osName = detection.os.name;
  //    osVersion = detection.os.version;
  //    browserName = detection.browser.name;
  
  //   // Log the results
  //   console.log('OS Name:', osName);
  //   console.log('OS Version:', osVersion);
  //   console.log('Browser Name:', browserName);
  
  // })();
  
  


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

console.log("Operating System2: " + osName);
console.log("Browser2: " + browserName);
console.log("OS Version2: " + osVersion);

  
  $.ajaxSetup({
    cache: false
  })

  $('#forgotpassForm').attr('action', 'javascript:void(0);')
  $('#forgotUserForm').attr('action', 'javascript:void(0);')
})


$('#signinForm').submit(function (e) {
  e.preventDefault()

  if ($(this).validate().form()) {
    signinEmail = $('#signinUserEmail').val()
    const signinUserName = $('#signinUserName').val()
    const signinPassword = $('#signinUserPassword').val()

    const hashObj = new jsSHA('SHA-512', 'TEXT')
    hashObj.update(signinPassword)
    const hash = hashObj.getHash('HEX')
    hashPassword = hash
    // Secret key convert to hash
    const requireData = JSON.stringify({
      // username: signinUserName,
      email: signinEmail,
      password: hashPassword,
      os_name: osName,
      os_version: osVersion,
      browser_name: browserName
    })
    console.log("requireData",requireData)
    $('#signinBtn').text('Signing In...')
    $('#signinBtn').attr('disabled', true)
    $('#signinBtn').css('cursor', 'not-allowed')
    $.ajax({
      url: MAIN_API_PATH + signinAPI,
      method: POST,
      contentType: Content_Type,
      dataType: 'json',
      data: requireData,
      statusCode: {
        200: function (xhr) {   
          let userDetails = xhr.user

          localStorage.setItem('_uf', userDetails.first_name)
          localStorage.setItem('_ul', userDetails.last_name)

          localStorage.setItem('_em', userDetails.email)
          localStorage.setItem('_mfa', userDetails.mfa_enabled)
          localStorage.setItem('_org_n', userDetails.org_name)
          localStorage.setItem('_role', userDetails.role)
          localStorage.setItem('_is_super', userDetails.is_super)
          localStorage.setItem('_ia', true)


         


          // localStorage.setItem('_read', xhr.read_write)

          const tokens = xhr.auth_token
          const encryptedAES = CryptoJS.AES.encrypt(
            tokens,
            'My Secret Passphrase'
          )
          localStorage.setItem('_at', encryptedAES)

          if(userDetails.role === 'admin'){
            window.location.href = 'admin/quotes-review.html'
          }else if(userDetails.role === 'user'){
            window.location.href = 'municipality-details.html'
          }
         
          setTimeout(function () {
            $('#signinBtn').text('Sign In')
            $('#signinBtn').attr('disabled', false)
            $('#signinBtn').css('cursor', 'pointer')
          }, 100)
        }
      },
      error: function (xhr, error) {
        const errroShow = JSON.parse(xhr.responseText)
        $('#signinBtn').text('Sign In')
        $('#signinBtn').attr('disabled', false)
        $('#signinBtn').css('cursor', 'pointer')
        if (xhr.status === 402) {
          localStorage.setItem('_composit_id', errroShow.composit_id)
          localStorage.setItem('_emG', errroShow.email)
          window.location.href = 'verification_code.html'
          return 0
        }
        if (
          xhr.status === 401 ||
          xhr.status === 400 ||
          xhr.status === 403 ||
          xhr.status === 404 ||
          xhr.status === 503
        ) {
          swal({
            title: 'Error',
            text: errroShow.message,
            type: 'error'
          })
        }else{
          swal({
            title: 'Error',
            text: errroShow.message,
            type: 'error'
          })
        }
        
      }
    })
  }
})
// Sign Up Form Submission

$('#forgotPasswordSubmitBtn').on('click', function (e) {
  if ($('#forgotPasswordForm').validate().form()) {
    forgotPasswordFuncation()
  }
})

// Forgot Password
function forgotPasswordFuncation() {
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
      // return
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
      // if (xhr.status === 303) {
      //   $('#forgotPasswrodEmialDiv').removeClass('d-none')
      // } else {
      //   $('#forgotPasswrodEmialDiv').addClass('d-none')
      // }
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

function login() {
  localStorage.setItem("_cb", "true"); // Store as string
  setTimeout(() => {
    window.location.href = "https://electron.cytex.io/login";
  }, 100); // slight delay to ensure storage
}


function loginWithMicrosoftAzure() {
  localStorage.setItem("_cb", "true"); // Store as string
  setTimeout(() => {
    window.location.href = "https://electron.cytex.io/login/azure";
  }, 100); // slight delay to ensure storage
}

