import { supabase } from '../config/supabase.js';
import bcrypt from 'bcryptjs';

export class UserSupabase {
  static async create(userData) {
    if (!supabase) {
      throw new Error('Database not available');
    }

    const { firstName, lastName, email, password } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'user',
          is_email_verified: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('User already exists with this email');
      }
      throw new Error(error.message);
    }

    return this.formatUser(data);
  }

  static async findByEmail(email) {
    if (!supabase) {
      throw new Error('Database not available');
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      throw new Error(error.message);
    }

    return this.formatUser(data);
  }

  static async findById(id) {
    if (!supabase) {
      throw new Error('Database not available');
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      throw new Error(error.message);
    }

    return this.formatUser(data);
  }

  static async updateRefreshToken(id, refreshToken) {
    if (!supabase) {
      throw new Error('Database not available');
    }

    const { error } = await supabase
      .from('users')
      .update({ 
        refresh_token: refreshToken,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static formatUser(userData) {
    if (!userData) return null;
    
    return {
      _id: userData.id,
      id: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      email: userData.email,
      role: userData.role,
      isEmailVerified: userData.is_email_verified,
      refreshToken: userData.refresh_token,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at
    };
  }
}

export default UserSupabase;