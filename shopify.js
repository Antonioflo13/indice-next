const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2022-07/graphql.json`

    const options = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query})
    }

    try {
        const data = await fetch(URL, options).then(response => {
            return response.json()
        })

        return data
    } catch (error) {
        throw new Error("Products not fetched")
    }
}

export async function getAllProducts() {
    const query = `
{
  product(handle: "carrara") {
    variants(first: 10) {
      nodes {
        availableForSale
        storeAvailability(first: 10) {
          edges {
            node {
              available
            }
          }
          nodes {
            available
            location {
              name
            }
          }
        }
      }
    }
  }
}
`

    const response = await ShopifyData(query);

    const allProducts = response;

    return allProducts
}