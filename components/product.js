import React from "react";
import { FormattedNumber } from "react-intl";
import Link from "./LanguagesLink";

const Product = ({ product, collectionHandle }) => {
  return (
    <Link to={`/collections/${collectionHandle}/products/${product.handle}`}>
      <div className="w-full flex flex-col items-center">
        <div className="relative w-full" style={{ paddingTop: "66.6%" }}>
          <div className="absolute top-0 w-full h-full">
            {product.images.length > 0 && (
              <img
                alt={product.title}
                className="w-full h-full"
                style={{ objectFit: "cover" }}
                src={product.images[0].originalSrc}
              />
            )}
          </div>
        </div>
        <p className="text-2xs">{product.title}</p>
        <p className="-mt-1 text-2xs italic font-bold mackay">
          {product.vendor}
        </p>
        {product.availableForSale && product.variants[0].quantityAvailable > 0 && (
          <p className="text-2xs">
            <FormattedNumber
              // eslint-disable-next-line react/style-prop-object
              style="currency"
              value={product.variants[0].priceV2.amount}
              currency={product.variants[0].priceV2.currencyCode}
              minimumFractionDigits={2}
            />
          </p>
        )}
      </div>
    </Link>
  );
};

export default Product;
