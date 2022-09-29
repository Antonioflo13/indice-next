import React, { useContext, useEffect } from "react";
import { graphql } from "gatsby";
import AnimatedPage from "../components/animated-page";
import { useIntl } from "react-intl";
import SharedStateContext from "../components/shared-state-context";
import PageTitle from "../components/page-title";
import GalleryProducts from "../components/gallery-products";
import { Helmet } from "react-helmet";
import { getCookie, setCookie } from "../utils/cookie";
import { useMediaQuery } from "react-responsive";
//COMPONENTS
import MobileProduct from "../templates/mobile-product";
import DesktopProduct from "./desktop-product";

const ProductTemplate = ({
  data: {
    shopifyProduct,
    shopifyCollection: { products },
  },
  pageContext: { productHandle, collectionHandle },
}) => {
  const { setCurrentSidebarTitle, setContactShown, setCart } =
    useContext(SharedStateContext);
  const [accordion, setAccordion] = React.useState({
    size: false,
    shipping: false,
  });
  useEffect(() => {
    setCurrentSidebarTitle("");
  }, [setCurrentSidebarTitle]);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const relatedProducts = products.filter(p => p.id !== shopifyProduct.id);

  const { shopifyClient, setShopifyCheckout } = useContext(SharedStateContext);

  const buy = async () => {
    // const checkoutId = shopifyCheckout.id
    let checkoutId = getCookie("checkoutId");
    if (!checkoutId) {
      checkoutId = (await shopifyClient.checkout.create()).id;
      setCookie("checkoutId", checkoutId, 90);
    }

    const updatedCheckout = await shopifyClient.checkout.addLineItems(
      checkoutId,
      [
        {
          variantId: shopifyProduct.variants[0].shopifyId,
          quantity: 1,
        },
      ]
    );

    const { lineItems, totalPrice } = updatedCheckout;
    const cartContent = { lineItems, totalPrice };

    await setShopifyCheckout(updatedCheckout);
    setCart(cartContent);
  };

  const askForPrice = () => {
    setContactShown(true, shopifyProduct);
  };

  const mainImage = <GalleryProducts images={shopifyProduct.images} />;

  const intl = useIntl();

  return (
    <>
      <AnimatedPage margins={true} noAnimate={true}>
        <Helmet>
          <title>
            {intl.formatMessage(
              { id: "product.title" },
              { product: shopifyProduct.title, vendor: shopifyProduct.vendor }
            )}
          </title>
          <meta
            name="description"
            content={intl.formatMessage(
              { id: "product.description" },
              {
                product: shopifyProduct.description,
                vendor: shopifyProduct.vendor,
              }
            )}
          />
        </Helmet>

        <div className="flex">
          <div className="w-full md:w-1/ mt-8">
            {isDesktop && (
              <PageTitle
                breadcrumbs={[
                  {
                    title: "breadcrumbs.designers",
                    link: "/collections",
                  },

                  {
                    title: shopifyProduct.vendor,
                    link: "/collections/" + collectionHandle,
                  },
                  {
                    title: shopifyProduct.title,
                    link: "/collections/" + productHandle,
                  },
                ]}
                title=" "
              />
            )}
          </div>
        </div>
        {!isDesktop && (
          <div className="mt-10 customStyle">
            <PageTitle
              breadcrumbs={[
                {
                  title: "breadcrumbs.designers",
                  link: "/collections",
                },

                {
                  title: shopifyProduct.vendor,
                  link: "/collections/" + collectionHandle,
                },
                {
                  title: shopifyProduct.title,
                  link: "/collections/" + productHandle,
                },
              ]}
              title=" "
            />
          </div>
        )}
        {isDesktop ? (
          <DesktopProduct
            shopifyProduct={shopifyProduct}
            buy={buy}
            askForPrice={askForPrice}
            mainImage={mainImage}
            relatedProducts={relatedProducts}
            collectionHandle={collectionHandle}
            accordion={accordion}
            setAccordion={setAccordion}
          />
        ) : (
          <MobileProduct
            shopifyProducts={products}
            shopifyProduct={shopifyProduct}
            buy={buy}
            askForPrice={askForPrice}
            mainImage={mainImage}
            relatedProducts={relatedProducts}
            collectionHandle={collectionHandle}
            accordion={accordion}
            setAccordion={setAccordion}
          />
        )}
      </AnimatedPage>
      <style jsx="true">{`
        .button-price button {
          width: 30vw !important;
          height: 40px !important;
        }
        .available-store-container {
          display: flex;
          width: 100%;
          text-align: center;
          gap: 1rem;
        }
        .textStores {
          width: 100px;
          margin: 0 auto;
        }
        .available-store-img {
          border-radius: 20px;
          height: 55px;
          margin: 0 auto;
          width: 100px;
          object-fit: fill;
        }
        .containerAccordion {
          display: flex;
          justify-content: space-between;
        }
        @media (max-width: 768px) {
          .button-price button {
            width: 90% !important;
            height: 45px !important;
          }
        }
        @media (min-width: 1440px) {
          .button-price button {
            width: 20vw !important;
          }
        }
      `}</style>
    </>
  );
};

export const query = graphql`
  fragment Product on ShopifyProduct {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    availableForSale
    tags
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
    variants {
      id
      shopifyId
    }
  }
  query ProductAndRelatedProductsQuery($id: String!, $collectionId: String!) {
    shopifyProduct(id: { eq: $id }) {
      ...Product
    }
    shopifyCollection(id: { eq: $collectionId }) {
      id
      products {
        ...Product
      }
    }
  }
`;

export default ProductTemplate;
