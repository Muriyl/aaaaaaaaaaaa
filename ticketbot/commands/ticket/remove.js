const { SlashCommandBuilder } = require('@discordjs/builders');
const { removeMemberFromTicket } = require('../../utils/ticketUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Removes a member from the ticket')
    .addUserOption(option => option.setName('user').setDescription('User to remove').setRequired(true)),
  async execute(interaction, client) {
    await removeMemberFromTicket(interaction, client);
  },
};
