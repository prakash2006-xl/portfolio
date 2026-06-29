import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabaseStorage } from './supabaseStorage'
import type { CMSState } from '../shared/types/cms.types'

export const useCMSStore = create<CMSState>()(
  persist(
    (set) => ({
      profile: {
        firstName: 'BALAKUMAR',
        middleName: 'B',
        lastName: 'H',
        taglines: ['Full Stack Developer', 'AI Chatbot Developer', 'Prompt Engineer'],
        email: 'rskakavin@gmail.com',
        phone: '+91-8825443731',
        location: 'Madurai, Tamil Nadu, India',
        linkedin: 'linkedin.com/in/kavin-haripprakash-rs-869974344',
        resume: 'https://link-to-your-resume.pdf',
        summary: 'Detail-oriented Full Stack Developer and AI enthusiast pursuing a B.E. in Computer Science and Engineering with a CGPA of 8.55/10. Skilled in designing, building, and shipping responsive web applications and AI-powered tools for real-world use cases. Completed a professional internship at SmartED Innovations, where hands-on experience was gained in full stack development within an agile team environment. Proficient in Python, Java, JavaScript, HTML5, and CSS3, with expertise in prompt engineering and generative AI integration. Passionate about crafting clean, maintainable code and delivering user-centric software solutions that make a measurable impact.',
      },
      skills: [
        { id: '1', name: 'Python', category: 'Languages' },
        { id: '2', name: 'Java', category: 'Languages' },
        { id: '3', name: 'C', category: 'Languages' },
        { id: '4', name: 'JavaScript (ES6+)', category: 'Languages' },
        { id: '5', name: 'HTML5', category: 'Languages' },
        { id: '6', name: 'CSS3', category: 'Languages' },
        { id: '7', name: 'Full Stack Development', category: 'Web Development' },
        { id: '8', name: 'Responsive Web Design', category: 'Web Development' },
        { id: '9', name: 'REST API Integration', category: 'Web Development' },
        { id: '10', name: 'DOM Manipulation', category: 'Web Development' },
        { id: '11', name: 'Prompt Engineering', category: 'AI & Automation' },
        { id: '12', name: 'AI Chatbot Development', category: 'AI & Automation' },
        { id: '13', name: 'Generative AI', category: 'AI & Automation' },
        { id: '14', name: 'Natural Language Processing (NLP)', category: 'AI & Automation' },
        { id: '15', name: 'Git', category: 'Tools & Platforms' },
        { id: '16', name: 'GitHub', category: 'Tools & Platforms' },
        { id: '17', name: 'Visual Studio Code', category: 'Tools & Platforms' },
        { id: '18', name: 'IBM SkillsBuild', category: 'Tools & Platforms' },
        { id: '19', name: 'Adobe Learning Manager', category: 'Tools & Platforms' },
        { id: '20', name: 'Basic SQL', category: 'Database & Backend' },
        { id: '21', name: 'Server-side Logic', category: 'Database & Backend' },
        { id: '22', name: 'CRUD Application Development', category: 'Database & Backend' },
        { id: '23', name: 'UI/UX Fundamentals', category: 'Design' },
        { id: '24', name: 'Wireframing', category: 'Design' },
        { id: '25', name: 'Video Editing', category: 'Design' },
        { id: '26', name: 'Problem Solving', category: 'Soft Skills' },
        { id: '27', name: 'Communication', category: 'Soft Skills' },
        { id: '28', name: 'Teamwork', category: 'Soft Skills' },
        { id: '29', name: 'Time Management', category: 'Soft Skills' },
        { id: '30', name: 'Adaptability', category: 'Soft Skills' },
        { id: '31', name: 'Attention to Detail', category: 'Soft Skills' },
      ],
      projects: [
        {
          id: 'p1',
          title: 'AI Chatbot for Students (Web-Based)',
          date: 'Jan 2025 – Dec 2025',
          description: 'Architected an AI-powered chatbot to handle student academic queries.',
          points: [
            'Applied prompt engineering for context-aware, accurate response generation.',
            'Reduced query resolution time by automating responses, enabling instant self-service academic support without human intervention.',
            'Delivered a real-time chat interface using JavaScript, providing a fully functional and intuitive front end for the deployed application.'
          ],
          tags: ['AI', 'JavaScript', 'Prompt Engineering']
        },
        {
          id: 'p2',
          title: 'Student Management Web System',
          date: 'Jan 2025 – Dec 2025',
          description: 'Designed a full stack CRUD application for managing student records, course enrolments, and academic data with role-based access control.',
          points: [
            'Integrated a normalized data layer with a responsive HTML/CSS/JavaScript interface, reducing manual administrative workload for staff.'
          ],
          tags: ['Full Stack', 'HTML/CSS/JS', 'CRUD']
        },
        {
          id: 'p3',
          title: 'Mini Among Us Game (Web-Based)',
          date: 'Jan 2024 – Dec 2024',
          description: 'Programmed an interactive browser game from scratch using vanilla JavaScript.',
          points: [
            'Implemented custom game logic, player controls, and CSS animations without external libraries.'
          ],
          tags: ['Vanilla JS', 'Game Dev', 'CSS Animations']
        },
        {
          id: 'p4',
          title: 'Student Query System',
          date: 'Jan 2024 – Dec 2024',
          description: 'Launched a query submission and resolution portal featuring an admin dashboard.',
          points: [
            'Streamlined communication between students and faculty members.'
          ],
          tags: ['Web Portal', 'Dashboard']
        }
      ],
      experience: [
        {
          id: 'e1',
          role: 'Full Stack Web Development Intern',
          company: 'SmartED Innovations',
          location: 'Madurai, Tamil Nadu, India',
          date: 'Nov 2025 – Jan 2026',
          points: [
            'Built and deployed 3+ responsive web modules using HTML5, CSS3, and JavaScript, significantly improving end-user experience across multiple client platforms.',
            'Engineered reusable front-end components and integrated REST APIs with back-end logic, cutting code redundancy by approximately 30%.',
            'Participated in weekly agile sprints, ensuring all assigned features and milestones were delivered on schedule throughout the internship.',
            'Structured data management workflows to enhance application performance, making the codebase easier to maintain and scale for future releases.',
            'Optimized UI layouts for mobile responsiveness, achieving cross-browser compatibility and accessibility compliance across every delivered page.',
            'Earned supervisor recognition for exceptional code quality, proactive problem-solving, and professional conduct during the engagement.'
          ]
        }
      ],
      education: [
        {
          id: 'ed1',
          degree: 'Bachelor of Engineering (B.E.) — Computer Science and Engineering',
          institution: 'Velammal College of Engineering and Technology, Madurai | Affiliated: Anna University, Chennai',
          date: 'Aug 2023 – May 2027 (Expected)',
          details: 'CGPA: 8.55 / 10.0 | Relevant Coursework: Data Structures, OOP, DBMS, Web Technologies, AI Fundamentals'
        },
        {
          id: 'ed2',
          degree: 'Higher Secondary Certificate (HSC) — Computer Science Stream',
          institution: 'Tamil Nadu State Board of Secondary Education',
          date: 'Jun 2021 – Jun 2023',
          details: 'Aggregate: 80% | Subjects: Physics, Chemistry, Mathematics, Computer Science, English'
        },
        {
          id: 'ed3',
          degree: 'Secondary School Leaving Certificate (SSLC)',
          institution: 'Tamil Nadu State Board of Secondary Education',
          date: 'Completed Jun 2021',
          details: 'Strong academic foundation in Mathematics and Sciences'
        }
      ],
      certifications: [
        { id: 'c1', name: 'Programming in Java', issuer: 'NPTEL — IIT Certified', date: 'Jul – Oct 2025' },
        { id: 'c2', name: 'Problem Solving Through Programming in C', issuer: 'NPTEL — IIT Certified', date: 'Jan – Apr 2025' },
        { id: 'c3', name: 'Full Stack Web Development', issuer: 'SmartED Innovations', date: 'Nov 2025' },
        { id: 'c4', name: 'Web Development Fundamentals', issuer: 'IBM SkillsBuild', date: 'Apr 2026' },
        { id: 'c5', name: 'Mastering the Art of Prompting', issuer: 'Adobe Learning Manager', date: 'Apr 2026' },
        { id: 'c6', name: 'Video Editing Webinar', issuer: 'Brand Monk Academy / NSDC', date: 'Mar 2026' },
      ],
      sectionOrder: ['about', 'skills', 'projects', 'experience'],
      updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),

      addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
      updateSkill: (id, data) => set((state) => ({
        skills: state.skills.map(s => s.id === id ? { ...s, ...data } : s)
      })),
      removeSkill: (id) => set((state) => ({ skills: state.skills.filter(s => s.id !== id) })),

      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, data) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...data } : p)
      })),
      removeProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),

      addExperience: (exp) => set((state) => ({ experience: [...state.experience, exp] })),
      updateExperience: (id, data) => set((state) => ({
        experience: state.experience.map(e => e.id === id ? { ...e, ...data } : e)
      })),
      removeExperience: (id) => set((state) => ({ experience: state.experience.filter(e => e.id !== id) })),

      addEducation: (edu) => set((state) => ({ education: [...state.education, edu] })),
      updateEducation: (id, data) => set((state) => ({
        education: state.education.map(e => e.id === id ? { ...e, ...data } : e)
      })),
      removeEducation: (id) => set((state) => ({ education: state.education.filter(e => e.id !== id) })),

      addCertification: (cert) => set((state) => ({ certifications: [...state.certifications, cert] })),
      updateCertification: (id, data) => set((state) => ({
        certifications: state.certifications.map(c => c.id === id ? { ...c, ...data } : c)
      })),
      removeCertification: (id) => set((state) => ({ certifications: state.certifications.filter(c => c.id !== id) })),

      setSectionOrder: (order) => set({ sectionOrder: order }),
    }),
    {
      name: 'portfolio-cms-storage', // unique name
      storage: createJSONStorage(() => supabaseStorage),
    }
  )
)
