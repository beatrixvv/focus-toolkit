import { useState } from "react";
import YouTube from "react-youtube";

export default function YouTubePlayer() {
  const [playlistId, setPlaylistId] = useState<string | undefined>(
    "PLo3pNg0eiPc8HrbDZQ-8awp7JRoGVdftY"
  );
  const opts = {
    playerVars: {
      listType: "playlist",
      list: playlistId,
      autoplay: 0,
    },
  };

  function extractID(url: string): string | undefined {
    try {
      const parsed = new URL(url);
      const playlist = parsed.searchParams.get("list") ?? undefined;

      return playlist;
    } catch {
      return undefined;
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    const playlistID = extractID(url);
    setPlaylistId(playlistID);
  }

  return (
    <div className="youtube container">
      <div className="content youtube">
        <h2>Play a Playlist</h2>
        <YouTube opts={opts} />
        <input type="url" placeholder="YouTube URL" onChange={handleChange} />
      </div>
    </div>
  );
}
