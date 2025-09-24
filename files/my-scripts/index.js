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


let populationSizeCompanyDetailsInit, NumberOfEmployeesSelectInit, NumberOfITEmployeesSelectInit

// wizerd form veriables
let muncipalityWizerdFormPopulationSizeInit, muncipalityWizerdFormKeyPrioritiesUpTo3Init, muncipalityWizerdFormDepartmentsUnderMunicipalityInit
let muncipalityWizerdFormTotalEmployeesInit, muncipalityWizerdFormTotalITEmployeesInit
let muncipalityWizerdFormCloudApplicationInit, muncipalityWizerdFormEndUserDevices, muncipalityWizerdFormServersInit, muncipalityWizerdFormSpecializedDevicesInit
let muncipalityWizerdFormCloudWorkloadsInit, muncipalityWizerdFormNumberOfConnectedSitesInit

$(document).ready(function () {

  // Show main content and hide loader

  $('#mainContentInnerLoader').addClass('d-none')
  $('#mainContentInnerDataToShow').removeClass('d-none')


  populationSizeCompanyDetailsInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('populationSizeCompanyDetails', false);
  NumberOfEmployeesSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('numberOfEmployeesSelect', false);
  NumberOfITEmployeesSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('numberOfITEmployeesSelect', false);
  muncipalityWizerdFormPopulationSizeInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormPopulationSize', false);
  muncipalityWizerdFormKeyPrioritiesUpTo3Init = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormKeyPrioritiesUpTo3', true, null, 3);
  muncipalityWizerdFormDepartmentsUnderMunicipalityInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormDepartmentsUnderMunicipality', true, null);
  muncipalityWizerdFormTotalEmployeesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormTotalEmployees', false);
  muncipalityWizerdFormTotalITEmployeesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormNumberOfITEmployees', false);

  muncipalityWizerdFormCloudApplicationInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormCloudApplication', false);
  muncipalityWizerdFormEndUserDevicesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormEndUserDevices', false);
  muncipalityWizerdFormServersInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormServers', false);
  muncipalityWizerdFormSpecializedDevicesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormSpecializedDevices', false);
  muncipalityWizerdFormCloudWorkloadsInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormCloudWorkloads', false);
  muncipalityWizerdFormNumberOfConnectedSitesInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('muncipalityWizerdFormNumberOfConnectedSites', false);




  // First Data Table Initialization
  ordersDataTableInit = createTableComponent(dataSourceIPconfig, options)



  //  validation rules define
  $('#muncipalityWizerdForm').validate({
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
      municipalityWizerdFormContactName: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      muncipalityWizerdFormEmail: {
        required: true,
        email: true
      },
      muncipalityWizerdFormPhone: {
        required: true,
        validUSPhone: true
      },
      muncipalityWizerdFormCountryWebsiteURL: {
        required: true,
        urlsCountryValidation: true
      },
      muncipalityWizerdFormKeyPrioritiesUpTo3: {
        minlength: 3,
        required: true,
      },
      cyberVendors: {   // must match the "name" attribute in your radio inputs
        required: true
      }
    },
    messages: {
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
        required: "Please select an option."
      },
    },
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
      if (element.attr("name") === "cyberVendors") {
        error.appendTo(element.parent().parent().parent())
      } else {
        error.appendTo(element.parent())
      }
    }
  })



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

  updateFiltersSelectDataOptions()




});

// wizerd Next button
$('.formNextButton').on('click', function () {
  //   $('#addNewAccountWizerdForm').removeClass('was-validated')
  $('#muncipalityWizerdForm').validate().form()
})



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
function getOrdersTableData(skip, page) {
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
      order_id: 'ORD12345',
      municipality: 'Springfield',
      service: 'Cloud Hosting',
      date: '2024-01-15',
      payment: 'Paid',
      status: 'In Provisioning',
    },
    {
      order_id: 'ORDdf5',
      municipality: 'Springfield',
      service: 'Cloud Hosting',
      date: '2024-01-13',
      payment: 'Pending',
      status: 'Pending Kickoff',
    },




  ]



  // 204 case
  $('#mainContent').addClass('d-none')
  $('#pageErrorCard').removeClass('d-none')
  $('#pageErrorCardText').html(`No details found! click to add details. <span class='text-decoration-underline cursor-pointer text-primary' id='clickToOpenModal'>Modal</span>, <span class='text-decoration-underline cursor-pointer text-primary' id='clickToOpenWizerd'>Wizerd</span>`)




  hideDataTableLoader200('ordersDataTable')

  // Response data (IPs)
  response = data
  ordersDataReceived = response
  localStorage.setItem('ordersDataTableTotal', data.length)
  // If No IPs found

  // loop through response to add data in datatable
  for (let i = 0; i < response.length; i++) {


    let order_id = generateSpan(response[i], 'order_id', '', '')
    let municipality = generateSpan(response[i], 'municipality', '', '')
    let service = generateSpan(response[i], 'service', '', '')
    let date = generateSpan(response[i], 'date', '', '')
    let payment = generateSpan(response[i], 'payment', '', '')
    let status = generateSpan(response[i], 'status', '', '')
    if (response[i].status === 'Pending Kickoff') {
      status = `<div class='d-flex flex-column'>
      ${status}
      <button class="btn btn-sm btn-danger view-order-details p-1 ms-2 px-4" style='font-size: 10px; width: fit-content' data-order-id="${response[i].order_id}">Pay Now</button>
      </div>      
      `
    }

    let actions = `
      <button class="btn btn-sm btn-primary view-order-details" data-order-id="${response[i].order_id}">View Details</button>
      <button class="btn btn-sm btn-secondary download-invoice" data-order-id="${response[i].order_id}">Download Invoice</button>
    `



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
      .draw()
    datatablePagination('ordersDataTable', 1, 'ordersDataTableTotal', getOrdersTableData)



    let viewOrderDetailsButtons = document.querySelectorAll('.view-order-details');
    viewOrderDetailsButtons.forEach(button => {
      button.addEventListener('click', function () {
        let orderId = this.getAttribute('data-order-id');
        // Redirect to order details page
        showOrderDetails(orderId);
      });
    });


  }
}



// function to export data from datatable
function exportOrdersDataTableData() {
  console.log('exportOrdersDataTableData called')
}




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


// href click to open modal
$(document).on('click', '#clickToOpenModal', function () {
  $('#companyDetailsFormModal').modal('show');
});

// href click to open wizerd
$(document).on('click', '#clickToOpenWizerd', function () {
  $('#pageErrorCard, #mainContentInnerDataToShow').addClass('d-none');
  $('#mainContent, #mainContentInnerWizerdFormToShow').removeClass('d-none')
  $("html, body").animate(
    { scrollTop: $("#mainContentInnerWizerdFormToShow").offset().top },
    600 // duration in ms (600ms = smooth speed)
  );
});


$(document).on('click', '#closeWizerd', function () {
  $('#mainContentInnerDataToShow, #mainContent, #mainContentInnerWizerdFormToShow').addClass('d-none');
  $('#pageErrorCard').removeClass('d-none')
  $("html, body").animate(
    { scrollTop: $("#mainContentInnerWizerdFormToShow").offset().top },
    600 // duration in ms (600ms = smooth speed)
  );
});





// municipality size population data
let filterSizeData = [
  { id: 'small', title: 'Less than 50,000' },
  { id: 'medium', title: '50,000 - 500,000' },
  { id: 'large', title: 'More than 500,000' },
]

// number of employees data
let numberOfEmployeesData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]


let numberOfITEmployeesData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]


// wizerd form population data
let muncipalityWizerdFormPopulationSizeData = [
  { id: 'small', title: '<10,000' },
  { id: 'medium', title: '10,000-50,000' },
  { id: 'large', title: '50,000-100,000' },
  { id: 'xlarge', title: '>100,000' },
]

let muncipalityWizerdFormKeyPrioritiesUpTo3Data = [
  { id: 'improveCybersecurity', title: 'Improve cybersecurity' },
  { id: 'upgradeITSystem', title: 'Upgrade IT systems' },
  { id: 'expandDigitalServicesForCitizens', title: 'Expand digital services for citizens' },
  { id: 'impoveComplianceRegulatoryPosture', title: 'Improve compliance/regulatory posture' },
  { id: 'other', title: 'Other' },
]

let muncipalityWizerdFormDepartmentsUnderMunicipalityData = [
  { id: 'policeFireEMS', title: 'Police / Fire / EMS' },
  { id: 'utilities', title: 'Utilities (Water, Power, Waste)' },
  { id: 'financeTax', title: 'Finance / Tax' },
  { id: 'publicWorks', title: 'Public Works' },
  { id: 'parksRecreation', title: 'Parks & Recreation' },
  { id: 'other', title: 'Other' },
]

let muncipalityWizerdFormNumberOfEmployeesData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]


let muncipalityWizerdFormMumberOfITEmployeesData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]


let muncipalityWizerdFormCloudApplicationData = [
  { id: 'microsoft365', title: 'Microsoft 365' },
  { id: 'googleWorkspace', title: 'Google Workspace' },
  {id: 'otherBusinessApplications', title: 'Other business applications' },
  { id: 'none', title: 'None / Not sure' },
]

let muncipalityWizerdFormEndUserDevicesData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]

let muncipalityWizerdFormServersData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]

let muncipalityWizerdFormSpecializedDevicesData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]


let muncipalityWizerdFormCloudWorkloadsData = [
  { id: 'mostlyCloudBased', title: 'Mostly cloud-based' },
  { id: 'mixOfCloudAndLocalSevers', title: 'Mix of cloud and local servers' },
  { id: 'mostlyOnPremises', title: 'Mostly on-premises' },
  { id: 'none', title: 'Not sure' },
]

let muncipalityWizerdFormNumberOfConnectedSitesData = [
  { id: '1', title: '1' },
  { id: '2-5', title: '2-5' },
  { id: '6-10', title: '6-10' },
  { id: '11-20', title: '11-20' },
  { id: '21+', title: '21+' },
]


// update select data options
function updateFiltersSelectDataOptions() {

  populationSizeCompanyDetailsInit.addOption(filterSizeData);
  populationSizeCompanyDetailsInit.setValue('small')

  NumberOfEmployeesSelectInit.addOption(numberOfEmployeesData);
  NumberOfEmployeesSelectInit.setValue('51-200')

  NumberOfITEmployeesSelectInit.addOption(numberOfITEmployeesData);
  NumberOfITEmployeesSelectInit.setValue('1-50')

  // wizerd form population data
  muncipalityWizerdFormPopulationSizeInit.addOption(muncipalityWizerdFormPopulationSizeData);
  // muncipalityWizerdFormPopulationSizeInit.setValue('small')

  muncipalityWizerdFormKeyPrioritiesUpTo3Init.addOption(muncipalityWizerdFormKeyPrioritiesUpTo3Data);
  // muncipalityWizerdFormKeyPrioritiesUpTo3Init.setValue('improveCybersecurity')

  muncipalityWizerdFormDepartmentsUnderMunicipalityInit.addOption(muncipalityWizerdFormDepartmentsUnderMunicipalityData);
  // muncipalityWizerdFormDepartmentsUnderMunicipalityInit.setValue('policeFireEMS')

  muncipalityWizerdFormTotalEmployeesInit.addOption(muncipalityWizerdFormNumberOfEmployeesData);
  // muncipalityWizerdFormTotalEmployeesInit.setValue('51-200')

  muncipalityWizerdFormTotalITEmployeesInit.addOption(muncipalityWizerdFormMumberOfITEmployeesData);
  // muncipalityWizerdFormTotalITEmployeesInit.setValue('1-50')

  muncipalityWizerdFormCloudApplicationInit.addOption(muncipalityWizerdFormCloudApplicationData);
  // muncipalityWizerdFormCloudApplicationInit.setValue('microsoft365')

  muncipalityWizerdFormEndUserDevicesInit.addOption(muncipalityWizerdFormEndUserDevicesData);
  // muncipalityWizerdFormEndUserDevicesInit.setValue('51-200')

  muncipalityWizerdFormServersInit.addOption(muncipalityWizerdFormServersData);
  // muncipalityWizerdFormServersInit.setValue('1-50')

  muncipalityWizerdFormSpecializedDevicesInit.addOption(muncipalityWizerdFormSpecializedDevicesData);
  // muncipalityWizerdFormSpecializedDevicesInit.setValue('1-50')

  muncipalityWizerdFormCloudWorkloadsInit.addOption(muncipalityWizerdFormCloudWorkloadsData);
  // muncipalityWizerdFormCloudWorkloadsInit.setValue('mostlyCloudBased')

  muncipalityWizerdFormNumberOfConnectedSitesInit.addOption(muncipalityWizerdFormNumberOfConnectedSitesData);
  // muncipalityWizerdFormNumberOfConnectedSitesInit.setValue('1')

}






