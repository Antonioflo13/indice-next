import React, { useContext, useEffect } from "react";
import getProduct from "../api/product";
import SharedStateContext from "../components/shared-state-context";
import useMediaQuery from "../hooks/useMediaQuery";
import { getCookie, setCookie } from "../utils/cookie";
import GalleryProducts from "../components/gallery-products";
import { useIntl } from "react-intl";
import AnimatedPage from "../components/animated-page";
import PageTitle from "../components/page-title";
import DesktopProduct from "../templates/desktop-product";
import MobileProduct from "../templates/mobile-product";
import Layout from "../components/layout";

const Product = ({ resProduct }) => {
  const product = resProduct.data.product;
  console.log(product);
  const { setCurrentSidebarTitle, setContactShown, setCart } =
    useContext(SharedStateContext);
  const [accordion, setAccordion] = React.useState({
    size: false,
    shipping: false,
  });
  // useEffect(() => {
  //   setCurrentSidebarTitle("");
  // }, [setCurrentSidebarTitle]);
  const isDesktop = useMediaQuery(768);

  // const relatedProducts = products.filter(p => p.id !== shopifyProduct.id);

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
    setContactShown(true, product);
  };

  const mainImage = (
    <GalleryProducts
      images={product.variants.edges[0].node.product.images.nodes}
    />
  );

  return (
    <Layout>
      <AnimatedPage margins={true} noAnimate={true}>
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
                    title: product.vendor,
                    // link: "/collections/" + collectionHandle,
                  },
                  {
                    title: product.title,
                    // link: "/collections/" + productHandle,
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
                  title: product.vendor,
                  // link: "/collections/" + collectionHandle,
                },
                {
                  title: product.title,
                  // link: "/collections/" + productHandle,
                },
              ]}
              title=" "
            />
          </div>
        )}
        {isDesktop ? (
          <DesktopProduct
            shopifyProduct={product}
            buy={buy}
            askForPrice={askForPrice}
            mainImage={mainImage}
            // relatedProducts={relatedProducts}
            // collectionHandle={collectionHandle}
            accordion={accordion}
            setAccordion={setAccordion}
          />
        ) : (
          <MobileProduct
            // shopifyProducts={products}
            shopifyProduct={product}
            buy={buy}
            askForPrice={askForPrice}
            mainImage={mainImage}
            // relatedProducts={relatedProducts}
            // collectionHandle={collectionHandle}
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
    </Layout>
  );
};

export async function getStaticProps() {
  const resProduct = await getProduct();
  return {
    props: { resProduct },
  };
}

export default Product;
