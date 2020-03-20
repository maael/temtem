<img height="100" align="right" src="https://temtem-api.mael.tech/images/portraits/temtem/large/Ganki.png">

# Temtem App

- App
  - https://github.com/maael/temtem
  - https://tem.tools
- Temtem API
  - https://github.com/maael/temtem-api
  - https://temtem-api.mael.tech

## Features

- List Temtem for sale
- Save Temtem listing
- Track your own tempedia of tamed Temtem, and share your progress with others
- Track your quests in Temtem, including what ones you've picked up and what step you're on
- Track your encounters in Temtem, including an automatic tracker that uses screen capture and OCR

## Docs

- [Auth](./docs/AUTH.md)
- [Database](./docs/DATABASE.md)

## Install

```sh
git@github.com:maael/temtem.git
cd temtem
yarn
```

I used `node@10.17.0` to develop it.

## NPM Scripts

| Script           | Description                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `dev`            | Starts the local development server on `http://localhost:3000`, or whatever `PORT` is specified in env. |
| `build`          | Builds server.                                                                                          |
| `start`          | Started built server.                                                                                   |
| `lint`           | Runs [tslint](https://www.npmjs.com/package/tslint) against project.                                    |
| `prettier`       | Runs [prettier](https://www.npmjs.com/package/prettier) against project, writing corrections.           |
| `prettier:check` | Runs [prettier](https://www.npmjs.com/package/prettier) against project, used by CI to check project.   |
| `test`           | ⚠️ TODO ⚠️                                                                                              |

## Config

| Environment Variable  | Description                 |
| --------------------- | --------------------------- |
| `REDDIT_OAUTH_ID`     | OAuth ID for Reddit app     |
| `REDDIT_OAUTH_SECRET` | OAuth Secret for Reddit app |
| `JWT_SECRET`          | Secret to sign JWT with     |

## API Endpoints

| URL                          | What                                         |
| ---------------------------- | -------------------------------------------- |
| `/api/login`                 | Redirects to Reddit to start OAuth flow      |
| `/api/oauth/redirect/reddit` | Reddit redirects here to continue OAuth flow |

## Contributing

- Make sure `prettier` has been run, it should do it as a pre-commit hook thanks to `husky` and `pretty-quick`.

Also fair warning, I made this quick, so while it is Typescript, it's super loose with anys all over the place.

## Todo

- [ ] The rest of the owl.
