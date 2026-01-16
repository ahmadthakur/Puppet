// musicManager removed: simplified bot does not include music features.
module.exports = {
  /*
    The music manager was removed to simplify the bot. If any code
    still attempts to use music features, this stub will throw to
    make the missing dependency obvious during runtime.
  */
  _missing() {
    throw new Error("Music subsystem removed: musicManager is not available.");
  }
};
