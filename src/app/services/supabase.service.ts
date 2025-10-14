// supabase.service.ts
import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase-client';
import { Observable, defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

 getGuests(): Observable<any> {
    return defer(async () => {
      const { data, error } = await supabase.from('guests').select('*');
      if (error) throw error;
      return data;
    });
  }

  addGuests(guest: any): Observable<any> {
    return defer(async () => {
      const { data, error } = await supabase
        .from('guests')
        .insert([guest])
        .select();
      if (error) throw error;
      return data;
    });
  }

  updateGuest(id: number, updates: any): Observable<any> {
    return defer(async () => {
      const { data, error } = await supabase
        .from('guests')
        .update(updates)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data;
    });
  }

  deleteGuest(id: number): Observable<any> {
    return defer(async () => {
      const { data, error } = await supabase
        .from('guests')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return data;
    });
  }

  getAccount(): Observable<any> {
    return defer(async () => {
      const { data, error } = await supabase.from('accounts').select('*');
      if (error) throw error;
      return data;
    });
  }
}
