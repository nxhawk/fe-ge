export interface TemplateFeature {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
  isDefault: boolean;
}

export interface Template {
  id: string;
  name: string;
  branch: string;
  backgroundImage: string;
  githubUrl: string;
  features: TemplateFeature[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  selected: boolean;
  isDefault?: boolean;
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  logo: string;
  selected: boolean;
}
