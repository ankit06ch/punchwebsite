import Image from "next/image";
import PageIllustration from "@/components/page-illustration";

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            {/* Avatars row */}
            <div className="mb-4 flex justify-center -space-x-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Image
                  key={i}
                  src={`/images/avatar-0${i + 1}.jpg`}
                  width={40}
                  height={40}
                  alt={`Avatar 0${i + 1}`}
                  className="box-content rounded-full border-2 border-white bg-gray-100"
                  style={{ zIndex: 6 - i }}
                />
              ))}
            </div>
            <h1
              className="mb-6 text-5xl font-bold md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Rewards that feel <br className="max-lg:hidden" />
              <span className="text-[#FB7A20]">good to earn</span>
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Punch is a modern loyalty app that rewards people for visiting their favorite local spots. 
                We've reimagined the classic punch card — no paper, no stamps — just simple, digital rewards.
              </p>
              <div className="relative">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn group mb-4 w-full bg-[#FB7A20] text-white shadow-sm hover:bg-[#e66a1a] sm:mb-0 sm:w-auto"
                    href="#0"
                  >
                    <span className="relative inline-flex items-center">
                      Download App{" "}
                      <span className="ml-1 tracking-normal text-orange-200 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    For Businesses
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative aspect-video rounded-2xl bg-gray-900 px-5 py-3 shadow-xl overflow-hidden">
              {/* Mac window circles */}
              <div className="absolute left-5 top-4 flex space-x-2 z-10">
                <span className="inline-block h-3 w-3 rounded-full bg-red-500 border border-red-300"></span>
                <span className="inline-block h-3 w-3 rounded-full bg-yellow-400 border border-yellow-200"></span>
                <span className="inline-block h-3 w-3 rounded-full bg-green-500 border border-green-300"></span>
              </div>
              {/* Animated punch card */}
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-6">
                  <div className="text-center text-gray-200 text-lg font-semibold mb-2">Punch Card</div>
                  <div className="flex space-x-3">
                    {/* 5 punch spots, 1 animates in */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`inline-block h-6 w-6 rounded-full border-2 border-[#FB7A20] bg-gray-800 relative overflow-hidden ${i === 0 ? 'animate-punch-in' : ''}`}
                      >
                        {i === 0 && (
                          <span className="absolute inset-0 flex items-center justify-center text-[#FB7A20] text-xl animate-bounce">🥊</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Reward icon animates in */}
                <div className="flex flex-col items-center mt-2">
                  <span className="text-3xl animate-reward-pop">🎁</span>
                  <span className="text-xs text-gray-400 mt-1">Reward</span>
                </div>
              </div>
              {/* Floating notification */}
              <div className="absolute right-6 top-10 animate-float-notification z-20">
                <div className="flex items-center rounded-lg bg-white/90 px-4 py-2 shadow-lg border border-gray-200">
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FB7A20] text-white font-bold">S</span>
                  <span className="text-sm text-gray-800 font-medium">Sarah just redeemed a free coffee!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
