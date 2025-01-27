import axios from "axios";
import { getByCategoryConfig } from "../src/tools/get-by-category-tool";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get-by-category-tool", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch emojis by category successfully", async () => {
    const mockEmojis = [
      {
        name: "grinning face",
        category: "smileys and people",
        group: "face positive",
        htmlCode: ["&#128512;"],
        unicode: ["U+1F600"]
      },
      {
        name: "smiling face",
        category: "smileys and people", 
        group: "face positive",
        htmlCode: ["&#128513;"],
        unicode: ["U+1F601"]
      }
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockEmojis });

    const result = await getByCategoryConfig.handler(
      { category: "smileys-and-people" },
      {
        id: "test",
        agentId: "test-agent",
        address: "test-address"
      }
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://emojihub.yurace.pro/api/all/category/smileys-and-people"
    );
    expect(result.data).toEqual(mockEmojis);
    expect(result.text).toBe("Found 2 emojis in category: smileys-and-people");
  });

  it("should validate category input", () => {
    const validInput = getByCategoryConfig.input.safeParse({
      category: "smileys-and-people"
    });
    expect(validInput.success).toBe(true);

    const invalidInput = getByCategoryConfig.input.safeParse({
      category: "invalid-category"
    });
    expect(invalidInput.success).toBe(false);
  });
});
