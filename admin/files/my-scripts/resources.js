if (localStorage.getItem("_ia") !== "true") {
  window.location.href = "signin.html";
}

const tokenAuth = localStorage.getItem("_at");
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, "My Secret Passphrase");
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8);

// let serviceManagementDataTableInit;
// let searchOject = {};
// let serviceManagementDataReceived = "";
// let costDetailsInit;

// let createBundleDataTableInit;
// let createBundleDataReceived = "";
// let createBundleSerachObj = {};

let ordersDataReceived = "";

let enrollServicesDataTableInit;
let enrollServicesDataReceived = "";
let enrollServicesSerachObj = {};

let addFilesDataTableInit;
let addFilesDataReceived = "";
let addFilesSerachObj = {};

let checkedServicesToEnrollList = [];

$(document).ready(function () {
  // Show main content and hide loader

  $("#mainContentInnerLoader").addClass("d-none");
  $("#mainContentInnerDataToShow").removeClass("d-none");

  $("#addFileForm").validate({
    debug: true,
    rules: {
      fileTitle: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      fileSource: {
        required: function () {
          const type = $("#fileType").val();
          return type === "url" || type === "text";
        },
        validUrl: {
          depends: function () {
            return $("#editFileType").val() === "url";
          },
        },
      },
    },
    messages: {
      fileTitle: {
        required: "Title is required.",
      },
      //   estimated_cost: "Estimated cost is required and must be a number",
      fileType: "Resource type is required.",
      fileSource: {
        required: "Resource source is required.",
        validUrl: "Please enter a valid URL (e.g., https://example.com).",
      },
      fileInput: "Resource file must be selected.",
    },
    errorClass: "error invalid-feedback",
    validClass: "success",
    errorElement: "span",
    highlight: function (element, errorClass, validClass) {
      $(element)
        .parents("div.control-group")
        .addClass(errorClass)
        .removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents(".error").removeClass(errorClass).addClass(validClass);
    },
    // the errorPlacement has to take the table layout into account
    errorPlacement: function (error, element) {
      if (element.attr("name") === "cost_type") {
        error.appendTo(element.parent().parent().parent().parent().parent());
      } else {
        error.appendTo(element.parent());
      }
    },
  });

  $("#editFileForm").validate({
    debug: true,
    rules: {
      editFileTitle: {
        atLeastOneCharacter: true,
        SomeSpecialCharactersAllowed: true,
        minlength: 3,
        onlyDigitsNotAllowed: true,
      },
      editFileType: {
        required: true,
      },
      // For file: only required when type === "file"
      editFileInput: {
        // required: function () {
        //   return $("#editFileType").val() === "file";
        // },
        required: function () {
          const type = $("#editFileType").val();
          const hasFilePreview =
            $("#editFileNamePreview").text().trim() !== "" &&
            !$("#editFileNamePreview").text().includes("No file uploaded yet");

          // Require file input only if type is 'file' and no preview file exists
          return type === "file" && !hasFilePreview;
        },

      },
      // For source: only required when type === "url" or "text"
      editFileSource: {
        required: function () {
          const type = $("#editFileType").val();
          console.log("type", type);
          return type === "url" || type === "text";
        },
        validUrl: {
          depends: function () {
            return $("#editFileType").val() === "url";
          },
        },
      },
    },
    messages: {
      editFileTitle: {
        required: "Title is required.",
      },
      editFileType: "Resource type is required.",
      editFileSource: {
        required: "Resource source is required.",
        validUrl: "Please enter a valid URL (e.g., https://example.com).",
      },
      editFileInput: "Resource file must be selected.",
    },
    errorClass: "error invalid-feedback",
    validClass: "success",
    errorElement: "span",
    highlight: function (element, errorClass, validClass) {
      $(element)
        .parents("div.control-group")
        .addClass(errorClass)
        .removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parents(".error").removeClass(errorClass).addClass(validClass);
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") === "editFileType") {
        error.appendTo(element.parent().parent());
      } else {
        error.appendTo(element.parent());
      }
    },
  });

  // FileType Add/ Edit
  fileTypeInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
    "fileType",
    true
  );
  editFileTypeInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
    "editFileType",
    true
  );

  // File Data Table Initialization
  addFilesDataTableInit = createTableComponent(addFilesDataTableShow, options4);

  getaddFilesTableData(10, 1);
});

// Availability Toogle
$(document).on("click", ".delete-document", function () {
  var checkbox = $(this);
  var bundleId = checkbox.data("id");
  var previousState = !checkbox.prop("checked"); // previous state

  swal(
    {
      title: "Deleting Record",
      text: "Are you sure you want to delete?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    },
    function (isConfirm) {
      if (isConfirm) {
        // Prepare JSON payload
        const payload = JSON.stringify({
          auth_token: authToken,
          document_id: bundleId,
          availability: checkbox.prop("checked"),
        });

        // User clicked Yes -> API call
        $.ajax({
          url: MAIN_API_PATH + "tml/admin/documents/delete", // replace with your API
          method: "POST",
          data: payload,
          contentType: "application/json", // tell server it's JSON
          dataType: "json", // expect JSON response
          success: function (response) {
            showDataTableLoader("addFilesDataTable");
            $("#cover-spin").show();
            addFilesDataTableInit.clear().draw();
            getaddFilesTableData(10, 1);
            showNotificationError("bg-green", null, null, null, null, null, DELETE);
          },
            error: function (xhr, status, error) {
              checkbox.prop("checked", previousState); // revert on error
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
      } else {
        // User clicked Cancel -> revert toggle
        checkbox.prop("checked", previousState);
      }
    }
  );
});

// Availability Toogle
$(document).on("change", ".availability-toggle", function () {
  var checkbox = $(this);
  var bundleId = checkbox.data("id");
  var previousState = !checkbox.prop("checked"); // previous state

  swal(
    {
      title: "Are you sure?",
      text: "Do you want to change availability?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    },
    function (isConfirm) {
      if (isConfirm) {
        showDataTableLoader("addFilesDataTable");
        $("#cover-spin").show();
        // Prepare JSON payload
        const payload = JSON.stringify({
          auth_token: authToken,
          document_id: bundleId,
          availability: checkbox.prop("checked"),
        });

        // User clicked Yes -> API call
        $.ajax({
          url: MAIN_API_PATH + "tml/admin/document/available/false", // replace with your API
          method: "POST",
          data: payload,
          contentType: "application/json", // tell server it's JSON
          dataType: "json", // expect JSON response
          success: function (response) {
            // swal("Updated!", "Availability has been updated.", "success");
            showNotificationError(
              "bg-green",
              null,
              null,
              null,
              null,
              null,
              UPDATE
            );
            addFilesDataTableInit.clear().draw();
            getaddFilesTableData(10, 1);
          },
            error: function (xhr, status, error) {
              $("#cover-spin").hide();
              addFilesDataTableInit.clear().draw();
              getaddFilesTableData(10, 1);
              checkbox.prop("checked", previousState); // revert on error
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
      } else {
        // User clicked Cancel -> revert toggle
        checkbox.prop("checked", previousState);
      }
    }
  );
});

// End Availability

// function to export data from datatable
function exportaddFilesDataTableData() {
  console.log("exportaddFilesDataTableData called");
}


// href click to open modal
$(document).on("click", "#clickToOpenModal", function () {
  $("#companyDetailsFormModal").modal("show");
});

function updateFields() {
  var type = $("#fileType").val();
  if (type === "file") {
    $("#fileUploadWrapper").show();
    $("#sourceWrapper").hide();
  } else {
    $("#fileUploadWrapper").hide();
    $("#sourceWrapper").show();
    $("#fileSource").val(""); // clear previous value
    $("#fileSource").attr(
      "placeholder",
      type === "url" ? "Enter URL" : "Enter Text"
    );
  }
}

// Add modal type change
$("#fileType").on("change", updateFields);
updateFields();

function updateEditFields() {
  var type = $("#editFileType").val();
  if (type === "file") {
    $("#editFileUploadWrapper").show();
    $("#editSourceWrapper").hide();
  } else {
    $("#editFileUploadWrapper").hide();
    $("#editSourceWrapper").show();
    $("#editFileSource").val(""); // clear previous value
    $("#editFileSource").attr(
      "placeholder",
      type === "url" ? "Enter URL" : "Enter Text"
    );
  }
}

// Edit modal type change
$("#editFileType").on("change", updateEditFields);
updateEditFields();

// Submit EDIT form
$("#updateFileBtn").on("click", function () {
  if ($("#editFileForm").validate().form()) {
    var title = $("#editFileTitle").val().trim();
    var description = $("#editFileDescription").val().trim();
    var type = $("#editFileType").val();
    var source = $("#editFileSource").val().trim();
    var fileInputEl = document.getElementById("editFileInput");
    var file =
      fileInputEl && fileInputEl.files.length ? fileInputEl.files[0] : null;

    var serviceId = $("#editFileModal").data("service-id");

    var formData = new FormData();
    formData.append("document_id", serviceId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("updated_at", Math.floor(Date.now() / 1000));
    formData.append("auth_token", authToken);

    if (type === "file") {
      if (file) {
        formData.append("file", file, file.name);
        formData.append("source", "");
      } else {
        // no new file selected → keep old source (from original values)
        const original = $("#editFileModal").data("original-values");
        formData.append("source", original.source || "");
      }
    } else {
      formData.append("source", source);
    }

    // AJAX request
    $.ajax({
      url: MAIN_API_PATH + "tml/admin/documents/update", // EDIT API endpoint
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        var modalEl = document.getElementById("editFileModal");
        var modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide(); // close modal
        showNotificationError("bg-green", null, null, null, null, null, UPDATE);
        showDataTableLoader("addFilesDataTable");
        $("#cover-spin").show();
        addFilesDataTableInit.clear().draw();
        getaddFilesTableData(10, 1);
        $("#editFileForm")[0].reset(); // reset form
        updateEditFields(); // reset field visibility
      },
 
        error: function (xhr, status, error) {
          $("#cover-spin").hide();
          addFilesDataTableInit.clear().draw();
          getaddFilesTableData(10, 1);
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
});

// Submit form
$("#submitFileBtn").on("click", function () {
  if ($("#addFileForm").validate().form()) {
    var title = $("#fileTitle").val().trim();
    var description = $("#fileDescription").val().trim();
    var type = $("#fileType").val();
    var source = $("#fileSource").val().trim();
    var fileInputEl = document.getElementById("fileInput");
    var file =
      fileInputEl && fileInputEl.files.length ? fileInputEl.files[0] : null;

    //   if (!title) {
    //     alert("Title is required");
    //     return;
    //   }

    var formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);

    formData.append("created_at", Math.floor(Date.now() / 1000));
    formData.append("auth_token", authToken);

    if (type === "file") {
      // if (!file) {
      //   alert("Please select a file");
      //   return;
      // }
      formData.append("file", file, file.name);
      formData.append("source", "");
    } else {
      // if (!source) {
      //   alert("Please enter source");
      //   return;
      // }
      formData.append("source", source);
    }

    // AJAX request
    $.ajax({
      url: MAIN_API_PATH + adminDocumentsAdd, // replace with your API
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        // console.log("Upload success:", response);
        // alert("File added successfully!");
        showNotificationError("bg-green", null, null, null, null, null, SAVED);
        var modalEl = document.getElementById("addFileModal");
        var modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide(); // close modal
        showDataTableLoader("addFilesDataTable");
        $("#cover-spin").show();
        addFilesDataTableInit.clear().draw();
        getaddFilesTableData(10, 1);
        $("#addFileForm")[0].reset(); // reset form
        updateFields(); // reset fields visibility
      },
      error: function (err) {
        console.error("Upload error:", err);
        alert("Error uploading file!");
      },
    });
  }
});

// start create Bundle Data Table Initialization

function addFilesSearchObjectCreation(search) {
  addFilesSerachObj = search;
}

// Main API Call function for datatable
function getaddFilesTableData(skip, page) {
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
  if (Object.keys(addFilesSerachObj).length > 0) {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      search: addFilesSerachObj,
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

        hideDataTableLoader200("addFilesDataTable");

        // Response data (IPs)
        response = data.message;
        ordersDataReceived = response;
        localStorage.setItem("addFilesDataTableTotal", data.count);
        // If No IPs found

        // loop through response to add data in datatable
        for (let i = 0; i < response.length; i++) {
          const doc = response[i];

          // Format source
          let sourceDisplay = "";
          if (doc.type === "url") {
            sourceDisplay = `<a href="${doc.source}"  target="_blank">Open Link</a>`;
          } else if (doc.type === "text") {
            sourceDisplay = `<span  style="
        display: inline-block;
        max-width: 200px;  /* width fix */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    " title="${doc.source}">${doc.source}</span>`;
          } else if (doc.type === "file") {
            sourceDisplay = `<a href="${doc.source}" download>Download File</a>`;
          }

          // Format created_at
          let createdDate = new Date(doc.created_at * 1000).toLocaleString();

          // Action buttons
          let actions = `
    <button class="btn btn-sm btn-outline-primary edit-document" data-service-id="${doc.document_id}">Edit</button>
    <button class="btn btn-sm btn-outline-danger delete-document" data-id="${doc.document_id}">Delete</button>
  `;

          const availability =
            doc.availability != null
              ? `<div class="form-check form-switch">
              <input class="form-check-input availability-toggle"
                      type="checkbox"
                      data-id="${doc.document_id}"
                      ${doc.availability ? "checked" : ""}>
            </div>`
              : "--";

          addFilesDataTableInit.row
            .add([
              doc.title,
              `<span class="truncate-text" title="${
                doc.description || "--"
              }" style="
    display: inline-block;
    max-width: 200px;  /* width fix */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
">${doc.description ? doc.description : "--"}</span>`,

              `<span class="badge badge-type" style="
        background-color: ${
          doc.type === "file"
            ? "#f39c12"
            : doc.type === "url"
            ? "#3498db"
            : "#2ecc71"
        };
        color: #fff;
        text-transform: uppercase;
        padding: 0.25em 0.5em;
        border-radius: 0.25rem;
        font-size: 0.8rem;
    ">${doc.type}</span>`,

             `<u class="text-primary">${sourceDisplay}</u>`,
              createdDate,
              `<td><span>${availability}</span></td>`,
              `<span>${actions}</span>`,
            ])
            .draw();
          datatablePagination(
            "addFilesDataTable",
            4,
            "addFilesDataTableTotal",
            getaddFilesTableData
          );

          attachEditResourcesActions();

          let viewOrderDetailsButtons = document.querySelectorAll(
            ".view-order-details"
          );
          viewOrderDetailsButtons.forEach((button) => {
            button.addEventListener("click", function () {
              let orderId = this.getAttribute("data-order-id");
              // Redirect to order details page
              showOrderDetails(orderId);
            });
          });
        }
      },
      204: function () {
        $("#cover-spin").hide();
        hideDataTableLoaderError("addFilesDataTable");
        if (Object.keys(addFilesSerachObj).length > 0) {
          $("#addFilesDataTableErrorDiv").addClass("d-none");
          $(
            "#addFilesDataTable, #addFilesDataTableDatatableMainHeading"
          ).removeClass("d-none");
        }
        addFilesDataTableInit.clear().draw();
        $("#addFilesDataTableErrorText").text(noDataFoundText204Case);
      },
    },
    error: function (xhr, status, error) {
      $("#cover-spin").hide();
      hideDataTableLoaderError("addFilesDataTable");

      if (xhr.status === 400) {
        $("#addFilesDataTableErrorText").text(invalidRequest400Error);
      } else if (xhr.status === 401) {
        $("#addFilesDataTableErrorText").text(unauthorizedRequest401Error);
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $("#addFilesDataTableErrorText").text(notFound404Error);
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $("#addFilesDataTableErrorText").text(serverError503Error);
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
            getaddFilesTableData(skip, page, search);
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
              getaddFilesTableData(skip, page, search);
            });
          },
        });
      } else {
        // $('#cover-spin').hide(0);
        $("#addFilesDataTableErrorText").text(serverError503Error);
      }
    },
  });
}

// Attach edit modal logic
function attachEditResourcesActions() {
  document.querySelectorAll(".edit-document").forEach((btn) => {
    btn.addEventListener("click", function () {
      const serviceId = this.dataset.serviceId;
      const serviceData = ordersDataReceived.find(
        (s) => s.document_id === serviceId
      );
      if (!serviceData) return;

      // Prefill modal inputs
      $("#editFileTitle").val(serviceData.title);
      $("#editFileDescription").val(serviceData.description);

      // Use Tom Select to set value
      if (editFileTypeInit) {
        editFileTypeInit.setValue(serviceData.type, true);
      }
      console.log("Editing document type:", serviceData.source);

      if (serviceData.type === "file") {
        $("#editFileUploadWrapper").show();
        $("#editSourceWrapper").hide();

        // Can't set file directly, show preview label
        $("#editFileInput").val(""); // reset
        if (serviceData.source) {
          $("#editFileNamePreview").text(serviceData.source);
        } else {
          $("#editFileNamePreview").text("No file uploaded yet");
        }
      }
      if (serviceData.type === "file") {
        $("#fileCardPreview").removeClass("d-none");
        $("#fileCardPreview").addClass("d-flex");
        $("#editFileUploadWrapper").show();
        $("#editSourceWrapper").hide();

        // Always reset the file input
        $("#editFileInput").val("");

        // Show existing file name in preview text (not in input)
        if (serviceData.source) {
          const fileName = serviceData.source.split("/").pop(); // get only the filename from path/URL
          $("#editFileNamePreview").text(fileName);
        } else {
          $("#editFileNamePreview").text("No file uploaded yet");
        }
      } else {
        $("#fileCardPreview").addClass("d-none");
        $("#fileCardPreview").removeClass("d-flex");

        $("#editFileUploadWrapper").hide();
        $("#editSourceWrapper").show();
        $("#editFileSource")
          .val(serviceData.source)
          .attr(
            "placeholder",
            serviceData.type === "url" ? "Enter URL" : "Enter Text"
          );
      }

      // Availability
      if (serviceData.availability !== undefined) {
        $("#editAvailability").prop("checked", serviceData.availability);
      }

      // Save originals
      const originalValues = {
        title: serviceData.title,
        description: serviceData.description,
        type: serviceData.type,
        source: serviceData.source,
        availability: serviceData.availability,
      };

      $("#editFileModal").data("original-values", originalValues);
      $("#editFileModal").data("service-id", serviceId);

      // Open modal
      $("#editFileModal").modal("show");
      $("#updateFileBtn").prop("disabled", true);

      // setOriginalFileModalData(ordersDataReceived)
    });
  });
}

// Attach file input listener once
$("#editFileInput").on("change", function () {
  const file = this.files && this.files.length ? this.files[0] : null;

  if (file) {
    console.log("Selected file:", file.name, file.size, file.type);
    $("#editFileNamePreview").text("Selected: " + file.name);
    $("#editFileModal").data("selected-file", file);
  } else {
    console.log("No file selected");
    $("#editFileNamePreview").text("No file selected");
    $("#editFileModal").removeData("selected-file");
  }
});

// Attach once — handle file selection
$("#editFileInput").on("change", function () {
  const file = this.files?.length ? this.files[0] : null;

  if (file) {
    console.log("Selected file:", file.name, file.size, file.type);
    $("#editFileNamePreview").text("Selected: " + file.name);
    $("#editFileModal").data("selected-file", file);
  } else {
    console.log("No file selected");
    $("#editFileNamePreview").text("No file selected");
    $("#editFileModal").removeData("selected-file");
  }

  enableDisableUpdateFileBtn(); // check after file change
});

// Attach change/input listeners for all inputs in the modal
$("#editFileModal input, #editFileModal select, #editFileModal textarea").on(
  "input change",
  enableDisableUpdateFileBtn
);

// Function to check and enable/disable button
function enableDisableUpdateFileBtn() {
  const original = $("#editFileModal").data("original-values");
  const serviceId = $("#editFileModal").data("service-id");
  const fileInput = document.getElementById("editFileInput");

  const serviceData = ordersDataReceived.find(
    (s) => s.document_id === serviceId
  );

   // Save originals
  const originalValues = {
    title: serviceData.title,
    description: serviceData.description,
    type: serviceData.type,
    source: serviceData.source,
    availability: serviceData.availability,
  };

  if (!original) return; // Prevent running before modal opens

  // Gather current values
  const currentValues = {
    title: $("#editFileTitle").val(),
    description: $("#editFileDescription").val(),
    type: $("#editFileType").val(),
    source: $("#editFileSource").val(),
    // availability: $("#editAvailability").prop("checked"),
  };

  console.log("currentValues.type", currentValues.source);
  console.log("originalValues.2423523", originalValues.source);

  // Enable if changed, disable otherwise
  if (currentValues.title !== originalValues.title || currentValues.description !== originalValues.description || currentValues.type !== originalValues.type) {
    $("#updateFileBtn").prop("disabled", false);
    $("#updateFileBtn").css("cursor", "pointer");
  } else {
    $("#updateFileBtn").prop("disabled", true);
    $("#updateFileBtn").css("cursor", "no-drop");
  }
}

// Reset modal inputs when it is closed
$("#addFileModal").on("hidden.bs.modal", function () {
  $(".error").html('');
});

$("#editFileModal").on("hidden.bs.modal", function () {
  $(".error").html('');
});
