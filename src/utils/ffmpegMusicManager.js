// FFmpegMusicManager removed: this repository's simplified robot no longer
// includes voice or music playback functionality. Export a stub that
// surfaces a clear error if any remaining code attempts to use it.
module.exports = {
  _missing() {
    throw new Error("FFmpeg music subsystem removed: ffmpegMusicManager is not available.");
  }
};
