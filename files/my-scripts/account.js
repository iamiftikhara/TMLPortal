if (localStorage.getItem('_ia') !== 'true') {
  window.location.href = 'signin.html'
}
const tokenAuth = localStorage.getItem('_at')
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, 'My Secret Passphrase')
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8)


let savePaymentsMethodsSelectInit
let profileTeamDataTableInit

$(document).ready(function () {
  $('#cover-spin').hide()
  $('#mainContentInnerLoader').addClass('d-none')
  $('#mainContentInnerDataToShow').removeClass('d-none')


  // First Data Table Initialization
  profileTeamDataTableInit = createTableComponent(profileTeamConfig, options)

  savePaymentsMethodsSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('savePaymentsMethodsSelect', false);
  updateFiltersSelectDataOptions()

  setTimeout(() => {
    $('#firstActiveProfile').addClass('active')
  }, 2000);



  getProfileTeamTableData(10, 1)

});



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





  hideDataTableLoader200('profileTeamDataTable')

  // Response data (IPs)
  response = data
  ordersDataReceived = response
  localStorage.setItem('profileTeamDataTableTotal', data.length)
  // If No IPs found

  // loop through response to add data in datatable
  for (let i = 0; i < response.length; i++) {


    let name = generateSpan(response[i], 'name', '', '')
    let email = generateSpan(response[i], 'email', '', '')
    let role = generateSpan(response[i], 'role', '', '')

    let actions = `
      <button class="btn btn-sm btn-danger remove-member" data-order-id="${response[i].id}">Remove</button>
    `



    profileTeamDataTableInit.row
      .add([
        `<td ><span >${name}</span></td>`,
        `<td ><span >${email}</span></td>`,
        `<td ><span >${role}</span></td>`,
        `<td ><span >${actions}</span></td>`,

      ])
      .draw()
    datatablePagination('profileTeamDataTable', 1, 'profileTeamDataTableTotal', getProfileTeamTableData)



    let removeMemberButtons = document.querySelectorAll('.remove-member');
    removeMemberButtons.forEach(button => {
      button.addEventListener('click', function () {
        let orderId = this.getAttribute('data-order-id');
        // Redirect to order details page
        removeMemberFromTeam(orderId);
      });
    });


  }
}



// function to export data from datatable
function exportProfileTeamDataTableData() {
  console.log('exportProfileTeamDataTableData called')
}


function removeMemberFromTeam(memberId) {
  console.log('removeMemberFromTeam called', memberId)
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

    const requireData =
      JSON.stringify({
        time: Number(SessionId),
        auth_token: authToken,
      })
    $.ajax({
      url: MAIN_API_PATH + logoutUserSessionAPI,
      method: POST,
      contentType: Content_Type,
      dataType: 'json',
      data: requireData,
      success: function (data, textStatus, xhr) {
        $('#cover-spin').hide()
        $('#create_td').DataTable().clear().draw()
        showNotificationError('bg-green', null, null, null, null, null, DELETE)
        profileSessionDatatable.clear().draw()
        const entriesPerPageChanged = Number($('#datatableEntries1').val())
        getAllSessionDetail(entriesPerPageChanged, 1)
      },
      error: function (xhr, status, error) {
        $('#cover-spin').hide(0)
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
            'bg-red',
            null,
            null,
            null,
            null,
            null,
            notFound404Error
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
          swal({
            title: ' ',
            text: sessionExpired408Error,
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Logout'
          }, function (isConfirm) {
            if (isConfirm) {
              localStorage.clear()
              window.location.href = redirectToSignInPage408
            }
          })
        } else if (xhr.status === 410) {
          $.ajax({
            url: MAIN_API_PATH + getGmtAPI,
            method: POST,
            contentType: Content_Type,
            dataType: 'json',
            success: function (data, textStatus, xhr) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const dateString = String(data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(dateString)
              SecurityKeyTime = false
              deleteSession()
            },
            error: function (xhr, status, error) {
              $.getJSON(worldTimeAPI,
                function (data) {
                  const encrypt = new JSEncrypt()
                  encrypt.setPublicKey(sitePublicKey)
                  const dateString = String(data.unixtime)
                  securityKeyEncrypted = encrypt.encrypt(dateString)
                  SecurityKeyTime = false
                  deleteSession()
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