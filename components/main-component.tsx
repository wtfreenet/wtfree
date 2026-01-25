import { Suspense } from "react";
import BannerSection from "./banner-section";
import HeaderSection from "./header-section";
import ChannelsListSection, { type FreeItem, type VipItem, type VideoPreview } from "./channels-list-section";
import ChannelsAccordionSection, { type FreeFaq, type VipFaq, type SupportCard } from "./channels-accordion-section";

type MainComponentProps = {
  items: FreeItem[] | VipItem[];
  faqItems: FreeFaq[] | VipFaq[];
  itemsTitle?: string;
  faqTitle?: string;
  supportCard?: SupportCard;
  bannerUrl?: string;
  pageLabel?: string;
  pageDescription?: string;
  ageRestrictImageUrl?: string;
  videoPreviews?: VideoPreview[];
  videoPreviewsTitle?: string;
};

export default function MainComponent({ 
  items, 
  faqItems, 
  itemsTitle,
  faqTitle,
  supportCard,
  bannerUrl,
  pageLabel,
  pageDescription,
  ageRestrictImageUrl,
  videoPreviews,
  videoPreviewsTitle
}: MainComponentProps) {
  return (
    <div className="flex min-h-screen bg-[#1C1C1C]">
      <div className="mx-2 sm:mx-auto bg-[#F2F2F20A] max-w-[640px] w-full my-2 md:my-10 rounded-2xl">
        <BannerSection bannerUrl={bannerUrl} />
        <Suspense fallback={<div className="mt-6 mb-12 px-6" />}>
          <HeaderSection pageLabel={pageLabel} pageDescription={pageDescription} ageRestrictImageUrl={ageRestrictImageUrl} />
        </Suspense>
        <ChannelsListSection items={items} title={itemsTitle} />
        {videoPreviews && videoPreviews.length > 0 && (
          <ChannelsListSection items={videoPreviews} title={videoPreviewsTitle} />
        )}
        <ChannelsAccordionSection faqItems={faqItems} title={faqTitle} supportCard={supportCard} />
      </div>
    </div>
  );
}