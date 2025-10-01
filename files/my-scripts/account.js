if (localStorage.getItem('_ia') !== 'true') {
  window.location.href = 'signin.html'
}

const tokenAuth = localStorage.getItem('_at')
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, 'My Secret Passphrase')
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8)


let savePaymentsMethodsSelectInit
let profileTeamDataTableInit
let searchOject = {}
let login_user_email

// api responses
let teamMembersAPIResponse = []

$(document).ready(function () {
  $('#cover-spin').hide()
  $('#mainContentInnerLoader').addClass('d-none')
  $('#mainContentInnerDataToShow').removeClass('d-none')
  login_user_email = localStorage.getItem('_em')
  const is_super = localStorage.getItem('_is_super')
  if (is_super === 'true' || is_super === true) {
    $('#editUserDetailsSuperAccess').prop('disabled', false)
  } else {
    $('#editUserDetailsSuperAccess').prop('disabled', true)
    $('#editUserDetailsSuperAccess').parent().attr('title', 'You are not supper user.')
  }

    // Init validation
  $("#changePasswordForm").validate({
    debug: true,
    rules: {
      securityOldPassword: {
        required: true,
        strongPassword:true
      },
      securityNewPassword: {
        required: true,
        strongPassword: true
      },
      securityConfirmNewPassword: {
        required: true,
        equalTo: "#securityNewPassword"
      }
    },
    messages: {
      securityOldPassword: "Old password is required",
      securityNewPassword: {
        required: "New password is required"
      },
      securityConfirmNewPassword: {
        required: "Confirm password is required",
        equalTo: "Passwords do not match"
      }
    },
    errorPlacement: function(error, element) {
      error.appendTo(element.parent());
    },
    errorClass: "error invalid-feedback",
    validClass: "success",
    errorElement: "span",
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid").addClass("is-valid");
    }
  });

  // First Data Table Initialization
  profileTeamDataTableInit = createTableComponent(profileTeamConfig, options)

  savePaymentsMethodsSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('savePaymentsMethodsSelect', false);
  updateFiltersSelectDataOptions()

  setTimeout(() => {
    $('#firstActiveProfile').addClass('active')
  }, 2000);

    //  validation rules define
  $('#addUserDetailsModalForm').validate({
    debug: true,
    rules: {
      addUserDetailsModalFirstName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      addUserDetailsModalLastName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      addUserDetailsModalEmail: {
        required: true,
      },
      addUserDetailsModalPassword: {
        required: true,
        strongPassword: true
      },
      addUserDetailsModalConfirmPassword: {
        equalTo: '#addUserDetailsModalPassword'
      },
    },
    messages: {},
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
      if (element.attr("name") === "cyberVendors" || element.attr("name") === "backupInternetRedundancy") {
        error.appendTo(element.parent().parent().parent())
      } else {
        error.appendTo(element.parent())
      }
    }
  })



  $('#editUserDetailsModalForm').validate({
    debug: true,
    rules: {
      editUserDetailsModalFirstName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      editUserDetailsModalLastName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      }
    },
    messages: {},
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
      if (element.attr("name") === "cyberVendors" || element.attr("name") === "backupInternetRedundancy") {
        error.appendTo(element.parent().parent().parent())
      } else {
        error.appendTo(element.parent())
      }
    }
  })
     //  validation rules define
  $('#editProfile').validate({
    debug: true,
    rules: {
      editFirstName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 1,
        onlyDigitsNotAllowed: true,
      },
      editLastName: {
       atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 1,
        onlyDigitsNotAllowed: true,
      },
    },
    messages: {},
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
      if (element.attr("name") === "cyberVendors" || element.attr("name") === "backupInternetRedundancy") {
        error.appendTo(element.parent().parent().parent())
      } else {
        error.appendTo(element.parent())
      }
    }
  })
 // Get values from localStorage
  const firstName = localStorage.getItem("_uf");
  const lastName = localStorage.getItem("_ul");

  // Set values in the form if they exist
  if (firstName) {
    document.getElementById("editFirstName").value = firstName;
  }
  if (lastName) {
    document.getElementById("editLastName").value = lastName;
  }

});

$('#saveSecuritySettingBtn').on('click', function (e) {
  e.preventDefault()
  if ($('#changePasswordForm').validate().form()) {
    changePassword()
  }
})


// ================= START: Sidebar Role-Based Visibility =================
  const userRole = localStorage.getItem("_role"); // assume role is stored as "admin", "user", etc.

  if (userRole === "admin") {
    // Select the links
    const billingTab = document.querySelector('a[href="#billingTab"]');
    const notificationTab = document.querySelector('a[href="#notificationTab"]');
    const teamTab = document.querySelector('a[href="#teamTab"]');

    // Hide them
    if (billingTab) billingTab.style.display = "none";
    if (notificationTab) notificationTab.style.display = "none";
    if (teamTab) teamTab.style.display = "none";

    // Optionally hide the <hr> after each hidden link for clean look
    const hrElements = document.querySelectorAll(".horizontal-line");
    hrElements.forEach(hr => {
      const nextLink = hr.nextElementSibling;
      if (nextLink && nextLink.style.display === "none") {
        hr.style.display = "none";
      }
    });
  }
// ================= END: Sidebar Role-Based Visibility =================
// ******************** Start Add User ************************

$("#saveProfileBtn").prop("disabled", true);

$("#editProfile input, #editProfile select, #editProfile textarea").on("input change", function () {
  let hasValue = false;
  $("#editProfile input, #editProfile select, #editProfile textarea").each(function () {
    if ($(this).val().trim() !== "") {
      hasValue = true;
      return false; // break loop early
    }
  });
  $("#saveProfileBtn").prop("disabled", !hasValue);
});


$('#saveProfileBtn').on('click', function () {
  if($('#editProfile').validate().form()) {
    $('#cover-spin').show()
    editProfile()
  }
  
})


function editProfile() {

  const first_name = $('#editFirstName').val();
  const last_name = $('#editLastName').val();

// console.log("typeof $.notify", typeof $.notify); // should not be undefined
// console.log("typeof showNotificationError", typeof showNotificationError);


  const apiBody = JSON.stringify({
    auth_token: authToken,
    first_name: first_name,
    last_name: last_name,
  })
  // return 0 
  $.ajax({
    url: MAIN_API_PATH + tmlUpdateProfile,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: apiBody,
    statusCode: {
      200: function (data) {
        $('#cover-spin').hide(0)
        $('#addUserDetailsModal').modal('hide')
  localStorage.setItem("_uf",first_name);
   localStorage.setItem("_ul",last_name);
        showNotificationError(
          'bg-green',
          null,
          null,
          null,
          null,
          null,
          UPDATE
        )
      },
      204: function () {
        $('#cover-spin').hide(0)
        showNotificationError('bg-orange', null, null, null, null, null, alreadyExist409Error);
      }
    },
    error: function (xhr, status, error) {
      $('#cover-spin').hide()
      if (xhr.status === 400) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          invalidRequest400Error
        )
      } else if (xhr.status === 401) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          unauthorizedRequest401Error
        )
      } else if (xhr.status === 404) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          notFound404Error
        )
      } else if (xhr.status === 409) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          alreadyExist409Error
        )
      } else if (xhr.status === 503) {
        showNotificationError(
          'bg-red',
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        )
      } else if (xhr.status === 408) {
        swal(
          {
            title: ' ',
            text: sessionExpired408Error,
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Logout'
          },
          function (isConfirm) {
            if (isConfirm) {
              localStorage.clear()
              window.location.href = redirectToSignInPage408
            }
          }
        )
      } else if (xhr.status === 410) {
        $('#cover-spin').hide()

        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: 'json',
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt()
            encrypt.setPublicKey(sitePublicKey)
            const dateString = String(pageName + data.unixtime)
            securityKeyEncrypted = encrypt.encrypt(dateString)
            SecurityKeyTime = false
            createTheUsers()
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const dateString = String(pageName + data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(dateString)
              SecurityKeyTime = false
              createTheUsers()
            })
          }
        })
      } else {
        showNotificationError(
          'bg-red',
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        )
      }
    }
  })
}

// ******************** End Add User ***************************

// profile tab click
$('.profileTabClick').on('click', function () {
  // remove active class from all
  $('.profileTabClick').removeClass('active')
  // add active class to clicked one
  $(this).addClass('active')
});


// cards data such as Visa****1234
let savePaymentsMethodsData = [
  { id: 'visa_1234', title: 'Visa **** 1234' },
  { id: 'mastercard_5678', title: 'MasterCard **** 5678' },
  { id: 'amex_9012', title: 'Amex **** 9012' },
]

// update filters select data options
function updateFiltersSelectDataOptions() {

  savePaymentsMethodsSelectInit.addOption(savePaymentsMethodsData);
  savePaymentsMethodsSelectInit.setValue('visa_1234')

}



// get span for change
function generateSpan(data, key, customClass = "", style = "") {
  let spanContent = "";

  if (data[key] == "nil" || data[key] == "nill" || data[key] == "" || data[key] == " " || data[key] == null) {
    spanContent = `<span class="${customClass}">--</span>`;
  }
  else if (data[key] == 'true' || data[key] == true || data[key] == "false" || data[key] == false) {
    // If the key is an array, join its values with commas and display in a span
    const displayValue = data[key] == true || data[key] == 'true' ? "True" : "False";
    spanContent = `<span class="${customClass}" style="${style}" title="${displayValue}">${displayValue}</span>`;
  }
  else if (isNumber(data[key])) {
    // If the key is an array, join its values with commas and display in a span
    const displayValue = data[key].toFixed(2);
    spanContent = `<span class="${customClass}" style="${style}" title="${displayValue}">${displayValue}</span>`;
  }
  else {
    // If the key is a simple value
    const displayValue = data[key] == "" || data[key] === null || (data[key] && data[key].length <= 0) ? "--" : `${data[key]}`;
    const title = displayValue;
    spanContent = `<span class="${customClass}" style="${style}" title="${title}">${displayValue}</span>`;
  }

  return spanContent;
}




// ******************** Start Add User ************************

function changePassword() {

  const oldPassword = $('#securityOldPassword').val();
  const newPassword = $('#securityNewPassword').val();

  const oldHashObj = new jsSHA('SHA-512', 'TEXT')
  oldHashObj.update(oldPassword)
  const oldHash = oldHashObj.getHash('HEX')
  const hashOldPassword = oldHash


  const newHashObj = new jsSHA('SHA-512', 'TEXT')
  newHashObj.update(newPassword)
  const newHash = newHashObj.getHash('HEX')
  const hashNewPassword = newHash


  const apiBody = JSON.stringify({
    auth_token: authToken,
    old_password: hashOldPassword,
    new_password: hashNewPassword
  })
  // return 0 
  $.ajax({
    url: MAIN_API_PATH + changePasswordAPI,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: apiBody,
    statusCode: {
      200: function (data) {
        $('#cover-spin').hide(0)

        showNotificationError(
          'bg-green',
          null,
          null,
          null,
          null,
          null,
          UPDATE
        )


        $('#securityOldPassword').val('');
        $('#securityNewPassword').val('');
        $('#securityConfirmNewPassword').val('');



      },
      204: function () {
        $('#cover-spin').hide(0)
      }
    },
    error: function (xhr, status, error) {
      $('#cover-spin').hide()
      if (xhr.status === 400) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          invalidRequest400Error
        )
      } else if (xhr.status === 401) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          unauthorizedRequest401Error
        )
      } else if (xhr.status === 404) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          notFound404Error
        )
      } else if (xhr.status === 409) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          alreadyExist409Error
        )
      } else if (xhr.status === 503) {
        showNotificationError(
          'bg-red',
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        )
      } else if (xhr.status === 408) {
        swal(
          {
            title: ' ',
            text: sessionExpired408Error,
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Logout'
          },
          function (isConfirm) {
            if (isConfirm) {
              localStorage.clear()
              window.location.href = redirectToSignInPage408
            }
          }
        )
      } else if (xhr.status === 410) {
        $('#cover-spin').hide()

        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: 'json',
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt()
            encrypt.setPublicKey(sitePublicKey)
            const dateString = String(pageName + data.unixtime)
            securityKeyEncrypted = encrypt.encrypt(dateString)
            SecurityKeyTime = false
            changePassword()
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const dateString = String(pageName + data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(dateString)
              SecurityKeyTime = false
              changePassword()
            })
          }
        })
      } else {
        showNotificationError(
          'bg-red',
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        )
      }
    }
  })
}

// ******************** End Add User ***************************




$('#teamTabClick').on('click', function () {
  // reload datatable
  showDataTableLoader('profileTeamDataTable')
  profileTeamDataTableInit.clear().draw()
  let pageEntries = Number($('#datatableEntries1').val())
  getProfileTeamTableData(pageEntries, 1)
});


function searchObjectCreation(search) {
  searchOject = search;
}


// Main API Call function for datatable
function getProfileTeamTableData(skip, page) {
  console.log(skip, page)


  // create me dummy data for 5 rows based on this data.
  // { "name": "Order ID", "widthClass": "w-5" },
  // { "name": "Municipality", "widthClass": "w-5" },
  // { "name": "Service", "widthClass": "w-5" },
  // { "name": "Date", "widthClass": "w-5" },
  // { "name": "Payment", "widthClass": "w-5" },
  // { "name": "Status", "widthClass": "w-5" },
  // { "name": "Actions", "widthClass": "" }
  let data = [
    {
      id: '1',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
    },
    {
      id: '2',
      name: 'Mark Taylor',
      email: 'mark@example.com',
      role: 'Admin',
    },
    {
      id: '3',
      name: 'Lucy Brown',
      email: 'lucy@example.com',
      role: 'Viewer',
    }





  ]


  let requirePayloadData
  if ((Object.keys(searchOject).length > 0)) {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      search: searchOject,

    })
  } else {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
    })
  }


  // Ajax call
  $.ajax({
    url: MAIN_API_PATH + getTeamsAdminUsersListAPI,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        // Hide page laoder Spiner
        $('#cover-spin').hide()

        hideDataTableLoader200('profileTeamDataTable')

        // Response data (IPs)
        response = data.message
        teamMembersAPIResponse = response
        ordersDataReceived = response
        localStorage.setItem('profileTeamDataTableTotal', data.count)
        // If No IPs found

        // loop through response to add data in datatable
        for (let i = 0; i < response.length; i++) {


          let fname = generateSpan(response[i], 'first_name', '', '')
          let lname = generateSpan(response[i], 'last_name', '', '')

          let email = generateSpan(response[i], 'email', '', '')
          let role = generateSpan(response[i], 'role', '', '')


          let actions
          if (login_user_email == response[i].email) {
            actions = `
            <button class="btn btn-sm btn-primary edit-member" data-member-id="${response[i].composit_id}">Edit</button>
            <button class="btn btn-sm btn-danger " disabled data-member-id="${response[i].composit_id}">Remove</button>
          `
          } else {
            actions = `
            <button class="btn btn-sm btn-primary edit-member" data-member-id="${response[i].composit_id}">Edit</button>
            <button class="btn btn-sm btn-danger remove-member" data-member-id="${response[i].composit_id}">Remove</button>
          `
          }


          profileTeamDataTableInit.row
            .add([
              `<td ><span >${fname}</span></td>`,
              `<td ><span >${lname}</span></td>`,
              `<td ><span >${email}</span></td>`,
              `<td ><span >${role}</span></td>`,
              `<td ><span >${actions}</span></td>`,

            ])
            .draw()
          datatablePagination('profileTeamDataTable', 1, 'profileTeamDataTableTotal', getProfileTeamTableData)


          let editMemberButtons = document.querySelectorAll('.edit-member');
          editMemberButtons.forEach(button => {
            button.addEventListener('click', function () {
              let memberId = this.getAttribute('data-member-id');
              // Redirect to order details page
              $('#editUserDetailsModal').modal('show')
              editMemberFromTeam(memberId);
            });
          });



          let removeMemberButtons = document.querySelectorAll('.remove-member');
          removeMemberButtons.forEach(button => {
            button.addEventListener('click', function () {
              let memberId = this.getAttribute('data-member-id');
              // Redirect to order details page
              removeMemberFromTeam(memberId);
            });
          });


        }
      },
      204: function () {
        $('#cover-spin').hide()
        hideDataTableLoaderError('profileTeamDataTable')
        if (Object.keys(searchOject).length > 0) {
          $('#profileTeamDataTableErrorDiv').addClass('d-none')
          $('#profileTeamDataTable, #profileTeamDataTableDatatableMainHeading').removeClass('d-none')
        }
        ipAddressDatatable.clear().draw()
        $('#profileTeamDataTableErrorText').text(noDataFoundText204Case)
      }
    },
    error: function (xhr, status, error) {
      $('#cover-spin').hide()
      hideDataTableLoaderError('profileTeamDataTable')

      if (xhr.status === 400) {
        $('#profileTeamDataTableErrorText').text(invalidRequest400Error)
      } else if (xhr.status === 401) {
        $('#profileTeamDataTableErrorText').text(unauthorizedRequest401Error)
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $('#profileTeamDataTableErrorText').text(notFound404Error)
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $('#profileTeamDataTableErrorText').text(serverError503Error)
      } else if (xhr.status === 408) {
        swal(
          {
            title: ' ',
            text: sessionExpired408Error,
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Logout'
          },
          function (isConfirm) {
            if (isConfirm) {
              localStorage.clear()
              window.location.href = redirectToSignInPage408
            }
          }
        )
      } else if (xhr.status === 410) {
        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: 'json',
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt()
            encrypt.setPublicKey(sitePublicKey)
            const currentDateString = String(data.unixtime)
            securityKeyEncrypted = encrypt.encrypt(pageName + currentDateString)
            SecurityKeyTime = false
            getOrdersTableData(skip, page, search)
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const currentDateString = String(data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(pageName + currentDateString)
              SecurityKeyTime = false
              getOrdersTableData(skip, page, search)
            })
          }
        })
      } else {
        // $('#cover-spin').hide(0);
        $('#profileTeamDataTableErrorText').text(serverError503Error)
      }
    }
  })





}



// function to export data from datatable
function exportProfileTeamDataTableData() {
  console.log('exportProfileTeamDataTableData called')
}



// ******************** Start Add User ************************


$('#addUserDetailsSaveButton').on('click', function () {
  if($('#addUserDetailsModalForm').validate().form()) {
    $('#cover-spin').show()
    createTheUsers()
  }
  
})


function createTheUsers() {

  const first_name = $('#addUserDetailsModalFirstName').val();
  const last_name = $('#addUserDetailsModalLastName').val();
  const email = $('#addUserDetailsModalEmail').val();
  const password = $('#addUserDetailsModalPassword').val();

// console.log("typeof $.notify", typeof $.notify); // should not be undefined
// console.log("typeof showNotificationError", typeof showNotificationError);

  const is_super = $('#addUserDetailsSuperAccess').prop('checked');;
  const user_type = localStorage.getItem('_role')

  const apiBody = JSON.stringify({
    auth_token: authToken,
    first_name: first_name,
    last_name: last_name,
    is_super: is_super,
    type: user_type,
    email: email,
    password: password
  })
  // return 0 
  $.ajax({
    url: MAIN_API_PATH + addTeamsAdminUsesAddAPI,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: apiBody,
    statusCode: {
      200: function (data) {
        $('#cover-spin').hide(0)
        $('#addUserDetailsModal').modal('hide')

        showNotificationError(
          'bg-green',
          null,
          null,
          null,
          null,
          null,
          UPDATE
        )

        teamMembersAPIResponse = []
        showDataTableLoader('profileTeamDataTable')

        profileTeamDataTableInit.clear().draw()
        let pageEntries = Number($('#datatableEntries1').val())
        getProfileTeamTableData(pageEntries, 1)

      },
      204: function () {
        $('#cover-spin').hide(0)
        showNotificationError('bg-orange', null, null, null, null, null, alreadyExist409Error);
      }
    },
    error: function (xhr, status, error) {
      $('#cover-spin').hide()
      if (xhr.status === 400) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          invalidRequest400Error
        )
      } else if (xhr.status === 401) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          unauthorizedRequest401Error
        )
      } else if (xhr.status === 404) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          notFound404Error
        )
      } else if (xhr.status === 409) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          alreadyExist409Error
        )
      } else if (xhr.status === 503) {
        showNotificationError(
          'bg-red',
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        )
      } else if (xhr.status === 408) {
        swal(
          {
            title: ' ',
            text: sessionExpired408Error,
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Logout'
          },
          function (isConfirm) {
            if (isConfirm) {
              localStorage.clear()
              window.location.href = redirectToSignInPage408
            }
          }
        )
      } else if (xhr.status === 410) {
        $('#cover-spin').hide()

        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: 'json',
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt()
            encrypt.setPublicKey(sitePublicKey)
            const dateString = String(pageName + data.unixtime)
            securityKeyEncrypted = encrypt.encrypt(dateString)
            SecurityKeyTime = false
            createTheUsers()
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const dateString = String(pageName + data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(dateString)
              SecurityKeyTime = false
              createTheUsers()
            })
          }
        })
      } else {
        showNotificationError(
          'bg-red',
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        )
      }
    }
  })
}

// ******************** End Add User ***************************


// ******************** Start Eidt User ************************
let currentEditUserDataInUse = {}
let isSuperChecked = ''
// edit user
function editMemberFromTeam(memberId) {

  let userDetails = teamMembersAPIResponse.find(member => member.composit_id === memberId)
  currentEditUserDataInUse = userDetails
  $('#editUserDetailsModalFirstName').val(userDetails.first_name);
  $('#editUserDetailsModalLastName').val(userDetails.last_name);

  const is_super = userDetails.is_super
  isSuperChecked = is_super
  if (is_super === true) {
    $('#editUserDetailsSuperAccess').prop('checked', true)
  } else {
    $('#editUserDetailsSuperAccess').prop('checked', false)
  }


  $('#editUserDetailsModalFirstName').on('keyup', function () {
    enableDisabelEidtUserButton()
  })

  $('#editUserDetailsModalLastName').on('keyup', function () {
    enableDisabelEidtUserButton()
  })

  $('#editUserDetailsSuperAccess').on('change', function () {
    isSuperChecked = $(this).prop('checked');
    enableDisabelEidtUserButton()
  })

  enableDisabelEidtUserButton()
}


$('#editUserDetailsSaveButton').on('click', function () {
  if($('#addUserDetailsModalForm').validate().form()) {
    $('#cover-spin').show()
    updatedTheUsersDetails()
  }
})


function updatedTheUsersDetails() {

  const first_name = $('#editUserDetailsModalFirstName').val();
  const last_name = $('#editUserDetailsModalLastName').val();
  const is_super = $('#editUserDetailsSuperAccess').prop('checked');;
  const user_id = currentEditUserDataInUse.composit_id


  const apiBody = JSON.stringify({
    auth_token: authToken,
    user_id: user_id,
    first_name: first_name,
    last_name: last_name,
    is_super: is_super
  })
  // return 0 
  $.ajax({
    url: MAIN_API_PATH + editTeamsAdminUsesEditAPI,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: apiBody,
    statusCode: {
      200: function (data) {
        $('#cover-spin').hide(0)
        $('#editUserDetailsModal').modal('hide')

        showNotificationError(
          'bg-green',
          null,
          null,
          null,
          null,
          null,
          UPDATE
        )

        teamMembersAPIResponse = []
        showDataTableLoader('profileTeamDataTable')

        profileTeamDataTableInit.clear().draw()
        let pageEntries = Number($('#datatableEntries1').val())
        getProfileTeamTableData(pageEntries, 1)

      },
      204: function () {
        $('#cover-spin').hide(0)
      }
    },
    error: function (xhr, status, error) {
      $('#cover-spin').hide()
      if (xhr.status === 400) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          invalidRequest400Error
        )
      } else if (xhr.status === 401) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          unauthorizedRequest401Error
        )
      } else if (xhr.status === 404) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          notFound404Error
        )
      } else if (xhr.status === 409) {
        showNotificationError(
          'bg-orange',
          null,
          null,
          null,
          null,
          null,
          alreadyExist409Error
        )
      } else if (xhr.status === 503) {
        showNotificationError(
          'bg-red',
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        )
      } else if (xhr.status === 408) {
        swal(
          {
            title: ' ',
            text: sessionExpired408Error,
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Logout'
          },
          function (isConfirm) {
            if (isConfirm) {
              localStorage.clear()
              window.location.href = redirectToSignInPage408
            }
          }
        )
      } else if (xhr.status === 410) {
        $('#cover-spin').hide()

        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: 'json',
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt()
            encrypt.setPublicKey(sitePublicKey)
            const dateString = String(pageName + data.unixtime)
            securityKeyEncrypted = encrypt.encrypt(dateString)
            SecurityKeyTime = false
            editPolicyAndSessions()
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const dateString = String(pageName + data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(dateString)
              SecurityKeyTime = false
              editPolicyAndSessions()
            })
          }
        })
      } else {
        showNotificationError(
          'bg-red',
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        )
      }
    }
  })
}

// ******************** End Eidt User ***************************



// edit delete
function removeMemberFromTeam(memberId) {
  console.log('removeMemberFromTeam called', memberId)



  swal({
    title: 'Deleting Record',
    text: 'Are you sure you want to delete?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
  }, function () {
    $('#cover-spin').show()

    const apiBody = JSON.stringify({
      auth_token: authToken,
      user_id: memberId,
    })
    // return 0 
    $.ajax({
      url: MAIN_API_PATH + deletTeamsAdminUsersDeleteAPI,
      method: POST,
      contentType: Content_Type,
      dataType: 'json',
      data: apiBody,
      statusCode: {
        200: function (data) {
          $('#cover-spin').hide(0)

          showNotificationError(
            'bg-green',
            null,
            null,
            null,
            null,
            null,
            DELETE
          )

          teamMembersAPIResponse = []
          showDataTableLoader('profileTeamDataTable')

          profileTeamDataTableInit.clear().draw()
          let pageEntries = Number($('#datatableEntries1').val())
          getProfileTeamTableData(pageEntries, 1)

        },
        204: function () {
          $('#cover-spin').hide(0)
        }
      },
      error: function (xhr, status, error) {
        $('#cover-spin').hide()
        if (xhr.status === 400) {
          showNotificationError(
            'bg-orange',
            null,
            null,
            null,
            null,
            null,
            invalidRequest400Error
          )
        } else if (xhr.status === 401) {
          showNotificationError(
            'bg-orange',
            null,
            null,
            null,
            null,
            null,
            unauthorizedRequest401Error
          )
        } else if (xhr.status === 404) {
          showNotificationError(
            'bg-orange',
            null,
            null,
            null,
            null,
            null,
            notFound404Error
          )
        } else if (xhr.status === 409) {
          showNotificationError(
            'bg-orange',
            null,
            null,
            null,
            null,
            null,
            alreadyExist409Error
          )
        } else if (xhr.status === 503) {
          showNotificationError(
            'bg-red',
            null,
            null,
            null,
            null,
            null,
            serverError503Error
          )
        } else if (xhr.status === 408) {
          swal(
            {
              title: ' ',
              text: sessionExpired408Error,
              type: 'info',
              showCancelButton: false,
              confirmButtonText: 'Logout'
            },
            function (isConfirm) {
              if (isConfirm) {
                localStorage.clear()
                window.location.href = redirectToSignInPage408
              }
            }
          )
        } else if (xhr.status === 410) {
          $('#cover-spin').hide()

          $.ajax({
            url: MAIN_API_PATH + getGmtAPI,
            method: POST,
            contentType: Content_Type,
            dataType: 'json',
            success: function (data, textStatus, xhr) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const dateString = String(pageName + data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(dateString)
              SecurityKeyTime = false
              editPolicyAndSessions()
            },
            error: function (xhr, status, error) {
              $.getJSON(worldTimeAPI, function (data) {
                const encrypt = new JSEncrypt()
                encrypt.setPublicKey(sitePublicKey)
                const dateString = String(pageName + data.unixtime)
                securityKeyEncrypted = encrypt.encrypt(dateString)
                SecurityKeyTime = false
                editPolicyAndSessions()
              })
            }
          })
        } else {
          showNotificationError(
            'bg-red',
            null,
            null,
            null,
            null,
            null,
            serverError503Error
          )
        }
      }
    })
  })

}





function logoutUser(SessionId) {
  // Delete User

  swal({
    title: 'Logout Session',
    text: 'Are you sure you want to logout?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
  }, function () {
    $('#cover-spin').show()

    setTimeout(() => {
      window.location.href = '/signin.html';
    }, 1500);


    // const requireData =
    //   JSON.stringify({
    //     time: Number(SessionId),
    //     auth_token: authToken,
    //   })
    // $.ajax({
    //   url: MAIN_API_PATH + logoutUserSessionAPI,
    //   method: POST,
    //   contentType: Content_Type,
    //   dataType: 'json',
    //   data: requireData,
    //   success: function (data, textStatus, xhr) {
    //     $('#cover-spin').hide()
    //     $('#create_td').DataTable().clear().draw()
    //     showNotificationError('bg-green', null, null, null, null, null, DELETE)
    //     profileSessionDatatable.clear().draw()
    //     const entriesPerPageChanged = Number($('#datatableEntries1').val())
    //     getAllSessionDetail(entriesPerPageChanged, 1)
    //   },
    //   error: function (xhr, status, error) {
    //     $('#cover-spin').hide(0)
    //     if (xhr.status === 400) {
    //       showNotificationError(
    //         'bg-orange',
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         invalidRequest400Error

    //       )
    //     } else if (xhr.status === 401) {
    //       showNotificationError(
    //         'bg-orange',
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         unauthorizedRequest401Error
    //       )
    //     } else if (xhr.status === 404) {
    //       showNotificationError(
    //         'bg-red',
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         notFound404Error
    //       )
    //     } else if (xhr.status === 503) {
    //       showNotificationError(
    //         'bg-red',
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         serverError503Error
    //       )
    //     } else if (xhr.status === 408) {
    //       swal({
    //         title: ' ',
    //         text: sessionExpired408Error,
    //         type: 'info',
    //         showCancelButton: false,
    //         confirmButtonText: 'Logout'
    //       }, function (isConfirm) {
    //         if (isConfirm) {
    //           localStorage.clear()
    //           window.location.href = redirectToSignInPage408
    //         }
    //       })
    //     } else if (xhr.status === 410) {
    //       $.ajax({
    //         url: MAIN_API_PATH + getGmtAPI,
    //         method: POST,
    //         contentType: Content_Type,
    //         dataType: 'json',
    //         success: function (data, textStatus, xhr) {
    //           const encrypt = new JSEncrypt()
    //           encrypt.setPublicKey(sitePublicKey)
    //           const dateString = String(data.unixtime)
    //           securityKeyEncrypted = encrypt.encrypt(dateString)
    //           SecurityKeyTime = false
    //           deleteSession()
    //         },
    //         error: function (xhr, status, error) {
    //           $.getJSON(worldTimeAPI,
    //             function (data) {
    //               const encrypt = new JSEncrypt()
    //               encrypt.setPublicKey(sitePublicKey)
    //               const dateString = String(data.unixtime)
    //               securityKeyEncrypted = encrypt.encrypt(dateString)
    //               SecurityKeyTime = false
    //               deleteSession()
    //             })
    //         }
    //       })
    //     } else {
    //       showNotificationError(
    //         'bg-red',
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         serverError503Error
    //       )
    //     }
    //   }
    // })
  })

}




// enable disable button
function enableDisabelEidtUserButton() {



  const first_name = $('#editUserDetailsModalFirstName').val();
  const last_name = $('#editUserDetailsModalLastName').val();
  // const is_super = $('#editUserDetailsSuperAccess').val();


  console.log(first_name, currentEditUserDataInUse.first_name, last_name, currentEditUserDataInUse.last_name, isSuperChecked, currentEditUserDataInUse.is_super)

  if (first_name === currentEditUserDataInUse.first_name && last_name === currentEditUserDataInUse.last_name && isSuperChecked === currentEditUserDataInUse.is_super) {
    $('#editUserDetailsSaveButton').prop('disabled', true)
  } else {
    $('#editUserDetailsSaveButton').prop('disabled', false)

  }


}