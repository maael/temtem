if (process.env.NODE_ENV !== "production") {
  require("dotenv-extended").load();
}

module.exports = {
  env: {
    REDDIT_OAUTH_ID: process.env.REDDIT_OAUTH_ID,
    REDDIT_OAUTH_SECRET: process.env.REDDIT_OAUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    TEMTEM_FAUNA_SECRET: process.env.TEMTEM_FAUNA_SECRET,
    MOCK_USER_ID: process.env.MOCK_USER_ID,
    ROOT: __dirname
  }
};
