let municipalitySizeSelectInit, municipalityTechnologySelectInit, municipalityComplianceSelectInit

$(document).ready(function () {

    $('#mainContentInnerLoader').addClass('d-none')
    $('#mainContentInnerDataToShow').removeClass('d-none')



    municipalitySizeSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('municipalitySizeSelect', false);
    municipalityTechnologySelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('municipalityTechnologySelect', false);
    municipalityComplianceSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('municipalityComplianceSelect', false);




    updateFiltersSelectDataOptions()

});


// filter data
let filterSizeData = [
    { id: 'all', title: 'All' },
    { id: 'small', title: 'Small (<10k)' },
    { id: 'medium', title: 'Medium (10k-100k)' },
    { id: 'large', title: 'Large (>100k)' },
]
// filter technology data
let filterTechnologyData = [
    { id: 'all', title: 'All' },
    { id: 'microsoft', title: 'Microsoft 365' },
    { id: 'On_prem', title: 'On-Prem' },
    { id: 'other', title: 'Other Cloud' },
]

// filter compliance data
let filterComplianceData = [
    { id: 'all', title: 'All' },
    { id: 'gdpr', title: 'GDPR' },
    { id: 'hipaa', title: 'HIPAA' },
    { id: 'ccpa', title: 'CCPA' },
]

// update filters select data options
function updateFiltersSelectDataOptions() {

    municipalitySizeSelectInit.addOption(filterSizeData);
    municipalitySizeSelectInit.setValue('all')

    municipalityTechnologySelectInit.addOption(filterTechnologyData);
    municipalityTechnologySelectInit.setValue('all')

    municipalityComplianceSelectInit.addOption(filterComplianceData);
    municipalityComplianceSelectInit.setValue('all')

}


// populate service cards
function populateServiceCardsToUI(dataArray) {


    // let populate this html dynamicaly
    /*

      <div class=" d-flex justify-content-around singleSericeCatalogCardRow flex-wrap" id="serviceCatalogCardsRow">
            <div class="card mt-4 col-12 " style="border:1px solid #97a3af">
              <!-- Header -->

              <div class="card-body">
                <div class="col-12 d-flex singleStepWithBulletsDiv">
                  <div class="me-3">
                    <span class="bullet-span" style="background-color: #97a3af; color: #97a3af;"></span>
                  </div>
                  <div class="col-9">
                    <h3>Managed Endpoint Protection</h3>
                    <p>24/7 endpoint monitoring and response</p>
                    <p class="mt-2 mb-0">Targets: small, medium, large</p>
                  </div>
                  <div class="col-3 d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-outline-primary btn-lg px-4">Get Estimate</button>
                    <button type="button" class="btn btn-outline-primary btn-lg px-4 ms-4 ">Details</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- end service catalog cards -->
          </div>

    */

    // Get the parent container (make sure this exists in your HTML)
    const container = document.getElementById("serviceCatalogCards");

    // Clear it first (in case you want to re-populate)
    container.innerHTML = "";

    // Loop through the data and build cards
    dataArray.forEach(service => {
        // Create the card wrapper
        const card = document.createElement("div");
        card.className = "card mt-4 col-12";
        card.style.border = "1px solid #97a3af";

        // Inner HTML
        card.innerHTML = `
    <div class="card-body">
      <div class="col-12 d-flex singleStepWithBulletsDiv">
        <div class="me-3">
          <span class="bullet-span" style="background-color: #97a3af; color: #97a3af;"></span>
        </div>
        <div class="col-9">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <p class="mt-2 mb-0">Targets: ${service.targets}</p>
        </div>
        <div class="col-3 d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-outline-primary btn-lg px-4" data-id="${service.id}">Get Estimate</button>
          <button type="button" class="btn btn-outline-primary btn-lg px-4 ms-4" data-id="${service.id}">Details</button>
        </div>
      </div>
    </div>
  `;

        // Append card to container
        container.appendChild(card);
    });

}

let serviceCatalogData = [
    {
        title: "Managed Endpoint Protection",
        description: "24/7 endpoint monitoring and response",
        targets: "small, medium, large",
        id: 1
    },
    {
        title: "Cloud Security Monitoring",
        description: "Continuous monitoring of cloud environments",
        targets: "medium, large",
        id: 2
    },
    {
        title: "Identity and Access Management",
        description: "Secure user access and identity management",
        targets: "small, medium, large",
        id: 3
    },
    {
        title: "Data Loss Prevention",
        description: "Protect sensitive data from unauthorized access",
        targets: "large",
        id: 4
    },
    {
        title: "Security Awareness Training",
        description: "Educate employees on cybersecurity best practices",
        targets: "small, medium, large",
        id: 5
    },
    {
        title: "Vulnerability Management",
        description: "Identify and remediate security vulnerabilities",
        targets: "medium, large",
        id: 6
    },

]

// call the function to populate service cards to UI
populateServiceCardsToUI(serviceCatalogData)