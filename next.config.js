if (process.env.NODE_ENV !== "production") {
  require("dotenv-extended").load();
}

module.exports = {
  env: {
    REDDIT_OAUTH_ID: process.env.REDDIT_OAUTH_ID,
    REDDIT_OAUTH_SECRET: process.env.REDDIT_OAUTH_SECRET,
    OAUTH_REDIRECT_ORIGIN:
      process.env.NODE_ENV === "production"
        ? "https://tem.tools"
        : "http://localhost:3000",
    DISCORD_OAUTH_ID: process.env.DISCORD_OAUTH_ID,
    DISCORD_OAUTH_SECRET: process.env.DISCORD_OAUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    TEMTEM_FAUNA_SECRET: process.env.TEMTEM_FAUNA_SECRET,
    MOCK_USER_ID: process.env.MOCK_USER_ID,
    OAUTH_STATE: process.env.OAUTH_STATE,
    STEAM_KEY: process.env.STEAM_KEY,
    FATHOM_SITE_ID: process.env.FATHOM_SITE_ID,
    ROOT: __dirname
  }
};
