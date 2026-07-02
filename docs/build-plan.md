# Greenery Networks — Build Plan

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion / Motion
- lucide-react
- 21st.dev Magic MCP if available
- Shopify Storefront API for commerce

## 21st.dev Magic Usage Plan

Use Magic later for the following components. Do not generate components yet.

### Components to Use Magic For
- `Hero`
- `FeaturedProducts`
- `ProductCard`
- `FlowerGallery`
- `WhyChooseUs`
- `FAQ`
- `CTASection`
- `Footer`

### Example Prompts to Give Magic Later

- "Premium plant nursery hero section with live flowering plants, warm earthy colors, animated headline, primary CTA 'Browse Flowering Plants', soft floral background, Next.js, Tailwind, Framer Motion"
- "Ecommerce product card for live flowering starter plant, image, name, price $12, Add to Cart, hover lift animation, Tailwind, Framer Motion"
- "FAQ accordion for plant care and shipping, soft green and pink brand colors, animated open/close, accessible"

If Magic is unavailable, build these using shadcn/ui + custom Tailwind + Motion instead.

## Build Phases

### Phase 1: Project Setup

**What files will be created**
- Next.js project structure
- Tailwind config
- Global styles
- Environment config
- Package manifests

**What commands will be run**
- Create Next.js app
- Install Tailwind, shadcn/ui, Framer Motion, lucide-react

**What success looks like**
- Dev server runs
- Tailwind and base UI work

---

### Phase 2: Design System

**What files will be created**
- Color tokens
- Typography styles
- Button, card, and container components
- NavBar and Footer

**What commands will be run**
- Add shadcn components as needed

**What success looks like**
- Design system is consistent and reusable
- NavBar and Footer look premium

---

### Phase 3: Homepage

**What files will be created**
- Hero
- TrustStrip
- FeaturedProducts
- WhyChooseUs
- StorySection
- BlogPreview
- FAQ
- CTASection

**What commands will be run**
- Dev and review

**What success looks like**
- Premium animated homepage
- Clear CTAs and mobile responsiveness

---

### Phase 4: Product Data and Photos

**What files will be created**
- Product data files or seed data
- Image assets

**What commands will be run**
- Add product data and images

**What success looks like**
- Real product data and images are ready

---

### Phase 5: Shop and Product Pages

**What files will be created**
- `/shop` page
- `/products/[slug]` template
- ProductCard and ProductDetail components

**What commands will be run**
- Dev and review

**What success looks like**
- Browse and view products smoothly
- Add to Cart works if Shopify connected

---

### Phase 6: Blog, FAQ, and Policies

**What files will be created**
- Blog index and detail pages
- FAQ page
- Shipping, Privacy, Terms pages

**What commands will be run**
- Dev and review

**What success looks like**
- Content pages are complete and accurate

---

### Phase 7: Shopify Connection

**What files will be created**
- Shopify Storefront API integration
- Cart and checkout flow

**What commands will be run**
- Connect and test

**What success looks like**
- Products, cart, and checkout work end to end

---

### Phase 8: QA and Testing

**What files will be created**
- Final QA checklist and fixes

**What commands will be run**
- Lint, build, and test

**What success looks like**
- No build errors
- Mobile, accessibility, and performance checks pass

---

### Phase 9: Launch

**What files will be created**
- Final production config

**What commands will be run**
- Deploy to Vercel or chosen host
- Connect domain

**What success looks like**
- Site is live and converting

## Rules

- Do not code yet
- Do not edit files yet
- Do not install packages yet
- Do not connect Shopify yet
- Do not deploy production
- No personal names
- No fake testimonials
- Every plant is $12
- Initial stock is 5 per plant
- Shipping is USPS within USA only
- Actual USPS shipping cost is added to shipment
- Brand vibe: earthy, professional, warm
- Colors: white, light green, light blue, pink
- Goal: visitors browse flowering plants and buy
- Follow `~/.claude/awesomedesign.md` for all UI
