// supabase.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase-client';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  async getGuests() {
    const { data, error } = await supabase
      .from('guests')
      .select('*');
    if (error) throw error;
    return data;
  }

  async addGuests(guest: any) {
    const { data, error } = await supabase
      .from('guests')
      .insert([guest])
      .select(); 
    if (error) throw error;
    return data;
  }

  async updateGuest(id: number, updates: any) {
    const { data, error } = await supabase
      .from('guests')
      .update(updates)
      .eq('id', id)  
      .select();     
    if (error) throw error;
    return data;
  }

  async deleteGuest(id: number) {
    const { data, error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return data;
  }
}
