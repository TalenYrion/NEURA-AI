# Neura AI - Real-Time SEO & Content Generator

Neura AI is a high-speed, production-grade SaaS application designed to generate optimized SEO content dynamically. Built with a decoupled architecture, it leverages a Next.js App Router frontend for a responsive layout and a robust NestJS backend to handle secure LLM orchestration, live streaming events, and token credit tracking.

### [Launch Live Interactive Demo](https://neura-ai-iota.vercel.app/)

---

## Tech Stack & Architecture

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Vercel AI SDK
* **Backend:** NestJS, TypeScript
* **AI Provider:** Groq SDK (Llama 3 inference models)
* **Database & Caching:** PostgreSQL, Prisma ORM, Redis (for token/rate tracking)
* **Data Streaming:** Server-Sent Events (SSE) / Fetch API Streams

---

## Key Engineering Features

### 1. Ultra-Low Latency AI Streaming (Groq & Llama)
* Implemented real-time text generation utilizing **Groq's hardware-accelerated inference**.
* Integrated Server-Sent Events (SSE) to deliver text chunks to the Next.js client token-by-token as they generate, cutting down Time-To-First-Token (TTFT) to milliseconds and matching a modern ChatGPT-style typing UX.

### 2. Live Token Consumption Tracking
* Developed custom backend intercepts that calculate exactly how many input/output tokens were consumed during each SEO generation window.
* Seamlessly binds token depletion logs back to the user's relational database record, refreshing the UI credit state immediately after the stream closes.

### 3. High-Performance Rate Limiting & Protection
* Configured **Redis-backed rate limiting middleware** to prevent API spamming and secure expensive AI orchestration loops.
* Ensures individual user boundaries are strictly maintained across server restarts by utilizing fast-access database lookups for credit allowances.

### 4. Semantic SEO Keyword Builder
* Implemented customized system prompting rules within the backend controllers to guarantee generated outputs strictly format meta descriptions, header structures, and target keyword optimization maps natively.

---

## Core Database Models

Relational layout engineered inside **PostgreSQL** using Prisma for complete type-safety:
* `User`: Manages authentication states, secure profiles, and real-time available token balances.
* `Generation`: Caches the historical markdown payloads, keyword goals, and creation timestamps for instant user dashboard retrieval.
* `TokenLog`: Maintains an immutable audit trail of system usage, calculating billing or quota adjustments on every AI transaction.

---

## 💬 Let's Build

If you are looking to build a blazing-fast generative AI tool, integrate LLMs into your current platform, or manage complex real-time data streaming architectures, reach out to discuss your project scope.
