# Greenery Networks — Shopify Plan

## Commerce Overview

Greenery Networks will sell live flowering starter plants in 4-inch pots. Each plant is $12. Initial stock is 5 per plant. The business is online-only and ships within the USA through USPS. Actual USPS shipping cost is added to the order. There is no free shipping and no discounts right now.

## Recommended Setup

### Hybrid Approach
Use Shopify as the backend for products, inventory, and checkout, and build the frontend as a premium Next.js site using the Shopify Storefront API.

Why hybrid:
- Full design control and premium UX
- Shopify's reliable ecommerce engine for products, inventory, and checkout
- Best fit for a vivid, animated, high-converting site

### Alternative
If speed-to-launch is more important than full custom UX, use a premium Shopify theme and customize it heavily.

## Product Structure

- Each plant is a separate product
- One variant only: 4-inch pot
- Price: $12
- Inventory: 5 units per product initially
- SKU pattern: `GN-[PLANT-CODE]-4IN`

## Collection Structure

### Main Collection
- "Flowering Plants"

### Optional Collections
- "Best Sellers"
- "New Arrivals"
- "Colorful Blooms"
- "Perennial Favorites"
- "Easy Care"

## Product Title Format

"[Plant Name] – Live Flowering Starter Plant (4-inch pot)"

Example:
- "Purple Lantana – Live Flowering Starter Plant (4-inch pot)"

## Product Description Format

Use a consistent template:

1. Short intro paragraph
   - What the plant is
   - Why it is beautiful

2. What to expect when it arrives
   - Live plant in 4-inch pot
   - Ready to grow

3. USDA zone info
   - Zone 9 and above unless otherwise specified

4. Care summary
   - Light
   - Water
   - Fertilizer

5. Shipping note
   - Live plant shipped via USPS
   - Actual shipping cost added
   - USA only

## Product Image Rules

- At least 3 images per product
  1. Main product photo on white or neutral background
  2. Lifestyle photo in garden or pot
  3. Close-up of flower or leaves
- Consistent aspect ratio
- Warm, natural lighting
- No fake stock look

## Inventory Setup

- Quantity: 5 per product initially
- Track inventory in Shopify
- Allow backorders only if explicitly approved; otherwise sell only in-stock

## Pricing

- $12 each
- No discounts right now
- No automatic sales or fake strikethrough pricing

## Shipping Rule

- USPS only
- USA only
- Actual USPS shipping cost added at checkout
- No free shipping
- Clearly stated on product pages, cart, and policy pages

## Checkout Flow

- Use Shopify-hosted checkout or headless Storefront API checkout
- Keep checkout simple and fast
- Show shipping cost clearly before purchase
- No surprise fees

## Taxonomy and Tags

Use product tags for:
- color
- zone
- sun requirement
- water needs
- perennial vs annual
- collection membership

## Policy Pages Needed

- Shipping Policy
- Privacy Policy
- Terms of Service
- Return / Refund Policy if any

## Content Needed Before Shopify Setup

- Exact plant names and product list
- Product photos for each plant
- Any specific care details per plant beyond the general FAQ
- Shopify account status and store access
- Exact USPS shipping service priority/rules if any preference
