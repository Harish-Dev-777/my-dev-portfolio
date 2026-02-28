import { MagicText } from "@/components/ui/magic-text";

const FirstStep = () => {
  const paragraph = `The snow is heavy. The air is cold. The path is unclear.`;
  return (
    <>
      <section className="section flex flex-col gap-4 md:gap-8 items-center justify-center px-4 sm:px-8 md:px-16">
        <h1 className="text-display text-center max-w-4xl">
          Progress doesn't need permission.
        </h1>
      </section>
      <section className="section flex flex-col gap-4 md:gap-8 items-center justify-center px-4 sm:px-8 md:px-16">
        <div className="max-w-2xl w-full mx-auto text-center">
          <MagicText text={paragraph} />
        </div>
      </section>
    </>
  );
};

export default FirstStep;
