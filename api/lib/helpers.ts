import { HandlerResponse } from "@netlify/functions";
import { CORS_HEADERS } from "../lib/constants";

export const createResponse = (
  args: Partial<HandlerResponse & { body: any }>
) => {
  return {
    statusCode: args.statusCode ?? 200,
    ...args,
    ...(args.body && {
      body:
        typeof args.body === "object" ? JSON.stringify(args.body) : args.body,
    }),
    headers: {
      ...CORS_HEADERS,
      ...(args.headers && args.headers),
    },
  };
};

export async function convertUSDToSats(usd: number) {
  const amountInBTC = await fetch(
    `https://blockchain.info/tobtc?currency=USD&value=${usd}`
  )
    .then((res) => res.text())
    .then((res) => Number(res));

  return amountInBTC * 100_000_000;
}
