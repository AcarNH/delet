const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const moment = require("moment");

class ChannelInfo extends Command {
    constructor(client) {
      super(client, {
        name: "channelinfo",
        description: "Displays information about the specified channel.",
        category: "Information",
        usage: "channelinfo [channel]",
        aliases: ["channel", "cinfo"],
        guildOnly: true
      });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        let chan;
        if (!args[0]) chan = message.channel;
        else chan = this.client.channels.get(args[0]);

        let topic;
        if (chan.topic.length > 2048) topic = "[Too long to display!]";
        else topic = chan.topic;

        const parent = chan.parent || "None";
        const createdTimestamp = moment.utc(chan.createdAt).format("YYYYMMDD");
        const randomColor = "#0000".replace(/0/g, function() {
            return (~~(Math.random() * 16)).toString(16);
        });

        const embed = new RichEmbed()
            .setColor(randomColor)
            .setThumbnail("https://vgy.me/9fSC7k.png")
            .setTitle(`Channel Information for #${chan.name}`)
            .addField("Created", chan.createdAt, true)
            .addField("Age", moment(createdTimestamp, "YYYYMMDD").fromNow().slice(0, -4), true)
            .addField("Type", chan.type.toProperCase(), true)
            .addField("Position", chan.calculatedPosition, true)
            .addField("Parent", parent, true)
            .addField("NSFW", chan.nsfw.toString().toProperCase(), true)
            .addField("Deletable", chan.deletable.toString().toProperCase(), true)
            .addField("Topic", topic, true)
            .setFooter(`Channel ID: ${chan.id}`, "https://vgy.me/167efD.png")
            .setTimestamp();

        message.channel.send({embed});
    }
}

module.exports = ChannelInfo;