import React, { useState } from "react"
import getAllCollections from "../api/collections";
import getAllArticles from "../api/articles";
import ModalsIcons from "../components/modalsIcons"
import SliderMenu from "../components/slider-menu"
import SliderHomeCollection from "../templates/slider-home-collection"
import SliderArticles from "../components/slider-articles"
import AnimatedPage from "../components/animated-page";
import Layout from "../components/layout";

const IndexPage = ({ collections, articles}) => {
    const [show, setShown] = useState(false);
    articles = articles.data.allArticles;
    let selectSingleIcon;

    return (
           <Layout>
               <AnimatedPage fullHeight>
                   <SliderArticles articles={articles} />
                   <SliderMenu />
                   <SliderHomeCollection />
                   {show && (
                       <ModalsIcons selectSingleIcon={selectSingleIcon} setShown={setShown} />
                   )}
               </AnimatedPage>
           </Layout>
    )
}

export async function getStaticProps() {
    const collections = await getAllCollections();
    const articles = await getAllArticles();
    return {
        props: { collections, articles },
    }
}

export default IndexPage;
