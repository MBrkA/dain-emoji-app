import { ToolConfig } from "@dainprotocol/service-sdk";
import { z } from "zod";
import axios from "axios";

const getRandomEmojiConfig: ToolConfig = {
  id: "get-random-emoji",
  name: "Get Random Emoji",
  description: "Fetch a random emoji from EmojiHub API",
  input: z.object({
  }),
  output: z.object({
    name: z.string(),
    category: z.string(),
    group: z.string(),
    htmlCode: z.array(z.string()),
    unicode: z.array(z.string()),
  }),
  pricing: { pricePerUse: 0.001, currency: "USD" },
  handler: async () => {
    let url = "https://emojihub.yurace.pro/api/random";
    

    const response = await axios.get(url);
    const emoji = response.data;

    return {
      text: `Random emoji: ${emoji.name} from ${emoji.category}`,
      data: emoji,
      ui: {
        type: "card",
        uiData: JSON.stringify({
          title: emoji.name,
          content: `
            Category: ${emoji.category}
            Group: ${emoji.group}
            HTML Code: ${emoji.htmlCode.join(" ")}
          `,
        }),
      },
    };
  },
};

export { getRandomEmojiConfig };
