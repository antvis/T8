import zh_CN from './zh_CN';

type Local = Record<string, string>;
class Lang {
  locale: Local;
  constructor(locale: Local) {
    this.locale = locale;
  }

  get(key: string) {
    return this.locale[key] || key || '';
  }

  getLocale() {
    return this.locale;
  }

  changeLocal(locale: Local) {
    this.locale = locale;
  }
}

const intl = new Lang(zh_CN);
export default intl;
