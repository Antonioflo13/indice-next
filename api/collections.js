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

export default getAllCollections;
