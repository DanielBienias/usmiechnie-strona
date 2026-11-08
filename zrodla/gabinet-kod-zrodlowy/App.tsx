import React, { useState } from 'react';
import { Header } from './components/Header';
import { Tile } from './components/Tile';
import { ViewState } from './types';
import { ServicesView } from './components/views/ServicesView';
import { TeamView } from './components/views/TeamView';
import { ContactView } from './components/views/ContactView';
import { AboutView } from './components/views/AboutView';
import { Icon } from './components/Icon';
import { DownloadModal } from './components/DownloadModal';
import { CLINIC_NAME, SERVICES, TEAM, CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL, CLINIC_REVIEWS_URL, REVIEWS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  
  // State for inline expansions
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const [teamExpanded, setTeamExpanded] = useState(false);
  // NEW: State to track which specific member is expanded within the team list
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);

  const [contactExpanded, setContactExpanded] = useState(false);
  
  // State for feature sections
  const [microscopeExpanded, setMicroscopeExpanded] = useState(false);
  const [chairsExpanded, setChairsExpanded] = useState(false);
  const [whiteSpotsExpanded, setWhiteSpotsExpanded] = useState(false);
  const [anxietyExpanded, setAnxietyExpanded] = useState(false);

  // --- BOOKING WIZARD STATE ---
  const [bookingExpanded, setBookingExpanded] = useState(false);
  const [bookingStep, setBookingStep] = useState(0); // 0: Name, 1: Phone, 2: Date, 3: Success
  const [bookingData, setBookingData] = useState({ name: '', phone: '', date: '' });

  // --- REVIEWS STATE ---
  const [visibleReviews, setVisibleReviews] = useState(2);

  const navigateTo = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView(ViewState.HOME);
  };
  
  // Handle "Rezerwuj" click from Header
  const handleBookClick = () => {
    if (currentView !== ViewState.HOME) {
      setCurrentView(ViewState.HOME);
    }
    setBookingExpanded(true);
    setBookingStep(0);
    // Timeout to allow state update and DOM rendering
    setTimeout(() => {
        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Helper to toggle categories in the expanded services view
  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Helper to toggle specific member bio
  const toggleMember = (memberId: string) => {
      if (expandedMemberId === memberId) {
          setExpandedMemberId(null);
      } else {
          setExpandedMemberId(memberId);
      }
  };

  // Helper to close all other blog tiles when one is opened
  const closeOtherBlogTiles = (current: string) => {
      if (current !== 'microscope') setMicroscopeExpanded(false);
      if (current !== 'chairs') setChairsExpanded(false);
      if (current !== 'whitespots') setWhiteSpotsExpanded(false);
      if (current !== 'anxiety') setAnxietyExpanded(false);
      
      // Also close main nav tiles
      setServicesExpanded(false);
      setTeamExpanded(false);
      setContactExpanded(false);
  };

  // Booking Helpers
  const handleBookingNext = () => {
    if (bookingStep === 0 && !bookingData.name) return;
    if (bookingStep === 1 && !bookingData.phone) return;
    setBookingStep(prev => prev + 1);
  };

  const selectNearestTerm = () => {
    const today = new Date();
    const future = new Date(today);
    future.setDate(today.getDate() + 2); // Mock "nearest free term" -> 2 days from now
    const dateString = future.toISOString().split('T')[0];
    setBookingData({ ...bookingData, date: dateString });
    setBookingStep(3); // Jump to success
  };

  const categories = Array.from(new Set(SERVICES.map(s => s.category)));

  // Get top reviews - filtered for high rating
  const highRatedReviews = REVIEWS.filter(r => r.rating >= 4);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <main className="animate-fade-in">
            {/* Storytelling Section 1: Hero */}
            <div className="px-6 pt-4 pb-12 flex flex-col items-center text-center">
                
                {/* Elegant Eyebrow Text */}
                <span className="text-clinic-primary text-[10px] uppercase tracking-[0.25em] font-sans font-bold mb-3 block">
                  Stomatologia
                </span>

                {/* Main Name - Large Serif */}
                <h1 className="text-clinic-text text-4xl font-serif mb-8 leading-tight drop-shadow-sm">
                  Katarzyna Baziuk
                </h1>

                {/* Hero Image - Arch Shape */}
                <div className="w-full relative mb-8 max-w-sm mx-auto">
                   {/* Decorative offset border */}
                   <div className="absolute inset-0 border border-clinic-primary/30 rounded-t-[10rem] rounded-b-[2rem] translate-x-3 translate-y-3"></div>
                   
                   <div className="relative rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-xl aspect-[4/5] bg-gray-200">
                    <img 
                      src="/images/hero-gabinet.png" 
                      alt="Wnętrze gabinetu" 
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                    
                    {/* Slogan overlaid on image bottom */}
                    <div className="absolute bottom-8 left-0 right-0 px-6">
                      <p className="text-white font-serif italic text-lg leading-relaxed drop-shadow-md">
                        "Tworzymy uśmiechy,<br/>które niosą radość."
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Primary CTA Button */}
                <button 
                  onClick={() => {
                    setServicesExpanded(true);
                    document.getElementById('offer-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="bg-clinic-primary text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-clinic-primaryDark transition-all shadow-lg active:scale-95 flex items-center gap-3 group"
                >
                  <span>Zobacz ofertę</span>
                  <div className="bg-white/20 rounded-full p-1">
                    <Icon name="ChevronDown" size={14} className="text-white group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </button>
            </div>

            {/* Storytelling Section 2: Values */}
            <div className="px-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-clinic-bg p-3 rounded-full text-clinic-primary">
                    <Icon name="NoPain" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-clinic-text text-base">Bezbolesne leczenie</h4>
                    <p className="text-sm text-clinic-subtext font-light leading-snug mt-1">Zapomnij o dawnym strachu.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-clinic-bg p-3 rounded-full text-clinic-primary">
                    <Icon name="DentalChair" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-clinic-text text-base">Maksymalny komfort</h4>
                    <p className="text-sm text-clinic-subtext font-light leading-snug mt-1">Odpocznij w trakcie wizyty.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-clinic-bg p-3 rounded-full text-clinic-primary">
                    <Icon name="Shield" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-clinic-text text-base">Zero stresu</h4>
                    <p className="text-sm text-clinic-subtext font-light leading-snug mt-1">Twoje samopoczucie jest priorytetem.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN NAVIGATION: BENTO GRID */}
            <div className="px-4 mb-8" id="offer-section">
              <div className="flex items-center justify-center mb-6 opacity-60">
                 <div className="h-px bg-clinic-text/20 w-8 mr-3"></div>
                 <h3 className="text-clinic-text uppercase tracking-widest text-[10px] font-bold">Odkryj Gabinet</h3>
                 <div className="h-px bg-clinic-text/20 w-8 ml-3"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                
                {/* Download Page Tile */}
                <div className="col-span-2 bg-gradient-to-r from-clinic-sand/60 via-white to-clinic-sand/30 border border-clinic-primary/40 rounded-xl p-4 shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-clinic-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Icon name="FolderArchive" size={20} />
                    </div>
                    <div>
                      <span className="inline-block bg-clinic-primary/20 text-clinic-text text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-0.5">
                        Lokalna paczka
                      </span>
                      <h4 className="font-serif font-bold text-clinic-text text-sm leading-tight">
                        Pobierz stronę ze zdjęciami (.ZIP)
                      </h4>
                      <p className="text-[11px] text-clinic-subtext">
                        Kompletny pakiet: zdjęcia, teksty, cennik i kod
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDownloadModalOpen(true)}
                    className="bg-clinic-primary hover:bg-clinic-primaryDark text-white px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer"
                  >
                    <Icon name="Download" size={14} />
                    <span>Pobierz</span>
                  </button>
                </div>

                {/* Visual Tile */}
                <div className="col-span-2 relative h-48 rounded-xl overflow-hidden shadow-md border border-gray-100 group">
                  <img
                    src="/images/wnetrze-gabinet.png"
                    alt="Wnętrze gabinetu"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* --- 1. SERVICES (CENNIK) --- */}
                <div className="col-span-2">
                  <Tile 
                    title="Cennik" 
                    icon="CreditCard" 
                    onClick={() => {
                        setServicesExpanded(!servicesExpanded);
                        if (!servicesExpanded) {
                            setTeamExpanded(false);
                            setContactExpanded(false);
                            setMicroscopeExpanded(false);
                            setChairsExpanded(false);
                            setWhiteSpotsExpanded(false);
                            setAnxietyExpanded(false);
                        }
                    }}
                    className={`w-full bg-white text-clinic-text border-l-4 border-clinic-primary shadow-sm ${servicesExpanded ? 'h-32 flex-col items-start justify-between ring-2 ring-clinic-primary/20' : 'h-32 flex-col items-start justify-between'}`}
                    iconClassName="bg-clinic-bg text-clinic-primary"
                  />
                  
                  {servicesExpanded && (
                    <div className="mt-4 space-y-3 animate-fade-in pl-2 pr-2">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-xs uppercase font-bold text-clinic-subtext tracking-wider">Kategorie zabiegów</span>
                         <button onClick={() => setServicesExpanded(false)} className="text-clinic-primary text-xs underline">Zwiń</button>
                      </div>
                      
                      {categories.map((category) => {
                        const isCategoryOpen = expandedCategory === category;
                        return (
                          <div key={category} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300">
                            <button 
                              onClick={() => toggleCategory(category)}
                              className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isCategoryOpen ? 'bg-clinic-sand/30' : 'hover:bg-gray-50'}`}
                            >
                              <span className="font-serif font-bold text-clinic-text">{category}</span>
                              <Icon 
                                name={isCategoryOpen ? "ChevronUp" : "ChevronDown"} 
                                size={18} 
                                className="text-clinic-primary opacity-70"
                              />
                            </button>
                            {isCategoryOpen && (
                              <div className="bg-gray-50/50 border-t border-gray-100 animate-fade-in">
                                {SERVICES.filter(s => s.category === category).map((service) => (
                                  <div 
                                    key={service.id} 
                                    className="p-3 pl-5 border-b border-gray-100 last:border-0 hover:bg-white transition-colors flex justify-between items-start gap-4"
                                  >
                                    <span className="text-sm text-gray-700 font-sans leading-snug">{service.title}</span>
                                    <span className="text-sm font-bold text-clinic-primary whitespace-nowrap">{service.price}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* --- 2. TEAM (ZESPÓŁ) --- */}
                <div className={`${teamExpanded || contactExpanded ? 'col-span-2' : 'col-span-1'} transition-all duration-300`}>
                  <Tile 
                    title="Zespół" 
                    icon="Users" 
                    onClick={() => {
                        setTeamExpanded(!teamExpanded);
                        // Reset sub-expansions when main toggle clicked
                        setExpandedMemberId(null);
                        if (!teamExpanded) {
                           setContactExpanded(false);
                           setServicesExpanded(false);
                           setMicroscopeExpanded(false);
                           setChairsExpanded(false);
                           setWhiteSpotsExpanded(false);
                           setAnxietyExpanded(false);
                        }
                    }}
                    className={`
                        w-full bg-clinic-primary text-white shadow-md 
                        ${teamExpanded 
                            ? 'h-auto flex-col items-start justify-between ring-2 ring-clinic-primary/20' 
                            : (contactExpanded ? 'h-20 flex-row items-center justify-between' : 'aspect-square flex-col items-start justify-between')
                        }
                    `}
                    iconClassName="bg-white/20 text-white"
                  />
                  
                  {teamExpanded && (
                    <div className="mt-4 animate-fade-in space-y-3 pl-1 pr-1">
                       <div className="flex items-center justify-between mb-2">
                         <span className="text-xs uppercase font-bold text-clinic-subtext tracking-wider">Nasi Specjaliści</span>
                         <button onClick={() => setTeamExpanded(false)} className="text-clinic-primary text-xs underline">Zwiń</button>
                      </div>
                      
                      {TEAM.map((member) => {
                          const isExpanded = expandedMemberId === member.id;
                          return (
                            <button 
                                key={member.id} 
                                onClick={() => toggleMember(member.id)}
                                className={`w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-left transition-all duration-300 ${isExpanded ? 'ring-2 ring-clinic-primary/30' : 'hover:scale-[1.01]'}`}
                            >
                               {/* Collapsed/Header View */}
                               <div className="p-4 flex items-center gap-4">
                                   <div className={`shrink-0 rounded-full overflow-hidden border border-clinic-sand transition-all duration-500 ${isExpanded ? 'w-12 h-12' : 'w-16 h-16'}`}>
                                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                                   </div>
                                   <div className="flex-1">
                                      <h4 className="font-serif font-bold text-clinic-text leading-tight">{member.name}</h4>
                                      <p className="text-xs text-clinic-primary uppercase font-bold mt-1 tracking-wide">{member.role}</p>
                                   </div>
                                   <div className="text-clinic-primary opacity-50">
                                       <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
                                   </div>
                               </div>

                               {/* Expanded Details View */}
                               {isExpanded && (
                                   <div className="animate-fade-in bg-gray-50/50 border-t border-gray-100">
                                       {/* Large Image Area */}
                                       <div className="h-48 w-full relative overflow-hidden">
                                           <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover object-top" />
                                           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                                       </div>
                                       
                                       <div className="p-5 pt-0 -mt-6 relative z-10">
                                            {/* Bio Section */}
                                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-2xl">👋</span>
                                                    <h5 className="font-serif font-bold text-lg text-clinic-text">O mnie</h5>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed font-light italic">
                                                    "{member.bio}"
                                                </p>
                                            </div>

                                            {/* Guilty Pleasure Section */}
                                            <div className="bg-clinic-sand/30 p-4 rounded-xl border-l-4 border-clinic-primary">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xl">🤫</span>
                                                    <h5 className="font-bold text-xs uppercase tracking-widest text-clinic-subtext">Guilty Pleasure</h5>
                                                </div>
                                                <p className="text-sm text-clinic-text font-medium">
                                                    {member.guiltyPleasure}
                                                </p>
                                            </div>
                                       </div>
                                   </div>
                               )}
                            </button>
                          );
                      })}
                    </div>
                  )}
                </div>

                {/* --- 3. CONTACT (KONTAKT) --- */}
                <div className={`${contactExpanded || teamExpanded ? 'col-span-2' : 'col-span-1'} transition-all duration-300`}>
                  <Tile 
                    title="Kontakt" 
                    icon="MapPin" 
                    onClick={() => {
                        setContactExpanded(!contactExpanded);
                        if (!contactExpanded) {
                           setTeamExpanded(false);
                           setServicesExpanded(false);
                           setMicroscopeExpanded(false);
                           setChairsExpanded(false);
                           setWhiteSpotsExpanded(false);
                           setAnxietyExpanded(false);
                        }
                    }}
                    className={`
                        w-full bg-white text-clinic-text border border-clinic-sand shadow-sm 
                        ${contactExpanded 
                            ? 'h-auto flex-col items-start justify-between ring-2 ring-clinic-primary/20 border-clinic-primary' 
                            : (teamExpanded ? 'h-20 flex-row items-center justify-between' : 'aspect-square flex-col items-start justify-between')
                        }
                    `}
                    iconClassName="bg-clinic-bg text-clinic-primary"
                  />
                  
                  {contactExpanded && (
                    <div className="mt-4 animate-fade-in pl-1 pr-1">
                       <div className="flex items-center justify-between mb-3">
                         <span className="text-xs uppercase font-bold text-clinic-subtext tracking-wider">Dane kontaktowe</span>
                         <button onClick={() => setContactExpanded(false)} className="text-clinic-primary text-xs underline">Zwiń</button>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Interactive Google Map Preview */}
                        <div className="w-full h-48 bg-gray-100 relative group overflow-hidden">
                           <iframe 
                              width="100%" 
                              height="100%" 
                              src="https://maps.google.com/maps?q=U%C5%9Bmiechnie%20Stomatologia%20Katarzyna%20Baziuk%20ul.%20Boles%C5%82awa%20Le%C5%9Bmiana%20U1/A1%20Brzeg%20Dolny&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                              frameBorder="0" 
                              scrolling="no" 
                              className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-auto"
                              title="Mapa dojazdu"
                           ></iframe>
                        </div>
                        
                        <div className="p-5 space-y-4">
                          <div className="flex items-start gap-3">
                             <div className="mt-1 text-clinic-primary"><Icon name="MapPin" size={20} /></div>
                             <div>
                               <span className="block text-xs uppercase text-gray-400 font-bold tracking-widest mb-1">Adres</span>
                               <span className="text-clinic-text font-serif text-lg leading-snug">{CLINIC_ADDRESS}</span>
                             </div>
                          </div>
                          
                          <div className="h-px bg-gray-100 w-full"></div>
                          
                          <div className="flex items-start gap-3">
                             <div className="mt-1 text-clinic-primary"><Icon name="Phone" size={20} /></div>
                             <div>
                               <span className="block text-xs uppercase text-gray-400 font-bold tracking-widest mb-1">Telefon</span>
                               <a href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`} className="text-clinic-text font-serif text-lg hover:text-clinic-primary transition-colors">
                                 {CLINIC_PHONE}
                               </a>
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* --- 4. REVIEWS (OPINIE) - CONSOLIDATED SINGLE TILE --- */}
                 <div className="col-span-2 mt-2 order-3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Header Part */}
                        <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/30 relative">
                            {/* Decorative background element */}
                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-clinic-sand/20 to-transparent pointer-events-none"></div>
                            
                            <div className="z-10">
                                <h3 className="font-serif font-bold text-lg text-clinic-text leading-tight">Opinie<br/>pacjentów</h3>
                            </div>

                            <div className="z-10 flex flex-col items-end">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="font-serif font-bold text-2xl text-clinic-text">5.0</span>
                                    <Icon name="Google" size={18} />
                                </div>
                                <div className="flex gap-0.5 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Icon key={i} name="Star" size={14} className="fill-current" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Vertical List Part */}
                        <div className="divide-y divide-gray-100">
                           {highRatedReviews.slice(0, visibleReviews).map((review) => (
                             <div key={review.id} className="p-5 animate-fade-in hover:bg-gray-50 transition-colors">
                                   <div className="flex justify-between items-start mb-3">
                                      <div className="flex items-center gap-3">
                                         <div className="w-10 h-10 rounded-full bg-clinic-bg flex items-center justify-center text-clinic-primary font-serif font-bold text-sm">
                                           {review.author.charAt(0)}
                                         </div>
                                         <div>
                                           <h4 className="font-bold text-sm text-clinic-text leading-tight">{review.author}</h4>
                                           <span className="text-[10px] text-gray-400 block uppercase tracking-wide mt-0.5">{review.date}</span>
                                         </div>
                                      </div>
                                      <div className="flex gap-0.5 text-yellow-400">
                                        {[...Array(review.rating)].map((_, i) => (
                                           <Icon key={i} name="Star" size={12} className="fill-current" />
                                        ))}
                                      </div>
                                   </div>
                                   <div className="relative">
                                       <Icon name="MessageCircle" size={16} className="absolute -top-1 -left-1 text-clinic-sand opacity-50" />
                                       <p className="text-sm text-gray-600 font-light leading-relaxed italic pl-6">
                                         "{review.content}"
                                       </p>
                                   </div>
                             </div>
                           ))}
                        </div>
                        
                        {/* Footer Action Part */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                           {visibleReviews < highRatedReviews.length ? (
                             <button 
                                onClick={() => setVisibleReviews(prev => prev + 2)}
                                className="w-full py-3 bg-white border border-dashed border-clinic-primary/30 rounded-lg text-clinic-primary text-xs font-bold uppercase tracking-widest hover:bg-white hover:border-clinic-primary transition-all flex items-center justify-center gap-2 group shadow-sm"
                             >
                                <span>Więcej opinii</span>
                                <Icon name="ChevronDown" size={14} className="group-hover:translate-y-0.5 transition-transform" />
                             </button>
                           ) : (
                              <a 
                                href={CLINIC_REVIEWS_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full py-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-clinic-primary transition-colors text-center"
                              >
                                 Zobacz wszystkie na Google
                              </a>
                           )}
                        </div>
                    </div>
                 </div>

                 {/* --- BLOG SECTION SEPARATOR --- */}
                 <div className="col-span-2 flex items-center justify-center mb-2 mt-6 opacity-60 order-4">
                     <div className="h-px bg-clinic-text/20 w-8 mr-3"></div>
                     {/* Changed text from "Blog & Ciekawostki" to "Blog" */}
                     <h3 className="text-clinic-text uppercase tracking-widest text-[10px] font-bold">Blog</h3>
                     <div className="h-px bg-clinic-text/20 w-8 ml-3"></div>
                 </div>

                 {/* --- 5. MICROSCOPE SECTION --- */}
                 <div className={`${microscopeExpanded ? 'col-span-2' : 'col-span-1'} transition-all duration-300 order-5`}>
                    <button 
                        onClick={() => {
                            const newState = !microscopeExpanded;
                            setMicroscopeExpanded(newState);
                            if(newState) closeOtherBlogTiles('microscope');
                        }}
                        className={`
                            w-full relative rounded-xl shadow-sm overflow-hidden flex flex-col justify-end text-left group transition-all duration-300
                            ${microscopeExpanded ? 'h-64 ring-2 ring-clinic-primary/50' : 'aspect-square'}
                        `}
                    >
                        {/* Full width Background Image */}
                        <div className="absolute inset-0">
                           <img 
                                src="/images/mikroskop.jpg"
                                alt="Mikroskop"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                           />
                           {/* Dark Gradient Overlay for text readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>

                        {/* Text Content overlay */}
                        <div className="relative z-10 p-4 w-full flex flex-col justify-end h-full">
                             {/* Icon - Smaller when collapsed */}
                            <div className={`${microscopeExpanded ? 'mb-auto' : 'mb-2'}`}>
                                <div className={`inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 ${microscopeExpanded ? 'p-2' : 'p-1.5'}`}>
                                    <Icon name="Sparkles" size={microscopeExpanded ? 20 : 16} />
                                </div>
                            </div>

                            <div>
                                <h3 className={`font-serif font-bold text-white mb-1 drop-shadow-md leading-tight ${microscopeExpanded ? 'text-2xl' : 'text-sm'}`}>
                                    Mikroskop
                                </h3>
                                {microscopeExpanded && (
                                    <p className="text-sm text-white/90 font-medium tracking-wide drop-shadow-sm animate-fade-in">
                                        Nieodłączne narzędzie pracy
                                    </p>
                                )}
                            </div>
                            
                            {/* Chevron only when expanded to save space in square mode */}
                            {microscopeExpanded && (
                                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white animate-fade-in">
                                    <Icon name="ChevronUp" size={24} />
                                </div>
                            )}
                        </div>
                    </button>

                    {microscopeExpanded && (
                        <div className="bg-white mt-4 rounded-xl shadow-md overflow-hidden animate-fade-in border border-gray-100">
                            <div className="p-6 text-clinic-text space-y-4">
                                <h4 className="font-serif font-bold text-xl text-clinic-primary">Precyzja ponad wszystko</h4>
                                {/* UPDATED CONTENT: Long form blog post */}
                                <div className="text-sm font-light leading-relaxed text-justify space-y-4 text-gray-600">
                                    <p>
                                        Wiele osób pyta, dlaczego w naszym gabinecie mikroskop jest standardem, a nie dodatkiem do "trudnych przypadków". Odpowiedź leży w szczegółach, których ludzkie oko po prostu nie jest w stanie dostrzec.
                                    </p>
                                    <p>
                                        Tradycyjna stomatologia opiera się na dotyku i wzroku lekarza. Jednak nawet najlepszy wzrok ma swoje granice. Mikroskop zabiegowy pozwala nam na powiększenie pola pracy nawet 25-krotnie. Co to oznacza dla Ciebie?
                                    </p>
                                    
                                    <div className="bg-clinic-sand/30 p-4 rounded-lg border-l-2 border-clinic-primary">
                                        <h5 className="font-bold text-clinic-text mb-2 text-sm">Co widzimy dzięki powiększeniu?</h5>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Mikropęknięcia szkliwa, które są niewidoczne gołym okiem, a mogą powodować ból.</li>
                                            <li>Dodatkowe kanały w korzeniach zęba – ich pominięcie to najczęstsza przyczyna niepowodzeń w leczeniu kanałowym.</li>
                                            <li>Nieszczelności starych wypełnień, pod którymi rozwija się próchnica wtórna.</li>
                                        </ul>
                                    </div>

                                    <p>
                                        Podczas leczenia próchnicy mikroskop pozwala na <strong>mikroinwazyjność</strong>. Usuwam tylko chorą tkankę, oszczędzając każdy milimetr zdrowego zęba. Precyzja ta przekłada się na idealną szczelność nowych wypełnień. Brak szczelin oznacza, że bakterie nie mają drogi powrotu, a plomba służy przez długie lata.
                                    </p>
                                    <p>
                                        Mikroskop to nie tylko leczenie kanałowe. Używam go do precyzyjnego szlifowania zębów pod korony (dzięki czemu korona idealnie przylega do dziąsła) oraz podczas higienizacji, aby usunąć najdrobniejsze złogi kamienia.
                                    </p>
                                    <p className="font-bold text-clinic-text">
                                        W stomatologii to, czego nie widać, ma największe znaczenie. Dzięki pracy w powiększeniu mam pewność, że leczenie jest wykonane najlepiej, jak to technologicznie możliwe.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setMicroscopeExpanded(false)} 
                                    className="w-full mt-4 py-3 bg-clinic-bg text-clinic-primary text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-clinic-sand transition-colors"
                                >
                                    Zamknij
                                </button>
                            </div>
                        </div>
                    )}
                 </div>

                 {/* --- 6. CHAIRS SECTION --- */}
                 <div className={`${chairsExpanded ? 'col-span-2' : 'col-span-1'} transition-all duration-300 order-5`}>
                    <button 
                        onClick={() => {
                            const newState = !chairsExpanded;
                            setChairsExpanded(newState);
                            if(newState) closeOtherBlogTiles('chairs');
                        }}
                        className={`
                            w-full relative rounded-xl shadow-sm overflow-hidden flex flex-col justify-end text-left group transition-all duration-300
                            ${chairsExpanded ? 'h-64 ring-2 ring-clinic-primary/50' : 'aspect-square'}
                        `}
                    >
                        {/* Full width Background Image */}
                        <div className="absolute inset-0">
                           <img 
                                src="/images/fotele.jpg"
                                alt="Relaksujące fotele"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                           />
                           {/* Dark Gradient Overlay for text readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>

                        {/* Text Content overlay */}
                        <div className="relative z-10 p-4 w-full flex flex-col justify-end h-full">
                             {/* Icon */}
                            <div className={`${chairsExpanded ? 'mb-auto' : 'mb-2'}`}>
                                <div className={`inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 ${chairsExpanded ? 'p-2' : 'p-1.5'}`}>
                                    <Icon name="DentalChair" size={chairsExpanded ? 20 : 16} />
                                </div>
                            </div>
                            
                            <div>
                                <h3 className={`font-serif font-bold text-white mb-1 drop-shadow-md leading-tight ${chairsExpanded ? 'text-2xl' : 'text-sm'}`}>
                                    {chairsExpanded ? 'Relaksujące fotele' : 'Fotele'}
                                </h3>
                                {chairsExpanded && (
                                    <p className="text-sm text-white/90 font-medium tracking-wide drop-shadow-sm animate-fade-in">
                                        Nasze fotele są tak wygodne, że...
                                    </p>
                                )}
                            </div>
                            
                            {chairsExpanded && (
                                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white animate-fade-in">
                                    <Icon name="ChevronUp" size={24} />
                                </div>
                            )}
                        </div>
                    </button>

                    {chairsExpanded && (
                        <div className="bg-white mt-4 rounded-xl shadow-md overflow-hidden animate-fade-in border border-gray-100">
                            <div className="p-6 text-clinic-text space-y-4">
                                <h4 className="font-serif font-bold text-xl text-clinic-primary">Komfort ponad wszystko</h4>
                                {/* UPDATED CONTENT: Long form blog post */}
                                <div className="text-sm font-light leading-relaxed text-justify space-y-4 text-gray-600">
                                    <p>
                                        Czy wizyta u dentysty może kojarzyć się z relaksem? Większość pacjentów powiedziałaby stanowcze "nie". My postanowiliśmy to zmienić, zaczynając od podstaw – czyli od fotela, na którym spędzasz czas.
                                    </p>
                                    
                                    <p className="font-medium italic text-lg text-clinic-text pl-4 border-l-4 border-clinic-primary py-2 bg-gray-50 rounded-r-lg">
                                        "Nasze fotele są tak wygodne, że niektórzy pacjenci ucinają sobie drzemkę 🥱😴.. nawet podczas leczenia kanałowego."
                                    </p>

                                    <h5 className="font-bold text-clinic-text text-sm mt-4">Technologia dla Twojego kręgosłupa</h5>
                                    <p>
                                        Nasze unity stomatologiczne zostały zaprojektowane z myślą o ergonomii i komforcie wielogodzinnych zabiegów. Zamiast standardowej twardej tapicerki, wykorzystujemy technologię pianki termoelastycznej (memory foam).
                                    </p>
                                    
                                    <ul className="space-y-2 mt-2">
                                        <li className="flex gap-2">
                                            <span className="text-clinic-primary font-bold">1.</span>
                                            <span><strong>Idealne podparcie:</strong> Fotel dopasowuje się do kształtu Twojego ciała, eliminując punkty ucisku. Dzięki temu nawet długa wizyta nie kończy się bólem pleców czy karku.</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-clinic-primary font-bold">2.</span>
                                            <span><strong>Redukcja napięcia:</strong> Kiedy Twoje ciało jest zrelaksowane, poziom stresu automatycznie spada. Mniejsze napięcie mięśniowe sprawia również, że znieczulenie działa skuteczniej i szybciej.</span>
                                        </li>
                                    </ul>

                                    <p>
                                        Wygodny fotel to nie fanaberia – to element skutecznego leczenia. Kiedy Ty odpoczywasz, my możemy pracować precyzyjnie i spokojnie, skupiając się w pełni na Twoim uśmiechu.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setChairsExpanded(false)} 
                                    className="w-full mt-4 py-3 bg-clinic-bg text-clinic-primary text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-clinic-sand transition-colors"
                                >
                                    Zamknij
                                </button>
                            </div>
                        </div>
                    )}
                 </div>

                 {/* --- 7. WHITE SPOTS TREATMENT --- */}
                 <div className={`${whiteSpotsExpanded ? 'col-span-2' : 'col-span-1'} transition-all duration-300 order-5`}>
                    <button 
                        onClick={() => {
                            const newState = !whiteSpotsExpanded;
                            setWhiteSpotsExpanded(newState);
                            if(newState) closeOtherBlogTiles('whitespots');
                        }}
                        className={`
                            w-full relative rounded-xl shadow-sm overflow-hidden flex flex-col justify-end text-left group transition-all duration-300
                            ${whiteSpotsExpanded ? 'h-64 ring-2 ring-clinic-primary/50' : 'aspect-square'}
                        `}
                    >
                        {/* Full width Background Image */}
                        <div className="absolute inset-0">
                           <img 
                                src="/images/biale-plamy.jpg"
                                alt="Leczenie białych plam"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                           />
                           {/* Dark Gradient Overlay for text readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>

                        {/* Text Content overlay */}
                        <div className="relative z-10 p-4 w-full flex flex-col justify-end h-full">
                            {/* Icon */}
                            <div className={`${whiteSpotsExpanded ? 'mb-auto' : 'mb-2'}`}>
                                <div className={`inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 ${whiteSpotsExpanded ? 'p-2' : 'p-1.5'}`}>
                                    <Icon name="Tooth" size={whiteSpotsExpanded ? 20 : 16} />
                                </div>
                            </div>
                            
                            <div>
                                <h3 className={`font-serif font-bold text-white mb-1 drop-shadow-md leading-tight ${whiteSpotsExpanded ? 'text-2xl' : 'text-sm'}`}>
                                    {whiteSpotsExpanded ? 'Leczenie białych plam' : 'Białe plamy'}
                                </h3>
                                {whiteSpotsExpanded && (
                                    <p className="text-sm text-white/90 font-medium tracking-wide drop-shadow-sm animate-fade-in">
                                        Metoda ICON
                                    </p>
                                )}
                            </div>
                            
                            {whiteSpotsExpanded && (
                                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white animate-fade-in">
                                    <Icon name="ChevronUp" size={24} />
                                </div>
                            )}
                        </div>
                    </button>

                    {whiteSpotsExpanded && (
                        <div className="bg-white mt-4 rounded-xl shadow-md overflow-hidden animate-fade-in border border-gray-100">
                            <div className="p-6 text-clinic-text space-y-4">
                                <h4 className="font-serif font-bold text-xl text-clinic-primary leading-tight">Leczenie białych plam na górnych zębach przednich</h4>
                                {/* UPDATED CONTENT: Long form blog post */}
                                <div className="text-sm font-light leading-relaxed text-justify space-y-4 text-gray-600">
                                    <p>
                                        Białe plamki na zębach to problem, z którym zmaga się wielu pacjentów. Często są one pamiątką po leczeniu ortodontycznym lub wynikiem fluorozy. Do niedawna jedynym sposobem na ich usunięcie było borowanie i założenie kompozytu lub wykonanie licówek. Dziś mamy metodę <strong>ICON</strong>.
                                    </p>
                                    
                                    <div className="bg-clinic-sand/30 p-4 rounded-lg border-l-2 border-clinic-primary">
                                        <h5 className="font-bold text-clinic-text mb-1 text-sm">Czym jest infiltracja żywicą?</h5>
                                        <p>
                                            ICON to rewolucyjna metoda, która pozwala na usunięcie białych plam <strong>bez użycia wiertła</strong> i bez bólu. Zabieg polega na nasączeniu porowatego szkliwa (które widzimy jako białą plamę) specjalną żywicą o współczynniku załamania światła identycznym jak zdrowe szkliwo.
                                        </p>
                                    </div>

                                    <h5 className="font-bold text-clinic-text text-sm mt-2">Jak wygląda zabieg?</h5>
                                    <ul className="list-decimal list-inside space-y-1">
                                        <li><strong>Przygotowanie:</strong> Zabezpieczamy dziąsła, aby preparat działał tylko na ząb.</li>
                                        <li><strong>Otwarcie porów:</strong> Nakładamy specjalny żel, który otwiera pory w zmienionym szkliwie.</li>
                                        <li><strong>Infiltracja:</strong> Aplikujemy płynną żywicę ICON, która wnika głęboko w strukturę plamy.</li>
                                        <li><strong>Utwardzanie:</strong> Światło lampy polimeryzacyjnej utwardza żywicę, scalając ją z zębem.</li>
                                    </ul>

                                    <p className="italic font-medium text-clinic-text mt-2">
                                        Efekt jest natychmiastowy. Plama znika, a ząb odzyskuje jednolity kolor i blask. Co więcej, metoda ta nie tylko poprawia estetykę, ale również <strong>zatrzymuje początkową próchnicę</strong>, wzmacniając strukturę zęba.
                                    </p>
                                    <p>
                                        W przypadku naszej pacjentki, która całe życie wstydziła się uśmiechać z powodu fluorozy, jeden zabieg wystarczył, by całkowicie odmienić jej uśmiech i pewność siebie.
                                    </p>
                                </div>
                                
                                <button 
                                    onClick={() => setWhiteSpotsExpanded(false)} 
                                    className="w-full mt-4 py-3 bg-clinic-bg text-clinic-primary text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-clinic-sand transition-colors"
                                >
                                    Zamknij
                                </button>
                            </div>
                        </div>
                    )}
                 </div>

                 {/* --- 8. ANXIETY RELIEF (NEW) --- */}
                 <div className={`${anxietyExpanded ? 'col-span-2' : 'col-span-1'} transition-all duration-300 order-5`}>
                    <button 
                        onClick={() => {
                            const newState = !anxietyExpanded;
                            setAnxietyExpanded(newState);
                            if(newState) closeOtherBlogTiles('anxiety');
                        }}
                        className={`
                            w-full relative rounded-xl shadow-sm overflow-hidden flex flex-col justify-end text-left group transition-all duration-300
                            ${anxietyExpanded ? 'h-64 ring-2 ring-clinic-primary/50' : 'aspect-square'}
                        `}
                    >
                        {/* Full width Background Image */}
                        <div className="absolute inset-0">
                           <img 
                                src="/images/bez-leku.jpg"
                                alt="Pacjentka z muzyką"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                           />
                           {/* Dark Gradient Overlay for text readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>

                        {/* Text Content overlay */}
                        <div className="relative z-10 p-4 w-full flex flex-col justify-end h-full">
                            {/* Icon */}
                            <div className={`${anxietyExpanded ? 'mb-auto' : 'mb-2'}`}>
                                <div className={`inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 ${anxietyExpanded ? 'p-2' : 'p-1.5'}`}>
                                    <Icon name="Headphones" size={anxietyExpanded ? 20 : 16} />
                                </div>
                            </div>
                            
                            <div>
                                <h3 className={`font-serif font-bold text-white mb-1 drop-shadow-md leading-tight ${anxietyExpanded ? 'text-2xl' : 'text-sm'}`}>
                                    {anxietyExpanded ? 'Dla pacjentów z lękiem' : 'Bez lęku'}
                                </h3>
                                {anxietyExpanded && (
                                    <p className="text-sm text-white/90 font-medium tracking-wide drop-shadow-sm animate-fade-in">
                                        Muzyka i relaks
                                    </p>
                                )}
                            </div>
                            
                            {anxietyExpanded && (
                                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white animate-fade-in">
                                    <Icon name="ChevronUp" size={24} />
                                </div>
                            )}
                        </div>
                    </button>

                    {anxietyExpanded && (
                        <div className="bg-white mt-4 rounded-xl shadow-md overflow-hidden animate-fade-in border border-gray-100">
                            <div className="p-6 text-clinic-text space-y-4">
                                <h4 className="font-serif font-bold text-xl text-clinic-primary leading-tight">Twoja ulubiona muzyka i zero rażącego światła! 🎧🕶️</h4>
                                {/* UPDATED CONTENT: Long form blog post */}
                                <div className="text-sm font-light leading-relaxed text-justify space-y-4 text-gray-600">
                                    <p>
                                        Lęk przed dentystą (dentofobia) dotyczy niemal połowy Polaków. Często wynika on z traumatycznych przeżyć z przeszłości – zapachu eugenolu, dźwięku wiertła czy bólu. W "Uśmiechnie" wierzymy, że współczesna stomatologia może (i musi!) wyglądać inaczej.
                                    </p>
                                    
                                    <p className="italic font-medium border-l-4 border-clinic-primary pl-4 py-2 bg-gray-50 rounded-r-lg">
                                       "Stworzyliśmy miejsce, w którym leczenie zębów przestaje być stresującym obowiązkiem, a staje się chwilą dla Ciebie."
                                    </p>
                                    
                                    <h5 className="font-bold text-clinic-text text-sm mt-4">Jak walczymy ze stresem?</h5>
                                    <p>
                                        Nasz protokół "Comfort First" opiera się na eliminacji negatywnych bodźców zmysłowych, które wyzwalają lęk.
                                    </p>

                                    <div className="space-y-3 mt-2">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-clinic-sand/50 p-2 rounded-full text-clinic-primary shrink-0"><Icon name="Headphones" size={16} /></div>
                                            <div>
                                                <strong>Dźwięk:</strong> Cisza lub Twoja muzyka. Zachęcamy do zabrania słuchawek z funkcją Noise Cancelling. Możesz słuchać ulubionego podcastu, audiobooka lub playlisty relaksacyjnej. Dźwięk wiertła staje się wtedy tylko odległym tłem.
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-clinic-sand/50 p-2 rounded-full text-clinic-primary shrink-0"><Icon name="Shield" size={16} /></div>
                                            <div>
                                                <strong>Wzrok:</strong> Ostre światło lampy zabiegowej bywa drażniące. Dlatego wyposażamy pacjentów w ciemne okulary ochronne. Dla Ciebie to chwila ciemności i odpoczynku oczu, dla nas – pełne oświetlenie pola pracy.
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-clinic-sand/50 p-2 rounded-full text-clinic-primary shrink-0"><Icon name="MessageCircle" size={16} /></div>
                                            <div>
                                                <strong>Komunikacja:</strong> Nic tak nie buduje lęku jak niewiedza. Przed każdym etapem mówimy, co będziemy robić. Ustalamy gest "stop" – jeśli podniesiesz rękę, natychmiast przerywamy pracę. To Ty masz kontrolę.
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mt-4">
                                        Mniej bodźców to mniej kortyzolu (hormonu stresu). Dzięki temu wychodzisz z gabinetu nie tylko ze zdrowym uśmiechem, ale też zrelaksowany, a nie wyczerpany nerwowo.
                                    </p>
                                </div>
                                
                                <button 
                                    onClick={() => setAnxietyExpanded(false)} 
                                    className="w-full mt-4 py-3 bg-clinic-bg text-clinic-primary text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-clinic-sand transition-colors"
                                >
                                    Zamknij
                                </button>
                            </div>
                        </div>
                    )}
                 </div>

              </div>
            </div>

            {/* --- BOOKING WIZARD FOOTER (REPLACED OLD FOOTER) --- */}
            <div id="booking-section" className="bg-clinic-text text-white mt-12 rounded-t-3xl relative overflow-hidden transition-all duration-500 ease-in-out">
                {/* Expandable/Collapsible Booking Wizard */}
                <div className="relative">
                   
                   {/* Collapsed State: "Book" Bar */}
                   {!bookingExpanded && (
                       <button 
                           onClick={() => { setBookingExpanded(true); setBookingStep(0); }}
                           className="w-full p-6 flex items-center justify-between group"
                       >
                           <div className="flex items-center gap-4">
                               <div className="bg-clinic-primary p-3 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                                   <Icon name="Calendar" size={24} />
                               </div>
                               <div className="text-left">
                                   <h3 className="font-serif font-bold text-xl">Zarezerwuj wizytę</h3>
                                   {/* Removed subtext as requested */}
                               </div>
                           </div>
                           <Icon name="ChevronUp" size={24} className="text-clinic-primary animate-bounce" />
                       </button>
                   )}

                   {/* Expanded State: Wizard */}
                   {bookingExpanded && (
                       <div className="p-6 pb-12 animate-fade-in bg-clinic-bg/5 rounded-t-3xl border-t border-white/10">
                           {/* Wizard Header */}
                           <div className="flex justify-between items-center mb-6">
                               <h3 className="font-serif font-bold text-xl">Rezerwacja wizyty</h3>
                               <button onClick={() => setBookingExpanded(false)} className="p-2 hover:bg-white/10 rounded-full text-white/60">
                                   <Icon name="Close" size={20} />
                               </button>
                           </div>

                           {/* Wizard Content */}
                           <div className="min-h-[250px] flex flex-col justify-between">
                               
                               {/* STEP 0: NAME */}
                               {bookingStep === 0 && (
                                   <div className="animate-fade-in space-y-4">
                                       <label className="block text-sm font-bold uppercase tracking-widest text-clinic-primary mb-2">Krok 1/3</label>
                                       <h4 className="font-serif text-2xl mb-4">Jak masz na imię?</h4>
                                       <input 
                                           type="text" 
                                           value={bookingData.name}
                                           onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                                           placeholder="Imię i nazwisko"
                                           className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-lg text-white placeholder-white/40 focus:outline-none focus:border-clinic-primary transition-colors"
                                           autoFocus
                                       />
                                       <button 
                                           onClick={handleBookingNext}
                                           disabled={!bookingData.name}
                                           className="w-full bg-clinic-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest p-4 rounded-xl mt-4 hover:bg-clinic-primaryDark transition-all"
                                       >
                                           Dalej
                                       </button>
                                   </div>
                               )}

                               {/* STEP 1: PHONE */}
                               {bookingStep === 1 && (
                                   <div className="animate-fade-in space-y-4">
                                       <button onClick={() => setBookingStep(0)} className="text-xs text-white/50 mb-2 flex items-center gap-1 hover:text-white"><Icon name="Back" size={12}/> Wróć</button>
                                       <label className="block text-sm font-bold uppercase tracking-widest text-clinic-primary mb-2">Krok 2/3</label>
                                       <h4 className="font-serif text-2xl mb-4">Podaj numer telefonu</h4>
                                       <input 
                                           type="tel" 
                                           value={bookingData.phone}
                                           onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                                           placeholder="Np. 500 600 700"
                                           className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-lg text-white placeholder-white/40 focus:outline-none focus:border-clinic-primary transition-colors"
                                           autoFocus
                                       />
                                       <button 
                                           onClick={handleBookingNext}
                                           disabled={!bookingData.phone}
                                           className="w-full bg-clinic-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest p-4 rounded-xl mt-4 hover:bg-clinic-primaryDark transition-all"
                                       >
                                           Dalej
                                       </button>
                                   </div>
                               )}

                               {/* STEP 2: DATE */}
                               {bookingStep === 2 && (
                                   <div className="animate-fade-in space-y-4">
                                       <button onClick={() => setBookingStep(1)} className="text-xs text-white/50 mb-2 flex items-center gap-1 hover:text-white"><Icon name="Back" size={12}/> Wróć</button>
                                       <label className="block text-sm font-bold uppercase tracking-widest text-clinic-primary mb-2">Krok 3/3</label>
                                       <h4 className="font-serif text-2xl mb-4">Wybierz termin konsultacji</h4>
                                       
                                       <button 
                                           onClick={selectNearestTerm}
                                           className="w-full bg-white/10 border border-clinic-primary/50 p-4 rounded-xl flex items-center justify-between group hover:bg-white/20 transition-all mb-4"
                                       >
                                           <div className="text-left">
                                               <span className="block text-clinic-primary font-bold text-sm uppercase tracking-wider">Najbliższy wolny termin</span>
                                               <span className="text-xs text-white/60">Automatyczne dopasowanie</span>
                                           </div>
                                           <Icon name="Sparkles" size={20} className="text-clinic-primary" />
                                       </button>

                                       <div className="relative">
                                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/50">
                                               <Icon name="Calendar" size={18} />
                                           </div>
                                           <input 
                                               type="date"
                                               value={bookingData.date}
                                               onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                                               className="w-full bg-white/10 border border-white/20 rounded-xl p-4 pl-10 text-lg text-white placeholder-white/40 focus:outline-none focus:border-clinic-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                                           />
                                       </div>

                                       <button 
                                           onClick={() => bookingData.date && setBookingStep(3)}
                                           disabled={!bookingData.date}
                                           className="w-full bg-clinic-primary disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest p-4 rounded-xl mt-4 hover:bg-clinic-primaryDark transition-all"
                                       >
                                           Zatwierdź
                                       </button>
                                   </div>
                               )}

                               {/* STEP 3: SUCCESS */}
                               {bookingStep === 3 && (
                                   <div className="animate-fade-in text-center flex flex-col items-center justify-center py-4">
                                       <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 border-2 border-green-500/50">
                                           <Icon name="Sparkles" size={32} />
                                       </div>
                                       <h4 className="font-serif text-2xl mb-2">Dziękujemy, {bookingData.name.split(' ')[0]}!</h4>
                                       <p className="text-white/80 mb-6 text-sm leading-relaxed">
                                           Twoja wstępna rezerwacja na dzień <span className="font-bold text-clinic-primary">{bookingData.date}</span> została przyjęta. 
                                       </p>
                                       
                                       <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl text-left mb-6">
                                            <div className="flex gap-3">
                                                <Icon name="Info" size={20} className="text-yellow-400 shrink-0 mt-0.5" />
                                                <p className="text-xs text-yellow-100/80 leading-relaxed">
                                                    To jest <strong className="text-yellow-400">wstępna rezerwacja konsultacji</strong>. 
                                                    Nasza recepcja skontaktuje się z Tobą telefonicznie, aby potwierdzić godzinę.
                                                    <br/><br/>
                                                    Jeśli potrzebujesz innej wizyty lub pilnej pomocy, prosimy o kontakt telefoniczny.
                                                </p>
                                            </div>
                                       </div>

                                       <div className="flex gap-3 w-full">
                                            <a href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`} className="flex-1 bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2">
                                                <Icon name="Phone" size={14} /> Zadzwoń
                                            </a>
                                            <button 
                                                onClick={() => { setBookingExpanded(false); setBookingStep(0); setBookingData({name:'', phone:'', date:''}); }}
                                                className="flex-1 bg-clinic-primary hover:bg-clinic-primaryDark text-white p-3 rounded-lg text-xs font-bold uppercase tracking-wide"
                                            >
                                                Zamknij
                                            </button>
                                       </div>
                                   </div>
                               )}

                           </div>
                       </div>
                   )}
                </div>

                {/* --- Static Map & Address (Always visible but secondary) --- */}
                <div className="px-6 pb-8 pt-4 border-t border-white/10">
                    
                    <div className="grid grid-cols-1 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-clinic-primary shrink-0">
                                 <Icon name="MapPin" size={20} />
                             </div>
                             <div>
                                 <span className="block text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">Adres</span>
                                 <p className="text-sm font-serif">{CLINIC_ADDRESS}</p>
                             </div>
                             {/* CHANGED: Replaced "Mapa" link with a prominent Navigate button */}
                             <a 
                                href="https://www.google.com/maps/dir/?api=1&destination=Uśmiechnie+Stomatologia+Brzeg+Dolny" 
                                target="_blank" 
                                rel="noreferrer"
                                className="ml-auto bg-clinic-primary hover:bg-clinic-primaryDark text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors shadow-lg"
                             >
                                 <Icon name="MapPin" size={14} />
                                 NAWIGUJ
                             </a>
                        </div>

                        {/* NEW: Opening Hours Block */}
                        <div className="flex items-start gap-4">
                             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-clinic-primary shrink-0 mt-0.5">
                                 <Icon name="Calendar" size={20} />
                             </div>
                             <div>
                                 <span className="block text-[10px] uppercase text-white/40 font-bold tracking-widest mb-2">Godziny otwarcia</span>
                                 <div className="text-sm font-serif space-y-1 text-white/90">
                                    <div className="flex justify-between w-40"><span>wtorek</span> <span>9:00 - 19:00</span></div>
                                    <div className="flex justify-between w-40"><span>środa</span> <span>9:00 - 17:00</span></div>
                                    <div className="flex justify-between w-40"><span>piątek</span> <span>9:00 - 19:00</span></div>
                                 </div>
                             </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">
                            &copy; 2025 {CLINIC_NAME}
                        </p>
                    </div>
                </div>
            </div>
          </main>
        );
      case ViewState.SERVICES:
        return <ServicesView />;
      case ViewState.TEAM:
        return <TeamView />;
      case ViewState.CONTACT:
        return <ContactView />;
      case ViewState.ABOUT:
        return <AboutView />;
      default:
        return <div className="p-10 text-center">Widok w budowie</div>;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case ViewState.HOME: return undefined;
      case ViewState.SERVICES: return 'Oferta';
      case ViewState.TEAM: return 'Specjaliści';
      case ViewState.CONTACT: return 'Kontakt';
      case ViewState.ABOUT: return 'O nas';
      default: return CLINIC_NAME;
    }
  };

  return (
    <div className="bg-clinic-bg min-h-screen font-sans text-clinic-text">
      <div className="max-w-lg mx-auto bg-clinic-bg min-h-screen shadow-2xl relative border-x border-white/50">
        <Header 
          onBack={currentView !== ViewState.HOME ? handleBack : undefined} 
          title={getViewTitle()}
          onBookClick={handleBookClick}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        {renderContent()}
        <DownloadModal 
          isOpen={isDownloadModalOpen} 
          onClose={() => setIsDownloadModalOpen(false)} 
        />
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default App;