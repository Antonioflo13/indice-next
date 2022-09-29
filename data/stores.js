import imageStoreBrescia from "../assets/images/store-brescia.jpeg";
import imageStoreForte from "../assets/images/store-forte.jpeg";
import imageStoreCortina from "../assets/images/store-cortina.jpeg";

export const stores = [
  {
    id: 0,
    name: "Brescia",
    image: { src: imageStoreBrescia, alt: "Store Brescia" },
    address: "Via Padre Giulio Bevilacqua, 7",
    otheraddress: "25121 Brescia (BS)",
    email: "brescia@indice.vision",
    cell: "+39 3206330888",
    linkCall: "tel:3206330888",
    linkMap:
      "https://www.google.com/maps/place/Via+Padre+Giulio+Bevilacqua,+7,+25121+Brescia+BS/@45.5385156,10.2182484,17z/data=!3m1!4b1!4m5!3m4!1s0x4781766b1f0b0739:0x5b6f3a9d316edb77!8m2!3d45.5385156!4d10.2204371?shorturl=1",
    linkMex: "https://wa.me/+393206330888",
  },
  {
    id: 1,
    name: "Forte dei Marmi",
    image: { src: imageStoreForte, alt: "Store Forte dei Marmi" },
    address: "Via Giuseppe Mazzini, 3A",
    otheraddress: "55042 Forte dei Marmi (LU)",
    email: "fortedeimarmi@indice.vision",
    cell: "+39 3311276285",
    linkCall: "tel:3311276285",
    linkMap:
      "https://www.google.com/maps/place/indice,+occhiali+straordinari+a+Forte+dei+Marmi/@43.9593014,10.1667225,17z/data=!3m1!4b1!4m5!3m4!1s0x12d5097af137b36d:0x4d5787592fae2e4b!8m2!3d43.9593014!4d10.1689112",
    linkMex: "https://wa.me/+393311276285",
  },
  {
    id: 2,
    name: "Cortina d'Ampezzo",
    image: { src: imageStoreCortina, alt: "Store Brescia" },
    address: "Via Roma, 3",
    otheraddress: "32043 Cortina d'Ampezzo (BL)",
    email: "cortina@indice.vision",
    cell: "+39 3206330888",
    linkCall: "tel:3206330888",
    linkMap:
      "https://www.google.com/maps/place/Via+Roma,+3,+32043+Cortina+d'Ampezzo+BL/@46.5363362,12.1405604,17z/data=!4m5!3m4!1s0x47783437a8a7a989:0xf76335ec2d28bd6a!8m2!3d46.5363928!4d12.1406207",
    linkMex: "https://wa.me/+393206330888",
  },
];
