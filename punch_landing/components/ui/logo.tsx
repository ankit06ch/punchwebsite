import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Punch">
      <Image
        src="/images/Punch_T/iconT.png"
        width={40}
        height={40}
        alt="Punch Logo"
        className="h-10 w-10"
        priority
      />
    </Link>
  );
}
