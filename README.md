# API de Planos Internacionais

Este projeto é parte de um desafio técnico que implementa uma API para gerenciamento de planos internacionais, assinaturas, pagamentos e envio de faturas por e-mail.

## Tecnologias
- **NestJS** + **TypeScript**
- **PostgreSQL** + **Prisma ORM**
- **JWT** para autenticação
- **Stripe** para pagamentos
- **Nodemailer** para envio de e-mails

### Instalar dependências:

```bash
npm install
```

ou

```bash
yarn
```

### Configurar variáveis de ambiente no arquivo .env:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/planos_internacionais?schema=public"
JWT_SECRET="sua-chave-secreta"
STRIPE_SECRET_KEY="sua-chave-de-teste-stripe"
```

### Criar/atualizar o banco com Prisma:

```bash
npx prisma migrate dev --name init
```

(Opcional: `npx prisma studio` para visualizar as tabelas.)

### Iniciar a aplicação em modo desenvolvimento:

```bash
npm run start:dev
```

A API estará disponível em http://localhost:3000.

## Principais Rotas

### Autenticação:
- **POST** `/auth/register` → Cria novo usuário
- **POST** `/auth/login` → Gera token JWT

### Planos:
- **POST** `/plans` *(admin)*
- **GET** `/plans`
- **GET** `/plans/:id`
- **DELETE** `/plans/:id` *(admin)*

### Assinaturas:
- **POST** `/subscriptions`
- **GET** `/subscriptions/:id`
- **DELETE** `/subscriptions/:id`

### Pagamentos:
- **POST** `/payments`
- **GET** `/payments/:id`
- **POST** `/webhooks/stripe`

### Faturas:
- **GET** `/invoices/:id`
- **GET** `/invoices/user/:userId`
- **POST** `/invoices/send/:id`

## Observações
- Rotas marcadas como *(admin)* exigem usuário com `role = 'admin'`.
- Para rotas autenticadas, inclua `Authorization: Bearer <token>` no header.
- Integração com **Stripe** requer uma chave de teste configurada no `.env`.

