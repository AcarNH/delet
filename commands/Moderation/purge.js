const Command = require("../../base/Command.js");

class Purge extends Command {
  constructor(client) {
    super(client, {
      name: "purge",
      description: "Purges (bulk-deletes) between 2 and 99 messages.",
      category: "Moderation",
      usage: "purge ([user]) [number]",
      aliases: ["prune", "delet", "bulkdelete"],
      permLevel: "Moderator",
      guildOnly: true
    });
  }

  async run(message, args, level, settings, texts) { // eslint-disable-line no-unused-vars
    if (!message.guild.available) return this.client.logger.info(`Guild "${message.guild.name}" (${message.guild.id}) is unavailable.`);
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(texts.general.missingPerm.replace(/{{perm}}/g, "Manage Messages"));

    const user = message.mentions.users.first();
    const amount = parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);

    if (!amount && !user) return message.channel.send(`You must specify a user and amount, or just an amount, of messages to purge.\nUse \`${settings.prefix}help purge\` for more information.`);
    if (!amount) return message.channel.send("You must specify an amount to delete.");

    let messages = await message.channel.fetchMessages({ limit: amount });

    if (user) {
      const filterBy = user ? user.id : this.client.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);

      this.client.emit("messageDeleteBulk", messages);
      for (const msg of messages) msg.channel.messages.delete(msg.id);
      
      try {
        message.channel.bulkDelete(messages);
      } catch (error) {
        this.client.logger.error(error);
        message.channel.send(texts.general.error.replace(/{{err}}/g, error.message));
      }

      return message.channel.send(`**${amount}** messages were purged.`);
    }

    this.client.emit("messageDeleteBulk", messages);
    for (const msg of messages.values()) msg.channel.messages.delete(msg.id);
    
    try {
      message.channel.bulkDelete(messages);
    } catch (error) {
      this.client.logger.error(error);
      message.channel.send(texts.general.error.replace(/{{err}}/g, error.message));
    }

    message.channel.send(`**${amount}** messages were purged.`);
  }
}

module.exports = Purge;