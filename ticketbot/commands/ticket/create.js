const { SlashCommandBuilder } = require('@discordjs/builders');
const { createTicket } = require('../../utils/ticketUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Creates a new ticket'),
  async execute(interaction, client) {
    await createTicket(interaction, client);
  },
};
