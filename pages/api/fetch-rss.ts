import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    query: { url, page = 0 },
  } = request;

  if (url === undefined) {
    return response.status(400).end(`Query parameter "url" unspecified`);
  }

  const pageNum = Number(page);
  const parser = new Parser();
  const feed = await parser.parseURL(url.toString());
  feed.items.forEach((item) => {
    delete item.author;
    delete item.content;
    delete item["content:encoded"];
    delete item.contentSnippet;
    delete item.creator;
    delete item.link;
    delete item.itunes.author;
    delete item.itunes.explicit;
    delete item.itunes.subtitle;
    delete item.itunes.summary;
  });

  return response.status(200).json(feed);
}

export const config = {
  api: {
    responseLimit: false,
  },
};
