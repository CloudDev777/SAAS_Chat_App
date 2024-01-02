import { CheckIcon } from "lucide-react";
import Link from "next/link";

import CheckoutButton from "./CheckoutButton";

const tiers = [
  {
    name: "Starter",
    id: null,
    href: "#",
    priceMonthly: null,
    description: "Get chatting right away with anyone, anywhere!",
    features: [
      "20 messages limit in chats",
      "2 participant limit in chat",
      "3 chat room limit",
      "Support 2 languages",
      "48 hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "stripe_super_sub_id",
    href: "#",
    priceMonthly: "$ 5.99",
    description:
      "Unlock the full potential with pro! with early access features",
    features: [
      "Unlimited messages limit in chats",
      "Unlimited participants in chat",
      "Unlimited chat rooms",
      "Support upto 10 languages",
      "Multimedia support in chat (coming soon)",
      "1 hour dedicated support time",
      "Early access to new features",
    ],
  },
];

interface IPricingCard {
  redirect: boolean;
}

function PricingCard({ redirect }: IPricingCard) {
  return (
    <section className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
      {tiers.map((tier) => (
        <article
          key={tier.name}
          className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
        >
          <div>
            <h3 className="text-base font-semibold leading-7 text-indigo-600">
              {tier.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-x-2">
              {tier.priceMonthly ? (
                <>
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-base font-semibold leading-7 text-gray-600">
                    /month
                  </span>
                </>
              ) : (
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  Free
                </span>
              )}
            </div>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {tier.description}
            </p>
            {/* FEATURE SECTION */}
            <ul
              role="list"
              className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {redirect ? (
            <Link
              href="/register"
              className="inline-block mt-10 text-center rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              Get Started Today
            </Link>
          ) : (
            tier.id && <CheckoutButton />
          )}
        </article>
      ))}
    </section>
  );
}

export default PricingCard;
