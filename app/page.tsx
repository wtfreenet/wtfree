import type { Metadata } from "next";
import MainComponent from "@/components/main-component";
import { createServerClient } from "@/lib/supabase/server";
import { SupportCard, type FreeFaq } from "@/components/channels-accordion-section";
import { type FreeItem } from "@/components/channels-list-section";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createServerClient();
  
  const configsResult = await supabase
    .from("configs")
    .select("key, value")
    .in("key", ["free_page_seo_title", "free_page_seo_description", "free_page_seo_open_graph"]);

  const configs = configsResult.data?.reduce((acc, config) => {
    acc[config.key] = config.value;
    return acc;
  }, {} as Record<string, string>) || {};

  const title = configs.free_page_seo_title || "Free TG Links";
  const description = configs.free_page_seo_description || "";
  const openGraphImage = configs.free_page_seo_open_graph || undefined;

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

export default async function Home() {
  const supabase = createServerClient();

  const [itemsResult, faqResult, configsResult] = await Promise.all([
    supabase
      .from("free_items")
      .select("*")
      .order("order", { ascending: true }),
    supabase
      .from("free_faq")
      .select("*")
      .order("created_at", { ascending: true }),
    supabase
      .from("configs")
      .select("key, value")
      .in("key", ["free_items_label", "free_faq_label", "telegram_free_support_url", "free_banner_url", "free_page_label", "free_page_description", "free_page_seo_title", "free_page_seo_description", "free_page_seo_open_graph", "age_restrict_image_url"]),
  ]);

  const items: FreeItem[] = (itemsResult.data as FreeItem[]) || [];
  const faqItems: FreeFaq[] = (faqResult.data as FreeFaq[]) || [];
  
  const configs = configsResult.data?.reduce((acc, config) => {
    acc[config.key] = config.value;
    return acc;
  }, {} as Record<string, string>) || {};

  const supportCard: SupportCard | undefined = configs.telegram_free_support_url
    ? {
        title: "Support in TG",
        description: "Describe your problem in detail so that we can help you quickly.",
        buttonLabel: "Contact",
        buttonUrl: configs.telegram_free_support_url,
      }
    : undefined;

  return (
    <MainComponent
      items={items}
      faqItems={faqItems}
      itemsTitle={configs.free_items_label}
      faqTitle={configs.free_faq_label}
      supportCard={supportCard}
      bannerUrl={configs.free_banner_url}
      pageLabel={configs.free_page_label}
      pageDescription={configs.free_page_description}
      ageRestrictImageUrl={configs.age_restrict_image_url}
    />
  );
}
