import GenericAdminTable from "./GenericAdminTable";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import { getCategoriesAndParent } from "../../queries/getCategoriesAndParent";
import CategoryTableRow from "./CategoryTableRow";
import AddNewCategoryModal from "./AddNewCategoryModal";

const fields = ["Category", "Parent", "Image", "", ""];

const CategoryTable = () => {
  const { data, error } = useSWR(
    {
      url: "/api/graphql/getCategoriesAndParent",
      body: {
        query: getCategoriesAndParent,
      },
    },
    fetcherWithBody,
  );

  return (
    <>
      {data && data[0].category && (
        <AddNewCategoryModal categories={data[0].category} />
      )}
      <GenericAdminTable title="Categories" fields={fields}>
        <tbody>
          {data &&
            data[0].category &&
            data[0].category.map((item, index) => (
              <CategoryTableRow
                category={item}
                key={index}
                all_categories={data[0].category}
              />
            ))}
        </tbody>
      </GenericAdminTable>
    </>
  );
};

export default CategoryTable;
