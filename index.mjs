import { Client, GatewayIntentBits } from "discord.js";
import fs from "node:fs/promises";
import dotenv from "dotenv";
import path from "node:path";
import url from "node:url";
dotenv.config();
const { token } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: ["USER", "MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION"],
});

const events = await fs.readdir(
  path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "./events")
);

for (const event of events) {
  //console.log(event)
  client.on(event.split(".")[0], async (...args) => {
    await (await import("./events/" + event)).default.exec(args);
  });
  console.log("✅ Loaded " + event.split(".")[0] + " event");
}

//client
//  .on("error", console.error)
//  .on("warn", console.warn)
//  .on("debug", console.log);

// Login to Discord with your client's token
await client.login(token)