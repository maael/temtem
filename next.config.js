if (process.env.NODE_ENV !== "production") {
  require("dotenv-extended").load();
}

module.exports = {
  env: {
    REDDIT_OAUTH_ID: process.env.REDDIT_OAUTH_ID,
    REDDIT_OAUTH_SECRET: process.env.REDDIT_OAUTH_SECRET,
    REDDIT_OAUTH_REDIRECT_ORIGIN:
      process.env.NODE_ENV === "production"
        ? "https://tem.tools"
        : "http://localhost:3000",
    JWT_SECRET: process.env.JWT_SECRET,
    TEMTEM_FAUNA_SECRET: process.env.TEMTEM_FAUNA_SECRET,
    MOCK_USER_ID: process.env.MOCK_USER_ID,
    OAUTH_STATE: process.env.OAUTH_STATE,
    ROOT: __dirname
  }
};
