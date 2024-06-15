const fs = require('fs');
const path = require('path');
const { logChannel } = require('../config.json');

function logTicketAction(client, action, user, channel, targetUser = null) {
  const logEntry = {
    action,
    user: user.tag,
    channel: channel.name,
    targetUser: targetUser ? targetUser.tag : null,
    timestamp: new Date().toISOString()
  };

  const logFilePath = path.join(__dirname, '../logs/tickets.json');
  let logs = [];

  if (fs.existsSync(logFilePath)) {
    const logFileContent = fs.readFileSync(logFilePath, 'utf-8');
    logs = JSON.parse(logFileContent);
  }

  logs.push(logEntry);
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));

  const logChannelObj = client.channels.cache.find(c => c.name === logChannel && c.type === 'GUILD_TEXT');
  if (logChannelObj) {
    logChannelObj.send(`**Action:** ${action}\n**User:** ${user.tag}\n**Channel:** ${channel.name}\n**Target User:** ${targetUser ? targetUser.tag : 'N/A'}\n**Timestamp:** ${logEntry.timestamp}`);
  }
}

module.exports = { logTicketAction };
