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


$(document).ready(function () {
  // Show main content and hide loader

  $("#mainContentInnerLoader").addClass("d-none");
  $("#mainContentInnerDataToShow").removeClass("d-none");
});

// ------------ INIT ------------------

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
        renderServices(servicesResponse);     // <-- render here
      },
      204: function () {
        $("#cover-spin").hide();
        $("#serviceManagementDataTableErrorText").text(noDataFoundText204Case);
      }
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      console.error("Service API error:", xhr.status, error);
    }
  });
}

// Call this on page load
getServiceManagementTableData();



// Array to store selected service IDs
let selectedServices = [];

// Render dynamic service cards
function renderServices(services, preSelectedIds = [], disableSelected = false) {
  const container = $("#servicesContainer");
  container.empty();

  services.forEach(service => {
    const isDisabled = disableSelected && preSelectedIds.includes(service.service_id);
    const isSelected = preSelectedIds.includes(service.service_id) || selectedServices.includes(service.service_id);

    // cost_type ko readable format mai convert karo
    const formattedType = service.cost_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // badge color customize
    let badgeColor = "bg-secondary"; // default
    if (service.cost_type === "per_entity") badgeColor = "bg-info";
    else if (service.cost_type === "of_module") badgeColor = "bg-success";
    else badgeColor = "bg-warning";

    const card = `
      <div class="col-md-4 col-lg-4 mb-4">
        <div class="service-card card h-100 shadow-sm 
            ${isDisabled ? 'disabled-card bg-light border-secondary' : 'border'} 
            ${isSelected ? 'border-primary shadow-lg' : ''}" 
            data-id="${service.service_id}" 
            data-cost="${service.estimated_cost}" 
            data-type="${service.cost_type}"
            style="cursor: ${isDisabled ? 'not-allowed' : 'pointer'};">
          
          <!-- Card Header -->
          <div class="card-header text-dark fw-bold text-start">
            ${service.title}
          </div>

          <!-- Card Body -->
          <div class="card-body">
            <p class="card-text text-muted" style="font-size: 14px; line-height: 1.4;">
              ${service.description || 'No description available'}
            </p>
          </div>

          <!-- Card Footer -->
          <div class="card-footer d-flex justify-content-between align-items-center">
          Estimate Cost:
            <span class="fw-bold text-primary" style="font-size: 22px;">
              $${service.estimated_cost}
            </span>/ ${formattedType}
            
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


  console.log("Selected services:", selectedServices); // 👈 debug

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
    enrollServicesFormTitle: "Title is required",
    selectedServiceIds: "Please select at least one service"
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

  console.log("Final Payload:", payload);

  if (!payload.list_of_services || payload.list_of_services.length === 0) {
    alert("Please select at least one service");
    return;
  }

  const url = isEdit ? MAIN_API_PATH + API_UPDATE_BUNDLE : MAIN_API_PATH + API_SET_BUNDLE;

  if (isEdit) {
    payload.bundle_id = editingBundleId;
  }

  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify(payload),
    contentType: "application/json",
    success: function (res) {
      alert("Bundle saved successfully!");
    },
    error: function (err) {
      console.error(err);
      alert("Error saving bundle");
    }
  });
}


// ------------ LOAD EDIT DATA ------------------

function loadBundleForEdit(bundleId) {
  isEdit = true;
  editingBundleId = bundleId;

  $.get(`${API_LIST_BUNDLE}?id=${bundleId}`, function (bundleData) {
    $("#enrollServicesFormTitle").val(bundleData.title);
    $("#enrollServicesFormDescription").val(bundleData.description);

    renderServices(servicesResponse.message, bundleData.selectedServices, true);

    if (bundleData.selectedServices.length > 0) {
      $("#selectedServiceId").val(bundleData.selectedServices[0]);
    }
  });
}

// ------------ INIT CREATE ------------------

// renderServices(servicesResponse.message);

// Example for edit usage
// loadBundleForEdit("bundle_123");
