import type { SkillCategory } from "@/types/portfolio"
import { FiCpu, FiLayers, FiCloud, FiShield, FiLayout, FiZap } from "react-icons/fi"
import React from "react"

export const SKILLS: SkillCategory[] = [
  {
    cat: "Core Engines",
    icon: React.createElement(FiCpu),
    items: ["Next.js 16 (App Router)", "React 19", "TypeScript Expert", "Zustand State Engine", "Vite / Webpack", "Module Federation"],
  },
  {
    cat: "Backend & Architecture",
    icon: React.createElement(FiLayers),
    items: ["Node.js / Express", "Prisma ORM", "PostgreSQL", "Redis / BullMQ", "REST & GraphQL", "Microservices Design"],
  },
  {
    cat: "Cloud & DevOps",
    icon: React.createElement(FiCloud),
    items: ["AWS (S3)", "Docker / Containerization", "Vercel / GitHub Actions", "CI/CD Pipelines", ],
  },
  {
    cat: "Security & Protocol",
    icon: React.createElement(FiShield),
    items: ["RBAC Enforcement", "CSP & Security Headers", "AES-256 Encryption", "JWT / OAuth2", "Bot Mitigation", "OWASP Compliance"],
  },
  {
    cat: "Enterprise UI/UX",
    icon: React.createElement(FiLayout),
    items: ["Design System Arch", "Tailwind CSS v4", "i18n Multi-locale", "Performance Audit", "Complex Data Viz", "Accessibility (a11y)"],
  },
  {
    cat: "AI & Automation",
    icon: React.createElement(FiZap),
    items: ["AI Agent Prompting", "LLM Integration", "Automated Workflows", "Browser Automation", "Scripting (Python/Bash)", "Process Optimization"],
  },
]
