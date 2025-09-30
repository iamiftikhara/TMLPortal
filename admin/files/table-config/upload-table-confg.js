const options4 = JSON.stringify({
  dom: 'Bfrtip',
  columnDefs: [
    {
      targets: [0, 5],
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



const addFilesDataTableShow = {
  "tableHTMLIdToAppend": "uploadFileDataTableContainer", //append to html DOM Id (Required)
  "tableName": "Resources",
  "tableId": "addFilesDataTable", //table name (Unique) Required
  "tableExportFunc": exportaddFilesDataTableData, // Null = d-none // ""= for no pagination // functionName for 
  "tableMainApiCallFunc": getaddFilesTableData, // Main API Call function name for datatable
  "tableIndexNo": 4, // Table number (Required)
  "tablePagination": true,
  "tableHeaderHTMLContent": ` <div class="d-flex">
                                 <button type="button" class="btn btn-outline-primary read_only" data-bs-toggle="modal"
                                    data-bs-target="#addFileModal">
                                    Add File
                                </button>
                              </div>`,
  // "columns": null,
 "columns": [
  { "name": "Title", "id": "title", "columnNo": 0, "visible": true },
  { "name": "Description", "id": "description", "columnNo": 1, "visible": true },
  { "name": "Type", "id": "type", "columnNo": 2, "visible": true },
  { "name": "Source", "id": "sourceDisplay", "columnNo": 3, "visible": true },
  { "name": "Created Date", "id": "createdDate", "columnNo": 4, "visible": true },
  { "name": "Actions", "id": "actions", "columnNo": 5, "visible": true }
],

  //  "searchFields": null,
   "searchFields": {
    "searchFunctionForSearchObj": addFilesSearchObjectCreation,
    "fields": [
      {
        "label": "Title",
        "id": "title",
        "placeholder": "Enter Title",
        "type": "text",
        "checked": true
      },
      {
        "label": "Description",
        "id": "description",
        "placeholder": "Enter Description",
        "type": "text",
        "checked": false
      },
      {
        "label": "Type",
        "id": "type",
        "placeholder": "Enter Type",
        "type": "text",
        "checked": false
      }
    ]
  },
  // "filterFields": null,
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
      "label": "Description",
      "id": "description",
      "placeholder": "Enter Description",
      "columnNo": 1,
      "hidden": false
    },
    {
      "type": "text",
      "label": "Type",
      "id": "type",
      "placeholder": "Enter Type",
      "columnNo": 2,
      "hidden": false
    },
    {
      "type": "text",
      "label": "Source",
      "id": "sourceDisplay",
      "placeholder": "Enter Source",
      "columnNo": 3,
      "hidden": false
    },
    {
      "type": "text",
      "label": "Created Date",
      "id": "createdDate",
      "placeholder": "Enter Created Date",
      "columnNo": 4,
      "hidden": false
    }
  ],
"tableHeader": [
  { "name": "Title", "widthClass": "w-5" },
  { "name": "Description", "widthClass": "w-5" },
  { "name": "Type", "widthClass": "w-5" },
  { "name": "Source", "widthClass": "w-5" },
  { "name": "Created Date", "widthClass": "w-5" },
  { "name": "Actions", "widthClass": "w-5" }
]


};

