import GenericAdminTable from "./GenericAdminTable";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import { getCategoriesAndParent } from "../../queries/getCategoriesAndParent";
import CategoryTableRow from "./CategoryTableRow";
import AddNewCategoryModal from "./AddNewCategoryModal";

const fields = ["Category", "Parent", "Image", "", ""];

const CategoryTable = () => {
  const { data, error } = useSWR(
    [
      "/api/graphql/getCategoriesAndParent",
      {
        query: getCategoriesAndParent,
      },
    ],
    fetcherWithBody
  );

  console.log(data);

  return (
    <>
      {data && data.category && (
        <AddNewCategoryModal categories={data.category} />
      )}
      <GenericAdminTable title="Categories" fields={fields}>
        <tbody>
          {data &&
            data.category &&
            data.category.map((item, index) => (
              <CategoryTableRow
                category={item}
                key={index}
                all_categories={data.category}
              />
            ))}
        </tbody>
      </GenericAdminTable>
    </>
  );
};

export default CategoryTable;
