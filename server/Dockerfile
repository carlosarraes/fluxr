FROM node:16-alpine
WORKDIR /app
ARG DATABASE_URL
ARG JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY prisma ./prisma
RUN pnpx prisma generate
COPY . .
RUN pnpm run build
EXPOSE 8080
CMD [ "pnpm", "run", "start:prod" ]
