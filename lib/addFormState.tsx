export const addVariationCategory = (
  variation_sku,
  variations,
  variation_name,
  variation_category,
  variation_categories
) => {
  const base_options = Object.keys(variation_sku);

  // Case 1: There is nothing in the variation_sku
  if (base_options.length == 0) {
    variation_sku[variation_name] = {
      "": [0, 0],
    };
    return variation_sku;
  }

  if (variation_categories.length == 1) {
    return {
      ...variation_sku,
      [variation_name]: {
        "": [0, 0],
      },
    };
  }

  // Case 2 : There are already existing options in the variation_sku
  else if (base_options.length > 0) {
    // Case 2.1 : The existing category is the base category in variation_sku
    if (
      variations[variation_category] &&
      variations[variation_category].filter((item) =>
        base_options.includes(item)
      ).length > 0
    ) {
      console.log(`${variation_category} was a base option`);
      const new_sku = {};

      // We have two categories

      // We generate all the other options
      const secondary_category = variation_categories.filter(
        (item) => item != variation_category
      )[0];
      if (
        variations[secondary_category] &&
        variations[secondary_category].length > 0
      ) {
        variations[secondary_category].forEach((item) => {
          new_sku[item] = [0, 0];
        });
      } else {
        new_sku[variation_category] = {
          "": [0, 0],
        };
      }

      return {
        ...variation_sku,
        [variation_name]: new_sku,
      };
    } else {
      const secondary_category = variation_categories.filter(
        (item) => item != variation_category
      )[0];
      console.log(
        `${variation_category} was not a base option and alternate category was ${secondary_category}`
      );

      const variation_sku_copy = { ...variation_sku };

      // We have two categories but nothing has been added yet
      if (Object.keys(variation_sku_copy).length == 0) {
        variation_sku_copy[variation_name] = {
          "": [0, 0],
        };
      } else {
        if (variations[secondary_category]) {
          variations[secondary_category].forEach((item) => {
            if (variation_sku_copy[item].hasOwnProperty("")) {
              delete variation_sku_copy[item][""];
            }
            variation_sku_copy[item][variation_name] = [0, 0];
          });
        }
      }

      return variation_sku_copy;
    }
  }
};
