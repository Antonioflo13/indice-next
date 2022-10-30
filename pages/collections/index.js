//REACT
import React from "react";
//NEXT
import Link from "next/link";
//HOOKS
import useMediaQuery from "../../hooks/useMediaQuery";
//COMPONENTS
import AnimatedPage from "../../components/animated-page";
import Breadcrumbs from "../../components/breadcrumbs";
import { motion } from "framer-motion";
import Layout from "../../components/layout";
//API
import { getAllCollections } from "../../api/collections";
import Head from "next/head";

const CollectionsPage = ({ collections }) => {
  collections = collections.data.collections.nodes;
  //HOOKS
  const isDesktop = useMediaQuery("768");
  //generates alphabetical order products
  let collectionsListByAlphabet = [];
  let alphabeticList = [];
  for (const product of collections) {
    alphabeticList.push(product.title[0].toUpperCase());
  }
  alphabeticList = [...new Set(alphabeticList)];
  for (const letter of alphabeticList) {
    collectionsListByAlphabet.push({ letter: letter, collectionsList: [] });
  }
  for (const product of collections) {
    for (const collectionListByAlphabet of collectionsListByAlphabet) {
      if (product.title[0].toUpperCase() === collectionListByAlphabet.letter) {
        collectionListByAlphabet.collectionsList.push(product);
      }
    }
  }

  collectionsListByAlphabet.map(
    collectionsList => (collectionsList.collectionsList[0].viewLetter = true)
  );

  return (
    <Layout>
      <Head>
        <title>Indice - Collections</title>
        <meta name="description" content="Designers" />
      </Head>
      <AnimatedPage margins={true}>
        {isDesktop && <Breadcrumbs title="Designers" />}
        <ul className="containerDesigner">
          {collectionsListByAlphabet.map((letter, index) => (
            <React.Fragment key={index}>
              {letter.collectionsList.map((collection, index) => (
                <li key={index}>
                  {collection.viewLetter && (
                    <div className="font-semibold text-2xl font-serif italic mb-3 text-indice-red">
                      {letter.letter}
                    </div>
                  )}

                  <div
                    className={`${
                      collection.products?.edges?.length > 0
                        ? "available"
                        : "unavailable"
                    } mb-6`}
                  >
                    <Link
                      href={{
                        pathname:
                          collection.products?.edges?.length > 0 &&
                          collection.handle === "indice-capsule-collection"
                            ? "/collections/[collection]"
                            : "/collections/[collection]",
                        query: { collection: collection.handle },
                      }}
                    >
                      <span>
                        <motion.h2 className=" text-indice text-xl font-bold uppercase">
                          {collection.title}
                        </motion.h2>
                        <p className="text-xs mt-2">{collection.description}</p>
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
        {!isDesktop && <Breadcrumbs title="Boutiques" />}
      </AnimatedPage>
      <style jsx="true">
        {`
          .unavailable:hover {
            opacity: 0.2;
            transition: opacity 0.2s ease-in-out;
          }

          .available:hover {
            color: #800001;
            transition: color 0.2s ease-in-out;
          }

          .containerDesigner {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            row-gap: 1em;
            column-gap: 5em;
            margin-bottom: 100px;
          }

          .collection {
            margin-top: 20px;
          }

          @media (max-width: 768px) {
            .containerDesigner {
              grid-template-columns: repeat(1, 1fr);
              row-gap: 1em;
              margin-bottom: 0;
              margin-top: 50px;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export async function getStaticProps() {
  const collections = await getAllCollections();
  return {
    props: { collections },
  };
}

export default CollectionsPage;
