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
                                <button type="button" class="btn btn-primary btn-sm read_only" id="createOrderBtn">
                                    Create Order
                                </button>
                              </div>`,
  // "columns": null,
  "columns": [
    { "name": "Order Name", "id": "order_name", "columnNo": 1, "visible": true },
    { "name": "Service", "id": "service", "columnNo": 2, "visible": true },
    { "name": "Payment", "id": "payment", "columnNo": 3, "visible": true },
    { "name": "Status", "id": "status", "columnNo": 4, "visible": true },
    { "name": "Actions", "id": "actions", "columnNo": 5, "visible": true },
    { "name": "Created At", "id": "created_at", "columnNo": 6, "visible": true },
    { "name": "Updated At", "id": "updated_at", "columnNo": 7, "visible": true },



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
        "label": "Order Name",
        "id": "order_name",
        "placeholder": "Enter Order Name",
        "type": "text",
        "checked": true,
      },
      {
         "label": "Status",
        "id": "status",
        "placeholder": "Enter Status",
        "type": "text",
        "checked": true,
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
      "columnNo": 0,
      "hidden": false // This field is shown
    },
     {
      "type": "text",
      "label": "Order Name",
      "id": "order_name",
      "placeholder": "Enter Order Name",
      "columnNo": 1,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Payment",
      "id": "payment",
      "placeholder": "Enter Payment",
      "columnNo": 3,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Status",
      "id": "status",
      "placeholder": "Enter Status",
      "columnNo": 4,
      "hidden": false // This field is shown
    }



  ],
  "tableHeader": [
    { "name": "Order ID", "widthClass": "w-5" },
    { "name": "Order Name", "widthClass": "w-5" },
    { "name": "Service", "widthClass": "w-5" },
    { "name": "Payment", "widthClass": "w-5" },
    { "name": "Status", "widthClass": "w-5" },
    { "name": "Actions", "widthClass": "w-5" },
    { "name": "Created At", "widthClass": "w-5" },
    { "name": "Updated At", "widthClass": "w-" },
  ],
};


