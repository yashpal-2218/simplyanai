import { ServiceCard } from "@/components/cards";

export function Services() {
  return (
    <section
      id="services-section"
      className="w-full min-h-screen flex flex-col pt-10 lg:pt-20 pb-10 gap-y-10"
    >
      <h2 className="text-3xl font-bold text-center text-secondary-foreground">
        Services
      </h2>
      <div className="w-full px-2 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-x-5 gap-y-8 max-w-screen-xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard {...service} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const services: Services[] = [
  {
    title: "Chatwithdoc: Chat App",
    description:
      "Upload a text or pdf document, ask questions and get answers.",
    url: "/tool/chatwithdoc",
  },
  {
    title: "Buggy: Bug Fixer",
    description:
      "Buggy is a code error fixer. Fix errors and bugs from your code.",
    url: "/tool/buggy",
  },
];
