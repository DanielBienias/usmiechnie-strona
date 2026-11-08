import { ServiceItem, TeamMember, Review } from './types';

export const CLINIC_NAME = "Uśmiechnie";
export const CLINIC_PHONE = "577 626 277";
export const CLINIC_EMAIL = "gabinet@usmiechnie.pl";
export const CLINIC_ADDRESS = "ul. Bolesława Leśmiana U1/A1, Brzeg Dolny";
export const CLINIC_REVIEWS_URL = "https://www.google.com/search?sca_esv=20541e4f21a9d7f7&sxsrf=ANbL-n7GSrdJp2b_zZbT-DeAk5xGvWHtvA:1769014494361&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOR0dve1nUkJ4L4YlWTZv4iqk7HbXUvnb6z6HelsKcGV3h4k9KdOc9jjzP723qvO3j-5bPmfDmYmglbyUTbJXMSH6dB9cD8KLtmH2HNsI_O88I7luiCY1cE6n7gOqs2vH8HhFjPE%3D&q=U%C5%9Bmiechnie+Stomatologia+Katarzyna+Baziuk+Opinie&sa=X&ved=2ahUKEwjFyqfEjJ2SAxU2VfEDHaJFNVEQ0bkNegQIIRAH&biw=1728&bih=958&dpr=2&aic=0";

export const SERVICES: ServiceItem[] = [
  // Stomatologia Zachowawcza
  { id: 'sz1', category: 'Stomatologia Zachowawcza', title: 'Wypełnienie zęba materiałem światłoutwardzalnym', price: '320-480 ZŁ' },
  { id: 'sz2', category: 'Stomatologia Zachowawcza', title: 'Wypełnienie estetyczne', price: '450-500 ZŁ' },
  { id: 'sz3', category: 'Stomatologia Zachowawcza', title: 'Wypełnienie tymczasowe', price: '150-170 ZŁ' },
  { id: 'sz4', category: 'Stomatologia Zachowawcza', title: 'Odbudowa zrębu (korony) zęba kompozytem', price: '500 ZŁ' },
  { id: 'sz5', category: 'Stomatologia Zachowawcza', title: 'Nakład kompozytowy bezpośredni', price: '650 ZŁ' },
  { id: 'sz6', category: 'Stomatologia Zachowawcza', title: 'Likwidacja diastemy', price: '700 ZŁ' },
  { id: 'sz7', category: 'Stomatologia Zachowawcza', title: 'Licówka kompozytowa (Bonding, 1 ząb)', price: '750 ZŁ' },
  { id: 'sz8', category: 'Stomatologia Zachowawcza', title: 'Leczenie nadwrażliwości podczas wizyty', price: '50 ZŁ' },
  { id: 'sz9', category: 'Stomatologia Zachowawcza', title: 'Koferdam', price: '20 ZŁ' },
  { id: 'sz10', category: 'Stomatologia Zachowawcza', title: 'Icon 1 ząb', price: '350 ZŁ' },
  { id: 'sz11', category: 'Stomatologia Zachowawcza', title: 'Gingiwektomia brodawki dziąsłowej', price: '150 ZŁ' },
  { id: 'sz12', category: 'Stomatologia Zachowawcza', title: 'Flow Injection (min. 4 zęby) - 1 ząb', price: '850 ZŁ' },

  // Endodoncja
  { id: 'en1', category: 'Endodoncja', title: 'Dewitalizacja miazgi wizyta bólowa', price: '350 ZŁ' },
  { id: 'en2', category: 'Endodoncja', title: 'Kwalifikacja/ocena tkanek w mikroskopie', price: '250 ZŁ' },
  { id: 'en3', category: 'Endodoncja', title: 'Leczenie kanałowe', price: '650-1250 ZŁ' },
  { id: 'en4', category: 'Endodoncja', title: 'Każdy dodatkowy kanał', price: '150 ZŁ' },
  { id: 'en5', category: 'Endodoncja', title: 'Odbudowa ostateczna', price: '350-550 ZŁ' },
  { id: 'en6', category: 'Endodoncja', title: 'Odbudowa tymczasowa', price: '250 ZŁ' },
  { id: 'en7', category: 'Endodoncja', title: 'Rewizja leczenia kanałowego', price: '800-1500 ZŁ' },
  { id: 'en8', category: 'Endodoncja', title: 'Udrożnienie obliteracji kanału', price: '250 ZŁ' },
  { id: 'en9', category: 'Endodoncja', title: 'Usunięcie wkładu koronowo-korzeniowego', price: '250-500 ZŁ' },
  { id: 'en10', category: 'Endodoncja', title: 'Usunięcie zębiniaka', price: '250 ZŁ' },
  { id: 'en11', category: 'Endodoncja', title: 'Usunięcie złamanego narzędzia w kanale', price: '250-550 ZŁ' },
  { id: 'en12', category: 'Endodoncja', title: 'Zamknięcie kanału materiałem MTA', price: '200-300 ZŁ' },

  // Chirurgia
  { id: 'ch1', category: 'Chirurgia', title: 'Leczenie zębodołu cena za każdą wizytę', price: '150 ZŁ' },
  { id: 'ch2', category: 'Chirurgia', title: 'Nacięcie ropnia wewnątrzustne', price: '200 ZŁ' },
  { id: 'ch3', category: 'Chirurgia', title: 'Plastyka dziąsła wokół korzenia', price: '100 ZŁ' },
  { id: 'ch4', category: 'Chirurgia', title: 'Podcięcie wędzidełka', price: '550 ZŁ' },
  { id: 'ch5', category: 'Chirurgia', title: 'Szycie połączenia ustno-zatokowego', price: '400 ZŁ' },
  { id: 'ch6', category: 'Chirurgia', title: 'Usunięcie zęba jednokorzeniowego proste', price: '250 ZŁ' },
  { id: 'ch7', category: 'Chirurgia', title: 'Usunięcie zęba jednokorzeniowego skomplikowane', price: '350-550 ZŁ' },
  { id: 'ch8', category: 'Chirurgia', title: 'Usunięcie zęba wielokorzeniowego proste', price: '400 ZŁ' },
  { id: 'ch9', category: 'Chirurgia', title: 'Usunięcie zęba wielokorzeniowego skomplikowane', price: '500-1000 ZŁ' },
  { id: 'ch10', category: 'Chirurgia', title: 'Szycie chirurgiczne nićmi resorbowalnymi', price: '50 ZŁ' },
  { id: 'ch11', category: 'Chirurgia', title: 'Usunięcie ósemki górnej', price: '500-1000 ZŁ' },
  { id: 'ch12', category: 'Chirurgia', title: 'Usunięcie ósemki dolnej', price: '600-1000 ZŁ' },

  // Implantologia
  { id: 'im1', category: 'Implantologia', title: 'Założenie implantu Neodent', price: '3000 ZŁ' },
  { id: 'im2', category: 'Implantologia', title: 'Odsłonięcie implantu', price: '0 ZŁ' },
  { id: 'im3', category: 'Implantologia', title: 'Korona na implancie', price: '3000 ZŁ' },

  // Periodontologia
  { id: 'pe1', category: 'Periodontologia', title: 'FGG pokrycie recesji dziąsła 1 ząb', price: '2000 ZŁ' },
  { id: 'pe2', category: 'Periodontologia', title: 'Fluoryzacja zębów', price: '150 ZŁ' },
  { id: 'pe3', category: 'Periodontologia', title: 'Kiretaż poddziąsłowy w mikroskopie (oba łuki)', price: '900 ZŁ' },
  { id: 'pe4', category: 'Periodontologia', title: 'Leczenie nadwrażliwości Tokuyama (do 3 zębów)', price: '150 ZŁ' },
  { id: 'pe5', category: 'Periodontologia', title: 'Pakiet higienizacji zębów', price: '360 ZŁ' },
  { id: 'pe6', category: 'Periodontologia', title: 'Piaskowanie zębów', price: '300 ZŁ' },
  { id: 'pe7', category: 'Periodontologia', title: 'Skaling poddziąsłowy z polerowaniem zębów', price: '300 ZŁ' },

  // Znieczulenia
  { id: 'zn1', category: 'Znieczulenia', title: 'Znieczulenie nasiękowe', price: '30 ZŁ' },
  { id: 'zn2', category: 'Znieczulenia', title: 'Znieczulenie przewodowe', price: '50 ZŁ' },

  // Protetyka
  { id: 'pr1', category: 'Protetyka', title: 'Cementowanie korony spoza gabinetu', price: '300 ZŁ' },
  { id: 'pr2', category: 'Protetyka', title: 'Frezowanie korony 1 punkt', price: '170 ZŁ' },
  { id: 'pr3', category: 'Protetyka', title: 'Korona metalowa', price: '700 ZŁ' },
  { id: 'pr4', category: 'Protetyka', title: 'Korona metalowa lana licowana porcelaną', price: '1500 ZŁ' },
  { id: 'pr5', category: 'Protetyka', title: 'Korona pełnostrukturowa na tlenku cyrkonu', price: '2200 ZŁ' },
  { id: 'pr6', category: 'Protetyka', title: 'Korona tymczasowa gabinet. 1 punkt', price: '150 ZŁ' },
  { id: 'pr7', category: 'Protetyka', title: 'Korona tymczasowa labor. 1 punkt', price: '400 ZŁ' },
  { id: 'pr8', category: 'Protetyka', title: 'Korona tymczasowa w moście 1 punkt', price: '150 ZŁ' },
  { id: 'pr9', category: 'Protetyka', title: 'Licówka porcelanowa', price: '2500 ZŁ' },
  { id: 'pr10', category: 'Protetyka', title: 'Mikroproteza', price: '650 ZŁ' },
  { id: 'pr11', category: 'Protetyka', title: 'Modele diagnostyczne', price: '100 ZŁ' },
  { id: 'pr12', category: 'Protetyka', title: 'Most lany licowany porcelaną 1 punkt', price: '1500 ZŁ' },
  { id: 'pr13', category: 'Protetyka', title: 'Most na tlenku cyrkonu 1 punkt', price: '2200 ZŁ' },
  { id: 'pr14', category: 'Protetyka', title: 'Nakład kompozytowy Onlay/Inlay', price: '850 ZŁ' },
  { id: 'pr15', category: 'Protetyka', title: 'Proteza karonowa 1 łuk', price: '2800 ZŁ' },
  { id: 'pr16', category: 'Protetyka', title: 'Proteza akrylowa 1 łuk', price: '1850 ZŁ' },
  { id: 'pr17', category: 'Protetyka', title: 'Proteza natychmiastowa akrylowa 1 łuk', price: '1650 ZŁ' },
  { id: 'pr18', category: 'Protetyka', title: 'Proteza szkieletowa 1 łuk', price: '2900 ZŁ' },
  { id: 'pr19', category: 'Protetyka', title: 'Rozcięcie korony lanej 1 punkt', price: '250 ZŁ' },
  { id: 'pr20', category: 'Protetyka', title: 'Rozcięcie korony z tlenku cyrkonu 1 punkt', price: '350 ZŁ' },
  { id: 'pr21', category: 'Protetyka', title: 'Szynowanie 1 ząb', price: '150 ZŁ' },
  { id: 'pr22', category: 'Protetyka', title: 'Wypełnienie/odbudowa przedprotetyczna (Core)', price: '350 ZŁ' },
  { id: 'pr23', category: 'Protetyka', title: 'Zatrzask w protezie szkieletowej', price: '300 ZŁ' },
  { id: 'pr24', category: 'Protetyka', title: 'Korona tymczasowa', price: '600 ZŁ' },

  // Pedodoncja
  { id: 'pd1', category: 'Pedodoncja', title: 'Lakowanie 1 ząb', price: '150 ZŁ' },
  { id: 'pd2', category: 'Pedodoncja', title: 'Leczenie kanałowe zęba mlecznego I etap', price: '350 ZŁ' },
  { id: 'pd3', category: 'Pedodoncja', title: 'Leczenie kanałowe zęba mlecznego II etap', price: '300 ZŁ' },
  { id: 'pd4', category: 'Pedodoncja', title: 'Usunięcie zęba mlecznego', price: '200-450 ZŁ' },
  { id: 'pd5', category: 'Pedodoncja', title: 'Wizyta adaptacyjna do 30 minut', price: '250 ZŁ' },
  { id: 'pd6', category: 'Pedodoncja', title: 'Wypełnienie w zębie mlecznym / Glassjonomer', price: '200 ZŁ' },
  { id: 'pd7', category: 'Pedodoncja', title: 'Wypełnienie w zębie mlecznym kompozytowe/kolorowe', price: '280 ZŁ' },
  { id: 'pd8', category: 'Pedodoncja', title: 'Ściąganie osadów z zębów mlecznych w wizycie kontrolnej', price: '100 ZŁ' },

  // Radiologia
  { id: 'ra1', category: 'Radiologia', title: 'Pantomogram', price: '100 ZŁ' },
  { id: 'ra2', category: 'Radiologia', title: 'Tomografia CBCT 10x10', price: '250 ZŁ' },
  { id: 'ra3', category: 'Radiologia', title: 'Tomografia CBCT 10x10 szybki skan', price: '200 ZŁ' },
  { id: 'ra4', category: 'Radiologia', title: 'Tomografia CBCT Endo', price: '150 ZŁ' },

  // Inne
  { id: 'in1', category: 'Inne', title: 'Konsultacja/Przegląd', price: '200 ZŁ' },
  { id: 'in2', category: 'Inne', title: 'Konsultacja z omówieniem planu leczenia', price: '300 ZŁ' },
  { id: 'in3', category: 'Inne', title: 'Leczenie napięcia mięśni toksyną botulinową 1 obszar', price: 'od 800 ZŁ' },
  { id: 'in4', category: 'Inne', title: 'Mock-up cyfrowy', price: '150 ZŁ' },
  { id: 'in5', category: 'Inne', title: 'Preparat do wybielania nakładkowego', price: 'Wycena ind.' },
  { id: 'in6', category: 'Inne', title: 'Szyna podnosząca zwarcie górna', price: '500 ZŁ' },
  { id: 'in7', category: 'Inne', title: 'Szyna relaksacyjna', price: '480 ZŁ' },
  { id: 'in8', category: 'Inne', title: 'Wybielanie nakładkowe', price: '1200 ZŁ' },
  { id: 'in9', category: 'Inne', title: 'Ściągnięcie retainera 1 łuk', price: '450 ZŁ' },
  { id: 'in10', category: 'Inne', title: 'Ściągnięcie retainera oba łuki', price: '650 ZŁ' }
];

export const TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'dr n. med. Anna Kowalska',
    role: 'Specjalista endodoncji',
    imageUrl: '/img/zespol-1.jpg',
    bio: 'W gabinecie nazywają mnie "Panią od Mikroskopu", bo spędzam przy nim więcej czasu niż przed telewizorem. Jestem perfekcjonistką w leczeniu kanałowym, ale prywatnie... potrafię przypalić wodę na herbatę. Uważam, że każdy ząb zasługuje na drugą szansę – walczę o nie do ostatniego milimetra kanału! Dla pacjentów mam zawsze dużo uśmiechu i cierpliwości, bo wiem, że nikt nie przychodzi na leczenie kanałowe hobbystycznie.',
    guiltyPleasure: 'Objadanie się pizzą z podwójnym serem po ciężkim dniu pracy i oglądanie "Przyjaciół" po raz setny.'
  },
  {
    id: 't2',
    name: 'lek. dent. Jan Nowak',
    role: 'Chirurg stomatologiczny',
    imageUrl: '/img/zespol-2.jpg',
    bio: 'Mój wygląd może mylić – pacjenci myślą, że chirurg musi być groźny, a ja... no cóż, jestem raczej typem "łagodnego olbrzyma". Moją supermocą jest odwracanie uwagi. Zanim zorientujesz się, że trzymam znieczulenie, będziemy już rozmawiać o Twoim psie albo planach wakacyjnych. Po godzinach zamieniam wiertło na wiertarkę udarową – uwielbiam majsterkować, choć żona twierdzi, że głównie "naprawiam to, co sam zepsułem".',
    guiltyPleasure: 'Śpiewanie polskich hitów z lat 80. w samochodzie (na cały głos, przy otwartych oknach).'
  },
  {
    id: 't3',
    name: 'mgr hig. stom. Ewa Wiśniewska',
    role: 'Higienistka stomatologiczna',
    imageUrl: '/img/zespol-3.jpg',
    bio: 'Jestem strażniczką kamienia i pogromczynią osadu! W gabinecie dbam o to, by Wasze uśmiechy lśniły, a dziąsła były zdrowe. Może się wydawać, że jestem surowa, gdy pytam o nitkowanie zębów, ale to tylko z troski. Uwielbiam rozmawiać z ludźmi i sprawiać, że wychodzą ode mnie z poczuciem świeżości. Prywatnie jestem "matką roślin" – moje mieszkanie powoli zamienia się w dżunglę.',
    guiltyPleasure: 'Kupowanie kolejnych roślin, na które nie mam już miejsca, i picie drogiej kawy z dużą ilością pianki.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Anna Kwiatkowska',
    rating: 5,
    date: '2 tygodnie temu',
    content: 'Pani Doktor jest niesamowita! Pełen profesjonalizm i podejście do pacjenta, które sprawia, że wizyta to przyjemność. Polecam z całego serca każdemu, kto boi się dentysty.'
  },
  {
    id: 'r2',
    author: 'Michał Zawadzki',
    rating: 5,
    date: 'Miesiąc temu',
    content: 'Bezbolesne leczenie, miła atmosfera i nowoczesny sprzęt. Bardzo dziękuję za uratowanie zęba, który inni chcieli usunąć!'
  },
  {
    id: 'r3',
    author: 'Karolina Wiśniewska',
    rating: 5,
    date: '3 miesiące temu',
    content: 'Najlepszy gabinet w Brzegu Dolnym. Ceny adekwatne do jakości, a efekt końcowy przerósł moje oczekiwania. Bonding wygląda rewelacyjnie.'
  },
    {
    id: 'r4',
    author: 'Piotr Zieliński',
    rating: 5,
    date: '4 miesiące temu',
    content: 'Profesjonalne podejście do dzieci. Moja córka wyszła z gabinetu uśmiechnięta. Polecam!'
  }
];