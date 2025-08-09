import Link from "next/link";
import Image from "next/image";

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <Link href="/" className="inline-flex" aria-label="Punch">
      <Image
        src="/images/Punch_T/iconT.png"
        width={size}
        height={size}
        alt="Punch Logo"
        priority
      />
    </Link>
  );
}
