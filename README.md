# 🛡️ Riot Crypto API

A lightweight, hexagonal cryptography API built with NestJS and TypeScript.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Coverage](https://img.shields.io/badge/coverage->90%25-brightgreen.svg)

## 🚀 Features

- **Base64 Encryption** for all depth-1 JSON values
- **HMAC Signatures** with SHA-256/384/512 support
- **Hexagonal Architecture** for easy algorithm replacement
- **Test Coverage > 90%** on all core components
- **Integrated Swagger Documentation**
- **Docker Support** ready out of the box

## 📋 Table of Contents

1. [Features](#-features)
2. [Quick Start](#-quick-start)
3. [Configuration](#️-configuration)
4. [API Reference](#-api-reference)
5. [Architecture](#️-architecture)
6. [Tests & Coverage](#-tests--coverage)
7. [Docker](#-docker)
8. [Roadmap](#-roadmap)

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/XyDisorder/tryriot-take-home-challenge-api.git
cd tryriot-take-home-challenge-api

# Install dependencies
yarn install

# Set up environment
cp .env.example .env 
# Or let the app generate a random secret

# Start development server
yarn start:dev

# Swagger is available at http://localhost:3000/api
```

## ⚙️ Configuration

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `HMAC_SECRET` | `dev-secret` (dev only) | Rejected if less than 32 hex chars |
| `HMAC_ALGO` | `sha256` | Must be `sha256`, `sha384`, or `sha512` |
| `PORT` | `3000` | API listening port |

**.env.example**


```env
HMAC_SECRET=please-change-me-32-bytes-min
HMAC_ALGO=sha256 # sha384 / sha512 also allowed
```
Or let the app generate a random secret

## 📚 API Reference

| Endpoint | Method | Purpose | Success | Error |
|----------|--------|---------|---------|-------|
| `/encrypt` | POST | Base-64 encode each depth-1 JSON value | `200 OK` with | `400` Invalid JSON |
| `/decrypt` | POST | Revert the process - unencoded values stay untouched | `200 OK` | `400` Invalid JSON |
| `/sign` | POST | Sign canonical JSON with **HMAC** (sha256/384/512) | `200 OK` with `{ "signature": "<hex>" }` | `400` Bad JSON |
| `/verify` | POST | Validate `{ signature, data }` | `204 No Content` | `400` Signature mismatch |

### Highlights
- Property order **does not affect** the signature
- 1 MB body limit + validation pipe (`whitelist + forbidUnknown`)
- Secret length check (≥ 32 bytes) + algorithm whitelist
- Swagger UI ready at http://localhost:3000/api

### Examples

### With Swagger UI
![Version](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0E0DUXqgnptEbXRRbneGgdIi6NUbCE--iApXDGMCz8QWsPSPwhkyfSi91J2HUZ-O4vE8&usqp=CAU
)

You can directly use http://localhost:3000/api to test the API thanks to Swagger UI.



#### /encrypt
```bash
curl -X POST localhost:3000/encrypt \
  -H 'Content-Type: application/json' \
  -d '{"name":"John","age":30}'
  
# → { "data": { "name":"Sm9obiBEb2U=" , "age":"MzA=" } }
```

#### /sign ⟷ /verify
```bash
sig=$(curl -sX POST localhost:3000/sign \
  -H content-type:application/json \
  -d '{"message":"Hello","ts":1}' | jq -r .signature)

curl -iX POST localhost:3000/verify \
  -H content-type:application/json \
  -d "{\"signature\":\"$sig\",\"data\":{\"ts\":1,\"message\":\"Hello\"}}"
  
# → HTTP/1.1 204 No Content
```

Full Swagger specification available at `/api-json`.

## 🏗️ Architecture

```
src/
├─ domain/          # pure contracts
│  ├─ ports/        # EncrypterPort, SignerPort
│  └─ shared/       # json.types.ts
├─ application/     # use-cases Encrypt | Decrypt | Sign | Verify
├─ infrastructure/  
│  └─ crypto/       
│     ├─ base64.encrypter.adapter.ts
│     ├─ hmac.signer.adapter.ts
│     └─ json-canonical.ts
└─ interfaces/http/ # controllers + DTOs
```

- **Primary adapters** = HTTP controllers
- **Secondary adapters** = Crypto implementations

Swap algorithms in 30 seconds: `provide: SignerPort → useClass: MyEcdsaAdapter`

## 🧪 Tests & Coverage

```bash
# Unit tests (use-cases + adapters)
yarn test:unit

# E2E tests (Nest boot + supertest)
yarn test:e2e

# All tests + coverage report
yarn test
```

Current coverage > 90% lines on core layers.


## 🔮 Roadmap

- AES-256-GCM adapter (pluggable)
- Drizzle ORM audit-log table
- Prometheus metrics + Grafana dashboard
- Rate-limiter per IP
- Multi-tenant secret rotation via Envoy SDS

---

**Enjoy reviewing!** The project starts with **one command**, is fully tested, and every algorithm is replaceable thanks to a clear hexagonal design.
