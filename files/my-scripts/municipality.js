
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

// municipality WizerdForm veriables
let filterSizeData;
let numberOfEmployeesData;
let numberOfITEmployeesData;
let muncipalityWizerdFormPopulationSizeData;
let muncipalityWizerdFormKeyPrioritiesUpTo3Data;
let muncipalityWizerdFormDepartmentsUnderMunicipalityData;
let muncipalityWizerdFormNumberOfEmployeesData;
let muncipalityWizerdFormMumberOfITEmployeesData;
let muncipalityWizerdFormCloudApplicationData;
let muncipalityWizerdFormEndUserDevicesData;
let muncipalityWizerdFormServersData;
let muncipalityWizerdFormSpecializedDevicesData;
let muncipalityWizerdFormCloudWorkloadsData;
let muncipalityWizerdFormNumberOfConnectedSitesData;

let muncipalityWizerdFormCompliancesInUseInit

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
  muncipalityWizerdFormCompliancesInUseInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "muncipalityWizerdFormCompliancesInUse",
      true,
      null
    );

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
      municipalityWizerdFormContactFirstName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      municipalityWizerdFormContactLastName: {
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


      // signup form
      signupFirstName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true

      },
      signupLastName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true

      },
      signupUserName: {
        onlyDigitsNotAllowed: true,
        atLeastOneCharacter: true,
        SpecialCharactersAllowedWithNotSpace: true


      },
      signupUserEmail: {
        required: true,
        email: true
      },
      signupUserPassword: {
        strongPassword: true
      },
      signupUserRepeatPassword: {
        equalTo: '#signupUserPassword'
      },
      signupUserOrgnization: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        onlyDigitsNotAllowed: true
      },
      signupUserRole: {
        required: true
      }


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


  updateFiltersSelectDataOptions();
  reIntiateWizerd();

  // get cloud listing
  getCludApplicationsData()

  // get cloud workloads listing
  getCludAppWorkLoadsData()

  // get compliance listing
  getCompliancesData()

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
  filterSizeData = [
    { id: "<50000", title: "<50,000" },
    { id: "50000-500000", title: "50,000-500,000" },
    { id: ">500000", title: ">500,000" },
  ];

  // number of employees data
  numberOfEmployeesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  numberOfITEmployeesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  // wizerd form population data
  muncipalityWizerdFormPopulationSizeData = [
    { id: "<10000", title: "<10,000" },
    { id: "10000-50000", title: "10,000-50,000" },
    { id: "50000-100000", title: "50,000-100,000" },
    { id: ">100000", title: ">100,000" },
  ];

  muncipalityWizerdFormKeyPrioritiesUpTo3Data = [
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

  muncipalityWizerdFormDepartmentsUnderMunicipalityData = [
    { id: "policeFireEMS", title: "Police / Fire / EMS" },
    { id: "utilities", title: "Utilities (Water, Power, Waste)" },
    { id: "financeTax", title: "Finance / Tax" },
    { id: "publicWorks", title: "Public Works" },
    { id: "parksRecreation", title: "Parks & Recreation" },
    { id: "other", title: "Other" },
  ];

  muncipalityWizerdFormNumberOfEmployeesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  muncipalityWizerdFormMumberOfITEmployeesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];



  muncipalityWizerdFormEndUserDevicesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  muncipalityWizerdFormServersData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];

  muncipalityWizerdFormSpecializedDevicesData = [
    { id: "1-50", title: "1-50" },
    { id: "51-200", title: "51-200" },
    { id: "201-500", title: "201-500" },
    { id: "501-1000", title: "501-1000" },
    { id: "1001+", title: "1001+" },
  ];


  muncipalityWizerdFormNumberOfConnectedSitesData = [
    { id: "1", title: "1" },
    { id: "2-5", title: "2-5" },
    { id: "6-10", title: "6-10" },
    { id: "11-20", title: "11-20" },
    { id: "21+", title: "21+" },
  ];




  // populationSizeCompanyDetailsInit.addOption(filterSizeData);
  // populationSizeCompanyDetailsInit.setValue("<50000");

  // NumberOfEmployeesSelectInit.addOption(numberOfEmployeesData);
  // NumberOfEmployeesSelectInit.setValue("51-200");

  // NumberOfITEmployeesSelectInit.addOption(numberOfITEmployeesData);
  // NumberOfITEmployeesSelectInit.setValue("1-50");

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


  // muncipalityWizerdFormCloudApplicationInit.setValue('microsoft365')

  // muncipalityWizerdFormEndUserDevicesInit.addOption(muncipalityWizerdFormEndUserDevicesData);
  // muncipalityWizerdFormEndUserDevicesInit.setValue('51-200')

  // muncipalityWizerdFormServersInit.addOption(muncipalityWizerdFormServersData);
  // muncipalityWizerdFormServersInit.setValue('1-50')

  // muncipalityWizerdFormSpecializedDevicesInit.addOption(muncipalityWizerdFormSpecializedDevicesData);
  // muncipalityWizerdFormSpecializedDevicesInit.setValue('1-50')

  // muncipalityWizerdFormCloudWorkloadsInit.setValue('mostlyCloudBased')


  // muncipalityWizerdFormCompliancesInUseInit.setValue('complianceWithRegulations')

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


  // update the signup fields
  const municipality_name = $("#municipalityWizerdFormName").val();
  const primary_contact_first_name = $("#municipalityWizerdFormContactFirstName").val();
  const primary_contact_last_name = $("#municipalityWizerdFormContactLastName").val();
  const primary_contact_email = $("#muncipalityWizerdFormEmail").val();


  $('#signupFirstName').val(primary_contact_first_name);
  $('#signupLastName').val(primary_contact_last_name);
  $('#signupUserEmail').val(primary_contact_email);
  $('#signupUserOrgnization').val(municipality_name);

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
  const primary_contact_first_name = $("#municipalityWizerdFormContactFirstName").val();
  const primary_contact_last_name = $("#municipalityWizerdFormContactLastName").val();

  const primary_contact_email = $("#muncipalityWizerdFormEmail").val();
  const primary_contact_phone = $("#muncipalityWizerdFormPhone").val();
  const website_url = $("#muncipalityWizerdFormCountryWebsiteURL").val();
  // 1. Get selected IDs (array)
  const selectedKeys = $("#muncipalityWizerdFormKeyPrioritiesUpTo3").val() || [];

  // 2. Map each ID to its matching title
  const key_priorities = selectedKeys.map(id => {
    const found = muncipalityWizerdFormKeyPrioritiesUpTo3Data.find(item => item.id === id);
    return found ? found.title : id; // fallback to id if no match
  });

  console.log(key_priorities);

  const selectedDepartments = $("#muncipalityWizerdFormDepartmentsUnderMunicipality").val() || [];
  // 2. Map each ID to its matching title
  const departments = selectedDepartments.map(id => {
    const found = muncipalityWizerdFormDepartmentsUnderMunicipalityData.find(item => item.id === id);
    return found ? found.title : id; // fallback to id if no match
  });

  const total_employees =
    parseInt($("#muncipalityWizerdFormTotalEmployees").val()) || 0;
  const it_employees =
    parseInt($("#muncipalityWizerdFormNumberOfITEmployees").val()) || 0;
  const outsourced_it = $('input[name="cyberVendors"]:checked').val();




  



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


  // others
  const using_pishing = $(
    'input[name="usingPhishingDetectionTools"]:checked'
  ).val();

  // cloudapps
  const selectedCloudApps = $("#muncipalityWizerdFormCloudApplication").val();
  const cloud_apps_in_use = selectedCloudApps.map(id => {
    const found = muncipalityWizerdFormCloudApplicationData.find(item => item.id === id);
    return found ? found.id : id; // fallback to id if no match
  });

  const selectedCloudWorkLoads = $("#muncipalityWizerdFormCloudWorkloads").val();
  const cloud_workloads_in_use = selectedCloudWorkLoads.map(id => {
    const found = muncipalityWizerdFormCloudWorkloadsData.find(item => item.id === id);
    return found ? found.id : id; // fallback to id if no match
  });

  const selectedCompliancesInUse = $("#muncipalityWizerdFormCompliancesInUse").val();
  const compliances_in_use = selectedCompliancesInUse.map(id => {
    const found = muncipalityWizerdFormCompliancesInUse.find(item => item.id === id);
    return found ? found.id : id; // fallback to id if no match
  });



  // 


  // Current epoch time in **seconds**
  const created_at = Math.floor(Date.now() / 1000);

  let munciplity_Details_get_from_wizard = {
    municipality_name,
    county,
    population_size,
    primary_contact_first_name,
    primary_contact_last_name,
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
    phishing: using_pishing,
    compliance: compliances_in_use,
    created_at,
  };



  singUpUserForMunicipality(munciplity_Details_get_from_wizard)
  // console.log("payload", payload);
  // return


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
$(document).on("click", "#createOrderBtn", function () {
  window.location.href = "/create-order.html";
});
// ================= END: Create Order Button Click Event =================




// get data of clouds
function getCludApplicationsData() {
  const apiBody = JSON.stringify({
    asset_type: 'Cloud storage',
  });

  // return 0
  $.ajax({
    url: MAIN_API_PATH + getCytexModuleAssetsAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);
        //  const data = response.message;
        const apiData = data.message;


        let formattedArray = Object.entries(apiData).map(([key, value]) => ({
          id: key,
          title: value
        }));

        muncipalityWizerdFormCloudApplicationData = formattedArray

        muncipalityWizerdFormCloudApplicationInit.addOption(
          muncipalityWizerdFormCloudApplicationData
        );

      },
      204: function () {
        $("#cover-spin").hide();


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
            getCludApplicationsData();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              getCludApplicationsData();
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
// end data of clouds


// get data of clouds
function getCludAppWorkLoadsData() {
  const apiBody = JSON.stringify({
    asset_type: 'Compliance'
  });

  // return 0
  $.ajax({
    url: MAIN_API_PATH + getCytexModuleAssetsAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);
        //  const data = response.message;
        const apiData = data.message;



        let formattedArray = Object.entries(apiData).map(([key, value]) => ({
          id: key,
          title: value
        }));

        muncipalityWizerdFormCloudWorkloadsData = formattedArray

        muncipalityWizerdFormCloudWorkloadsInit.addOption(
          muncipalityWizerdFormCloudWorkloadsData
        );

      },
      204: function () {
        $("#cover-spin").hide();


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
            getCludApplicationsData();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              getCludApplicationsData();
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
// end data of clouds


// get data of Compliances
function getCompliancesData() {
  const apiBody = JSON.stringify({
    // asset_type: 'Compliance'
  });

  // return 0
  $.ajax({
    url: MAIN_API_PATH + getCytexFramWorksListAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: apiBody,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);
        //  const data = response.message;
        const apiData = data.message;



        // let formattedArray = Object.entries(apiData).map(([key, value]) => ({
        //   id: key,
        //   title: value
        // }));

        function formatFrameworks(data) {
          return data.map(item => ({
            title: item.framework,
            id: item.c_of
          }));
        }

        let formattedArray = formatFrameworks(apiData);

        muncipalityWizerdFormCompliancesInUse = formattedArray




        muncipalityWizerdFormCompliancesInUseInit.addOption(
          muncipalityWizerdFormCompliancesInUse
        );


      },
      204: function () {
        $("#cover-spin").hide();


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
            getCompliancesData();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              getCompliancesData();
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
// end data of Compliances
