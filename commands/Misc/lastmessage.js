const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class LastMessage extends Command {
  constructor(client) {
    super(client, {
      name: "lastmessage",
      description: "Returns the mentioned user's last message.",
      usage: "lastmessage",
      aliases: ["lm"],
      guildOnly: true
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
      const member = message.mentions.members.first();
      if (!member) return message.channel.send("You must mention a user whose last message you'd like to see.");

      const lastMsg = message.guild.member(member).lastMessage;
      if (!lastMsg) return message.channel.send("This user's last message could not be found, or they simply may not have sent any messages here.");
                  
      const embed = new RichEmbed()
        .setColor(message.guild.member(member).displayColor)
        .setAuthor(member.user.tag, member.user.displayAvatarURL)
        .setDescription(`*${lastMsg}*`)
        .setFooter(`#${message.channel.name}`)
        .setTimestamp();

        message.channel.send({embed});
  }
}

module.exports = LastMessage;
