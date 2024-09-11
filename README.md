# REVENT APP

**This README will get you started and guide you through the project**

## Description

Photo contest APP is a Next.js app for the Runtime Revolution photo contest that takes place every month and aims to allow a fair and easy voting for all participants.
It works with the Photo contest API.

## Table of Contents

- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Setup](#setup)
  - [Env](#env)
  - [Node](#node)
  - [Scripts](#scripts)

## Setup

### Env

Copy .env.local.sample to .env.local

```bash
cp .env.local.sample .env.local
```

### Pre-commit

# TODO

### Node

Install nvm

```bash
brew install nvm

echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"' >> ~/.zshrc
```

Install the projects node version

```bash
nvm install
nvm use
```

### Scripts

The basic npm scripts for a next.js app:

```bash
npm install # Install dependencies
npm run dev # Run next.js in development mode
npm run test # Run the tests
npm run build # Generate production build
npm run start # Run the app in production mode (requires build 1st)
```
