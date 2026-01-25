/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Database } from "@/lib/supabase/database.types";

export type FreeFaq = Database["public"]["Tables"]["free_faq"]["Row"];
export type VipFaq = Database["public"]["Tables"]["vip_faq"]["Row"];

export type SupportCard = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl?: string;
};

export type ChannelsAccordionSectionProps = {
  faqItems?: FreeFaq[] | VipFaq[];
  title?: string;
  supportCard?: SupportCard;
};

export default function ChannelsAccordionSection({ 
  faqItems = [], 
  title = "Free Telegram Channels",
  supportCard 
}: ChannelsAccordionSectionProps) {
  const defaultSupportCard: SupportCard = {
    title: "Support in TG",
    description: "Describe your problem in detail so that we can help you quickly.",
    buttonLabel: "Contact",
  };

  const support = supportCard || defaultSupportCard;

  return (
    <section className="mt-6 px-6 mb-12">
      <div className="text-xl font-medium text-white mb-2">{title}</div>

      <div>
        <Accordion type="single" collapsible>
          {faqItems.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger>{item.label}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>{item.description}</div>
                  {item.cta_type === "write_support" && item.cta_label && support.buttonUrl && (
                    <div className="pt-2">
                      <Button asChild className="w-full">
                        <a 
                          href={support.buttonUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block no-underline w-full"
                        >
                          {item.cta_label}
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Card className="m-4">
        <CardContent className="flex pl-3 pr-6">
          <img src="/notify.svg" alt="notify image" className="size-6 object-cover" />
          <div className="ml-3 mr-6">
            <div className="text-[#F2F2F2] font-medium">{support.title}</div>
            <div className="text-[#F2F2F266]">{support.description}</div>
          </div>
          <div className="flex items-center">
            {support.buttonUrl ? (
              <Button asChild>
                <a href={support.buttonUrl} target="_blank" rel="noopener noreferrer">
                  {support.buttonLabel}
                </a>
              </Button>
            ) : (
              <Button>{support.buttonLabel}</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
