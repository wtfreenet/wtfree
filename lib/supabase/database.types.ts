export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type CtaType = "write_support";

export type Database = {
  public: {
    Tables: {
      configs: {
        Row: {
          key: string;
          value: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      free_items: {
        Row: {
          id: string;
          link: string;
          label: string;
          description: string;
          cover_url: string;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          link: string;
          label: string;
          description: string;
          cover_url: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          link?: string;
          label?: string;
          description?: string;
          cover_url?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      vip_items: {
        Row: {
          id: string;
          link: string;
          label: string;
          description: string;
          cover_url: string;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          link: string;
          label: string;
          description: string;
          cover_url: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          link?: string;
          label?: string;
          description?: string;
          cover_url?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      free_faq: {
        Row: {
          id: string;
          label: string;
          description: string;
          cta_type: CtaType | null;
          cta_label: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          description: string;
          cta_type?: CtaType | null;
          cta_label?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          description?: string;
          cta_type?: CtaType | null;
          cta_label?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      vip_faq: {
        Row: {
          id: string;
          label: string;
          description: string;
          cta_type: CtaType | null;
          cta_label: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          description: string;
          cta_type?: CtaType | null;
          cta_label?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          description?: string;
          cta_type?: CtaType | null;
          cta_label?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

