import React, { useContext } from "react";
import AnimatedPage from "../components/animated-page";
import useMediaQuery from "../hooks/useMediaQuery";
import Link from "next/link";
import { motion } from "framer-motion";
import SharedStateContext from "../components/shared-state-context";
import { useIntl } from "react-intl";
import Breadcrumbs from "../components/breadcrumbs";
import { getAllCollections } from "../api/collections";
import Layout from "../components/layout";

const CollectionsPage = ({ collections }) => {
  collections = collections.data.collections.nodes;
  console.log(collections);
  const isDesktop = useMediaQuery("768");
  const { setCurrentSidebarTitle } = useContext(SharedStateContext);
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

  console.log(collectionsListByAlphabet);

  collectionsListByAlphabet.map(
    collectionsList => (collectionsList.collectionsList[0].viewLetter = true)
  );

  return (
    <Layout>
      <AnimatedPage margins={true}>
        {isDesktop && <Breadcrumbs title="Boutiques" />}
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
                      href={
                        collection.products?.edges?.length > 0 &&
                        collection.handle === "indice-capsule-collection"
                          ? `/${collection.handle}`
                          : `/collections/${collection.handle}`
                      }
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
              margin-bottom: 0px;
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
