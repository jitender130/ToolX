import React from 'react';
import {
  FileText,
  Calculator,
  Image as ImageIcon,
  AlignLeft,
  Code,
  Wrench,
  LucideIcon
} from 'lucide-react';
import { ToolCategory } from '../types';

export interface CategoryTheme {
  id: ToolCategory;
  name: string;
  badgeName: string;
  icon: LucideIcon;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  iconBg: string;
  iconColor: string;
  cardBorderHover: string;
  cardGlow: string;
  accentText: string;
  topStrip: string;
  lightBg: string;
}

export const CATEGORY_THEMES: Record<ToolCategory, CategoryTheme> = {
  'pdf-tools': {
    id: 'pdf-tools',
    name: 'PDF Tools',
    badgeName: 'PDF Utility',
    icon: FileText,
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-200/80',
    iconBg: 'bg-gradient-to-br from-rose-500 to-red-600',
    iconColor: 'text-rose-600',
    cardBorderHover: 'hover:border-rose-400 hover:shadow-rose-500/10',
    cardGlow: 'from-rose-500/10 to-transparent',
    accentText: 'text-rose-600',
    topStrip: 'bg-gradient-to-r from-rose-500 via-red-500 to-orange-400',
    lightBg: 'bg-rose-50/40',
  },
  'image-tools': {
    id: 'image-tools',
    name: 'Image & Photo Tools',
    badgeName: 'Image & AI',
    icon: ImageIcon,
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-700',
    badgeBorder: 'border-violet-200/80',
    iconBg: 'bg-gradient-to-br from-violet-500 to-indigo-600',
    iconColor: 'text-violet-600',
    cardBorderHover: 'hover:border-violet-400 hover:shadow-violet-500/10',
    cardGlow: 'from-violet-500/10 to-transparent',
    accentText: 'text-violet-600',
    topStrip: 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500',
    lightBg: 'bg-violet-50/40',
  },
  'developer-tools': {
    id: 'developer-tools',
    name: 'Developer Tools',
    badgeName: 'Developer',
    icon: Code,
    gradient: 'from-cyan-500 via-sky-500 to-blue-600',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-700',
    badgeBorder: 'border-sky-200/80',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    iconColor: 'text-sky-600',
    cardBorderHover: 'hover:border-sky-400 hover:shadow-sky-500/10',
    cardGlow: 'from-sky-500/10 to-transparent',
    accentText: 'text-sky-600',
    topStrip: 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500',
    lightBg: 'bg-sky-50/40',
  },
  'calculators': {
    id: 'calculators',
    name: 'Calculators & Math',
    badgeName: 'Calculator',
    icon: Calculator,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200/80',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    iconColor: 'text-emerald-600',
    cardBorderHover: 'hover:border-emerald-400 hover:shadow-emerald-500/10',
    cardGlow: 'from-emerald-500/10 to-transparent',
    accentText: 'text-emerald-600',
    topStrip: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500',
    lightBg: 'bg-emerald-50/40',
  },
  'text-tools': {
    id: 'text-tools',
    name: 'Text & Content Tools',
    badgeName: 'Text Utility',
    icon: AlignLeft,
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    badgeBorder: 'border-amber-200/80',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    iconColor: 'text-amber-600',
    cardBorderHover: 'hover:border-amber-400 hover:shadow-amber-500/10',
    cardGlow: 'from-amber-500/10 to-transparent',
    accentText: 'text-amber-600',
    topStrip: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400',
    lightBg: 'bg-amber-50/40',
  },
  'other-tools': {
    id: 'other-tools',
    name: 'Everyday Utilities',
    badgeName: 'General Tool',
    icon: Wrench,
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-600',
    badgeBg: 'bg-pink-50',
    badgeText: 'text-pink-700',
    badgeBorder: 'border-pink-200/80',
    iconBg: 'bg-gradient-to-br from-fuchsia-500 to-pink-600',
    iconColor: 'text-pink-600',
    cardBorderHover: 'hover:border-pink-400 hover:shadow-pink-500/10',
    cardGlow: 'from-pink-500/10 to-transparent',
    accentText: 'text-pink-600',
    topStrip: 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500',
    lightBg: 'bg-pink-50/40',
  },
};

export const getCategoryTheme = (category: ToolCategory): CategoryTheme => {
  return CATEGORY_THEMES[category] || CATEGORY_THEMES['other-tools'];
};
