// Messages (strings)
exports.modLogNotFound = "Modlog channel not found. If you're an admin (or owner) on this server, please use:```{{prefix}}set edit modLogChannel [channel-name]```\nFor example: `{{prefix}}set edit modLogChannel cool-channel-name`.";
exports.poweredBy = "Moderation system powered by delet";
exports.error = "An error occurred:\n";
exports.missingPerm = "I cannot run this command as I have insufficient permissions to do so. Please ensure I have the \"{{perm}}\" permission.";
exports.missingPerms = "I cannot run this command as I have insufficient permissions to do so. Please ensure I have the {{perms}} permissions.";

// Arrays
exports.botPerms = [
    "MANAGE_ROLES", 
    "KICK_MEMBERS", 
    "MANAGE_CHANNELS", 
    "BAN_MEMBERS", 
    "VIEW_AUDIT_LOG", 
    "VIEW_CHANNEL", 
    "SEND_TTS_MESSAGES", 
    "EMBED_LINKS", 
    "READ_MESSAGE_HISTORY", 
    "USE_EXTERNAL_EMOJIS", 
    "MANAGE_EMOJIS",
    "SEND_MESSAGES", 
    "MANAGE_MESSAGES",
    "MANAGE_NICKNAMES", 
    "ATTACH_FILES", 
    "ADD_REACTIONS", 
    "CONNECT", 
    "SPEAK", 
    "USE_VAD"
];