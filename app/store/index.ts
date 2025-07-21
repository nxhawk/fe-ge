import { create } from 'zustand';
import type { Template } from 'types/template';
import { supabase } from '~/supabase-client';

interface TemplateStore {
  templates: Template[];
  loading: boolean;
  error: string | null;
  fetchTemplates: () => Promise<void>;
  fetchTemplateById: (id: string) => Promise<Template | null>;
  addTemplate: (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTemplate: (id: string, template: Partial<Template>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  loading: false,
  error: null,

  fetchTemplates: async () => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.from('templates').select('*').order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      console.log(data);
      set({ templates: data as Template[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchTemplateById: async (id) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.from('templates').select('*').eq('id', id).single();

      if (error) {
        throw error;
      }

      return data as Template;
    } catch (error) {
      set({ error: (error as Error).message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  addTemplate: async (template) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('templates')
        .insert([
          {
            name: template.name,
            backgroundImage: template.backgroundImage,
            githubUrl: template.githubUrl,
            features: template.features,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      set((state) => ({
        templates: [data as Template, ...state.templates],
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateTemplate: async (id, template) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('templates')
        .update({
          name: template.name,
          backgroundImage: template.backgroundImage,
          githubUrl: template.githubUrl,
          features: template.features,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      set((state) => ({
        templates: state.templates.map((t) => (t.id === id ? (data as Template) : t)),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteTemplate: async (id) => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.from('templates').delete().eq('id', id);

      if (error) {
        throw error;
      }

      set((state) => ({
        templates: state.templates.filter((t) => t.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
