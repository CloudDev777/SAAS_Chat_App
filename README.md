This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Portfolio SaaS Chat App

Welcome to the Portfolio SaaS Chat App, a versatile chat application built with cutting-edge technology. Experience the seamless integration of various technologies in one platform. Check it out here: [Portfolio SaaS Chat App](https://portfolio-saas-chat-app.vercel.app/).

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [NextAuth.js](https://next-auth.js.org/)
- [Firebase](https://firebase.google.com/)
  - Extension: [Translate Text in Firebase](#) <!-- Replace # with the link -->
  - Extension: [Run Payments with Stripe in Firebase](#) <!-- Replace # with the link -->
- [Stripe](https://stripe.com/)
- [Zod](https://github.com/colinhacks/zod)
- [TypeScript](https://www.typescriptlang.org/)

## Features

### Free Tier

- **Google Account Login**: Secure and easy login using your Google account.
- **Chat Rooms**: Create up to 3 chat rooms.
- **Message Limit**: Each chat room supports 20 messages.
- **Room Members**: Include up to 2 members per chat room (including the creator).
- **Language Translation**: Translate chat messages between 2 languages.

### Paid Tier (5.99 EUR)

- **Unlimited Messages**: No limit on the number of messages in chats.
- **Unlimited Participants**: Add as many participants as you like in chat rooms.
- **Unlimited Chat Rooms**: Create as many chat rooms as needed.
- **Extended Language Support**: Supports up to 10 languages.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Setting Up the Application: A Guide for Personal Reference 😃

This is a step-by-step guide to setting up a web application using NextJS 13. It includes features like Stripe payments, dark & light modes, and more like stripe portal links, stripe webhooks, shadcn, tailwind css, firebase v9, firebase rules, next auth with google provider, zod for form authentication, zustand for global state management, dark & light mode, protected routes, free tier features & paid tier features

- First we install NextJS 13 via the cli for the project
- We first create `<Header />` component
- We then install `shadcn-ui` for components
- Add logo in header, ensure that dark:filter is set for inverse colors in Header component
- Add `<DarkModeToggle>` and dark mode from `shadcn-ui` follow the docs there in the library (It's all about taking smart decisions, not re-inventing the wheel)
  - <b>Note to self:</b> Make smart decisions, get quickly to PMF
- Add `<UserButton />` and add `<UserAvatar />`
- Add `next-auth` for authentication, follow the documentation for providers & adapters
  - create a firebase project for web
  - in your `auth.ts` file, make sure add adapters, providers, callbacks to access firebase user.id for user authentication
- Add `middleware.ts` for protected routes with `next-auth`
- Add `<ClientProvider />` to ensure `session` is available everywhere in your <b>client side</b> application 
- Add `NEXTAUTH_URL, NEXTAUTH_SECRET` in your .env file (when deploying on vercel you don't have to pass `NEXTAUTH_URL` it will take care of that on it's own)
- Note: for any click handlers, the component will always be a <b>client component by using "use client"</b>
- Go to google console, select the project
  - In the google console, add URL to whitelist localhost (& later your production URL) for authentication
- Set up `<Home />` i.e, `app/page.tsx` along with main layout i.e, `app/layout.tsx`
- Add `<Pricing>` i.e, `app/pricing/page.tsx` file
  - Make a `PricingCard` component, in a way where you can also use this in the `/register` (protected route) page as well
  - Thing to notice in the `PricingCard` component is that we need to add a stripe product price ID, this is very important because it will tell us the role of the user i.e, `pro` & etc
- Add `/register` page
- Add `<Checkout />` button component
  - On button click, it will push a document to the firestore db, stripe extension will then create a checkout session & redirect the user to checkout page
- IMPORTANT: Add `firebase.ts` file 
  - Go on firebase console & generate keys for your web project, from going to the settings page for your XYZ project
- IMPORTANT: Add `firebase-admin.ts` file
  - export adminAuth which allows us to authenticate users
  - export adminDb which allows us to do CRUD operations on database
  - Go on firebase console & generate keys for your web project, from going to the `settings page > service accounts` for your XYZ project & generate key for Node.js project.
- Add next-auth-d.ts file to override the work you are doing to get firebase user.id in session, so that typescript gives you intellisense
- Create `<FirebaseAuthProvider />` to sync user.id for `Authentication` module in firebase console, to authenticate user's browser session with firebase authentication session
- Add `<FirebaseAuthProvider />` in `app/layout.tsx` file
- Go to `<Checkout />` button component
  - In firebase console add `stripe` extension, it will ask you for a stripe key
  - Go to your stripe account & generate a `restricted key` for your project with <b>right permissions</b>
    - Once it starts setting the extension up, it will give you rules that you can simply copy and paste & add it in your rules config
  - Come back to the extension setup in firebase and copy secret & click `create secret` button & do the same for stripe webhooks secret as well (it requires certain permissions)
    - For stripe webhooks create the webhook with the right permissions that you are advised by firebase documentation for help (2:46:50 for help in the video)
- Add the `translate test in firestore` extension while the other stripe extension is being setup
  - Make sure to set the collection path in our case it was `chats/{chatId}/messages
- Go to stripe console & add a product
  - IMPORTANT: make sure to add `firebaseRole: "pro"` in the product metadata
- Go to `<Checkout />` button component & complete checkout flow, you have everything you need for this flow
- Test the checkout flow & check DB for confirmation that record is there or not
- Add `<SubscriptionProvider />` & add your `lib/converters/Subscription.ts` & `types/Subscription.ts`
  - install `zustand` for subscription state management
  - create `/store/store.ts` file with your global state
  - add `<SubscriptionProvider />` in your main `layout.tsx` file
- Add `<UpgradeBanner />`
- Add `<ManageAccountButton />` in `<CheckoutButton />`
  -  Add `actions/generatePortalLink` in `ManageAccountButton`
- Add a new route `(user)`
 - Add `layout.tsx` for these page under `(user)` directory
  - Add `/chat` page
    - create `CreateChatButton`
      - add rules in firebase for /chats/** rule sets i.e, chats/:chatId, chats/:chatId/members, chats/:chatId/members/:member, chats/:chatId/messages/:messageId
      - create a new chat, redirect the user to chat
      - ensure the user is pro or not and handle permissions there accordingly
    - add a new converter for `ChatMembers` & add refs
    - add toast from `shadcn-ui`
    - create `ChatList`, `ChatListRows`, `ChatListRow`
    - add `Message` converter
    - add `useLanguageStore` hook in store.ts
    - add `<LanguageSelect />` component in Header
  - Add `/chat/:chatId` page
    - Add `ChatInput`
    - Add `ChatMessages`
    - Add `ChatMembersBadge`
    - Add `AdminControls`
      - Add `InviteUser`
      - Add `ShareLink`
      - Add `DeleteChat`
    - Add `hooks/useIsAdmin.ts`
- Deploy to `vercel`
  - Once deployed link made
  - Go to google console and update the authentication link in `Authorized JavaScript origins` & `Authorized redirect URLs`

### Note to Self:
- Make smart, efficient decisions to reach a Product-Market Fit (PMF) quickly.
- Always test features thoroughly before deployment.

Happy coding! 🚀
