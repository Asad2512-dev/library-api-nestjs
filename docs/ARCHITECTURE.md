# Architecture

## What this is

LibraryPro API. LibraryPro API is a production-ready, fellowship-grade Library Management REST API engineered using NestJS, MongoDB, and TypeScript. Designed with clean modular architecture, security best practices, and granular Role-Based Access Control (RBAC), it provides a robust infrastructure to manage libraries, catalogue records, handle book acquisitions, track real-time borrowing logs, automatically calculate overdue fines, and display dynamic library dashboards. The repository is a NestJS application.

## Layout

- `src/` — `app.module.ts`, `common`, `config`, `main.ts`, `modules`
- `test/`
- Tooling: `.env.example`, `.prettierrc`
- Root files: `docker-compose.yml`, `Dockerfile`, `eslint.config.mjs`, `nest-cli.json`, `package.json`, `pnpm-lock.yaml`, `README.md`, `tsconfig.build.json`, `tsconfig.json`

## How the pieces fit

NestJS service: `nest-cli.json` and `package.json` are at the root. `src/` contains `app.module.ts`, `common`, `config`, `main.ts`, `modules`. `docker-compose.yml` names images `mongo:8.0`.

## How to run

Scripts in the root `package.json`:

- `build` — `nest build`
- `start` — `nest start`
- `lint` — `eslint "{src,apps,libs,test}/**/*.ts" --fix`
- `test` — `jest`

## External services named in the repo

- MongoDB — `mongoose` in package.json
