//REACT
import React from "react";
//API
import getProduct from "../../api/product";
import { getCollection } from "../../api/collections";
//STORE
import { setDialogContactShow } from "../../store/modules/dialogContact";
import { setDialogContactProduct } from "../../store/modules/dialogContact";
import { setShowCart, setCartContent } from "../../store/modules/cart";
import { useDispatch, useSelector } from "react-redux";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
import shopifyBuildClient from "../../hooks/shopifyBuildClient";
//UTILS
import { getCookie } from "../../utils/cookie";
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
  const language = useSelector(state => state.language.value);
  const dispatch = useDispatch();

  //HOOKS
  const isDesktop = useMediaQuery(768);

  //STATE
  const [accordion, setAccordion] = React.useState({
    size: false,
    shipping: false,
  });

  const relatedProducts = CollectionProducts.data.collection.products.nodes;
  const mainImage = (
    <GalleryProducts
      images={product.variants.edges[0].node.product.images.nodes}
    />
  );

  const title = `Indice - ${productHandle}`;

  //FUNCTIONS
  const buy = async () => {
    let checkoutId = getCookie("checkoutId");

    if (!checkoutId) {
      await shopifyBuildClient("createCheckout", language);
    }
    const items = {
      variantId: product.variants.edges[0].node.id,
      quantity: 1,
    };
    const updatedCheckout = await shopifyBuildClient(
      "updateCheckout",
      language,
      items
    );

    const { lineItems, totalPrice } = updatedCheckout;
    const cartContent = { lineItems, totalPrice };

    dispatch(setCartContent(JSON.stringify(cartContent)));
    dispatch(setShowCart(true));
  };

  const askForPrice = () => {
    dispatch(setDialogContactShow(true));
    dispatch(
      setDialogContactProduct({ title: product.title, vendor: product.vendor })
    );
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
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
            product={product}
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
