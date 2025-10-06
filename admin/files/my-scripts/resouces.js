if (localStorage.getItem('_ia') !== 'true') {
  window.location.href = 'signin.html'
}

const tokenAuth = localStorage.getItem('_at')
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, 'My Secret Passphrase')
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8)

let municipalitySizeSelectInit, municipalityTechnologySelectInit, municipalityComplianceSelectInit

$(document).ready(function () {

  $('#mainContentInnerLoader').addClass('d-none')
  $('#mainContentInnerDataToShow').removeClass('d-none')







});



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
    cardHolderDiv.className = "p-2 mt-4 col-4";
    const card = document.createElement("div");
    card.className = "card h-100 w-100";
    card.style.border = "1px solid #97a3af";

    // Inner HTML
    card.innerHTML = `
        <div class="card-body">
          <div class="col-12 d-flex flex-column singleStepWithBulletsDiv">
            <div class="col-12">
              <h3>${data.title}</h3>
              <p class='fs-3'>${data.description}</p>
            </div>
            <div class="col-12 d-flex justify-content-center align-items-center mt-2">
              <button type="button" class="btn btn-outline-primary btn-sm px-4 w-75" data-id="${data.id}">View</button>
              <button type="button" class="btn btn-outline-secondary btn-sm px-4 ms-4 w-75" data-id="${data.id}">Download</button>
            </div>
          </div>
        </div>
        <div class="card-footer p-3 pb-0" style="background-color: #d9d9d9;">
          <p class='text-dark'>Updated: ${data.date_modified}</p>
        </div>
      `;

    cardHolderDiv.appendChild(card);
    // Append card to container
    container.appendChild(cardHolderDiv);
  });

}

let resourcesDocumentationData = [
  {
    title: "Onboarding Guide",
    description: "Step-by-step instructions for setting up your first cybersecurity service.",
    date_modified: "June 2024",
    id: 1
  },
  {
    title: "Incident Response Plan Template",
    description: "A customizable template to help you create an effective incident response plan.",
    date_modified: "July 2024",
    id: 2
  },
  {
    title: "Cybersecurity Best Practices",
    description: "A comprehensive guide on best practices to enhance your organization's cybersecurity posture.",
    date_modified: "August 2024",
    id: 3
  },
  {
    title: "Compliance Checklist",
    description: "A checklist to ensure your organization meets key cybersecurity compliance requirements.",
    date_modified: "September 2024",
    id: 4
  },
  {
    title: "Phishing Awareness Training",
    description: "Materials and resources to educate your team about phishing threats and prevention.",
    date_modified: "October 2024",
    id: 5
  },
  {
    title: "Vulnerability Management Guide",
    description: "Guidelines for identifying, assessing, and mitigating vulnerabilities in your systems.",
    date_modified: "November 2024",
    id: 6
  },


]

// call the function to populate service cards to UI
populateServiceCardsToUI(resourcesDocumentationData)