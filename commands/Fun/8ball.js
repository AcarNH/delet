const Command = require("../../base/Command.js");
const Discord = require("discord.js");

class EightBall extends Command {
  constructor(client) {
    super(client, {
      name: "8ball",
      description: "Consults my magic 8-ball!",
      category: "Fun",
      usage: "8ball [question]",
      aliases: ["8-ball", "eightball", "fortune"]
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
      const settings = message.guild ? this.client.getSettings(message.guild.id) : this.client.settings.get("default");

      // SUBMITTING FORTUNES
      // If you wish to submit a fortune, please fork this repository, add the fortune to the "fortunes" array, and
      // create a pull request. Please add a comment next to it, stating whether it is positive, negative, or neutral.
      // If you're unsure, leave it blank. If you do state if it's positive, neutral ornegative, please update the
      // "FORTUNE TYPES" comments accordingly.

      // FORTUNE TYPES
      //
      // Positive: 11
      // Neutral:  5
      // Negative: 11

      const fortunes = [
        "Yes.", // Positive
        "No.", // Negative
        "Maybe.", // Neutral
        "Most certainly!", // Positive
        "Definitely not.", // Negative
        "Undoubtedly.", // Positive
        "Affirmative.", // Positive
        "Negative.", // Negative
        "No way, José!", // Negative
        "Only on Wednesdays.", // Neutral
        "If you are Ethan, yes. Otherwise, no.", // Neutral
        "no fucc u", // Negative
        "Certainly not.", // Negative
        "Seems like my magic 8 ball is broken... Try again.",
        "I sure hope so!", // Positive
        "There is a good chance.", // Positive
        "Quite likely.", // Positive
        "I think so.", // Positive
        "I hope not.", // Negative
        "I hope so.", // Positive
        "Possibly.", // Neutral
        "Forget about it.", // Negative
        "https://giphy.com/gifs/eXQPwwE8DFTZS", // Negative
        "sry gtg", // Neutral
        "I highly doubt it.", // Negative
        "My sources say no.", // Negative
        "My sources say yes.", // Positive
        "All signs point to yes." // Positive
      ];

      if (args[0]) {
        try {
          //message.channel.send(fortunes.random());
          const embed = new Discord.RichEmbed()
          .setTitle("Magic 8 Ball 🎱")
          .setDescription(`The 8 ball says:\n**${fortunes.random()}**\n   ‍   `)
          .setFooter(`Question asked by ${message.author.tag}`, message.author.displayAvatarURL);

          message.channel.send({embed});
        } catch (error) {
          this.client.logger.error(error);
          message.channel.send(`My magic 8 ball says that an error occurred:\n${error.message}`);
        }
      } else {
        message.channel.send(`Unsure how to use this command? Use \`${settings.prefix}help 8ball\` to see how.`);
      }
  }
}

module.exports = EightBall;
