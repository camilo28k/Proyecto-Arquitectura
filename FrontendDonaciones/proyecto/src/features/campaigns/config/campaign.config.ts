import type {
  CampaignCategory,
  CampaignCategoryConfig,
  CampaignRouteItem,
} from "../types/campaign.types";

const withIdPath = (endpoint: string) => (id: string) => `${endpoint}/id/${id}`;
const directIdPath = (endpoint: string) => (id: string) => `${endpoint}/${id}`;

export const CAMPAIGN_CATEGORIES: Record<
  CampaignCategory,
  CampaignCategoryConfig
> = {
  health: {
    key: "health",
    endpoint: "/health",
    title: "Salud",
    navName: "Health",
    description: "Campañas para tratamientos, medicinas, jornadas y apoyo médico.",
    accent: "bg-rose-500",
    acceptsImage: true,
    deletePath: withIdPath("/health"),
  },

  education: {
    key: "education",
    endpoint: "/education",
    title: "Educación",
    navName: "Education",
    description: "Campañas para becas, útiles, conectividad y espacios de aprendizaje.",
    accent: "bg-sky-500",
    acceptsImage: false,
    deletePath: directIdPath("/education"),
  },

  technology: {
    key: "technology",
    endpoint: "/technology",
    title: "Tecnología",
    navName: "Technology",
    description: "Campañas para equipos, laboratorios, prototipos e inclusión digital.",
    accent: "bg-indigo-500",
    acceptsImage: true,
    deletePath: withIdPath("/technology"),
  },

  art: {
    key: "art",
    endpoint: "/art",
    title: "Arte",
    navName: "Art",
    description: "Campañas para talleres, exposiciones, materiales y proyectos culturales.",
    accent: "bg-amber-500",
    acceptsImage: true,
    deletePath: withIdPath("/art"),
  },

  entrepreneurship: {
    key: "entrepreneurship",
    endpoint: "/entrepreneurship",
    title: "Emprendimiento",
    navName: "Entrepreneurship",
    description: "Campañas para pequeños negocios, capital semilla y proyectos productivos.",
    accent: "bg-emerald-500",
    acceptsImage: true,
    deletePath: withIdPath("/entrepreneurship"),
  },

  environment: {
    key: "environment",
    endpoint: "/environment",
    title: "Medio Ambiente",
    navName: "Environment",
    description: "Campañas de apoyo para el cuidado del medio ambiente.",
    accent: "bg-green-500",
    acceptsImage: true,
    deletePath: withIdPath("/environment"),
  },

  universityproject: {
    key: "universityproject",
    endpoint: "/universityproject",
    title: "Proyectos Universitarios",
    navName: "University Project",
    description: "Campañas de apoyo a proyectos universitarios.",
    accent: "bg-purple-500",
    acceptsImage: true,
    deletePath: withIdPath("/universityproject"),
  },
};

export const CAMPAIGN_ROUTE_ITEMS: CampaignRouteItem[] = [
  { path: "/dashboard", name: "Main Section" },
  { path: "/health", name: CAMPAIGN_CATEGORIES.health.navName },
  { path: "/education", name: CAMPAIGN_CATEGORIES.education.navName },
  { path: "/technology", name: CAMPAIGN_CATEGORIES.technology.navName },
  { path: "/art", name: CAMPAIGN_CATEGORIES.art.navName },
  {
    path: "/entrepreneurship",
    name: CAMPAIGN_CATEGORIES.entrepreneurship.navName,
  },
  { path: "/environment", name: CAMPAIGN_CATEGORIES.environment.navName },
  {
    path: "/universityproject",
    name: CAMPAIGN_CATEGORIES.universityproject.navName,
  },
];