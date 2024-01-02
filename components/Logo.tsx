import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

import LogoImage from "@/logos/dummy-logo.png";

function Logo() {
  return (
    <Link href="/" prefetch={false}>
      <section className="flex items-center w-72 h-14 overflow-hidden">
        <AspectRatio
          ratio={16 / 9}
          className="flex justify-center items-center"
        >
          <Image
            priority
            src={LogoImage}
            alt="logo"
            className="dark:filter dark:invert"
          />
        </AspectRatio>
      </section>
    </Link>
  );
}

export default Logo;
