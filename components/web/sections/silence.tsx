import React from "react";
import { MagicText } from "@/components/ui/magic-text";

const Silence = () => {
  const paragraph = `There is a quiet beginning. A place where doubt whispers louder than confidence. Where the world feels too big and you feel too small. But this is where it starts.`;
  return (
    <section className="section flex flex-col gap-6 md:gap-10 items-center justify-center px-4 sm:px-8 md:px-16">
      <h1 className="text-heading text-center">The Silence</h1>
      <div className="max-w-2xl w-full mx-auto text-center">
        <MagicText text={paragraph} />
      </div>
    </section>
  );
};

export default Silence;
