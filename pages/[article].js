import React from "react";
import AnimatedPage from "../components/animated-page";
import PageTitle from "../components/page-title";
import { useMediaQuery } from "react-responsive";
import getAllArticle from "../api/article";
// import SliderArticleCollection from "../templates/slider-article-collection";
// import SliderArticleProducts from "../templates/slider-article-products";

const Article = ({ data }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const article = data.datoCmsArticle;
  const productsinArticle = [];

  Object.entries(article).forEach(item => {
    if (item[0].includes("product")) {
      if (item[1] !== "") {
        const titleItem = item[1].toUpperCase();
        const filterResultSlider = data.allShopifyProduct.edges.find(
          item => item.node.title === titleItem
        );
        productsinArticle.push(filterResultSlider);
      }
    }
  });

  return (
    <>
      <AnimatedPage margins={true}>
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
        {/* <SliderArticleCollection shopifyCollection={data.shopifyCollection} />
        <SliderArticleProducts productsinArticle={productsinArticle} /> */}
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
  );
};

export async function getStaticPaths() {
  const article = await getAllArticle();
  return {
    props: { article },
    paths: ["", { params: { slug: "second-post" } }],
    fallback: true,
  };
}

// Generating the paths for each post
// export async function getStaticPaths() {
//   // Get list of all files from our posts directory
//   const files = fs.readdirSync("posts");
//   // Generate a path for each one
//   const paths = files.map((fileName) => ({
//     params: {
//       slug: fileName.replace(".md", ""),
//     },
//   }));
//   // return list of paths
//   return {
//     paths,
//     fallback: false,
//   };
// }

// // Generate the static props for the page
// export async function getStaticProps({ params: { slug } }) {
//     const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
//     const { data: frontmatter, content } = matter(fileName);
//     return {
//       props: {
//         frontmatter,
//         content,
//       },
//     };

export default Article;
