'use strict';

const gtranslate = require('@vitalets/google-translate-api');

class Translator {
  constructor() {
    this.response = '';
    this.lang_codes = [
      'af',
      'sq',
      'ar',
      'az',
      'eu',
      'bn',
      'be',
      'bg',
      'ca',
      'hr',
      'cs',
      'da',
      'nl',
      'en',
      'eo',
      'et',
      'tl',
      'fi',
      'fr',
      'gl',
      'ka',
      'de',
      'el',
      'gu',
      'ht',
      'iw',
      'hi',
      'hu',
      'is',
      'id',
      'ga',
      'it',
      'ja',
      'kn',
      'ko',
      'la',
      'lv',
      'lt',
      'mk',
      'ms',
      'mt',
      'no',
      'fa',
      'pl',
      'pt',
      'ro',
      'ru',
      'sr',
      'sk',
      'sl',
      'es',
      'sw',
      'sv',
      'ta',
      'te',
      'th',
      'tr',
      'uk',
      'ur',
      'vi',
      'cy',
      'yi'
    ];
    this.lang_dict = {
      af: 'Afrikaans',
      sq: 'Albanian',
      ar: 'Arabic',
      az: 'Azerbaijani',
      eu: 'Basque',
      bn: 'Bengali',
      be: 'Belarusian',
      bg: 'Bulgarian',
      ca: 'Catalan',
      hr: 'Croation',
      cs: 'Czech',
      da: 'Danish',
      nl: 'Dutch',
      en: 'English',
      eo: 'Esperanto',
      et: 'Estonian',
      tl: 'Filipino',
      fi: 'Finnish',
      fr: 'French',
      gl: 'Galician',
      ka: 'Georgian',
      de: 'German',
      el: 'Greek',
      gu: 'Gujarati',
      ht: 'Haitian Creole',
      iw: 'Hebrew',
      hi: 'Hindi',
      hu: 'Hungarian',
      is: 'Icelandic',
      id: 'Indonesian',
      ga: 'Irish',
      it: 'Italian',
      ja: 'Japanese',
      kn: 'Kannada',
      ko: 'Korean',
      la: 'Latin',
      lv: 'Latvian',
      lt: 'Lithuanian',
      mk: 'Macedonian',
      ms: 'Malay',
      mt: 'Maltese',
      no: 'Norwegian',
      fa: 'Persian',
      pl: 'Polish',
      pt: 'Portuguese',
      ro: 'Romanian',
      ru: 'Russian',
      sr: 'Serbain',
      sk: 'Slovak',
      sl: 'Slovenian',
      es: 'Spanish',
      sw: 'Swahili',
      sv: 'Swedish',
      ta: 'Tamil',
      te: 'Telugu',
      th: 'Thai',
      tr: 'Turkish',
      uk: 'Ukrainian',
      ur: 'Urdu',
      vi: 'Vietnamese',
      cy: 'Welsh',
      yi: 'Yiddish'
    };
  }
  // Sends text through a bunch of random languages

  async telephone(text, langs) {
    if (langs < 0 || langs == 0) return text;
    let arr = [];
    for (let i = 0; i <= langs; i++) {
      let random = this.lang_codes[
        Math.floor(Math.random() * this.lang_codes.length)
      ];
      arr.push(random);
    }
    console.log(`Languages Chosen: ${arr}`);
    let ret = await multiTranslate(text, arr);

    return { ret, arr };
  }

  async multiTranslate(text, langs) {
    let data = text;
    console.log(`Multitranslate Called: ${langs}`);
    let prev = 'en'; // Start off by converting to English
    let promise = await gtranslate(data, { to: prev });
    try {
      data = promise.text;
    } catch (err) {
      console.log(err);
    }
    for (let i = 0; i < langs.length; i++) {
      console.log(langs[i]);
      promise = await gtranslate(data, { from: prev, to: langs[i] });
      try {
        data = promise.text;
      } catch (err) {
        console.log(err);
      }
      console.log(data);
      prev = langs[i];
    }
    return data;
  }

  // async translate(text, langFrom, langTo) {
  //   let data = text;
  //   try {
  //     data = await gtranslate(text, { from: langFrom, to: langTo });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return data.text;
  // }

  // async translate(text, lang) {
  //   let data = text;
  //   try {
  //     data = await gtranslate(text, { to: lang });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return data.text;
  // }
}

// let start = async () => {
//   let the = new Translator();
//   let t = await the.translate(
//     'fucking hell is this even working well?',
//     the.lang_codes[6]
//   );
//   console.log(t);
// };

// start();

module.exports = Translator;
