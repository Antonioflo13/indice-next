import request from "./request";

async function getAllArticles() {
  const query = `
{
    allArticles(orderBy: _createdAt_ASC, locale: it) {
          id
          title
          titlemagazine
          description
          handle
          imageheader {
            url
          }
          imageheadermobile {
            url
          }
    }
}
`;

  return await request("datoCMS", query);
}

export default getAllArticles;
