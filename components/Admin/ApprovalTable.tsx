import ApprovalTableBody from "./ApprovalTableBody";
import GenericAdminTable from "./GenericAdminTable";

const sellers = [
  {
    name: "Burberry",
    status: "Approved",
    contact_number: "1234567890",
  },
  {
    name: "Gucci",
    status: "Pending",
    contact_number: "1234567890",
  },
  {
    name: "Prada",
    status: "Pending",
    contact_number: "1234567890",
  },
  {
    name: "Louis Vuitton",
    status: "Approved",
    contact_number: "1234567890",
  },
];

const fields = ["Seller Name", "Approved", "Contact Number", ""];

export default function AdminTable() {
  return (
    <div className="my-10">
      <GenericAdminTable fields={fields} title="Sellers">
        <ApprovalTableBody sellers={sellers} />
      </GenericAdminTable>
    </div>
  );
}
