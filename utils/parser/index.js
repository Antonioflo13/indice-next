export const parserLineItems = items => {
  let cartItems = [];
  if (items) {
    items.map(item => {
      const { quantity, variant } = item;
      const idLineItems = item.id;
      const titleProduct = item.title;
      const { image, price, title, id } = variant;
      const { src, altText } = image;
      const details = { image: { src, altText }, price, title };

      cartItems = [
        ...cartItems,
        { titleProduct, quantity, title, details, id, idLineItems },
      ];
    });
  }
  return cartItems;
};

export const numberWithCommas = x => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
  return x;
};
