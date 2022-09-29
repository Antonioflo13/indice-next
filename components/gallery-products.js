import React, { useState } from "react";

const GalleryProducts = ({ images }) => {
  const [imageList, setImageList] = useState([...images]);
  const chageView = item => {
    let imageListChange = [...images];
    const index = imageListChange.findIndex(
      image => image.originalSrc === item.originalSrc
    );
    imageListChange.unshift(imageListChange.splice(index, 1)[0]);
    setImageList(imageListChange);
  };

  return (
    <>
      <div>
        <div className="containerMainImage bg-indice-grey">
          <img className="mainImage" src={imageList[0].originalSrc} alt="" />
        </div>
        <div className="containerImageTubler">
          {imageList.slice(1, 4).map((item, index) => (
            <div
              className="cursor-pointer w-7/12 flex justify-center bg-indice-grey"
              onClick={() => chageView(item)}
              key={index}
            >
              <img
                key={item.id}
                className="imageTumblr"
                src={item.originalSrc}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx="true">{`
        .containerMainImage {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-bottom: 1rem;
        }
        .mainImage {
          width: 65%;
        }
        .containerImageTubler {
          display: flex;
          justify-content: space-between;
          gap: 2vw;
        }
        .imageTumblr {
          width: 50%;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export default GalleryProducts;
