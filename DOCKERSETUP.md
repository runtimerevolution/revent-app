
## Dockerfile setup

```shell
FROM node:16-alpine AS deps
```

Installs dependencies only when needed.

```shell
RUN apk add --no-cache libc6-compat
```

To add the missing shared libraries to your image, adding the libc6-compat package in your Dockerfile is recommended.

```shell
WORKDIR /app
```

Set the working directory to /app

```shell
COPY package.json package-lock.json ./ 
```

Copies the `package.json` and `package-lock.json`.

```shell
RUN npm ci
```

Installs all the exact version dependencies or devDependencies from a `package-lock.json` file

```shell
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
```

Rebuilds the source code only when needed

```shell
RUN npm run build
```

Creates a build directory with a production build of your app

```shell
FROM node:16-alpine AS runner
WORKDIR /app
```

Production image, copy all the files and run next

```shell
ENV NODE_ENV production
```

Specifies the environment in which the application is running (usually, development or production)

```shell
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
```

Creates a group and an user

```shell
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
```

Copies the app public folder and `package.json` file

```shell
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
```

Automatically leverage output traces to reduce image size

```shell
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

Sets up the USER and EXPOSE variables.

```shell
CMD ["node", "server.js"]
```

Runs your app using `node server.js`.
