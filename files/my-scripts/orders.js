if (localStorage.getItem('_ia') !== 'true') {
  window.location.href = 'signin.html'
}

const tokenAuth = localStorage.getItem('_at')
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, 'My Secret Passphrase')
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8)
let ordersDataTableInit
let searchOject = {}
let ordersDataReceived = ''

let dateTimeFlage = true
let dateTimeEndFlage = true
// Checkbox array
let temproryArray = []
const mainArray = [];
let deletedObjectArr = []

$(document).ready(function () {

  $('#mainContentInnerLoader').addClass('d-none')
  $('#mainContentInnerDataToShow').removeClass('d-none')



  // First Data Table Initialization
  ordersDataTableInit = createTableComponent(dataSourceIPconfig, options)





  //   Intilize flatpickr Date
  issueDateOfCard = flatpickr('#issueDateOfCard', {
    // Configuration options
    enableTime: false,
    dateFormat: 'Y-m-d',
    minDate: 'today',
    onOpen: function (selectedDates, dateStr, instance) {
      if (dateTimeFlage === true) {
        const now = new Date()

        instance.setDate(now)
        $('#dueDateOfCard').val()
        const endDateValue = $('#dueDateOfCard').val()
        $('#dueDateOfCard').prop('disabled', false);
        if (endDateValue) {
          // instance.set('minTime', '00:00')
        }
        dateTimeFlage = false
      }
    },
    onReady: function (selectedDates, dateStr, instance) {
    },
    onChange: function (selectedDates, dateStr, instance) {
    },
    disable: [
      function (date) {
        // return true to disable
        // return (date.getDay() === 0 || date.getDay() === 6)
      }
    ]
  })




  dueDateOfCard = flatpickr('#dueDateOfCard', {
    // Configuration options
    enableTime: false,
    dateFormat: 'Y-m-d',
    minDate: 'today',

    onOpen: function (selectedDates, dateStr, instance) {
      if (dateTimeEndFlage === true) {
        const now = new Date()
        const currentDate = new Date()

        if (currentDate) {

          //   currentDate.setMinutes(now.getMinutes())
          instance.setDate(currentDate)
        } else {
          instance.setDate(now)
        }
        instance.set('minTime', '00:00')
        dateTimeEndFlage = false
      }
    },
    onReady: function (selectedDates, dateStr, instance) {
    },
    onChange: function (selectedDates, dateStr, instance) {
    },
    disable: [
      function (date) {
        // return true to disable
        // return (date.getDay() === 0 || date.getDay() === 6)
      }
    ]
  })



  getOrdersTableData(10, 1)

});



// get span for change
function generateSpan(data, key, customClass = "", style = "") {
  let spanContent = "";

  if (data[key] == "nil" || data[key] == "nill" || data[key] == "" || data[key] == " " || data[key] == null || Array.isArray(data[key].length <= 0)) {
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
  else if (Array.isArray(data[key])) {
    // If the key is an array, join its values with commas and display in a span
    const displayValue = data[key].length > 0 ? data[key].length : "--";

    spanContent = `<span class="${customClass} text-decoration-underline text-primary cursor-pointer" onClick="showServicesDetails('${data['order_id']}')" style="${style}" title="Click to view details.">${displayValue}</span>`;
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
function getOrdersTableData(skip, page) {


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

  const data1 = {
    count: 4,
    message: [
      {
        order_id: "ORD-1001",
        municipality: "Lahore",
        service: "Water Connection",
        date: "2025-09-29",
        payment: "PKR 5,000",
        status: "Pending Kickoff",
        key: "Admin",
        is_integrated: true
      },
      {
        order_id: "ORD-1002",
        municipality: "Karachi",
        service: "Electricity",
        date: "2025-09-25",
        payment: "PKR 3,200",
        status: "Completed",
        key: "Manager",
        is_integrated: false
      },
      {
        order_id: "ORD-1003",
        municipality: "Islamabad",
        service: "Gas Connection",
        date: "2025-09-20",
        payment: "PKR 7,800",
        status: "In Progress",
        key: "Viewer",
        is_integrated: ["Viewer"]
      },
      {
        order_id: "ORD-1004",
        municipality: "Multan",
        service: "Internet Setup",
        date: "2025-09-15",
        payment: "PKR 2,500",
        status: "Cancelled",
        key: "Editor",
        is_integrated: []
      }
    ]
  };


  // Ajax call
  $.ajax({
    url: MAIN_API_PATH + getOrdersAPI,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        // Single dummy data array with roles & orders combined


        const mainArray = [];
        const apiCheckboxArr = [];

        // Hide page loader spinner
        $('#cover-spin').hide();
        hideDataTableLoader200('ordersDataTable');

        response = data.message;
        ordersDataReceived = response;
        localStorage.setItem('ordersDataTableTotal', data.count);

        for (let i = 0; i < response.length; i++) {
          let order_id = generateSpan(response[i], 'order_id', '', '');
          let bundle_name = generateSpan(response[i], 'bundle_name', '', '');
          let service = generateSpan(response[i], 'list_of_services', '', '');
          let payment = generateSpan(response[i], 'payment', '', '');
          let status = generateSpan(response[i], 'status', '', '');

          if (response[i].status === 'Pending Kickoff') {
            status = `
              <div class='d-flex flex-column'>
                ${status}
                <button class="btn btn-sm btn-danger view-order-details p-1 ms-2 px-4" 
                  style='font-size: 10px; width: fit-content' 
                  data-order-id="${response[i].order_id}">
                  Pay Now
                </button>
              </div>`;
          }

          let actions = `
            <button class="btn btn-sm btn-primary view-order-details" data-order-id="${response[i].order_id}">View Details</button>
            <button class="btn btn-sm btn-secondary download-invoice" data-order-id="${response[i].order_id}">Download Invoice</button>
          `;

          const myDate_created = new Date(response[i].created_at * 1000)
          const dt_created = myDate_created
          const created_at = timeFormat(dt_created)

          const myDate_updated = new Date(response[i].updated_at * 1000)
          const dt_updated = myDate_updated
          const updated_at = timeFormat(dt_updated)




          ordersDataTableInit.row
            .add([
              `<td><span>${order_id}</span></td>`,
              `<td><span>${bundle_name}</span></td>`,
              `<td><span>${service}</span></td>`,
              `<td><span>${payment}</span></td>`,
              `<td><span>${status}</span></td>`,
              `<td><span>${created_at}</span></td>`,
              `<td><span>${updated_at}</span></td>`,
              `<td><span>${actions}</span></td>`,
            ])
            .draw();

          datatablePagination('ordersDataTable', 1, 'ordersDataTableTotal', getOrdersTableData);

          // Attach button events
          let viewOrderDetailsButtons = document.querySelectorAll('.view-order-details');
          viewOrderDetailsButtons.forEach(button => {
            button.addEventListener('click', function () {
              let orderId = this.getAttribute('data-order-id');
              showOrderDetails(orderId);
            });
          });
        }
      },
      204: function () {
        $('#cover-spin').hide()
        hideDataTableLoaderError('ordersDataTable')
        if (Object.keys(searchOject).length > 0) {
          $('#ordersDataTableErrorDiv').addClass('d-none')
          $('#ordersDataTable, #ordersDataTableDatatableMainHeading').removeClass('d-none')
        }
        ordersDataTableInit.clear().draw()
        $('#ordersDataTableErrorText').text(noDataFoundText204Case)
      }
    },
    error: function (xhr, status, error) {
      $('#cover-spin').hide()
      hideDataTableLoaderError('ordersDataTable')

      if (xhr.status === 400) {
        $('#ordersDataTableErrorText').text(invalidRequest400Error)
      } else if (xhr.status === 401) {
        $('#ordersDataTableErrorText').text(unauthorizedRequest401Error)
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $('#ordersDataTableErrorText').text(notFound404Error)
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $('#ordersDataTableErrorText').text(serverError503Error)
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
        $('#ordersDataTableErrorText').text(serverError503Error)
      }
    }
  })
}

// Checkbox Code Start
window.getDatatableRowInfo = function (checkboxId, key) {
  const isChecked = $(`#${checkboxId}`).prop("checked");

  if (isChecked) {
    if (!temproryArray.includes(key)) {
      temproryArray.push(key);
    }
    deletedObjectArr = deletedObjectArr.filter(k => k !== key);
  } else {
    temproryArray = temproryArray.filter(k => k !== key);
    if (!deletedObjectArr.includes(key)) {
      deletedObjectArr.push(key);
    }
  }


  // console.log("temproryArray:", temproryArray);
  // console.log("deletedObjectArr:", deletedObjectArr);

  // enableDiableButton();
};

function arraysAreEqual(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  if (arr1.length !== arr2.length) return false;

  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  return sorted1.every((value, index) => value === sorted2[index]);
}

let checkedAll = false;

//  "Select All" checkbox handler
$(document).on("change", "#selectAllServicesList", function () {
  const checked = this.checked;
  checkedAll = checked; // Track the select all status

  mainArray.forEach(key => {
    const checkboxId = `addDefaultPolicyPatter${key}`;
    const checkbox = document.getElementById(checkboxId);

    if (checkbox) {
      checkbox.checked = checked;
    }
  });

  checkAllPolicy(checkedAll); // If needed
});


// Delete Zoom Credentials
function checkAllPolicy(key) {
  state = $('#accountNameAsset').val()
  console.log("State----------", state);
  swal(
    {
      title: "Alert",
      text: "Are you sure you want to proceed with this action?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    },
    function (isConfirm) {
      if (isConfirm) {
        $("#cover-spin").show();
        // Time encryption
        if (SecurityKeyTime === true) {
          const encrypt = new JSEncrypt();
          encrypt.setPublicKey(sitePublicKey);
          const DateNow = Math.floor(new Date() / 1000);

          const dateString = String(pageName + DateNow);
          securityKeyEncrypted = encrypt.encrypt(dateString);
        }
        // Response data
        let requireData

        // If state is false, remove the key
        if (state === "false" || state === false) {
          requireData = JSON.stringify({
            control: localStorage.getItem("control_id"),
            control_of: localStorage.getItem("RC_name"),
            audit_name: localStorage.getItem("adt_nm"),
            all_selected: key,
            auth_token: authToken,
            security_key: securityKeyEncrypted,
            // is_suggested: Boolean(state),
          });
        } else {
          requireData = JSON.stringify({
            control: localStorage.getItem("control_id"),
            control_of: localStorage.getItem("RC_name"),
            audit_name: localStorage.getItem("adt_nm"),
            all_selected: key,
            auth_token: authToken,
            security_key: securityKeyEncrypted,
            is_suggested: Boolean(state),
          });
        }

        // requireData = JSON.stringify(requireData);

        //   Ajax call
        $.ajax({
          // url: MAIN_API_PATH + createPolicyAPI,
          method: POST,
          contentType: Content_Type,
          dataType: "json",
          data: requireData,
          statusCode: {
            200: function (data, textStatus, xhr) {
              $("#cover-spin").hide();
              showNotificationError(
                "bg-green",
                null,
                null,
                null,
                null,
                null,
                UPDATE
              );
              hideDataTableLoader200('ordersDataTable');
              ordersDataTableInit.clear().draw();
              getOrdersTableData(10, 1);
            },
          },
          //   Exception handling case define 400, 401, 404, 409, 503, 408, 410
          error: function (xhr, status, error) {
            $('#cover-spin').hide()
            hideDataTableLoaderError('ordersDataTable');
            ordersDataTableInit.clear().draw();
            getOrdersTableData(10, 1);

            if (xhr.status === 400) {
              showNotificationError(
                "bg-orange",
                null,
                null,
                null,
                null,
                null,
                invalidRequest400Error
              );
            }
            if (xhr.status === 401) {
              showNotificationError(
                "bg-orange",
                null,
                null,
                null,
                null,
                null,
                unauthorizedRequest401Error
              );
            }
            if (xhr.status === 404) {
              showNotificationError(
                "bg-orange",
                null,
                null,
                null,
                null,
                null,
                notFound404Error
              );
            } else if (xhr.status === 503) {
              showNotificationError(
                "bg-red",
                null,
                null,
                null,
                null,
                null,
                serverError503Error
              );
            } else if (xhr.status === 408) {
              swal(
                {
                  title: " ",
                  text: sessionExpired408Error,
                  type: "info",
                  showCancelButton: false,
                  confirmButtonText: "Logout",
                },
                function (isConfirm) {
                  if (isConfirm) {
                    localStorage.clear();
                    window.location.href = redirectToSignInPage408;
                  }
                }
              );
            } else if (xhr.status === 410) {
              $("#pageContentToShow").removeClass("d-none");
              $("#pageErrorsToShow").addClass("d-none");
              $.ajax({
                url: MAIN_API_PATH + getGmtAPI,
                method: POST,
                contentType: Content_Type,
                dataType: "json",
                success: function (data, textStatus, xhr) {
                  const encrypt = new JSEncrypt();
                  encrypt.setPublicKey(sitePublicKey);
                  const dateString = String(data.unixtime);
                  securityKeyEncrypted = encrypt.encrypt(pageName + dateString);
                  SecurityKeyTime = false;
                  getUploadedPolicyDocumentDetails(10, 1);
                },
                error: function (xhr, status, error) {
                  $.getJSON(worldTimeAPI, function (data) {
                    const encrypt = new JSEncrypt();
                    encrypt.setPublicKey(sitePublicKey);
                    const dateString = String(data.unixtime);
                    securityKeyEncrypted = encrypt.encrypt(pageName + dateString);
                    SecurityKeyTime = false;
                    getUploadedPolicyDocumentDetails(10, 1);
                  });
                },
              });
            } else {
              showNotificationError(
                "bg-red",
                null,
                null,
                null,
                null,
                null,
                serverError503Error
              );
            }
          },
        });
      } else {
        $('#cover-spin').hide()
        hideDataTableLoaderError('ordersDataTable');
        ordersDataTableInit.clear().draw();
        getOrdersTableData(10, 1);
      }
    }
  );
}

// Checkbox Code End



// function to export data from datatable
function exportOrdersDataTableData() {
  console.log('exportOrdersDataTableData called')
}



// ================= Show services Details Button Click Event =================
let servicesListToSendForApi = [];
function showServicesDetails(orderId) {

  let order = ordersDataReceived.find(o => o.order_id === orderId);
  servicesListToSendForApi = order.list_of_services;
  getServicesList()
}




function getServicesList() {

  $('#cover-spin').show()


  const apiBody = JSON.stringify({
    auth_token: authToken,
    search: { list_of_services: servicesListToSendForApi },
  });

  // return 0
  $.ajax({
    url: MAIN_API_PATH + getserviceManagementAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);

        const serviceData = data.message; // replace with your actual API array
        // Render only the clicked one OR all
        const selectedService = serviceData.filter(s => s.service_id);
        renderSidebarServices(selectedService);

        // Show sidebar
        const offcanvas = new bootstrap.Offcanvas("#strategyOffcanvas");
        offcanvas.show();


      },
      204: function () {
        $("#cover-spin").hide(0);
        showNotificationError(
          "bg-orange",
          null,
          null,
          null,
          null,
          null,
          alreadyExist409Error
        );
      },
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      if (xhr.status === 400) {
        showNotificationError(
          "bg-orange",
          null,
          null,
          null,
          null,
          null,
          invalidRequest400Error
        );
      } else if (xhr.status === 401) {
        showNotificationError(
          "bg-orange",
          null,
          null,
          null,
          null,
          null,
          unauthorizedRequest401Error
        );
      } else if (xhr.status === 404) {
        showNotificationError(
          "bg-orange",
          null,
          null,
          null,
          null,
          null,
          notFound404Error
        );
      } else if (xhr.status === 409) {
        showNotificationError(
          "bg-orange",
          null,
          null,
          null,
          null,
          null,
          alreadyExist409Error
        );
      } else if (xhr.status === 503) {
        showNotificationError(
          "bg-red",
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        );
      } else if (xhr.status === 408) {
        swal(
          {
            title: " ",
            text: sessionExpired408Error,
            type: "info",
            showCancelButton: false,
            confirmButtonText: "Logout",
          },
          function (isConfirm) {
            if (isConfirm) {
              localStorage.clear();
              window.location.href = redirectToSignInPage408;
            }
          }
        );
      } else if (xhr.status === 410) {
        $("#cover-spin").hide();

        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: "json",
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(sitePublicKey);
            const dateString = String(pageName + data.unixtime);
            securityKeyEncrypted = encrypt.encrypt(dateString);
            SecurityKeyTime = false;
            getServicesList();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              getServicesList();
            });
          },
        });
      } else {
        showNotificationError(
          "bg-red",
          null,
          null,
          null,
          null,
          null,
          serverError503Error
        );
      }
    },
  });
}


// ================= end services Details Button Click Event =================


function showOrderDetails(orderId) {

  let order = ordersDataReceived.find(o => o.order_id === orderId);


  $('#orderDetailsOrderId').text(`#${order.order_id}`);
  $('#orderDetailsService').text(order.service);
  $('#orderDetailsOrderDate').text(order.date);
  $('#orderDetailsOrderStatus').text(order.payment);



  $('#orderDetailsContainer').removeClass('d-none');
  $("html, body").animate(
    { scrollTop: $("#orderDetailsContainer").offset().top },
    600 // duration in ms (600ms = smooth speed)
  );

}


// Render services in right sidebar
function renderSidebarServices(services, preSelectedIds = []) {
  const container = $("#strategyOffcanvasBody");
  container.empty(); // clear old content

  if (!services || services.length === 0) {
    container.html(`<div class="text-center text-muted">No services available</div>`);
    return;
  }

  services.forEach(service => {
    const isSelected = preSelectedIds.includes(service.service_id);

    const card = `
      <div class="service-card card mb-3 shadow-sm
          ${isSelected ? 'border-primary shadow-lg' : 'border'}" 
          data-id="${service.service_id}" 
          data-cost="${service.estimated_cost}">
        
        <div class="card-header fw-bold">${service.title}</div>
        <div class="card-body">
          <p class="card-text">${service.description || 'No description available'}</p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          Estimate Cost:
          <span class="fw-bold text-primary">$${service.estimated_cost} ${service.cost_unit}</span>
        </div>
      </div>
    `;
    container.append(card);
  });
}


// ================= Create Order Button Click Event =================
$(document).on("click", "#createOrderBtn", function () {
  window.location.href = "/create-order.html";
});
// ================= END: Create Order Button Click Event =================