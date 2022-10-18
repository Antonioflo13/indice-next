import React from "react";
import PageTitle from "../components/page-title";

const Breadcrumbs = ({ title }) => {
  return (
    <>
      <div className="breadcrumbs">
        <PageTitle
          breadcrumbs={[
            {
              title: title,
            },
          ]}
          title=" "
          subtitle=" "
        />
      </div>
      <style jsx="true">
        {`
          .breadcrumbs {
            max-width: 90rem;
            margin-left: auto;
            margin-right: auto;
          }

          @media (max-width: 768px) {
            .breadcrumbs {
              margin-top: 40px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Breadcrumbs;
