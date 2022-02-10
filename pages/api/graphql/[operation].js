import { makeRequestToHasura } from "../../../lib/GraphQL";

export default async function handler(req, res) {
  const { operation } = req.query;
  const { query, variables } = req.body;

  const { data, errors } = await makeRequestToHasura(
    operation,
    query,
    variables
  );

  console.log(operation);
  console.log(variables);

  if (errors) {
    res.status(400).json({ message: "Error Encountered", error: errors });
  }

  res.status(200).json({
    ...data.data,
  });
}
