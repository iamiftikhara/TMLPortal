if (localStorage.getItem('_ia') !== 'true') {
  window.location.href = 'signin.html'
}

const tokenAuth = localStorage.getItem('_at')
const decryptedByte = CryptoJS.AES.decrypt(tokenAuth, 'My Secret Passphrase')
const authToken = decryptedByte.toString(CryptoJS.enc.Utf8)

let municipalitySizeSelectInit, NumberOfEmployeesSelectInit, cloudProviderSelectInit
let numberOfUsersSelectInit, numberOfEndPointsSelectInit, budgetRangeSelectInit

$(document).ready(function () {

  $('#mainContentInnerLoader').addClass('d-none')
  $('#mainContentInnerDataToShow').removeClass('d-none')



  municipalitySizeSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('municipalitySizeSelect', false);
  NumberOfEmployeesSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('numberOfEmployeesSelect', false);
  cloudProviderSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('cloudProviderSelect', false);
  numberOfUsersSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('numberOfUsersSelect', false);
  numberOfEndPointsSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('numberOfEndPointsSelect', false);
  budgetRangeSelectInit = initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue('budgetRangeSelect', false);



  



  updateFiltersSelectDataOptions()


  $('#monthlyCostText').text('$5,000');
  $('#annualCostText').text('$60,000');

});

// --------------------------
// ✅ Start Summary JSON Data
// --------------------------
const stats = {
  total: 10,
  pending: 5,
  negotiation: 3,
  finalized: 1,
  halted: 1
};

// --------------------------
// ✅ Card Configuration (excluding total)
// --------------------------
const cardConfig = {
  pending:      { label: 'Pending Orders',      icon: 'bi-hourglass-split', color: 'warning' },
  negotiation:  { label: 'Orders in Process',  icon: 'bi-chat-dots', color: 'info'  },
  finalized:    { label: 'Finalized Orders',    icon: 'bi-check2-circle', color: 'success' },
  halted:       { label: 'Halted Orders',       icon: 'bi-x-circle', color: 'danger' }
};

const total = stats.total ?? 0;

// --------------------------
// ✅ Target container elements
// --------------------------
const $row = document.getElementById('summaryCardsRow');
const $totalSummary = document.getElementById('totalSummary');

// --------------------------
// ✅ Create cards dynamically
// --------------------------
Object.keys(cardConfig).forEach((key) => {
  const cfg = cardConfig[key];
  const value = stats[key] ?? 0;

  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-3'; // Added margin bottom for spacing

  col.innerHTML = `
    <div class="card shadow-sm border-0 h-100 position-relative">
      <div class="card-body d-flex flex-column justify-content-between">
        
        <!-- Start Help Text (Top) -->

        <!-- Label + Icon -->
        <div class="d-flex align-items-center mb-2">
          <i class="bi ${cfg.icon} fs-3 text-${cfg.color} me-2"></i>
          <span class="text-muted small" style="font-size:14px">${cfg.label}</span>
        </div>

        <!-- Value / Total -->
        <h3 class="fw-bold text-center mb-0" style="font-size:30px;">
          ${value}
          <span style="font-size:12px; color:#b0b0b0;">out of ${total}</span>
        </h3>

    

      </div>

      <!-- Ellipsis bottom-right -->
      <a href="orders.html" class="position-absolute bottom-0 end-0 p-2 text-muted" style="font-size:18px; text-decoration:none;">
        <i class="bi bi-three-dots"></i>
      </a>
    </div>
  `;

  $row.appendChild(col);
});

// --------------------------
// ✅ END: Total summary card at the bottom
// --------------------------



// municipality size data
let filterSizeData = [
  { id: 'all', title: 'All' },
  { id: 'small', title: 'Less than 50,000' },
  { id: 'medium', title: '50,000 - 500,000' },
  { id: 'large', title: 'More than 500,000' },
]
// number of employees data
let numberOfEmployeesData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]

// cloud providers data
let cloudProviderData = [
  { id: 'all', title: 'All' },
  { id: 'aws', title: 'AWS' },
  { id: 'azure', title: 'Azure' },
  { id: 'gcp', title: 'GCP' },
  { id: 'ibm', title: 'IBM Cloud' },
  { id: 'oracle', title: 'Oracle Cloud' },
]

// number of users
let numberOfUsersData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]
// number of end points
let numberOfEndPointsData = [
  { id: '1-50', title: '1-50' },
  { id: '51-200', title: '51-200' },
  { id: '201-500', title: '201-500' },
  { id: '501-1000', title: '501-1000' },
  { id: '1001+', title: '1001+' },
]
// budget range data
let budgetRangeData = [
  { id: 'less', title: 'Less than $10,000' },
  { id: '10k-50k', title: '$10,000 - $50,000' },
  { id: '50k-100k', title: '$50,000 - $100,000' },
  { id: '100k-500k', title: '$100,000 - $500,000' },
  { id: '500k+', title: 'More than $500,000' },
  
]

// update select data options
function updateFiltersSelectDataOptions() {

  municipalitySizeSelectInit.addOption(filterSizeData);
  municipalitySizeSelectInit.setValue('all')

  NumberOfEmployeesSelectInit.addOption(numberOfEmployeesData);
  NumberOfEmployeesSelectInit.setValue('51-200')

  cloudProviderSelectInit.addOption(cloudProviderData);
  cloudProviderSelectInit.setValue('all')

  numberOfUsersSelectInit.addOption(numberOfUsersData);
  numberOfUsersSelectInit.setValue('1-50')

  numberOfEndPointsSelectInit.addOption(numberOfEndPointsData);
  numberOfEndPointsSelectInit.setValue('1-50')

  budgetRangeSelectInit.addOption(budgetRangeData);
  budgetRangeSelectInit.setValue('less')

}



