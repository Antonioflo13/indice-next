//REACT
import React from "react";
//COMPONENTS
import AnimatedPage from "../components/animated-page";
import Breadcrumbs from "../components/breadcrumbs";
import Layout from "../components/layout";
//STORES
import { stores } from "../data/stores";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
import Head from "next/head";

const Boutiques = () => {
  const isDesktop = useMediaQuery(768);

  return (
    <>
      <Layout>
        <Head>
          <title>Indice - Boutiques</title>
          <meta name="description" content="Boutiques" />
        </Head>
        <AnimatedPage margins={true}>
          {isDesktop && <Breadcrumbs title="Boutiques" />}
          <div className="container-boutiques">
            {stores.map((item, key) => (
              <div className="boutiques" key={key}>
                <img
                  className="boutiques-image"
                  src={item.image.src.src}
                  alt="image header"
                />
                <h1 className="boutiques-title text-xl font-bold ">
                  {item.name}
                </h1>
                <p className="boutiques-description">{item.address}</p>
              </div>
            ))}
          </div>
          {!isDesktop && <Breadcrumbs title="Boutiques" />}
        </AnimatedPage>
      </Layout>
      <style jsx="true">
        {`
          .container-boutiques {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 4em;
            row-gap: 4em;
          }

          .boutiques {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            cursor: pointer;
            background-color: #f8f8f8;
            border-radius: 25px;
          }

          .boutiques-title {
            margin-top: 10px;
            margin-bottom: 5px;
          }

          .boutiques-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
          }

          .boutiques-description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @media (max-width: 768px) {
            .container-boutiques {
              grid-template-columns: unset;
            }

            .boutiques {
              margin-top: 50px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Boutiques;
