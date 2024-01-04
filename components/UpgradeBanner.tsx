"use client";
import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function UpgradeBanner() {
  const router = useRouter();

  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro = subscription?.role === "pro";

  if (subscription === undefined || isPro) return null;

  return (
    <section className="w-full rounded-none bg-gradient-to-r from-[#777FD6] to-[#E93F37] text-center text-white px-5 py-4 hover:from-[#777FD6] hover:to-[#E93F37] hover:shadow-md hover:opacity-75 transition-all">
      <button onClick={() => router.push("/register")} className="bg-transparent">
        Upgrade to pro to unlock all features
      </button>
    </section>
  );
}

export default UpgradeBanner;
