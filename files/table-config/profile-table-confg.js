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


// profile team table
const profileTeamConfig = {
  "tableHTMLIdToAppend": "profileTeamTableContainer", //append to html DOM Id (Required)
  "tableName": "My Orders",
  "tableId": "profileTeamDataTable", //table name (Unique) Required
  "tableExportFunc": exportProfileTeamDataTableData, // Null = d-none // ""= for no pagination // functionName for 
  "tableMainApiCallFunc": getProfileTeamTableData, // Main API Call function name for datatable
  "tableIndexNo": 1, // Table number (Required)
  "tablePagination": true,
  "tableHeaderHTMLContent": ``,
  // "columns": null,
  "columns": [

    { "name": "Email", "id": "email", "columnNo": 1, "visible": true },
    { "name": "Role", "id": "role", "columnNo": 2, "visible": true },
    { "name": "Action", "id": "action", "columnNo": 3, "visible": true }


  ],
  //  "searchFields": null,
  "searchFields": {
    // "searchFuncForTomSelect": searchFunctionForTomSelectInit, // if we have tom select in search make a function
    "searchFunctionForSearchObj": searchObjectCreation,
    "fields": [
      {
        "label": "Name",
        "id": "name",
        "placeholder": "Enter name",
        "type": "text",
        "checked": true,
      },
      {
        "label": "Email",
        "id": "email",
        "placeholder": "Enter email",
        "type": "text",
        "checked": false,
      },
    ]
  },
  // "filterFields": null,
  "filterFields": [
    {
      "type": "text",
      "label": "Name",
      "id": "name",
      "placeholder": "Enter name",
      "columnNo": 0,
      "hidden": false // This field is shown
    },
    {
      "type": "text",
      "label": "Email",
      "id": "email",
      "placeholder": "Enter email",
      "columnNo": 1,
      "hidden": false // This field is shown
    },


  ],
  "tableHeader": [
    { "name": "Name", "widthClass": "w-5" },
    { "name": "Email", "widthClass": "w-5" },
    { "name": "Role", "widthClass": "w-5" },
    { "name": "Action", "widthClass": "w-5" }
  ],
};