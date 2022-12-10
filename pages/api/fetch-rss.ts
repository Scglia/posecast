import type { NextApiRequest, NextApiResponse } from "next";
import Parser from "rss-parser";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    query: { url },
  } = request;

  if (url === undefined) {
    return response.status(400).end(`Query parameter "url" unspecified`);
  }

  const parser = new Parser();
  const feed = await parser.parseURL(url.toString());
  return response.status(200).json(feed);
}
