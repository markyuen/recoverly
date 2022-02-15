export const fetcherWithBody = (...queries) => {
  const f = query => fetch(query.url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query.body),
  }).then((res) => res.json());
  return Promise.all(queries.map(query => f(query)))
};
