// Special Characters Not Allowed Validation
jQuery.validator.addMethod('specialCharactersNotAllowed', function (value, element) {
  return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value)
}, 'Special characters not allowed.')
 
// Must include 1 character at least Validation
$.validator.addMethod('atLeastOneCharacter', function (value, element) {
  // Check that it contains at least one character.
  return this.optional(element) || /[a-zA-Z]/.test(value)
}, 'Must include at least 1 alphabet.')

// Strong Password Validation
$.validator.addMethod('strongPassword', function (value, element) {
  const password = value;
  if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&'"|*()_+{}\[\]:;<>,.?~\\/\-=!`^])(?!.*\s)(.{8,50}$)$/u.test(password))) {
    return false;
  }
  return true;
}, function (value, element) {
  const password = $(element).val();
  if (!(/^(.{8,50}$)/.test(password))) { 
    return 'Password must be between 8 to 50 characters long.';
  } else if (!(/^\S*$/.test(password))) {
    return 'Password cannot contain whitespaces.';
  } else if (!(/^(?=.*[A-Z])/.test(password))) {
    return 'Password must contain at least one uppercase letter.';
  } else if (!(/^(?=.*[a-z])/.test(password))) {
    return 'Password must contain at least one lowercase letter.';
  } else if (!(/^(?=.*[0-9])/.test(password))) {
    return 'Password must contain at least one digit.';
  } else if (!(/^(?=.*[@#$%&'"|*()_+{}\[\]:;<>,.?~\\/\-=!`^])/.test(password))) {
    return 'Password must contain at least one special character.';
  }

  return false;
});

$.validator.addMethod("startTimeNotLaterThanCurrentTime", function(value, element) {
  // Get the combined date and time from the input field
  var combinedDateTime = $('#phishingLunchedCampaignSelectStartDate').val();
  // Split the combined string into date and time parts
  var [selectedDate, selectedTime] = combinedDateTime.split(' ');
  // Ensure the date and time are correctly formatted for the Date constructor
  var selectedDateTimeString = `${selectedDate}T${selectedTime}:00`;
  var selectedDateTime = new Date(selectedDateTimeString);

  // Check if selectedDateTime is a valid date
  if (isNaN(selectedDateTime.getTime())) {
      console.error("Invalid Date:", selectedDateTimeString);
      return false;  // Invalid date
  }
  // Get the current date and time
  var currentDateTime = new Date();
  // Normalize the selected date and time to the nearest minute
  selectedDateTime.setSeconds(0, 0);
  currentDateTime.setSeconds(0, 0);
  // Compare the selected start time with the current time
  return selectedDateTime >= currentDateTime;
}, "Start time cannot be previous to current time.");


// Strong Secret key
// Strong Password Validation
$.validator.addMethod('strongKey', function (value, element) {
  const password = value
  if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&'"|*()_+{}\[\]:;<>,.?~\\/\-=!`^])(?!.*\s)(.{8,50}$)$/u.test(password))) {
    return false
  }
  return true
}, function (value, element) {
  const password = $(element).val()
  if (!(/^(.{8,50}$)/.test(password))) {
    return 'Secret key must be between 8 to 50 characters long.'
  } else if (!(/^(?=.*[A-Z])/.test(password))) {
    return 'Secret key must contain at least one uppercase letter.'
  } else if (!(/^(?=.*[a-z])/.test(password))) {
    return 'Secret key must contain at least one lowercase letter.'
  } else if (!(/^(?=.*[0-9])/.test(password))) {
    return 'Secret key must contain at least one digit.'
  } else if (!(/^(?=.*[@#$%&'"|*()_+{}\[\]:;<>,.?~\\/\-=!`^])/.test(password))) {
    return 'Secret key must contain at least one special character.';
  }
  return false
})
// Only digits Not Allowed Validation
$.validator.addMethod('onlyDigitsNotAllowed', function (value, element) {
  return this.optional(element) || /(?!^\d+$)^.+$/.test(value)
}, 'Must include at least 1 alphabet.')

// Only digits Not Allowed Validation
$.validator.addMethod('email', function (value, element) {
  return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}, 'Enter valid email address.')

// Checkboxes Validation
jQuery.validator.addMethod('checkboxes', function (value, element) {
  return $('input[name=access]:checked').length > 0
}, 'Select at least one checkbox.')


jQuery.validator.addMethod('edrCheckboxes', function (value, element) {
  return $('input[name=enable]:checked').length > 0
}, 'Select at least one checkbox.')

jQuery.validator.addMethod('edrEditCheckboxes', function (value, element) {
  return $('input[name=editenable]:checked').length > 0
}, 'Select at least one checkbox.')
// Select Picker Validation
// add the rule here
$.validator.addMethod('emptyOptions', function (value, element, arg) {
  return arg != jQuery(element).find('option:selected').text()
}, 'Value must not equal arg.')

// IPv4 & IPv6 type Selection
dataSourceRadio(0)
function dataSourceRadio (ip_type) {
  // If IPv4 is selcted
  if (ip_type == 0) {
    // $.validator.addMethod('onlyDigitsAllowed', function (value, element) {
    //   return this.optional(element) || /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value)
    // }, 'Enter valid IPv4 address.')
    $.validator.addMethod('onlyDigitsAllowed', function (value, element) {
      // IPv4 regex
      const ipv4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    
      // IPv6 regex
      const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,5}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,6}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,7}|:)|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
    
      // Check if the value matches either IPv4 or IPv6 regex
      return this.optional(element) || ipv4Regex.test(value) || ipv6Regex.test(value);
    }, 'Enter a valid IPv4 or IPv6 address.');
    $('#incoming_IP_input-error').css('display', 'none')
    $.validator.addMethod('onlyIPV4Allowed', function (value, element) {
      // IPv4 regex
      const ipv4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    
      // Check if the value matches either IPv4 or IPv6 regex
      return this.optional(element) || ipv4Regex.test(value);
    }, 'Enter a valid IPv4 address.');
    $('#incoming_IP_input-error').css('display', 'none')
  }
  // If IPv6 is selcted
  else if (ip_type == 1) {
    //  Ipcount = 1
    $.validator.addMethod('onlyDigitsAllowed', function (value, element) {
      return this.optional(element) || /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/.test(value)
    }, 'Enter valid IPv6 address.')
    $('#incoming_IP_input-error').css('display', 'none')
  }
}

// Special Characters Not Allowed Validation
jQuery.validator.addMethod('Characters', function (value, element) {
  return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value)
}, 'Only digits numbers are allowed.')

// check for SMTP Server
jQuery.validator.addMethod('smtpServerValidation', function (value, element) {
  return this.optional(element) || /^[\w]+[.][\w]+[.][\w]+$/.test(value)
}, 'Please provide valid SMTP Server.')

// Special Characters Not Allowed Validation
jQuery.validator.addMethod('onlyNumberDegitsAllowed', function (value, element) {
  return this.optional(element) || /^[0-9]+$/.test(value)
}, 'Only digits allowed.')

// Special Chrachter not allowed except dot (.), hyphen (-), and underscore (_)
jQuery.validator.addMethod('chractesDotHypenUnderscore', function (value, element) {
  return this.optional(element) || /^[a-zA-Z0-9\.\-_]+$/.test(value)
}, 'Special characters not allowed.')

// Special Characters With out Space Hyphen and Parenthesis Not Allowed Validation
jQuery.validator.addMethod('SpaceHyphenAndParenthesisAllowed', function (value, element) {
  return this.optional(element) || /^[a-zA-Z0-9 ()-]+$/.test(value)
}, 'Special characters not allowed.')

// Domain Validation for Deny list and permit list Policy

jQuery.validator.addMethod('policyDomainValidation', function (value, element) {
  // Regular expression to check if the domain is valid and doesn't contain "http" or "https"
  return this.optional(element) || /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/i.test(value)
}, 'Enter a valid domain.')

jQuery.validator.addMethod('policyDomainValidationNoHTTP', function (value, element) {
  // Error message function
  return this.optional(element) || !/[!@#$%&()+\=\[\]{};':"\\|,<>\?]+/i.test(value)
}, 'Enter domain without "http" or "https".')

// Domain Validation

jQuery.validator.addMethod('domainValidation', function (value, element) {
  return this.optional(element) || /^(?!:\/\/)([_a-zA-Z0-9]+\.)*?[_a-zA-Z0-9-][_a-zA-Z0-9-]+\.[_a-zA-Z]{2,6}?$/i.test(value)
}, 'Invalid partner domain.')

// URLs Validation

jQuery.validator.addMethod('validUrl', function (value, element) {
  return this.optional(element) || /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(value)
}, 'Invalid URLs format.')
// URLs Validation

jQuery.validator.addMethod('urlsValidation', function (value, element) {
  return this.optional(element) || /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(value)
}, 'Invalid URLs format.')
// atleastHasOneCharacter
jQuery.validator.addMethod('atleastHasOneCharacter', function (value, element) {
  return this.optional(element) || /[a-zA-Z]/.test(value)
},
'Must include at least 1 alphabet.'
)

// Special Characters With out Space Not Allowed Validation
jQuery.validator.addMethod('specialCharactersWithOutSpaceNotAllowed', function (value, element) {
  return this.optional(element) || /^[a-zA-Z0-9 ]+$/.test(value)
}, 'Special characters not allowed.')

// alphaNumericHyphenUnderScoreSpaceOnly
jQuery.validator.addMethod(

  'alphaNumericHyphenUnderScoreSpaceOnly',

  function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9-_ ]+$/.test(value)
  },

  'Must contain alphanumeric, space, hyphen and underscore'

)


// alphaNumericHyphenSpaceOnly
jQuery.validator.addMethod(

  'alphaNumericHyphenSpaceOnly',

  function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9- ]+$/.test(value)
  },

  'Must contain alphanumeric and hyphen'

)

// Only '-', '_', '.' Special Characters Allowed Validation
const numericReg = /^[A-Za-z0-9.'_\s-]+(?:[ .'-][A-Za-z0-9.'_\s-]+)*$/;
jQuery.validator.addMethod('SomeSpecialCharactersAllowed', function (value, element) {
  return this.optional(element) || numericReg.test(value)
}, "Permitted special characters: - , _ , . , '")

// Only '-', '_', '.' Special Characters Allowed Validation EDR AND SYSLOGS
const numericRegEDRAndSysLogs = /^[A-Za-z0-9._\s-]+(?:[ .-][A-Za-z0-9._\s-]+)*$/;
jQuery.validator.addMethod('SomeSpecialCharactersAllowedOonlyEDRAndSysLogs', function (value, element) {
  return this.optional(element) || numericRegEDRAndSysLogs.test(value)
}, "Permitted special characters: - , _ , .")

// Only '-', '_', '.' Special Characters Allowed Validatio
const numericRegAllowOnlySpace = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]*$/
jQuery.validator.addMethod('onlySpaceAllowed', function (value, element) {
  return this.optional(element) || numericRegAllowOnlySpace.test(value)
}, "Whitespaces are not allowed.")
// USERNAME NOT ALLLOWED SPACE
// jQuery.validator.addMethod('SpecialCharactersAllowedWithNotSpace', function (value, element) {
//   return this.optional(element) || /^[a-zA-Z0-9.\-_]+$/.test(value)
// }, 'Permitted special characters: -, _, .')
// Only '-', '_' Special Characters Allowed (Dot NOT Allowed) Validation EDR AND SYSLOGS
// Allow only letters, numbers, spaces, '-', '_', AND specifically ".pdf" at the end
// Allow only one dot, only for extension at the end
// Allow normal names OR wildcard like *.ext
const fileNameRegex = /^(?:[A-Za-z0-9\s]+|\*)\.[A-Za-z0-9]+$/;

jQuery.validator.addMethod('SomeSpecialCharactersAllowedButDotNot', function (value, element) {
  return this.optional(element) || fileNameRegex.test(value);
}, "Only letters, numbers, spaces, and '.' before extension (e.g., file.pdf, *.png)");



jQuery.validator.addMethod('SpecialCharactersAllowedWithNotSpace', function (value, element) {
  if (/\s/.test(value)) {
    // If the value contains a space
    $.validator.messages.SpecialCharactersAllowedWithNotSpace = 'Whitespaces are not allowed.';
    return false;
  }

  // Check for permitted special characters
  if (!/^[a-zA-Z0-9.\-_]+$/.test(value)) {
    // If the value contains other special characters
    $.validator.messages.SpecialCharactersAllowedWithNotSpace = 'Permitted special characters: -, _, .';
    return false;
  }

  // If the value is valid
  return true;
}, 'Permitted special characters: -, _, .');


jQuery.validator.addMethod('OnlyUnderScoreAllowedWithNotSpace', function (value, element) {
  if (/\s/.test(value)) {
    // If the value contains a space
    $.validator.messages.OnlyUnderScoreAllowedWithNotSpace = 'Whitespaces are not allowed.';
    return false;
  }

  // Check for permitted special characters
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    // If the value contains any other characters besides alphanumeric and _
    $.validator.messages.OnlyUnderScoreAllowedWithNotSpace = 'Permitted special character: _'; 
    return false;
}

  // If the value is valid
  return true;
}, 'Permitted special characters: _');


// Not in the array of names
$.validator.addMethod('notInArray', function (value, element, param) {
  console.log(value, 'value', param, 'param')
  return !param.includes(value)
},
'Account name already exists.'
)

// Not in the array of names
$.validator.addMethod('numberShouldbeMultipaleOF10', function (value, element, param) {
  // console.log(value, 'value', param, 'param')
  return value % 10 === 0
},
'Email count must be a multiple of 10'
)

// Phishing do not use Local Domains
$.validator.addMethod('doNotUseLocalDomainsEmail', function (value, element, param) {
  console.log(value, 'value', param, 'param')
  const atIndex = value.indexOf('@')
  if (atIndex !== -1) {
    const domain = value.slice(atIndex + 1)
    const domainName = domain.split('.')[0] // Get the part before the first dot

    return !param.includes(domainName)
  }
  return true // If no @ symbol is found, consider it allowed
},
'Use organization email'
)

// custom validation rule for Luch campaign Start and end date
$.validator.addMethod('endDateGreaterThanStartDate', function (value, element, params) {
  const startDate = moment($(params).val(), 'YYYY-MM-DD H:mm')
  const endDate = moment(value, 'YYYY-MM-DD H:mm')

  return endDate.isAfter(startDate)
}, 'End date must be greater than start date.')

// regix validation
$.validator.addMethod('isValidRegex', function (value, element) {
  try {
    // Attempt to create a new RegExp object with the user input
    new RegExp(value)
    return true
  } catch (e) {
    return false // Invalid regular expression
  }
}, 'Enter a valid regular expression.')


// Query Valiation
// jQuery.validator.addMethod('osQueryValidation', function (value, element) {
//   // Error message function
//   return this.optional(element) || !/^(SELECT|INSERT|UPDATE|DELETE)\s+[a-zA-Z0-9_.,\s]+\s+FROM\s+[a-zA-Z0-9_.,\s]+\s*(?:WHERE\s+[a-zA-Z0-9_.,\s]+)?\s*(?:ORDER\s+BY\s+[a-zA-Z0-9_.,\s]+)?\s*(?:ASC|DESC)?\s*;?$/i.test(value)
// }, 'Enter a valid query".')

// Define the regex pattern
const osQueryReg = /^(\s*;*\s*(?:\b(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TRUNCATE|GRANT|REVOKE|USE|BEGIN|COMMIT|ROLLBACK)\b[\s\S]*?;)\s*)*$/i;

// Add custom validation method
jQuery.validator.addMethod('osQueryValidation', function (value, element) {
  return this.optional(element) || osQueryReg.test(value);
}, "Enter a valid query");

// paths validations for EDR
pathValidationForEDR(0)
function pathValidationForEDR(fileType) {
  console.log("path Type", fileType)

  // If validating file paths
  if (fileType === 0) {
    // Windows path validation
    $.validator.addMethod('validateWindowsPath', function (value, element) {
      const windowsPathRegex = /^(?:[a-zA-Z]:\\|\\)(?:[^<>:"|?*\r\n]*\\|\*)*(?:[^<>:"|?*\r\n]*\*?(\.[a-zA-Z0-9]+)?|[^<>:"|?*\r\n]*)$/;

      // const windowsPathRegex = /^(?:[a-zA-Z]:\\(?:[^<>:"|?*]+\\)*[^<>:"|?*]*|\\\\[a-zA-Z0-9._-]+\\[^<>:"|?*]+(?:\\[^<>:"|?*]*)*|%[^%]+%)$/;
      return this.optional(element) || windowsPathRegex.test(value);
    }, 'Invalid Windows path.');
  }
  else if(fileType === 1){
    // Unix/macOS absolute path validation
    $.validator.addMethod('validateWindowsPath', function (value, element) {
      // const unixPathRegex = /^[a-zA-Z]:\\(?:[^\\/:*?"<>|%]+\\)*[^\\/:*?"<>|%]*$/;
    // Match absolute Linux paths (e.g., /home/username, /Users/%/Library/%%)
    const absolutePathRegex = /^\/([^\/%]+|%+)(\/([^\/%]+|%+))*$/;

    // Match relative Linux paths (e.g., ./folder, ../folder, ./%, ./%%)
    const relativePathRegex = /^(\.\/|(\.\.\/)+)?([^\/%]+|%+)(\/([^\/%]+|%+))*$/;

    // Ensure it doesn't match Windows paths
    const windowsPathRegex = /^[a-zA-Z]:\\/;

    // Validate as a Linux path and ensure it's not a Windows path
    return this.optional(element) || 
        (!windowsPathRegex.test(value) && (absolutePathRegex.test(value) || relativePathRegex.test(value)));
    }, 'Enter a valid path.');

  }
  else if(fileType === 2){
    // Unix/macOS relative path validation
    $.validator.addMethod('validateWindowsPath', function (value, element) {
      const relativeUnixPathRegex = /^(~?(\.\/|(\.\.\/)+)?([^\/]+\/)*([^\/%]+|%|%%))$/;
      // const relativeUnixPathRegex = /^(~?(\.\/|(\.\.\/)+)?([^\/%]*\/)*([^\/%]+|%[^%]*%))$/;
      return this.optional(element) || relativeUnixPathRegex.test(value);
    }, 'Enter a valid path.');

    // $('#file_path_input-error').css('display', 'none');
  }
}

// Combining both validations into one method
$.validator.addMethod('validatePathsForWindowAndMac', function (value, element) {
  const windowsPathRegex = /^[a-zA-Z]:\\([^\\\/:*?"<>|]+\\)*([^\\\/:*?"<>|]+|%|%%)$/;
  const unixPathRegex = /^(\/([^\/]+\/)*([^\/]+|%|%%))$/;
  const relativeUnixPathRegex = /^(~?(\.\/|(\.\.\/)+)?([^\/]+\/)*([^\/%]+|%|%%))$/;

  return this.optional(element) || windowsPathRegex.test(value) || unixPathRegex.test(value) || relativeUnixPathRegex.test(value);
}, 'Enter a valid path.');


// Reserved keyword – please choose a different group name. (Validation used in User Group)
$.validator.addMethod("notReservedKeyword", function(value, element) {
  const reservedKeywords = ["super_user", "parent_user"];
  return this.optional(element) || !reservedKeywords.includes(value.trim().toLowerCase());
}, "Reserved keyword - please choose a different group name.");





// Email template HTML validation
$.validator.addMethod("validHTML", function(value, element) {
    // Check if empty
    if (!value || value.trim() === '') {
        $(element).data('validation-error', 'HTML content cannot be empty');
        return false;
    }

    try {
        // Basic check for HTML-like content
        if (!/<[a-z][\s\S]*>/i.test(value)) {
            $(element).data('validation-error', 'Content does not appear to be HTML - no valid HTML tags found');
            return false;
        }

        // Parse with DOMParser for structural validation
        const parser = new DOMParser();
        const doc = parser.parseFromString(value, 'text/html');
        
        // Check for parsing errors
        const parseError = doc.querySelector('parsererror');
        if (parseError) {
            $(element).data('validation-error', 'Invalid HTML structure detected');
            return false;
        }

        // Check for unclosed tags using a more reliable method
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = value;
        const normalizedHTML = tempDiv.innerHTML;
        
        // If the normalized HTML is significantly different from input, likely has malformed tags
        if (Math.abs(normalizedHTML.length - value.length) > value.length * 0.2) {
            $(element).data('validation-error', 'Malformed HTML detected - check for unclosed or invalid tags');
            return false;
        }

        // Check for basic HTML structure issues
        const commonIssues = [
            { pattern: /<[a-z]+[^>]*>[^<]*$/i, message: 'Unclosed HTML tags detected' },
            { pattern: /<\/[^>]+>[^<]*/i, message: 'Closing tag without matching opening tag' },
            { pattern: /<[^>]*<[^>]*>/i, message: 'Nested tags without proper closure' }
        ];

        // for (const issue of commonIssues) {
        //     if (issue.pattern.test(value)) {
        //         $(element).data('validation-error', issue.message);
        //         return false;
        //     }
        // }

        // If HTMLHint is available, use it for additional validation
        if (window.HTMLHint && typeof window.HTMLHint.default?.verify === 'function') {
            const rules = {
                "tagname-lowercase": true,
                "attr-lowercase": true,
                "attr-value-double-quotes": true,
                "tag-pair": true,
                "spec-char-escape": true,
                "id-unique": true,
                "src-not-empty": true,
                "attr-no-duplication": true
            };

            const result = window.HTMLHint.default.verify(value, rules);
            if (result && result.length > 0) {
                const error = result[0];
                $(element).data('validation-error', `HTML Error: ${error.message} (Line ${error.line})`);
                return false;
            }
        }

        return true;

    } catch (e) {
        console.error('HTML validation error:', e);
        $(element).data('validation-error', 'HTML validation error: ' + e.message);
        return false;
    }
}, function(params, element) {
    return $(element).data('validation-error') || "Please enter valid HTML content.";
});

// Validation for string with email in angle brackets
$.validator.addMethod("stringWithEmailInBrackets", function(value, element) {
    // Require at least one letter or digit before the email in angle brackets
    // Allow letters, numbers, and specific special characters (,.-_) before the email
    // Don't allow anything after the closing bracket
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9,.\-_ ]*<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>$/;
    
    if (!value) return true; // Optional, return true if empty
    
    value = value.trim();
    
    // Check for presence of angle brackets first
    if (!/<.*>/.test(value)) {
        $.validator.messages.stringWithEmailInBrackets = "Please enter valid format: text &lt;email&gt;. Only letters, numbers, and , . - _ are allowed outside brackets.";
        return false;
    }
    
    // Check if there's text after the closing bracket
    const closingBracketIndex = value.lastIndexOf('>');
    if (closingBracketIndex !== -1 && closingBracketIndex < value.length - 1) {
        $.validator.messages.stringWithEmailInBrackets = "No text allowed after the email address.";
        return false;
    }
    
    // Check if email brackets are empty
    if (!/<[^>]+>/.test(value)) {
        $.validator.messages.stringWithEmailInBrackets = "Email address is required within angle brackets &lt;&gt;.";
        return false;
    }
    
    // Check if there's text before the email brackets and no leading whitespace
    const textBeforeEmail = value.substring(0, value.indexOf('<'));
    if (!textBeforeEmail || textBeforeEmail.trim().length === 0) {
        $.validator.messages.stringWithEmailInBrackets = "Text is required before the email address.";
        return false;
    }
    
    // Check for leading whitespace
    if (/^\s/.test(textBeforeEmail)) {
        $.validator.messages.stringWithEmailInBrackets = "Leading whitespace is not allowed before the text.";
        return false;
    }
    
    // Check for invalid characters in the text before email
    if (!/^[a-zA-Z0-9][a-zA-Z0-9,.\-_ ]*$/.test(textBeforeEmail)) {
        $.validator.messages.stringWithEmailInBrackets = "Only letters, numbers, and , . - _ are allowed before the email address.";
        return false;
    }
    
    // Check if starts with valid character
    if (!/^[a-zA-Z0-9]/.test(value)) {
        $.validator.messages.stringWithEmailInBrackets = "Must start with a letter or number before the email address.";
        return false;
    }
    
    // Check if the entire pattern matches
    if (!pattern.test(value)) {
        $.validator.messages.stringWithEmailInBrackets = "Please enter a valid email address within angle brackets.";
        return false;
    }
    
    return true;
}, "Please enter valid format: text &lt;email&gt;. Only letters, numbers, and , . - _ are allowed outside brackets.");

// Example usage in form validation:
/*
{
    rules: {
        fieldName: {
            required: true,
            stringWithEmailInBrackets: true
        }
    }
}
*/

// Add this once to define the rule
$.validator.addMethod("require_from_group", function(value, element, options) {
  var $fields = $(options[1], element.form),
      valid = $fields.filter(function() {
        return $(this).val().trim() !== "";
      }).length >= options[0];

  return valid;
}, "Please fill at least one of these fields.");


// ZTN validations 
// Time Duration Validator (between 60 and 10080)
jQuery.validator.addMethod('validTimeDuration', function (value, element) {
  const timeDuration = parseInt(value, 10);
  return this.optional(element) || (timeDuration >= 60 && timeDuration <= 10080);
}, 'Session duration must be between 60 and 10080 minutes.');

// Inactive Threshold Validator (between 15 and 480)
jQuery.validator.addMethod('validInactiveThreshold', function (value, element) {
  const inactiveThreshold = parseInt(value, 10);
  return this.optional(element) || (inactiveThreshold >= 15 && inactiveThreshold <= 480);
}, 'Inactive threshold must be between 15 and 480 minutes.');


$.validator.addMethod('atLeastOneInputRequired', function(value, element, selector) {
  let isValid = false;

  $(selector).each(function () {
    if ($(this).val() && $(this).val().toString().trim() !== '') {
      isValid = true;
      return false; // break loop
    }
  });

  return isValid;
}, 'Please fill at least one field.');