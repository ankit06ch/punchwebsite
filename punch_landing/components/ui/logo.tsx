import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Punch">
      <Image
        src="/images/Punch_T/black_logo.png"
        width={56}
        height={56}
        alt="Punch Logo"
        className="h-14 w-auto"
      />
    </Link>
  );
}
