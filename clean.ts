import { DefineCommand } from "../utils/decorators/DefineCommand";
import { BaseCommand } from "../structures/BaseCommand";
import { createEmbed } from "../utils/createEmbed";
import { IMessage } from "../../typings";

@DefineCommand({
    aliases: ["clean"],
    description: "Deletes a specified number of messages from the channel.",
    name: "clean",
    usage: "{prefix}clean <amount>"
})
export class CleanCommand extends BaseCommand {
    public async execute(message: IMessage, args: string[]): Promise<void> {
        if (!message.member?.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(createEmbed("error", "You don't have permission to use this command")).catch(e => this.client.logger.error("CLEAN_CMD_ERR:", e));
            return;
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0 || amount > 100) {
            message.channel.send(createEmbed("error", "Please provide a valid number between 1 and 100")).catch(e => this.client.logger.error("CLEAN_CMD_ERR:", e));
            return;
        }

        await message.channel.bulkDelete(amount + 1, true);
    }
}
