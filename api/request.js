async function request(requestTo, query) {
  let URL = null;
  let headers = null;
  switch (requestTo) {
    case "datoCMS":
      URL = "https://graphql.datocms.com";
      headers = {
        authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      };
      break;
    case "shopify":
      URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2022-07/graphql.json`;
      headers = {
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESSTOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      break;
  }

  const options = {
    endpoint: URL,
    method: "POST",
    headers,
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
