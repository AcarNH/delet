const Command = require("../../base/Command.js");
const { promisify } = require("util");
const writeSnapshot = promisify(require("heapdump").writeSnapshot);

class HeapDump extends Command {
  constructor(client) {
    super(client, {
      name: "heapdump",
      description: "Writes a memory snapshot file (useful for debugging memory leaks, etc).",
      category: "Debug",
      usage: "heapdump",
      aliases: ["sysdump", "dump"],
      permLevel: "Bot Owner"
    });
  }

  async run(message, args, level, settings, texts) { // eslint-disable-line no-unused-vars
    try {
        const fileName = await writeSnapshot(`./${Date.now()}.heapsnapshot`);
        message.channel.send(`Created new heap-dump @ \`${fileName}\`.`);
    } catch (e) {
        this.client.logger.error(e.stack);
        return message.channel.send(texts.general.error.replace(/{{err}}/g, e.message));
    }
  }
}

module.exports = HeapDump;
