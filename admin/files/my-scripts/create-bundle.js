if (localStorage.getItem("_ia") !== "true") {
  window.location.href = "signin.html";
}

const tokenAuth = localStorage.getItem("_at");
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, "My Secret Passphrase");
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8);

let serviceManagementDataTableInit;
let searchOject = {};
let serviceManagementDataReceived = "";
let costDetailsInit

let createBundleDataTableInit
let createBundleDataReceived = "";
let createBundleSerachObj = {};

let enrollServicesDataTableInit
let enrollServicesDataReceived = "";
let enrollServicesSerachObj = {};

let checkedServicesToEnrollList = [];
const storedBundle = localStorage.getItem("editBundle");
const submitSelector = "button[form='enrollServicesForm'][type='submit']";

$(document).ready(function () {
  $("#cover-spin").show();

  if (storedBundle) {
    const bundle = JSON.parse(storedBundle);
    $("#createBundleModalLabel").text("Edit Bundle");
    $(submitSelector).prop("disabled", true);
    // Mark as edit
    isEdit = true;
    editingBundleId = bundle.bundle_id;

    // Fill fields
    $("#enrollServicesFormTitle").val(bundle.title);
    $("#enrollServicesFormDescription").val(bundle.description);

    // Preselect services
    selectedServices = bundle.list_of_services || [];
    $("#selectedServiceIds").val(selectedServices.join(","));
  } else {
    $("#createBundleModalLabel").text("Create Bundle");
    $(submitSelector).prop("disabled", false);
  }
    getServiceManagementTableData();

});

// Enable on any change inside the form (delegated so it works for dynamic fields)
  $("#enrollServicesForm").on("input change", "input, textarea, select", function () {
    $(submitSelector).prop("disabled", false);
  });

  // Also enable when user clicks a service card (select/unselect)
  $(document).on("click", ".service-card", function () {
    // only enable if card is not disabled
    if (!$(this).hasClass("disabled-card")) {
      $(submitSelector).prop("disabled", false);
    }
  });

// API URLs
const API_SET_BUNDLE = "/tml/admin/set/bundle";
const API_UPDATE_BUNDLE = "/tml/admin/update/bundle";
const API_LIST_BUNDLE = "/tml/admin/list/bundle";

// Example: services list (you’ll get it via API normally)
let servicesResponse = []; // global

function getServiceManagementTableData() {
  const requirePayloadData = JSON.stringify({
    auth_token: authToken,
    availability: true
  });

  $.ajax({
    url: MAIN_API_PATH + getserviceManagementAPI,
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide();
        servicesResponse = data.message || []; // <-- ensure array
        // renderServices(servicesResponse);     // <-- render here
        renderServices(servicesResponse, selectedServices);
        updateTotalCost();
      },
      204: function () {
        $("#cover-spin").hide();
        $("#serviceManagementDataTableErrorText").text(noDataFoundText204Case);
      }
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
            getServiceManagementTableData();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              getServiceManagementTableData();
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

// Array to store selected service IDs
let selectedServices = [];

function renderServices(services, preSelectedIds = []) {
  const container = $("#servicesContainer");
  container.empty();

  services.forEach(service => {
    const isSelected = preSelectedIds.includes(service.service_id);

    const card = `
      <div class="col-md-4 col-lg-4 mb-4">
        <div class="service-card card h-100 shadow-sm 
            ${isSelected ? 'border-primary shadow-lg' : 'border'}" 
            data-id="${service.service_id}" 
            data-cost="${service.estimated_cost}">
          
          <div class="card-header text-dark fw-bold text-start">
            ${service.title}
          </div>
          <div class="card-body">
            <p class="card-text text-muted">${service.description || 'No description available'}</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            Estimate Cost: 
            <span class="fw-bold text-primary">$${service.estimated_cost}</span>
          </div>
        </div>
      </div>
    `;
    container.append(card);
  });
}

// Service card click handler (multi-select toggle)
function updateTotalCost() {
  let total = 0;
  $(".service-card.border-primary").each(function () {
    total += parseFloat($(this).data("cost"));
  });
  $("#totalCost").text(total);
}

$(document).on("click", ".service-card", function () {
  if ($(this).hasClass("disabled-card")) return;

  const serviceId = $(this).data("id");

  if ($(this).hasClass("border-primary")) {
    // 🔴 Unselect
    $(this).removeClass("border-primary shadow-lg");
    selectedServices = selectedServices.filter(id => id !== serviceId);
  } else {
    // 🟢 Select
    $(this).addClass("border-primary shadow-lg");
    if (!selectedServices.includes(serviceId)) {
      selectedServices.push(serviceId);
    }
  }

  // hidden field update
 $("#selectedServiceIds").val(
  selectedServices.length ? selectedServices.join(",") : ""
);


  // console.log("Selected services:", selectedServices); // 👈 debug

  // validation trigger
  $("#selectedServiceIds").valid();

  // update total cost
  updateTotalCost();
});

// ------------ VALIDATION ------------------

$('#enrollServicesForm').validate({
  ignore: [], // 👈 hidden inputs ko bhi validate karega
  rules: {
    enrollServicesFormTitle: {
      required: true,
      minlength: 3
    },
    selectedServiceIds: {  // 👈 multiple select field
      required: true
    }
  },
  messages: {
    enrollServicesFormTitle: "Title is required.",
    selectedServiceIds: "Please select at least one service."
  },
  errorClass: 'error invalid-feedback',
  highlight: function (element) {
    $(element).addClass('is-invalid');
  },
  unhighlight: function (element) {
    $(element).removeClass('is-invalid');
  },
  errorPlacement: function (error, element) {
    if (element.attr("name") === "selectedServiceIds") {
      error.insertAfter("#servicesContainer"); // 👈 error cards ke niche show hoga
    } else {
      error.insertAfter(element);
    }
  },
  submitHandler: function (form) {
    handleSubmit();
  }
});

// ------------ SUBMIT HANDLER ------------------
let isEdit = false;
let editingBundleId = null;

function handleSubmit() {
      const created_at = Math.floor(Date.now() / 1000);
  const payload = {
    title: $("#enrollServicesFormTitle").val(),
    description: $("#enrollServicesFormDescription").val(),
      auth_token: authToken,
      created_at,
    list_of_services: $("#selectedServiceIds").val() 
                  ? $("#selectedServiceIds").val().split(",") 
                  : []   // 👈 split string back into array
  };

  // console.log("Final Payload:", payload);

  if (!payload.list_of_services || payload.list_of_services.length === 0) {
    return;
  }

  const url = isEdit ? MAIN_API_PATH + API_UPDATE_BUNDLE : MAIN_API_PATH + API_SET_BUNDLE;
  let messageStatus = isEdit ? UPDATE : SAVED;
  if (isEdit) {
    payload.bundle_id = editingBundleId;
  }

  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify(payload),
    contentType: "application/json",
    success: function (res) {
      showNotificationError("bg-green", null, null, null, null, null, messageStatus );
      $("#cover-spin").show();
      window.location.href = "service-managements.html";
      // clear storage after submission
      localStorage.removeItem("editBundle");
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
            handleSubmit();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              handleSubmit();
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


// ------------ LOAD EDIT DATA ------------------

// function loadBundleForEdit(bundleId) {
//   isEdit = true;
//   editingBundleId = bundleId;

//   // 👇 API call to get bundle by ID
//   $.ajax({
//     url: MAIN_API_PATH + API_LIST_BUNDLE,
//     type: "POST",
//     contentType: "application/json",
//     data: JSON.stringify({
//       auth_token: authToken,
//       bundle_id: bundleId
//     }),
//     success: function (res) {
//       const bundleData = res.message; // depends on your API response
//       // clear storage after submission
//       localStorage.removeItem("editBundle");
//       // Pre-fill fields
//       $("#enrollServicesFormTitle").val(bundleData.title);
//       $("#enrollServicesFormDescription").val(bundleData.description);

//       // Pre-fill selected services
//       selectedServices = bundleData.list_of_services || [];
//       $("#selectedServiceIds").val(selectedServices.join(","));

//       // Re-render services with pre-selected
//       renderServices(servicesResponse, selectedServices, false);

//       // Update total cost
//       updateTotalCost();


//     },
//     error: function (xhr, status, error) {
//       $("#cover-spin").hide();
//       if (xhr.status === 400) {
//         showNotificationError(
//           "bg-orange",
//           null,
//           null,
//           null,
//           null,
//           null,
//           invalidRequest400Error
//         );
//       } else if (xhr.status === 401) {
//         showNotificationError(
//           "bg-orange",
//           null,
//           null,
//           null,
//           null,
//           null,
//           unauthorizedRequest401Error
//         );
//       } else if (xhr.status === 404) {
//         showNotificationError(
//           "bg-orange",
//           null,
//           null,
//           null,
//           null,
//           null,
//           notFound404Error
//         );
//       } else if (xhr.status === 409) {
//         showNotificationError(
//           "bg-orange",
//           null,
//           null,
//           null,
//           null,
//           null,
//           alreadyExist409Error
//         );
//       } else if (xhr.status === 503) {
//         showNotificationError(
//           "bg-red",
//           null,
//           null,
//           null,
//           null,
//           null,
//           serverError503Error
//         );
//       } else if (xhr.status === 408) {
//         swal(
//           {
//             title: " ",
//             text: sessionExpired408Error,
//             type: "info",
//             showCancelButton: false,
//             confirmButtonText: "Logout",
//           },
//           function (isConfirm) {
//             if (isConfirm) {
//               localStorage.clear();
//               window.location.href = redirectToSignInPage408;
//             }
//           }
//         );
//       } else if (xhr.status === 410) {
//         $("#cover-spin").hide();

//         $.ajax({
//           url: MAIN_API_PATH + getGmtAPI,
//           method: POST,
//           contentType: Content_Type,
//           dataType: "json",
//           success: function (data, textStatus, xhr) {
//             const encrypt = new JSEncrypt();
//             encrypt.setPublicKey(sitePublicKey);
//             const dateString = String(pageName + data.unixtime);
//             securityKeyEncrypted = encrypt.encrypt(dateString);
//             SecurityKeyTime = false;
//             loadBundleForEdit();
//           },
//           error: function (xhr, status, error) {
//             $.getJSON(worldTimeAPI, function (data) {
//               const encrypt = new JSEncrypt();
//               encrypt.setPublicKey(sitePublicKey);
//               const dateString = String(pageName + data.unixtime);
//               securityKeyEncrypted = encrypt.encrypt(dateString);
//               SecurityKeyTime = false;
//               loadBundleForEdit();
//             });
//           },
//         });
//       } else {
//         showNotificationError(
//           "bg-red",
//           null,
//           null,
//           null,
//           null,
//           null,
//           serverError503Error
//         );
//       }
//     },
//   });
// }

function closeFunction() {
  localStorage.removeItem("editBundle");
  window.history.back();
}

// ------------ INIT CREATE ------------------