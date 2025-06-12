# Landing Page Builder - Project Instructions

## Project Overview
A micro-SaaS platform that enables users to create custom landing pages through a drag-and-drop interface. The platform supports multiple languages (English/Arabic) and currencies, with a focus on e-commerce landing pages.

## Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand (for drag-and-drop state)
- **Authentication**: NextAuth.js
- **Database**: Prisma with PostgreSQL
- **Email Service**: Resend (for email verification)
- **Payment Processing**: Stripe (for subscription plans)
- **File Storage**: AWS S3 (for product images)
- **Drag and Drop**: react-beautiful-dnd

## Project Structure
```
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── verify-email/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── orders/
│   │   ├── products/
│   │   ├── landing-pages/
│   │   ├── analytics/
│   │   └── settings/
│   ├── (landing)/
│   │   └── [store]/
│   └── (marketing)/
│       └── page.tsx
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── landing-page/
│   └── shared/
├── lib/
│   ├── auth/
│   ├── db/
│   └── utils/
└── prisma/
    └── schema.prisma
```

## Development Phases

### Phase 1: Marketing Site & Authentication
1. **Homepage Development**
   - Responsive navigation menu
   - Hero section
   - Features section
   - Pricing section
   - Footer

2. **Authentication System**
   - Login page
   - Registration page
   - Email verification
   - Password reset functionality

### Phase 2: User Onboarding
1. **Store Setup Form**
   - Store name (subdomain) validation
   - Full name input
   - Language selection (English/Arabic)
   - Currency selection with support for:
     - USD (دولار أمريكي)
     - MAD (درهم مغربي)
     - EUR (يورو)
     - SAR (ريال سعودي)
     - KWD (دينار كويتي)
     - AED (درهم إماراتي)
     - BHD (دينار بحريني)
     - JOD (دينار أردني)
     - QAR (ريال قطري)
     - OMR (ريال عُماني)

2. **Subscription Plans**
   - Free plan features
   - Pro plan features
   - Stripe integration
   - Plan upgrade/downgrade functionality

### Phase 3: Dashboard Development
1. **Layout Components**
   - Left sidebar navigation
   - Top bar with:
     - Balance display
     - Current plan indicator
     - Profile dropdown menu

2. **Dashboard Sections**
   - Dashboard overview
   - Orders management
   - Product management
   - Landing pages management
   - Analytics
   - Store settings
   - Account settings

### Phase 4: Landing Page Builder
1. **Page Creation Flow**
   - Product selection
   - Language selection
   - Page name and title

2. **Builder Interface**
   - Drag-and-drop functionality
   - Component sidebar
   - Preview mode
   - Save/publish functionality

3. **Available Components**
   - Responsive top bar
   - Hero section
   - Product section
     - Image gallery
     - Title
     - Price
     - Description
     - CTA button
   - Contact form
     - Customizable inputs
     - Button text
     - Form styling
   - Variety sections (1-4 divs)
   - Additional components as needed

### Phase 5: Store Management
1. **Product Management**
   - Product listing
   - Image upload
   - Price management
   - Inventory tracking

2. **Order Management**
   - Order tracking
   - Payment processing
   - Order history

3. **Analytics**
   - Page views
   - Conversion rates
   - Sales data

## Database Schema (Initial)
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  password      String
  emailVerified DateTime?
  store         Store?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Store {
  id        String   @id @default(cuid())
  name      String   @unique
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  language  String   @default("en")
  currency  String   @default("USD")
  plan      String   @default("free")
  products  Product[]
  pages     Page[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          String   @id @default(cuid())
  storeId     String
  store       Store    @relation(fields: [storeId], references: [id])
  name        String
  description String
  price       Float
  images      String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Page {
  id        String   @id @default(cuid())
  storeId   String
  store     Store    @relation(fields: [storeId], references: [id])
  name      String
  title     String
  content   Json
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Next Steps
1. Set up the project with Next.js and required dependencies
2. Implement the marketing site homepage
3. Set up authentication system
4. Begin dashboard development
5. Implement the landing page builder

## Notes
- All components should be responsive
- Support RTL for Arabic language
- Implement proper error handling
- Add loading states
- Ensure proper SEO optimization
- Implement proper security measures
- Add proper validation for all forms
- Implement proper testing 