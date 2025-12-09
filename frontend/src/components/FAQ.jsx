import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { mockFAQs } from '../mock';

const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-1 font-heading mb-4">Frequently Asked Questions</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Everything you need to know about KidoTalk.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {mockFAQs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="voice-card accent-grey">
              <AccordionTrigger className="text-left font-semibold hover:no-underline px-6 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 body-medium" style={{ color: 'var(--text-secondary)' }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;