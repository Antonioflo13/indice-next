import React, { useState } from "react"
import getAllCollections from "../api/collections";
import getAllArticles from "../api/articles";
import ModalsIcons from "../components/modalsIcons"
import SliderMenu from "../components/slider-menu"
import SliderHomeCollection from "../templates/slider-home-collection"
import SliderArticles from "../components/slider-articles"
import AnimatedPage from "../components/animated-page";
import Layout from "../components/layout";

const IndexPage = ({ collections, articles }) => {
    console.log('collections', collections);
    console.log('articles', articles);
    const data = [];
    const [show, setShown] = useState(false);
    let selectSingleIcon;

    return (
       <div>
           <Layout>
               <AnimatedPage fullHeight>
                   <SliderArticles data={data} />
                   <SliderMenu />
                   <SliderHomeCollection />
                   {show && (
                       <ModalsIcons selectSingleIcon={selectSingleIcon} setShown={setShown} />
                   )}
               </AnimatedPage>
           </Layout>
       </div>
    )
}

export async function getStaticProps() {
    const collections = await getAllCollections();
    const articles = await getAllArticles();
    return {
        props: { collections, articles }, // will be passed to the page component as props
    }
}

export default IndexPage
