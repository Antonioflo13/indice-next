//REACT
import React from "react";
//API
import getProduct from "../../api/product";
import { getCollection } from "../../api/collections";
//STORE
import { setShopifyCheckout } from "../../store/modules/shopify";
import { setDialogContactShow } from "../../store/modules/dialogContact";
import { setCart } from "../../store/modules/cart";
import { useDispatch, useSelector } from "react-redux";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//UTILS
import { getCookie, setCookie } from "../../utils/cookie";
//COMPONENTS
import GalleryProducts from "../../components/gallery-products";
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import DesktopProduct from "../../templates/desktop-product";
import MobileProduct from "../../templates/mobile-product";
import Layout from "../../components/layout";
import Head from "next/head";

const Product = ({
  resProduct,
  CollectionProducts,
  collectionHandle,
  productHandle,
}) => {
  const product = resProduct.data.product;

  //STORE
  const shopifyClient = useSelector(state => JSON.parse(state.shopify.client));
  const dispatch = useDispatch();

  //HOOKS
  const isDesktop = useMediaQuery(768);

  //STATE
  const [accordion, setAccordion] = React.useState({
    size: false,
    shipping: false,
  });
  const relatedProducts = CollectionProducts.data.collection.products.nodes;

  const buy = async () => {
    let checkoutId = getCookie("checkoutId");
    if (!checkoutId) {
      checkoutId = (await shopifyClient.checkout.create()).id;
      setCookie("checkoutId", checkoutId, 90);
    }
    const updatedCheckout = await shopifyClient.checkout.addLineItems(
      checkoutId,
      [
        {
          variantId: product.id,
          quantity: 1,
        },
      ]
    );

    const { lineItems, totalPrice } = updatedCheckout;
    const cartContent = { lineItems, totalPrice };
    await dispatch(setShopifyCheckout(updatedCheckout));
    dispatch(setCart(cartContent));
  };

  const askForPrice = () => {
    dispatch(setDialogContactShow(true, product));
  };

  const mainImage = (
    <GalleryProducts
      images={product.variants.edges[0].node.product.images.nodes}
    />
  );

  return (
    <Layout>
      <Head>
        <title>Indice - {productHandle}</title>
        <meta name="description" content={productHandle} />
      </Head>
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
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const collectionHandle = params.product[0];
  const productHandle = params.product[1];
  const resProduct = await getProduct(productHandle);
  const CollectionProducts = await getCollection(collectionHandle);
  return {
    props: { resProduct, CollectionProducts, collectionHandle, productHandle },
  };
}

export default Product;
