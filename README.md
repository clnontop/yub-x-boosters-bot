# YuB-X-Boosters Discord Bot

A Discord bot for role verification and premium download management.

## Features
- 🔐 Server Booster role verification
- 📥 Premium download access control
- 🌐 Web authentication integration
- 🤖 24/7 uptime on Render

## Deployment on Render

### Environment Variables Required:
```
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=1423554896111599646
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_GUILD_ID=1351852319754551346
BOOSTER_ROLE_ID=1423564766806540328
AUTH_PORT=3001
WEBSITE_URL=https://yub-x-booster.netlify.app
NODE_ENV=production
```

### Commands:
- `/downloads` - Get premium download links
- `/help` - Show available commands
- `/ping` - Check bot status

## Local Development
```bash
npm install
npm start
```

## Author
Created by cln.a1 for YuB-X-Boosters community.
