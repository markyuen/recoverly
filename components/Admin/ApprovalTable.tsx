import ApprovalTableBody from "./ApprovalTableBody";
import GenericAdminTable from "./GenericAdminTable";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import { getSellers } from "../../queries/getSellers";

const fields = [
  "Business",
  "UEN",
  "Address",
  "Contact Name",
  "Contact Email",
  "Stripe ID",
  "Verified",
  "Update",
];

const AdminTable = () => {
  const { data, error } = useSWR(
    {
      url: "/api/graphql/getSellers",
      body: {
        query: getSellers,
      },
    },
    fetcherWithBody,
  );

  return (
    <div className="my-10">
      <GenericAdminTable fields={fields} title="Sellers">
        <>
          {data && data[0].seller && (
            <ApprovalTableBody
              sellers={data[0].seller.map((seller) => ({
                ...seller,
                user_id: seller.user.user_id,
                contact_name: seller.first_name + " " + seller.last_name,
                contact_email: seller.user.email,
              }))}
            />
          )}
        </>
      </GenericAdminTable>
    </div>
  );
};

export default AdminTable;
