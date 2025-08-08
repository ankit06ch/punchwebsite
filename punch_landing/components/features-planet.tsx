import Image from "next/image";

const notificationProfiles = [
  { name: "Micah", place: "Joe's Coffee", img: "/images/avatar-01.jpg" },
  { name: "Noor", place: "Slice Pizza", img: "/images/avatar-02.jpg" },
  { name: "Selena", place: "Green Leaf Cafe", img: "/images/avatar-04.jpg" },
  { name: "Dev", place: "Book Nook", img: "/images/avatar-03.jpg" },
];

const notificationTag = (
  profile: { name: string; place: string; img: string },
  className: string,
  animation: string
) => (
  <div className={`absolute z-10 ${className} ${animation} opacity-90 transition-opacity duration-500 flex items-center justify-center w-56 h-14`}>
    <div className="flex flex-row items-center bg-gray-800/90 rounded-xl px-2 py-1 shadow-lg w-full h-full">
      <Image src={profile.img} width={24} height={24} alt={profile.name} className="rounded-full border-2 border-white bg-gray-100 mr-2" />
      <div className="flex flex-col justify-center flex-1">
        <span className="text-[11px] font-bold text-[#FB7A20] mb-0.5 text-left">Punch Rewards</span>
        <div className="text-[11px] text-gray-100 leading-tight whitespace-normal text-left">
          <span className="font-semibold">{profile.name}</span> redeemed a reward<br />at <span className="font-semibold">{profile.place}</span>
        </div>
      </div>
    </div>
  </div>
);

export default function FeaturesPlanet() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
              Punch connects your community
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              See how digital rewards, local discovery, and real-time engagement bring people and businesses together.
            </p>
          </div>
          {/* Animated planet illustration */}
          <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-linear-to-b before:from-[#FB7A20] before:to-orange-200/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,#FB7A20,transparent)]">
                <Image
                  className="rounded-full bg-gray-900"
                  src="/images/planet.png"
                  width={400}
                  height={400}
                  alt="Planet"
                />
                <div className="pointer-events-none" aria-hidden="true">
                  <Image
                    className="absolute -right-64 -top-20 z-10 max-w-none"
                    src="/images/planet-overlay.svg"
                    width={789}
                    height={755}
                    alt="Planet decoration"
                  />
                  {/* Four floating notification tags */}
                  {notificationTag(notificationProfiles[0], "-left-28 top-16", "animate-[float_4s_ease-in-out_infinite_both]")}
                  {notificationTag(notificationProfiles[1], "left-56 top-7", "animate-[float_4s_ease-in-out_infinite_1s_both]")}
                  {notificationTag(notificationProfiles[2], "bottom-32 left-64", "animate-[float_4s_ease-in-out_infinite_2s_both]")}
                  {notificationTag(notificationProfiles[3], "-left-20 bottom-24", "animate-[float_4s_ease-in-out_infinite_3s_both]")}
                </div>
              </div>
            </div>
          </div>
          {/* Features Grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:relative *:p-6 *:before:absolute *:before:bg-gray-800 *:before:[block-size:100vh] *:before:[inline-size:1px] *:before:[inset-block-start:0] *:before:[inset-inline-start:-1px] *:after:absolute *:after:bg-gray-800 *:after:[block-size:1px] *:after:[inline-size:100vw] *:after:[inset-block-start:-1px] *:after:[inset-inline-start:0] md:*:p-10">
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-[#FB7A20]" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Digital Punch Cards</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                No more paper cards or stamps. Earn digital punches every time you visit your favorite local spots.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-[#FB7A20]" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Discover Local Spots</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Find amazing local businesses near you and see what rewards they offer before you even visit.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-[#FB7A20]" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Track Your Rewards</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Keep track of all your punches and rewards in one place. Never lose another loyalty card again.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-[#FB7A20]" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Business Insights</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Get detailed analytics on customer visits, popular rewards, and engagement patterns to grow your business.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-[#FB7A20]" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Easy Setup</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Set up your custom punch-to-reward system in minutes. No technical expertise required.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <svg className="fill-[#FB7A20]" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Build Community</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Connect with your local community. Get featured in our app and social content to reach new customers.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
