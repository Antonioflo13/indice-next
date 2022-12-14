//REACT
import React from "react";
//API
import getAllArticles from "../../api/articles";
import getArticle from "../../api/article";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//COMPONENTS
import Layout from "../../components/layout";
import AnimatedPage from "../../components/animated-page";
import PageTitle from "../../components/page-title";
import { getCollection } from "../../api/collections";
import SliderArticleCollection from "../../templates/slider-article-collection";
import Head from "next/head";
import Image from "next/image";
// import SliderArticleProducts from "../templates/slider-article-products";

const Article = ({ article, collectionProducts }) => {
  const isDesktop = useMediaQuery(768);
  const productsInArticle = [];
  article = article?.data?.article;
  collectionProducts = collectionProducts?.data?.collection;
  const title = `Indice - ${article?.handle}`;

  // Object.entries(article).forEach(item => {
  //   if (item[0].includes("product")) {
  //     if (item[1] !== "") {
  //       const titleItem = item[1].toUpperCase();
  //       const filterResultSlider = data.allShopifyProduct.edges.find(
  //         item => item.node.title === titleItem
  //       );
  //       productsInArticle.push(filterResultSlider);
  //     }
  //   }
  // });

  return (
    <>
      {article && (
        <Layout>
          <Head>
            <title>{title}</title>
            <meta name="description" content={article?.handle} />
          </Head>
          <AnimatedPage margins={true}>
            <div className="flex flex-col justify-center w-full">
              <div className="w-full md:w-1/2 mt-8">
                {isDesktop && (
                  <PageTitle
                    breadcrumbs={[
                      ...[
                        { title: "breadcrumbs.magazine", link: "/magazine" },
                        {
                          title: article?.handle,
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
                  <div className="img-header-container">
                    <Image
                      fill="true"
                      priority={true}
                      style={{ objectFit: "cover" }}
                      sizes="100%"
                      placeholder="blur"
                      blurDataURL={article.imageheader.url}
                      src={article.imageheader.url}
                      alt={article.imageheader.url}
                    />
                  </div>
                ) : (
                  <div className="img-header-container">
                    <Image
                      fill="true"
                      priority={true}
                      style={{ objectFit: "cover" }}
                      sizes="100%"
                      placeholder="blur"
                      blurDataURL={article.imageheader.url}
                      src={article.imageheader.url}
                      alt={article.imageheader.url}
                    />
                  </div>
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
                    {article.description.length > 0
                      ? article.description
                      : null}
                  </p>
                </div>
              </div>
            </div>
            {collectionProducts !== null && (
              <SliderArticleCollection
                collectionProducts={collectionProducts}
              />
            )}
            {/*<SliderArticleProducts productsinArticle={productsinArticle} />*/}
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

              .img-header-container {
                position: relative;
                height: 250px;
                border-radius: 15px;
                overflow: hidden;
              }

              @media (max-width: 768px) {
                .img-headerCollection {
                  height: 200px;
                }
              }
            `}
          </style>
        </Layout>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const articles = await getAllArticles();
  const paths = articles.data.allArticles.splice(0,5).map(article => {
    return {
      params: {
        article: article.handle,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const handle = context.params.article;
  const article = await getArticle(handle);
  const shopifyCollection = article?.data?.article?.shopifyCollection;
  const collectionProducts = await getCollection(shopifyCollection);
  return {
    props: { article, collectionProducts },
  };
}

export default Article;
