import icon8a from '../assets/service-icons/8a.png';
import iconAadhaarPan from '../assets/service-icons/aadhaar-pan.png';
import iconAadhaar from '../assets/service-icons/aadhaar.png';
import iconAdhivas from '../assets/service-icons/adhivas.png';
import iconDigital712 from '../assets/service-icons/digital-712.png';
import iconDocumentScan from '../assets/service-icons/document-scan.png';
import iconFerfar from '../assets/service-icons/ferfar.png';
import iconFssai from '../assets/service-icons/fssai.png';
import iconGazette from '../assets/service-icons/gazette.png';
import iconHsc17 from '../assets/service-icons/hsc17.png';
import iconPancard from '../assets/service-icons/pancard.png';
import iconPassportPhoto from '../assets/service-icons/passport-photo.png';
import iconShetkari from '../assets/service-icons/shetkari.png';
import iconShopAct from '../assets/service-icons/shop-act.png';
import iconSocietyEkarar from '../assets/service-icons/society-ekarar.png';
import iconUdyam from '../assets/service-icons/udyam.png';
import iconJaatPadtalani from '../assets/service-icons/jaat-padtalani.png';
import iconPikVima from '../assets/service-icons/pik-vima.png';
import icon712BojaKami from '../assets/service-icons/712-boja-kami.png';
import iconXerox from '../assets/service-icons/xerox.png';
import iconColorPrint from '../assets/service-icons/color-print.png';
import iconLamination from '../assets/service-icons/lamination.png';
import iconLagnaBiodata from '../assets/service-icons/lagna-biodata.png';

export const serviceIconsMap = {
  // Service IDs mapped to custom PNG icons
  101: iconHsc17,         // HSC 17 No. Form
  1: iconAdhivas,         // Adhivas / Domicile Certificate
  2: iconUdyam,           // Udyam Registration
  3: iconShopAct,         // Shop Act License
  4: iconFssai,           // Food License - FSSAI
  5: iconGazette,         // Gazette Certificate
  6: iconLagnaBiodata,    // Marriage Biodata / लग्नाचा बायोडाटा
  7: iconAadhaarPan,      // Aadhaar + PAN Linking
  8: iconPassportPhoto,   // Passport Size Photo
  9: iconPancard,         // PAN Card
  10: iconDigital712,     // Digital 7/12 Extract
  11: icon8a,             // 8/A Extract
  12: iconFerfar,         // Ferfar Extract
  13: iconJaatPadtalani,  // Caste Validity / जात पडताळणी
  14: iconXerox,          // Xerox / झेरॉक्स
  16: iconColorPrint,     // Color Print / रंगीत प्रिंट
  17: iconDocumentScan,   // Document Scan
  18: iconLamination,     // Lamination / लॅमिनेशन
  19: iconPikVima,        // Crop Insurance / पीक विमा
  22: iconShetkari,       // Shetkari / Farmer Identity Card
  23: iconSocietyEkarar,  // Society E-Karar / Society E-Agreement
  24: icon712BojaKami,    // 7/12 Boja Kami / ७/१२ बोजा कमी करणे

  // Key mappings
  'hsc17': iconHsc17,
  'hsc17.png': iconHsc17,
  'adhivas': iconAdhivas,
  'adhivas.png': iconAdhivas,
  'udyam': iconUdyam,
  'udyam.png': iconUdyam,
  'shop-act': iconShopAct,
  'shop-act.png': iconShopAct,
  'fssai': iconFssai,
  'fssai.png': iconFssai,
  'gazette': iconGazette,
  'gazette.png': iconGazette,
  'pancard': iconPancard,
  'pancard.png': iconPancard,
  'aadhaar-pan': iconAadhaarPan,
  'aadhaar-pan.png': iconAadhaarPan,
  'passport-photo': iconPassportPhoto,
  'passport-photo.png': iconPassportPhoto,
  'shetkari': iconShetkari,
  'shetkari.png': iconShetkari,
  '8a': icon8a,
  '8a.png': icon8a,
  'digital-712': iconDigital712,
  'digital-712.png': iconDigital712,
  'ferfar': iconFerfar,
  'ferfar.png': iconFerfar,
  'document-scan': iconDocumentScan,
  'document-scan.png': iconDocumentScan,
  'society-ekarar': iconSocietyEkarar,
  'society-ekarar.png': iconSocietyEkarar,
  'aadhaar': iconAadhaar,
  'aadhaar.png': iconAadhaar,
  'jaat-padtalani': iconJaatPadtalani,
  'jaat-padtalani.png': iconJaatPadtalani,
  'pik-vima': iconPikVima,
  'pik-vima.png': iconPikVima,
  '712-boja-kami': icon712BojaKami,
  '712-boja-kami.png': icon712BojaKami,
  'xerox': iconXerox,
  'xerox.png': iconXerox,
  'color-print': iconColorPrint,
  'color-print.png': iconColorPrint,
  'lamination': iconLamination,
  'lamination.png': iconLamination,
  'lagna-biodata': iconLagnaBiodata,
  'lagna-biodata.png': iconLagnaBiodata,
};

/**
 * Returns the custom PNG icon source for a given service, or null if it should use a standard icon.
 */
export function getServiceCustomIcon(service) {
  if (!service) return null;

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
  const eng = (service.englishName || '').toLowerCase();
  const mar = (service.marathiName || '').toLowerCase();

  if (eng.includes('hsc 17') || mar.includes('१७ नंबर')) return iconHsc17;
  if (eng.includes('domicile') || mar.includes('अधिवास')) return iconAdhivas;
  if (eng.includes('udyam') || mar.includes('उद्योग')) return iconUdyam;
  if (eng.includes('shop act') || mar.includes('शॉप') || mar.includes('आस्थापना')) return iconShopAct;
  if (eng.includes('fssai') || mar.includes('अन्न व औषध')) return iconFssai;
  if (eng.includes('gazette') || mar.includes('राजपत्र')) return iconGazette;
  if (eng.includes('jaat') || mar.includes('जात पडताळणी') || eng.includes('caste validity')) return iconJaatPadtalani;
  if (eng.includes('aadhaar-pan') || eng.includes('aadhaar + pan') || (mar.includes('आधार') && mar.includes('पॅन') && mar.includes('लिंक'))) return iconAadhaarPan;
  if (eng.includes('pan card') || mar.includes('पॅन कार्ड')) return iconPancard;
  if (eng.includes('passport') || mar.includes('पासपोर्ट')) return iconPassportPhoto;
  if (eng.includes('farmer') || mar.includes('शेतकरी')) return iconShetkari;
  if (eng.includes('digital 7/12') || mar.includes('डिजिटल ७/१२')) return iconDigital712;
  if (eng.includes('8a') || mar.includes('८-अ')) return icon8a;
  if (eng.includes('ferfar') || mar.includes('फेरफार')) return iconFerfar;
  if (eng.includes('pik vima') || mar.includes('पीक विमा') || eng.includes('crop insurance')) return iconPikVima;
  if (eng.includes('boja') || mar.includes('बोजा कमी') || eng.includes('charge on 7/12') || eng.includes('removal of charge')) return icon712BojaKami;
  if (eng.includes('xerox') && !eng.includes('color') && (mar === 'झेरॉक्स' || !mar.includes('रंगीत'))) return iconXerox;
  if (eng.includes('color print') || mar.includes('कलर प्रिंट') || mar.includes('रंगीत प्रिंट')) return iconColorPrint;
  if (eng.includes('document scan') || mar.includes('कागदपत्र स्कॅन')) return iconDocumentScan;
  if (eng.includes('lamination') || mar.includes('लॅमिनेशन')) return iconLamination;
  if (eng.includes('biodata') || mar.includes('बायोडाटा') || eng.includes('marriage biodata')) return iconLagnaBiodata;
  if (eng.includes('society') || mar.includes('सोसायटी ई-करार')) return iconSocietyEkarar;
  if (eng.includes('aadhaar') || mar.includes('आधार')) return iconAadhaar;

  return null;
}
