# Greenery Networks

A garden-inspired e-commerce website for live flowering plants, built with a focus on straightforward shopping and a polished, welcoming visual experience.

> **Project:** Private storefront codebase. A deployed website or UI does not, by itself, confirm that inventory, payment processing, and shipping are production-ready.

## Project goals

- Present flowering plants with useful product details and an approachable shopping experience.
- Design for mobile and desktop browsing.
- Support a small, manageable inventory and fulfillment workflow.
- Account for the special constraints of shipping live plants.

## Technology

- Next.js 16, React 19, TypeScript, Tailwind CSS
- GSAP and Lenis for interface motion
- React Three Fiber / Three.js for selective visual experiences

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run check
```

The check script runs type checking, linting, and a production build. Operational setup for stock management, shipping labels, checkout, and order handling should be confirmed before accepting live orders.

## Notes

This repository stays private. Do not commit secrets, customer data, payment credentials, or inventory exports. For a real storefront deployment, verify checkout, shipping coverage, plant packaging, and mobile checkout end to end.
