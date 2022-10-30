import request from "./request";

async function getArticle(handle) {
  const query = `
  {
    article(locale: it, filter: {handle: {matches: {pattern: "${handle}"}}}) {
      id
      imageheadermobile {
        url
      }
      imageheader {
        url
      }
      title
      description
      handle
      image {
        url
      }
      shopifyCollection
      product1
      product2
      product3
      product4
      product5
      product6
      product7
      product8
      product9
      product10
      product11
      product12
      product13
      product14
      product15
    }
  }
`;
  //   const query = `
  //   query article($id: String!, $shopifyCollection: String!) {
  //     datoCmsArticle(id: { eq: $id }) {
  //       id
  //       imageheadermobile {
  //         url
  //       }
  //       imageheader {
  //         url
  //       }
  //       title
  //       description
  //       handle
  //       image {
  //         url
  //       }
  //       shopifyCollection
  //       product1
  //       product2
  //       product3
  //       product4
  //       product5
  //       product6
  //       product7
  //       product8
  //       product9
  //       product10
  //       product11
  //       product12
  //       product13
  //       product14
  //       product15
  //     }
  //     shopifyCollection(title: { eq: $shopifyCollection }) {
  //       image {
  //         src
  //       }
  //       title
  //       handle
  //       products {
  //         vendor
  //         id
  //         title
  //         handle
  //         images {
  //           originalSrc
  //         }
  //       }
  //     }
  //     allShopifyProduct {
  //       edges {
  //         node {
  //           images {
  //             originalSrc
  //           }
  //           title
  //           handle
  //           vendor
  //           id
  //         }
  //       }
  //     }
  //   }
  // `;

  return await request("datoCMS", query);
}

export default getArticle;
