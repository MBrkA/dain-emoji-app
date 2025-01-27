import { ToolboxConfig } from "@dainprotocol/service-sdk";
import { getRandomEmojiConfig } from "../tools/get-random-emoji-tool";
import { getAllEmojisConfig } from "../tools/get-all-emojis-tool";
import { getByCategoryConfig } from "../tools/get-by-category-tool";

const emojiToolboxConfig: ToolboxConfig = {
  id: "emoji-toolbox",
  name: "Emoji Toolbox",
  description: "Collection of tools for fetching emojis from EmojiHub API",
  tools: [getRandomEmojiConfig.id, getAllEmojisConfig.id, getByCategoryConfig.id],
  metadata: {
    complexity: "Low",
    applicableFields: ["Fun", "UI/UX", "Content"],
  },
  recommendedPrompt: "Use this toolbox to fetch emojis for your application",
};

export { emojiToolboxConfig };
