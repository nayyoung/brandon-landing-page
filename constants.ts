// Contact information
export const CONTACT_EMAIL = "brandeauxmedia@gmail.com";

// Email templates
export const EMAIL_SUBJECTS = {
  STRATEGY_CALL: "Real Estate Strategy Call",
  WEBSITE_LEAD: (name: string) => `Quick Question from ${name} (Website Lead)`,
} as const;

export const EMAIL_BODIES = {
  STRATEGY_CALL: `Hi Brandon,

I'd like to schedule a call to talk about my real estate goals.

My name:
Phone number:
Best time to reach me:

Thanks!`,
  WEBSITE_LEAD: (name: string, contact: string, message: string) => 
    `Name: ${name}\nContact Info: ${contact}\n\nMessage:\n${message}`,
} as const;

// Helper function to create mailto links
export const createMailtoLink = (
  email: string,
  subject: string,
  body: string
): string => {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
