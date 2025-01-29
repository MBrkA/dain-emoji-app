import { ToolConfig } from "@dainprotocol/service-sdk";
import { z } from "zod";

const printNameConfig: ToolConfig = {
  id: "print-name",
  name: "Print Name",
  description: "Prints the name 'John Doe'",
  input: z.object({}),
  output: z.object({
    name: z.string()
  }),
  pricing: { pricePerUse: 0.001, currency: "USD" },
  handler: async () => {
    const name = "John Doe";
    
    return {
      text: `Name: ${name}`,
      data: { name },
      ui: {
        type: "card",
        uiData: JSON.stringify({
          title: "Name",
          content: name
        })
      }
    };
  }
};

export { printNameConfig };
