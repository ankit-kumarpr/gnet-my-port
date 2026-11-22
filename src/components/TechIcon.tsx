import React from "react";

export type TechName =
  | "react"
  | "nextjs"
  | "nodejs"
  | "typescript"
  | "tailwind"
  | "shopify"
  | "wordpress"
  | "laravel"
  | "postgresql"
  | "threejs"
  | "python"
  | "supabase"
  | "graphql"
  | "redis"
  | "aws"
  | "docker"
  | "stripe";

interface TechIconProps {
  name: TechName | string;
  className?: string;
  size?: number;
}

export const TECH_ICONS: Record<string, { label: string; svg: (size: number) => React.ReactNode }> = {
  react: {
    label: "React",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D6A0" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D6A0" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D6A0" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#00D6A0" />
      </svg>
    ),
  },
  nextjs: {
    label: "Next.js",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#0C1721" stroke="#F5F8FA" strokeWidth="1.5" />
        <path d="M8 8V16M16 8L9.5 16.5" stroke="#F5F8FA" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 8V12" stroke="#F5F8FA" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  nodejs: {
    label: "Node.js",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z"
          stroke="#68A063"
          strokeWidth="1.5"
          fill="#68A063"
          fillOpacity="0.12"
        />
        <path d="M12 7V17M12 12L17 9M12 12L7 9" stroke="#68A063" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  typescript: {
    label: "TypeScript",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#3178C6" fillOpacity="0.15" stroke="#3178C6" strokeWidth="1.5" />
        <path d="M6 9H11M8.5 9V16" stroke="#3178C6" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14 16C16 16 17.5 15.2 17.5 13.8C17.5 12 14.5 12 14.5 10.8C14.5 10 15.5 9.5 16.8 9.5C17.5 9.5 18 9.7 18 9.7" stroke="#3178C6" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  tailwind: {
    label: "Tailwind CSS",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 6C9.5 6 8 7.5 7.5 10.5C8.5 9 9.75 8.5 11.25 9C12.5 9.4 13.25 10.5 14.25 11.75C15.5 13.2 17 15 20.5 15C23 15 24.5 13.5 25 10.5C24 12 22.75 12.5 21.25 12C20 11.6 19.25 10.5 18.25 9.25C17 7.8 15.5 6 12 6ZM3.5 13.5C1 13.5 -0.5 15 -1 18C0 16.5 1.25 16 2.75 16.5C4 16.9 4.75 18 5.75 19.25C7 20.7 8.5 22.5 12 22.5C14.5 22.5 16 21 16.5 18C15.5 19.5 14.25 20 12.75 19.5C11.5 19.1 10.75 18 9.75 16.75C8.5 15.3 7 13.5 3.5 13.5Z"
          fill="#38BDF8"
          transform="scale(0.85) translate(2, 0)"
        />
      </svg>
    ),
  },
  shopify: {
    label: "Shopify",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M17.5 5.5L16 6L14 3.5L10 4.5L8.5 6L6.5 5.5L4 21L19.5 21L17.5 5.5Z"
          stroke="#95BF47"
          strokeWidth="1.5"
          fill="#95BF47"
          fillOpacity="0.12"
        />
        <path d="M12 9C10.5 9 10 10.2 10 11.2C10 13 14 13.5 14 15.5C14 16.8 12.8 17.5 11.5 17.5C10 17.5 9 16.8 9 16.8" stroke="#95BF47" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  wordpress: {
    label: "WordPress",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#21759B" strokeWidth="1.5" fill="#21759B" fillOpacity="0.12" />
        <path d="M4 12L8.5 20M12 4V10L9.5 18M14.5 18L12 10L15.5 4M19.5 12L15 20" stroke="#21759B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  laravel: {
    label: "Laravel",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L4 7V17L12 22L20 17V7L12 2Z"
          stroke="#FF2D20"
          strokeWidth="1.5"
          fill="#FF2D20"
          fillOpacity="0.12"
        />
        <path d="M12 6L7 9.5V14.5L12 18L17 14.5V9.5L12 6Z" stroke="#FF2D20" strokeWidth="1.3" />
      </svg>
    ),
  },
  postgresql: {
    label: "PostgreSQL",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="8" stroke="#336791" strokeWidth="1.5" fill="#336791" fillOpacity="0.12" />
        <path d="M8 10C8 8 10 7 12 7C14 7 16 8 16 10C16 12 14 13 12 13C10 13 8 14 8 16C8 17.5 10 18 12 18" stroke="#336791" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  threejs: {
    label: "Three.js",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 3L3 20H21L12 3Z" stroke="#F5F8FA" strokeWidth="1.5" fill="#F5F8FA" fillOpacity="0.1" />
        <path d="M12 8L7.5 17H16.5L12 8Z" stroke="#00D6A0" strokeWidth="1.3" />
      </svg>
    ),
  },
  python: {
    label: "Python",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M11.5 3C7.5 3 7.5 4.8 7.5 4.8V6.8H12V7.8H5C3 7.8 3 10.2 3 10.2C3 12.2 4.2 12.2 4.2 12.2H6V10.8C6 9.2 7.2 9.2 7.2 9.2H11.8C13 9.2 13 8 13 8V4.8C13 4.8 13.5 3 11.5 3Z"
          fill="#3776AB"
        />
        <path
          d="M12.5 21C16.5 21 16.5 19.2 16.5 19.2V17.2H12V16.2H19C21 16.2 21 13.8 21 13.8C21 11.8 19.8 11.8 19.8 11.8H18V13.2C18 14.8 16.8 14.8 16.8 14.8H12.2C11 14.8 11 16 11 16V19.2C11 19.2 10.5 21 12.5 21Z"
          fill="#FFD43B"
        />
        <circle cx="9.5" cy="4.8" r="0.8" fill="#FFF" />
        <circle cx="14.5" cy="19.2" r="0.8" fill="#FFF" />
      </svg>
    ),
  },
  supabase: {
    label: "Supabase",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M12.5 3.5L4 14.5H12L11 20.5L19.5 9.5H11.5L12.5 3.5Z"
          stroke="#3ECF8E"
          strokeWidth="1.5"
          fill="#3ECF8E"
          fillOpacity="0.15"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  graphql: {
    label: "GraphQL",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="#E10098" strokeWidth="1.4" />
        <circle cx="12" cy="2" r="1.5" fill="#E10098" />
        <circle cx="20.66" cy="7" r="1.5" fill="#E10098" />
        <circle cx="20.66" cy="17" r="1.5" fill="#E10098" />
        <circle cx="12" cy="22" r="1.5" fill="#E10098" />
        <circle cx="3.34" cy="17" r="1.5" fill="#E10098" />
        <circle cx="3.34" cy="7" r="1.5" fill="#E10098" />
      </svg>
    ),
  },
  redis: {
    label: "Redis",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 4L3 8.5L12 13L21 8.5L12 4Z" fill="#DC382D" fillOpacity="0.2" stroke="#DC382D" strokeWidth="1.5" />
        <path d="M3 12.5L12 17L21 12.5" stroke="#DC382D" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 16.5L12 21L21 16.5" stroke="#DC382D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  aws: {
    label: "AWS Cloud",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 14C4.5 14 3 12.8 3 11C3 9.5 4.2 8.3 5.6 8.1C6.2 5.8 8.2 4 10.6 4C13.4 4 15.6 6 15.9 8.7C17.7 8.9 19 10.3 19 12.1C19 14.2 17.3 15.8 15.2 15.8"
          stroke="#FF9900"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M4 19C8 21.5 16 21.5 20 18.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.5 17L20.5 18.5L18.5 20" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  docker: {
    label: "Docker",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="7" y="10" width="3" height="3" rx="0.5" fill="#2496ED" />
        <rect x="11" y="10" width="3" height="3" rx="0.5" fill="#2496ED" />
        <rect x="15" y="10" width="3" height="3" rx="0.5" fill="#2496ED" />
        <rect x="11" y="6" width="3" height="3" rx="0.5" fill="#2496ED" />
        <path d="M3 13C4 13 4.5 13.5 5.5 13.5C6.5 13.5 7 13 8 13C9 13 9.5 13.5 10.5 13.5C12 13.5 13 13 14 13C16 13 17 14 18.5 14C20 14 21 13 22 13.5C21.5 17 18 19 12 19C5.5 19 3.5 16 3 13Z" stroke="#2496ED" strokeWidth="1.4" fill="#2496ED" fillOpacity="0.12" />
      </svg>
    ),
  },
  stripe: {
    label: "Stripe",
    svg: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3.5" fill="#635BFF" fillOpacity="0.15" stroke="#635BFF" strokeWidth="1.5" />
        <path d="M10 14.5C10 15.3 10.8 15.8 11.8 15.8C13.2 15.8 14 15 14 14.2C14 12.5 9.8 12.8 9.8 10.8C9.8 9.8 10.8 9 12 9C13 9 13.8 9.4 14 10.2" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

export default function TechIcon({ name, className = "", size = 18 }: TechIconProps) {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const icon = TECH_ICONS[normalized] || TECH_ICONS[name] || TECH_ICONS.react;

  return (
    <span
      className={`inline-flex items-center justify-center transition-transform hover:scale-115 duration-200 ${className}`}
      title={icon.label}
    >
      {icon.svg(size)}
    </span>
  );
}
