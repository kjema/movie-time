import { NextApiRequest, NextApiResponse } from "next";

import * as Const from "~/shared/const";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { type = "movie", search },
    method,
  } = req;

  try {
    switch (method) {
      case "GET":
        const response = await fetch(
          `https://api.themoviedb.org/3/search/${type}?api_key=${Const.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`
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
