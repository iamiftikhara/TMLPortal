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
    if(response[i].status === 'Pending Kickoff'){
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