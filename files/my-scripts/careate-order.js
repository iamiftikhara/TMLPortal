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


let selectedBundleID = "";
let selectedBundleName = "";
let selectedBundleAndServicesCount = '';

let bundlesDataReceivedFromAPI = "";


$(document).ready(function () {
  // Show main content and hide loader

  $("#mainContentInnerLoader").addClass("d-none");
  $("#mainContentInnerDataToShow").removeClass("d-none");

  // populationSizeCompanyDetailsInit =
  //   initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  //     "populationSizeCompanyDetails",
  //     false
  //   );
  // NumberOfEmployeesSelectInit =
  //   initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  //     "numberOfEmployeesSelect",
  //     false
  //   );
  // NumberOfITEmployeesSelectInit =
  //   initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  //     "numberOfITEmployeesSelect",
  //     false
  //   );
  // // muncipalityWizerdFormPopulationSizeInit =
  // //   initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  // //     "muncipalityWizerdFormPopulationSize",
  // //     false
  // //   );
  // muncipalityWizerdFormKeyPrioritiesUpTo3Init =
  //   initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  //     "muncipalityWizerdFormKeyPrioritiesUpTo3",
  //     true,
  //     null
  //   );
  // muncipalityWizerdFormDepartmentsUnderMunicipalityInit =
  //   initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  //     "muncipalityWizerdFormDepartmentsUnderMunicipality",
  //     true,
  //     null
  //   );
  // // muncipalityWizerdFormTotalEmployeesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormTotalEmployees', false);
  // // muncipalityWizerdFormTotalITEmployeesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormNumberOfITEmployees', false);

  // muncipalityWizerdFormCloudApplicationInit =
  //   initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  //     "muncipalityWizerdFormCloudApplication",
  //     true,
  //     null
  //   );
  // // muncipalityWizerdFormEndUserDevicesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormEndUserDevices', false);
  // // muncipalityWizerdFormServersInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormServers', false);
  // // muncipalityWizerdFormSpecializedDevicesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormSpecializedDevices', false);
  // muncipalityWizerdFormCloudWorkloadsInit =
  //   initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  //     "muncipalityWizerdFormCloudWorkloads",
  //     true,
  //     null
  //   );
  // muncipalityWizerdFormNumberOfConnectedSitesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormNumberOfConnectedSites', false);

  // First Data Table Initialization
  // ordersDataTableInit = createTableComponent(dataSourceIPconfig, options);

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
    onReady: function (selectedDates, dateStr, instance) { },
    onChange: function (selectedDates, dateStr, instance) { },
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
    onReady: function (selectedDates, dateStr, instance) { },
    onChange: function (selectedDates, dateStr, instance) { },
    disable: [
      function (date) {
        // return true to disable
        // return (date.getDay() === 0 || date.getDay() === 6)
      },
    ],
  });

  // getMuncipilityDetails()


  // updateFiltersSelectDataOptions();
  reIntiateWizerd();


  getBundlesList()
  getServiceManagementTableData()

});


const servicesCatalog = {
  "svc_1759018030049": {
    "title": "Network",
    "description": ""
  },
  "svc_1759176897262": {
    "title": "EDR",
    "description": "Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century "
  },
  "svc_1759176984893": {
    "title": "Cloud App",
    "description": "Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/ LOR-əm IP-səm) is a dummy"
  },
  "svc_1759177045891": {
    "title": "Phishing",
    "description": "Its purpose is to permit a page layout to be designed, independently of the copy that will subsequently populate it, "
  },
  "svc_1759177807239": {
    "title": "Regulatory Compliance",
    "description": "Regulatory Compliance"
  }
}





function getBundlesList() {

  const apiBody = JSON.stringify({
    auth_token: authToken,
    availability: true
  });

  // return 0
  $.ajax({
    url: MAIN_API_PATH + getAdminListBundle,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);
        //  const data = response.message;
        const apiData = data.message;
        bundlesDataReceivedFromAPI = apiData
        // ==== Init render ====
        renderBundles(apiData);

        $('#createOrderBundleDivLoader, #createOrderBundleLDivErrorDiv').addClass('d-none');
        $('#createOrderBundleDivMainDiv').removeClass('d-none');
        $('#createOrderBundleDivMainDivNextBtn').attr('disabled', false);




      },
      204: function () {
        $('#createOrderBundleDivLoader, #createOrderBundleLDivErrorDiv').addClass('d-none');
        $('#createOrderBundleDivMainDiv').addClass('d-none');
        $('#createOrderBundleLDivErrorDiv').removeClass('d-none');
        $('#createOrderBundleDivMainDivNextBtn').attr('disabled', true);

        $('#createOrderBundleLText').text(noDataFoundText204Case);



      },
    },
    error: function (xhr, status, error) {
      $('#cover-spin').hide()
      $('#createOrderBundleDivLoader, #createOrderBundleLDivErrorDiv').addClass('d-none');
      $('#createOrderBundleDivMainDiv').addClass('d-none');
      $('#createOrderBundleLDivErrorDiv').removeClass('d-none');
      $('#createOrderBundleDivMainDivNextBtn').attr('disabled', true);


      if (xhr.status === 400) {
        $('#createOrderBundleLText').text(invalidRequest400Error)
      } else if (xhr.status === 401) {
        $('#createOrderBundleLText').text(unauthorizedRequest401Error)
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $('#createOrderBundleLText').text(notFound404Error)
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $('#createOrderBundleLText').text(serverError503Error)
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
            getBundlesList(skip, page, search)
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const currentDateString = String(data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(pageName + currentDateString)
              SecurityKeyTime = false
              getBundlesList(skip, page, search)
            })
          }
        })
      } else {
        // $('#cover-spin').hide(0);
        $('#createOrderBundleLText').text(serverError503Error)
      }
    }
  });
}

const escapeHtml = (s = '') =>
  s.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

// servicesCatalog is now an object: { "svc_id": { title, description }, ... }

const serviceInfoById = (id) => servicesCatalog[id] || null;

const serviceTitleById = (id) => serviceInfoById(id)?.title || id;

const serviceDescById = (id) => serviceInfoById(id)?.description || '';

// Light header colors per tier (tweak as you like)
const tierHeaderClass = title => {
  switch ((title || '').toLowerCase()) {
    case 'bronze': return 'bg-warning bg-opacity-25 text-warning';
    case 'silver': return 'bg-secondary bg-opacity-25 text-secondary';
    case 'gold': return 'bg-warning bg-opacity-50 text-dark'; // a bit richer
    case 'platinum': return 'bg-info bg-opacity-25 text-info';
    default: return 'bg-light text-dark';
  }
};


// Public function you can hook into (like old setPolicyValue)
function selectBundle(bundleId, directCall) {
  // selectedBundleID = bundleId;
  console.log(bundleId)


  // Toggle check badge & card border
  document.querySelectorAll('[data-bundle-id]').forEach(card => {
    const isActive = (card.getAttribute('data-bundle-id') === bundleId);
    card.classList.toggle('border', true);
    card.classList.toggle('border-2', isActive);
    card.classList.toggle('border-primary', isActive);

    const check = card.querySelector('.bundle-check');
    if (check) check.classList.toggle('d-none', !isActive);
  });

  setBundleRecall(bundleId, directCall)

}

let clearSelectedServices = () => {
  selectedServices = [];
  $('.service-card').removeClass("border-primary shadow-lg");
  $('.service-card .bundle-check').addClass('d-none');
}
let clearSelectedServicesCheck = false

function setBundleRecall(val, directCall) {
  selectedBundleID = val

  // to get services list
  const bundle = bundlesDataReceivedFromAPI.find(b => b.bundle_id === selectedBundleID);
  const servicesList = bundle?.list_of_services || [];
  let bundleName = bundle?.title || 'Bundle'
  servicesListFromBundle = servicesList
 selectedBundleName = bundleName

  console.log(selectedBundleID, bundleName)


  if (bundleName == 'Custom') {
    if (directCall == 'true' && clearSelectedServicesCheck == false) {
      clearSelectedServicesCheck = true
      clearSelectedServices()
    }
    return
  }
  clearSelectedServicesCheck = false
  clearSelectedServices()



  for (let service of servicesList) {
    console.log(service)
    setTimeout(() => {
      customServiceCheck = false;
      handleServiceClick(service)
    }, 100);
  }

  // handleServiceClick(selectedBundleID)

}


// Render function
function renderBundles(bundles) {
  const row = document.getElementById('bundleCardsRow');
  row.innerHTML = '';

  bundles.forEach(b => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-3 mb-0 p-0 px-1';

    const servicesHtml = (b.list_of_services || [])
      .map(sid => `<li class="list-checked-item">${escapeHtml(serviceTitleById(sid))}</li>`)
      .join('');

    col.innerHTML = `
      <div class="card card-lg ps-0 cursor-pointer h-100"
           title="Click to select this bundle."
           data-bundle-id="${escapeHtml(b.bundle_id)}"
           onclick="selectBundle('${escapeHtml(b.bundle_id)}', 'true')">

        <div class="card-header text-center pb-2 ${tierHeaderClass(b.title)}">
          <span class="icon icon-sm icon-circle float-end mt-n1 me-n1 text-light d-none bundle-check"
                style="background-color: rgb(25, 135, 84);">
            <i class="bi bi-check-circle"></i>
          </span>
          <h4 class="card-title text-dark mb-0">${escapeHtml(b.title || 'Bundle')}</h4>
        </div>

        <div class="card-body d-flex flex-column p-3 justify-content-center">
          <p class="mb-3 small text-muted">${escapeHtml(b.description || '')}</p>

          <div class="flex-grow-1 d-flex align-items-center">
            <ul class="list-checked list-checked-primary mb-0 w-100">
              ${servicesHtml || '<li class="text-muted">No services</li>'}
            </ul>
          </div>
        </div>


        <div class="card-footer d-flex justify-content-between align-items-center p-2">
          <small class="text-muted">Updated: ${new Date(Number(b.updated_at) * 1000).toLocaleDateString()}</small>
          ${b.cost
        ? `<span class="badge text-bg-primary">£${Number(b.cost_value || 0).toLocaleString()}</span>`
        : `<span class="badge text-bg-secondary d-none">Included</span>`
      }
        </div>
      </div>
    `;

    row.appendChild(col);
  });
}



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


const homeBtnCard = document.getElementById("wizardHomeBtn");


// Show card on Home
homeBtnCard.addEventListener("click", () => {
  window.location.href = "index.html";
});


// ********************* start bundle selection *********************************






function switchAnchorState(disableSelector, enableSelector, message) {
  const $disableEl = $(disableSelector);
  const $enableEl = $(enableSelector);

  // Disable the first anchor
  $disableEl.removeClass('active')
    .css({ cursor: 'not-allowed', pointerEvents: 'none' })
    .parent().addClass('cursor-no-drop')
    .attr('title', message || 'This action is not allowed.');

  // Enable/activate the second anchor
  $enableEl.addClass('active')
    .css({ cursor: 'pointer', pointerEvents: '' })
    .parent().removeClass('cursor-no-drop')
    .removeAttr('title');

  if (disableSelector === '#DenyListAncherTag') {
    enteredDomainsListPermitORDeny = 'Deny';
  } else {
    enteredDomainsListPermitORDeny = 'Permit';
  }


}
// switchAnchorState('#DenyListAncherTag', '#DenyListAncherTag', 'Permissive list not allowed on this policy.');


function enableElements(selector1, selector2) {
  // Enable form container
  const $el1 = $(selector1);
  $el1.css({
    pointerEvents: '',
    cursor: '',
    backgroundColor: ''
  });
  $el1.find(':input').prop('disabled', false);
  $el1.removeAttr('title');

  // Enable navigation or other items
  const $el2 = $(selector2);
  $el2.css({
    pointerEvents: '',
    cursor: ''
  });

  $('#DomainListFileUpload').css({
    cursor: 'pointer'
  });

  $('#policyDomainListCategorySaveBtn').attr('disabled', true)
  $('#policyDomainListCategorySaveBtn').parent().css('cursor', 'no-drop')

  disabledCheck = true;
}
// Later, enable them again
// enableElements('.IpInputForm', '.IpInputForm .nav-item');


// ********************* end bundle selection *********************************




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
  // muncipalityWizerdFormPopulationSizeInit.addOption(
  //   muncipalityWizerdFormPopulationSizeData
  // );
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

  $("#muncipalityWizerdForm").validate().form();
  if (selectedServices.length > 0) {
    setTheNextButtonTarget(
      "createOrderBundleDivMainDivNextBtn",
      "municipalityWizerdFormOrganizationSnapshot"
    );
    setThePreivousButtonTarget(
      "thiredStepGetAccessCountPreviousBtn",
      "municipalityWizerdFormOrganizationSnapshot"
    );

    // Generate order preview
    previewOrderDetails();

    addNumberingTOtheWizerd();
    reIntiateWizerd();
  } else {

    showNotificationError(
      "bg-orange",
      null,
      null,
      null,
      null,
      null,
      "Select at lest one service or bundle."
    );

    setTheNextButtonTarget(
      "createOrderBundleDivMainDivNextBtn",
      "municipalityWizerdFormBasics"
    );
    setTheNextButtonTarget(
      "secondStepAccountNameNextBtn",
      "municipalityWizerdFormOrganizationSnapshot"
    );

    // addNumberingTOtheWizerd();
    // reIntiateWizerd();
  }
});


// start preview order details
function previewOrderDetails(containerId = '#previewOrderDetails') {
  // Get the container div
  const container = $(containerId);
  
  
  // Clear existing content
  container.empty();
  
  // Get bundle name
  let bundleName = 'Custom Bundle';
  if (selectedBundleID && bundlesDataReceivedFromAPI) {
    const bundle = bundlesDataReceivedFromAPI.find(b => b.bundle_id === selectedBundleID);
    bundleName = bundle?.title || 'Custom Bundle';
  }

  let bg_color = 'bg-primary';
  // if (bundleName == 'Bronze') {
  //   bg_color = 'bg-warning bg-opacity-25 text-dark';
  // } else if (bundleName == 'Silver') {
  //   bg_color = 'bg-secondary bg-opacity-25 text-dark';
  // } else if (bundleName == 'Gold') {
  //   bg_color = ' bg-warning bg-opacity-50 text-dark';
  // }else if (bundleName == 'Custom') {
  //   bg_color = 'bg-light text-dark';
  // }

  $('#selectedBundleName').text(bundleName)
  $('#selectedBundleName').addClass(bg_color)



  
  // Get selected services data
  const selectedServicesData = [];
  if (selectedServices && selectedServices.length > 0 && servicesResponse) {
    selectedServices.forEach(serviceId => {
      const service = servicesResponse.find(s => s.service_id === serviceId);
      if (service) {
        selectedServicesData.push(service);
      }
    });
  }
  
  // Calculate total cost
  let totalCost = 0;
  selectedServicesData.forEach(service => {
    totalCost += parseFloat(service.estimated_cost || 0);
  });
  
  $('#selectedBundleCost').text(`${totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || 0}`)

  
  // Add services section
  if (selectedServicesData.length > 0) {
    
    // Generate service items
    selectedServicesData.forEach(service => {
      const serviceItem = `
        <div class="card mb-3 border">
          <div class="card-header d-flex justify-content-between align-items-center py-2">
            <div>
              <span class="fw-bold text-dark">${service.title || 'Service'}</span>
            </div>
            <div>
              <span class="fw-bold">Cost:</span>
              <span class="fw-bold text-success">${service.estimated_cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || 0}</span>
              <span class="fw-bold text-success">/Monthly</span>

            </div>
          </div>
          <div class="card-body py-2">
            <p class=" mb-0 ">${service.description || 'No description available'}</p>
          </div>
        </div>
      `;
      container.append(serviceItem);
    });
  } else {
    // No services selected
    const noServicesMessage = `
      <div class="text-center py-4">
        <i class="bi bi-info-circle " style="font-size: 2rem;"></i>
        <p class=" mt-2">No services selected</p>
      </div>
    `;
    container.append(noServicesMessage);
  }
}

// end preview order details

// ********************** start set municpilities detsils *********************************

// validation Form Finish Btn
$("#validationFormFinishBtn").on("click", function (e) {
  e.preventDefault();
  if ($("#muncipalityWizerdForm").validate().form()) {
    $("#cover-spin").show(1);
    createOrderBasedOnSelections();
  }
});

function createOrderBasedOnSelections() {

 
  let bundle_name = selectedBundleName
  let bundle_ID = selectedBundleID
  let services_list = selectedServices
  let total_cost = selectedBundleAndServicesCount
  const created_at = Math.floor(Date.now() / 1000);

  const apiBody = JSON.stringify({
    auth_token: authToken,
    created_at,
    bundle_id: bundle_ID,
    list_of_services: services_list,
  });

  // return 0
  $.ajax({
    url: MAIN_API_PATH + createOrderAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);

        showNotificationError("bg-green", null, null, null, null, null, UPDATE);

        window.location.href ='/orders.html'

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
            createOrderBasedOnSelections();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              createOrderBasedOnSelections();
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


