const Command = require("../../base/Command.js");
const { botPerms } = require("../../util/data.js");

class Invite extends Command {
    constructor(client) {
      super(client, {
        name: "invite",
        description: "Generates an invite link, for adding delet to a server.",
        usage: "invite",
        aliases: ["join"]
      });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        this.client.generateInvite(botPerms).then(link => {
            message.channel.send("<a:loading:456928252502605834> Generating...")
            .then(msg => {
                msg.edit(`Generated invite link for delet:\n**<${link}>**`);
            });
        });
    }
}

module.exports = Invite;