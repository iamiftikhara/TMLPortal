const options = JSON.stringify({
  dom: 'Bfrtip',
  columnDefs: [
    {
      // targets: [0, 1],
      targets: [0, 5],
      orderable: false,
      // orderable: true
    }
  ],
  order: [
    // Custom order
  ],
  pageLength: 10,
  isResponsive: true,
  isShowPaging: true
})



const dataSourceIPconfig = {
  "tableHTMLIdToAppend": "ordersDataTableContainer", //append to html DOM Id (Required)
  "tableName": "My Orders",
  "tableId": "ordersDataTable", //table name (Unique) Required
  "tableExportFunc": exportOrdersDataTableData, // Null = d-none // ""= for no pagination // functionName for 
  "tableMainApiCallFunc": getOrdersTableData, // Main API Call function name for datatable
  "tableIndexNo": 1, // Table number (Required)
  "tablePagination": true,
  "tableHeaderHTMLContent": ` <div class="d-flex">
                                <button type="button" class="btn btn-primary btn-sm read_only" data-bs-toggle="modal"
                                    data-bs-target="#addUserDetailsModal">
                                    Create Order
                                </button>
                              </div>`,
  // "columns": null,
  "columns": [

    { "name": "selectAllServicesList", "id": "selectAllServicesList", "columnNo": 1, "visible": true },
    { "name": "Municipality", "id": "municipality", "columnNo": 2, "visible": true },
    { "name": "Service", "id": "service", "columnNo": 3, "visible": true },
    { "name": "Date", "id": "date", "columnNo": 4, "visible": true },
    { "name": "Payment", "id": "payment", "columnNo": 5, "visible": true },
    { "name": "Status", "id": "status", "columnNo": 6, "visible": true },
    { "name": "Actions", "id": "actions", "columnNo": 7, "visible": true }

  ],
  //  "searchFields": null,
  "searchFields": {
    // "searchFuncForTomSelect": searchFunctionForTomSelectInit, // if we have tom select in search make a function
    "searchFunctionForSearchObj": searchObjectCreation,
    "fields": [
      {
        "label": "Order ID",
        "id": "order_id",
        "placeholder": "Enter Order ID",
        "type": "text",
        "checked": true,
      },
      {
        "label": "Municipality",
        "id": "municipality",
        "placeholder": "Enter Municipality",
        "type": "text",
        "checked": false,
      },
      {
        "label": "Service",
        "id": "service",
        "placeholder": "Enter Service",
        "type": "text",
        "checked": false,
      }
    ]
  },
  // "filterFields": null,
  "filterFields": [
    {
      "type": "text",
      "label": "Order ID",
      "id": "order_id",
      "placeholder": "Enter Order ID",
      "columnNo": 1,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Municipality",
      "id": "municipality",
      "placeholder": "Enter Municipality",
      "columnNo": 2,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Service",
      "id": "service",
      "placeholder": "Enter Service",
      "columnNo": 3,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Payment",
      "id": "payment",
      "placeholder": "Enter Payment",
      "columnNo": 4,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Status",
      "id": "status",
      "placeholder": "Enter Status",
      "columnNo": 5,
      "hidden": false // This field is shown
    }



  ],
  "tableHeader": [
    { "name": `<input type="checkbox" name="select-all-services" id="selectAllServicesList"></input>`, "widthClass": "w-5" },
    { "name": "Order ID", "widthClass": "w-5" },
    { "name": "Municipality", "widthClass": "w-5" },
    { "name": "Service", "widthClass": "w-5" },
    { "name": "Date", "widthClass": "w-5" },
    { "name": "Payment", "widthClass": "w-5" },
    { "name": "Status", "widthClass": "w-5" },
    { "name": "Actions", "widthClass": "w-5" }
  ],
};


