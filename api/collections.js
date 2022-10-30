import request from "./request";

async function getAllCollections() {
  const indice = `
{
    collections(
      sortKey: TITLE, first: 250
    ) {
      nodes {
        id
        handle
        title
        description
      }
    }
 }
`;

  let QUERY = null;
  switch (process.env.NEXT_QUERY) {
    case "indice":
      QUERY = indice;
      break;
  }

  return await request("shopify", QUERY);
}

async function getCollection(collection) {
  const indice = `
{
  collection(handle: "${collection}") {
    id
    handle
    title
    description
    descriptionHtml
    image {
        src
    }
    products(first: 250) {
        nodes {
          id
        handle
        title
        description
        descriptionHtml
        vendor
        availableForSale
        tags
        variants(first: 250) {
          edges {
            node {
              id
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              product {
                images(first: 250) {
                  nodes {
                    id
                    originalSrc
                  }
                }
                variants(first: 250) {
                  nodes {
                    id
                  }
                }
              }
            }
          }
        }
    }
    }
  }
}
`;

  let QUERY = null;
  switch (process.env.NEXT_QUERY) {
    case "indice":
      QUERY = indice;
      break;
  }

  return await request("shopify", QUERY);
}

export { getAllCollections, getCollection };
