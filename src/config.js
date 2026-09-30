/* Optional enquiry setup. No API keys or secrets belong in this file. */
export const THIRDOT_CONFIG = Object.freeze({
  // HTTPS endpoint accepting POSTed JSON: name, email, service, message,
  // consent (true) and website (honeypot). It must allow your site's origin.
  // A successful 2xx response means accepted, unless JSON has ok:false.
  // Fill the string here, or set VITE_CONTACT_ENDPOINT in a .env file.
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',

  // Alternative: enter your real business email to open the visitor's email
  // app with a prepared draft. The visitor must send the email themselves.
  // Used only when contactEndpoint is blank.
  // Fill the string here, or set VITE_CONTACT_EMAIL in a .env file.
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || ''
});
