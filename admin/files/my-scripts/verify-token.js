var os_name;
var os_version;
var browserName;
//Document Ready Function
$(document).ready(function () {
    //Add Labels To Html File
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
  os_name = getOperatingSystem();
   browserName = getBrowserName();
   os_version = getOperatingSystemVersion();
    $.ajaxSetup({
        cache: false
    });
})
// If Auth Method is Google 
if (localStorage.getItem("_authen") == "google") {
    $("#google_Auth").css("display", "block")
    $("#microsoft_Auth").css("display", "none")
}
// If Auth Method is Microsoft
else if (localStorage.getItem("_authen") == "microsoft") {
    $("#microsoft_Auth").css("display", "block")
    $("#google_Auth").css("display", "none")
}

// Next button click funtion
$("#tokenBtn").on("click", function (event) {
    var payload
    // Auth Token validation check
    $('#tokenBtn').text('Submiting...')
    $('#tokenBtn').attr('disabled', true)
    $('#tokenBtn').css('cursor', 'not-allowed')
    if (document.getElementById("tokenValue").value == '') {
        swal({
            title: "Error",
            text: "Token field is required",
            type: "error"
        })
    } else {
        // If auth token is entered and then next button is clicked

        payload = JSON.stringify({
            "composit_id": localStorage.getItem('_composit_id'),
            "token": document.getElementById("tokenValue").value,
            "os_name": os_name,
            "os_version": os_version,
            "browser_name": browserName,
        });
        // Call back function
        $.ajax({
            url: MAIN_API_PATH + verifyTokenAPI,
            method: "post",
            dataType: "json",
            contentType: "application/json",
            data: payload,
            statusCode: {
                200: function (xhr) {
                    // Success Function
                    localStorage.setItem('_un', xhr.username)
                    localStorage.setItem('_read', xhr.read_write)
                    var imageshow = xhr.image;
                    localStorage.setItem('u_p', imageshow)
                    localStorage.setItem('_authen', xhr.auth)
                    var tokens = xhr.auth_token;
                    var encryptedAES = CryptoJS.AES.encrypt(tokens, "My Secret Passphrase");
                    localStorage.setItem('_at', encryptedAES)
                    localStorage.setItem('_atp', encryptedAES)
                    localStorage.setItem('org_name', xhr.organization)
                    var access_modules = "" + xhr.access;
                    //secret key
                    var key = "secret";
                    //encrypted modules
                    var encrypted = CryptoJS.AES.encrypt(access_modules, key);
                    localStorage.setItem("_mod", encrypted)
                    localStorage.setItem('p_s', false)
                    localStorage.setItem('_ia', true)
                    window.location.href = 'index.html'
                },
            },
            error: function (xhr, status, error) {
                $('#tokenBtn').text('Submit')
                $('#tokenBtn').removeAttr('disabled')
                $('#tokenBtn').css('cursor', 'pointer')
                // Error Function
                if (error === 400) {
                    swal({
                        title: "Error",
                        text: invalidRequest400Error,
                        type: "error"
                    })
                    return 0
                }
                if (xhr.status === 401) {

                    swal({
                        title: "Error",
                        text: unauthorizedRequest401Error,
                        type: "error"
                    })
                    return 0
                }
                else {
                    swal({
                        title: "Error",
                        text: serverError503Error,
                        type: "error"
                    })
                }
            }
        });
    }
});
// If Enter Key is pressed from keyboard then Next button will be clicked
var sign_in = document.getElementById("tokenValue")
sign_in.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("tokenBtn").click();
    }
});