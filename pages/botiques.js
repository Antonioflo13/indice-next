import React, { useEffect } from "react";
import AnimatedPage from "../components/animated-page";
import { useIntl } from "react-intl";
import Breadcrumbs from "../components/breadcrumbs";
import { stores } from "../data/stores";
import { useMediaQuery } from "react-responsive";
import Layout from "../components/layout";
import Image from "next/legacy/image";

const Botiques = () => {
  const intl = useIntl();

  return (
    <>
      <Layout>
        <AnimatedPage margins={true}>
          {/* {isDesktop && <Breadcrumbs title="Botiques" />} */}
          <div className="container-botiques">
            {stores.map((item, key) => (
              <div className="botiques" key={key}>
                <Image
                  className="botiques-image"
                  src={item.image.src}
                  alt="image header"
                />
                <h1 className="botiques-title text-xl font-bold ">
                  {item.name}
                </h1>
                <p className="botiques-description">{item.address}</p>
              </div>
            ))}
          </div>
          {/* {!isDesktop && <Breadcrumbs title="Botiques" />} */}
        </AnimatedPage>
      </Layout>
      <style jsx="true">
        {`
          .container-botiques {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 4em;
            row-gap: 4em;
          }

          .botiques {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            cursor: pointer;
            background-color: #f8f8f8;
            border-radius: 25px;
          }

          .botiques-title {
            margin-top: 10px;
            margin-bottom: 5px;
          }

          .botiques-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
          }

          .botiques-description {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @media (max-width: 768px) {
            .container-botiques {
              grid-template-columns: unset;
            }
            .botiques {
              margin-top: 50px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Botiques;
