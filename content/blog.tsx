import React from 'react';

export interface BlogPost {
  id: string;
  short: string;      // tytuł na kafelku
  title: string;      // tytuł w arkuszu
  lead: string;       // podtytuł
  image: string;
  icon: string;
  body: React.ReactNode;
}

const Quote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-serif italic text-lg leading-snug text-clinic-text border-l-2 border-clinic-primary pl-4 my-5">
    {children}
  </p>
);

const Box: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-clinic-sand/60 rounded-2xl p-4 my-5">
    <h5 className="font-sans font-semibold text-sm text-clinic-text mb-2">{title}</h5>
    <div className="text-sm text-clinic-subtext leading-relaxed">{children}</div>
  </div>
);

export const BLOG: BlogPost[] = [
  {
    id: 'microscope',
    short: 'Mikroskop',
    title: 'Precyzja ponad wszystko',
    lead: 'Dlaczego mikroskop jest u nas standardem, a nie dodatkiem.',
    image: '/img/mikroskop.jpg',
    icon: 'Sparkles',
    body: (
      <>
        <p>Wiele osób pyta, dlaczego w naszym gabinecie mikroskop jest standardem, a nie dodatkiem do „trudnych przypadków”. Odpowiedź leży w szczegółach, których ludzkie oko po prostu nie jest w stanie dostrzec.</p>
        <p>Tradycyjna stomatologia opiera się na dotyku i wzroku lekarza. Jednak nawet najlepszy wzrok ma swoje granice. Mikroskop zabiegowy pozwala nam na powiększenie pola pracy nawet 25-krotnie.</p>
        <Box title="Co widzimy dzięki powiększeniu?">
          <ul className="list-disc pl-4 space-y-1">
            <li>Mikropęknięcia szkliwa, niewidoczne gołym okiem, a mogące powodować ból.</li>
            <li>Dodatkowe kanały w korzeniach zęba, których pominięcie to najczęstsza przyczyna niepowodzeń leczenia kanałowego.</li>
            <li>Nieszczelności starych wypełnień, pod którymi rozwija się próchnica wtórna.</li>
          </ul>
        </Box>
        <p>Podczas leczenia próchnicy mikroskop pozwala na <strong>mikroinwazyjność</strong>. Usuwam tylko chorą tkankę, oszczędzając każdy milimetr zdrowego zęba. Precyzja ta przekłada się na idealną szczelność nowych wypełnień.</p>
        <p>Mikroskop to nie tylko leczenie kanałowe. Używam go do precyzyjnego szlifowania zębów pod korony oraz podczas higienizacji, aby usunąć najdrobniejsze złogi kamienia.</p>
        <Quote>W stomatologii to, czego nie widać, ma największe znaczenie.</Quote>
      </>
    )
  },
  {
    id: 'chairs',
    short: 'Fotele',
    title: 'Komfort ponad wszystko',
    lead: 'Nasze fotele są tak wygodne, że…',
    image: '/img/fotele.jpg',
    icon: 'DentalChair',
    body: (
      <>
        <p>Czy wizyta u dentysty może kojarzyć się z relaksem? Większość pacjentów powiedziałaby stanowcze „nie”. My postanowiliśmy to zmienić, zaczynając od podstaw, czyli od fotela, na którym spędzasz czas.</p>
        <Quote>Nasze fotele są tak wygodne, że niektórzy pacjenci ucinają sobie drzemkę… nawet podczas leczenia kanałowego.</Quote>
        <h5 className="font-sans font-semibold text-sm text-clinic-text">Technologia dla Twojego kręgosłupa</h5>
        <p>Nasze unity stomatologiczne zostały zaprojektowane z myślą o ergonomii i komforcie wielogodzinnych zabiegów. Zamiast twardej tapicerki wykorzystujemy piankę termoelastyczną (memory foam).</p>
        <Box title="Co to daje?">
          <p><strong>Idealne podparcie.</strong> Fotel dopasowuje się do kształtu ciała, eliminując punkty ucisku. Nawet długa wizyta nie kończy się bólem pleców.</p>
          <p className="mt-2"><strong>Redukcja napięcia.</strong> Gdy ciało jest zrelaksowane, poziom stresu spada, a znieczulenie działa skuteczniej.</p>
        </Box>
        <p>Wygodny fotel to nie fanaberia, to element skutecznego leczenia. Kiedy Ty odpoczywasz, my możemy pracować precyzyjnie i spokojnie.</p>
      </>
    )
  },
  {
    id: 'whitespots',
    short: 'Białe plamy',
    title: 'Leczenie białych plam metodą ICON',
    lead: 'Bez wiertła, bez bólu, z natychmiastowym efektem.',
    image: '/img/biale-plamy.jpg',
    icon: 'Tooth',
    body: (
      <>
        <p>Białe plamki na zębach to problem, z którym zmaga się wielu pacjentów. Często są pamiątką po leczeniu ortodontycznym lub wynikiem fluorozy. Do niedawna jedynym sposobem było borowanie i kompozyt lub licówki. Dziś mamy metodę <strong>ICON</strong>.</p>
        <Box title="Czym jest infiltracja żywicą?">
          <p>ICON pozwala usunąć białe plamy bez użycia wiertła i bez bólu. Porowate szkliwo nasączamy żywicą o współczynniku załamania światła identycznym jak zdrowe szkliwo.</p>
        </Box>
        <h5 className="font-sans font-semibold text-sm text-clinic-text">Jak wygląda zabieg?</h5>
        <ol className="list-decimal pl-4 space-y-1">
          <li><strong>Przygotowanie.</strong> Zabezpieczamy dziąsła.</li>
          <li><strong>Otwarcie porów.</strong> Specjalny żel otwiera pory w zmienionym szkliwie.</li>
          <li><strong>Infiltracja.</strong> Płynna żywica wnika głęboko w strukturę plamy.</li>
          <li><strong>Utwardzanie.</strong> Lampa polimeryzacyjna scala żywicę z zębem.</li>
        </ol>
        <Quote>Efekt jest natychmiastowy. Plama znika, a ząb odzyskuje jednolity kolor i blask.</Quote>
        <p>Metoda nie tylko poprawia estetykę, ale też zatrzymuje początkową próchnicę, wzmacniając strukturę zęba.</p>
      </>
    )
  },
  {
    id: 'anxiety',
    short: 'Bez lęku',
    title: 'Twoja muzyka i zero rażącego światła',
    lead: 'Protokół Comfort First dla pacjentów z lękiem.',
    image: '/img/bez-leku.jpg',
    icon: 'Headphones',
    body: (
      <>
        <p>Lęk przed dentystą dotyczy niemal połowy Polaków. Często wynika z traumatycznych przeżyć: zapachu eugenolu, dźwięku wiertła czy bólu. W Uśmiechnie wierzymy, że współczesna stomatologia może i musi wyglądać inaczej.</p>
        <Quote>Stworzyliśmy miejsce, w którym leczenie zębów przestaje być stresującym obowiązkiem, a staje się chwilą dla Ciebie.</Quote>
        <h5 className="font-sans font-semibold text-sm text-clinic-text">Jak walczymy ze stresem?</h5>
        <Box title="Dźwięk">
          <p>Cisza lub Twoja muzyka. Zabierz słuchawki z redukcją szumów i słuchaj ulubionego podcastu. Dźwięk wiertła staje się odległym tłem.</p>
        </Box>
        <Box title="Wzrok">
          <p>Ostre światło lampy bywa drażniące, dlatego dajemy ciemne okulary ochronne. Dla Ciebie chwila odpoczynku oczu, dla nas pełne oświetlenie pola pracy.</p>
        </Box>
        <Box title="Komunikacja">
          <p>Przed każdym etapem mówimy, co będziemy robić. Ustalamy gest „stop”: podnosisz rękę, natychmiast przerywamy. To Ty masz kontrolę.</p>
        </Box>
        <p>Mniej bodźców to mniej kortyzolu. Wychodzisz z gabinetu nie tylko ze zdrowym uśmiechem, ale też zrelaksowany.</p>
      </>
    )
  }
];
