import { ToolConfig } from "@dainprotocol/service-sdk";
import { z } from "zod";

/**
 * Tool configuration to print "john"
 */
const printNameConfig: ToolConfig = {
  id: "print-name",
  name: "Print Name",
  description: "Prints the name 'john'",
  input: z.object({}),
  output: z.object({
    name: z.string().describe("The printed name"),
  }),
  handler: async () => {
    const name = "john";
    console.log(name);

    return {
      text: `Printed name: ${name}`,
      data: { name },
      ui: {
        type: "card",
        uiData: JSON.stringify({
          title: "Printed Name",
          content: name,
        }),
      },
    };
  },
};

export { printNameConfig };
