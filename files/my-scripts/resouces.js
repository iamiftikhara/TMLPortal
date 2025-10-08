if (localStorage.getItem('_ia') !== 'true') {
  window.location.href = 'signin.html'
}

const tokenAuth = localStorage.getItem('_at')
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, 'My Secret Passphrase')
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8)
let searchOject = {}
let municipalitySizeSelectInit, municipalityTechnologySelectInit, municipalityComplianceSelectInit

$(document).ready(function () {

  $('#mainContentInnerLoader').addClass('d-none')
  $('#mainContentInnerDataToShow').removeClass('d-none')


  getResourcesData(10, 1);

});



// Main API Call function for datatable
function getResourcesData(skip, page) {


  let requirePayloadData
  if ((Object.keys(searchOject).length > 0)) {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      search: searchOject,
      availability: true
    })
  } else {
    requirePayloadData = JSON.stringify({
      auth_token: authToken,
      skip: Number(skip),
      page,
      availability: true
    })
  }


  // Ajax call
  $.ajax({
    url: MAIN_API_PATH + adminDocumentsView,
    method: POST,
    contentType: Content_Type,
    dataType: 'json',
    data: requirePayloadData,
    statusCode: {
      200: function (res) {

        $('#cover-spin').hide()
        $('#resourcesCardErrorDiv').addClass('d-none')

        // call the function to populate service cards to UI
        populateServiceCardsToUI(res.message)
      },
      204: function () {
        $('#cover-spin').hide()

        $('#resourcesCardErrorDiv').removeClass('d-none')
        $('#resourcesCardErrorText').text(noDataFoundText204Case)
      }
    },
    error: function (xhr, status, error) {
      $('#cover-spin').hide()

      $('#resourcesCardErrorDiv').removeClass('d-none')

      if (xhr.status === 400) {
        $('#resourcesCardErrorText').text(invalidRequest400Error)
      } else if (xhr.status === 401) {
        $('#resourcesCardErrorText').text(unauthorizedRequest401Error)
      } else if (xhr.status === 404) {
        // $('#cover-spin').hide(0);
        $('#resourcesCardErrorText').text(notFound404Error)
      } else if (xhr.status === 503) {
        // $('#cover-spin').hide(0);
        $('#resourcesCardErrorText').text(serverError503Error)
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
        $.ajax({
          url: MAIN_API_PATH + getGmtAPI,
          method: POST,
          contentType: Content_Type,
          dataType: 'json',
          success: function (data, textStatus, xhr) {
            const encrypt = new JSEncrypt()
            encrypt.setPublicKey(sitePublicKey)
            const currentDateString = String(data.unixtime)
            securityKeyEncrypted = encrypt.encrypt(pageName + currentDateString)
            SecurityKeyTime = false
            getResourcesData(skip, page, search)
          },
          error: function (xhr, status, error) {
            $.getJSON(worldTimeAPI, function (data) {
              const encrypt = new JSEncrypt()
              encrypt.setPublicKey(sitePublicKey)
              const currentDateString = String(data.unixtime)
              securityKeyEncrypted = encrypt.encrypt(pageName + currentDateString)
              SecurityKeyTime = false
              getResourcesData(skip, page, search)
            })
          }
        })
      } else {
        // $('#cover-spin').hide(0);
        $('#resourcesCardErrorText').text(serverError503Error)
      }
    }
  })
}


// populate service cards
function populateServiceCardsToUI(dataArray) {


  // let populate this html dynamicaly

  // Get the parent container (make sure this exists in your HTML)
  const container = document.getElementById("resourcesListRow");

  // Clear it first (in case you want to re-populate)
  container.innerHTML = "";

  // Loop through the data and build cards
  dataArray.forEach(data => {
    // Create the card wrapper
    const cardHolderDiv = document.createElement("div");
    cardHolderDiv.className = "p-2 mt-0 col-4";
    const card = document.createElement("div");
    card.className = "card h-100 w-100";
    card.style.border = "1px solid #97a3af";

    card.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <div class="card-header 
          ${data.type === 'file' ? 'bg-primary bg-opacity-25 text-primary' :
        data.type === 'url' ? 'bg-success bg-opacity-25 text-success' :
          'bg-danger bg-opacity-25 text-danger'}">
          <h5 class="mb-0">${escapeHtml(data.title || 'Untitled')}</h5>
        </div>

        <div class="card-body d-flex flex-column justify-content-between">
          <p class="mb-0 fs-6">${escapeHtml(data.description || '&nbsp;')}</p>
        </div>

        <div class="card-footer p-2">
          <div class="d-flex justify-content-between">
            <small class="text-dark mt-2">
              Updated: ${new Date(Number(data.updated_at) * 1000).toLocaleDateString()}
            </small>
            ${data.type === 'file'
        ? `<button type="button" class="btn btn-outline-primary btn-sm px-4"
                    data-id="${data.document_id}"
                    data-source="${encodeURIComponent(data.source)}"
                    data-title="${encodeURIComponent(data.title)}"
                    onclick="downloadDocument(decodeURIComponent(this.dataset.source), decodeURIComponent(this.dataset.title))">
                    Download</button>`
        : data.type === 'url'
          ? `<button type="button" class="btn btn-outline-success btn-sm px-4"
                    data-id="${data.document_id}"
                    data-source="${encodeURIComponent(data.source)}"
                    onclick="openUrlInNewTab(decodeURIComponent(this.dataset.source))">
                    Open Link</button>`
          : `<button type="button" class="btn btn-outline-danger btn-sm px-4"
                    data-id="${data.document_id}"
                    data-title="${encodeURIComponent(data.title)}"
                    data-source="${encodeURIComponent(data.source)}"
                    onclick="showInCanvas(decodeURIComponent(this.dataset.title), decodeURIComponent(this.dataset.source))">
                    View</button>`
      }
          </div>
        </div>
      </div>
    `;




    cardHolderDiv.appendChild(card);
    // Append card to container
    container.appendChild(cardHolderDiv);
  });

}

function downloadDocument(fileUrl, document_Name) {
  $("#cover-spin").show();


  const payload = JSON.stringify({
    download_file: fileUrl,

  });

  const options = {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let mainPath = "https://min.cytex.io/ctxio/download/file";

  fetch(mainPath, options)
    .then((xhr) => {
      if (xhr.status === 200) {
        return xhr.blob();
      } else {
        $("#cover-spin").hide();
        if (xhr.status === 400) {
          showNotificationError("bg-orange", null, null, null, null, null, invalidRequest400Error);
        } else if (xhr.status === 401) {
          showNotificationError("bg-orange", null, null, null, null, null, unauthorizedRequest401Error);
        } else if (xhr.status === 404) {
          showNotificationError("bg-orange", null, null, null, null, null, notFound404Error);
        } else if (xhr.status === 503) {
          showNotificationError("bg-red", null, null, null, null, null, serverError503Error);
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
          $("#cover-spin").show();
          $.ajax({
            url: MAIN_API_PATH + getGmtAPI,
            method: POST,
            contentType: Content_Type,
            dataType: "json",
            success: function (data) {
              const encrypt = new JSEncrypt();
              encrypt.setPublicKey(sitePublicKey);
              const DateString = String(data.unixtime);
              securityKeyEncrypted = encrypt.encrypt(pageName + DateString);
              SecurityKeyTime = false;
              downloadUploadedFile(fileUrl, document_Name);
            },
            error: function () {
              $.getJSON(worldTimeAPI, function (data) {
                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(sitePublicKey);
                const DateString = String(data.unixtime);
                securityKeyEncrypted = encrypt.encrypt(pageName + DateString);
                SecurityKeyTime = false;
                downloadUploadedFile(fileUrl, document_Name);
              });
            },
          });
        } else {
          showNotificationError("bg-red", null, null, null, null, null, serverError503Error);
        }
      }
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Use the function parameter for file name
      a.download = document_Name;

      document.body.appendChild(a);
      a.click();

      $("#cover-spin").hide();
    })
    .catch((err) => console.log("FILE", err));
}



function showInCanvas(title, content) {
  document.getElementById('textOffcanvasLabel').textContent = title;
  document.getElementById('textOffcanvasBody').textContent = content || '(no text)';
  const offcanvas = new bootstrap.Offcanvas('#textOffcanvas');
  offcanvas.show();
}


function openUrlInNewTab(url) {
  // Opens the URL safely in a new tab
  window.open(url, '_blank', 'noopener,noreferrer');
}

function escapeHtml(str = '') {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}
