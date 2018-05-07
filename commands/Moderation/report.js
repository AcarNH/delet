const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class Report extends Command {
    constructor(client) {
      super(client, {
        name: "report",
        description: "Reports a user to the server's staff.",
        category: "Moderation",
        usage: "report [user] <reason/info>",
        extended: "Informs the current server's staff of a rule-breaker, by sending a message to the modlog channel.",
        aliases: [""],
        botPerms: ["MANAGE_MESSAGES"],
        guildOnly: true
      });
    }
    
    async run(message, args, level) { // eslint-disable-line no-unused-vars
        if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);

        const settings = message.guild ? this.client.getSettings(message.guild.id) : this.client.settings.get("default");
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");
        const modLog = message.guild.channels.find("name", settings.modLogChannel);
        if (!modLog) return message.channel.send(`Modlog channel not found. If you're an admin (or owner) on this server, please use:\`\`\`${settings.prefix}set edit modLogChannel {{channel name}}\`\`\`\nFor example: \`${settings.prefix}set edit modLogChannel cool-channel-name\`.`);
        if (!user) return message.channel.send("You must mention a user to report.");

        message.delete();

        const embed = new RichEmbed()
        .setTitle(`🚩 Report received from ${message.author.tag} (${message.author.id})`)
        .setColor(message.guild.member(user).displayColor)
        .setDescription(`\`\`\`css\nTarget: ${user.tag} (${user.id})\nReason: ${reason}\nChannel: #${message.channel.name}\`\`\``)
        .setFooter("Moderation system powered by delet", this.client.user.displayAvatarURL)
        .setTimestamp();

        try {
          this.client.channels.get(modLog.id).send({embed});
          message.channel.send("<:tick:398228298842374154> Report successfully sent.");
        } catch (error) {
          return message.channel.send("<:redX:398228298708025344> An error occurred whilst submitting the report.");
        }
        
    }
}

module.exports = Report;