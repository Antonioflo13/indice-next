import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { FormattedNumber, useIntl } from "react-intl"
import Link from "../components/link"
import AnimatedPage from "../components/animated-page"
import PageTitle from "../components/page-title"
import { useMediaQuery } from "react-responsive"
import SliderArticleCollection from "./slider-article-collection"
import SliderArticleProducts from "./slider-article-products"

const Magazine = ({ data }) => {
  const intl = useIntl()
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })
  const article = data.datoCmsArticle
  const productsinArticle = []

  Object.entries(article).forEach(item => {
    if (item[0].includes("product")) {
      if (item[1] !== "") {
        const titleItem = item[1].toUpperCase()
        const filterResultSlider = data.allShopifyProduct.edges.find(
          item => item.node.title === titleItem
        )
        productsinArticle.push(filterResultSlider)
      }
    }
  })

  return (
    <>
      <AnimatedPage margins={true}>
        <Helmet>
          <title>
            {intl.formatMessage(
              { id: "article.title" },
              { article: article.handle }
            )}
          </title>
          <meta
            name="description"
            content={intl.formatMessage(
              { id: "product.description" },
              { article: article.handle }
            )}
          />
        </Helmet>
        <div className="flex flex-col justify-center w-full">
          <div className="w-full md:w-1/2 mt-8">
            {isDesktop && (
              <PageTitle
                breadcrumbs={[
                  ...[
                    { title: "breadcrumbs.magazine", link: "/magazine" },
                    {
                      title: article.handle,
                    },
                  ],
                ]}
                title=" "
                subtitle=" "
              />
            )}
          </div>
          {/* Info */}
          <div className="flex container-collection mt-4">
            {isDesktop ? (
              <img
                className="img-headerCollection"
                src={article.imageheader.url}
              />
            ) : (
              <img
                className="img-headerCollection"
                src={article.imageheadermobile.url}
              />
            )}

            <div>
              <h1 className="uppercase font-bold my-10 text-center">
                {article.title}
              </h1>
            </div>
            <div className="text-center">
              <div>
                <img
                  className="float-left mr-5 mb-5"
                  src={article.image.url}
                  alt={""}
                  width={"200vw"}
                />
              </div>
              <p className="text-justify">
                {article.description.length > 0 ? article.description : null}
              </p>
            </div>
          </div>
        </div>
        <SliderArticleCollection shopifyCollection={data.shopifyCollection} />
        <SliderArticleProducts productsinArticle={productsinArticle} />
        {!isDesktop && (
          <div className="mt-10">
            <PageTitle
              breadcrumbs={[
                ...[
                  { title: "breadcrumbs.magazine", link: "/magazine" },
                  {
                    title: article.handle,
                  },
                ],
              ]}
              title=" "
              subtitle=" "
            />
          </div>
        )}
      </AnimatedPage>
      <style jsx="true">
        {`
          .container-collection {
            flex-direction: column;
          }

          .img-headerCollection {
            width: 100%;
            height: 30vh;
            border-radius: 15px;
            object-fit: cover;
          }

          @media (max-width: 768px) {
            .img-headerCollection {
              height: 200px;
            }
          }
        `}
      </style>
    </>
  )
}

export const data = graphql`
  query article($id: String!, $shopifyCollection: String!) {
    datoCmsArticle(id: { eq: $id }) {
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
    shopifyCollection(title: { eq: $shopifyCollection }) {
      image {
        src
      }
      title
      handle
      products {
        vendor
        id
        title
        handle
        images {
          originalSrc
        }
      }
    }
    allShopifyProduct {
      edges {
        node {
          images {
            originalSrc
          }
          title
          handle
          vendor
          id
        }
      }
    }
  }
`

export default Magazine

// const Product = ({ product, collection }) => {
//   return (
//     <Link to={`/collections/${collection.handle}/products/${product.handle}`}>
//       <div className="w-full flex flex-col items-center">
//         <div className="relative w-full" style={{ paddingTop: "66.6%" }}>
//           <div className="absolute top-0 w-full h-full">
//             {product.images.length > 0 && (
//               <img
//                 className="w-full h-full"
//                 src={product.images[0].originalSrc}
//               />
//             )}
//           </div>
//         </div>
//         <div className="text-indice-red text-xs font-bold italic mackay noToHead mt-2">
//           {product.vendor}
//         </div>
//         <div className="ml-1 text-xs uppercase font-bold mt-2">
//           {product.title}
//         </div>
//         {product.availableForSale &&
//           !product.tags.includes("nfs") &&
//           product.variants[0].quantityAvailable > 0 && (
//             <p className="text-2xs">
//               <FormattedNumber
//                 style="currency"
//                 value={product.variants[0].priceV2.amount}
//                 currency={product.variants[0].priceV2.currencyCode}
//                 minimumFractionDigits={2}
//               />
//             </p>
//           )}
//       </div>
//     </Link>
//   )
// }
