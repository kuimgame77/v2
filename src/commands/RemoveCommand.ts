import { isMusicPlaying, isSameVoiceChannel, isUserInTheVoiceChannel } from "../utils/decorators/MusicHelper";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { BaseCommand } from "../structures/BaseCommand";
import { createEmbed } from "../utils/createEmbed";
import { IMessage } from "../../typings";

@DefineCommand({
    aliases: ["wprj"],
    description: "목록에 있는 노래를 제거 합니다.",
    name: "제거",
    usage: "{prefix}제거 <노래 목록에 있는 숫자>"
})
export class RemoveCommand extends BaseCommand {
    @isMusicPlaying()
    @isUserInTheVoiceChannel()
    @isSameVoiceChannel()
    public execute(message: IMessage, args: string[]): any {
        if (isNaN(Number(args[0]))) return message.channel.send(createEmbed("error", `Invalid usage, use **\`${this.client.config.prefix}help ${this.meta.name}\`** for more information`));

        const songs = message.guild!.queue!.songs.map(s => s);
        const currentSong = message.guild!.queue!.songs.first()!;
        const song = songs[Number(args[0]) - 1];

        if (currentSong.id === song.id) {
            message.guild!.queue!.playing = true;
            message.guild?.queue?.connection?.dispatcher.once("speaking", () => message.guild?.queue?.connection?.dispatcher.end());
            message.guild!.queue?.connection?.dispatcher.resume();
        } else {
            message.guild?.queue?.songs.delete(message.guild.queue.songs.findKey(x => x.id === song.id)!);
        }

        message.channel.send(
            createEmbed("info", `✅ 제거됨 **[${song.title}](${song.url}})**`)
                .setThumbnail(song.thumbnail)
        ).catch(e => this.client.logger.error("REMOVE_COMMAND_ERR:", e));
    }
}
