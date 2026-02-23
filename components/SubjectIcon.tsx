import {
  Sigma,
  Scale,
  Atom,
  PenLine,
  BookOpen,
  Dna,
  FlaskConical,
  Landmark,
  BookMarked,
  Globe,
  BarChart3,
  Languages,
  Diamond,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Sigma,
  Scale,
  Atom,
  PenLine,
  BookOpen,
  Dna,
  FlaskConical,
  Landmark,
  BookMarked,
  Globe,
  BarChart3,
  Languages,
};

export function SubjectIcon({
  name,
  size = 24,
  className,
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  const Icon = (name && ICON_MAP[name]) || Diamond;
  return <Icon size={size} className={className} aria-hidden />;
}
