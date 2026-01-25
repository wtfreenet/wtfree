/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "./ui/card";
import { Database } from "@/lib/supabase/database.types";

export type FreeItem = Database["public"]["Tables"]["free_items"]["Row"];
export type VipItem = Database["public"]["Tables"]["vip_items"]["Row"];
export type VideoPreview = Database["public"]["Tables"]["video_previews"]["Row"];

export type ChannelsListSectionProps = {
  items?: FreeItem[] | VipItem[] | VideoPreview[];
  title?: string;
};

export default function ChannelsListSection({ items = [], title = "Free Telegram Channels" }: ChannelsListSectionProps) {
  return (
    <section className="px-6 mb-12">
      <div className="text-xl font-medium text-white mb-6 break-words">{title}</div>

      <div className="space-y-3">
        {items.map((item) => (
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            key={item.id}
            className="block no-underline"
          >
            <Card className="h-20">
              <CardContent className="px-3 flex items-center gap-3">
                <img 
                  src={item.cover_url} 
                  alt={item.label} 
                  className="size-11 md:size-14 rounded-lg object-cover" 
                />
                <div>
                  <div className="text-[#F2F2F2] font-medium">{item.label}</div>
                  <div className="text-[#F2F2F266]">{item.description}</div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
