"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
  const isValidPhone = (v) => /^\+?[0-9\s().-]{7,20}$/.test(v);

  const nameTrim = name.trim();
  const emailTrim = email.trim();
  const phoneTrim = phone.trim();
  const messageTrim = message.trim();

  const emailValid = isValidEmail(emailTrim);
  const phoneValid = phoneTrim === "" || isValidPhone(phoneTrim);
  const formValid =
    nameTrim.length >= 2 &&
    emailValid &&
    phoneValid &&
    messageTrim.length >= 6;

  async function onSubmit(e) {
    e.preventDefault();
    if (!formValid) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "1b0d0f54-1851-43e7-a0dd-1259cfb5c549",
          subject: `✉️ Nuovo messaggio da ${nameTrim} — Future Frames`,
          from_name: nameTrim,
          email: emailTrim,
          message: `━━━━━━━━━━━━━━━━━━━━
NUOVO MESSAGGIO — FUTURE FRAMES
━━━━━━━━━━━━━━━━━━━━

👤 Nome: ${nameTrim}
📧 Email: ${emailTrim}
📞 Telefono: ${phoneTrim || "Non fornito"}

💬 Messaggio:
${messageTrim}

━━━━━━━━━━━━━━━━━━━━`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Web3Forms error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-[100dvh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-3 sm:px-4 py-10 sm:py-16"
      style={{ backgroundImage: "url(/images/Purple.jpg)" }}
    >
      <section
        aria-label="Contatto"
        className="mt-24 w-full max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-b from-black/90 via-[#050312]/95 to-black/95 px-5 py-8 sm:px-8 sm:py-10 shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
        data-aos="fade-up"
      >
        {/* Titolo */}
        <div className="text-center mb-6">
          <h2 className="font-antonio text-2xl sm:text-3xl md:text-[2.1rem] font-semibold tracking-[0.18em] uppercase text-white">
            Contattaci
          </h2>
          <p className="mt-3 font-montserrat text-xs sm:text-sm text-zinc-300">
            Raccontaci il tuo progetto: ti risponderemo nel più breve tempo
            possibile.
          </p>
        </div>

        {/* Form */}
        <form
          className="mt-4 grid grid-cols-1 gap-4"
          onSubmit={onSubmit}
          noValidate
        >
          {/* Nome */}
          <label className="flex flex-col gap-2 font-montserrat text-xs sm:text-sm text-zinc-200">
            <span className="text-[0.8rem] sm:text-sm tracking-wide">
              Nome <span className="text-violet-300">*</span>
            </span>
            <input
              type="text"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              aria-required="true"
              aria-label="Nome"
              className="rounded-xl border border-violet-500/70 bg-black/60 px-3.5 py-2.5 text-sm sm:text-base text-white shadow-[0_0_18px_rgba(160,32,240,0.55)] outline-none transition focus:border-violet-300 focus:shadow-[0_0_26px_rgba(167,139,250,0.9)]"
            />
          </label>

          {/* Email */}
          <label className="flex flex-col gap-2 font-montserrat text-xs sm:text-sm text-zinc-200">
            <span className="text-[0.8rem] sm:text-sm tracking-wide">
              Email <span className="text-violet-300">*</span>
            </span>
            <input
              type="email"
              name="from_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-label="Email"
              placeholder="nome@esempio.com"
              className="rounded-xl border border-violet-500/70 bg-black/60 px-3.5 py-2.5 text-sm sm:text-base text-white shadow-[0_0_18px_rgba(160,32,240,0.55)] outline-none transition placeholder:text-zinc-500 focus:border-violet-300 focus:shadow-[0_0_26px_rgba(167,139,250,0.9)]"
            />
            {!emailValid && emailTrim.length > 0 && (
              <small className="text-[0.75rem] text-red-400">
                Inserisci un&apos;email valida.
              </small>
            )}
          </label>

          {/* Telefono */}
          <label className="flex flex-col gap-2 font-montserrat text-xs sm:text-sm text-zinc-200">
            <span className="text-[0.8rem] sm:text-sm tracking-wide">
              Telefono <span className="text-zinc-400">(facoltativo)</span>
            </span>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Telefono"
              placeholder="+39 345 0000000"
              className="rounded-xl border border-violet-500/40 bg-black/60 px-3.5 py-2.5 text-sm sm:text-base text-white shadow-[0_0_12px_rgba(160,32,240,0.35)] outline-none transition placeholder:text-zinc-500 focus:border-violet-300 focus:shadow-[0_0_22px_rgba(167,139,250,0.7)]"
            />
            {!phoneValid && phoneTrim.length > 0 && (
              <small className="text-[0.75rem] text-red-400">
                Inserisci un numero di telefono valido.
              </small>
            )}
          </label>

          {/* Messaggio */}
          <label className="flex flex-col gap-2 font-montserrat text-xs sm:text-sm text-zinc-200">
            <span className="text-[0.8rem] sm:text-sm tracking-wide">
              Messaggio <span className="text-violet-300">*</span>
            </span>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minLength={6}
              rows={6}
              aria-required="true"
              aria-label="Messaggio"
              placeholder="Scrivi qui il tuo messaggio..."
              className="min-h-[140px] rounded-xl border border-violet-500/60 bg-black/60 px-3.5 py-3 text-sm sm:text-base text-white shadow-[0_0_20px_rgba(160,32,240,0.45)] outline-none transition placeholder:text-zinc-500 focus:border-violet-300 focus:shadow-[0_0_28px_rgba(167,139,250,0.85)] resize-vertical"
            />
          </label>

          {/* CTA */}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              disabled={!formValid || loading}
              aria-disabled={!formValid || loading}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-600 px-8 py-2.5 text-xs sm:text-sm font-antonio tracking-[0.2em] uppercase text-white shadow-[0_18px_45px_rgba(88,28,135,0.7)] transition hover:shadow-[0_24px_60px_rgba(129,140,248,0.9)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-spinner animate-spin text-xs" />
                  Invio...
                </span>
              ) : "Invia messaggio"}
            </button>
          </div>

          {/* Stato invio */}
          {status === "success" && (
            <p className="mt-4 text-center font-montserrat text-sm text-emerald-400">
              Messaggio inviato. <br />
              Ti risponderemo presto.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center font-montserrat text-sm text-red-400">
              Si è verificato un errore durante l&apos;invio. Riprova tra qualche
              secondo.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}