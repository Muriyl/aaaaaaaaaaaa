const { SlashCommandBuilder } = require('@discordjs/builders');
const { closeTicket } = require('../../utils/ticketUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Closes the ticket'),
  async execute(interaction, client) {
    await closeTicket(interaction, client);
  },
};
