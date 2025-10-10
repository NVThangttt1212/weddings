// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://fcefvdpfcoqmadgsfnyn.supabase.co'; // Project URL
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZWZ2ZHBmY29xbWFkZ3NmbnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNzkzODgsImV4cCI6MjA3NTY1NTM4OH0.idw80I4byZNE0mCgEwZqEvYD4HfHvnpR_pYW5CFfVrQ';                  // Key bạn đã lấy
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getGuests() {
    const { data, error } = await this.supabase
      .from('guests')
      .select('*');
    if (error) throw error;
    return data;
  }

  async addGuests(guests: any) {
    const { data, error } = await this.supabase
      .from('guests')
      .insert([guests]);
    if (error) throw error;
    return data;
  }
}
