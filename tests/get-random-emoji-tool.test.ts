import axios from "axios";
import { getRandomEmojiConfig } from "../src/tools/get-random-emoji-tool";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get-random-emoji-tool", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a random emoji successfully", async () => {
    const mockEmoji = {
      name: "grinning face",
      category: "smileys and people",
      group: "face positive",
      htmlCode: ["&#128512;"],
      unicode: ["U+1F600"],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockEmoji });

    const result = await getRandomEmojiConfig.handler({}, {
      id: "test",
      agentId: "test-agent",
      address: "test-address"
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://emojihub.yurace.pro/api/random"
    );
    expect(result.data).toEqual(mockEmoji);
    expect(result.text).toContain("Random emoji:");
  });

  it("should handle category filter", async () => {
    const mockEmoji = {
      name: "apple",
      category: "food and drink",
      group: "food-fruit",
      htmlCode: ["&#127822;"],
      unicode: ["U+1F34E"],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockEmoji });

    const result = await getRandomEmojiConfig.handler(
      { category: "food-and-drink" },
      {
        id: "test",
        agentId: "test-agent",
        address: "test-address"
      }
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://emojihub.yurace.pro/api/random/category/food-and-drink"
    );
    expect(result.data).toEqual(mockEmoji);
  });
});
