import { useRef, useState } from 'react';
import { THIRDOT_CONFIG } from '../config.js';
import { serviceOptions } from '../content.js';

const endpoint = String(THIRDOT_CONFIG.contactEndpoint || '').trim();
const businessEmail = String(THIRDOT_CONFIG.contactEmail || '').trim();
const defaultLabel = !endpoint && businessEmail ? 'Submit (opens your email app)' : 'Submit';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_TIMEOUT_MS = 20000;

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function showStatus(text, isError = true) {
    setStatus({ text, isError });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = formRef.current;
    if (submitting || !form.reportValidity()) return;

    const fields = new FormData(form);
    const data = {
      name: `${String(fields.get('firstName') || '').trim()} ${String(fields.get('lastName') || '').trim()}`.trim(),
      email: String(fields.get('email') || '').trim(),
      service: String(fields.get('service') || ''),
      message: String(fields.get('message') || '').trim(),
      consent: fields.get('consent') === 'on',
      website: String(fields.get('website') || '')
    };

    if (data.name.length < 2 || data.message.length < 10) {
      showStatus('Please enter your name and a message of at least 10 characters.');
      return;
    }
    if (data.website) {
      showStatus('This enquiry could not be submitted.');
      return;
    }

    if (!endpoint) {
      if (!businessEmail) {
        showStatus('This site is not connected to an enquiry service. Configure contactEndpoint or contactEmail in src/config.js. Nothing has been sent.');
        return;
      }
      if (!EMAIL_PATTERN.test(businessEmail)) {
        showStatus('The business email configuration is invalid. Nothing has been sent.');
        return;
      }
      const body = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\n\n${data.message}\n\nConsent to respond: yes`;
      window.location.href = `mailto:${encodeURIComponent(businessEmail)}?subject=${encodeURIComponent('THIRDOT enquiry: ' + data.service)}&body=${encodeURIComponent(body)}`;
      showStatus('Your email app has been asked to open a draft. Send it there to complete your enquiry. Nothing has been sent automatically.', false);
      return;
    }

    let endpointUrl;
    try {
      endpointUrl = new URL(endpoint, window.location.href);
    } catch {
      showStatus('The enquiry endpoint is not configured correctly. Nothing has been sent.');
      return;
    }
    if (!['https:', 'http:'].includes(endpointUrl.protocol)) {
      showStatus('Use an HTTPS enquiry endpoint in src/config.js. Nothing has been sent.');
      return;
    }

    setSubmitting(true);
    setStatus(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(endpointUrl.href, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      const result = (response.headers.get('content-type') || '').includes('application/json') ? await response.json() : null;
      if (!response.ok || result?.ok === false) {
        throw new Error(result?.error || 'The enquiry service did not accept this message. Please try again.');
      }
      showStatus('Your enquiry was submitted. Thank you for starting a conversation.', false);
      form.reset();
    } catch (error) {
      showStatus(
        error.name === 'AbortError'
          ? 'The request timed out. Delivery is unconfirmed; check before submitting again.'
          : error.message || 'Delivery could not be confirmed. Please check your connection.'
      );
    } finally {
      clearTimeout(timer);
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="contact-form__pair">
        <label className="field">
          <span className="field__label">First name</span>
          <input name="firstName" autoComplete="given-name" required minLength={1} maxLength={60} placeholder="Your first name" />
        </label>
        <label className="field">
          <span className="field__label">Last name</span>
          <input name="lastName" autoComplete="family-name" maxLength={60} placeholder="Your last name" />
        </label>
      </div>
      <label className="field">
        <span className="field__label">Email</span>
        <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" />
      </label>
      <label className="field">
        <span className="field__label">Service</span>
        <select name="service" required defaultValue="">
          <option value="" disabled>Choose a starting point</option>
          {serviceOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="field">
        <span className="field__label">Message</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell us about your idea" />
      </label>
      <div className="honey" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>THIRDOT may use my details to respond to this enquiry. Please don’t include sensitive personal information.</span>
      </label>
      <p className={status && !status.isError ? 'form-status form-status--ok' : 'form-status'} role="status" aria-live="polite" hidden={!status}>
        {status?.text}
      </p>
      <button className="contact-form__submit" type="submit" disabled={submitting} aria-busy={submitting ? 'true' : undefined}>
        {submitting ? 'Sending…' : defaultLabel}
      </button>
    </form>
  );
}
