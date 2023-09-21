FROM node:18

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PORT 3332

# Copy package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install 

# Copying source files
COPY . .

# Instalando o Prisma globalmente
RUN npm install -g prisma

# Defina variáveis de ambiente, se necessário
ENV DATABASE_URL "postgres://alemedinabjj:iLUsYGuD9d4N@ep-sparkling-mud-03643572.us-east-2.aws.neon.tech/neondb"

# Executando a configuração do Prisma (substitua comandos e caminhos reais conforme necessário)
# Certifique-se de que o comando prisma generate e prisma migrate deploy seja executado com base em sua necessidade e configuração.
RUN prisma generate
RUN prisma migrate deploy

# Sua configuração de exposição e inicialização do aplicativo
EXPOSE 3332
CMD [ "npm", "run", "start" ]
