if (localStorage.getItem("_ia") !== "true") {
  window.location.href = "signin.html";
}

const tokenAuth = localStorage.getItem("_at");
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, "My Secret Passphrase");
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8);

let serviceManagementDataTableInit;
let searchOject = {};
let serviceManagementDataReceived = "";
let costDetailsInit
let fileTypeInit
$(document).ready(function () {
  // Show main content and hide loader

  $("#mainContentInnerLoader").addClass("d-none");
  $("#mainContentInnerDataToShow").removeClass("d-none");


  // costDetailsInit 
  costDetailsInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "cost_type",
      true
    );
      // FileType 
  fileTypeInit =
    initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
      "fileType",
      true
    );
  // First Data Table Initialization
  serviceManagementDataTableInit = createTableComponent(dataSourceIPconfig, options);

  // getMuncipilityDetails()

  getServiceManagementTableData(10, 1);
getServiceManagementFilesTableData (10,1)
  // SERVICE MANAGEMNT
  // Validation rules define
  $('#yourFormId').validate({
    debug: true,
    rules: {
      title: {
        required: true
      },
      description: {
        required: false // optional
      },
      estimated_cost: {
        required: true,
        number: true
      },
      cost_type: {
        required: true
      },
      cost_unit: {
        required: true
      },
      availability: {
        required: true
      }
    },
    messages: {
      title: "Title is required",
      estimated_cost: "Estimated cost is required and must be a number",
      cost_type: "Cost type is required",
      cost_unit: "Cost unit is required",
      availability: "Availability must be selected"
    },
    errorClass: 'error invalid-feedback',
    validClass: 'success',
    errorElement: 'span',
    highlight: function (element, errorClass, validClass) {
      $(element).parents('div.control-group').addClass(errorClass).removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents('.error').removeClass(errorClass).addClass(validClass);
    },
    // the errorPlacement has to take the table layout into account
    errorPlacement: function (error, element) {
      if (element.attr("name") === "cost_type") {
        error.appendTo(element.parent().parent().parent().parent().parent())
      } else {
        error.appendTo(element.parent())
      }
    }
  });



});


function searchObjectCreation(search) {
  searchOject = search;
}

// Main API Call function for datatable
function getServiceManagementTableData(skip, page) {
  let data = [
    {
      order_id: "ORD12345",
      municipality: "Springfield",
      service: "Cloud Hosting",
      date: "2024-01-15",
      payment: "Paid",
      status: "In Provisioning",
    },
    {
      order_id: "ORDdf5",
      municipality: "Springfield",
      service: "Cloud Hosting",
      date: "2024-01-13",
      payment: "Pending",
      status: "Pending Kickoff",
    },
  ];

  let requirePayloadData;
  if (Object.keys(searchOject).length > 0) {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      search: searchOject,
    });
  } else {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
    });
  }

  // Ajax call
  $.ajax({
    url: MAIN_API_PATH + getserviceManagementAPI,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        // Hide page laoder Spiner
        $("#cover-spin").hide();

        hideDataTableLoader200("serviceManagementDataTable");

        let apiData = data.message; // or data.message if your API uses 'message'
        serviceManagementDataReceived = apiData;

        // Save correct length
        localStorage.setItem("serviceManagementDataTableTotal", data.count);

        // Loop through response to add data in datatable
        for (let i = 0; i < apiData.length; i++) {
          const item = apiData[i];

          const service_id = item.service_id || "--";
          const title = item.title || "--";
          const description = item.description || "--";
          const estimated_cost = item.estimated_cost != null ? item.estimated_cost : "--";
          const cost_type = item.cost_type || "--";
          const cost_unit = item.cost_unit || "--";
          const availability = item.availability != null ? (item.availability ? "Yes" : "No") : "--";

          // Action buttons
          const actions = `
    <button class="btn btn-sm btn-outline-primary edit-service" data-service-id="${service_id}">Edit</button>
    <button class="btn btn-sm btn-outline-danger delete-service" data-service-id="${service_id}">Delete</button>
  `;

          serviceManagementDataTableInit.row.add([
            `<td>${title}</td>`,
            `<td><span style="white-space: pre-wrap; word-wrap: break-word; text-align: justify;">${description}</span></td>`,
            `<td>${estimated_cost}</td>`,
            `<td>${cost_type}</td>`,
            `<td>${cost_unit}</td>`,
            `<td>${availability}</td>`,
            `<td>${actions}</td>`
          ]).draw();

          datatablePagination(
            "serviceManagementDataTable",
            1,
            "serviceManagementDataTableTotal",
            getServiceManagementTableData
          );
        }
        // Attach click events after table is rendered
        attachServiceManagementActions();

      },
      204: function () {
        $("#cover-spin").hide();
        hideDataTableLoaderError("serviceManagementDataTable");
        if (Object.keys(searchOject).length > 0) {
          $("#serviceManagementDataTableErrorDiv").addClass("d-none");
          $(
            "#serviceManagementDataTable, #serviceManagementDataTableDatatableMainHeading"
          ).removeClass("d-none");
        }
        serviceManagementDataTableInit.clear().draw();
        $("#serviceManagementDataTableErrorText").text(noDataFoundText204Case);
      },
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      hideDataTableLoaderError("serviceManagementDataTable");

      if (xhr.status === 400) {
        $("#serviceManagementDataTableErrorText").text(invalidRequest400Error);
      } else if (xhr.status === 401) {
        $("#serviceManagementDataTableErrorText").text(unauthorizedRequest401Error);
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(notFound404Error);
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(serverError503Error);
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
        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: "json",
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(sitePublicKey);
            const currentDateString = String(data.unixtime);
            securityKeyEncrypted = encrypt.encrypt(
              pageName + currentDateString
            );
            SecurityKeyTime = false;
            getServiceManagementTableData(skip, page, search);
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const currentDateString = String(data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(
                pageName + currentDateString
              );
              SecurityKeyTime = false;
              getServiceManagementTableData(skip, page, search);
            });
          },
        });
      } else {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(serverError503Error);
      }
    },
  });
}

// function to export data from datatable
function exportServiceManagementDataTableData() {
  console.log("exportServiceManagementDataTableData called");
}


// href click to open modal
$(document).on("click", "#clickToOpenModal", function () {
  $("#companyDetailsFormModal").modal("show");
});



// ********************** start set/Edit municpilities detsils *********************************

// validation Form Finish Btn
// $("#serviceManagementSubmit").on("click", function (e) {
//   e.preventDefault();
//   if ($("#serviceManagementForm").validate().form()) {
//     setMuncipilitiesData();
//   }
// });
// Single submit handler for add/update
$("#serviceManagementSubmit").on("click", function (e) {
  e.preventDefault();

  // Validate form
  if (!$("#serviceManagementForm").valid()) return;

  // Get modal values

  // Check if editing (service-id exists)
  const serviceId = $("#serviceManagementDetailsModal").data("service-id");

  if (serviceId) {
    const title = $("#title").val();
    const description = $("#description").val();
    const estimated_cost = parseFloat($("#estimated_cost").val()) || 0;
    const cost_type = $("#cost_type").val();
    const cost_unit = $("#cost_unit").val();
    const availability = $("#availability").prop("checked");

    // Prepare payload
    const payload = {
      auth_token: authToken,
      title,
      description,
      estimated_cost,
      cost_type,
      cost_unit,
      availability,
      service_id: serviceId,
      timestamp: Math.floor(Date.now() / 1000)
    };

    // Update service
    $.ajax({
      url: MAIN_API_PATH + editserviceManagementAPI,
      method: POST,
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (res) {
        $("#serviceManagementDetailsModal").modal("hide");

        showNotificationError("bg-green", null, null, null, null, null, UPDATE);

        teamMembersAPIResponse = [];
        showDataTableLoader("profileTeamDataTable");

        serviceManagementDataTableInit.clear().draw();
        let pageEntries = Number($("#datatableEntries1").val());
        getServiceManagementTableData(pageEntries, 1);
      },
    });
  } else {
    // Add new service
    setMuncipilitiesData()
  }
});


function setMuncipilitiesData() {


  // Current epoch time in **seconds**
  const created_at = Math.floor(Date.now() / 1000);
  // Get values from modal
  const title = $("#title").val();
  const description = $("#description").val(); // optional
  const estimated_cost = parseFloat($("#estimated_cost").val()) || 0;
  const cost_type = $("#cost_type").val();
  const cost_unit = $("#cost_unit").val();
  const availability = $("#availability").prop("checked"); // true/false


  // Prepare payload
  const payload = JSON.stringify({
    auth_token: authToken,
    title,
    description,
    estimated_cost,
    cost_type,
    cost_unit,
    availability,
    created_at
  });

  console.log("Modal form payload:", payload);


  // return 0
  $.ajax({
    url: MAIN_API_PATH + TMLAdminServiceAdd,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: payload,
    statusCode: {
      200: function (data) {
        $("#cover-spin").hide(0);
        $("#serviceManagementDetailsModal").modal("hide");

        showNotificationError("bg-green", null, null, null, null, null, UPDATE);

        teamMembersAPIResponse = [];
        showDataTableLoader("profileTeamDataTable");

        serviceManagementDataTableInit.clear().draw();
        let pageEntries = Number($("#datatableEntries1").val());
        getServiceManagementTableData(pageEntries, 1);
      },
      204: function () {
        $("#cover-spin").hide(0);
        showNotificationError(
          "bg-orange",
          null,
          null,
          null,
          null,
          null,
          alreadyExist409Error
        );
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
            setMuncipilitiesData();
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const dateString = String(pageName + data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(dateString);
              SecurityKeyTime = false;
              setMuncipilitiesData();
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

// ********************** end set/Edit municpilities detsils *********************************
// ********************** Start Edit municpilities Value *********************************
function attachServiceManagementActions() {
  document.querySelectorAll(".edit-service").forEach((btn) => {
    btn.addEventListener("click", function () {
      const serviceId = this.dataset.serviceId;
      const serviceData = serviceManagementDataReceived.find(s => s.service_id === serviceId);
      if (!serviceData) return;

      // Prefill modal inputs
      $("#title").val(serviceData.title);
      $("#description").val(serviceData.description);
      $("#estimated_cost").val(serviceData.estimated_cost);
      costDetailsInit.setValue(serviceData.cost_type);
      $("#cost_unit").val(serviceData.cost_unit);
      $("#availability").prop("checked", serviceData.availability);

      // Store original values for comparison
      const originalValues = {
        title: serviceData.title,
        description: serviceData.description,
        estimated_cost: serviceData.estimated_cost,
        cost_type: serviceData.cost_type,
        cost_unit: serviceData.cost_unit,
        availability: serviceData.availability
      };
      $("#serviceManagementDetailsModal").data("original-values", originalValues);

      // Store service_id in modal for update
      $("#serviceManagementDetailsModal").data("service-id", serviceId);

      // Open modal
      $("#serviceManagementDetailsModal").modal("show");

      // Disable submit button initially
      $("#serviceManagementSubmit").prop("disabled", true);
    });

  });

  document.querySelectorAll(".delete-service").forEach((btn) => {
    btn.addEventListener("click", function () {
      const serviceId = this.dataset.serviceId;
      swal({
        title: 'Deleting Record',
        text: 'Are you sure you want to delete?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }, function () {
        $('#cover-spin').show()

        const apiBody = JSON.stringify({
          auth_token: authToken,
          service_id: serviceId,
        })
        // return 0 
        $.ajax({
          url: MAIN_API_PATH + deleteserviceManagementAPI,
          method: POST,
          contentType: Content_Type,
          dataType: 'json',
          data: apiBody,
          statusCode: {
            200: function (data) {
              $('#cover-spin').hide(0)

              showNotificationError(
                'bg-green',
                null,
                null,
                null,
                null,
                null,
                DELETE
              )

              teamMembersAPIResponse = [];
              showDataTableLoader("profileTeamDataTable");

              serviceManagementDataTableInit.clear().draw();
              let pageEntries = Number($("#datatableEntries1").val());
              getServiceManagementTableData(pageEntries, 1);

            },
            204: function () {
              $('#cover-spin').hide(0)
            }
          },
          error: function (xhr, status, error) {
            $('#cover-spin').hide()
            if (xhr.status === 400) {
              showNotificationError(
                'bg-orange',
                null,
                null,
                null,
                null,
                null,
                invalidRequest400Error
              )
            } else if (xhr.status === 401) {
              showNotificationError(
                'bg-orange',
                null,
                null,
                null,
                null,
                null,
                unauthorizedRequest401Error
              )
            } else if (xhr.status === 404) {
              showNotificationError(
                'bg-orange',
                null,
                null,
                null,
                null,
                null,
                notFound404Error
              )
            } else if (xhr.status === 409) {
              showNotificationError(
                'bg-orange',
                null,
                null,
                null,
                null,
                null,
                alreadyExist409Error
              )
            } else if (xhr.status === 503) {
              showNotificationError(
                'bg-red',
                null,
                null,
                null,
                null,
                null,
                serverError503Error
              )
            } else if (xhr.status === 408) {
              swal(
                {
                  title: ' ',
                  text: sessionExpired408Error,
                  type: 'info',
                  showCancelButton: false,
                  confirmButtonText: 'Logout'
                },
                function (isConfirm) {
                  if (isConfirm) {
                    localStorage.clear()
                    window.location.href = redirectToSignInPage408
                  }
                }
              )
            } else if (xhr.status === 410) {
              $('#cover-spin').hide()

              $.ajax({
                url: MAIN_API_PATH + getGmtAPI,
                method: POST,
                contentType: Content_Type,
                dataType: 'json',
                success: function (data, textStatus, xhr) {
                  const encrypt = new JSEncrypt()
                  encrypt.setPublicKey(sitePublicKey)
                  const dateString = String(pageName + data.unixtime)
                  securityKeyEncrypted = encrypt.encrypt(dateString)
                  SecurityKeyTime = false
                  editPolicyAndSessions()
                },
                error: function (xhr, status, error) {
                  $.getJSON(worldTimeAPI, function (data) {
                    const encrypt = new JSEncrypt()
                    encrypt.setPublicKey(sitePublicKey)
                    const dateString = String(pageName + data.unixtime)
                    securityKeyEncrypted = encrypt.encrypt(dateString)
                    SecurityKeyTime = false
                    editPolicyAndSessions()
                  })
                }
              })
            } else {
              showNotificationError(
                'bg-red',
                null,
                null,
                null,
                null,
                null,
                serverError503Error
              )
            }
          }
        })
      })
    });
  });
}

$("#serviceManagementDetailsModal input, #serviceManagementDetailsModal select, #serviceManagementDetailsModal textarea").on("input change", function () {
  const original = $("#serviceManagementDetailsModal").data("original-values");
  const serviceId = $("#serviceManagementDetailsModal").data("service-id");

  // If no serviceId, it's add mode → enable button
  if (!serviceId) {
    $("#serviceManagementSubmit").prop("disabled", false);
    return;
  }

  // Compare current values with original
  const currentValues = {
    title: $("#title").val(),
    description: $("#description").val(),
    estimated_cost: parseFloat($("#estimated_cost").val()) || 0,
    cost_type: $("#cost_type").val(),
    cost_unit: $("#cost_unit").val(),
    availability: $("#availability").prop("checked")
  };

  const changed = Object.keys(currentValues).some(key => currentValues[key] !== original[key]);

  // Enable submit only if some value changed
  $("#serviceManagementSubmit").prop("disabled", !changed);
});

// ********************** end Edit municpilities Value *********************************




// Reset modal inputs when it is closed
$('#serviceManagementDetailsModal').on('hidden.bs.modal', function () {
  // Clear all input/select/textarea
  $(this).find('input[type="text"], input[type="number"], textarea').val('');

  // Reset select dropdowns
  $(this).find('select').val('').trigger('change');
  costDetailsInit.setValue('');
  // Reset checkbox
  $(this).find('input[type="checkbox"]').prop('checked', false);

  // Remove any stored service ID
  $(this).removeData('service-id');
});




// ********************** Start Upload Service *********************************
//  Dropzone.autoDiscover = false;

//   var myDropzone = new Dropzone("#attachFilesNewProjectLabel", {
//     url: "/dummy",              // dummy (hum apna ajax likhenge)
//     autoProcessQueue: false,    // Dropzone ka default upload off
//     paramName: "file",
//     maxFilesize: 10,
//     acceptedFiles: ".jpg,.png,.pdf,.doc,.docx"
//   });

//   myDropzone.on("addedfile", function (file) {
//     console.log("📂 File added:", file.name);

//     // ✅ FormData object banayein
//     var form = new FormData();

//     // 👇 Static fields (aap apne hisaab se badal sakte ho)
//     form.append("title", "Test Title");
//     form.append("description", "Static description");
//     form.append("type", "file");
//     form.append("source", "");
//     form.append("created_at", new Date().toISOString());
//      formData.append("auth_token", authToken);

//     // 👇 File append karo
//     form.append("file", file, file.name);

//     // ✅ AJAX call
//     $.ajax({
//       url: "/tml/admin/documents/add",   // 👈 aapki API
//       method: "POST",
//       processData: false,
//       contentType: false,
//       data: form,
//       success: function (response) {
//         console.log("✅ Upload success:", response);
//         myDropzone.emit("success", file, response); // Dropzone ko batana
//       },
//       error: function (jqXHR, textStatus, errorThrown) {
//         console.error("❌ Upload error:", textStatus, errorThrown);
//         myDropzone.emit("error", file, errorThrown);
//       }
//     });
//   });


  
// ********************** End Upload Service *********************************



  // Handle type change
  function updateFields() {
    var type = $("#fileType").val();
    if(type === "file") {
      $("#fileUploadWrapper").show();
      $("#sourceWrapper").hide();
    } else {
      $("#fileUploadWrapper").hide();
      $("#sourceWrapper").show();
      $("#fileSource").val(""); // clear previous value
      $("#fileSource").attr("placeholder", type === "url" ? "Enter URL" : "Enter Text");
    }
  }

  $("#fileType").on("change", updateFields);
  updateFields(); // initialize

  // Submit form
  $("#submitFileBtn").on("click", function() {
    var title = $("#fileTitle").val().trim();
    var description = $("#fileDescription").val().trim();
    var type = $("#fileType").val();
    var source = $("#fileSource").val().trim();
    var fileInputEl = document.getElementById("fileInput");
    var file = fileInputEl && fileInputEl.files.length ? fileInputEl.files[0] : null;

    if(!title) { alert("Title is required"); return; }

    var formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
  
    formData.append("created_at", Math.floor(Date.now() / 1000));
     formData.append("auth_token", authToken);

    if(type === "file") {
      if(!file) { alert("Please select a file"); return; }
      formData.append("file", file, file.name);
        formData.append("source", "");
    } else {
      if(!source) { alert("Please enter source"); return; }
      formData.append("source", source);
    }

    // AJAX request
    $.ajax({
      url: MAIN_API_PATH + adminDocumentsAdd,  // replace with your API
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        console.log("Upload success:", response);
        alert("File added successfully!");
        var modalEl = document.getElementById('addFileModal');
        var modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide(); // close modal
        $("#addFileForm")[0].reset(); // reset form
        updateFields(); // reset fields visibility
      },
      error: function(err) {
        console.error("Upload error:", err);
        alert("Error uploading file!");
      }
    });
  });



  // Main API Call function for datatable
function getServiceManagementFilesTableData(skip, page) {

  let requirePayloadData;
  if (Object.keys(searchOject).length > 0) {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      search: searchOject,
    });
  } else {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
    });
  }

  // Ajax call
  $.ajax({
    url: MAIN_API_PATH + adminDocumentsView,
    method: POST,
    contentType: Content_Type,
    dataType: "json",
    data: requirePayloadData,
    statusCode: {
      200: function (data) {
        // Hide page laoder Spiner
        $("#cover-spin").hide();

  //       hideDataTableLoader200("serviceManagementDataTable");

  //       let apiData = data.message; // or data.message if your API uses 'message'
  //       serviceManagementDataReceived = apiData;

  //       // Save correct length
  //       localStorage.setItem("serviceManagementDataTableTotal", data.count);

  //       // Loop through response to add data in datatable
  //       for (let i = 0; i < apiData.length; i++) {
  //         const item = apiData[i];

  //         const service_id = item.service_id || "--";
  //         const title = item.title || "--";
  //         const description = item.description || "--";
  //         const estimated_cost = item.estimated_cost != null ? item.estimated_cost : "--";
  //         const cost_type = item.cost_type || "--";
  //         const cost_unit = item.cost_unit || "--";
  //         const availability = item.availability != null ? (item.availability ? "Yes" : "No") : "--";

  //         // Action buttons
  //         const actions = `
  //   <button class="btn btn-sm btn-outline-primary edit-service" data-service-id="${service_id}">Edit</button>
  //   <button class="btn btn-sm btn-outline-danger delete-service" data-service-id="${service_id}">Delete</button>
  // `;

  //         serviceManagementDataTableInit.row.add([
  //           `<td>${title}</td>`,
  //           `<td><span style="white-space: pre-wrap; word-wrap: break-word; text-align: justify;">${description}</span></td>`,
  //           `<td>${estimated_cost}</td>`,
  //           `<td>${cost_type}</td>`,
  //           `<td>${cost_unit}</td>`,
  //           `<td>${availability}</td>`,
  //           `<td>${actions}</td>`
  //         ]).draw();

  //         datatablePagination(
  //           "serviceManagementDataTable",
  //           1,
  //           "serviceManagementDataTableTotal",
  //           getServiceManagementTableData
  //         );
  //       }
  //       // Attach click events after table is rendered
  //       attachServiceManagementActions();

      },
      204: function () {
        $("#cover-spin").hide();
        hideDataTableLoaderError("serviceManagementDataTable");
        if (Object.keys(searchOject).length > 0) {
          $("#serviceManagementDataTableErrorDiv").addClass("d-none");
          $(
            "#serviceManagementDataTable, #serviceManagementDataTableDatatableMainHeading"
          ).removeClass("d-none");
        }
        serviceManagementDataTableInit.clear().draw();
        $("#serviceManagementDataTableErrorText").text(noDataFoundText204Case);
      },
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      hideDataTableLoaderError("serviceManagementDataTable");

      if (xhr.status === 400) {
        $("#serviceManagementDataTableErrorText").text(invalidRequest400Error);
      } else if (xhr.status === 401) {
        $("#serviceManagementDataTableErrorText").text(unauthorizedRequest401Error);
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(notFound404Error);
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(serverError503Error);
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
        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: "json",
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(sitePublicKey);
            const currentDateString = String(data.unixtime);
            securityKeyEncrypted = encrypt.encrypt(
              pageName + currentDateString
            );
            SecurityKeyTime = false;
            getServiceManagementTableData(skip, page, search);
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const currentDateString = String(data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(
                pageName + currentDateString
              );
              SecurityKeyTime = false;
              getServiceManagementTableData(skip, page, search);
            });
          },
        });
      } else {
        // $('#cover-spin').hide(0);
        $("#serviceManagementDataTableErrorText").text(serverError503Error);
      }
    },
  });
}
