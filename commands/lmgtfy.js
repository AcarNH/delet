const Command = require("../base/Command.js");
const encode = require("strict-uri-encode");

class LMGTFY extends Command {
    constructor(client) {
      super(client, {
        name: "lmgtfy",
        description: "Why don't you just... Google it?",
        category: "Fun",
        usage: "lmgtfy [query]",
        aliases: ["googleit"]
      });
    }

    async run(message, args, level) {
        const settings = message.guild ? this.client.getSettings(message.guild.id) : this.client.settings.get("default");
        let textQuery = args.join(" ");
        let query = encode(args.join(" "));
        let url = `https://lmgtfy.com/?q=${query}`;

        if (!query) return message.channel.send(`Please enter a query. For example, \`${settings.prefix}lmgtfy How to create a Discord server\`.`);
        else message.channel.send(`"${textQuery}"\n**<${url}>**`);
    }
}

module.exports = LMGTFY;