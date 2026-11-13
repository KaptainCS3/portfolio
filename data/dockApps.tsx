import { FiUser, FiFolder, FiZap, FiMail, FiTerminal, FiBookOpen } from "react-icons/fi"
import type { DockApp } from "@/types/portfolio"

export const DOCK_APPS: DockApp[] = [
  { id: "about", icon: <FiUser />, label: "About" },
  { id: "projects", icon: <FiFolder />, label: "Projects" },
  { id: "skills", icon: <FiZap />, label: "Skills" },
  { id: "contact", icon: <FiMail />, label: "Contact" },
  { id: "blog", icon: <FiBookOpen />, label: "Blog" },
  { id: "terminal", icon: <FiTerminal />, label: "Terminal" },
  // { id: "settings", icon: <FiSettings />, label: "Settings" },
  // { id: "snipping-tool", icon: <FiCamera />, label: "Snipping Tool" },
]

