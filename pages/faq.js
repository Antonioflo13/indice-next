//REACT
import React from "react";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
//INTL
import { FormattedMessage } from "react-intl";
//COMPONENTS
import Breadcrumbs from "../components/breadcrumbs";
import AnimatedPage from "../components/animated-page";
import PageTitle from "../components/page-title";
import Layout from "../components/layout";
import Head from "next/head";

const FaqPage = () => {
  const isDesktop = useMediaQuery(768);

  return (
    <Layout>
      <Head>
        <title>Indice - FAQ</title>
        <meta name="description" content="FAQ" />
      </Head>
      <AnimatedPage margins={true} grey>
        {isDesktop && <Breadcrumbs title="faq" />}
        <div className="flex flex-col w-full mt-10">
          <div className="flex">
            <div className="w-full md:w-1/2">
              <PageTitle title="faq.title" subtitle="faq.subtitle" />
            </div>
          </div>
          <div className="mt-16 grid gap-8 md:gap-8 grid-rows-4 md:grid-rows-2 lg:grid-rows-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "faq.products",
                itemsCount: 3,
              },
              {
                title: "faq.payments",
                itemsCount: 3,
              },
              {
                title: "faq.shipping",
                itemsCount: 3,
              },
              {
                title: "faq.returns",
                itemsCount: 3,
              },
            ].map(i => (
              <FaqList
                key={i.title}
                title={i.title}
                itemsCount={i.itemsCount}
              />
            ))}
          </div>
        </div>
        {!isDesktop && <Breadcrumbs title="faq" />}
      </AnimatedPage>
    </Layout>
  );
};

export default FaqPage;

const FaqList = ({ title, itemsCount }) => (
  <div>
    <div className="font-semibold leading-none monument whitespace-pre-line uppercase">
      <FormattedMessage id={title} />
    </div>
    <ul className="mt-4">
      {Array(itemsCount)
        .fill(0)
        .map((_, i) => (
          <li key={`${title}.${i}`} className="my-2">
            <div className="text-sm font-black italic mackay text-indice-red">
              <FormattedMessage id={`${title}.${i}.title`} />
            </div>
            <div className="text-xs whitespace-pre-line">
              <FormattedMessage
                id={`${title}.${i}.description`}
                values={{
                  b: chunk => <b>{chunk}</b>,
                }}
              />
            </div>
          </li>
        ))}
    </ul>
  </div>
);
