/* This example requires Tailwind CSS v2.0+ */

import { useState } from "react";
import {
  UPDATE_VARIATION_DISCOUNTED_PRICE,
  UPDATE_VARIATION_ORIGINAL_PRICE,
  UPDATE_VARIATION_QUANTITY,
} from "../../constants/seller";

type VariationTableProps = {
  variation_categories: string[];
  variations: Record<string, string[]>;
  variation_sku: Record<string, Record<string, number>>;
  dispatch: any;
};

const TableHeader = ({ fields }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {fields &&
          fields.map((item) => {
            return (
              <th
                key={item}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {item}
              </th>
            );
          })}
      </tr>
    </thead>
  );
};

// const TableCell = ({ variation_1, variation_2, variation_sku, dispatch }) => {
//   const value = variation_sku[variation_1]
//     ? variation_sku[variation_1][variation_2]
//     : variation_sku[variation_2][variation_1];

//   const [quantity, discounted_price, original_price] = value;

//   const [storedQuantity, setStoredQuantity] = useState(quantity);
//   const [originalPrice, setoriginalPrice] = useState(original_price);
//   const [discountedPrice, setDiscountedPrice] = useState(discounted_price);

//   const handleQuantityChange = (e) => {
//     if (e.target.value === "") {
//       return;
//     }
//     setStoredQuantity(e.target.value);
//     dispatch({
//       type: UPDATE_VARIATION_QUANTITY,
//       payload: {
//         variation_id_1: variation_1,
//         variation_id_2: variation_2,
//         count: e.target.value,
//       },
//     });
//   };

//   const handleOriginalPriceChange = (e) => {
//     if (e.target.value === "") {
//       return;
//     }
//     setoriginalPrice(e.target.value);
//     dispatch({
//       type: UPDATE_VARIATION_ORIGINAL_PRICE,
//       payload: {
//         variation_id_1: variation_1,
//         variation_id_2: variation_2,
//         count: e.target.value,
//       },
//     });
//   };

//   const handleDiscountedPriceChange = (e) => {
//     if (e.target.value === "") {
//       return;
//     }
//     setDiscountedPrice(e.target.value);
//     dispatch({
//       type: UPDATE_VARIATION_DISCOUNTED_PRICE,
//       payload: {
//         variation_id_1: variation_1,
//         variation_id_2: variation_2,
//         count: e.target.value,
//       },
//     });
//   };

//   return (
//     <td colSpan={3}>
//       <input
//         className="appearance-none bg-transparent rounded w-full py-2 px-4 text-gray-700 border-none"
//         id="first-name"
//         type="text"
//         value={originalPrice}
//         onChange={handleOriginalPriceChange}
//       />

//       <input
//         className="appearance-none bg-transparent rounded w-full py-2 px-4 text-gray-700 border-none"
//         id="first-name"
//         type="text"
//         value={discountedPrice}
//         onChange={handleDiscountedPriceChange}
//       />

//       <input
//         placeholder="Quantity"
//         className="appearance-none bg-transparent rounded w-full py-2 px-4 text-gray-700 border-none"
//         type="number"
//         value={storedQuantity}
//         onChange={(e) => handleQuantityChange(e)}
//       />
//     </td>
//   );
// };

const TableCell = ({
  variation_1,
  variation_2,
  variation_sku,
  dispatch,
  action_type,
  ind,
}) => {
  const value = variation_sku[variation_1]
    ? variation_sku[variation_1][variation_2][ind]
    : variation_sku[variation_2][variation_1][ind];

  const [tableCellValue, setTableCellValue] = useState(value);

  const handleChange = (e) => {
    if (e.target.value === "") {
      return;
    }
    //TODO: Handle error parsing
    dispatch({
      type: action_type,
      payload: {
        variation_id_1: variation_1,
        variation_id_2: variation_2,
        count: e.target.value,
      },
    });
    setTableCellValue(e.target.value);
  };

  return (
    <td>
      <input
        className="appearance-none bg-transparent rounded w-full py-2 px-4 text-gray-700 border-none"
        id="first-name"
        type="text"
        value={tableCellValue}
        onChange={handleChange}
      />
    </td>
  );
};

const TableRow = ({ label, variations, index, variation_sku, dispatch }) => {
  console.log(variations);
  return (
    <>
      <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        <td
          rowSpan={3}
          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
        >
          {label}
        </td>
        <td>Original Price</td>
        {variations.map((variation, index) => {
          return (
            <TableCell
              key={index}
              variation_1={label}
              variation_2={variation}
              variation_sku={variation_sku}
              ind={2}
              dispatch={dispatch}
              action_type={UPDATE_VARIATION_ORIGINAL_PRICE}
            />
          );
        })}
      </tr>
      <tr>
        <td>Discounted Price</td>
        {variations.map((variation, index) => {
          return (
            <TableCell
              key={index}
              variation_1={label}
              variation_2={variation}
              variation_sku={variation_sku}
              ind={1}
              dispatch={dispatch}
              action_type={UPDATE_VARIATION_ORIGINAL_PRICE}
            />
          );
        })}
      </tr>
      <tr>
        <td>Quantity</td>
        {variations.map((variation, index) => {
          return (
            <TableCell
              key={index}
              variation_1={label}
              variation_2={variation}
              variation_sku={variation_sku}
              ind={0}
              dispatch={dispatch}
              action_type={UPDATE_VARIATION_ORIGINAL_PRICE}
            />
          );
        })}
      </tr>
    </>
  );
};

const VariationTable = ({
  variation_categories,
  variations,
  variation_sku,
  dispatch,
}: VariationTableProps) => {
  if (variation_categories.length === 0) {
    return null;
  }

  if (variation_categories.length === 1) {
    if (!variations[variation_categories[0]]) {
      return null;
    }

    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHeader fields={["Variation", "SKU"]} />
                <tbody>
                  {variations[variation_categories[0]].map((item, index) => {
                    return (
                      <TableRow
                        dispatch={dispatch}
                        key={index}
                        label={item}
                        variations={[""]}
                        index={index}
                        variation_sku={variation_sku}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const base_cat = variation_categories[0];
  const alt_cat = variation_categories[1];

  if (!variations[base_cat] || !variations[alt_cat]) {
    return <p>Please Input a variation for each category</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <TableHeader
                fields={["Variation", "Quantity", ...variations[alt_cat]]}
              />
              <tbody>
                {variations[base_cat].map((item, index) => {
                  return (
                    <TableRow
                      dispatch={dispatch}
                      key={index}
                      label={item}
                      variations={variations[alt_cat]}
                      index={index}
                      variation_sku={variation_sku}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationTable;
