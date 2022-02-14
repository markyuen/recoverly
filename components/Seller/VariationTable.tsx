/* This example requires Tailwind CSS v2.0+ */

import { useState } from "react";
import {
  UPDATE_VARIATION_DISCOUNTED_PRICE,
  UPDATE_VARIATION_ORIGINAL_PRICE,
  UPDATE_VARIATION_QUANTITY,
} from "../../constants/seller";
import { roundTo2dp } from "../../lib/helpers";
import validateTwoDecimalNum from "../../lib/validateTwoDecimalNum";

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

const QuantityTableCell = ({
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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setTableCellValue(e.target.value);
    if (e.target.value === "") {
      setError(true);
      setErrorMessage("Quantity cannot be empty");
      return;
    }

    try {
      const parsed_number = parseFloat(e.target.value);
      if (isNaN(parsed_number)) {
        throw new Error("Not a number");
      }

      if (!Number.isInteger(parsed_number)) {
        setError(true);
        setErrorMessage("Quantity must be a valid integer.");
        return;
      }
      setError(false);
      setErrorMessage("");
      dispatch({
        type: action_type,
        payload: {
          variation_id_1: variation_1,
          variation_id_2: variation_2,
          count: Math.floor(parsed_number),
        },
      });
    } catch {
      setError(true);
      setErrorMessage("Please input a valid number");
      return;
    }
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
      {!error ? null : (
        <p className="text-sm wrap text-red-400 ml-4">{errorMessage}</p>
      )}
    </td>
  );
};

const PriceTableCell = ({
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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setTableCellValue(e.target.value);
    if (e.target.value === "") {
      setError(true);
      setErrorMessage("Quantity cannot be empty");
      return;
    }

    try {
      const parsed_number = parseFloat(e.target.value);
      if (isNaN(parsed_number)) {
        throw new Error("Not a number");
      }

      if (!validateTwoDecimalNum(e.target.value)) {
        setError(true);
        setErrorMessage("Please only input prices of up to 2 decimal places");
        return;
      }

      setError(false);
      // Float Value
      if (!Number.isInteger(parsed_number)) {
        const rounded_value = Math.floor(
          parseFloat((parsed_number * 100).toFixed(2))
        );
        console.log(rounded_value);
        dispatch({
          type: action_type,
          payload: {
            variation_id_1: variation_1,
            variation_id_2: variation_2,
            count: rounded_value,
          },
        });
      } else {
        dispatch({
          type: action_type,
          payload: {
            variation_id_1: variation_1,
            variation_id_2: variation_2,
            count: Math.floor(parsed_number) * 100,
          },
        });
      }
    } catch {
      setError(true);
      setErrorMessage("Please input a valid number");
      return;
    }
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
      {!error ? null : (
        <p className="text-sm text-red-400 ml-4">{errorMessage}</p>
      )}
    </td>
  );
};

// const TableCell = ({
//   variation_1,
//   variation_2,
//   variation_sku,
//   dispatch,
//   action_type,
//   ind,
//   value_conversion_function,
//   check_input,
//   error_message,
// }) => {
//   const value = variation_sku[variation_1]
//     ? variation_sku[variation_1][variation_2][ind]
//     : variation_sku[variation_2][variation_1][ind];

//   const [tableCellValue, setTableCellValue] = useState(value);
//   const [error, setError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     setTableCellValue(e.target.value);

//     if (e.target.value === "") {
//       return;
//     }

//     try {
//       const parsed_number = parseFloat(e.target.value);
//     } catch {
//       setError(true);
//       return;
//     }

//     if (!Number.isInteger(parseInt(e.target.value))) {
//       setError(true);
//       return;
//     }

//     if (!check_input) {
//       setError(true);
//       return;
//     }

//     setError(false);
//     dispatch({
//       type: action_type,
//       payload: {
//         variation_id_1: variation_1,
//         variation_id_2: variation_2,
//         count: value,
//       },
//     });
//   };

//   return (
//     <td>
//       <input
//         className="appearance-none bg-transparent rounded w-full py-2 px-4 text-gray-700 border-none"
//         id="first-name"
//         type="number"
//         value={tableCellValue}
//         onChange={handleChange}
//         step="0.01"
//       />
//       {!error ? null : (
//         <p className="text-sm text-red-400 ml-4">{error_message}</p>
//       )}
//     </td>
//   );
// };

const TableRow = ({ label, variations, index, variation_sku, dispatch }) => {
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
            <PriceTableCell
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
            <PriceTableCell
              key={index}
              variation_1={label}
              variation_2={variation}
              variation_sku={variation_sku}
              ind={1}
              dispatch={dispatch}
              action_type={UPDATE_VARIATION_DISCOUNTED_PRICE}
            />
          );
        })}
      </tr>
      <tr>
        <td>Quantity</td>
        {variations.map((variation, index) => {
          return (
            <QuantityTableCell
              key={index}
              variation_1={label}
              variation_2={variation}
              variation_sku={variation_sku}
              ind={0}
              dispatch={dispatch}
              action_type={UPDATE_VARIATION_QUANTITY}
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
