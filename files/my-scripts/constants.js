const currentPathForSinginAndSignUpUser = window.location.pathname;
// const normalizedPathForSinginAndSignUpUser = currentPathForSinginAndSignUpUser.replace(/^\//, '');
  console.log(currentPathForSinginAndSignUpUser)
    if (currentPathForSinginAndSignUpUser === '/signin.html' || currentPathForSinginAndSignUpUser === '/signup.html' || currentPathForSinginAndSignUpUser === '/forgot-password.html'
      || currentPathForSinginAndSignUpUser === '/forgot-password.html' || currentPathForSinginAndSignUpUser === '/verify-token.html'
    ) {
        // not working the bleow part
        // return;
    }else{
        // localStorage.getItem("_ia") !== 'true' ? window.location.replace("signin.html") : null
    }


// localStorage.getItem("token") === null ? window.location.replace("signin.html") : null

 
 
 const MAIN_API_PATH = "https://electron.cytex.io/"




// api veribales
// POST
const POST = "POST";
const Content_Type = "application/json";
// Sigin and Signup
const signinAPI = "tml/signin";
const signupAPI = "tml/signup";
const signinUDAPI = 'signin/ud'
const singinCodeConfirmation = 'tml/confirmation'


const logoutUserSessionAPI = "tml/logout";

// Forgot password
const forgotPasswordAPI = "tml/forgot-password";
const verifyTokenAPI = "tml/verify-code"
const setPasswordAPI = "tml/set-password"




// Index
const updateMunicipalityWizardSetAPI = 'tml/municipality/wizard/update'
const setMunicipalityWizardSetAPI= 'tml/municipality/wizard/set'
const getMunicipalityWizardSetAPI= 'tml/municipality/wizard/get'
const getAdminListBundle = "tml/admin/list/bundle"

// Create Order
const createOrderAPI = 'tml/client/order/create'
const getOrdersAPI = "tml/client/orders/list";



// account details
const getTeamsAdminUsersListAPI = "tml/admin/users/list";
const addTeamsAdminUsesAddAPI = 'tml/admin/users/create'
const editTeamsAdminUsesEditAPI = 'tml/admin/users/edit'
const deletTeamsAdminUsersDeleteAPI= 'tml/admin/users/delete'
const tmlUpdateProfile = 'tml/update/profile'

// account security
const changePasswordAPI= 'tml/change-password'




// Enroll Services
const setEnrollServicesDataAPI= 'tml/admin/set/bundle'



// ********************** Start Admin message ***********************
let TMLAdminServiceAdd = "tml/admin/services/add"
let getserviceManagementAPI =  `tml/admin/services/view`
let editserviceManagementAPI =  `tml/admin/services/update`
let deleteserviceManagementAPI = '/tml/admin/services/delete'

// File Upload
let adminDocumentsAdd = "/tml/admin/documents/add"
let adminDocumentsView = "/tml/admin/documents/view"
// ********************** End Admin message ***********************
// to open the message from locals
const locKeyEncry = 'This is my message to you.'
const pswd_change_success = "Successfully changed"
const DELETE = "Successfully deleted.";
const NOTALLOWED = "Not allowed.";
const EANABLE = "Successfully enabled.";
const DISCONNECT = "Successfully Disconnected.";
const ENTER_URL = "Enter URL.";
const SUCCESSFULLY_ADDED = "Successfully added to watchlist.";
const SUCCESSFULLY_REMOVE = "Successfully removed from watchlist.";
const COOKIES = "Cookies updated.";
const PRIVACY = "Privacy policy updated.";
const TERMS = "Terms and conditions updated.";
const LOGOUT = "Successfully logout.";
const SAVED = "Successfully saved.";
const UPDATE = "Successfully updated.";
const downloadedFile = "Successfully downloaded.";
const SUCCESSFULLY_UPDATED = "Successfully updated.";


// ********************** Start Error message ***********************

// 204 STATUS
const noDataFoundText204Case = "No data to show.";
// 400 STATUS
const invalidRequest400Error = "Invalid request.";
// 401 STATUS
const unauthorizedRequest401Error = "Unauthorized request.";
// 403 STATUS
const inActiveUser403Error = "User is in inactive state.";
const invalidCredential403Error = "Invalid credentials.";
// 404 STATUS
const notFound404Error = "Data not found.";
// 503 STATUS
const serverError503Error = "Service is temporarily unavailable. Please try again.";
// 408 STATUS
const sessionExpired408Error = "Session expired.";
// Redirect to Login Page 408
const redirectToSignInPage408 = "/signin.html";
// 409 STATUS
const alreadyExist409Error = "Already exist."

// ********************** Start Error message ***********************


// Tom select option
function initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  id,
  search,
  maxItem = 1,
  minItem = null
) {
  if (!search) {
    $(`#${id}`).addClass("caret-transparent");
  }
  let plugins;
  // console.log("maxItem",maxItem)
  if (maxItem != 1) {
    plugins = ["checkbox_options", "remove_button"];
  } else {
    plugins = [];
  }

  let tomSelect = new TomSelect(`#${id}`, {
    maxItems: maxItem,
    minItems: minItem,
    maxOptions: null,
    valueField: "id",
    labelField: "title",
    searchField: "title",
    create: false,
    plugins: plugins,
    // dropdownParent: "body",
    // controlInput:0,
    placeholder: "Select",
    onItemAdd: function (value, item) {
      $(`#${id}-error`).hide();
      tomSelect.settings.placeholder = "";
      if (!search) {
        // Remove the placeholder when an item is added

        if (tomSelect.items.length > 1) {
          tomSelect.clear(true);
          tomSelect.addItem(tomSelect.items[1]);
        }
      }
    },
    onItemRemove: function (value) {
      $(`#${id}-error`).show();
      $(`#${id}`).off("change", function () {
        return 0;
      });
      if (!search) {
        // Prevent backspace key from removing items
        if (tomSelect.items.length === 0) {
          tomSelect.addItem(value);
        }
      } else {
        if (tomSelect.items.length === 0) {
          // console.log(select1.items);
          tomSelect.settings.placeholder = "Select";
        }
      }
    },
  });
  $(`#${id}-ts-control`).attr("name", `${id}`);

  return tomSelect;
}

// Show loader and hide table
function showDataTableLoader(baseId) {
  // Show loader
  $(`#${baseId}Loader`).removeClass("d-none").addClass("d-flex");
  // Hide table, footer, heading, and error divs
  $(`#${baseId}, #${baseId}FooterDiv, #${baseId}DatatableMainHeading, #${baseId}ErrorDiv`).addClass("d-none");
}

// Hide loader and show table
function hideDataTableLoader200(baseId) {
  // Remove loader class
  $(`#${baseId}Loader`).removeClass("d-flex");

  // Hide loader and error div
  $(`#${baseId}Loader, #${baseId}ErrorDiv`).addClass("d-none");

  // Show table, footer, and heading
  $(`#${baseId}, #${baseId}FooterDiv, #${baseId}DatatableMainHeading`).removeClass("d-none");
}


// Hide loader and show error
function hideDataTableLoaderError(baseId) {
  // Remove loader class
  $(`#${baseId}Loader`).removeClass("d-flex");

  // Hide loader and error div
  $(`#${baseId}Loader, #${baseId}, #${baseId}DatatableMainHeading, #${baseId}FooterDiv`).addClass("d-none");

  // Show table, footer, and heading
  $(`#${baseId}ErrorDiv`).removeClass("d-none");

}

// generate link or span
function generateLinkOrSpan(value) {
  if (value) {
      return `<a class="transact-table-data" style="max-width: 500px; cursor: pointer;" target="_blank" href="${value}" title="${value}">${value}</a>`;
  } else {
      return `<span class="transact-table-data" style="max-width: 500px;">--</span>`;
  }
}

// check number
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

// Capitalize first later
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}



function timeFormat(date) {
    
    if(date <= 9999999999){
        date *= 1000
    }
    
    
    if (localStorage.getItem('_tz') !== null && localStorage.getItem('_tz').trim() !== "" && localStorage.getItem('_tz') !== undefined && localStorage.getItem('_tz') !== 'undefined')  {
        const utcDateTime = moment(date).utc();
        var selectedTimeZone = localStorage.getItem('_tz');
        const timestamp = utcDateTime.unix();
        const offset = moment.tz(selectedTimeZone).utcOffset() * 60;
        const localDateTime = moment.unix(timestamp + offset).utc();

        var formatString = 'MMM/DD/YYYY HH:mm';
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            formatString = 'MMM-DD-YYYY HH:mm';
        }

        var formattedDateTime = localDateTime.format(formatString);

        if (localStorage.getItem('_tf') == '12') {
            var jsDate = new Date(formattedDateTime);
            var formattedHours = jsDate.getHours() % 12 || 12;
            var formattedMinutes = ('0' + jsDate.getMinutes()).slice(-2);
            var amOrPm = jsDate.getHours() >= 12 ? 'pm' : 'am';
        } else if (localStorage.getItem('_tf') == '24') {
            var jsDate = new Date(formattedDateTime);
            var formattedHours = ('0' + jsDate.getHours()).slice(-2);
            var formattedMinutes = ('0' + jsDate.getMinutes()).slice(-2);
        }

        var month = ('0' + (jsDate.getMonth() + 1)).slice(-2);
        var day = ('0' + jsDate.getDate()).slice(-2);
        var year = jsDate.getFullYear();

        formattedDateTime = `${month}/${day}/${year} ${formattedHours}:${formattedMinutes} ${amOrPm || ''}`;
        return formattedDateTime;
    } else {
        var myDate = new Date(date);
        var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
        var day = ('0' + myDate.getDate()).slice(-2);
        var year = myDate.getFullYear();
        var hours = ('0' + myDate.getHours()).slice(-2);
        var minutes = ('0' + myDate.getMinutes()).slice(-2);
        var formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`;
        return formattedDate;
    }
}
