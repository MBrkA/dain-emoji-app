import { ToolConfig } from "@dainprotocol/service-sdk";
import { z } from "zod";
import axios from "axios";

const getAllEmojisConfig: ToolConfig = {
  id: "get-all-emojis",
  name: "Get All Emojis",
  description: "Fetch all emojis from EmojiHub API with optional filters",
  input: z.object({
    category: z.string().optional().describe("Optional category filter"),
    group: z.string().optional().describe("Optional group filter"),
  }),
  output: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      group: z.string(),
      htmlCode: z.array(z.string()),
      unicode: z.array(z.string()),
    })
  ),
  pricing: { pricePerUse: 0.005, currency: "USD" },
  handler: async ({ category, group }) => {
    let url = "https://emojihub.yurace.pro/api/all";
    
    if (category) {
      url += `/category/${category}`;
    }
    if (group) {
      url += `/group/${group}`;
    }

    const response = await axios.get(url);
    const emojis = response.data;

    return {
      text: `Found ${emojis.length} emojis`,
      data: emojis,
      ui: {
        type: "table",
        uiData: JSON.stringify({
          columns: [
            { key: "name", header: "Name", type: "text" },
            { key: "category", header: "Category", type: "text" },
            { key: "group", header: "Group", type: "text" },
            { key: "htmlCode", header: "HTML Code", type: "text" },
          ],
          rows: emojis.map((emoji: any) => ({
            name: emoji.name,
            category: emoji.category,
            group: emoji.group,
            htmlCode: emoji.htmlCode.join(" "),
          })),
        }),
      },
    };
  },
};

export { getAllEmojisConfig };
