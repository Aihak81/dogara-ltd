export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company_name: string | null;
          phone: string | null;
          role: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          company_name?: string | null;
          phone?: string | null;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company_name?: string | null;
          phone?: string | null;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quotes: {
        Row: {
          id: string;
          reference_number: string;
          user_id: string | null;
          company_name: string;
          contact_person: string;
          email: string;
          phone: string;
          product: string;
          quantity: number;
          location: string;
          date_needed: string | null;
          notes: string | null;
          status: string;
          quoted_price: number | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_number?: string;
          user_id?: string | null;
          company_name: string;
          contact_person: string;
          email: string;
          phone: string;
          product: string;
          quantity: number;
          location: string;
          date_needed?: string | null;
          notes?: string | null;
          status?: string;
          quoted_price?: number | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference_number?: string;
          user_id?: string | null;
          company_name?: string;
          contact_person?: string;
          email?: string;
          phone?: string;
          product?: string;
          quantity?: number;
          location?: string;
          date_needed?: string | null;
          notes?: string | null;
          status?: string;
          quoted_price?: number | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          quote_id: string;
          user_id: string | null;
          reference_number: string;
          status: string;
          total_amount: number | null;
          currency: string;
          delivery_address: string | null;
          delivery_date: string | null;
          tracking_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quote_id: string;
          user_id?: string | null;
          reference_number?: string;
          status?: string;
          total_amount?: number | null;
          currency?: string;
          delivery_address?: string | null;
          delivery_date?: string | null;
          tracking_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quote_id?: string;
          user_id?: string | null;
          reference_number?: string;
          status?: string;
          total_amount?: number | null;
          currency?: string;
          delivery_address?: string | null;
          delivery_date?: string | null;
          tracking_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tracking_updates: {
        Row: {
          id: string;
          order_id: string;
          status: string;
          location: string | null;
          notes: string | null;
          created_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          status: string;
          location?: string | null;
          notes?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          status?: string;
          location?: string | null;
          notes?: string | null;
          created_at?: string;
          created_by?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          featured_image: string | null;
          category: string | null;
          tags: string[] | null;
          author_id: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          featured_image?: string | null;
          category?: string | null;
          tags?: string[] | null;
          author_id?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          featured_image?: string | null;
          category?: string | null;
          tags?: string[] | null;
          author_id?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          status?: string;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read: boolean;
          link: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: string;
          read?: boolean;
          link?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          read?: boolean;
          link?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
