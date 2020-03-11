/**
 *
 * @param {int} x
 * @param {Element} productPricingElement
 *
 * Create a div to hold the product required stock settings
 *
 */

function wcrs_createProductSettingsElement(productPricingElement) {
  var d = document.createElement("div");
  d.className = "wcrs_product_settings show_if_simple options_group";
  d.id = "wcrs_product_settings";
  productPricingElement.appendChild(d);
  return d;
}

/**
 *
 * @param {int} x
 * @param {Element} variablePricingElement
 *
 * Create a div to hold the variation required stock settings
 *
 */

function wcrs_createVariationSettingsElement(x, variablePricingElement) {
  var d = document.createElement("div");
  d.className = "wcrs_variation_settings";
  d.id = "wcrs_variation_settings-" + x;
  variablePricingElement.appendChild(d);
  return d;
}

/**
 *
 * @param {int} x
 * @param {Element} productSettingsElement
 * @param {boolean} enabled
 *
 * Create a div to hold the product required stock setting rows
 *
 */

function wcrs_createProductStockSettings(productSettingsElement, enabled) {
  var d = document.createElement("div");
  d.className = "wcrs_product_stock_settings";
  d.id = "wcrs_product_stock_settings";
  if (!enabled) {
    d.style.display = "none";
  }
  productSettingsElement.appendChild(d);
  return d;
}

/**
 *
 * @param {int} x
 * @param {Element} variationSettingsElement
 * @param {boolean} enabled
 *
 * Create a div to hold the variation required stock setting rows
 *
 */

function wcrs_createVariationStockSettings(
  x,
  variationSettingsElement,
  enabled
) {
  var d = document.createElement("div");
  d.className = "wcrs_variation_stock_settings";
  d.id = "wcrs_variation_stock_settings-" + x;
  if (!enabled) {
    d.style.display = "none";
  }
  variationSettingsElement.appendChild(d);
  return d;
}

/**
 *
 * @param {array} values
 * @param {Element} productStockElement
 *
 * Create the required stock enabled checkbox
 *
 */

function wcrs_createProductEnabledCheckboxInput(values, productStockElement) {
  var p = document.createElement("P");
  p.className = "wcrs_product_enabled form-field show-if-simple";
  p.id = "wcrs_product_enabled";
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "enabled";
  checkbox.value = "enabled";
  checkbox.id = "wcrs_product_required_stock_enabled";
  checkbox.checked = values.enabled;
  // checkbox.onclick = wcrs_enableCheckboxClick;
  checkbox.onclick = (function(x) {
    return function() {
      var stockSettingsElement = document.getElementById(
        `wcrs_product_stock_settings`
      );
      var stockSettingsAddRowLink = document.getElementById(
        `wcrs_product_add_stock_link`
      );
      if (this.checked == true) {
        stockSettingsElement.style.display = "block";
        stockSettingsAddRowLink.style.display = "block";
      } else {
        stockSettingsElement.style.display = "none";
        stockSettingsAddRowLink.style.display = "none";
      }
      runOnChange = wcrs_productOnChange();
    };
  })();
  // checkbox.onchange = wcrs_productOnChange();
  var label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.appendChild(document.createTextNode("Enable required stock"));
  p.appendChild(label);
  p.appendChild(checkbox);
  productStockElement.appendChild(p);
  return true;
}

/**
 *
 * @param {int} x
 * @param {array} values
 * @param {Element} variationStockElement
 *
 * Create the required stock enabled checkbox
 *
 */

function wcrs_createVariationEnabledCheckboxInput(
  x,
  values,
  variationStockElement
) {
  var p = document.createElement("P");
  p.className = "wcrs_variation_enabled form-row form-row-full options";
  p.id = "wcrs_variation_enabled-" + x;
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = x + "-enabled";
  checkbox.value = "enabled";
  checkbox.id = "wcrs_variation_required_stock-" + x + "-enabled";
  checkbox.checked = values.enabled;
  // checkbox.onclick = wcrs_enableCheckboxClick;
  checkbox.onclick = (function(x) {
    return function() {
      var stockSettingsElement = document.getElementById(
        `wcrs_variation_stock_settings-${x}`
      );
      var stockSettingsAddRowLink = document.getElementById(
        `wcrs_variation_add_stock_link-${x}`
      );
      if (this.checked == true) {
        stockSettingsElement.style.display = "block";
        stockSettingsAddRowLink.style.display = "block";
      } else {
        stockSettingsElement.style.display = "none";
        stockSettingsAddRowLink.style.display = "none";
      }
      runOnChange = wcrs_variationOnChange(this);
    };
  })(x);
  // checkbox.onchange = wcrs_variationOnChange(this);
  var label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.appendChild(document.createTextNode("Enable required stock"));
  p.appendChild(label);
  p.appendChild(checkbox);
  variationStockElement.appendChild(p);
  return true;
}

/**
 *
 * @param {int} y
 * @param {array} values
 * @param {Element} productStockRow
 *
 * Create the required stock sku field
 *
 */

function wcrs_createProductSkuTextInput(y, values, productStockRow) {
  var p = document.createElement("P");
  p.className =
    "form-field wcrs_product_required_stock_p wcrs_product_required_stock_sku form-row form-row-first";
  p.id = "wcrs_product_required_stock_p-" + y + "-sku";
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.defaultValue = values.sku;
  input.className = "wcrs_product_required_stock_sku";
  input.id = "wcrs_product_required_stock-" + y + "-sku";
  input.onchange = (function() {
    return function() {
      runOnChange = wcrs_productOnChange();
    };
  })();
  var label = document.createElement("label");
  label.htmlFor = input.id;
  label.className = "wcrs_product_required_stock_sku_label";
  label.appendChild(document.createTextNode("Required SKU"));
  p.appendChild(label);
  p.appendChild(input);
  productStockRow.appendChild(p);
  return true;
}

/**
 *
 * @param {int} x
 * @param {int} y
 * @param {array} values
 * @param {Element} variationStockRow
 *
 * Create the required stock sku field
 *
 */

function wcrs_createVariationSkuTextInput(x, y, values, variationStockRow) {
  var p = document.createElement("P");
  p.className =
    "form-field wcrs_variable_required_stock_p wcrs_variable_required_stock_sku form-row form-row-first";
  p.id = "wcrs_variation_required_stock_p-" + x + "-" + y + "-sku";
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.defaultValue = values.sku;
  input.className = "wcrs_variation_required_stock_sku";
  input.id = "wcrs_variation_required_stock-" + x + "-" + y + "-sku";
  input.onchange = (function(x) {
    return function() {
      runOnChange = wcrs_variationOnChange(this);
    };
  })(x);
  var label = document.createElement("label");
  label.htmlFor = input.id;
  label.className = "wcrs_variation_required_stock_sku_label";
  label.appendChild(document.createTextNode("Required SKU"));
  p.appendChild(label);
  p.appendChild(input);
  variationStockRow.appendChild(p);
  return true;
}

/**
 *
 * @param {int} y
 * @param {array} values
 * @param {Element} productStockRow
 *
 * Create the required stock quantity field
 *
 */

function wcrs_createProductQtyTextInput(y, values, productStockRow) {
  var p = document.createElement("P");
  p.className =
    "form-field wcrs_product_required_stock_p wcrs_product_required_stock_qty form-row form-row-last";
  p.id = "wcrs_product_required_stock_p-" + y + "-qty";
  var input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
  input.setAttribute("step", "1");
  input.defaultValue = Object.is(values.qty, undefined) ? 1 : values.qty;
  input.className = "wcrs_product_required_stock_qty";
  input.id = "wcrs_product_required_stock-" + y + "-qty";
  input.onchange = (function() {
    return function() {
      runOnChange = wcrs_productOnChange();
    };
  })();
  var label = document.createElement("label");
  label.htmlFor = input.id;
  label.className = "wcrs_product_required_stock_qty_label";
  label.appendChild(document.createTextNode("Qty"));
  p.appendChild(label);
  p.appendChild(input);
  productStockRow.appendChild(p);
  return true;
}

/**
 *
 * @param {int} x
 * @param {int} y
 * @param {array} values
 * @param {Element} variationStockRow
 *
 * Create the required stock quantity field
 *
 */

function wcrs_createVariationQtyTextInput(x, y, values, variationStockRow) {
  var p = document.createElement("P");
  p.className =
    "form-field wcrs_variable_required_stock_p wcrs_variable_required_stock_qty form-row form-row-last";
  p.id = "wcrs_variation_required_stock_p-" + x + "-" + y + "-qty";
  var input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
  input.setAttribute("step", "1");
  input.defaultValue = Object.is(values.qty, undefined) ? 1 : values.qty;
  input.className = "wcrs_variation_required_stock_qty";
  input.id = "wcrs_variation_required_stock-" + x + "-" + y + "-qty";
  input.onchange = (function(x) {
    return function() {
      runOnChange = wcrs_variationOnChange(this);
    };
  })(x);
  var label = document.createElement("label");
  label.htmlFor = input.id;
  label.className = "wcrs_variation_required_stock_qty_label";
  label.appendChild(document.createTextNode("Qty"));
  p.appendChild(label);
  p.appendChild(input);
  variationStockRow.appendChild(p);
  return true;
}

/**
 *
 * @param {*} productStockRow
 *
 * Remove the product required stock row
 *
 */
function wcrs_productRemoveRequiredStock(productStockRow) {
  console.log(productStockRow);
  productStockRow.parentNode.removeChild(productStockRow);
  return true;
}

/**
 *
 * @param {*} variationStockRow
 *
 * Remove the variation required stock row
 *
 */
function wcrs_variationRemoveRequiredStock(variationStockRow) {
  console.log(variationStockRow);
  jQuery(variationStockRow)
    .closest(".woocommerce_variation")
    .addClass("variation-needs-update");
  jQuery(
    "button.cancel-variation-changes, button.save-variation-changes"
  ).removeAttr("disabled");
  jQuery("#variable_product_options").trigger(
    "woocommerce_variations_input_changed"
  );
  variationStockRow.parentNode.removeChild(variationStockRow);
  return true;
}

/**
 *
 * @param {*} y
 * @param {*} productStockRow
 *
 * Create a link that can be used to remove the required stock row
 * and add it to the end of the product required stock row
 *
 */

function wcrs_productAddRemoveStockLink(y, productStockRow) {
  var p = document.createElement("P");
  p.className = "wcrs_product_remove_stock_link_p form-row";
  p.id = "wcrs_product_remove_stock_link-" + y;
  var a = document.createElement("a");
  var link = document.createTextNode("Remove");
  a.appendChild(link);
  a.title = "Remove required stock";
  a.href = "";
  a.onclick = (function() {
    return function() {
      runOnClick = wcrs_productRemoveRequiredStock(productStockRow);
      updateProductStock = wcrs_variationOnChange(this);
      return false;
    };
  })();
  p.appendChild(a);
  productStockRow.appendChild(p);
  return link;
}

/**
 *
 * @param {*} x
 * @param {*} y
 * @param {*} variationStockRow
 *
 * Create a link that can be used to remove the required stock row
 * and add it to the end of the variation required stock row
 *
 */

function wcrs_variationAddRemoveStockLink(x, y, variationStockRow) {
  var p = document.createElement("P");
  p.className = "wcrs_variation_remove_stock_link_p form-row";
  p.id = "wcrs_variation_remove_stock_link-" + x + "-" + y;
  var a = document.createElement("a");
  var link = document.createTextNode("Remove");
  a.appendChild(link);
  a.title = "Remove required stock";
  a.href = "";
  a.onclick = (function(x) {
    return function() {
      runOnClick = wcrs_variationRemoveRequiredStock(variationStockRow);
      updateVariationStock = wcrs_variationOnChange(this);
      return false;
    };
  })(x, y);
  p.appendChild(a);
  variationStockRow.appendChild(p);
  return link;
}

/**
 *
 * @param {*} y
 * @param {*} productStockElement
 *
 * Add a new product stock row
 *
 */

function wcrs_createProductStockRow(y, productStockElement) {
  var d = document.createElement("div");
  d.className = "wcrs_product_stock_settings_row";
  d.id = `wcrs_product_stock_settings_row-${y}`;
  productStockElement.appendChild(d);
  return d;
}

/**
 *
 * @param {*} x
 * @param {*} y
 * @param {*} variationStockElement
 *
 * Add a new variation stock row
 *
 */

function wcrs_createVariationStockRow(x, y, variationStockElement) {
  var d = document.createElement("div");
  d.className = "wcrs_variation_stock_settings_row";
  d.id = `wcrs_variation_stock_settings_row-${x}-${y}`;
  variationStockElement.appendChild(d);
  return d;
}

/**
 *
 * @param {*} productStockElement
 *
 * Add a new product required stock row, input fields, and remove link
 *
 */

function wcrs_productAddRequiredStock(productStockElement) {
  existingStockRows = Array.from(
    productStockElement.getElementsByClassName(
      "wcrs_product_stock_settings_row"
    )
  );
  var y = 0;
  if (existingStockRows.length > 0) {
    for (existingStockRow in existingStockRows) {
      rowNum = existingStockRows[existingStockRow].id.split("-")[1];
      y = Math.max(y, rowNum);
    }
    y++;
  }
  var values = { sku: "", qty: "" };
  productStockRow = wcrs_createProductStockRow(y, productStockElement);
  createEmptySkuInput = wcrs_createProductSkuTextInput(
    y,
    values,
    productStockRow
  );
  createEmptyQtyInput = wcrs_createProductQtyTextInput(
    y,
    values,
    productStockRow
  );
  createRemoveStockLink = wcrs_productAddRemoveStockLink(y, productStockRow);
  return true;
}

/**
 *
 * @param {*} x
 * @param {*} variationStockElement
 *
 * Add a new variation required stock row, input fields, and remove link
 *
 */

function wcrs_variationAddRequiredStock(x, variationStockElement) {
  existingStockRows = Array.from(
    variationStockElement.getElementsByClassName(
      "wcrs_variation_stock_settings_row"
    )
  );
  var y = 0;
  if (existingStockRows.length > 0) {
    for (existingStockRow in existingStockRows) {
      rowNum = existingStockRows[existingStockRow].id.split("-")[2];
      y = Math.max(y, rowNum);
    }
    y++;
  }
  var values = { sku: "", qty: "" };
  variationStockRow = wcrs_createVariationStockRow(x, y, variationStockElement);
  createEmptySkuInput = wcrs_createVariationSkuTextInput(
    x,
    y,
    values,
    variationStockRow
  );
  createEmptyQtyInput = wcrs_createVariationQtyTextInput(
    x,
    y,
    values,
    variationStockRow
  );
  createRemoveStockLink = wcrs_variationAddRemoveStockLink(
    x,
    y,
    variationStockRow
  );
  return true;
}

/**
 *
 * @param {object} productSettingsElement
 * @param {object} productStockElement
 * @param {boolean} enabled
 *
 * Create a link that allows the user to add another required stock row
 * to the product
 *
 */

function wcrs_productAddRequiredStockLink(
  productSettingsElement,
  productStockElement,
  enabled
) {
  var p = document.createElement("P");
  p.className = "wcrs_product_add_stock_link form-row form-row-full";
  p.id = "wcrs_product_add_stock_link";
  if (!enabled) {
    p.style.display = "none";
  } else {
    p.style.display = "block";
  }
  var a = document.createElement("a");
  var link = document.createTextNode("Add required stock");
  a.appendChild(link);
  a.title = "Add required stock";
  a.href = "";
  a.onclick = (function() {
    return function() {
      runOnClick = wcrs_productAddRequiredStock(productStockElement);
      return false;
    };
  })();
  p.appendChild(a);
  productSettingsElement.appendChild(p);
  return link;
}

/**
 *
 * @param {int} x
 * @param {object} variationSettingsElement
 * @param {object} variationStockElement
 * @param {boolean} enabled
 *
 * Create a link that allows the user to add another required stock row
 * to the variation
 *
 */

function wcrs_variationAddRequiredStockLink(
  x,
  variationSettingsElement,
  variationStockElement,
  enabled
) {
  var p = document.createElement("P");
  p.className = "wcrs_variation_add_stock_link form-row form-row-full";
  p.id = "wcrs_variation_add_stock_link-" + x;
  if (!enabled) {
    p.style.display = "none";
  } else {
    p.style.display = "block";
  }
  var a = document.createElement("a");
  var link = document.createTextNode("Add required stock");
  a.appendChild(link);
  a.title = "Add required stock";
  a.href = "";
  a.onclick = (function(x) {
    return function() {
      runOnClick = wcrs_variationAddRequiredStock(x, variationStockElement);
      return false;
    };
  })(x);
  p.appendChild(a);
  variationSettingsElement.appendChild(p);
  return link;
}

/**
 *
 * Create and populate the required stock fields for all the variations
 * of a product from the data in the hidden input field.
 *
 */

function wcrs_createVariationSettings() {
  var stockElements = Array.from(
    document.getElementsByClassName("wcrs_variation_required_stock")
  );
  if (stockElements.length > 0) {
    for (x in stockElements) {
      if (stockElements[x].value) {
        values = JSON.parse(stockElements[x].value);
      } else {
        values = JSON.parse('{ "enabled": false, "required_stock": [ ] }');
      }
      variationSettingsElement = wcrs_createVariationSettingsElement(
        x,
        stockElements[x].parentElement
      );
      enabledCheckboxCreated = wcrs_createVariationEnabledCheckboxInput(
        x,
        values,
        variationSettingsElement
      );
      variationStockElement = wcrs_createVariationStockSettings(
        x,
        variationSettingsElement,
        values.enabled
      );
      var y = 0;
      if (stockElements[x].value) {
        values = JSON.parse(stockElements[x].value);
        for (required_sku in values.required_stock) {
          variationStockRow = wcrs_createVariationStockRow(
            x,
            y,
            variationStockElement
          );
          skuTextInputCreated = wcrs_createVariationSkuTextInput(
            x,
            y,
            values.required_stock[required_sku],
            variationStockRow
          );
          qtyTextInputCreated = wcrs_createVariationQtyTextInput(
            x,
            y,
            values.required_stock[required_sku],
            variationStockRow
          );
          removeLinkCreated = wcrs_variationAddRemoveStockLink(
            x,
            y,
            variationStockRow
          );
          y++;
        }
      } else {
        addEmptyVariationStockRow = wcrs_variationAddRequiredStock(
          x,
          variationStockElement
        );
      }
      addRequiredVariationLinkCreated = wcrs_variationAddRequiredStockLink(
        x,
        variationSettingsElement,
        variationStockElement,
        values.enabled
      );
    }
  }
  return true;
}

/**
 *
 * Create and populate the required stock fields for the product
 * from the data in the hidden input field.
 *
 */

function wcrs_createProductSettings() {
  var stockElement = document.getElementById("wcrs_product_required_stock");
  var wcrsProductSettings = document.getElementById(
    "wcrs_product_required_stock"
  ).value;
  console.log("stockElement");
  console.log(stockElement);
  console.log("wcrsProductSettings");
  console.log(wcrsProductSettings);
  if (stockElement) {
    if (wcrsProductSettings) {
      values = JSON.parse(stockElement.value);
    } else {
      values = JSON.parse('{ "enabled": false, "required_stock": [ ] }');
    }
    console.log("values");
    console.log(values);
    productSettingsElement = wcrs_createProductSettingsElement(
      stockElement.parentElement
    );
    enabledCheckboxCreated = wcrs_createProductEnabledCheckboxInput(
      values,
      productSettingsElement
    );
    productStockElement = wcrs_createProductStockSettings(
      productSettingsElement,
      values.enabled
    );
    var y = 0;
    if (stockElement.value) {
      values = JSON.parse(stockElement.value);
      for (required_sku in values.required_stock) {
        productStockRow = wcrs_createProductStockRow(y, productStockElement);
        skuTextInputCreated = wcrs_createProductSkuTextInput(
          y,
          values.required_stock[required_sku],
          productStockRow
        );
        qtyTextInputCreated = wcrs_createProductQtyTextInput(
          y,
          values.required_stock[required_sku],
          productStockRow
        );
        removeLinkCreated = wcrs_productAddRemoveStockLink(y, productStockRow);
        y++;
      }
    } else {
      addEmptyProductStockRow = wcrs_productAddRequiredStock(
        productStockElement
      );
    }
    addRequiredProductLinkCreated = wcrs_productAddRequiredStockLink(
      productSettingsElement,
      productStockElement,
      values.enabled
    );
  }
  return true;
}

/**
 *
 * This function gets called when a product required stock field value is changed.
 * The hidden field is updated with each change.
 *
 */

function wcrs_productOnChange() {
  // Update only the product that has changed
  if (document.getElementById(`wcrs_product_settings`)) {
    if (document.getElementById(`wcrs_product_required_stock_enabled`)) {
      // get the current checkbox value
      checkbox = document.getElementById(`wcrs_product_required_stock_enabled`);
      var y = 0;
      // create an empty array to start creating the stock settings
      var requiredStock = [];
      productSettingsElement = document.getElementById(`wcrs_product_settings`);
      productSettingRows = Array.from(
        productSettingsElement.getElementsByClassName(
          "wcrs_product_stock_settings_row"
        )
      );
      for (productSettingRow in productSettingRows) {
        y = productSettingRows[productSettingRow].id.split("-")[1];
        var requiredSku = document.getElementById(
          `wcrs_product_required_stock-${y}-sku`
        ).value;
        var requiredQty = document.getElementById(
          `wcrs_product_required_stock-${y}-qty`
        ).value;
        // add the individual required stock sku and qty to the array
        requiredStock.push({ sku: requiredSku, qty: requiredQty });
      }
      // create the settings object that will be written to the hidden input
      productSettings = {
        enabled: checkbox.checked,
        required_stock: requiredStock
      };
      // Useful for debugging to see what the script is writing to the hidden input
      // console.log(JSON.stringify(productSettings));
      // update the hidden field with the required stock settings in JSON format
      document.getElementById(
        `wcrs_product_required_stock`
      ).value = JSON.stringify(productSettings);
    } else {
      // The checkbox isn't in the DOM yet
      return false;
    }
  } else {
    // The settings div isn't in the DOM yet
    return false;
  }
  return true;
}

/**
 *
 * @param {object} changedObject
 *
 * This function gets called when a required stock field value is changed.
 * The hidden field is updated with each change.
 *
 */

function wcrs_variationOnChange(changedObject) {
  // Update only the variation that has changed
  var x = changedObject.parentElement.id.split("-")[1];
  if (document.getElementById(`wcrs_variation_settings-${x}`)) {
    if (document.getElementById(`wcrs_variation_required_stock-${x}-enabled`)) {
      // get the current checkbox value
      checkbox = document.getElementById(
        `wcrs_variation_required_stock-${x}-enabled`
      );
      var y = 0;
      // create an empty array to start creating the stock settings
      var requiredStock = [];
      variationSettingsElement = document.getElementById(
        `wcrs_variation_settings-${x}`
      );
      variationSettingRows = Array.from(
        variationSettingsElement.getElementsByClassName(
          "wcrs_variation_stock_settings_row"
        )
      );
      for (variationSettingRow in variationSettingRows) {
        y = variationSettingRows[variationSettingRow].id.split("-")[2];
        var requiredSku = document.getElementById(
          `wcrs_variation_required_stock-${x}-${y}-sku`
        ).value;
        var requiredQty = document.getElementById(
          `wcrs_variation_required_stock-${x}-${y}-qty`
        ).value;
        // add the individual required stock sku and qty to the array
        requiredStock.push({ sku: requiredSku, qty: requiredQty });
      }
      // create the settings object that will be written to the hidden input
      variationSettings = {
        enabled: checkbox.checked,
        required_stock: requiredStock
      };
      // Useful for debugging to see what the script is writing to the hidden input
      // console.log(JSON.stringify(variationSettings));
      // update the hidden field with the required stock settings in JSON format
      document.getElementById(
        `wcrs_variation_required_stock-${x}`
      ).value = JSON.stringify(variationSettings);
    } else {
      // The checkbox isn't in the DOM yet
      return false;
    }
  } else {
    // The settings div isn't in the DOM yet
    return false;
  }
  return true;
}

// jQuery(document).on("woocommerce_variations_loaded", function(event) {
jQuery(document).ready(function($) {
  jQuery("#woocommerce-product-data").on(
    "woocommerce_variations_loaded",
    function(event) {
      console.log("WooCommerce Required Stock starting");
      var productTypeSelectElement = document.getElementById("product-type");
      var productTypeSelectedValue =
        productTypeSelectElement.options[productTypeSelectElement.selectedIndex]
          .value;
      if (productTypeSelectedValue == "simple") {
        createdSettings = wcrs_createProductSettings();
      } else if (productTypeSelectedValue == "variable") {
        createdSettings = wcrs_createVariationSettings();
      }
    }
  );
});
