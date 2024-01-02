import PricingCard from "@/components/PricingCard";

function Pricing() {
  return (
    <main className="">
      {/* BACKGROUND HERE */}
      <div className="isolate pt-14 dark:bg-gray-900">
        <div
          className="absolute inset-x-0 top-28 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem]
                       translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff8085] to-[#9089fc] 
                       opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5%, 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* CONTENT SECTION-I HERE */}
        <div className="relative py-12 sm:py-20 lg:pb-40">
          {/* SECTION I HERE */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-base font-semibold text-center leading-7 text-indigo-400">
                Pricing
              </h2>
              <h1 className="text-4xl text-center font-bold tracking-tight sm:text-6xl">
                The right price for you, whoever you are
              </h1>
              <p className="text-lg text-center leading-8 text-white/60">
                We are 99% sure we have a plan to match your needs
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* CONTENT SECTION-II HERE */}
      <div className="mx-auto max-w-3xl relative -top-5">
        <div className="flow-root bg-transparent text-black pb-24 sm:pb-34">
          <div className="">
            <PricingCard redirect/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Pricing;
