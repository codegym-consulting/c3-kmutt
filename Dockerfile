# syntax=docker/dockerfile:1
ARG NODE_IMAGE=oven/bun:1-alpine

# Use the official Bun image for the initial stages
# See all versions at https://hub.docker.com/r/oven/bun/tags
FROM $NODE_IMAGE as base
WORKDIR /usr/src/app

# Install dependencies into a temp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install dependencies without excluding devDependencies
# Since some dependencies might be needed for the build process
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --production --frozen-lockfile

# Copy node_modules from the temp directory
# Then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules /usr/src/app/node_modules
COPY . /usr/src/app

# run the build
ENV NODE_ENV=production
RUN bun --bun run build

# Copy production dependencies and built files into the final image
# Start fresh from the base to reduce the final image size
FROM base AS release
WORKDIR /usr/src/app
COPY --from=install /temp/prod/node_modules /usr/src/app/node_modules
COPY --from=prerelease /usr/src/app/.output /usr/src/app/.output
COPY package.json /usr/src/app/

USER bun
EXPOSE 3000/tcp
ENV HOST=0.0.0.0
ENV NODE_ENV=production

ENTRYPOINT ["sh", "-c", "bun run /usr/src/app/.output/server/index.mjs --host $HOST"]