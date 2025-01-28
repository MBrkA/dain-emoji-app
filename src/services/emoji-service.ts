import { defineDAINService } from "@dainprotocol/service-sdk";
import { getRandomEmojiConfig } from "../tools/get-random-emoji-tool";
import { getAllEmojisConfig } from "../tools/get-all-emojis-tool";
import { getByCategoryConfig } from "../tools/get-by-category-tool";
import { emojiToolboxConfig } from "../toolboxes/emoji-toolbox";

const dainService = defineDAINService({
  metadata: {
    title: "Emoji Hub Service",
    description: "A DAIN service for fetching emojis from EmojiHub API",
    version: "1.0.0",
    author: "DAIN Developer",
    tags: ["emoji", "fun", "api"],
  },
  identity: {
    apiKey: process.env.DAIN_API_KEY,
  },
  tools: [getRandomEmojiConfig, getAllEmojisConfig, getByCategoryConfig],
  toolboxes: [emojiToolboxConfig],
});

export { dainService };

// TESTTEST