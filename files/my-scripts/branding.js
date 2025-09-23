$(document).ready(function () {
  const url = new URL(window.location);
  const newUrl =  url.origin;
  const imageElement = $(".singinFormLogoDiv");
  let parent_org 
  let governing_org 
  // Create an object to map URLs to their corresponding image data
  const imageMap = {
    "https://profectus.cytex.io": {
      src: "/files/images/logo/prosfectus.png",
      width: "14rem",
      marginTop: "0px",
      parent_org: false,
      governing_org: false,
      signUphref:newUrl+"/signup.html"
    },
    "https://socialimpact.cytex.io": {
      src: "/files/images/logo/socialImpact.png",
      width: "18rem",
      marginTop: "-10px",
      parent_org: false,
      governing_org: false,
      signUphref:newUrl+"/signup.html"
    },
    "https://malvern.cytex.io": {
      src: "/files/images/branding/malvern-health-logo.svg",
      width: "18rem",
      marginTop: "0px",
      parent_org: false,
      governing_org: false,
      signUphref:newUrl+"/signup.html"
    },
    "https://gameday.cytex.io": {
      src: "/files/images/branding/gameday.png",
      width: "12rem",
      marginTop: "0px",
      parent_org: false,
      governing_org: false,
      signUphref:newUrl+"/signup.html"
    },
    "https://nuari.cytex.io": {
      src: "/files/images/branding/nuari.jpg",
      width: "18rem",
      marginTop: "0px",
      parent_org: '85951da6-3884-4929-9f65-e0d32aa73a8e',
      governing_org: '85951da6-3884-4929-9f65-e0d32aa73a8e',
      href: "https://compliance.nuari.org/assessment/signin.html",
      signUphref:newUrl+"/signup.html"
    },
    "https://compliance.nuari.org": {
      src: "/files/images/branding/nuari.jpg",
      width: "18rem",
      marginTop: "0px",
      parent_org: '85951da6-3884-4929-9f65-e0d32aa73a8e',
      governing_org: '85951da6-3884-4929-9f65-e0d32aa73a8e',
      href: "https://compliance.nuari.org/assessment/signin.html",
      signUphref:newUrl+"/signup.html"
    },
    "https://chargenet.cytex.io": {
      src: "/files/images/branding/chargenet-logo.png",
      width: "25rem",
      marginTop: "0px",
      parent_org: false,
      governing_org: false,
      signUphref:newUrl+"/signup.html"
    },
    "https://ui.neutron.cytex.io": {
      src: "/files/images/branding/sqalogo.png",
      width: "12rem",
      marginTop: "0px",
     parent_org: "2a14fa6c-d289-43f0-b164-8ba194669cbe",
     governing_org: '2a14fa6c-d289-43f0-b164-8ba194669cbe',
     signUphref:newUrl+"/signup.html"
    },
    "https://demo.cytex.io": {
      src: "/files/images/logo/logo.png",
      width: "12rem",
      marginTop: "0px",
     parent_org: false,
     governing_org: false,
     signUphref:newUrl+"/signup.html"
    },
    "https://team.cytex.io": {
      src: "/files/images/branding/team.jpeg",
      width: "8em",
      marginTop: "0px",
      parent_org: '1a13c3c8-1360-4438-b9d1-6a3b89f0715c',
      governing_org: '1a13c3c8-0631-4438-b9d1-6a3b89f0715c',
      signUphref:newUrl+"/signup.html"
    },
    "https://appgate.cytex.io": {
      src: "/files/images/branding/appgate-logo-black.svg",
      width: "18rem",
      marginTop: "0px",
      parent_org: false,
      governing_org: false,
      signUphref:newUrl+"/signup.html"
    },
    "https://acellc.cytex.io": {
      src: "/files/images/branding/acellc.webp",
      width: "14rem",
      marginTop: "0px",
      parent_org: false,
      governing_org: false,
      signUphref:newUrl+"/signup.html"
    },
    "https://uiv3.cytex.io": {
      src: "/files/images/logo/logo.png",
      width: "15rem",
      marginTop: "0px",
      parent_org: 'ac06f0ab-1071-4abd-87b6-4037d5bc0d83',
      governing_org: 'ac06f0ab-1071-4abd-87b6-4037d5bc0d83',
       signUphref:newUrl+"/signup.html"
    },
    "https://octopian.cytex.io": {
      src: "/files/images/branding/octopian1.svg",
      width: "15rem",
      marginTop: "0px",
      parent_org: "85951da6-2072-4929-87b6-e0d32aa73a8e",
      governing_org: "85951da6-2072-4929-87b6-e0d32aa73a8e",
       signUphref:newUrl+"/signup.html"
    },
    "https://ssc.cytex.io": {
      src: "/files/images/branding/ssc.avif",
      width: "10rem",
      marginTop: "0px",
      parent_org: '9b95115b-ec06-4c1b-b0e7-3a1af4cf7231',
      governing_org: '9b95115b-ec06-4c1b-b0e7-3a1af4cf7231',
       signUphref:newUrl+"/signup.html"
    },
    "https://utexas.cytex.io": {
      src: "/files/images/branding/utexas.svg",
      width: "15rem",
      marginTop: "0px",
      parent_org: '07b5667e-11bb-4698-83fe-3005b054f06e',
      governing_org: '07b5667e-11bb-4698-83fe-3005b054f06e',
       signUphref:newUrl+"/signup.html"
    },
    "default": {
      src: "/files/images/logo/logo.png",
      width: "15rem",
      marginTop: "0px",
    }
    
    // app gate

  };
// Get the corresponding image data for the current URL or use the default
  const logImageData = imageMap[newUrl] || imageMap["default"];
  parent_org = logImageData.parent_org
  governing_org = logImageData.governing_org
  localStorage.setItem("prnt_org",logImageData.parent_org)
  localStorage.setItem("gvrn_org",logImageData.governing_org)
  console.log("logImageData",logImageData.parent_org,logImageData.governing_org)
 // Check if 'href' exists and update the risk assessment link and visibility
if (logImageData.href) {
  $("#riskApp")
    .addClass("d-block")
    .removeClass("d-none")
    .attr("href", logImageData.href);
    const elements = $("#lineShow,#spanhowOnlyForHref,#showOrline");

    if (parent_org === false || governing_org === false) {
        elements.addClass("d-none").removeClass("d-block");
    } else {
        elements.addClass("d-block").removeClass("d-none");
    }
    
  $("#spanhowOnlyForHref").addClass("d-flex").removeClass("d-none");
  $("#showOrline").removeClass("d-none");
}
  // Check if signUphref exists and update the signup link
if (logImageData.signUphref) {
  $("#chldSignup")
    .addClass("d-block")
    .removeClass("d-none")
    .attr("href", logImageData.signUphref);
    if(parent_org === false || governing_org === false){
      $("#lineShow").addClass("d-none").removeClass("d-block");
    }
    else{
      $("#lineShow").addClass("d-block").removeClass("d-none");
    }
   
} else {
  // Hide signup link if signUphref is missing
  $("#chldSignup").addClass("d-none").removeClass("d-block");
}
// Create the HTML for the image
  const logImage = `<div class="text-center">
      <img class="zi-2" src="${logImageData.src}" alt="Image Description" style="width: ${logImageData.width};margin-top: ${logImageData.marginTop};">
      </div>`;
// Update the image element container classes and append the new image
  imageElement.addClass("d-block").removeClass("d-flex").append(logImage);
  // Conditionally show the "poweredby Cytex Image" element if the URL matches one in the map
  if (newUrl in imageMap) {
    $(".poweredby").removeClass("d-none");
  }
});