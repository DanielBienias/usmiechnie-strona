import React, { useState } from 'react';
import { StickyCta } from './components/StickyCta';
import { BottomSheet } from './components/BottomSheet';
import { Icon } from './components/Icon';
import { BLOG } from './content/blog';
import {
  CLINIC_NAME, SERVICES, TEAM, REVIEWS,
  CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL, CLINIC_REVIEWS_URL
} from './constants';

type Sheet = 'none' | 'services' | 'team' | 'contact' | 'reviews' | 'booking' | `blog:${string}`;

const HOURS = [
  { d: 'Wtorek', h: '9:00 – 19:00' },
  { d: 'Środa', h: '9:00 – 17:00' },
  { d: 'Piątek', h: '9:00 – 19:00' },
];

const MAP_EMBED = 'https://maps.google.com/maps?q=U%C5%9Bmiechnie%20Stomatologia%20Katarzyna%20Baziuk%20ul.%20Boles%C5%82awa%20Le%C5%9Bmiana%20U1/A1%20Brzeg%20Dolny&t=&z=15&ie=UTF8&iwloc=&output=embed';
const MAP_NAV = 'https://www.google.com/maps/dir/?api=1&destination=U%C5%9Bmiechnie+Stomatologia+Brzeg+Dolny';
const TEL = `tel:${CLINIC_PHONE.replace(/\s/g, '')}`;

/* ───────── małe elementy ───────── */

const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`block text-[11px] font-semibold tracking-[0.2em] uppercase text-clinic-primaryDark ${className}`}>{children}</span>
);

const Stars: React.FC<{ n: number; size?: number }> = ({ n, size = 12 }) => (
  <span className="flex gap-0.5 text-clinic-primary">
    {Array.from({ length: n }).map((_, i) => <Icon key={i} name="Star" size={size} className="fill-current" />)}
  </span>
);

const ReviewCard: React.FC<{ r: typeof REVIEWS[number] }> = ({ r }) => (
  <figure className="col-span-2 bg-clinic-paper rounded-3xl px-6 pt-5 pb-6 border border-clinic-line">
    <div className="flex items-center justify-between mb-3">
      <span className="font-serif text-4xl leading-none text-clinic-primary">“</span>
      <Stars n={r.rating} />
    </div>
    <blockquote className="font-serif text-[0.98rem] leading-relaxed text-clinic-text">{r.content}</blockquote>
    <figcaption className="mt-4 pt-4 border-t border-clinic-line flex items-center justify-between">
      <span className="text-sm font-semibold">{r.author}</span>
      <span className="text-[11px] text-clinic-subtext">{r.date}</span>
    </figcaption>
  </figure>
);

/* ───────── aplikacja ───────── */

const App: React.FC = () => {
  const [sheet, setSheet] = useState<Sheet>('none');
  const close = () => setSheet('none');

  // cennik
  const categories = Array.from(new Set(SERVICES.map(s => s.category)));
  const [openCat, setOpenCat] = useState<string | null>(categories[0]);
  const [query, setQuery] = useState('');
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
  const filtered = query ? SERVICES.filter(s => norm(s.title).includes(norm(query))) : null;

  // zespół
  const [member, setMember] = useState<string | null>(null);

  // rezerwacja
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', date: '' });
  const openBooking = () => { setStep(0); setSheet('booking'); };
  const nearest = () => {
    const d = new Date(); d.setDate(d.getDate() + 2);
    setForm({ ...form, date: d.toISOString().split('T')[0] }); setStep(3);
  };

  const blogPost = sheet.startsWith('blog:') ? BLOG.find(b => b.id === sheet.slice(5)) : undefined;

  return (
    <div className="bg-clinic-bg min-h-screen text-clinic-text">
      <div className="max-w-lg mx-auto bg-clinic-bg min-h-screen relative">

        <main>
          {/* ── HERO ── */}
          <section className="relative">
            <img src="/img/hero-zespol.jpg" alt="Zespół gabinetu Uśmiechnie przed wejściem" className="w-full h-auto block" />
            <div className="absolute bottom-[40%] left-10 w-[55%]">
              <p className="text-white font-serif italic text-[0.95rem] leading-snug [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
                Tworzymy uśmiechy,<br />które niosą radość.
              </p>
            </div>
          </section>

          {/* ── INTRO ── */}
          <section className="px-6 pt-7 pb-4 animate-rise">
            <div className="space-y-3">
              <a
                href={TEL}
                className="h-14 w-full rounded-full bg-clinic-text text-white flex items-center justify-between pl-2 pr-6 shadow-soft active:scale-[0.98] transition-transform"
              >
                <span className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-clinic-primary flex items-center justify-center">
                    <Icon name="Phone" size={16} className="text-white" />
                  </span>
                  <span className="text-sm font-semibold">Zadzwoń</span>
                </span>
                <span className="font-serif text-lg tracking-wide">{CLINIC_PHONE}</span>
              </a>
              <button
                onClick={openBooking}
                className="h-14 w-full rounded-full bg-clinic-paper border border-clinic-text/10 text-clinic-text flex items-center justify-between pl-2 pr-6 active:bg-clinic-sand transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-clinic-sand flex items-center justify-center">
                    <Icon name="Calendar" size={16} className="text-clinic-primaryDark" />
                  </span>
                  <span className="text-sm font-semibold">Umów wizytę</span>
                </span>
              </button>
            </div>
          </section>

          {/* ── WARTOŚCI: mozaika 2×2 ── */}
          <section className="px-6 pt-8 pb-2 animate-rise delay-1">
            <div className="grid gap-4">
              {[
                { img: '/img/wartosc-komfort.jpg', t: 'Komfortowo', d: 'Wygodne fotele i gabinet, w którym można odetchnąć.' },
                { img: '/img/wartosc-bezbolesnie.jpg', t: 'Bezboleśnie', d: 'Znieczulenie, które działa zanim zdążysz się zestresować.' },
                { img: '/img/wartosc-bez-leku.jpg', t: 'Bez lęku', d: 'Twoja muzyka, ciemne okulary, gest „stop”.' },
              ].map(v => (
                <figure key={v.t} className="relative aspect-square rounded-4xl overflow-hidden bg-clinic-sand">
                  <img src={v.img} alt={v.t} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
                  <figcaption className="absolute left-6 right-6 bottom-6 text-white">
                    <span className="block font-sans font-semibold text-[1.55rem] leading-none tracking-tight">{v.t}</span>
                    <span className="block font-sans text-[13px] leading-snug mt-2 text-white/90 max-w-[26ch]">{v.d}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* ── NAWIGACJA: przyciski jak w sekcji akcji ── */}
          <section className="px-6 pt-10 animate-rise delay-2">
            <h2 className="font-serif font-light text-[1.9rem] leading-none tracking-tight text-clinic-text mb-5">Poznaj gabinet</h2>
            <div className="space-y-3">
              {[
                { icon: 'Users', t: 'Zespół', sheet: 'team' as Sheet },
                { icon: 'CreditCard', t: 'Cennik', sheet: 'services' as Sheet },
                { icon: 'MapPin', t: 'Kontakt', sheet: 'contact' as Sheet },
              ].map(n => (
                <button
                  key={n.t}
                  onClick={() => setSheet(n.sheet)}
                  className="h-14 w-full rounded-full bg-clinic-paper border border-clinic-text/10 text-clinic-text flex items-center justify-between pl-2 pr-6 active:bg-clinic-sand transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-clinic-sand flex items-center justify-center">
                      <Icon name={n.icon} size={16} className="text-clinic-primaryDark" />
                    </span>
                    <span className="text-sm font-semibold">{n.t}</span>
                  </span>
                  <Icon name="ChevronDown" size={16} className="-rotate-90 text-clinic-subtext" />
                </button>
              ))}
            </div>
          </section>

          {/* ── POZNAJ GABINET ── */}
          <section className="px-6 pt-4">
            <div className="grid gap-4">
              <figure className="relative aspect-[4/3] rounded-4xl overflow-hidden bg-clinic-sand">
                <img src="/img/gabinet-poczekalnia.jpg" alt="Poczekalnia" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
                <figcaption className="absolute left-6 right-6 bottom-6 text-white">
                  <span className="block font-sans font-semibold text-[1.55rem] leading-none tracking-tight">Poczekalnia</span>
                  <span className="block font-sans text-[13px] leading-snug mt-2 text-white/90 max-w-[26ch]">Spokojne miejsce, w którym nikt się nie spieszy.</span>
                </figcaption>
              </figure>
              <figure className="relative aspect-[4/5] rounded-4xl overflow-hidden bg-clinic-sand">
                <img src="/img/gabinet-mikroskop.jpg" alt="W powiększeniu" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
                <figcaption className="absolute left-6 right-6 bottom-6 text-white">
                  <span className="block font-sans font-semibold text-[1.55rem] leading-none tracking-tight">W powiększeniu</span>
                  <span className="block font-sans text-[13px] leading-snug mt-2 text-white/90 max-w-[26ch]">Mikroskop przy każdym zabiegu, nie tylko w trudnych przypadkach.</span>
                </figcaption>
              </figure>
              <figure className="relative aspect-[4/5] rounded-4xl overflow-hidden bg-clinic-sand">
                <img src="/img/gabinet-tomograf.jpg" alt="Tomograf" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
                <figcaption className="absolute left-6 right-6 bottom-6 text-white">
                  <span className="block font-sans font-semibold text-[1.55rem] leading-none tracking-tight">Tomograf</span>
                  <span className="block font-sans text-[13px] leading-snug mt-2 text-white/90 max-w-[26ch]">Pantomogram i tomografia CBCT na miejscu, bez wysyłania na badania.</span>
                </figcaption>
              </figure>
              <figure className="relative aspect-square rounded-4xl overflow-hidden bg-clinic-sand">
                <img src="/img/gabinet-skan3d.jpg" alt="Skany 3D" className="w-full h-full object-cover object-right" />
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />
                <figcaption className="absolute left-6 right-6 bottom-6 text-white">
                  <span className="block font-sans font-semibold text-[1.55rem] leading-none tracking-tight">Skany 3D</span>
                  <span className="block font-sans text-[13px] leading-snug mt-2 text-white/90 max-w-[26ch]">Skaner wewnątrzustny zamiast wycisków. Szybko, dokładnie i bez odruchu wymiotnego.</span>
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ── DENTYSTKI + OPINIE + ZDJĘCIA ── */}
          <section className="px-6 pt-14 animate-rise">
            <h2 className="font-serif font-light text-[2.1rem] leading-[1.05] tracking-tight text-clinic-text">
              Dentystki, do których<br /><em className="font-normal not-italic text-clinic-primaryDark">chce się</em> wracać.
            </h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="font-serif text-3xl leading-none">5.0</span>
                <span className="flex flex-col"><Stars n={5} /><span className="text-[11px] text-clinic-subtext mt-0.5 flex items-center gap-1"><Icon name="Google" size={11} /> Opinie pacjentów</span></span>
              </span>
              <button onClick={() => setSheet('reviews')} className="text-xs font-semibold underline underline-offset-4">Wszystkie</button>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {/* zdjęcie szerokie */}
              <div className="col-span-2 aspect-[16/10] rounded-3xl overflow-hidden bg-clinic-sand">
                <img src="/img/mozaika-13.jpg" alt="Praca przy mikroskopie" className="w-full h-full object-cover" />
              </div>

              {/* opinia 1 */}
              {REVIEWS[0] && <ReviewCard r={REVIEWS[0]} />}

              {/* dwa pionowe */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-clinic-sand">
                <img src="/img/mozaika-16.jpg" alt="Lekarka w gabinecie" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-clinic-sand">
                <img src="/img/mozaika-14.jpg" alt="Omawianie zdjęcia RTG" className="w-full h-full object-cover" />
              </div>

              {/* opinia 2 */}
              {REVIEWS[1] && <ReviewCard r={REVIEWS[1]} />}

              {/* zdjęcie szerokie */}
              <div className="col-span-2 aspect-[16/10] rounded-3xl overflow-hidden bg-clinic-sand">
                <img src="/img/mozaika-15.jpg" alt="Zespół w gabinecie" className="w-full h-full object-cover" />
              </div>

              {/* opinia 3 */}
              {REVIEWS[2] && <ReviewCard r={REVIEWS[2]} />}
            </div>
          </section>

          {/* ── STOPKA ── */}
          <footer className="mt-14 bg-clinic-text text-white rounded-t-4xl px-6 pt-10 pb-32">
            <span className="font-serif text-3xl tracking-tight">uśmiechnie</span>
            <p className="text-white/55 text-sm mt-1">stomatologia · Katarzyna Baziuk</p>

            <div className="mt-8 grid gap-6">
              <div className="flex gap-4">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-clinic-primary shrink-0"><Icon name="MapPin" size={16} /></span>
                <div className="flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">Adres</span>
                  <p className="font-serif text-lg leading-snug">{CLINIC_ADDRESS}</p>
                  <a href={MAP_NAV} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-clinic-primary">
                    Nawiguj <Icon name="ChevronDown" size={12} className="-rotate-90" />
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-clinic-primary shrink-0"><Icon name="Calendar" size={16} /></span>
                <div className="flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">Godziny</span>
                  <dl className="font-serif text-base space-y-1">
                    {HOURS.map(h => <div key={h.d} className="flex justify-between"><dt>{h.d}</dt><dd className="text-white/80">{h.h}</dd></div>)}
                  </dl>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-clinic-primary shrink-0"><Icon name="Phone" size={16} /></span>
                <div className="flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">Telefon</span>
                  <a href={TEL} className="font-serif text-lg">{CLINIC_PHONE}</a>
                  <a href={`mailto:${CLINIC_EMAIL}`} className="block text-sm text-white/70 mt-0.5">{CLINIC_EMAIL}</a>
                </div>
              </div>
            </div>

            <p className="mt-10 pt-6 border-t border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/35">© 2025 {CLINIC_NAME}</p>
          </footer>
        </main>

        <StickyCta onBookClick={openBooking} />

        {/* ───── ARKUSZE ───── */}

        <BottomSheet open={sheet === 'services'} onClose={close} eyebrow="Cennik" title="Zabiegi i ceny">
          <div className="relative mb-4">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Szukaj, np. korona, implant…"
              className="w-full h-12 rounded-full bg-clinic-sand/70 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-clinic-primary"
            />
            <Icon name="Sparkles" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-clinic-subtext" />
          </div>
          <p className="text-[11px] text-clinic-subtext mb-4">Ceny mają charakter informacyjny. Ostateczny koszt ustalamy po konsultacji.</p>

          {filtered ? (
            <ul className="divide-y divide-clinic-line">
              {filtered.length === 0 && <li className="py-8 text-center text-sm text-clinic-subtext">Brak wyników.</li>}
              {filtered.map(s => (
                <li key={s.id} className="py-3 flex justify-between gap-4">
                  <span className="text-sm leading-snug"><span className="block">{s.title}</span><span className="text-[11px] text-clinic-subtext">{s.category}</span></span>
                  <span className="text-sm font-semibold whitespace-nowrap">{s.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            categories.map(c => {
              const isOpen = openCat === c;
              const items = SERVICES.filter(s => s.category === c);
              return (
                <div key={c} className="border-t border-clinic-line">
                  <button onClick={() => setOpenCat(isOpen ? null : c)} className="w-full py-4 flex items-center justify-between text-left">
                    <span className="font-serif text-xl">{c}</span>
                    <span className="flex items-center gap-3 text-xs text-clinic-subtext">{items.length}<Icon name="ChevronDown" size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} /></span>
                  </button>
                  {isOpen && (
                    <ul className="pb-4 animate-fade">
                      {items.map(s => (
                        <li key={s.id} className="py-2.5 flex justify-between gap-4 border-t border-clinic-line/60">
                          <span className="text-sm leading-snug">{s.title}</span>
                          <span className="text-sm font-semibold whitespace-nowrap">{s.price}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </BottomSheet>

        <BottomSheet open={sheet === 'team'} onClose={close} eyebrow="Zespół" title="Zadbają o Ciebie">
          <div className="space-y-3">
            {TEAM.map(m => {
              const open = member === m.id;
              return (
                <div key={m.id} className="rounded-3xl bg-white border border-clinic-line overflow-hidden">
                  <button onClick={() => setMember(open ? null : m.id)} className="w-full p-4 flex items-center gap-4 text-left">
                    <img src={m.imageUrl} alt={m.name} className="w-14 h-14 rounded-full object-cover" />
                    <span className="flex-1">
                      <span className="block font-serif text-lg leading-tight">{m.name}</span>
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-clinic-primaryDark mt-1">{m.role}</span>
                    </span>
                    <Icon name="ChevronDown" size={16} className={`text-clinic-subtext transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <div className="px-4 pb-5 animate-fade">
                      <p className="font-serif italic text-[15px] leading-relaxed text-clinic-text">„{m.bio}”</p>
                      <div className="mt-4 bg-clinic-sand/60 rounded-2xl p-4">
                        <span className="block text-[10px] uppercase tracking-[0.18em] text-clinic-subtext mb-1">Guilty pleasure</span>
                        <p className="text-sm">{m.guiltyPleasure}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </BottomSheet>

        <BottomSheet open={sheet === 'contact'} onClose={close} eyebrow="Kontakt" title="Jak do nas trafić">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-clinic-sand">
            <iframe src={MAP_EMBED} className="w-full h-full" title="Mapa dojazdu" loading="lazy" />
          </div>
          <div className="mt-5 space-y-4">
            <div><span className="block text-[10px] uppercase tracking-[0.18em] text-clinic-subtext mb-1">Adres</span><p className="font-serif text-xl leading-snug">{CLINIC_ADDRESS}</p></div>
            <div><span className="block text-[10px] uppercase tracking-[0.18em] text-clinic-subtext mb-1">Godziny</span>
              <dl className="font-serif text-base space-y-1">{HOURS.map(h => <div key={h.d} className="flex justify-between"><dt>{h.d}</dt><dd className="text-clinic-subtext">{h.h}</dd></div>)}</dl>
              <p className="text-xs text-clinic-subtext mt-2">W pozostałe dni prosimy o kontakt telefoniczny.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-6">
            <a href={TEL} className="h-12 rounded-full bg-clinic-text text-white text-sm font-semibold flex items-center justify-center gap-2"><Icon name="Phone" size={15} />Zadzwoń</a>
            <a href={MAP_NAV} target="_blank" rel="noreferrer" className="h-12 rounded-full border border-clinic-text/15 text-sm font-semibold flex items-center justify-center gap-2"><Icon name="MapPin" size={15} />Nawiguj</a>
          </div>
        </BottomSheet>

        <BottomSheet open={sheet === 'reviews'} onClose={close} eyebrow="Opinie" title="Co mówią pacjenci">
          <div className="space-y-3">
            {REVIEWS.map(r => (
              <figure key={r.id} className="bg-white rounded-3xl p-5 border border-clinic-line">
                <div className="flex items-center justify-between mb-3">
                  <span><span className="block text-sm font-semibold">{r.author}</span><span className="block text-[11px] text-clinic-subtext">{r.date}</span></span>
                  <Stars n={r.rating} />
                </div>
                <blockquote className="font-serif text-[15px] leading-snug">{r.content}</blockquote>
              </figure>
            ))}
          </div>
          <a href={CLINIC_REVIEWS_URL} target="_blank" rel="noreferrer" className="mt-6 h-12 rounded-full border border-clinic-text/15 text-sm font-semibold flex items-center justify-center gap-2">
            <Icon name="Google" size={14} /> Zobacz wszystkie w Google
          </a>
        </BottomSheet>

        <BottomSheet open={!!blogPost} onClose={close} eyebrow="Z gabinetu" title={blogPost?.title}>
          {blogPost && (
            <article>
              <div className="rounded-3xl overflow-hidden aspect-[16/10] mb-5"><img src={blogPost.image} alt="" className="w-full h-full object-cover" /></div>
              <p className="font-serif text-lg leading-snug text-clinic-primaryDark mb-4">{blogPost.lead}</p>
              <div className="text-[15px] leading-relaxed text-clinic-subtext space-y-4 [&_strong]:text-clinic-text">{blogPost.body}</div>
              <button onClick={openBooking} className="mt-8 w-full h-12 rounded-full bg-clinic-text text-white text-sm font-semibold">Umów konsultację</button>
            </article>
          )}
        </BottomSheet>

        <BottomSheet open={sheet === 'booking'} onClose={close} tone="dark" eyebrow={step < 3 ? `Krok ${step + 1} z 3` : 'Gotowe'} title={['Jak masz na imię?', 'Twój numer telefonu', 'Wybierz termin', `Dziękujemy, ${form.name.split(' ')[0]}!`][step]}>
          {step === 0 && (
            <div className="space-y-4">
              <input autoFocus value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Imię i nazwisko" className="w-full h-14 rounded-2xl bg-white/10 border border-white/15 px-5 text-lg text-white placeholder-white/35 outline-none focus:border-clinic-primary" />
              <button disabled={!form.name} onClick={() => setStep(1)} className="w-full h-14 rounded-full bg-clinic-primary text-white font-semibold disabled:opacity-40">Dalej</button>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <input autoFocus type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="np. 500 600 700" className="w-full h-14 rounded-2xl bg-white/10 border border-white/15 px-5 text-lg text-white placeholder-white/35 outline-none focus:border-clinic-primary" />
              <button disabled={!form.phone} onClick={() => setStep(2)} className="w-full h-14 rounded-full bg-clinic-primary text-white font-semibold disabled:opacity-40">Dalej</button>
              <button onClick={() => setStep(0)} className="w-full text-xs text-white/50">Wróć</button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <button onClick={nearest} className="w-full rounded-2xl bg-white/10 border border-clinic-primary/50 p-4 flex items-center justify-between text-left">
                <span><span className="block text-clinic-primary text-xs font-semibold uppercase tracking-[0.14em]">Najbliższy wolny termin</span><span className="text-xs text-white/60">Dopasujemy automatycznie</span></span>
                <Icon name="Sparkles" size={18} className="text-clinic-primary" />
              </button>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full h-14 rounded-2xl bg-white/10 border border-white/15 px-5 text-lg text-white outline-none focus:border-clinic-primary [&::-webkit-calendar-picker-indicator]:invert" />
              <button disabled={!form.date} onClick={() => setStep(3)} className="w-full h-14 rounded-full bg-clinic-primary text-white font-semibold disabled:opacity-40">Zatwierdź</button>
              <button onClick={() => setStep(1)} className="w-full text-xs text-white/50">Wróć</button>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-5">
              <p className="text-white/80 text-sm leading-relaxed">Wstępna rezerwacja na <span className="text-clinic-primary font-semibold">{form.date}</span> została przyjęta. Recepcja oddzwoni, aby potwierdzić godzinę.</p>
              <p className="text-xs text-white/50 leading-relaxed">To rezerwacja konsultacji. Jeśli potrzebujesz pilnej pomocy, zadzwoń do nas bezpośrednio.</p>
              <div className="flex gap-2">
                <a href={TEL} className="flex-1 h-12 rounded-full bg-white/10 text-white text-sm font-semibold flex items-center justify-center gap-2"><Icon name="Phone" size={14} />Zadzwoń</a>
                <button onClick={() => { close(); setForm({ name: '', phone: '', date: '' }); }} className="flex-1 h-12 rounded-full bg-clinic-primary text-white text-sm font-semibold">Zamknij</button>
              </div>
            </div>
          )}
        </BottomSheet>
      </div>
    </div>
  );
};

export default App;
