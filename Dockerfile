# Usa a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências necessárias para bcrypt e Prisma
RUN apk add --no-cache python3 make g++ 

# Copia package.json e package-lock.json
COPY package.json package-lock.json ./

# Instala as dependências (excluindo bcrypt e recompilando depois)
RUN npm install && npm rebuild bcrypt --build-from-source

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
