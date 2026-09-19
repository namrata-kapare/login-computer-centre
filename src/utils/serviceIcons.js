import iconFerfar from '../assets/service-icons/ferfar.png';
import iconXerox from '../assets/service-icons/xerox.png';
import iconColorPrint from '../assets/service-icons/color-print.png';
import iconCitySurvey from '../assets/service-icons/city-survey.png';
import iconVarasNond from '../assets/service-icons/varas-nond.png';
import iconLamination from '../assets/service-icons/lamination.png';
import iconPikVima from '../assets/service-icons/pik-vima.png';
import icon712BojaKami from '../assets/service-icons/712-boja-kami.png';
import iconSocietyEkarar from '../assets/service-icons/society-ekarar.png';
import iconDocumentScan from '../assets/service-icons/document-scan.png';
import iconPassportOnlineRegistration from '../assets/service-icons/passport-online-registration.png';
import icon712VarilBojaNondavane from '../assets/service-icons/712-varil-boja-nondavane.png';
import iconTahsildarUtpannaDakhala from '../assets/service-icons/tahsildar-utpanna-dakhala.png';
import iconNewBankAccount from '../assets/service-icons/new-bank-account.png';
import iconMatdarNondani from '../assets/service-icons/matdar-nondani.png';
import iconBiyaneAnudanYojana from '../assets/service-icons/biyane-anudan-yojana.png';

// 12 New Service Icons
import iconLagnaBiodata from '../assets/service-icons/lagna-biodata.png';
import icon8aUtara from '../assets/service-icons/8a-utara.png';
import iconDigital712 from '../assets/service-icons/digital-712.png';
import iconShetkariOlakhpatra from '../assets/service-icons/shetkari-olakhpatra.png';
import iconPassportPhoto from '../assets/service-icons/passport-photo.png';
import iconAadhaarPanLink from '../assets/service-icons/aadhaar-pan-link.png';
import iconPancard from '../assets/service-icons/pancard.png';
import iconFssai from '../assets/service-icons/fssai.png';
import iconMaharashtraShasanRajpatra from '../assets/service-icons/maharashtra-shasan-rajpatra.png';
import iconJaatPadtalaniPramanpatra from '../assets/service-icons/jaat-padtalani-pramanpatra.png';
import iconHsc17 from '../assets/service-icons/hsc17.png';
import iconShopAct from '../assets/service-icons/shop-act.png';

// IDs of services that must NOT have icons
const NO_ICON_SERVICE_IDS = new Set([1, 2]);

export const serviceIconsMap = {
  // 12 Newly Integrated Service Icons
  6: iconLagnaBiodata,                       // लग्नाचा बायोडाटा / Marriage Biodata
  11: icon8aUtara,                           // 8/A उतारा / 8A Extract
  10: iconDigital712,                        // डिजिटल 7/12 / Digital 7/12 Extract
  22: iconShetkariOlakhpatra,                // शेतकरी ओळखपत्र / Farmer Identity Card
  8: iconPassportPhoto,                      // पासपोर्ट साईज फोटो / Passport Size Photo
  7: iconAadhaarPanLink,                     // आधार कार्ड व पॅनकार्ड लिंक / Aadhaar-PAN Linking
  9: iconPancard,                            // पॅनकार्ड / PAN Card
  4: iconFssai,                              // अन्न व औषध परवाना (FSSAI) / Food License - FSSAI
  5: iconMaharashtraShasanRajpatra,          // महाराष्ट्र शासन राजपत्र / Gazette Certificate
  13: iconJaatPadtalaniPramanpatra,          // जात पडताळणी प्रमाणपत्र / Caste Validity
  101: iconHsc17,                            // HSC 17 No. / HSC 17 No. Form
  3: iconShopAct,                            // शॉप ॲक्ट परवाना / Shop Act License

  // Existing service icons (retained unchanged)
  12: iconFerfar,                            // Ferfar Extract
  14: iconXerox,                             // Xerox / झेरॉक्स
  15: iconColorPrint,                        // Color Print / Color Xerox / रंगीत झेरॉक्स
  16: iconColorPrint,                        // Color Print / रंगीत प्रिंट
  17: iconDocumentScan,                      // Document Scan
  18: iconLamination,                        // Lamination / लॅमिनेशन
  19: iconPikVima,                           // Crop Insurance / पीक विमा
  20: iconVarasNond,                         // Varas Nond / वारस नोंद / Heir Entry
  21: iconCitySurvey,                        // City Survey Extract / सिटी सर्व्हे उतारा
  23: iconSocietyEkarar,                     // Society E-Karar / Society E-Agreement
  24: icon712BojaKami,                       // 7/12 Boja Kami / ७/१२ बोजा कमी करणे
  25: iconPassportOnlineRegistration,        // Passport Online Registration / पासपोर्ट ऑनलाईन नोंदणी
  26: icon712VarilBojaNondavane,             // 7/12 वर बोजा नोंदवणे / Charge Registration on 7/12
  27: iconTahsildarUtpannaDakhala,           // तहसीलदार उत्पन्न दाखला / Tehsildar Income Certificate
  28: iconNewBankAccount,                    // New Bank Account / नवीन बँक खाते
  29: iconMatdarNondani,                     // मतदार नोंदणी / Voter Registration
  30: iconBiyaneAnudanYojana,                 // बियाणे अनुदान योजना / Seed Subsidy Scheme

  // Key mappings for the 12 new icons
  'lagna-biodata': iconLagnaBiodata,
  'lagna-biodata.png': iconLagnaBiodata,
  '8a-utara': icon8aUtara,
  '8a-utara.png': icon8aUtara,
  '8a': icon8aUtara,
  '8a.png': icon8aUtara,
  'digital-712': iconDigital712,
  'digital-712.png': iconDigital712,
  'shetkari-olakhpatra': iconShetkariOlakhpatra,
  'shetkari-olakhpatra.png': iconShetkariOlakhpatra,
  'shetkari': iconShetkariOlakhpatra,
  'shetkari.png': iconShetkariOlakhpatra,
  'passport-photo': iconPassportPhoto,
  'passport-photo.png': iconPassportPhoto,
  'aadhaar-pan-link': iconAadhaarPanLink,
  'aadhaar-pan-link.png': iconAadhaarPanLink,
  'aadhaar-pan': iconAadhaarPanLink,
  'aadhaar-pan.png': iconAadhaarPanLink,
  'pancard': iconPancard,
  'pancard.png': iconPancard,
  'fssai': iconFssai,
  'fssai.png': iconFssai,
  'maharashtra-shasan-rajpatra': iconMaharashtraShasanRajpatra,
  'maharashtra-shasan-rajpatra.png': iconMaharashtraShasanRajpatra,
  'gazette': iconMaharashtraShasanRajpatra,
  'gazette.png': iconMaharashtraShasanRajpatra,
  'jaat-padtalani-pramanpatra': iconJaatPadtalaniPramanpatra,
  'jaat-padtalani-pramanpatra.png': iconJaatPadtalaniPramanpatra,
  'jaat-padtalani': iconJaatPadtalaniPramanpatra,
  'jaat-padtalani.png': iconJaatPadtalaniPramanpatra,
  'hsc17': iconHsc17,
  'hsc17.png': iconHsc17,
  'shop-act': iconShopAct,
  'shop-act.png': iconShopAct,

  // Key mappings for existing services
  'ferfar': iconFerfar,
  'ferfar.png': iconFerfar,
  'document-scan': iconDocumentScan,
  'document-scan.png': iconDocumentScan,
  'society-ekarar': iconSocietyEkarar,
  'society-ekarar.png': iconSocietyEkarar,
  'pik-vima': iconPikVima,
  'pik-vima.png': iconPikVima,
  '712-boja-kami': icon712BojaKami,
  '712-boja-kami.png': icon712BojaKami,
  'xerox': iconXerox,
  'xerox.png': iconXerox,
  'color-print': iconColorPrint,
  'color-print.png': iconColorPrint,
  'color-xerox': iconColorPrint,
  'color-xerox.png': iconColorPrint,
  'colorprint': iconColorPrint,
  'colorprint.png': iconColorPrint,
  'city-survey': iconCitySurvey,
  'city-survey.png': iconCitySurvey,
  'citysurvey': iconCitySurvey,
  'citysurvey.png': iconCitySurvey,
  'city-survey-extract': iconCitySurvey,
  'city-survey-extract.png': iconCitySurvey,
  'varas-nond': iconVarasNond,
  'varas-nond.png': iconVarasNond,
  'varasnond': iconVarasNond,
  'varasnond.png': iconVarasNond,
  'heir-entry': iconVarasNond,
  'heir-entry.png': iconVarasNond,
  'lamination': iconLamination,
  'lamination.png': iconLamination,
  'passport-online-registration': iconPassportOnlineRegistration,
  'passport-online-registration.png': iconPassportOnlineRegistration,
  '712-varil-boja-nondavane': icon712VarilBojaNondavane,
  '712-varil-boja-nondavane.png': icon712VarilBojaNondavane,
  'tahsildar-utpanna-dakhala': iconTahsildarUtpannaDakhala,
  'tahsildar-utpanna-dakhala.png': iconTahsildarUtpannaDakhala,
  'new-bank-account': iconNewBankAccount,
  'new-bank-account.png': iconNewBankAccount,
  'matdar-nondani': iconMatdarNondani,
  'matdar-nondani.png': iconMatdarNondani,
  'biyane-anudan-yojana': iconBiyaneAnudanYojana,
  'biyane-anudan-yojana.png': iconBiyaneAnudanYojana,
};

/**
 * Returns the custom PNG icon source for a given service, or null if it should not display a custom icon.
 */
export function getServiceCustomIcon(service) {
  if (!service) return null;

  // Explicitly return null for services without icons
  if (service.id && NO_ICON_SERVICE_IDS.has(service.id)) {
    return null;
  }

  // Check by service.marathiName or englishName for excluded services
  const eng = (service.englishName || '').toLowerCase();
  const mar = (service.marathiName || '').toLowerCase();
  if (
    eng.includes('domicile') || mar.includes('अधिवास') ||
    eng.includes('udyam') || mar.includes('उद्योग')
  ) {
    return null;
  }

  // 1. Direct path/URL in service.icon
  if (
    typeof service.icon === 'string' &&
    (service.icon.startsWith('/') ||
      service.icon.startsWith('data:') ||
      service.icon.startsWith('http://') ||
      service.icon.startsWith('https://') ||
      service.icon.includes('.png') ||
      service.icon.includes('.svg') ||
      service.icon.includes('.webp'))
  ) {
    if (serviceIconsMap[service.icon]) {
      return serviceIconsMap[service.icon];
    }
    return service.icon;
  }

  // 2. Lookup by Service ID
  if (service.id && serviceIconsMap[service.id]) {
    return serviceIconsMap[service.id];
  }

  // 3. Lookup by service.icon key
  if (service.icon && serviceIconsMap[service.icon]) {
    return serviceIconsMap[service.icon];
  }

  // 4. Fallback name-based matching
  const iconStr = (typeof service.icon === 'string' ? service.icon.toLowerCase() : '');

  // 12 New services
  if (eng.includes('hsc 17') || mar.includes('१७ नंबर') || iconStr.includes('hsc17')) return iconHsc17;
  if (eng.includes('shop act') || mar.includes('शॉप ॲक्ट') || mar.includes('शॉप') || iconStr.includes('shop-act')) return iconShopAct;
  if (eng.includes('fssai') || mar.includes('अन्न व औषध') || iconStr.includes('fssai')) return iconFssai;
  if (eng.includes('gazette') || mar.includes('राजपत्र') || iconStr.includes('rajpatra') || iconStr.includes('gazette')) return iconMaharashtraShasanRajpatra;
  if (eng.includes('jaat') || mar.includes('जात पडताळणी') || eng.includes('caste validity') || iconStr.includes('jaat-padtalani')) return iconJaatPadtalaniPramanpatra;
  if (eng.includes('aadhaar-pan') || eng.includes('aadhaar + pan') || (mar.includes('आधार') && mar.includes('पॅन') && mar.includes('लिंक')) || iconStr.includes('aadhaar-pan')) return iconAadhaarPanLink;
  if (eng.includes('pan card') || (mar.includes('पॅन') && mar.includes('कार्ड') && !mar.includes('लिंक')) || iconStr.includes('pancard')) return iconPancard;
  if (eng.includes('passport photo') || eng.includes('passport size') || mar.includes('पासपोर्ट फोटो') || mar.includes('पासपोर्ट साईज') || iconStr.includes('passport-photo')) return iconPassportPhoto;
  if (eng.includes('farmer') || mar.includes('शेतकरी') || iconStr.includes('shetkari')) return iconShetkariOlakhpatra;
  if (eng.includes('digital 7/12') || mar.includes('डिजिटल ७/१२') || iconStr.includes('digital-712')) return iconDigital712;
  if (eng.includes('8a') || mar.includes('८-अ') || mar.includes('8/a') || iconStr.includes('8a')) return icon8aUtara;
  if (eng.includes('biodata') || mar.includes('बायोडाटा') || eng.includes('marriage') || iconStr.includes('lagna-biodata')) return iconLagnaBiodata;

  // Existing services
  if (eng.includes('ferfar') || mar.includes('फेरफार') || iconStr.includes('ferfar')) return iconFerfar;
  if (eng.includes('pik vima') || mar.includes('पीक विमा') || eng.includes('crop insurance') || iconStr.includes('pik-vima')) return iconPikVima;
  if (eng.includes('boja kami') || mar.includes('बोजा कमी') || eng.includes('removal of charge') || eng.includes('reduction of charge') || iconStr.includes('boja-kami')) return icon712BojaKami;
  if ((eng.includes('charge') && eng.includes('7/12')) || (mar.includes('7/12') && mar.includes('बोजा नोंदवणे')) || (mar.includes('७/१२') && mar.includes('बोजा नोंदवणे')) || iconStr.includes('varil-boja')) return icon712VarilBojaNondavane;
  if (eng.includes('tehsildar') || eng.includes('tahsildar') || mar.includes('तहसीलदार') || mar.includes('उत्पन्न दाखला') || iconStr.includes('tahsildar')) return iconTahsildarUtpannaDakhala;
  if (eng.includes('new bank') || (mar.includes('नवीन') && mar.includes('बँक')) || eng.includes('bank account') || iconStr.includes('bank-account')) return iconNewBankAccount;
  if (eng.includes('voter') || mar.includes('मतदार नोंदणी') || mar.includes('मतदार')) return iconMatdarNondani;
  if (eng.includes('seed') || mar.includes('बियाणे') || eng.includes('subsidy') || iconStr.includes('biyane-anudan')) return iconBiyaneAnudanYojana;
  if (eng.includes('passport online') || (mar.includes('पासपोर्ट') && mar.includes('नोंदणी')) || iconStr.includes('passport-online')) return iconPassportOnlineRegistration;
  if (eng.includes('city survey') || mar.includes('सिटी सर्व्हे') || iconStr.includes('city-survey')) return iconCitySurvey;
  if (eng.includes('varas') || mar.includes('वारस') || eng.includes('heir') || iconStr.includes('varas-nond')) return iconVarasNond;
  if (eng.includes('color print') || eng.includes('color xerox') || mar.includes('कलर प्रिंट') || mar.includes('रंगीत प्रिंट') || mar.includes('रंगीत झेरॉक्स') || iconStr.includes('color-print')) return iconColorPrint;
  if (eng.includes('xerox') && !eng.includes('color') && (mar === 'झेरॉक्स' || !mar.includes('रंगीत')) || iconStr === 'xerox') return iconXerox;
  if (eng.includes('document scan') || mar.includes('कागदपत्र स्कॅन') || iconStr.includes('document-scan')) return iconDocumentScan;
  if (eng.includes('lamination') || mar.includes('लॅमिनेशन') || iconStr.includes('lamination')) return iconLamination;
  if (eng.includes('society') || mar.includes('सोसायटी ई-करार')) return iconSocietyEkarar;

  return null;
}
