import request from "./request";

async function getAllProducts() {
    const indice = `
{
    products(first: 250) {
        edges {
          node {
            handle
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

export { getAllProducts };
