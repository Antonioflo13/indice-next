async function request(query) {
  const URL = "https://graphql.datocms.com";

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  };

  try {
    return await fetch(URL, options).then(response => {
      return response.json();
    });
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export default request;
