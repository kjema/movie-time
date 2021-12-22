import { NextApiRequest, NextApiResponse } from "next";

import { FanartResult } from "~/shared/models/fanart";

// https://fanarttv.docs.apiary.io

const handler = async (req: NextApiRequest, res: NextApiResponse<FanartResult | null>) => {
  const {
    query: { id },
    method,
  } = req;

  if (id === undefined) {
    throw new Error("id is required");
  }

  try {
    switch (method) {
      case "GET":
        const response = await fetch(
          `https://webservice.fanart.tv/v3/movies/${id}?api_key=${process.env.FANART_API_KEY!}`
        );

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
