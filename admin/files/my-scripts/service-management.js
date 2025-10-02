if (localStorage.getItem("_ia") !== "true") {
  window.location.href = "signin.html";
}

const tokenAuth = localStorage.getItem("_at");
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, "My Secret Passphrase");
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8);

let serviceManagementDataTableInit;
let searchOject = {};
let serviceManagementDataReceived = "";
let costDetailsInit;

let createBundleDataTableInit;
let createBundleDataReceived = "";
let createBundleSerachObj = {};

let enrollServicesDataTableInit;
let enrollServicesDataReceived = "";
let enrollServicesSerachObj = {};

let addFilesDataTableInit;
let addFilesDataReceived = "";
let addFilesSerachObj = {};

let checkedServicesToEnrollList = [];

$(document).ready(function () {
  // Show main content and hide loader

  $("#mainContentInnerLoader").addClass("d-none");
  $("#mainContentInnerDataToShow").removeClass("d-none");

  $("#enrollServicesForm").validate({
    debug: true,
    rules: {
      enrollServicesFormTitle: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      // enrollServicesFormDescription: {
      //   required: false // optional
      // }
    },
    messages: {
      title: "Title is required",
      estimated_cost: "Estimated cost is required and must be a number",
      cost_type: "Cost type is required",
      cost_unit: "Cost unit is required",
      availability: "Availability must be selected",
    },
    errorClass: "error invalid-feedback",
    validClass: "success",
    errorElement: "span",
    highlight: function (element, errorClass, validClass) {
      $(element)
        .parents("div.control-group")
        .addClass(errorClass)
        .removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents(".error").removeClass(errorClass).addClass(validClass);
    },
    // the errorPlacement has to take the table layout into account
    errorPlacement: function (error, element) {
      if (element.attr("name") === "cost_type") {
        error.appendTo(element.parent().parent().parent().parent().parent());
      } else {
        error.appendTo(element.parent());
      }
    },
  });

    $("#serviceManagementForm").validate({
    debug: true,
    rules: {
      title: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
        required: true
      },
      cost_type: {
        required: true // optional
      }
    },
    messages: {
      title: {
        required: "Title is required.",
      },
      estimated_cost: "Estimated cost is required and must be a number.",
      cost_type: "Cost type is required.",
      // cost_unit: "Cost unit is required.",  
      // availability: "Availability must be selected.",
    },
    errorClass: "error invalid-feedback",
    validClass: "success",
    errorElement: "span",
    highlight: function (element, errorClass, validClass) {
      $(element)
        .parents("div.control-group")
        .addClass(errorClass)
        .removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents(".error").removeClass(errorClass).addClass(validClass);
    },
    // the errorPlacement has to take the table layout into account
    errorPlacement: function (error, element) {
      // if (element.attr("name") === "cost_type") {
      //   error.appendTo(element.parent().parent().parent().parent().parent());
      // } else {
        error.appendTo(element.parent());
      // }
    },
  });


  // costDetailsInit
  costDetailsInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
    "cost_type",
    true
  );
  // FileType
  fileTypeInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
    "fileType",
    true
  );
  // First Data Table Initialization
  serviceManagementDataTableInit = createTableComponent(
    dataSourceIPconfig,
    options
  );

  // create Bundle Data Table Initialization
  createBundleDataTableInit = createTableComponent(
    createBundleDataTable,
    options1
  );

  // enroll services Data Table Initialization
  enrollServicesDataTableInit = createTableComponent(
    enrolServicesCreatBundleDataTable,
    options1
  );

  // File Data Table Initialization
  // addFilesDataTableInit = createTableComponent(addFilesDataTableShow, options4);

  // getMuncipilityDetails()

  getServiceManagementTableData(10, 1);
  // getaddFilesTableData(10, 1);
  getCreateBundleTableData(10, 1);
  // SERVICE MANAGEMNT
  // Validation rules define
  $("#yourFormId").validate({
    debug: true,
    rules: {
      title: {
        required: true,
      },
      description: {
        required: false, // optional
      },
      estimated_cost: {
        required: true,
        number: true,
      },
      cost_type: {
        required: true,
      },
      cost_unit: {
        required: true,
      },
      availability: {
        required: true,
      },
    },
    messages: {
      title: "Title is required",
      estimated_cost: "Estimated cost is required and must be a number",
      cost_type: "Cost type is required",
      cost_unit: "Cost unit is required",
      availability: "Availability must be selected",
    },
    errorClass: "error invalid-feedback",
    validClass: "success",
    errorElement: "span",
    highlight: function (element, errorClass, validClass) {
      $(element)
        .parents("div.control-group")
        .addClass(errorClass)
        .removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents(".error").removeClass(errorClass).addClass(validClass);
    },
    // the errorPlacement has to take the table layout into account
    errorPlacement: function (error, element) {
      if (element.attr("name") === "cost_type") {
        error.appendTo(element.parent().parent().parent().parent().parent());
      } else {
        error.appendTo(element.parent());
      }
    },
  });
});

// get span for change
function generateSpan(data, key, customClass = "", style = "") {
  let sepecficKeys = ["cost_type"];

  let keyValue = {
    per_entity: "Per Entity",
    per_unit: "Per Unit",
  };

  let spanContent = "";

  if (
    data[key] == "nil" ||
    data[key] == "nill" ||
    data[key] == "" ||
    data[key] == " " ||
    data[key] == null
  ) {
    spanContent = `<span class="${customClass}">--</span>`;
  } else if (
    data[key] == "true" ||
    data[key] == true ||
    data[key] == "false" ||
    data[key] == false
  ) {
    // If the key is an array, join its values with commas and display in a span
    const displayValue =
      data[key] == true || data[key] == "true" ? "True" : "False";
    spanContent = `<span class="${customClass}" style="${style}" title="${displayValue}">${displayValue}</span>`;
  } else if (isNumber(data[key])) {
    // If the key is an array, join its values with commas and display in a span
    const displayValue = data[key].toFixed(2);
    spanContent = `<span class="${customClass}" style="${style}" title="${displayValue}">${displayValue}</span>`;
  } else if (sepecficKeys.includes(key)) {
    // If the key is a simple value
    const displayValue = keyValue[data[key]] || data[key];
    const title = displayValue;
    spanContent = `<span class="${customClass}" style="${style}" title="${title}">${displayValue}</span>`;
  } else {
    // If the key is a simple value
    const displayValue = data[key];
    const title = displayValue;
    spanContent = `<span class="${customClass}" style="${style}" title="${title}">${displayValue}</span>`;
  }

  return spanContent;
}

function searchObjectCreation(search) {
  searchOject = search;
}

// Main API Call function for datatable
function getServiceManagementTableData(skip, page) {
  let data = [
    {
      order_id: "ORD12345",
      municipality: "Springfield",
      service: "Cloud Hosting",
      date: "2024-01-15",
      payment: "Paid",
      status: "In Provisioning",
    },
    {
      order_id: "ORDdf5",
      municipality: "Springfield",
      service: "Cloud Hosting",
      date: "2024-01-13",
      payment: "Pending",
      status: "Pending Kickoff",
    },
  ];

  let requirePayloadData;
  if (Object.keys(searchOject).length > 0) {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      search: searchOject,
    });
  } else {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
    });
  }

  // Ajax call
  $.ajax({
    url: MAIN_API_PATH + getserviceManagementAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        // Hide page laoder Spiner
        $("#cover-spin").hide();

        hideDataTableLoader200("serviceManagementDataTable");

        let apiData = data.message; // or data.message if your API uses 'message'
        serviceManagementDataReceived = apiData;

        // Save correct length
        localStorage.setItem("serviceManagementDataTableTotal", data.count);

        // Loop through response to add data in datatable
        for (let i = 0; i < apiData.length; i++) {
          const item = apiData[i];

          const service_id = item.service_id || "--";
          const title = item.title || "--";
          const description = item.description || "--";
          const estimated_cost = item.estimated_cost != null ? Number(item.estimated_cost).toLocaleString() : "--";
          const cost_type = item.cost_type || "--";
          const cost_unit = item.cost_unit || "--";
        const availability =
  item.availability != null
    ? `<div class="form-check form-switch">
         <input class="form-check-input availability-toggle"
                type="checkbox"
                data-id="${item.service_id}"
                ${item.availability ? "checked" : ""}>
       </div>`
    : "--";


          // Action buttons
          const actions = `
    <button class="btn btn-sm btn-outline-primary edit-service" data-service-id="${service_id}">Edit</button>
    <button class="btn btn-sm btn-outline-danger delete-service" data-service-id="${service_id}">Delete</button>
  `;

          serviceManagementDataTableInit.row
            .add([
              `<td>${title}</td>`,
              `<td><span style="
        display: inline-block;
        max-width: 200px;  /* width fix */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    " title="${description}">${description}</span></td>`,
              `<td>${estimated_cost}</td>`,
              `<td>${cost_type
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}</td>`,
              // `<td>${cost_unit}</td>`,
              `<td>${availability}</td>`,
              `<td>${actions}</td>`,
            ])
            .draw();

          datatablePagination(
            "serviceManagementDataTable",
            1,
            "serviceManagementDataTableTotal",
            getServiceManagementTableData
          );
        }
        // Attach click events after table is rendered
        attachServiceManagementActions();
      },
      204: function () {
        $("#cover-spin").hide();
        hideDataTableLoaderError("serviceManagementDataTable");
        if (Object.keys(searchOject).length > 0) {
          $("#serviceManagementDataTableErrorDiv").addClass("d-none");
          $(
            "#serviceManagementDataTable, #serviceManagementDataTableDatatableMainHeading"
          ).removeClass("d-none");
        }
        serviceManagementDataTableInit.clear().draw();
        $("#serviceManagementDataTableErrorText").text(noDataFoundText204Case);
      },
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      hideDataTableLoaderError("serviceManagementDataTable");

      if (xhr.status === 400) {
        $("#serviceManagementDataTableErrorText").text(invalidRequest400Error);
      } else if (xhr.status === 401) {
        $("#serviceManagementDataTableErrorText").text(
          unauthorizedRequest401Error
        );
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(notFound404Error);
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(serverError503Error);
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
        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: "json",
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(sitePublicKey);
            const currentDateString = String(data.unixtime);
            securityKeyEncrypted = encrypt.encrypt(
              pageName + currentDateString
            );
            SecurityKeyTime = false;
            getServiceManagementTableData(skip, page, search);
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const currentDateString = String(data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(
                pageName + currentDateString
              );
              SecurityKeyTime = false;
              getServiceManagementTableData(skip, page, search);
            });
          },
        });
      } else {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(serverError503Error);
      }
    },
  });
}

// function to export data from datatable
function exportServiceManagementDataTableData() {
  console.log("exportServiceManagementDataTableData called");
}
// Availability Toogle
$(document).on("change", ".availability-toggle", function () {
  var checkbox = $(this);
  var previousState = !checkbox.prop("checked"); // previous state

  var serviceId = checkbox.data("id");
  var url = "";
  let payload;
  let tableType = ""; // to decide later which datatable to reload

  if (serviceId.startsWith("svc_")) {
    // For svc_
    url = "/tml/admin/service/available/false";
    tableType = "service";
    payload = JSON.stringify({
      auth_token: authToken,
      service_id: serviceId,
      availability: checkbox.prop("checked"),
    });
  } else if (serviceId.startsWith("bdl_")) {
    // For bdl_
    url = "/tml/admin/bundle/available/false";
    tableType = "bundle";
    payload = JSON.stringify({
      auth_token: authToken,
      bundle_id: serviceId,
      availability: checkbox.prop("checked"),
    });
  }

  swal(
    {
      title: "Are you sure?",
      text: "Do you want to change availability?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    },
    function (isConfirm) {
      if (isConfirm) {
        // User clicked Yes -> API call
        $.ajax({
          url: MAIN_API_PATH + url,
          method: "POST",
          data: payload,
          contentType: "application/json",
          dataType: "json",
          success: function (response) {
            showNotificationError("bg-green", null, null, null, null, null, UPDATE);
            $("#cover-spin").show();

            // Loader + DataTable refresh according to type
            if (tableType === "service") {
              showDataTableLoader("serviceManagementDataTable");
              serviceManagementDataTableInit.clear().draw();
              getServiceManagementTableData(10, 1);
            } else if (tableType === "bundle") {
              showDataTableLoader("createBundleDataTable");
              createBundleDataTableInit.clear().draw();
              getCreateBundleTableData(10, 1);
            }
          },
          error: function () {
            swal("Error!", "Something went wrong.", "error");
            checkbox.prop("checked", previousState); // revert on error
          },
        });
      } else {
        // User clicked Cancel -> revert toggle
        checkbox.prop("checked", previousState);
      }
    }
  );
});


// End Availability

// href click to open modal
$(document).on("click", "#clickToOpenModal", function () {
  $("#companyDetailsFormModal").modal("show");
});

// ********************** start set/Edit municpilities detsils *********************************

// validation Form Finish Btn
// $("#serviceManagementSubmit").on("click", function (e) {
//   e.preventDefault();
//   if ($("#serviceManagementForm").validate().form()) {
//     setMuncipilitiesData();
//   }
// });
// Single submit handler for add/update
$("#serviceManagementSubmit").on("click", function (e) {
  e.preventDefault();

  // Validate form
  if (!$("#serviceManagementForm").valid()) return;

  // Get modal values

  // Check if editing (service-id exists)
  const serviceId = $("#serviceManagementDetailsModal").data("service-id");

  if (serviceId) {
    const title = $("#title").val();
    const description = $("#description").val();
    const estimated_cost = parseFloat($("#estimated_cost").val()) || 0;
    const cost_type = $("#cost_type").val();
    // const cost_unit = $("#cost_unit").val();
    // const availability = $("#availability").prop("checked");

    // Prepare payload
    const payload = {
      auth_token: authToken,
      title,
      description,
      estimated_cost,
      cost_type,
      cost_unit: 'USD',
      availability: true,
      service_id: serviceId,
      timestamp: Math.floor(Date.now() / 1000),
    };

    // Update service
    $.ajax({
      url: MAIN_API_PATH + editserviceManagementAPI,
      method: POST,
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (res) {
        $("#serviceManagementDetailsModal").modal("hide");

        showNotificationError("bg-green", null, null, null, null, null, UPDATE);

        teamMembersAPIResponse = [];
        showDataTableLoader("profileTeamDataTable");

        serviceManagementDataTableInit.clear().draw();
        let pageEntries = Number($("#datatableEntries1").val());
        getServiceManagementTableData(pageEntries, 1);
      },
    });
  } else {
    // Add new service
    setMuncipilitiesData();
  }
});

function setMuncipilitiesData() {
  // Current epoch time in **seconds**
  const created_at = Math.floor(Date.now() / 1000);
  // Get values from modal
  const title = $("#title").val();
  const description = $("#description").val(); // optional
  const estimated_cost = parseFloat($("#estimated_cost").val()) || 0;
  const cost_type = $("#cost_type").val();
  // const cost_unit = $("#cost_unit").val();
  // const availability = $("#availability").prop("checked"); // true/false

  // Prepare payload
  const payload = JSON.stringify({
    auth_token: authToken,
    title,
    description,
    estimated_cost,
    cost_type,
    cost_unit: 'USD',
    availability: true,
    created_at,
  });

  console.log("Modal form payload:", payload);

  // return 0
  $.ajax({
    url: MAIN_API_PATH + TMLAdminServiceAdd,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: payload,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);
        $("#serviceManagementDetailsModal").modal("hide");

        showNotificationError("bg-green", null, null, null, null, null, UPDATE);

        teamMembersAPIResponse = [];
        showDataTableLoader("profileTeamDataTable");

        serviceManagementDataTableInit.clear().draw();
        let pageEntries = Number($("#datatableEntries1").val());
        getServiceManagementTableData(pageEntries, 1);
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
            setMuncipilitiesData();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              setMuncipilitiesData();
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

// ********************** end set/Edit municpilities detsils *********************************
// ********************** Start Edit municpilities Value *********************************
function attachServiceManagementActions() {
  document.querySelectorAll(".edit-service").forEach((btn) => {
    btn.addEventListener("click", function () {
      const serviceId = this.dataset.serviceId;
      const serviceData = serviceManagementDataReceived.find(
        (s) => s.service_id === serviceId
      );
      if (!serviceData) return;

      // Prefill modal inputs
      $("#title").val(serviceData.title);
      $("#description").val(serviceData.description);
      $("#estimated_cost").val(serviceData.estimated_cost);
      costDetailsInit.setValue(serviceData.cost_type);
      // $("#cost_unit").val(serviceData.cost_unit);
      // $("#availability").prop("checked", serviceData.availability);

      // Store original values for comparison
      const originalValues = {
        title: serviceData.title,
        description: serviceData.description,
        estimated_cost: serviceData.estimated_cost,
        cost_type: serviceData.cost_type,
        // cost_unit: serviceData.cost_unit,
        // availability: serviceData.availability,
        cost_unit: 'USD',
        availability: true,
      };
      $("#serviceManagementDetailsModal").data(
        "original-values",
        originalValues
      );

      // Store service_id in modal for update
      $("#serviceManagementDetailsModal").data("service-id", serviceId);

      // Open modal
      $("#serviceManagementDetailsModal").modal("show");

      // Disable submit button initially
      $("#serviceManagementSubmit").prop("disabled", true);
    });
  });

  document.querySelectorAll(".delete-service").forEach((btn) => {
    btn.addEventListener("click", function () {
      const serviceId = this.dataset.serviceId;
      swal(
        {
          title: "Deleting Record",
          text: "Are you sure you want to delete?",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        },
        function () {
          $("#cover-spin").show();

          const apiBody = JSON.stringify({
            auth_token: authToken,
            service_id: serviceId,
          });
          // return 0
          $.ajax({
            url: MAIN_API_PATH + deleteserviceManagementAPI,
            method: POST,
            contentType: Content_Type,
            dataType: "json",
            data: apiBody,
            statusCode: {
              200: function (data) {
                $("#cover-spin").hide(0);

                showNotificationError(
                  "bg-green",
                  null,
                  null,
                  null,
                  null,
                  null,
                  DELETE
                );

                teamMembersAPIResponse = [];
                showDataTableLoader("profileTeamDataTable");

                serviceManagementDataTableInit.clear().draw();
                let pageEntries = Number($("#datatableEntries1").val());
                getServiceManagementTableData(pageEntries, 1);
              },
              204: function () {
                $("#cover-spin").hide(0);
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
                    editPolicyAndSessions();
                  },
                  error: function (xhr, status, error) {
                    $.getJSON(worldTimeAPI, function (data) {
                      const encrypt = new JSEncrypt();
                      encrypt.setPublicKey(sitePublicKey);
                      const dateString = String(pageName + data.unixtime);
                      securityKeyEncrypted = encrypt.encrypt(dateString);
                      SecurityKeyTime = false;
                      editPolicyAndSessions();
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
      );
    });
  });
}

$(
  "#serviceManagementDetailsModal input, #serviceManagementDetailsModal select, #serviceManagementDetailsModal textarea"
).on("input change", function () {
  const original = $("#serviceManagementDetailsModal").data("original-values");
  const serviceId = $("#serviceManagementDetailsModal").data("service-id");

  // If no serviceId, it's add mode → enable button
  if (!serviceId) {
    $("#serviceManagementSubmit").prop("disabled", false);
    return;
  }

  // Compare current values with original
  const currentValues = {
    title: $("#title").val(),
    description: $("#description").val(),
    estimated_cost: parseFloat($("#estimated_cost").val()) || 0,
    cost_type: $("#cost_type").val(),
    cost_unit: $("#cost_unit").val(),
    availability: $("#availability").prop("checked"),
  };

  const changed = Object.keys(currentValues).some(
    (key) => currentValues[key] !== original[key]
  );

  // Enable submit only if some value changed
  $("#serviceManagementSubmit").prop("disabled", !changed);
});

// ********************** end Edit municpilities Value *********************************

// Reset modal inputs when it is closed
$("#serviceManagementDetailsModal").on("hidden.bs.modal", function () {
  // Clear all input/select/textarea
  $(this).find('input[type="text"], input[type="number"], textarea').val("");

  // Reset select dropdowns
  $(this).find("select").val("").trigger("change");
  costDetailsInit.setValue("");
  // Reset checkbox
  $(this).find('input[type="checkbox"]').prop("checked", false);

  // Remove any stored service ID
  $(this).removeData("service-id");

  $(".error").html("");
});

// ********************** Start Upload Service *********************************

// ********************** End Upload Service *********************************

// Handle type change

// function updateFields() {
//   var type = $("#fileType").val();
//   if (type === "file") {
//     $("#fileUploadWrapper").show();
//     $("#sourceWrapper").hide();
//   } else {
//     $("#fileUploadWrapper").hide();
//     $("#sourceWrapper").show();
//     $("#fileSource").val(""); // clear previous value
//     $("#fileSource").attr(
//       "placeholder",
//       type === "url" ? "Enter URL" : "Enter Text"
//     );
//   }
// }

// $("#fileType").on("change", updateFields);
// updateFields(); // initialize

// Submit form
// $("#submitFileBtn").on("click", function () {
//   var title = $("#fileTitle").val().trim();
//   var description = $("#fileDescription").val().trim();
//   var type = $("#fileType").val();
//   var source = $("#fileSource").val().trim();
//   var fileInputEl = document.getElementById("fileInput");
//   var file =
//     fileInputEl && fileInputEl.files.length ? fileInputEl.files[0] : null;

//   if (!title) {
//     alert("Title is required");
//     return;
//   }

//   var formData = new FormData();
//   formData.append("title", title);
//   formData.append("description", description);
//   formData.append("type", type);

//   formData.append("created_at", Math.floor(Date.now() / 1000));
//   formData.append("auth_token", authToken);

//   if (type === "file") {
//     if (!file) {
//       alert("Please select a file");
//       return;
//     }
//     formData.append("file", file, file.name);
//     formData.append("source", "");
//   } else {
//     if (!source) {
//       alert("Please enter source");
//       return;
//     }
//     formData.append("source", source);
//   }

//   // AJAX request
//   $.ajax({
//     url: MAIN_API_PATH + adminDocumentsAdd, // replace with your API
//     method: "POST",
//     data: formData,
//     processData: false,
//     contentType: false,
//     success: function (response) {
//       console.log("Upload success:", response);
//       alert("File added successfully!");
//       var modalEl = document.getElementById("addFileModal");
//       var modal = bootstrap.Modal.getInstance(modalEl);
//       modal.hide(); // close modal
//       $("#addFileForm")[0].reset(); // reset form
//       updateFields(); // reset fields visibility
//     },
//     error: function (err) {
//       console.error("Upload error:", err);
//       alert("Error uploading file!");
//     },
//   });
// });

// Main API Call function for datatable
// function getServiceManagementFilesTableData(skip, page) {

//   let requirePayloadData;
//   if (Object.keys(searchOject).length > 0) {
//     requirePayloadData = JSON.stringify({
//       auth_token: authToken,
//       skip: Number(skip),
//       page,
//       search: searchOject,
//     });
//   } else {
//     requirePayloadData = JSON.stringify({
//       auth_token: authToken,
//       skip: Number(skip),
//       page,
//     });
//   }

//   // Ajax call
//   $.ajax({
//     url: MAIN_API_PATH + adminDocumentsView,
//     method: POST,
//     contentType: Content_Type,
//     dataType: "json",
//     data: requirePayloadData,
//     statusCode: {
//       200: function (data) {
//         // Hide page laoder Spiner
//         $("#cover-spin").hide();

//       },
//       204: function () {
//         $("#cover-spin").hide();
//         hideDataTableLoaderError("serviceManagementDataTable");
//         if (Object.keys(searchOject).length > 0) {
//           $("#serviceManagementDataTableErrorDiv").addClass("d-none");
//           $(
//             "#serviceManagementDataTable, #serviceManagementDataTableDatatableMainHeading"
//           ).removeClass("d-none");
//         }
//         serviceManagementDataTableInit.clear().draw();
//         $("#serviceManagementDataTableErrorText").text(noDataFoundText204Case);
//       },
//     },
//     error: function (xhr, status, error) {
//       $("#cover-spin").hide();
//       hideDataTableLoaderError("serviceManagementDataTable");

//       if (xhr.status === 400) {
//         $("#serviceManagementDataTableErrorText").text(invalidRequest400Error);
//       } else if (xhr.status === 401) {
//         $("#serviceManagementDataTableErrorText").text(unauthorizedRequest401Error);
//       } else if (xhr.status === 404) {
//         // $('#cover-spin').hide(0);
//         $("#serviceManagementDataTableErrorText").text(notFound404Error);
//       } else if (xhr.status === 503) {
//         // $('#cover-spin').hide(0);
//         $("#serviceManagementDataTableErrorText").text(serverError503Error);
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
//         $.ajax({
//           url: MAIN_API_PATH + getGmtAPI,
//           method: POST,
//           contentType: Content_Type,
//           dataType: "json",
//           success: function (data, textStatus, xhr) {
//             const encrypt = new JSEncrypt();
//             encrypt.setPublicKey(sitePublicKey);
//             const currentDateString = String(data.unixtime);
//             securityKeyEncrypted = encrypt.encrypt(
//               pageName + currentDateString
//             );
//             SecurityKeyTime = false;
//             getServiceManagementTableData(skip, page, search);
//           },
//           error: function (xhr, status, error) {
//             $.getJSON(worldTimeAPI, function (data) {
//               const encrypt = new JSEncrypt();
//               encrypt.setPublicKey(sitePublicKey);
//               const currentDateString = String(data.unixtime);
//               securityKeyEncrypted = encrypt.encrypt(
//                 pageName + currentDateString
//               );
//               SecurityKeyTime = false;
//               getServiceManagementTableData(skip, page, search);
//             });
//           },
//         });
//       } else {
//         // $('#cover-spin').hide(0);
//         $("#serviceManagementDataTableErrorText").text(serverError503Error);
//       }
//     },
//   });
// }

// start create Bundle Data Table Initialization

function addFilesSearchObjectCreation(search) {
  addFilesSerachObj = search;
}

// Main API Call function for datatable
// function getaddFilesTableData(skip, page) {
//   let data = [
//     {
//       order_id: "ORD12345",
//       municipality: "Springfield",
//       service: "Cloud Hosting",
//       date: "2024-01-15",
//       payment: "Paid",
//       status: "In Provisioning",
//     },
//     {
//       order_id: "ORDdf5",
//       municipality: "Springfield",
//       service: "Cloud Hosting",
//       date: "2024-01-13",
//       payment: "Pending",
//       status: "Pending Kickoff",
//     },
//   ];

//   let requirePayloadData;
//   if (Object.keys(addFilesSerachObj).length > 0) {
//     requirePayloadData = JSON.stringify({
//       auth_token: authToken,
//       skip: Number(skip),
//       page,
//       search: addFilesSerachObj,
//     });
//   } else {
//     requirePayloadData = JSON.stringify({
//       auth_token: authToken,
//       skip: Number(skip),
//       page,
//     });
//   }

//   // Ajax call
//   $.ajax({
//     url: MAIN_API_PATH + adminDocumentsView,
//     method: POST,
//     contentType: Content_Type,
//     dataType: "json",
//     data: requirePayloadData,
//     statusCode: {
//       200: function (data) {
//         // Hide page laoder Spiner
//         $("#cover-spin").hide();

//         hideDataTableLoader200("addFilesDataTable");

//         // Response data (IPs)
//         response = data.message;
//         ordersDataReceived = response.message;
//         localStorage.setItem("addFilesDataTableTotal", data.count);
//         // If No IPs found

//         // loop through response to add data in datatable
//         for (let i = 0; i < response.length; i++) {
//           const doc = response[i];

//           // Format source
//           let sourceDisplay = "";
//           if (doc.type === "url") {
//             sourceDisplay = `<a href="${doc.source}"  target="_blank">Open Link</a>`;
//           } else if (doc.type === "text") {
//             sourceDisplay = `<span  style="
//         display: inline-block;
//         max-width: 200px;  /* width fix */
//         white-space: nowrap;
//         overflow: hidden;
//         text-overflow: ellipsis;
//     " title="${doc.source}">${doc.source}</span>`;
//           } else if (doc.type === "file") {
//             sourceDisplay = `<a href="${doc.source}" download>Download File</a>`;
//           }

//           // Format created_at
//           let createdDate = new Date(doc.created_at * 1000).toLocaleString();

//           // Action buttons
//           let actions = `
//     <button class="btn btn-sm btn-outline-primary edit-document" data-id="${doc.document_id}">Edit</button>
//     <button class="btn btn-sm btn-outline-danger delete-document" data-id="${doc.document_id}">Delete</button>
//   `;

// //           addFilesDataTableInit.row
// //             .add([
// //               doc.title,
// //               `<span class="truncate-text" title="${doc.description || "--"
// //               }" style="
// //     display: inline-block;
// //     max-width: 200px;  /* width fix */
// //     white-space: nowrap;
// //     overflow: hidden;
// //     text-overflow: ellipsis;
// // ">${doc.description ? doc.description : "--"}</span>`,

// //               `<span class="badge badge-type" style="
// //         background-color: ${doc.type === "file"
// //                 ? "#f39c12"
// //                 : doc.type === "url"
// //                   ? "#3498db"
// //                   : "#2ecc71"
// //               };
// //         color: #fff;
// //         text-transform: uppercase;
// //         padding: 0.25em 0.5em;
// //         border-radius: 0.25rem;
// //         font-size: 0.8rem;
// //     ">${doc.type}</span>`,

// //               sourceDisplay,
// //               createdDate,
// //               `<span>${actions}</span>`,
// //             ])
// //             .draw();
// //           datatablePagination(
// //             "addFilesDataTable",
// //             4,
// //             "addFilesDataTableTotal",
// //             getaddFilesTableData
// //           );

//           let viewOrderDetailsButtons = document.querySelectorAll(
//             ".view-order-details"
//           );
//           viewOrderDetailsButtons.forEach((button) => {
//             button.addEventListener("click", function () {
//               let orderId = this.getAttribute("data-order-id");
//               // Redirect to order details page
//               showOrderDetails(orderId);
//             });
//           });
//         }
//       },
//       204: function () {
//         $("#cover-spin").hide();
//         hideDataTableLoaderError("addFilesDataTable");
//         if (Object.keys(addFilesSerachObj).length > 0) {
//           $("#addFilesDataTableErrorDiv").addClass("d-none");
//           $(
//             "#addFilesDataTable, #addFilesDataTableDatatableMainHeading"
//           ).removeClass("d-none");
//         }
//         addFilesDataTableInit.clear().draw();
//         $("#addFilesDataTableErrorText").text(noDataFoundText204Case);
//       },
//     },
//     error: function (xhr, status, error) {
//       $("#cover-spin").hide();
//       hideDataTableLoaderError("addFilesDataTable");

//       if (xhr.status === 400) {
//         $("#addFilesDataTableErrorText").text(invalidRequest400Error);
//       } else if (xhr.status === 401) {
//         $("#addFilesDataTableErrorText").text(unauthorizedRequest401Error);
//       } else if (xhr.status === 404) {
//         // $('#cover-spin').hide(0);
//         $("#addFilesDataTableErrorText").text(notFound404Error);
//       } else if (xhr.status === 503) {
//         // $('#cover-spin').hide(0);
//         $("#addFilesDataTableErrorText").text(serverError503Error);
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
//         $.ajax({
//           url: MAIN_API_PATH + getGmtAPI,
//           method: POST,
//           contentType: Content_Type,
//           dataType: "json",
//           success: function (data, textStatus, xhr) {
//             const encrypt = new JSEncrypt();
//             encrypt.setPublicKey(sitePublicKey);
//             const currentDateString = String(data.unixtime);
//             securityKeyEncrypted = encrypt.encrypt(
//               pageName + currentDateString
//             );
//             SecurityKeyTime = false;
//             getaddFilesTableData(skip, page, search);
//           },
//           error: function (xhr, status, error) {
//             $.getJSON(worldTimeAPI, function (data) {
//               const encrypt = new JSEncrypt();
//               encrypt.setPublicKey(sitePublicKey);
//               const currentDateString = String(data.unixtime);
//               securityKeyEncrypted = encrypt.encrypt(
//                 pageName + currentDateString
//               );
//               SecurityKeyTime = false;
//               getaddFilesTableData(skip, page, search);
//             });
//           },
//         });
//       } else {
//         // $('#cover-spin').hide(0);
//         $("#addFilesDataTableErrorText").text(serverError503Error);
//       }
//     },
//   });
// }

// function to export data from datatable
function exportaddFilesDataTableData() {
  console.log("exportaddFilesDataTableData called");
}

// end Add File Data Table Initialization

// start create Bundle Data Table Initialization

function createBundleSearchObjectCreation(search) {
  createBundleSerachObj = search;
}

// Main API Call function for datatable
function getCreateBundleTableData(skip, page) {
  let data = [
    {
      order_id: "ORD12345",
      municipality: "Springfield",
      service: "Cloud Hosting",
      date: "2024-01-15",
      payment: "Paid",
      status: "In Provisioning",
    },
    {
      order_id: "ORDdf5",
      municipality: "Springfield",
      service: "Cloud Hosting",
      date: "2024-01-13",
      payment: "Pending",
      status: "Pending Kickoff",
    },
  ];

  let requirePayloadData;
  if (Object.keys(createBundleSerachObj).length > 0) {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      search: createBundleSerachObj,
    });
  } else {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
    });
  }

  // Ajax call
  $.ajax({
    url: MAIN_API_PATH + "tml/admin/list/bundle",
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        // Hide page laoder Spiner
        $("#cover-spin").hide();

        hideDataTableLoader200("createBundleDataTable");

        // Response data (IPs)
        response = data.message;
        ordersDataReceived = response.message;
        localStorage.setItem("createBundleDataTableTotal", data.count);
        // If No IPs found

        // loop through response to add data in datatable
        for (let i = 0; i < response.length; i++) {
          let bundle = response[i];
          // description ellipsis + hover
          const description =
            bundle.description && bundle.description.trim() !== ""
              ? `<span class="truncate-text" title="${bundle.description}" style="
            display:inline-block;
            max-width:200px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;">
            ${bundle.description}
         </span>`
              : `--`;

          // services count (click to open modal)
          const servicesCount = `<a href="javascript:void(0)" 
                            class="services-count" 
                            data-service-ids='${JSON.stringify(
            bundle.list_of_services
          )}'>
                            ${bundle.list_of_services.length}
                         </a>`;

          // availability toggle
          let availabilityToggle = `
    <div class="form-check form-switch">
      <input class="form-check-input availability-toggle" 
             type="checkbox" 
             data-id="${bundle.bundle_id}" 
             ${bundle.availability ? "checked" : ""}>
    </div>
  `;

          // created date
          const createdDate = new Date(
            bundle.created_at * 1000
          ).toLocaleDateString();

          // actions (edit + delete)
          const actions = `
    <div class="d-flex align-items-center gap-2">
      <button class="btn btn-sm btn-outline-primary edit-bundle"
             data-bundle='${JSON.stringify(bundle)}'>
       Edit
      </button>
    <button class="btn btn-sm btn-outline-danger delete-bundle" data-bundle-id="${bundle.bundle_id}">Delete</button>

    </div>
  `;

          createBundleDataTableInit.row
            .add([
              bundle.title,
              description,
              servicesCount,
              availabilityToggle,
              createdDate,
              actions,
            ])
            .draw();
          datatablePagination(
            "createBundleDataTable",
            2,
            "createBundleDataTableTotal",
            getCreateBundleTableData
          );

          let viewOrderDetailsButtons = document.querySelectorAll(
            ".view-order-details"
          );
          viewOrderDetailsButtons.forEach((button) => {
            button.addEventListener("click", function () {
              let orderId = this.getAttribute("data-order-id");
              // Redirect to order details page
              showOrderDetails(orderId);
            });
          });
        }
      },
      204: function () {
        $("#cover-spin").hide();
        hideDataTableLoaderError("createBundleDataTable");
        if (Object.keys(createBundleSerachObj).length > 0) {
          $("#createBundleDataTableErrorDiv").addClass("d-none");
          $(
            "#createBundleDataTable, #createBundleDataTableDatatableMainHeading"
          ).removeClass("d-none");
        }
        createBundleDataTableInit.clear().draw();
        $("#createBundleDataTableErrorText").text(noDataFoundText204Case);
      },
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      hideDataTableLoaderError("createBundleDataTable");

      if (xhr.status === 400) {
        $("#createBundleDataTableErrorText").text(invalidRequest400Error);
      } else if (xhr.status === 401) {
        $("#createBundleDataTableErrorText").text(unauthorizedRequest401Error);
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $("#createBundleDataTableErrorText").text(notFound404Error);
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $("#createBundleDataTableErrorText").text(serverError503Error);
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
        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: "json",
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(sitePublicKey);
            const currentDateString = String(data.unixtime);
            securityKeyEncrypted = encrypt.encrypt(
              pageName + currentDateString
            );
            SecurityKeyTime = false;
            getCreateBundleTableData(skip, page, search);
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const currentDateString = String(data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(
                pageName + currentDateString
              );
              SecurityKeyTime = false;
              getCreateBundleTableData(skip, page, search);
            });
          },
        });
      } else {
        // $('#cover-spin').hide(0);
        $("#createBundleDataTableErrorText").text(serverError503Error);
      }
    },
  });
}
// services count click → open modal and fetch services
$(document).on("click", ".services-count", function () {
  let serviceIds = $(this).data("service-ids");
  // yahan API call karke service list modal me show karo
  fetchServicesByIds(serviceIds);
});

// availability toggle click
$(document).on("change", ".toggle-availability", function () {
  let bundleId = $(this).data("bundle-id");
  let newStatus = $(this).is(":checked");

  fetch(`/api/bundles/${bundleId}/availability`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ availability: newStatus }),
  });
});

// edit button
$(document).on("click", ".edit-bundle", function () {
  let bundleData = $(this).data("bundle");
  localStorage.setItem("editBundle", JSON.stringify(bundleData));
  window.location.href = "create-bundle.html";
});

// $(document).on("click", ".edit-bundle", function () {
//   let bundleId = $(this).data("bundle-id");
//   localStorage.setItem("editBundleId", bundleId);
//   window.location.href = "create-bundle.html";
//   // openEditBundleModal(bundleId); // custom modal open function
// });

// delete button
$(document).on("click", ".delete-bundle", function () {
  let bundleId = $(this).data("bundle-id");

  swal(
    {
      title: "Deleting Record",
      text: "Are you sure you want to delete?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    },
    function (isConfirm) {
      // let bundleId = this.dataset.bundleId;
      if (isConfirm) {
          $("#cover-spin").show();

          const apiBody = JSON.stringify({
            auth_token: authToken,
            bundle_id: bundleId,
          });
          // return 0
          $.ajax({
            url: MAIN_API_PATH + 'tml/admin/delete/bundle',
            method: POST,
            contentType: Content_Type,
            dataType: "json",
            data: apiBody,
            statusCode: {
              200: function (data) {
                $("#cover-spin").hide(0);

                showNotificationError(
                  "bg-green",
                  null,
                  null,
                  null,
                  null,
                  null,
                  DELETE
                );

                teamMembersAPIResponse = [];
                showDataTableLoader("createBundleDataTable");
                createBundleDataTableInit.clear().draw();
                getCreateBundleTableData(10, 1);
              },
              204: function () {
                $("#cover-spin").hide(0);
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
                    editPolicyAndSessions();
                  },
                  error: function (xhr, status, error) {
                    $.getJSON(worldTimeAPI, function (data) {
                      const encrypt = new JSEncrypt();
                      encrypt.setPublicKey(sitePublicKey);
                      const dateString = String(pageName + data.unixtime);
                      securityKeyEncrypted = encrypt.encrypt(dateString);
                      SecurityKeyTime = false;
                      editPolicyAndSessions();
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
            }
        }
      );
      }
    });
  });
// $(document).on("click", ".delete-bundle", function () {
//   let bundleId = $(this).data("bundle-id");
//  swal(
//     {
//       title: "Are you sure?",
//       text: "Do you want to delete this bundle?",
//       type: "warning",
//       showCancelButton: true,
//       confirmButtonText: 'Confirm',
//       cancelButtonText: 'Cancel'
//     },
//     function (isConfirm) {
//       if (isConfirm) {

//     fetch( MAIN_API_PATH + 'tml/admin/delete/bundle', {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           // alert("Bundle deleted successfully!");
//           showNotificationError("bg-green", null, null, null, null, null, UPDATE);
//           createBundleDataTableInit.clear().draw();
//           getCreateBundleTableData(10, 1);
//         } else {
//           alert("Error deleting bundle!");
//         }
//       });
//   }
// });
// });
// function to export data from datatable
function exportCreateBundleDataTableData() {
  console.log("exportcreateBundleDataTableData called");
}

// end create Bundle Data Table Initialization

// start enroll services Data Table Initialization

$(document).on("click", "#createBundleBtn", function () {
  enrollServicesDataTableInit.clear().draw();
  let tableEntries = Number($("#datatableEntries3").val());
  getEnrollServicesTableData(tableEntries, 1);
});

function enrollServicesSearchObjectCreation(search) {
  enrollServicesSerachObj = search;
}

// Main API Call function for datatable
function getEnrollServicesTableData(skip, page) {
  let data = [
    {
      order_id: "ORD12345",
      municipality: "Springfield",
      service: "Cloud Hosting",
      date: "2024-01-15",
      payment: "Paid",
      status: "In Provisioning",
    },
    {
      order_id: "ORDdf5",
      municipality: "Springfield",
      service: "Cloud Hosting",
      date: "2024-01-13",
      payment: "Pending",
      status: "Pending Kickoff",
    },
  ];

  let requirePayloadData;
  if (Object.keys(enrollServicesSerachObj).length > 0) {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      search: enrollServicesSerachObj,
    });
  } else {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      avalilabe: true,
    });
  }

  // Ajax call
  $.ajax({
    url: MAIN_API_PATH + getserviceManagementAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        // Hide page laoder Spiner
        $("#cover-spin").hide();

        hideDataTableLoader200("enrolServicesDataTable");

        // Response data (IPs)
        response = data.message;
        enrollServicesDataReceived = [
          ...enrollServicesDataReceived,
          ...response,
        ];
        localStorage.setItem("enrolServicesDataTableTotal", data.count);
        // If No IPs found

        // loop through response to add data in datatable
        for (let i = 0; i < response.length; i++) {
          let service_id = response[i].service_id;
          const title = generateSpan(response[i], "title", "", "");
          const description = generateSpan(response[i], "description", "", "");
          const cost_type = generateSpan(response[i], "cost_type", "", "");

          let estimated_cost_span;
          if (response[i].cost_unit === "USD") {
            estimated_cost_span = `<span >$${response[
              i
            ].estimated_cost.toLocaleString()}</span>`;
          } else {
            estimated_cost_span = `<span >$${response[
              i
            ].estimated_cost.toLocaleString()}</span>`;
          }

          let defaultCheckbox;

          defaultCheckbox = `<input title="Click to enroll service"   style="margin: 0 10px 0 0; cursor: pointer;text-align:center;" type="checkbox" class="selectSrviceToEnrollCheckBox" name="selectSrviceToEnrollCheckBox" value="${service_id}" >`;

          let actions = `
          <button class="btn btn-sm btn-primary view-order-details" data-order-id="${response[i].order_id}">View Details</button>
          <button class="btn btn-sm btn-secondary download-invoice" data-order-id="${response[i].order_id}">Download Invoice</button>
        `;

          enrollServicesDataTableInit.row
            .add([
              defaultCheckbox,
              `<td ><span >${title}</span></td>`,
              `<td ><span >${description}</span></td>`,
              `<td ><span >${cost_type}</span></td>`,
              `<td ><span >${estimated_cost_span}</span></td>`,
            ])
            .draw();
          datatablePagination(
            "enrolServicesDataTable",
            3,
            "enrolServicesDataTableTotal",
            getEnrollServicesTableData
          );
        }

        let viewOrderDetailsButtons = document.querySelectorAll(
          ".view-order-details"
        );
        viewOrderDetailsButtons.forEach((button) => {
          button.addEventListener("click", function () {
            let orderId = this.getAttribute("data-order-id");
            // Redirect to order details page
            showOrderDetails(orderId);
          });
        });
      },
      204: function () {
        $("#cover-spin").hide();
        hideDataTableLoaderError("enrolServicesDataTable");
        if (Object.keys(enrollServicesSerachObj).length > 0) {
          $("#enrolServicesDataTableErrorDiv").addClass("d-none");
          $(
            "#enrolServicesDataTable, #enrolServicesDataTableDatatableMainHeading"
          ).removeClass("d-none");
        }
        enrollServicesDataTableInit.clear().draw();
        $("#enrolServicesDataTableErrorText").text(noDataFoundText204Case);
      },
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      hideDataTableLoaderError("enrolServicesDataTable");

      if (xhr.status === 400) {
        $("#enrolServicesDataTableErrorText").text(invalidRequest400Error);
      } else if (xhr.status === 401) {
        $("#enrolServicesDataTableErrorText").text(unauthorizedRequest401Error);
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $("#enrolServicesDataTableErrorText").text(notFound404Error);
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $("#enrolServicesDataTableErrorText").text(serverError503Error);
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
        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: "json",
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(sitePublicKey);
            const currentDateString = String(data.unixtime);
            securityKeyEncrypted = encrypt.encrypt(
              pageName + currentDateString
            );
            SecurityKeyTime = false;
            getEnrollServicesTableData(skip, page, search);
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const currentDateString = String(data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(
                pageName + currentDateString
              );
              SecurityKeyTime = false;
              getEnrollServicesTableData(skip, page, search);
            });
          },
        });
      } else {
        // $('#cover-spin').hide(0);
        $("#enrolServicesDataTableErrorText").text(serverError503Error);
      }
    },
  });
}

// function to export data from datatable
function exportenrolServicesDataTableData() {
  console.log("exportenrolServicesDataTableData called");
}

// end enroll services Data Table Initialization

// function to export data from datatable
function exportenrolServicesDataTableData() {
  console.log("exportenrolServicesDataTableData called");
}

// Function to get information of all the users at once when "All" checkbox is checked
$("#enroleServicesForCreateBundleTableContainer").on(
  "click",
  "#selectAllServicesList",
  function (event) {
    // on click
    const checked = this.checked;
    // Temporary array to store selected categories
    domainListDatatableInit
      .column(0)
      .nodes()
      .to$()
      .each(function (index) {
        const checkbox = $(this).find(
          'input[name="selectSrviceToEnrollCheckBox"]'
        );

        if (checked === false) {
          checkbox.prop("checked", false);
          checkedServicesToEnrollList = [];
        } else {
          checkbox.prop("checked", "checked");
          if (checkbox.is(":checked")) {
            const checkBoxValue = checkbox.val();
            // Add selected category object to the temporary array
            let exists = checkedServicesToEnrollList.some(
              (item) => item === checkBoxValue
            );

            if (!exists) {
              checkedServicesToEnrollList.push(checkBoxValue);
            }
          }
        }
      });
    calculateCostOfServices();
    console.log(
      "this is to check api response",
      checkedServicesToEnrollList,
      enrollServicesDataReceived
    );
  }
);

// Checkbox for the Deleted domains
$("#enroleServicesForCreateBundleTableContainer").on(
  "change",
  "input[name='selectSrviceToEnrollCheckBox']",
  function (e) {
    let checkBoxValue;
    let categoryValue;
    if ($(this).is(":checked")) {
      checkBoxValue = $(this).val();

      checkedServicesToEnrollList.push(checkBoxValue);
    } else {
      checkBoxValue = $(this).val();

      checkedServicesToEnrollList = checkedServicesToEnrollList.filter(
        function (el) {
          return el !== checkBoxValue;
        }
      );
    }
    if (
      $(".selectSrviceToEnrollCheckBox").length ===
      $(".selectSrviceToEnrollCheckBox:checked").length
    ) {
      $("#selectAllServicesList").prop("checked", true);
    } else {
      $("#selectAllServicesList").prop("checked", false);
    }

    calculateCostOfServices();
    console.log(
      "this is to check api response",
      checkedServicesToEnrollList,
      enrollServicesDataReceived
    );
  }
);

$("#enrollServicesSubmitBtn").on("click", function (e) {
  e.preventDefault();
  if ($("#enrollServicesForm").validate().form()) {
    console.log("this is to check api response", checkedServicesToEnrollList);
    if (checkedServicesToEnrollList.length <= 0) {
      showNotificationError(
        "bg-orange",
        null,
        null,
        null,
        null,
        null,
        "Services to enroll are required."
      );
    }
    {
      setEnrollServicesData();
    }
  }
});

function setEnrollServicesData() {
  $("#cover-spin").show();
  const title = $("#enrollServicesFormTitle").val();
  const description = $("#enrollServicesFormDescription").val();
  const services = checkedServicesToEnrollList.join(",");

  console.log("this is to check api response", title, description, services);

  const apiBody = JSON.stringify({
    title: title,
    description: description,
    services: services,
  });
  // return 0
  $.ajax({
    url: MAIN_API_PATH + setEnrollServicesDataAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);

        showNotificationError("bg-green", null, null, null, null, null, UPDATE);

        $("#enrollServicesFormTitle").val("");
        $("#enrollServicesFormDescription").val("");
        $("#selectAllServicesList").prop("checked", false);
        checkedServicesToEnrollList = [];
      },
      204: function () {
        $("#cover-spin").hide(0);
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
            setEnrollServicesData();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              setEnrollServicesData();
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

// per entity to let user input number
//

let costVariableToSet = "";

function calculateCostOfServices() {
  let totalCost = 0;
  // Calculate total cost
  checkedServicesToEnrollList.forEach((enrolled) => {
    const matchedService = enrollServicesDataReceived.find(
      (s) => s.service_id === enrolled
    );
    if (matchedService) {
      totalCost += Number(matchedService.estimated_cost);
    }
  });

  console.log(totalCost);
  if (totalCost <= 0 || totalCost == null) {
    $("#totalCostMainDiv").addClass("d-none");
  } else {
    $("#totalCosecalculated").text("$" + totalCost.toFixed(2));
    $("#totalCostMainDiv").removeClass("d-none");
  }
}

// end enroll services Data Table Initialization
