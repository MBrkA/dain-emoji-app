import { ToolConfig } from "@dainprotocol/service-sdk";
import { z } from "zod";
import axios from "axios";

const getByCategoryConfig: ToolConfig = {
  id: "get-by-category",
  name: "Get Emojis By Category",
  description: "Fetch emojis from a specific category from EmojiHub API",
  input: z.object({
    category: z.enum([
      "smileys-and-people",
      "animals-and-nature", 
      "food-and-drink",
      "travel-and-places",
      "activities",
      "objects",
      "symbols",
      "flags"
    ]).describe("Category of emojis to fetch"),
  }),
  output: z.array(
    z.object({
      name: z.string(),
      category: z.string(), 
      group: z.string(),
      htmlCode: z.array(z.string()),
      unicode: z.array(z.string())
    })
  ),
  pricing: { pricePerUse: 0.003, currency: "USD" },
  handler: async ({ category }) => {
    const url = `https://emojihub.yurace.pro/api/all/category/${category}`;

    const response = await axios.get(url);
    const emojis = response.data;

    return {
      text: `Found ${emojis.length} emojis in category: ${category}`,
      data: emojis,
      ui: {
        type: "table",
        uiData: JSON.stringify({
          columns: [
            { key: "name", header: "Name", type: "text" },
            { key: "group", header: "Group", type: "text" },
            { key: "htmlCode", header: "HTML Code", type: "text" }
          ],
          rows: emojis.map((emoji: any) => ({
            name: emoji.name,
            group: emoji.group,
            htmlCode: emoji.htmlCode.join(" ")
          }))
        })
      }
    };
  }
};

export { getByCategoryConfig };
