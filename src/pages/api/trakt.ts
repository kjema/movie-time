import { NextApiRequest, NextApiResponse } from "next";

import { TaktResult } from "~/shared/models/trakt";

// https://trakt.docs.apiary.io

const headers: HeadersInit = {
  "Content-Type": "application/json",
  "trakt-api-version": "2",
  "trakt-api-key": process.env.TRAKT_CLIENT_ID!,
};

const handler = async (req: NextApiRequest, res: NextApiResponse<TaktResult[] | null>) => {
  const {
    query: { type, search },
    method,
  } = req;

  try {
    switch (method) {
      case "GET":
        const response = await fetch(`https://api.trakt.tv/search/${type}?query=${search}`, {
          headers,
        });

        const result = await response.json();
        res.status(200).json(result);
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Unknown error");
  }
};

export default handler;
