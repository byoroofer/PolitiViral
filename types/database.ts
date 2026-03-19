export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      campaign_profiles: {
        Row: {
          campaign_name: string;
          created_at: string;
          creator_budget: string;
          creator_goal: string;
          geography_focus: string;
          launch_timeline: string;
          organization_id: string;
          owner_user_id: string;
          updated_at: string;
        };
        Insert: {
          campaign_name: string;
          created_at?: string;
          creator_budget: string;
          creator_goal: string;
          geography_focus: string;
          launch_timeline: string;
          organization_id: string;
          owner_user_id: string;
          updated_at?: string;
        };
        Update: {
          campaign_name?: string;
          created_at?: string;
          creator_budget?: string;
          creator_goal?: string;
          geography_focus?: string;
          launch_timeline?: string;
          organization_id?: string;
          owner_user_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      creator_profiles: {
        Row: {
          audience_size: string;
          bio: string;
          content_focus: string;
          created_at: string;
          display_name: string;
          home_base: string;
          primary_platform: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          audience_size: string;
          bio: string;
          content_focus: string;
          created_at?: string;
          display_name: string;
          home_base: string;
          primary_platform: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          audience_size?: string;
          bio?: string;
          content_focus?: string;
          created_at?: string;
          display_name?: string;
          home_base?: string;
          primary_platform?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          organization_type: string;
          owner_user_id: string;
          updated_at: string;
          website_url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          organization_type: string;
          owner_user_id: string;
          updated_at?: string;
          website_url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          organization_type?: string;
          owner_user_id?: string;
          updated_at?: string;
          website_url?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          full_name: string | null;
          id: string;
          onboarding_completed: boolean;
          role: Database["public"]["Enums"]["app_role"] | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          full_name?: string | null;
          id?: string;
          onboarding_completed?: boolean;
          role?: Database["public"]["Enums"]["app_role"] | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          full_name?: string | null;
          id?: string;
          onboarding_completed?: boolean;
          role?: Database["public"]["Enums"]["app_role"] | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      app_role: "creator" | "campaign";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
