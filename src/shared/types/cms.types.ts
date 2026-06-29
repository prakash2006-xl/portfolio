export interface Profile {
  firstName: string;
  middleName: string;
  lastName: string;
  taglines: string[];
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  twitter?: string;
  resume?: string;
  summary: string;
  profileImage?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  points: string[];
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  date: string;
  points: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  date: string;
  details: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image?: string;
  tags?: string[];
  link?: string;
}

export interface CMSState {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  liveProjects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  sectionOrder: string[];
  sectionFonts: Record<string, string>;
  
  // Actions
  updateProfile: (data: Partial<Profile>) => void;
  
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addLiveProject: (project: Project) => void;
  updateLiveProject: (id: string, project: Partial<Project>) => void;
  removeLiveProject: (id: string) => void;

  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  setSectionOrder: (order: string[]) => void;
  setSectionFont: (sectionId: string, font: string) => void;
}
