import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ApifyListing = {
  id?: number;
  zpid?: number;
  title?: string;
  price?: string | number;
  location?: string;
  url?: string;
  statusType?:"for sale" | "sold" | "for rent"|"unknown";
  imgSrc?: string;
  addressCity?: string;
  addressStreet?: string;
  addressState?: string;
  addressZipcode?: string;
  createdAt?: string;
  updatedAt?: string;
  lng?: number;
  lat?: number;
  latLong?: { latitude: number; longitude: number };
  baths?: number;
  beds?: number;
  homeType?: string;
  images?: string[];
  roi?: number | 0; // ✅ Added ROI
};

const APIFY_DATASET_URLS = [
  "https://api.apify.com/v2/datasets/rl0FgEfLAkmaPrXOm/items?clean=true&format=json",
  "https://api.apify.com/v2/datasets/4SQEya8BAc0GPdKdo/items?clean=true&format=json",
  "https://api.apify.com/v2/datasets/619huxjJBmDbxpKSB/items?clean=true&format=json",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApifyListing[] | { error: string }>
) {
  try {
    const datasets = await Promise.all(
      APIFY_DATASET_URLS.map(async (url) => {
        try {
          const { data } = await axios.get<ApifyListing[]>(url, {
            timeout: 15000,
          });
          console.log(`✅ Fetched ${data.length} from ${url}`);
          return data;
        } catch (err: unknown) {
          console.warn(
            `⚠️ Skipped dataset ${url} - ${(err as Error).message || "Unknown error"}`
          );
          return [];
        }
      })
    );

    const allListings = datasets.flat();

    const normalized = allListings.map((item) => {
      // Normalize price
      let numericPrice: number | undefined;
      if (typeof item.price === "string") {
        numericPrice = Number(item.price.replace(/[^0-9]/g, ""));
      } else if (typeof item.price === "number") {
        numericPrice = item.price;
      }

      // Normalize latLong
      const latitude = item.latLong?.latitude ?? item.lat ?? null;
      const longitude = item.latLong?.longitude ?? item.lng ?? null;

      // Compute ROI (dummy 5% if price exists)
      const roi = numericPrice ? (numericPrice * 0.05) / numericPrice * 100 : 0;
      

      return {
        ...item,
        price: numericPrice ?? 0,
        latLong: latitude && longitude ? { latitude, longitude } : undefined,
        roi,
      };
    });

    const uniqueListings = Array.from(
      new Map(
        normalized.map((item) => [
          String(
            item.id ??
              item.zpid ??
              item.url ??
              `${item.addressStreet}-${item.addressZipcode}`
          ),
          item,
        ])
      ).values()
    );

    console.log("✅ Total listings after dedup:", uniqueListings.length);

    res.status(200).json(uniqueListings);
  } catch (error: unknown) {
    console.error("❌ Error fetching dataset(s):", (error as Error).message || error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
}
