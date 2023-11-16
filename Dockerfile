FROM node:20.9.0-alpine3.17@sha256:c049e006a20730f3d2536a8551c2e4ad74a397fdce707f2b79c353837f142d5c AS builder
WORKDIR /app
RUN [ "yarn", "set", "version", "1.22.17" ]
COPY .yarn ./.yarn
COPY /src ./src
COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install
RUN yarn build

# 'yarn install --production' does not prune test packages which are necessary
# to build the app. So delete nod_modules and reinstall only production packages.
RUN [ "rm", "-rf", "node_modules" ]
RUN yarn install --production

FROM node:20.9.0-alpine3.17@sha256:c049e006a20730f3d2536a8551c2e4ad74a397fdce707f2b79c353837f142d5c AS final
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN ["apk", "--no-cache", "upgrade"]
RUN ["apk", "add", "--no-cache", "tini"]
RUN ["yarn", "set", "version", "1.22.17" ]
USER appuser:appgroup

WORKDIR /app
# Copy in compile assets and deps from build container
COPY --chown=appuser:appgroup  --from=builder /app/node_modules ./node_modules
COPY --chown=appuser:appgroup  --from=builder /app/dist ./dist
COPY --chown=appuser:appgroup  --from=builder /app/src ./src
COPY --chown=appuser:appgroup  --from=builder /app/package.json ./
COPY --chown=appuser:appgroup  --from=builder /app/yarn.lock ./

ENV PORT 8080
EXPOSE 8080

ENTRYPOINT ["tini", "--"]

CMD ["yarn", "start"]
