<!-- PROJECT INFO -->
<br />
<div align="center">
  <h2 align="center"><b>Git Notes</b></h2>
  <p align="center">
    An easy and better way for managing GitHub Gists
  </p>
</div>

<!-- BUILD STATUS -->
<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/f0115d4a-d284-4a23-b2c0-f3176e5f730e/deploy-status)](https://app.netlify.com/sites/git-notes/deploys)&nbsp;

</div>

## Tech Stack

- React with TypeScript
- Material-UI as component library
- Firebase for authentication
- Redux for state management
- RTK Query for data fetching and caching
- Nx for monorepo tool

## Features

- List Public Gists: Allow users to list recently updated public gists in card and grid view
- Gist Details: Allow users to see a detail view of individual gist
- List User Gists: Allow users to list authenticated user gists
- List User Starred Gists: Allow users to list authenticated user starred gists
- Gist Creation: Allows users to create new gists with multiple files

## Working Demo

![Demo]()

## Code Guidelines

- Code is organzied by features and file types
- Code is co-located by feature as possible for maintainability and ease of use
- Componenets that are used by multiple features are placed in `components` folder
- Using `kebab-case` for folder, file and components naming convention
- Using `camelCase` for function and variable naming

## Run Tasks

To run the dev server for your app, use:

```sh
npx nx serve git-notes
```

To create a production bundle:

```sh
npx nx build git-notes
```

## Project Structure

Overview of the project's directory structure:

```md
├── src
│ ├── app
| ├── assets
| ├── components
| ├── feature
| ├── layouts
| ├── pages
| ├── providers
| ├── redux
| ├── routing
| ├── services
| ├── theme
| ├── utils
| ├── main.tsx
| ├── styles.scss
├── project.json
├── README.md
└── tsconfig.base.json
└── vite.config.ts
```

## Deployment

- Deployed using Netlify
- See env variables from `.env.sample`
