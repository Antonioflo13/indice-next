import request from "./request";

async function getAllCollections() {
    const query = `
{
    collections(
      sortKey: TITLE, first: 250
    ) {
      nodes {
        id
        handle
        title
        description
        products(first: 250) {
            edges {
              node {
                variants(first: 250) {
                  nodes {
                    quantityAvailable
                  }
                }
              }
            }
        }
      }
    }
 }
`

    return await request('shopify', query);
}

export default getAllCollections;