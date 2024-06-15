const { SlashCommandBuilder } = require('@discordjs/builders');
const { setupTicketSystem } = require('../../utils/ticketUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Sets up the ticket system'),
  async execute(interaction, client) {
    await setupTicketSystem(interaction, client);
  },
};
