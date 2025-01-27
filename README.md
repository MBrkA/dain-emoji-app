# DAIN Emoji Hub Service

A DAIN service that integrates with the EmojiHub API to provide emoji-related functionality.

## Features

- Get random emojis with optional category and group filters
- Fetch all emojis with filtering capabilities
- Well-structured UI representations of the emoji data

## Tools

### 1. Get Random Emoji
- Fetches a random emoji from the EmojiHub API
- Supports optional category and group filters
- Returns detailed emoji information including HTML codes

### 2. Get All Emojis
- Retrieves all emojis with optional filtering
- Presents data in a table format
- Includes comprehensive emoji details

## Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the service:
\`\`\`bash
npm start
\`\`\`

## Testing

Run the test suite:
\`\`\`bash
npm test
\`\`\`

## API Reference

The service integrates with EmojiHub API endpoints:
- Random emoji: \`https://emojihub.yurace.pro/api/random\`
- All emojis: \`https://emojihub.yurace.pro/api/all\`

## Environment Variables

- \`DAIN_API_KEY\`: Your DAIN API key

## License

MIT
