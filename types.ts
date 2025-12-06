import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AudienceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface FormData {
  name: string;
  contact: string;
  message: string;
}