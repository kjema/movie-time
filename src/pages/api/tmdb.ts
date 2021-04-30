import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { type = "movie", search },
    method,
  } = req;

  try {
    switch (method) {
      case "GET":
        const response = await fetch(
          `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`
        );

        const result = await response.json();
        res.status(200).json(result);
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error(err);
  }
};

export default handler;
