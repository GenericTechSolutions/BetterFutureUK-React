/* ============================================================
   Contact — form section for reaching out.
   ============================================================ */

import { useState } from 'react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Netlify SPA form submission — POST to the built-in handler.
    const form = e.currentTarget;
    const get = (key: string) => (form.elements.namedItem(key) as HTMLInputElement)?.value ?? '';

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'Contact',
        name: get('name'),
        email: get('email'),
        phone: get('phone'),
        message: get('message'),
      }).toString(),
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="home-section home-section--alt">
      <h2 className="home-section__title">Contact</h2>
      <p className="home-section__subtitle">
        Get in touch to discuss speaking engagements or training sessions.
      </p>

      {submitted ? (
        <div className="home-card home-card--highlighted" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <p style={{ fontSize: 'var(--text-xlarge)', color: 'var(--text-primary)' }}>
            Thank you! We'll be in touch soon.
          </p>
        </div>
      ) : (
        // netlify attribute tells Netlify this form belongs to the "Contact" submission pipeline.
        // honeypot field blocks bots; CSS keeps it hidden from real users.
        <form
          className="home-form"
          name="Contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* Hidden honeypot — bots fill this, humans skip it */}
          <p style={{ display: 'none' }}>
            <label>Don&#8217;t fill this out: <input name="bot-field" /></label>
          </p>

          <input id="contact-name" type="text"   name="name"     placeholder="Your name"       required />
          <input id="contact-email" type="email"  name="email"    placeholder="Email"           required />
          <input id="contact-phone" type="tel"    name="phone"    placeholder="Contact No" />
          <textarea
            id="contact-message"
            rows={6}
            name="message"
            placeholder="How can we help?"
            required
          />

          <button type="submit" className="home__btn home__btn--primary home__btn--large">Send</button>
        </form>
      )}
    </section>
  );
}
