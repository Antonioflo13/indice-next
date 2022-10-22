import React, { useContext, useEffect } from "react";
import getProduct from "../api/product";
import { getProductsById } from "../api/collections";
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
import { Navbar } from "../components/Navbar";

const Product = ({ resProduct, CollectionProducts }) => {
  const product = resProduct.data.product;
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

  const relatedProducts = CollectionProducts.data.collection.products.nodes;

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
    <div className="pt-20">
      <Navbar />
      <MobileProduct
        // shopifyProducts={products}
        shopifyProduct={product}
        buy={buy}
        askForPrice={askForPrice}
        mainImage={mainImage}
        relatedProducts={relatedProducts}
        // collectionHandle={collectionHandle}
        accordion={accordion}
        setAccordion={setAccordion}
      />
    </div>
  );
};

export async function getStaticProps() {
  const resProduct = await getProduct();
  const CollectionProducts = await getProductsById();
  return {
    props: { resProduct, CollectionProducts },
  };
}

export default Product;
