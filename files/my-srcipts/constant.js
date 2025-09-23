





// Tom select option
function initializeTomSelectWithOutSearchAndAtLeastHaveSingleValue(
  id,
  search,
  maxItem = 1,
  minItem = null
) {
  if (!search) {
    $(`#${id}`).addClass("caret-transparent");
  }
  let plugins;
  // console.log("maxItem",maxItem)
  if (maxItem != 1) {
    plugins = ["checkbox_options", "remove_button"];
  } else {
    plugins = [];
  }

  let tomSelect = new TomSelect(`#${id}`, {
    maxItems: maxItem,
    minItems: minItem,
    maxOptions: null,
    valueField: "id",
    labelField: "title",
    searchField: "title",
    create: false,
    plugins: plugins,
    // dropdownParent: "body",
    // controlInput:0,
    placeholder: "Select",
    onItemAdd: function (value, item) {
      $(`#${id}-error`).hide();
      tomSelect.settings.placeholder = "";
      if (!search) {
        // Remove the placeholder when an item is added

        if (tomSelect.items.length > 1) {
          tomSelect.clear(true);
          tomSelect.addItem(tomSelect.items[1]);
        }
      }
    },
    onItemRemove: function (value) {
      $(`#${id}-error`).show();
      $(`#${id}`).off("change", function () {
        return 0;
      });
      if (!search) {
        // Prevent backspace key from removing items
        if (tomSelect.items.length === 0) {
          tomSelect.addItem(value);
        }
      } else {
        if (tomSelect.items.length === 0) {
          // console.log(select1.items);
          tomSelect.settings.placeholder = "Select";
        }
      }
    },
  });
  $(`#${id}-ts-control`).attr("name", `${id}`);

  return tomSelect;
}

// Show loader and hide table
function showDataTableLoader(baseId) {
  // Show loader
  $(`#${baseId}Loader`).removeClass("d-none").addClass("d-flex");
  // Hide table, footer, heading, and error divs
  $(`#${baseId}, #${baseId}FooterDiv, #${baseId}DatatableMainHeading, #${baseId}ErrorDiv`).addClass("d-none");
}

// Hide loader and show table
function hideDataTableLoader200(baseId) {
  // Remove loader class
  $(`#${baseId}Loader`).removeClass("d-flex");

  // Hide loader and error div
  $(`#${baseId}Loader, #${baseId}ErrorDiv`).addClass("d-none");

  // Show table, footer, and heading
  $(`#${baseId}, #${baseId}FooterDiv, #${baseId}DatatableMainHeading`).removeClass("d-none");
}


// Hide loader and show error
function hideDataTableLoaderError(baseId) {
  // Remove loader class
  $(`#${baseId}Loader`).removeClass("d-flex");

  // Hide loader and error div
  $(`#${baseId}Loader, #${baseId}, #${baseId}DatatableMainHeading, #${baseId}FooterDiv`).addClass("d-none");

  // Show table, footer, and heading
  $(`#${baseId}ErrorDiv`).removeClass("d-none");

}

// generate link or span
function generateLinkOrSpan(value) {
  if (value) {
      return `<a class="transact-table-data" style="max-width: 500px; cursor: pointer;" target="_blank" href="${value}" title="${value}">${value}</a>`;
  } else {
      return `<span class="transact-table-data" style="max-width: 500px;">--</span>`;
  }
}

// check number
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

// Capitalize first later
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}