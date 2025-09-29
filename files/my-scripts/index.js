if (localStorage.getItem("_ia") !== "true") {
  window.location.href = "signin.html";
}

const tokenAuth = localStorage.getItem("_at");
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, "My Secret Passphrase");
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8);

let ordersDataTableInit;
let searchOject = {};
let ordersDataReceived = "";

let dateTimeFlage = true;
let dateTimeEndFlage = true;

let populationSizeCompanyDetailsInit,
  NumberOfEmployeesSelectInit,
  NumberOfITEmployeesSelectInit;

// wizerd form veriables
let muncipalityWizerdFormPopulationSizeInit,
  muncipalityWizerdFormKeyPrioritiesUpTo3Init,
  muncipalityWizerdFormDepartmentsUnderMunicipalityInit;
let muncipalityWizerdFormTotalEmployeesInit,
  muncipalityWizerdFormTotalITEmployeesInit;
let muncipalityWizerdFormCloudApplicationInit,
  muncipalityWizerdFormEndUserDevices,
  muncipalityWizerdFormServersInit,
  muncipalityWizerdFormSpecializedDevicesInit;
let muncipalityWizerdFormCloudWorkloadsInit,
  muncipalityWizerdFormNumberOfConnectedSitesInit;

$(document).ready(function () {
  // Show main content and hide loader

  $("#mainContentInnerLoader").addClass("d-none");
  $("#mainContentInnerDataToShow").removeClass("d-none");

  populationSizeCompanyDetailsInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "populationSizeCompanyDetails",
      false
    );
  NumberOfEmployeesSelectInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "numberOfEmployeesSelect",
      false
    );
  NumberOfITEmployeesSelectInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "numberOfITEmployeesSelect",
      false
    );
  muncipalityWizerdFormPopulationSizeInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "muncipalityWizerdFormPopulationSize",
      false
    );
  muncipalityWizerdFormKeyPrioritiesUpTo3Init =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "muncipalityWizerdFormKeyPrioritiesUpTo3",
      true,
      null
    );
  muncipalityWizerdFormDepartmentsUnderMunicipalityInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "muncipalityWizerdFormDepartmentsUnderMunicipality",
      true,
      null
    );
  // muncipalityWizerdFormTotalEmployeesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormTotalEmployees', false);
  // muncipalityWizerdFormTotalITEmployeesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormNumberOfITEmployees', false);

  muncipalityWizerdFormCloudApplicationInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "muncipalityWizerdFormCloudApplication",
      true,
      null
    );
  // muncipalityWizerdFormEndUserDevicesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormEndUserDevices', false);
  // muncipalityWizerdFormServersInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormServers', false);
  // muncipalityWizerdFormSpecializedDevicesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormSpecializedDevices', false);
  muncipalityWizerdFormCloudWorkloadsInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "muncipalityWizerdFormCloudWorkloads",
      true,
      null
    );
  // muncipalityWizerdFormNumberOfConnectedSitesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormNumberOfConnectedSites', false);

  // First Data Table Initialization
  ordersDataTableInit = createTableComponent(dataSourceIPconfig, options);

  //  validation rules define
  $("#muncipalityWizerdForm").validate({
    debug: true,
    rules: {
      municipalityWizerdFormName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      municipalityWizerdFormAssociatedCounty: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      muncipalityWizerdFormPopulationSize: {
        required: true,
      },
      muncipalityWizerdFormCloudApplication: {
        required: true,
      },
      muncipalityWizerdFormEndUserDevices: {
        required: true,
        onlyNumberDegitsAllowed: true,
      },
      muncipalityWizerdFormServers: {
        required: true,
        onlyNumberDegitsAllowed: true,
      },
      muncipalityWizerdFormSpecializedDevices: {
        required: true,
        onlyNumberDegitsAllowed: true,
      },
      muncipalityWizerdFormCloudWorkloads: {
        required: true,
      },
      muncipalityWizerdFormNumberOfConnectedSites: {
        required: true,
        onlyNumberDegitsAllowed: true,
      },
      municipalityWizerdFormContactName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      muncipalityWizerdFormEmail: {
        required: true,
        email: true,
      },
      muncipalityWizerdFormPhone: {
        required: true,
        validMultiCountryPhone: true,
      },
      muncipalityWizerdFormCountryWebsiteURL: {
        required: true,
        validUrl: true,
      },
      muncipalityWizerdFormKeyPrioritiesUpTo3: {
        minSelectedOptions: 3,
        required: true,
      },
      cyberVendors: {
        // must match the "name" attribute in your radio inputs
        required: true,
      },
      backupInternetRedundancy: {
        required: true,
      },
      muncipalityWizerdFormTotalEmployees: {
        required: true,
        onlyNumberDegitsAllowed: true,
      },
      muncipalityWizerdFormNumberOfITEmployees: {
        required: true,
        onlyNumberDegitsAllowed: true,
      },
    },
    messages: {
      muncipalityWizerdFormCloudApplication: {
        required: "Please select an item.",
      },
      muncipalityWizerdFormCloudWorkloads: {
        required: "Please select an item.",
      },
      muncipalityWizerdFormPopulationSize: {
        required: "Please select an item.",
      },
      muncipalityWizerdFormKeyPrioritiesUpTo3: {
        minlength: "Please choose at least 3 priorities.",
      },

      addNewAccountSelectType: {
        required: "Please select an item.",
      },
      addNewAccountSelectLogFrequency: {
        required: "Please select an item.",
      },
      addNewAccountSelectFrequency: {
        required: "Please select an item.",
      },
      cyberVendors: {
        required: "Please select an option.",
      },
      backupInternetRedundancy: {
        required: "Please select an option.",
      },
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
      if (
        element.attr("name") === "cyberVendors" ||
        element.attr("name") === "backupInternetRedundancy"
      ) {
        error.appendTo(element.parent().parent().parent());
      } else {
        error.appendTo(element.parent());
      }
    },
  });

  //   Intilize flatpickr Date
  issueDateOfCard = flatpickr("#issueDateOfCard", {
    // Configuration options
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: "today",
    onOpen: function (selectedDates, dateStr, instance) {
      if (dateTimeFlage === true) {
        const now = new Date();

        instance.setDate(now);
        $("#dueDateOfCard").val();
        const endDateValue = $("#dueDateOfCard").val();
        $("#dueDateOfCard").prop("disabled", false);
        if (endDateValue) {
          // instance.set('minTime', '00:00')
        }
        dateTimeFlage = false;
      }
    },
    onReady: function (selectedDates, dateStr, instance) {},
    onChange: function (selectedDates, dateStr, instance) {},
    disable: [
      function (date) {
        // return true to disable
        // return (date.getDay() === 0 || date.getDay() === 6)
      },
    ],
  });

  dueDateOfCard = flatpickr("#dueDateOfCard", {
    // Configuration options
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: "today",

    onOpen: function (selectedDates, dateStr, instance) {
      if (dateTimeEndFlage === true) {
        const now = new Date();
        const currentDate = new Date();

        if (currentDate) {
          //   currentDate.setMinutes(now.getMinutes())
          instance.setDate(currentDate);
        } else {
          instance.setDate(now);
        }
        instance.set("minTime", "00:00");
        dateTimeEndFlage = false;
      }
    },
    onReady: function (selectedDates, dateStr, instance) {},
    onChange: function (selectedDates, dateStr, instance) {},
    disable: [
      function (date) {
        // return true to disable
        // return (date.getDay() === 0 || date.getDay() === 6)
      },
    ],
  });

  // getMuncipilityDetails()

  getOrdersTableData(10, 1);

  updateFiltersSelectDataOptions();
  reIntiateWizerd();
});

// get span for change
function generateSpan(data, key, customClass = "", style = "") {
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
  } else {
    // If the key is a simple value
    const displayValue =
      data[key] == "" ||
      data[key] === null ||
      (data[key] && data[key].length <= 0)
        ? "--"
        : `${data[key]}`;
    const title = displayValue;
    spanContent = `<span class="${customClass}" style="${style}" title="${title}">${displayValue}</span>`;
  }

  return spanContent;
}

// Main API Call function for datatable
// function getMuncipilityDetails() {

//   let data = [
//     {
//       order_id: 'ORD12345',
//       municipality: 'Springfield',
//       service: 'Cloud Hosting',
//       date: '2024-01-15',
//       payment: 'Paid',
//       status: 'In Provisioning',
//     },
//     {
//       order_id: 'ORDdf5',
//       municipality: 'Springfield',
//       service: 'Cloud Hosting',
//       date: '2024-01-13',
//       payment: 'Pending',
//       status: 'Pending Kickoff',
//     },

//   ]

//   let requirePayloadData
//   requirePayloadData = JSON.stringify({
//     auth_token: authToken,
//   })

//   // Ajax call
//   $.ajax({
//     url: MAIN_API_PATH + getOrdersAPI,
//     method: POST,
//     contentType: Content_Type,
//     dataType: 'json',
//     data: requirePayloadData,
//     statusCode: {
//       200: function (data) {
//         // Hide page laoder Spiner
//         $('#cover-spin').hide()

//       },
//       204: function () {
//         $('#cover-spin').hide()
//         $('#showMuncipilatiyDetaislLoader, #showMuncipilatiyDetaislMainDiv').addClass('d-none')
//         $('#showMuncipilatiyDetaislErrorTextDiv').removeClass('d-none')
//         $('#showMuncipilatiyDetaislErrorText').html(`
//           <h1 class="mb-1">Welcome!</h1>
//           <p class="mb-0">We're glad to have you here. <span class='text-decoration-underline cursor-pointer text-primary' id='clickToOpenWizerd'>Click</span> here to add details.</p>
//           `)

//         $('#ordersDataTableContainer > .card').addClass('disabled-div')
//         $('#ordersDataTableContainer')
//           .attr('title', 'Municipality details are required.')
//           .css('cursor', 'no-drop');

//         let org_name = localStorage.getItem('_org_n')
//         $('#municipalityWizerdFormName').val(org_name)
//         $('#municipalityWizerdFormName').attr('disabled', true).css({ 'cursor': 'no-drop' })

//       }
//     },
//     error: function (xhr, status, error) {
//       $('#cover-spin').hide()

//       if (xhr.status === 400) {
//         $('#showMuncipilatiyDetaislErrorText').text(invalidRequest400Error)
//       } else if (xhr.status === 401) {
//         $('#showMuncipilatiyDetaislErrorText').text(unauthorizedRequest401Error)
//       } else if (xhr.status === 404) {
//         // $('#cover-spin').hide(0);
//         $('#showMuncipilatiyDetaislErrorText').text(notFound404Error)
//       } else if (xhr.status === 503) {
//         // $('#cover-spin').hide(0);
//         $('#showMuncipilatiyDetaislErrorText').text(serverError503Error)
//       } else if (xhr.status === 408) {
//         swal(
//           {
//             title: ' ',
//             text: sessionExpired408Error,
//             type: 'info',
//             showCancelButton: false,
//             confirmButtonText: 'Logout'
//           },
//           function (isConfirm) {
//             if (isConfirm) {
//               localStorage.clear()
//               window.location.href = redirectToSignInPage408
//             }
//           }
//         )
//       } else if (xhr.status === 410) {
//         $.ajax({
//           url: MAIN_API_PATH + getGmtAPI,
//           method: POST,
//           contentType: Content_Type,
//           dataType: 'json',
//           success: function (data, textStatus, xhr) {
//             const encrypt = new JSEncrypt()
//             encrypt.setPublicKey(sitePublicKey)
//             const currentDateString = String(data.unixtime)
//             securityKeyEncrypted = encrypt.encrypt(pageName + currentDateString)
//             SecurityKeyTime = false
//             getMuncipilityDetails()
//           },
//           error: function (xhr, status, error) {
//             $.getJSON(worldTimeAPI, function (data) {
//               const encrypt = new JSEncrypt()
//               encrypt.setPublicKey(sitePublicKey)
//               const currentDateString = String(data.unixtime)
//               securityKeyEncrypted = encrypt.encrypt(pageName + currentDateString)
//               SecurityKeyTime = false
//               getMuncipilityDetails()
//             })
//           }
//         })
//       } else {
//         // $('#cover-spin').hide(0);
//         $('#showMuncipilatiyDetaislErrorText').text(serverError503Error)
//       }
//     }
//   })

// }

function searchObjectCreation(search) {
  searchOject = search;
}

// Main API Call function for datatable
function getOrdersTableData(skip, page) {
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
    url: MAIN_API_PATH + getOrdersAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        // Hide page laoder Spiner
        $("#cover-spin").hide();

        hideDataTableLoader200("ordersDataTable");

        // Dummy orders data
        // const data = [
        //   {
        //     order_id: "ORD-1001",
        //     municipality: "Lahore",
        //     service: "Water Connection",
        //     date: "2025-09-29",
        //     payment: "PKR 5,000",
        //     status: "Pending Kickoff"
        //   },
        //   {
        //     order_id: "ORD-1002",
        //     municipality: "Karachi",
        //     service: "Electricity",
        //     date: "2025-09-25",
        //     payment: "PKR 3,200",
        //     status: "Completed"
        //   },
        //   {
        //     order_id: "ORD-1003",
        //     municipality: "Islamabad",
        //     service: "Gas Connection",
        //     date: "2025-09-20",
        //     payment: "PKR 7,800",
        //     status: "In Progress"
        //   },
        //   {
        //     order_id: "ORD-1004",
        //     municipality: "Multan",
        //     service: "Internet Setup",
        //     date: "2025-09-15",
        //     payment: "PKR 2,500",
        //     status: "Cancelled"
        //   }
        // ];

        // Response data (IPs)
        response = data;
        ordersDataReceived = response;
        localStorage.setItem("ordersDataTableTotal", data.length);
        // If No IPs found

        // loop through response to add data in datatable
        for (let i = 0; i < response.length; i++) {
          let order_id = generateSpan(response[i], "order_id", "", "");
          let municipality = generateSpan(response[i], "municipality", "", "");
          let service = generateSpan(response[i], "service", "", "");
          let date = generateSpan(response[i], "date", "", "");
          let payment = generateSpan(response[i], "payment", "", "");
          let status = generateSpan(response[i], "status", "", "");
          if (response[i].status === "Pending Kickoff") {
            status = `<div class='d-flex flex-column'>
      ${status}
      <button class="btn btn-sm btn-danger view-order-details p-1 ms-2 px-4" style='font-size: 10px; width: fit-content' data-order-id="${response[i].order_id}">Pay Now</button>
      </div>      
      `;
          }

          let actions = `
      <button class="btn btn-sm btn-primary view-order-details" data-order-id="${response[i].order_id}">View Details</button>
      <button class="btn btn-sm btn-secondary download-invoice" data-order-id="${response[i].order_id}">Download Invoice</button>
    `;

          ordersDataTableInit.row
            .add([
              `<td ><span >#${order_id}</span></td>`,
              `<td ><span >${municipality}</span></td>`,
              `<td ><span >${service}</span></td>`,
              `<td ><span >${date}</span></td>`,
              `<td ><span >${payment}</span></td>`,
              `<td ><span >${status}</span></td>`,
              `<td ><span >${actions}</span></td>`,
            ])
            .draw();
          datatablePagination(
            "ordersDataTable",
            1,
            "ordersDataTableTotal",
            getOrdersTableData
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
        hideDataTableLoaderError("ordersDataTable");
        if (Object.keys(searchOject).length > 0) {
          $("#ordersDataTableErrorDiv").addClass("d-none");
          $(
            "#ordersDataTable, #ordersDataTableDatatableMainHeading"
          ).removeClass("d-none");
        }
        ordersDataTableInit.clear().draw();
        $("#ordersDataTableErrorText").text(noDataFoundText204Case);
      },
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      hideDataTableLoaderError("ordersDataTable");

      if (xhr.status === 400) {
        $("#ordersDataTableErrorText").text(invalidRequest400Error);
      } else if (xhr.status === 401) {
        $("#ordersDataTableErrorText").text(unauthorizedRequest401Error);
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $("#ordersDataTableErrorText").text(notFound404Error);
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $("#ordersDataTableErrorText").text(serverError503Error);
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
            getOrdersTableData(skip, page, search);
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
              getOrdersTableData(skip, page, search);
            });
          },
        });
      } else {
        // $('#cover-spin').hide(0);
        $("#ordersDataTableErrorText").text(serverError503Error);
      }
    },
  });
}

// function to export data from datatable
function exportOrdersDataTableData() {
  console.log("exportOrdersDataTableData called");
}

function showOrderDetails(orderId) {
  let order = ordersDataReceived.find((o) => o.order_id === orderId);

  $("#orderDetailsOrderId").text(`#${order.order_id}`);
  $("#orderDetailsService").text(order.service);
  $("#orderDetailsOrderDate").text(order.date);
  $("#orderDetailsOrderStatus").text(order.payment);

  $("#orderDetailsContainer").removeClass("d-none");
  $("html, body").animate(
    { scrollTop: $("#orderDetailsContainer").offset().top },
    600 // duration in ms (600ms = smooth speed)
  );
}

// href click to open modal
$(document).on("click", "#clickToOpenModal", function () {
  $("#companyDetailsFormModal").modal("show");
});

// href click to open wizerd
$(document).on("click", "#clickToOpenWizerd", function () {
  $(
    "#pageErrorCard, #mainContentInnerDataToShow, #showMuncipilatiyDetaisl"
  ).addClass("d-none");
  $("#mainContent, #mainContentInnerWizerdFormToShow").removeClass("d-none");
  $("html, body").animate(
    { scrollTop: $("#mainContentInnerWizerdFormToShow").offset().top },
    600 // duration in ms (600ms = smooth speed)
  );
  $("#muncipalityWizerdForm input").attr("autocomplete", "off");
});

$(document).on("click", "#closeWizerd", function () {
  $("#pageErrorCard, #mainContentInnerWizerdFormToShow").addClass("d-none");
  $("#mainContentInnerDataToShow, #showMuncipilatiyDetaisl").removeClass(
    "d-none"
  );
  $("html, body").animate(
    { scrollTop: $("#mainContentInnerWizerdFormToShow").offset().top },
    600 // duration in ms (600ms = smooth speed)
  );
});

// update select data options
function updateFiltersSelectDataOptions() {
  // municipality size population data
  let filterSizeData = [
    { id: "<50000", title: "<50,000" },
    { id: "50000-500000", title: "50,000-500,000" },
    { id: ">500000", title: ">500,000" },
  ];

  // number of employees data
  let numberOfEmployeesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  let numberOfITEmployeesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  // wizerd form population data
  let muncipalityWizerdFormPopulationSizeData = [
    { id: "<10000", title: "<10,000" },
    { id: "10000-50000", title: "10,000-50,000" },
    { id: "50000-100000", title: "50,000-100,000" },
    { id: ">100000", title: ">100,000" },
  ];

  let muncipalityWizerdFormKeyPrioritiesUpTo3Data = [
    { id: "improveCybersecurity", title: "Improve cybersecurity" },
    { id: "upgradeITSystem", title: "Upgrade IT systems" },
    {
      id: "expandDigitalServicesForCitizens",
      title: "Expand digital services for citizens",
    },
    {
      id: "impoveComplianceRegulatoryPosture",
      title: "Improve compliance/regulatory posture",
    },
    { id: "other", title: "Other" },
  ];

  let muncipalityWizerdFormDepartmentsUnderMunicipalityData = [
    { id: "policeFireEMS", title: "Police / Fire / EMS" },
    { id: "utilities", title: "Utilities (Water, Power, Waste)" },
    { id: "financeTax", title: "Finance / Tax" },
    { id: "publicWorks", title: "Public Works" },
    { id: "parksRecreation", title: "Parks & Recreation" },
    { id: "other", title: "Other" },
  ];

  let muncipalityWizerdFormNumberOfEmployeesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  let muncipalityWizerdFormMumberOfITEmployeesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  let muncipalityWizerdFormCloudApplicationData = [
    { id: "microsoft365", title: "Microsoft 365" },
    { id: "googleWorkspace", title: "Google Workspace" },
    { id: "otherBusinessApplications", title: "Other business applications" },
    { id: "none", title: "None / Not sure" },
  ];

  let muncipalityWizerdFormEndUserDevicesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  let muncipalityWizerdFormServersData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  let muncipalityWizerdFormSpecializedDevicesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  let muncipalityWizerdFormCloudWorkloadsData = [
    { id: "mostlyCloudBased", title: "Mostly cloud-based" },
    { id: "mixOfCloudAndLocalSevers", title: "Mix of cloud and local servers" },
    { id: "mostlyOnPremises", title: "Mostly on-premises" },
    { id: "none", title: "Not sure" },
  ];

  let muncipalityWizerdFormNumberOfConnectedSitesData = [
    { id: "1", title: "1" },
    { id: "2-5", title: "2-5" },
    { id: "6-10", title: "6-10" },
    { id: "11-20", title: "11-20" },
    { id: "21+", title: "21+" },
  ];

  populationSizeCompanyDetailsInit.addOption(filterSizeData);
  populationSizeCompanyDetailsInit.setValue("<50000");

  NumberOfEmployeesSelectInit.addOption(numberOfEmployeesData);
  NumberOfEmployeesSelectInit.setValue("51-200");

  NumberOfITEmployeesSelectInit.addOption(numberOfITEmployeesData);
  NumberOfITEmployeesSelectInit.setValue("1-50");

  // wizerd form population data
  muncipalityWizerdFormPopulationSizeInit.addOption(
    muncipalityWizerdFormPopulationSizeData
  );
  // muncipalityWizerdFormPopulationSizeInit.setValue('small')

  muncipalityWizerdFormKeyPrioritiesUpTo3Init.addOption(
    muncipalityWizerdFormKeyPrioritiesUpTo3Data
  );
  // muncipalityWizerdFormKeyPrioritiesUpTo3Init.setValue('improveCybersecurity')

  muncipalityWizerdFormDepartmentsUnderMunicipalityInit.addOption(
    muncipalityWizerdFormDepartmentsUnderMunicipalityData
  );
  // muncipalityWizerdFormDepartmentsUnderMunicipalityInit.setValue('policeFireEMS')

  // muncipalityWizerdFormTotalEmployeesInit.addOption(muncipalityWizerdFormNumberOfEmployeesData);
  // muncipalityWizerdFormTotalEmployeesInit.setValue('51-200')

  // muncipalityWizerdFormTotalITEmployeesInit.addOption(muncipalityWizerdFormMumberOfITEmployeesData);
  // muncipalityWizerdFormTotalITEmployeesInit.setValue('1-50')

  muncipalityWizerdFormCloudApplicationInit.addOption(
    muncipalityWizerdFormCloudApplicationData
  );
  // muncipalityWizerdFormCloudApplicationInit.setValue('microsoft365')

  // muncipalityWizerdFormEndUserDevicesInit.addOption(muncipalityWizerdFormEndUserDevicesData);
  // muncipalityWizerdFormEndUserDevicesInit.setValue('51-200')

  // muncipalityWizerdFormServersInit.addOption(muncipalityWizerdFormServersData);
  // muncipalityWizerdFormServersInit.setValue('1-50')

  // muncipalityWizerdFormSpecializedDevicesInit.addOption(muncipalityWizerdFormSpecializedDevicesData);
  // muncipalityWizerdFormSpecializedDevicesInit.setValue('1-50')

  muncipalityWizerdFormCloudWorkloadsInit.addOption(
    muncipalityWizerdFormCloudWorkloadsData
  );
  // muncipalityWizerdFormCloudWorkloadsInit.setValue('mostlyCloudBased')

  // muncipalityWizerdFormNumberOfConnectedSitesInit.addOption(muncipalityWizerdFormNumberOfConnectedSitesData);
  // muncipalityWizerdFormNumberOfConnectedSitesInit.setValue('1')
}

// Progress bar Control
function addNumberingTOtheWizerd() {
  // Select the ul element
  const ulElement = $("#basicFormProgress");
  // Loop through each li element and set the step number
  ulElement.find("li.step-item").each(function (index) {
    const stepNumber = index + 1;
    $(this).find(".step-icon").text(stepNumber);
  });
}

function setTheNextButtonTarget(id, targetID) {
  const nextButton = $(`#${id}`);
  nextButton.attr(
    "data-hs-step-form-next-options",
    `{
        "targetSelector": "#${targetID}"
    }`
  );
}

function setThePreivousButtonTarget(id, targetID) {
  const previousButton = $(`#${id}`);
  previousButton.attr(
    "data-hs-step-form-prev-options",
    `{
          "targetSelector": "#${targetID}"
      }`
  );
}

// Wizerd Next button
$(".formNextButton").on("click", function (e) {
  e.preventDefault();
  let selectedOptions = $("#muncipalityWizerdFormKeyPrioritiesUpTo3").val()
    .length;
  const isChecked = $('input[name="cyberVendors"]:checked').length > 0;
  console.log("isChecked!!!", isChecked);

  $("#muncipalityWizerdForm").validate().form();
  if (selectedOptions > 3 || (selectedOptions === 3 && isChecked === true)) {
    setTheNextButtonTarget(
      "firstStepAccountTypeNextButton",
      "municipalityWizerdTechnologyEnvironment"
    );
    setThePreivousButtonTarget(
      "thiredStepGetAccessCountPreviousBtn",
      "municipalityWizerdFormOrganizationSnapshot"
    );

    addNumberingTOtheWizerd();
    reIntiateWizerd();
  } else {
    setTheNextButtonTarget(
      "firstStepAccountTypeNextButton",
      "municipalityWizerdFormOrganizationSnapshot"
    );
    setTheNextButtonTarget(
      "secondStepAccountNameNextBtn",
      "municipalityWizerdFormOrganizationSnapshot"
    );

    addNumberingTOtheWizerd();
    reIntiateWizerd();
  }
});

// ********************** start set municpilities detsils *********************************

// validation Form Finish Btn
$("#validationFormFinishBtn").on("click", function (e) {
  e.preventDefault();
  if ($("#muncipalityWizerdForm").validate().form()) {
    setMuncipilitiesData();
  }
});

function setMuncipilitiesData() {
  const municipality_name = $("#municipalityWizerdFormName").val();
  const county = $("#municipalityWizerdFormAssociatedCounty").val();
  const population_size = $("#muncipalityWizerdFormPopulationSize").val();
  const primary_contact_name = $("#municipalityWizerdFormContactName").val();
  const primary_contact_email = $("#muncipalityWizerdFormEmail").val();
  const primary_contact_phone = $("#muncipalityWizerdFormPhone").val();
  const website_url = $("#muncipalityWizerdFormCountryWebsiteURL").val();
  const key_priorities = $("#muncipalityWizerdFormKeyPrioritiesUpTo3").val();
  // Match ids with titles
 key_priorities = selectedKeys.map(id => {
  const found = muncipalityWizerdFormKeyPrioritiesUpTo3Data.find(item => item.id === id);
  return found ? found.title : id;
});
  const departments = $(
    "#muncipalityWizerdFormDepartmentsUnderMunicipality"
  ).val();
  const total_employees =
    parseInt($("#muncipalityWizerdFormTotalEmployees").val()) || 0;
  const it_employees =
    parseInt($("#muncipalityWizerdFormNumberOfITEmployees").val()) || 0;
  const outsourced_it = $('input[name="cyberVendors"]:checked').val();
  const cloud_apps_in_use = $("#muncipalityWizerdFormCloudApplication").val();
  const cloud_workloads_in_use = $(
    "#muncipalityWizerdFormCloudWorkloads"
  ).val();
  const end_user_devices =
    parseInt($("#muncipalityWizerdFormEndUserDevices").val()) || 0;
  const servers = parseInt($("#muncipalityWizerdFormServers").val()) || 0;
  const specialized_devices =
    parseInt($("#muncipalityWizerdFormSpecializedDevices").val()) || 0;
  const no_of_connecetd_sites =
    parseInt($("#muncipalityWizerdFormNumberOfConnectedSites").val()) || 0;
  const network_backup = $(
    'input[name="backupInternetRedundancy"]:checked'
  ).val();

  const is_super = $("#addUserDetailsSuperAccess").prop("checked");
  const user_type = localStorage.getItem("_role");

  // Current epoch time in **seconds**
  const created_at = Math.floor(Date.now() / 1000);

  const apiBody = JSON.stringify({
    auth_token: authToken,
    municipality_name,
    county,
    population_size,
    primary_contact_name,
    primary_contact_email,
    primary_contact_phone,
    website_url,
    key_priorities,
    departments,
    total_employees,
    it_employees,
    outsourced_it,
    cloud_apps_in_use,
    cloud_workloads_in_use,
    end_user_devices,
    servers,
    specialized_devices,
    no_of_connecetd_sites,
    network_backup,
    created_at,
  });

  // return 0
  $.ajax({
    url: MAIN_API_PATH + setMunicipalityWizardSetAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);
        $("#addUserDetailsModal").modal("hide");

        showNotificationError("bg-green", null, null, null, null, null, UPDATE);

        teamMembersAPIResponse = [];
        showDataTableLoader("profileTeamDataTable");

        profileTeamDataTableInit.clear().draw();
        let pageEntries = Number($("#datatableEntries1").val());
        getProfileTeamTableData(pageEntries, 1);
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

// ********************** end set municpilities detsils *********************************

// ********************** start get municpilities detsils *********************************

getMuncipilitiesData();
function getMuncipilitiesData() {
  const apiBody = JSON.stringify({
    auth_token: authToken,
  });

  // return 0
  $.ajax({
    url: MAIN_API_PATH + getMunicipalityWizardSetAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);
        //  const data = response.message;
        const apiData = data.message;

        $("#showMuncipilatiyDetaislLoader").addClass("d-none");
        $("#showMuncipilatiyDetaislErrorTextDiv").addClass("d-none");
        $("#muncipalityInformationHeader").removeClass("d-none");
        $("#showMuncipilatiyDetaislMainDiv")
          .html(renderMunicipalityCards(apiData))
          .removeClass("d-none");
      },
      204: function () {
        $("#cover-spin").hide();
        $(
          "#showMuncipilatiyDetaislLoader, #showMuncipilatiyDetaislMainDiv"
        ).addClass("d-none");
        $("#showMuncipilatiyDetaislErrorTextDiv").removeClass("d-none");
        $("#showMuncipilatiyDetaislErrorText").html(`
          <h1 class="mb-1">Welcome!</h1>
          <p class="mb-0">We're glad to have you here. <span class='text-decoration-underline cursor-pointer text-primary' id='clickToOpenWizerd'>Click</span> here to add details.</p>
          `);

        // $("#ordersDataTableContainer > .card").addClass("disabled-div");
        // $("#ordersDataTableContainer")
        //   .attr("title", "Municipality details are required.")
        //   .css("cursor", "no-drop");

        let org_name = localStorage.getItem("_org_n");
        $("#municipalityWizerdFormName").val(org_name);
        $("#municipalityWizerdFormName")
          .attr("disabled", true)
          .css({ cursor: "no-drop" });
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

function renderMunicipalityCards(data) {
  const renderList = (arr) => {
    if (!arr || arr.length === 0)
      return `<span class="text-muted">No data</span>`;
    return (
      `<ul class="mb-0 ps-3">` +
      arr.map((item) => `<li>${item}</li>`).join("") +
      `</ul>`
    );
  };

  return `
  
  <div class="row g-4">
  
    <!-- Left side (basic + contact) -->
    <div class="col-lg-8">
      <div class="row g-4">

      <!-- Basic Info -->
<div class="col-md-6">
  <div class="card shadow-sm h-100 border-0">
    <div class="card-header bg-primary text-white fw-bold">
      <i class="bi-buildings me-2"></i>  Basic Information
    </div>
    <div class="card-body">
      <!-- Municipality -->
      <p class="text-muted mb-1">
        <i class="bi bi-building me-1"></i> Municipality
      </p>
      <p class="fw-bold ms-4">${data.municipality_name ?? "--"}</p>

      <!-- Population -->
      <p class="text-muted mb-1">
        <i class="bi bi-people me-1"></i> Population Size
      </p>
      <p class="fw-bold ms-4">${data.population_size ?? "--"}</p>

      <!-- County + Website -->
      <p class="text-muted mb-1">
        <i class="bi bi-geo-alt me-1"></i> County
      </p>
      <p class="fw-bold ms-4">
        ${
          data.website_url
            ? `<a href="${
                data.website_url
              }" target="_blank" class="text-decoration-none">${
                data.county ?? "--"
              }</a>`
            : data.county ?? "--"
        }
      </p>
    </div>
  </div>
</div>


     <!-- Primary Contact -->
<div class="col-md-6">
  <div class="card shadow-sm h-100 border-0">
    <div class="card-header bg-success text-white fw-bold">
      <i class="bi bi-person-lines-fill me-2"></i> Primary Contact
    </div>
    <div class="card-body">
      <!-- Name -->
      <p class="text-muted mb-1">
        <i class="bi bi-person me-1"></i> Name
      </p>
      <p class="fw-bold ms-4">${data.primary_contact_name ?? "--"}</p>

      <!-- Email -->
      <p class="text-muted mb-1">
        <i class="bi bi-envelope me-1"></i> Email
      </p>
      <p class="fw-bold ms-4">${data.primary_contact_email ?? "--"}</p>

      <!-- Phone -->
      <p class="text-muted mb-1">
        <i class="bi bi-telephone me-1"></i> Phone
      </p>
      <p class="fw-bold ms-4">${data.primary_contact_phone ?? "--"}</p>
    </div>
  </div>
</div>

          <!-- Key Priorities -->
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-header bg-warning fw-bold">
              <i class="bi bi-flag me-2"></i> Key Priorities
            </div>
            <div class="card-body">
              ${renderList(data.key_priorities)}
            </div>
          </div>
        </div>

        <!-- Departments -->
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-header bg-light fw-bold">
              <i class="bi bi-diagram-3 me-2"></i> Departments
            </div>
            <div class="card-body">
              ${renderList(data.departments)}
            </div>
          </div>
        </div>

        <!-- Cloud Applications -->
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-header bg-secondary text-white fw-bold">
              <i class="bi bi-cloud-check me-2"></i> Cloud Apps
            </div>
            <div class="card-body">
              ${renderList(data.cloud_apps_in_use)}
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Right side (stats) -->
    <div class="col-lg-4">
    <div class="row g-3">

  <!-- Total Employees -->
  <div class="col-6 col-md-6">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-body text-center">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-people fs-3 text-primary me-2"></i>
          <span class="text-muted small" style="font-size:14px">Total Employees</span>
        </div>
        <h3 class="fw-bold" style="font-size:30px;">
          ${data.total_employees ?? "--"}
        </h3>
      </div>
    </div>
  </div>

  <!-- IT Employees -->
  <div class="col-6 col-md-6">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-body text-center">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-laptop fs-3 text-success me-2"></i>
          <span class="text-muted small" style="font-size:14px">IT Employees</span>
        </div>
        <h3 class="fw-bold" style="font-size:30px;">
          ${data.it_employees ?? "--"}
        </h3>
      </div>
    </div>
  </div>

  <!-- End-user Devices -->
  <div class="col-6 col-md-6">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-body text-center">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-tablet fs-3 text-warning me-2"></i>
          <span class="text-muted small" style="font-size:14px">End-user Devices</span>
        </div>
        <h3 class="fw-bold" style="font-size:30px;">
          ${data.end_user_devices ?? "--"}
        </h3>
      </div>
    </div>
  </div>
   

  <!-- Servers -->
  <div class="col-6 col-md-6">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-body text-center">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-server fs-3 text-danger me-2"></i>
          <span class="text-muted small" style="font-size:14px">Servers</span>
        </div>
        <h3 class="fw-bold" style="font-size:30px;">
          ${data.servers ?? "--"}
        </h3>
      </div>
    </div>
  </div>

  <!-- Specialized Devices -->
  <div class="col-6 col-md-6">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-body text-center">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-phone-flip fs-3 text-info me-2"></i>
          <span class="text-muted small" style="font-size:14px">Specialized Devices</span>
        </div>
        <h3 class="fw-bold" style="font-size:30px;">
          ${data.specialized_devices ?? "--"}
        </h3>
      </div>
    </div>
  </div>

  <!-- Connected Sites -->
  <div class="col-6 col-md-6">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-body text-center">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-building fs-3 text-secondary me-2"></i>
          <span class="text-muted small" style="font-size:14px">Connected Sites</span>
        </div>
        <h3 class="fw-bold" style="font-size:30px;">
          ${data.no_of_connecetd_sites ?? "--"}
        </h3>
      </div>
    </div>
  </div>

</div>
 <!-- End-user Network -->
  <div class="col-12 col-md-12 mt-3">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-body text-center">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-router  fs-3 text-warning me-2"></i>
          <span class="text-muted small" style="font-size:14px">Network</span>
        </div>
        <h3 class="fw-bold" style="font-size:30px;">
        ${data.network_backup 
          ? data.network_backup.charAt(0).toUpperCase() + data.network_backup.slice(1).toLowerCase() 
          : "--"}
      </h3>
      </div>
    </div>
  </div>

    </div>

    <!-- Bottom row for large lists -->
    <div class="col-12">
      <div class="row g-4">

      

    

      </div>
    </div>

  </div>`;
}

// ********************** end get municpilities detsils *********************************
// ********************** start EDIT municpilities detsils *********************************
const editBtnCard = document.getElementById("editWizardBtn");
const homeBtnCard = document.getElementById("wizardHomeBtn");
const wizardDiv = document.getElementById("mainContentInnerWizerdFormToShow");
const cardDiv = document.getElementById("showMuncipilatiyDetaislMainDiv").parentElement;

// Show wizard on edit
editBtnCard.addEventListener("click", () => {
  cardDiv.classList.add("d-none");
  wizardDiv.classList.remove("d-none");
   $("#muncipalityInformationHeader").addClass("d-none");
    // Fetch the data
  getMuncipilitiesDataForWizard();
});

// Show card on Home
homeBtnCard.addEventListener("click", () => {
  wizardDiv.classList.add("d-none");
  cardDiv.classList.remove("d-none");
    $("#muncipalityInformationHeader").removeClass("d-none");
});
// ================= START: Fetch & Populate Municipality Wizard =================
function getMuncipilitiesDataForWizard() {
  const apiBody = JSON.stringify({
    auth_token: authToken,
  });

  $.ajax({
    url: MAIN_API_PATH + getMunicipalityWizardSetAPI,
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (response) {
        const apiData = response.message;

        // ----------------- Populate Basic Info -----------------
        $("#municipalityWizerdFormName").val(apiData.municipality_name || "");
        $("#municipalityHelpName").text("Enter the official name of the municipality");

        $("#muncipalityWizerdFormPopulationSize").val(apiData.population_size || "");
        $("#municipalityHelpPopulation").text("Enter the total population size");

        $("#municipalityWizerdFormAssociatedCounty").val(apiData.county || "");
        $("#municipalityHelpCounty").text("Select the county this municipality belongs to");

        $("#muncipalityWizerdFormCountryWebsiteURL").val(apiData.website_url || "");
        $("#municipalityHelpWebsite").text("Provide the official website URL");

        // ----------------- Populate Contact Info -----------------
        $("#municipalityWizerdFormContactName").val(apiData.primary_contact_name || "");
        $("#municipalityHelpContactName").text("Enter the name of the primary contact");

        $("#muncipalityWizerdFormEmail").val(apiData.primary_contact_email || "");
        $("#municipalityHelpEmail").text("Enter the contact email address");

        $("#muncipalityWizerdFormPhone").val(apiData.primary_contact_phone || "");
        $("#municipalityHelpPhone").text("Enter the primary contact phone number");

        // ----------------- Populate Stats -----------------
        $("#muncipalityWizerdFormTotalEmployees").val(apiData.total_employees || "");
        $("#municipalityHelpTotalEmployees").text("Total number of employees in municipality");

        $("#muncipalityWizerdFormNumberOfITEmployees").val(apiData.it_employees || "");
        $("#municipalityHelpITEmployees").text("Total number of IT employees");

        $("#muncipalityWizerdFormEndUserDevices").val(apiData.end_user_devices || "");
        $("#municipalityHelpEndUserDevices").text("Number of end-user devices");

        $("#muncipalityWizerdFormServers").val(apiData.servers || "");
        $("#municipalityHelpServers").text("Number of servers deployed");

        $("#muncipalityWizerdFormSpecializedDevices").val(apiData.specialized_devices || "");
        $("#municipalityHelpSpecializedDevices").text("Specialized devices in use");

        $("#muncipalityWizerdFormNumberOfConnectedSites").val(apiData.no_of_connecetd_sites || "");
        $("#municipalityHelpConnectedSites").text("Total connected sites");

        // ----------------- Radio Buttons -----------------
        if(apiData.cyber_vendors){
          $(`input[name='cyberVendors'][value='${apiData.cyber_vendors}']`).prop("checked", true);
        }
        if(apiData.network_backup){
          $(`input[name='backupInternetRedundancy'][value='${apiData.network_backup}']`).prop("checked", true);
        }

        // ----------------- Multi-select Fields (Tom Select) -----------------
        if(apiData.key_priorities){
          const keyPrioritiesSelect = new TomSelect("#muncipalityWizerdFormKeyPrioritiesUpTo3");
          keyPrioritiesSelect.setValue(apiData.key_priorities);
        }

        if(apiData.departments){
          const departmentsSelect = new TomSelect("#muncipalityWizerdFormDepartmentsUnderMunicipality");
          departmentsSelect.setValue(apiData.departments);
        }

        if(apiData.cloud_apps_in_use){
          const cloudAppsSelect = new TomSelect("#muncipalityWizerdFormCloudApplication");
          cloudAppsSelect.setValue(apiData.cloud_apps_in_use);
        }

        if(apiData.cloud_workloads){
          const cloudWorkloadsSelect = new TomSelect("#muncipalityWizerdFormCloudWorkloads");
          cloudWorkloadsSelect.setValue(apiData.cloud_workloads);
        }

      },
      400: function () {
        alert("Error fetching municipality data.");
      },
    },
  });
}
// ================= END: Fetch & Populate Municipality Wizard =================



// Intilize the Step wizerd
function reIntiateWizerd() {
  new HSStepForm(".js-step-form-validate", {
    preventNextStep: function () {
      return new Promise(function (resolve, reject) {
        const invalidFields = document.querySelectorAll(
          '[aria-invalid="true"]'
        );
        if (invalidFields.length === 0) {
          // No invalid fields, allow next step
          resolve();
        } else {
          // Invalid fields present, prevent next step
          // console.log(invalidFields[0].closest('div[id]').id)
          document
            .getElementById("muncipalityWizerdForm")
            .classList.add("was-validated");

          const targetSelectorValue =
            "#" + invalidFields[0].closest("div[id]").id;

          const liElements = document.querySelectorAll("li.step-item");

          liElements.forEach((liElement) => {
            const linkElement = liElement.querySelector(
              ".step-content-wrapper"
            );
            const dataOptions = linkElement.getAttribute(
              "data-hs-step-form-next-options"
            );

            if (dataOptions) {
              const parsedDataOptions = JSON.parse(dataOptions);
              if (parsedDataOptions.targetSelector === targetSelectorValue) {
                liElement.classList.remove("is-valid");
                liElement.classList.add("is-invalid");
              }
            }
          });
          reject();
        }
      });
    },

    validator: HSBsValidation.init(".js-validate"),
  });
}


// ================= END: Step wizerd =================

// ================= Create Order Button Click Event =================
// button not working
$(document).on("click", "#createOrderBtn", function () {
  window.location.href = "/create-order.html";
});
// ================= END: Create Order Button Click Event =================
