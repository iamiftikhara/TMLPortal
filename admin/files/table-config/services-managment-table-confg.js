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
  "tableName": "Services",
  "tableId": "serviceManagementDataTable", //table name (Unique) Required
  "tableExportFunc": exportServiceManagementDataTableData, // Null = d-none // ""= for no pagination // functionName for 
  "tableMainApiCallFunc": getServiceManagementTableData, // Main API Call function name for datatable
  "tableIndexNo": 1, // Table number (Required)
  "tablePagination": true,
  "tableHeaderHTMLContent": ` <div class="d-flex">
                                <button type="button" class="btn btn-outline-primary read_only" data-bs-toggle="modal"
                                    data-bs-target="#serviceManagementDetailsModal">
                                    Add Service
                                </button>
                              </div>`,
  // "columns": null,
  "columns": [

    { "name": "Description", "id": "description", "columnNo": 1, "visible": true },
    { "name": "Estimated cost ($)", "id": "estimatedCost", "columnNo": 2, "visible": true },
    { "name": "Cost type", "id": "costType", "columnNo": 3, "visible": true },
    // { "name": "Payment", "id": "payment", "columnNo": 4, "visible": true },
    { "name": "Availability", "id": "availability", "columnNo": 4, "visible": true },
    { "name": "Actions", "id": "actions", "columnNo": 5, "visible": true }

  ],
  //  "searchFields": null,
  "searchFields": {
    // "searchFuncForTomSelect": searchFunctionForTomSelectInit, // if we have tom select in search make a function
    "searchFunctionForSearchObj": searchObjectCreation,
    "fields": [
      {
        "label": "Title",
        "id": "title",
        "placeholder": "Enter title",
        "type": "text",
        "checked": true,
      },
      {
        "label": "Description",
        "id": "description",
        "placeholder": "Enter description",
        "type": "text",
        "checked": false,
      },
      {
        "label": "Estimated cost ($)",
        "id": "estimatedCost",
        "placeholder": "Enter estimated cost ($)",
        "type": "text",
        "checked": false,
      },
    ]
  },
  // "filterFields": null,
  "filterFields": [
    {
      "type": "text",
      "label": "Title",
      "id": "title",
      "placeholder": "Enter title",
      "columnNo": 0,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Description",
      "id": "description",
      "placeholder": "Enter description",
      "columnNo": 1,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Estimated cost ($)",
      "id": "estimatedCost",
      "placeholder": "Enter estimated cost ($)",
      "columnNo": 2,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Cost type",
      "id": "costType",
      "placeholder": "Enter Cost type",
      "columnNo": 3,
      "hidden": false // This field is shown
    },
    // {
    //   "type": "text",
    //   "label": "Availability",
    //   "id": "availability",
    //   "placeholder": "Enter availability",
    //   "columnNo": 4,
    //   "hidden": false // This field is shown
    // }



  ],
  "tableHeader": [
    { "name": "Title", "widthClass": "w-5" },
    { "name": "description", "widthClass": "w-5" },
    { "name": "estimated cost ($)", "widthClass": "w-5" },
    { "name": "cost type", "widthClass": "w-5" },
    // { "name": "cost unit", "widthClass": "w-5" },
    { "name": "availability", "widthClass": "w-5" },
    { "name": "Actions", "widthClass": "w-5" }
  ],
};


