export const mockParticipants = [
  {
    id: '1',
    campaignId: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    linkedin: 'https://linkedin.com/in/jeandupont',
    avatar: null,
    experience: '7 Years',
    currentPosition: 'Senior Frontend Developer',
    currentCompany: 'TechCorp',
    location: 'Paris, France',
    matchScore: 88,
    status: 'Interview Scheduled',
    appliedAt: '2024-01-11T10:00:00Z',
    aiSummary: 'Jean is a strong technical lead with deep expertise in the Vue ecosystem. He matches the seniority requirement perfectly but lacks recent AWS certification.',
    strengths: ['Vue.js', 'Team Lead', 'SaaS Experience', 'Agile Methodology', 'Mentorship'],
    missingSkills: ['AWS Certification'],
    resumeUrl: '#',
    experiences: [
      { id: 101, role: 'Senior Frontend Developer', company: 'TechCorp', date: '2021 - Present', description: 'Lead dev sur la refonte de la plateforme SaaS. Gestion d\'une équipe de 5 développeurs Vue.js.' },
      { id: 102, role: 'Frontend Developer', company: 'WebAgency Paris', date: '2018 - 2021', description: 'Développement de sites e-commerce complexes. Mise en place de Nuxt.js.' },
      { id: 103, role: 'Junior Web Developer', company: 'StartUp Nation', date: '2016 - 2018', description: 'Maintenance et évolution du dashboard client.' }
    ],
    educations: [
      { id: 201, degree: 'Master Ingénierie Web', school: 'Hetic', date: '2016' },
      { id: 202, degree: 'Licence Informatique', school: 'Université Paris Descartes', date: '2014' }
    ],
    otherSkills: ['Jira', 'GitLab CI', 'Anglais (C1)', 'Scrum']
  },
  {
    id: '2',
    campaignId: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 415 555 0123',
    linkedin: 'https://linkedin.com/in/sarahchen',
    avatar: null,
    experience: '5 Years',
    currentPosition: 'Frontend Engineer',
    currentCompany: 'StartupXYZ',
    location: 'San Francisco, CA',
    matchScore: 92,
    status: 'New Application',
    appliedAt: '2024-01-12T09:30:00Z',
    aiSummary: 'Sarah is an exceptional Vue.js developer with a strong portfolio of SaaS products. Her technical skills are outstanding and she has experience scaling applications to millions of users.',
    strengths: ['Vue.js', 'TypeScript', 'Performance Optimization', 'Testing', 'UI/UX'],
    missingSkills: [],
    resumeUrl: '#',
    experiences: [
      { id: 101, role: 'Frontend Engineer', company: 'StartupXYZ', date: '2020 - Present', description: 'Optimisation des performances Core Web Vitals. Migration de Vue 2 vers Vue 3 Composition API.' },
      { id: 102, role: 'UI Developer', company: 'Creative Digital', date: '2018 - 2020', description: 'Création d\'un Design System complet utilisé par 3 équipes produits.' }
    ],
    educations: [
      { id: 201, degree: 'B.S. Computer Science', school: 'Stanford University', date: '2018' }
    ],
    otherSkills: ['Webpack', 'Vite', 'Figma', 'Mandarin (Native)']
  },
  {
    id: '3',
    campaignId: '1',
    name: 'Marcus Johnson',
    email: 'marcus.j@email.com',
    phone: '+44 20 7123 4567',
    linkedin: 'https://linkedin.com/in/marcusjohnson',
    avatar: null,
    experience: '6 Years',
    currentPosition: 'Lead Frontend Developer',
    currentCompany: 'Digital Solutions Ltd',
    location: 'London, UK',
    matchScore: 85,
    status: 'Under Review',
    appliedAt: '2024-01-10T14:15:00Z',
    aiSummary: 'Marcus brings solid Vue.js experience and has led multiple successful projects. He demonstrates strong architectural thinking and has experience with large-scale applications.',
    strengths: ['Vue.js', 'Architecture Design', 'Code Review', 'CI/CD', 'Documentation'],
    missingSkills: ['Pinia', 'Vite'],
    resumeUrl: '#',
    experiences: [
      { id: 101, role: 'Lead Frontend Developer', company: 'Digital Solutions Ltd', date: '2021 - Present', description: 'Définition de l\'architecture micro-frontend. Supervision des choix techniques.' },
      { id: 102, role: 'Senior Developer', company: 'FinTech Co', date: '2019 - 2021', description: 'Développement d\'interfaces bancaires sécurisées. Utilisation intensive de Vuex.' },
      { id: 103, role: 'Fullstack Dev', company: 'Agency UK', date: '2017 - 2019', description: 'Développement Laravel + Vue.js pour divers clients.' }
    ],
    educations: [
      { id: 201, degree: 'MSc Software Engineering', school: 'Imperial College London', date: '2017' }
    ],
    otherSkills: ['Docker', 'AWS', 'Micro-frontends', 'French (Basic)']
  },
  {
    id: '4',
    campaignId: '1',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 305 555 0198',
    linkedin: 'https://linkedin.com/in/emilyrodriguez',
    avatar: null,
    experience: '8 Years',
    currentPosition: 'Senior Software Engineer',
    currentCompany: 'MegaCorp',
    location: 'Miami, FL',
    matchScore: 79,
    status: 'New Application',
    appliedAt: '2024-01-09T11:45:00Z',
    aiSummary: 'Emily has extensive frontend experience but primarily with React. Her willingness to transition to Vue.js and strong fundamental skills make her a viable candidate with some training.',
    strengths: ['React', 'JavaScript', 'Team Collaboration', 'Problem Solving', 'Accessibility'],
    missingSkills: ['Vue.js', 'Vue Ecosystem'],
    resumeUrl: '#',
    experiences: [
      { id: 101, role: 'Senior Software Engineer', company: 'MegaCorp', date: '2019 - Present', description: 'Maintenance d\'une application React legacy. Refactoring et amélioration de l\'accessibilité (WCAG).' },
      { id: 102, role: 'Frontend Developer', company: 'Sunny Side Apps', date: '2016 - 2019', description: 'Développement d\'applications mobiles avec React Native.' }
    ],
    educations: [
      { id: 201, degree: 'B.S. Computer Science', school: 'University of Miami', date: '2015' }
    ],
    otherSkills: ['Redux', 'Next.js', 'Spanish (Native)', 'Accessibility Expert']
  },
  {
    id: '5',
    campaignId: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+971 50 123 4567',
    linkedin: 'https://linkedin.com/in/ahmedhassan',
    avatar: null,
    experience: '9 Years',
    currentPosition: 'Engineering Manager',
    currentCompany: 'Tech Innovations',
    location: 'Dubai, UAE',
    matchScore: 90,
    status: 'Interview Scheduled',
    appliedAt: '2024-01-08T08:20:00Z',
    aiSummary: 'Ahmed combines technical excellence with leadership experience. He has built and led frontend teams and has deep expertise in Vue.js and modern development practices.',
    strengths: ['Vue.js', 'Team Management', 'System Design', 'Microservices', 'Stakeholder Communication'],
    missingSkills: [],
    resumeUrl: '#',
    experiences: [
      { id: 101, role: 'Engineering Manager', company: 'Tech Innovations', date: '2020 - Present', description: 'Gestion d\'une équipe de 12 ingénieurs. Recrutement et mentoring.' },
      { id: 102, role: 'Team Lead Frontend', company: 'Dubai Software House', date: '2017 - 2020', description: 'Lead technique sur des projets gouvernementaux à fort trafic.' },
      { id: 103, role: 'Senior Developer', company: 'Global Corp', date: '2014 - 2017', description: 'Développement fullstack.' }
    ],
    educations: [
      { id: 201, degree: 'MBA Management', school: 'University of Dubai', date: '2019' },
      { id: 202, degree: 'B.S. Software Engineering', school: 'Cairo University', date: '2014' }
    ],
    otherSkills: ['Leadership', 'Strategic Planning', 'Arabic (Native)', 'Python']
  },
  {
    id: '6',
    campaignId: '2',
    name: 'Olivia Martinez',
    email: 'olivia.m@email.com',
    phone: '+1 212 555 0147',
    linkedin: 'https://linkedin.com/in/oliviamartinez',
    avatar: null,
    experience: '4 Years',
    currentPosition: 'Product Designer',
    currentCompany: 'Creative Studio',
    location: 'New York, NY',
    matchScore: 88,
    status: 'New Application',
    appliedAt: '2024-01-11T16:50:00Z',
    aiSummary: 'Olivia has a strong portfolio showcasing user-centered design and extensive experience with design systems. Her Figma expertise and research skills are exceptional.',
    strengths: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Interaction Design'],
    missingSkills: ['Motion Design'],
    resumeUrl: '#',
    experiences: [
      { id: 101, role: 'Product Designer', company: 'Creative Studio', date: '2021 - Present', description: 'Conception de design systems pour des clients SaaS. Recherche utilisateur et tests A/B.' },
      { id: 102, role: 'UX/UI Designer', company: 'Freelance', date: '2019 - 2021', description: 'Création de maquettes pour startups et applications mobiles.' }
    ],
    educations: [
      { id: 201, degree: 'Bachelor in Design', school: 'Parsons School of Design', date: '2019' }
    ],
    otherSkills: ['Sketch', 'Adobe Creative Cloud', 'Protopie', 'HTML/CSS Basics']
  }
]