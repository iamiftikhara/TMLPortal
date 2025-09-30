const options = JSON.stringify({
  dom: 'Bfrtip',
  columnDefs: [
    {
      targets: [0, 1],
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
  "tableHTMLIdToAppend": "serviceManagementDataTableContainer", //append to html DOM Id (Required)
  "tableName": "Inventory",
  "tableId": "serviceManagementDataTable", //table name (Unique) Required
  "tableExportFunc": exportServiceManagementDataTableData, // Null = d-none // ""= for no pagination // functionName for 
  "tableMainApiCallFunc": getServiceManagementTableData, // Main API Call function name for datatable
  "tableIndexNo": 1, // Table number (Required)
  "tablePagination": true,
  "tableHeaderHTMLContent": ` <div class="d-flex">
                                <button type="button" class="btn btn-outline-primary read_only" data-bs-toggle="modal"
                                    data-bs-target="#serviceManagementDetailsModal">
                                    System Management
                                </button>
                              </div>`,
  // "columns": null,
  "columns": [

    { "name": "Municipality", "id": "municipality", "columnNo": 1, "visible": true },
    { "name": "Service", "id": "service", "columnNo": 2, "visible": true },
    { "name": "Date", "id": "date", "columnNo": 3, "visible": true },
    { "name": "Payment", "id": "payment", "columnNo": 4, "visible": true },
    { "name": "Status", "id": "status", "columnNo": 5, "visible": true },
    { "name": "Actions", "id": "actions", "columnNo": 6, "visible": true }

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
      "columnNo": 0,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Municipality",
      "id": "municipality",
      "placeholder": "Enter Municipality",
      "columnNo": 1,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Service",
      "id": "service",
      "placeholder": "Enter Service",
      "columnNo": 2,
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
    { "name": "Title", "widthClass": "w-5" },
    { "name": "description", "widthClass": "w-5" },
    { "name": "estimated cost", "widthClass": "w-5" },
    { "name": "cost type", "widthClass": "w-5" },
    { "name": "cost unit", "widthClass": "w-5" },
    { "name": "availability", "widthClass": "w-5" },
    { "name": "Actions", "widthClass": "w-5" }
  ],
};


