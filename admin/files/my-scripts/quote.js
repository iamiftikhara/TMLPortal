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



