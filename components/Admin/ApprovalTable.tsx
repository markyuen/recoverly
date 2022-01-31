import ApprovalTableBody from "./ApprovalTableBody";
import GenericAdminTable from "./GenericAdminTable";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import { getSellers } from "../../queries/getSellers";

const fields = ["Business", "UEN", "Address", "Contact Name", "Contact Email", "Stripe ID", "Verified", "Update"];

const AdminTable = () => {
  const { data, error } = useSWR(
    [
      "/api/graphql/getSellers",
      {
        query: getSellers,
      },
    ],
    fetcherWithBody
  );

  return (
    <div className="my-10">
      <GenericAdminTable fields={fields} title="Sellers">
        <>
          {data && data.seller &&
            <ApprovalTableBody sellers={
              data.seller.map(d => ({
                ...d,
                contact_name: d.first_name + " " + d.last_name,
                contact_email: d.user.email,
              }))
            }
            />
          }
        </>
      </GenericAdminTable>
    </div>
  );
}

export default AdminTable
