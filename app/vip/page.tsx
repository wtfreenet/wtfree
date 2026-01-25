import type { Metadata } from "next";
import MainComponent from "@/components/main-component";
import { createServerClient } from "@/lib/supabase/server";
import { SupportCard, type VipFaq } from "@/components/channels-accordion-section";
import { type VipItem } from "@/components/channels-list-section";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createServerClient();
  
  const configsResult = await supabase
    .from("configs")
    .select("key, value")
    .in("key", ["vip_page_seo_title", "vip_page_seo_description", "vip_page_seo_open_graph"]);

  const configs = configsResult.data?.reduce((acc, config) => {
    acc[config.key] = config.value;
    return acc;
  }, {} as Record<string, string>) || {};

  const title = configs.vip_page_seo_title || "VIP Exclusive";
  const description = configs.vip_page_seo_description || "";
  const openGraphImage = configs.vip_page_seo_open_graph || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: openGraphImage ? [{ url: openGraphImage }] : undefined,
    },
  };
}

export default async function VipPage() {
  const supabase = createServerClient();

  const [itemsResult, faqResult, configsResult] = await Promise.all([
    supabase
      .from("vip_items")
      .select("*")
      .order("order", { ascending: true }),
    supabase
      .from("vip_faq")
      .select("*")
      .order("created_at", { ascending: true }),
    supabase
      .from("configs")
      .select("key, value")
      .in("key", ["vip_items_label", "vip_faq_label", "telegram_vip_support_url", "vip_banner_url", "vip_page_label", "vip_page_description", "vip_page_seo_title", "vip_page_seo_description", "vip_page_seo_open_graph", "age_restrict_image_url"]),
  ]);

  const items: VipItem[] = (itemsResult.data as VipItem[]) || [];
  const faqItems: VipFaq[] = (faqResult.data as VipFaq[]) || [];
  
  const configs = configsResult.data?.reduce((acc, config) => {
    acc[config.key] = config.value;
    return acc;
  }, {} as Record<string, string>) || {};

  const supportCard: SupportCard | undefined = configs.telegram_vip_support_url
    ? {
        title: "Support in TG",
        description: "Describe your problem in detail so that we can help you quickly.",
        buttonLabel: "Contact",
        buttonUrl: configs.telegram_vip_support_url,
      }
    : undefined;

  return (
    <MainComponent
      items={items}
      faqItems={faqItems}
      itemsTitle={configs.vip_items_label}
      faqTitle={configs.vip_faq_label}
      supportCard={supportCard}
      bannerUrl={configs.vip_banner_url}
      pageLabel={configs.vip_page_label}
      pageDescription={configs.vip_page_description}
      ageRestrictImageUrl={configs.age_restrict_image_url}
    />
  );
}
