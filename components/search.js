import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useFlexSearch } from "react-use-flexsearch";
import Link from "./LanguagesLink";
import Modal from "./modal";

const Search = ({ setShown }) => {
  const { localSearchCollections } = useStaticQuery(graphql`
    query {
      localSearchCollections {
        index
        store
      }
    }
  `);
  const results = useFlexSearch(
    "ja",
    localSearchCollections.index,
    localSearchCollections.store
  );

  return (
    <Modal setShown={setShown}>
      <h2>Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map(result => (
            <Link to={"/collections/" + result.handle} key={result.url}>
              {result.title}
            </Link>
          ))}
        </ul>
      ) : (
        <p>No results!</p>
      )}
    </Modal>
  );
};

export default Search;
