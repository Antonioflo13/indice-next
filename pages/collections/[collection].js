//REACT
import React from "react";
//NEXT
import Link from "next/link";
import Head from "next/head";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//API
import { getCollection } from "../../api/collections";
//INTL
import { FormattedMessage, FormattedNumber } from "react-intl";
//COMPONENTS
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import Layout from "../../components/layout";

const CollectionTemplate = ({ collection }) => {
  collection = collection.data.collection;
  //HOOKS
  const isDesktop = useMediaQuery(768);
  const isBrand =
    collection.handle !== "optical" && collection.handle !== "sunglasses";

  return (
    <Layout>
      <Head>
        <title>Indice - {isBrand ? collection.title : collection.handle}</title>
        <meta
          name="description"
          content={isBrand ? collection.description : null}
        />
      </Head>
      <AnimatedPage margins={true} grey={true}>
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
                          title: collection.title,
                        },
                      ]
                    : [
                        {
                          title: `collection.${collection.handle}_breadcrumbs`,
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
              src={collection.image.src}
              alt="headerCollection"
            />
            <div>
              <h1 className="text-center">
                {isBrand ? (
                  <div className="mt-10 text-indice text-xl font-bold uppercase">
                    {collection.title}
                  </div>
                ) : (
                  <FormattedMessage
                    id={`collection.${collection.handle}_title`}
                    values={{
                      b: chunk => {
                        chunk;
                      },
                      title: (
                        <div className="mt-10 text-indice text-xl font-bold uppercase">
                          collection.title
                        </div>
                      ),
                    }}
                  />
                )}
              </h1>
              <p className="mt-10">
                {collection.description ? collection.description : null}
              </p>
            </div>
          </div>
        </div>
        {/* Products */}
        <div className="mt-8 w-full">
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-8 gap-y-8 md:gap-y-12">
            {collection.products.nodes.map(product => (
              <Product
                key={product.id}
                product={product}
                collection={collection}
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
                        title: collection.title,
                      },
                    ]
                  : [
                      {
                        title: `collection.${collection.handle}_breadcrumbs`,
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
    </Layout>
  );
};

export default CollectionTemplate;

export async function getServerSideProps({ params }) {
  const collectionHandle = params.collection;
  const collection = await getCollection(collectionHandle);
  return {
    props: { collection },
  };
}

const Product = ({ product, collection }) => {
  return (
    <Link
      href={{
        pathname: "/collections/[collection]/[product]",
        query: { collection: collection.handle, product: product.handle },
      }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full" style={{ paddingTop: "66.6%" }}>
          <div className="absolute top-0 w-full h-full">
            {product.variants.edges[0].node.product.images.nodes.length > 0 && (
              <img
                className="w-full h-full"
                src={
                  product.variants.edges[0].node.product.images.nodes[0]
                    .originalSrc
                }
                alt="product-image"
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
          product.variants.edges[0].node.product.quantityAvailable > 0 && (
            <p className="text-2xs">
              <FormattedNumber
                style="currency"
                value={product.variants.edges[0].node.product.priceV2.amount}
                currency={
                  product.variants.edges[0].node.product.priceV2.currencyCode
                }
                minimumFractionDigits={2}
              />
            </p>
          )}
      </div>
    </Link>
  );
};
