import React, { useContext, useEffect } from "react"
import { graphql } from "gatsby"
import AnimatedPage from "../components/animated-page"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl"
import Link from "../components/link"
import SharedStateContext from "../components/shared-state-context"
import PageTitle, { Bold } from "../components/page-title"
import { Helmet } from "react-helmet"
import { useMediaQuery } from "react-responsive"

const CollectionTemplate = ({ data: { shopifyCollection } }) => {
  const intl = useIntl()
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })
  const { setCurrentSidebarTitle } = useContext(SharedStateContext)
  useEffect(() => {
    setCurrentSidebarTitle("")
  }, [setCurrentSidebarTitle])

  const isBrand =
    shopifyCollection.handle !== "optical" &&
    shopifyCollection.handle !== "sunglasses"

  return (
    <>
      <AnimatedPage margins={true} grey={true}>
        <Helmet>
          <title>
            {isBrand
              ? intl.formatMessage(
                  {
                    id: "collection.title",
                  },
                  { collection: shopifyCollection.title }
                )
              : intl.formatMessage({
                  id: "collection." + shopifyCollection.handle,
                })}
          </title>
          <meta
            name="description"
            content={
              isBrand
                ? intl.formatMessage(
                    {
                      id: "collection.description",
                    },
                    { collection: shopifyCollection.description }
                  )
                : null
            }
          />
        </Helmet>

        <div className="flex flex-col justify-center w-full">
          <div className="w-full md:w-1/2 customMarginTop">
            {isDesktop && (
              <PageTitle
                breadcrumbs={[
                  ...(isBrand
                    ? [
                        {
                          title: "breadcrumbs.designers",
                          link: "/collections",
                        },
                        {
                          title: shopifyCollection.title,
                        },
                      ]
                    : [
                        {
                          title: `collection.${shopifyCollection.handle}_breadcrumbs`,
                        },
                      ]),
                ]}
                title=" "
                subtitle=" "
              />
            )}
          </div>
          {/* Info */}
          <div className="flex container-collection">
            <img
              className="img-headerCollection"
              src={shopifyCollection.image.src}
            />
            <div>
              <h1 className="text-center">
                {isBrand ? (
                  <div className="mt-10 text-indice text-xl font-bold uppercase">
                    {shopifyCollection.title}
                  </div>
                ) : (
                  <FormattedMessage
                    id={`collection.${shopifyCollection.handle}_title`}
                    values={{
                      b: chunk => {
                        chunk
                      },
                      title: (
                        <div className="mt-10 text-indice text-xl font-bold uppercase">
                          shopifyCollection.title
                        </div>
                      ),
                    }}
                  />
                )}
              </h1>
              <p className="mt-10">
                {shopifyCollection.description.length > 0
                  ? shopifyCollection.description
                  : null}
              </p>
            </div>
          </div>
        </div>
        {/* Products */}
        <div className="mt-8 w-full">
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-8 gap-y-8 md:gap-y-12">
            {shopifyCollection.products.map(product => (
              <Product
                key={product.id}
                product={product}
                collection={shopifyCollection}
              />
            ))}
          </div>
        </div>
        {!isDesktop && (
          <div className="mt-10">
            <PageTitle
              breadcrumbs={[
                ...(isBrand
                  ? [
                      {
                        title: "breadcrumbs.designers",
                        link: "/collections",
                      },
                      {
                        title: shopifyCollection.title,
                      },
                    ]
                  : [
                      {
                        title: `collection.${shopifyCollection.handle}_breadcrumbs`,
                      },
                    ]),
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
            .customMarginTop {
              margin-top: 3rem;
            }
            .img-headerCollection {
              height: 200px;
            }
          }
        `}
      </style>
    </>
  )
}

export const query = graphql`
  query CollectionQuery($id: String!) {
    shopifyCollection(id: { eq: $id }) {
      id
      handle
      title
      description
      descriptionHtml
      image {
        src
      }
      products {
        id
        title
        handle
        tags
        availableForSale
        vendor
        variants {
          id
          quantityAvailable
          priceV2 {
            amount
            currencyCode
          }
        }
        images {
          id
          originalSrc
        }
      }
    }
  }
`

export default CollectionTemplate

const Product = ({ product, collection }) => {
  return (
    <Link to={`/collections/${collection.handle}/products/${product.handle}`}>
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full" style={{ paddingTop: "66.6%" }}>
          <div className="absolute top-0 w-full h-full">
            {product.images.length > 0 && (
              <img
                className="w-full h-full"
                src={product.images[0].originalSrc}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        </div>
        <div className="text-indice-red text-xs font-bold italic mackay noToHead mt-2">
          {product.vendor}
        </div>
        <div className="ml-1 text-xs uppercase font-bold mt-2">
          {product.title}
        </div>
        {product.availableForSale &&
          !product.tags.includes("nfs") &&
          product.variants[0].quantityAvailable > 0 && (
            <p className="text-2xs">
              <FormattedNumber
                style="currency"
                value={product.variants[0].priceV2.amount}
                currency={product.variants[0].priceV2.currencyCode}
                minimumFractionDigits={2}
              />
            </p>
          )}
      </div>
    </Link>
  )
}
