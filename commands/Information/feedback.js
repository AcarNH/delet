const Command = require("../../base/Command.js");
const delet = require("../../package.json");
const { stripIndents } = require("common-tags");

class Feedback extends Command {
    constructor(client) {
      super(client, {
        name: "feedback",
        description: "Sends the link to the \"Suggestions & Feedback\" Typeform.",
        category: "Information",
        usage: "feedback",
        aliases: ["suggestion", "suggestions", "suggest"]
      });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        const suggest = "<https://delet.js.org/suggest>";
        const issues = `<${delet.bugs.url}>`;

        message.channel.send(stripIndents`
        Want to suggest something, or give feedback? Encountering any bugs/issues?

        **Suggestions & feedback**: ${suggest}.
        **Bugs/issues**: ${issues}.`);
    }
}

module.exports = Feedback;
