import ApprovalTableBody from "./ApprovalTableBody";
import ApprovalTableHeader from "./ApprovalTableHeader";

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
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <ApprovalTableHeader fields={fields} />
              <ApprovalTableBody sellers={sellers} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
