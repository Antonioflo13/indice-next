import request from "./request";

async function getProduct(product) {
  const indice = `
{
  product(handle: "${product}"){
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
`;

  const luxuryEyewear = `
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
    case "luxuryeyewear":
      QUERY = luxuryEyewear;
      break;
  }

  return await request("shopify", QUERY);
}

export default getProduct;
