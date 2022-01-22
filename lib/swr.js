export const fetcher = (...args) => {
  fetch(...args).then((res) => res.json());
};

export const fetcherWithBody = (url, ...args) => {
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(...args),
  }).then((res) => res.json());
};
