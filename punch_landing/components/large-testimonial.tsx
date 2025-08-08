import Image from "next/image";

export default function LargeTestimonial() {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="space-y-3 text-center">
            {/* Avatar only, no quote icon */}
            <div className="flex items-center justify-center mb-2">
              <Image
                className="rounded-full border-2 border-[#FB7A20]"
                src="/images/avatar-02.jpg"
                width={48}
                height={48}
                alt="Noor Ahmed"
              />
            </div>
            {/* Quote text below */}
            <p className="text-2xl font-bold text-gray-900 max-w-xl mx-auto">
              "Punch has completely changed how I discover and support local businesses. I love earning rewards at my favorite coffee shops and restaurants, and the app makes it so easy to track everything."
            </p>
            <div className="text-sm font-medium text-gray-500">
              <span className="text-gray-700">Noor Ahmed</span>{" "}
              <span className="text-gray-400">/</span>{" "}
              <span className="text-[#FB7A20]">Regular Customer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
