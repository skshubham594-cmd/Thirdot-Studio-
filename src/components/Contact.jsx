import { useRef, useState } from 'react';
import { THIRDOT_CONFIG } from '../config.js';
import { serviceOptions } from '../content.js';

const endpoint = String(THIRDOT_CONFIG.contactEndpoint || '').trim();
const businessEmail = String(THIRDOT_CONFIG.contactEmail || '').trim();
const defaultLabel = !endpoint && businessEmail ? 'Open email draft' : 'Send enquiry';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_TIMEOUT_MS = 20000;

export default function Contact() {
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
      name: String(fields.get('name') || '').trim(),
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
    <section className="section contact" id="come-over" aria-labelledby="contact-heading">
      <div className="contact-lead">
        <p className="section-name">Come Over</p>
        <h2 id="contact-heading">Coffee’s<br />on us.</h2>
        <p>Bring an idea. We’ll put the coffee on.</p>
        <img src="/assets/balcony-coffee.webp" alt="Two coffee cups on a sunlit balcony table, concept photography" loading="lazy" width="600" height="400" />
      </div>
      <div className="contact-form-wrap">
        <form ref={formRef} id="enquiry-form" className="enquiry-form" onSubmit={handleSubmit}>
          <div className="form-pair">
            <label htmlFor="name">Your name<input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
            <label htmlFor="email">Email address<input id="email" name="email" autoComplete="email" type="email" required maxLength={254} /></label>
          </div>
          <label htmlFor="service">What can we help you with?
            <select id="service" name="service" required defaultValue="">
              <option value="" disabled>Choose a starting point</option>
              {serviceOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label htmlFor="message">Tell us what’s on your mind<textarea id="message" name="message" required minLength={10} maxLength={5000} rows={4} /></label>
          <div className="honey" aria-hidden="true">
            <label htmlFor="website">Website<input id="website" name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <label className="consent">
            <input type="checkbox" name="consent" required />
            <span>THIRDOT may use my details to respond to this enquiry.</span>
          </label>
          <details className="privacy">
            <summary>How we use your details</summary>
            <p>When you submit an enquiry, the configured enquiry service or your email app receives your name, email and message. This form does not sign you up for marketing. Please do not include sensitive personal information.</p>
          </details>
          <p
            id="form-status"
            className={status && !status.isError ? 'form-error submission-success' : 'form-error'}
            role="status"
            aria-live="polite"
            hidden={!status}
          >
            {status?.text}
          </p>
          <button className="submit-enquiry" type="submit" disabled={submitting} aria-busy={submitting ? 'true' : undefined}>
            <span id="submit-label">{submitting ? 'Sending enquiry…' : defaultLabel}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </section>
  );
}
