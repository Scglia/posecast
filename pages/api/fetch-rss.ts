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
  feed.items = feed.items.splice(pageNum * 200, 200);
  return response.status(200).json(feed);
}
