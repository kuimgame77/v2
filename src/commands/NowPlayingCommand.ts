import { DefineCommand } from "../utils/decorators/DefineCommand";
import { isMusicPlaying } from "../utils/decorators/MusicHelper";
import { BaseCommand } from "../structures/BaseCommand";
import { createEmbed } from "../utils/createEmbed";
import { IMessage } from "../../typings";

@DefineCommand({
    aliases: ["wlrma"],
    description: "지금 틀고 있는 노래를 알려드립니다",
    name: "지금",
    usage: "{prefix}지금"
})
export class NowPlayingCommand extends BaseCommand {
    @isMusicPlaying()
    public execute(message: IMessage): any {
        const song = message.guild?.queue?.songs.first();
        return message.channel.send(
            createEmbed("info", `${message.guild?.queue?.playing ? "▶ **|** 재생:" : "⏸ **|** 재생:"} ` +
                `**[${song?.title as string}](${song?.url as string})**`)
                .setThumbnail(song?.thumbnail as string)
        );
    }
}
