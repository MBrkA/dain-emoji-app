import axios from "axios";
import { getAllEmojisConfig } from "../src/tools/get-all-emojis-tool";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get-all-emojis-tool", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all emojis successfully", async () => {
    const mockEmojis = [
      {
        name: "grinning face",
        category: "smileys and people",
        group: "face positive",
        htmlCode: ["&#128512;"],
        unicode: ["U+1F600"],
      },
      {
        name: "smiling face",
        category: "smileys and people",
        group: "face positive",
        htmlCode: ["&#128513;"],
        unicode: ["U+1F601"],
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockEmojis });

    const result = await getAllEmojisConfig.handler({}, {
      id: "test",
      agentId: "test-agent",
      address: "test-address"
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://emojihub.yurace.pro/api/all"
    );
    expect(result.data).toEqual(mockEmojis);
    expect(result.text).toBe("Found 2 emojis");
  });

  it("should handle group filter", async () => {
    const mockEmojis = [
      {
        name: "grinning face",
        category: "smileys and people",
        group: "face positive",
        htmlCode: ["&#128512;"],
        unicode: ["U+1F600"],
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockEmojis });

    const result = await getAllEmojisConfig.handler(
      { group: "face-positive" },
      {
        id: "test",
        agentId: "test-agent",
        address: "test-address"
      }
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://emojihub.yurace.pro/api/all/group/face-positive"
    );
    expect(result.data).toEqual(mockEmojis);
  });
});
