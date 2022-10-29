import React, { useContext } from "react";
import getProduct from "../../api/product";
import { getProductsById } from "../../api/collections";
import SharedStateContext from "../../components/shared-state-context";
import useMediaQuery from "../../hooks/useMediaQuery";
import { getCookie, setCookie } from "../../utils/cookie";
import GalleryProducts from "../../components/gallery-products";
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import DesktopProduct from "../../templates/desktop-product";
import MobileProduct from "../../templates/mobile-product";
import Layout from "../../components/layout";

const Product = ({ resProduct, CollectionProducts, collectionHandle, productHandle }) => {
  const product = resProduct.data.product;
  const { setContactShown, setCart } =
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
    <Layout>
      <AnimatedPage margins={true} noAnimate={true} fullHeight={true}>
        {isDesktop && (
          <div className="flex">
            <div className="w-full md:w-1/ mt-8">
              <PageTitle
                breadcrumbs={[
                  {
                    title: "breadcrumbs.designers",
                    link: "/collections",
                  },

                  {
                    title: product.vendor,
                    link: "/collections/" + collectionHandle,
                  },
                  {
                    title: product.title,
                    link: "/collections/" + productHandle,
                  },
                ]}
                title=" "
              />
            </div>
          </div>
        )}
        {isDesktop ? (
          <DesktopProduct
            shopifyProduct={product}
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
            // shopifyProducts={products}
            shopifyProduct={product}
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
      <style jsx="true">{``}</style>
    </Layout>
  );
};

export async function getServerSideProps({params}) {
    const collectionHandle = params.product[0];
    const productHandle = params.product[1];
    const resProduct = await getProduct(productHandle);
    const CollectionProducts = await getProductsById(collectionHandle);
    return {
        props: { resProduct, CollectionProducts, collectionHandle, productHandle },
    };
}

export default Product;
