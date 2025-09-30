const options1 = JSON.stringify({
  dom: 'Bfrtip',
  columnDefs: [
    {
      targets: [0, 4],
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

const createBundleDataTable = {
  "tableHTMLIdToAppend": "createBundleDataTableContainer", 
  "tableName": "Inventory",
  "tableId": "createBundleDataTable", 
  "tableExportFunc": exportCreateBundleDataTableData, 
  "tableMainApiCallFunc": getCreateBundleTableData, 
  "tableIndexNo": 2, 
  "tablePagination": true,
  "tableHeaderHTMLContent": ` <div class="d-flex">
                                <a  class="btn btn-outline-primary read_only" id="createBundleBtn" href="create-bundle.html">
                                    Create Bundle
                                </a>
                              </div>`,
  "columns": [
    { "name": "Title", "id": "title", "columnNo": 0, "visible": true },
    { "name": "Description", "id": "description", "columnNo": 1, "visible": true },
    { "name": "Service", "id": "service", "columnNo": 2, "visible": true },
    { "name": "Availability", "id": "availability", "columnNo": 3, "visible": true },
    { "name": "Created At", "id": "created_at", "columnNo": 4, "visible": true },
    { "name": "Actions", "id": "actions", "columnNo": 5, "visible": true }
  ],
  "searchFields": {
    "searchFunctionForSearchObj": createBundleSearchObjectCreation,
    "fields": [
      {
        "label": "Title",
        "id": "title",
        "placeholder": "Enter Title",
        "type": "text",
        "checked": true,
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
  "filterFields": [
    {
      "type": "text",
      "label": "Title",
      "id": "title",
      "placeholder": "Enter Title",
      "columnNo": 0,
      "hidden": false 
    },
    {
      "type": "text",
      "label": "Service",
      "id": "service",
      "placeholder": "Enter Service",
      "columnNo": 1,
      "hidden": false 
    },
    {
      "type": "text",
      "label": "Availability",
      "id": "availability",
      "placeholder": "Enter Availability",
      "columnNo": 2,
      "hidden": false 
    }
  ],
  "tableHeader": [
    { "name": "Title", "widthClass": "w-5" },
    { "name": "Description", "widthClass": "w-5" },
    { "name": "Service", "widthClass": "w-5" },
    { "name": "Availability", "widthClass": "w-5" },
    { "name": "Created At", "widthClass": "w-5" },
    { "name": "Actions", "widthClass": "w-5" }
  ],
};


const enrolServicesCreatBundleDataTable = {
  "tableHTMLIdToAppend": "enroleServicesForCreateBundleTableContainer", //append to html DOM Id (Required)
  "tableName": "Services",
  "tableId": "enrolServicesDataTable", //table name (Unique) Required
  "tableExportFunc": exportenrolServicesDataTableData, // Null = d-none // ""= for no pagination // functionName for 
  "tableMainApiCallFunc": getEnrollServicesTableData, // Main API Call function name for datatable
  "tableIndexNo": 3, // Table number (Required)
  "tablePagination": true,
  "tableHeaderHTMLContent": `<div class="d-flex">
                                <p class='mb-0 d-none' id='totalCostMainDiv'>
                                    Total cost <span class='fw-bold' id='totalCosecalculated'>$0.00</span>
                                </p>
                              </div>`,
  // "columns": null,
  "columns": [

    { "name": "Description", "id": "description", "columnNo": 1, "visible": true },
    { "name": "Cost Type", "id": "cost_type", "columnNo": 2, "visible": true },
    { "name": "Estimated cost", "id": "estimated_cost", "columnNo": 3, "visible": true },


  ],
  //  "searchFields": null,
  "searchFields": {
    // "searchFuncForTomSelect": searchFunctionForTomSelectInit, // if we have tom select in search make a function
    "searchFunctionForSearchObj": enrollServicesSearchObjectCreation,
    "fields": [
      {
        "label": "Title",
        "id": "title",
        "placeholder": "Enter title",
        "type": "text",
        "checked": true,
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


  ],
  "tableHeader": [
    { "name": ` <input type="checkbox" name="select-all-services" id="selectAllServicesList">`, "widthClass": "w-3" },
    { "name": "Title", "widthClass": "w-5" },
    { "name": "description", "widthClass": "w-5" },
    { "name": "cost type", "widthClass": "w-5" },
    { "name": "Estimated Cost", "widthClass": "w-5" },

  ],
};


