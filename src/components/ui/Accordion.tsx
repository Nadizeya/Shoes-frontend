import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Accordion = ({
  title,
  answer,
}: {
  title: string;
  answer: React.ReactNode;
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        type="button"
        className="flex items-center justify-between gap-2"
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <h5>{title}</h5>
        {accordionOpen ? (
          <FiChevronUp className="w-7 h-7" />
        ) : (
          <FiChevronDown className="w-7 h-7" />
        )}
      </button>
      <div
        className={`mt-2 grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
