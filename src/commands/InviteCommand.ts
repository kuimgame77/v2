import { DefineCommand } from "../utils/decorators/DefineCommand";
import { BaseCommand } from "../structures/BaseCommand";
import { createEmbed } from "../utils/createEmbed";
import { disableInviteCmd } from "../config";
import { IMessage } from "../../typings";

@DefineCommand({
    aliases: ["cheo", "초대"],
    description: "초대 링크 보내기",
    disable: disableInviteCmd,
    name: "invite",
    usage: "{prefix}invite"
})
export class InviteCommand extends BaseCommand {
    public async execute(message: IMessage): Promise<void> {
        message.channel.send(
            createEmbed("info")
                .addField(`${this.client.user!.tag} - 초대 링크`, `**[랑크](${await this.client.generateInvite({ permissions: 53857345 })})**`)
        ).catch(e => this.client.logger.error("PLAY_CMD_ERR:", e));
    }
}
