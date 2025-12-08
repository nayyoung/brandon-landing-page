import { describe, it, expect } from 'vitest';
import {
  CONTACT_EMAIL,
  EMAIL_SUBJECTS,
  EMAIL_BODIES,
  createMailtoLink
} from './constants';

describe('constants', () => {
  describe('CONTACT_EMAIL', () => {
    it('should be a valid email address', () => {
      expect(CONTACT_EMAIL).toBe('brandeauxmedia@gmail.com');
      expect(CONTACT_EMAIL).toMatch(/^[\w.-]+@[\w.-]+\.\w+$/);
    });
  });

  describe('EMAIL_SUBJECTS', () => {
    it('should have STRATEGY_CALL as a static string', () => {
      expect(EMAIL_SUBJECTS.STRATEGY_CALL).toBe('Real Estate Strategy Call');
    });

    it('WEBSITE_LEAD should return personalized subject with name', () => {
      expect(EMAIL_SUBJECTS.WEBSITE_LEAD('John Doe')).toBe('Quick Question from John Doe (Website Lead)');
      expect(EMAIL_SUBJECTS.WEBSITE_LEAD('Jane')).toBe('Quick Question from Jane (Website Lead)');
    });
  });

  describe('EMAIL_BODIES', () => {
    it('should have STRATEGY_CALL template with expected content', () => {
      expect(EMAIL_BODIES.STRATEGY_CALL).toContain('schedule a call');
      expect(EMAIL_BODIES.STRATEGY_CALL).toContain('My name:');
      expect(EMAIL_BODIES.STRATEGY_CALL).toContain('Phone number:');
    });

    it('WEBSITE_LEAD should format message body correctly', () => {
      const body = EMAIL_BODIES.WEBSITE_LEAD('John', 'john@example.com', 'I want to buy a house');

      expect(body).toContain('Name: John');
      expect(body).toContain('Contact Info: john@example.com');
      expect(body).toContain('Message:');
      expect(body).toContain('I want to buy a house');
    });
  });
});

describe('createMailtoLink', () => {
  it('should create a basic mailto link with encoded parameters', () => {
    const result = createMailtoLink('test@example.com', 'Hello', 'Message body');

    expect(result).toBe('mailto:test@example.com?subject=Hello&body=Message%20body');
  });

  it('should properly encode special characters in subject', () => {
    const result = createMailtoLink('test@example.com', 'Hello & Goodbye!', 'Body');

    expect(result).toContain('subject=Hello%20%26%20Goodbye!');
  });

  it('should properly encode special characters in body', () => {
    const result = createMailtoLink('test@example.com', 'Subject', 'Line 1\nLine 2');

    expect(result).toContain('body=Line%201%0ALine%202');
  });

  it('should handle the STRATEGY_CALL template correctly', () => {
    const result = createMailtoLink(
      CONTACT_EMAIL,
      EMAIL_SUBJECTS.STRATEGY_CALL,
      EMAIL_BODIES.STRATEGY_CALL
    );

    expect(result).toContain(`mailto:${CONTACT_EMAIL}`);
    expect(result).toContain('subject=Real%20Estate%20Strategy%20Call');
  });

  it('should handle the WEBSITE_LEAD template correctly', () => {
    const name = 'John Doe';
    const contact = 'john@test.com';
    const message = 'Interested in buying';

    const result = createMailtoLink(
      CONTACT_EMAIL,
      EMAIL_SUBJECTS.WEBSITE_LEAD(name),
      EMAIL_BODIES.WEBSITE_LEAD(name, contact, message)
    );

    expect(result).toContain(`mailto:${CONTACT_EMAIL}`);
    expect(result).toContain('John%20Doe');
    expect(result).toContain('john%40test.com');
  });

  it('should handle empty strings', () => {
    const result = createMailtoLink('test@example.com', '', '');

    expect(result).toBe('mailto:test@example.com?subject=&body=');
  });

  it('should handle unicode characters', () => {
    const result = createMailtoLink('test@example.com', 'Héllo Wörld', 'Café ☕');

    expect(result).toContain('mailto:test@example.com');
    // URI encoding should handle unicode
    expect(decodeURIComponent(result)).toContain('Héllo Wörld');
    expect(decodeURIComponent(result)).toContain('Café ☕');
  });
});
