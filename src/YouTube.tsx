import { useState, useEffect } from "react";
import YouTube from "react-youtube";

export default function YouTubePlayer() {
  const [playlistId, setPlaylistId] = useState<string | undefined>(
    "PLo3pNg0eiPc8HrbDZQ-8awp7JRoGVdftY"
  );
  const [videoId, setVideoId] = useState<string | undefined>(undefined);
  const [opts, setOpts] = useState({
    playerVars: playlistId
      ? {
          listType: "playlist",
          list: playlistId,
          autoplay: 0,
        }
      : videoId
      ? {
          autoplay: 0,
        }
      : {},
  });

  useEffect(() => {
    if (playlistId && !videoId) {
      const newOpts = {
        playerVars: {
          listType: "playlist",
          list: playlistId,
          autoplay: 0,
        },
      };
      setOpts(newOpts);
    } else if (playlistId && videoId) {
      const newOpts = {
        playerVars: {
          listType: "playlist",
          list: playlistId,
          autoplay: 0,
        },
      };
      setOpts(newOpts);
    } else if (!playlistId && videoId) {
      const newOpts = {
        playerVars: {
          autoplay: 0,
        },
      };
      setOpts(newOpts);
    } else {
      setOpts({ playerVars: {} });
    }
  }, [videoId, playlistId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    try {
      const parsed = new URL(url);
      const playlistID = parsed.searchParams.get("list") ?? undefined;
      const videoID = parsed.searchParams.get("v") ?? undefined;

      setPlaylistId(playlistID);
      setVideoId(videoID);
    } catch (error) {
      console.error("Invalid URL", error);
      return;
    }
  }

  return (
    <div className="youtube container">
      <div className="content youtube">
        <h2>Play a Playlist</h2>
        <YouTube videoId={videoId} opts={opts} />
        <input type="url" placeholder="YouTube URL" onChange={handleChange} />
      </div>
    </div>
  );
}
