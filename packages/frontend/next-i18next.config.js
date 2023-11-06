module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    // all the locales supported in the application
    locales: ['en', 'fi'], 
    // the default locale to be used when visiting
    // a non-localized route (e.g. `/about`)   
    defaultLocale: 'en'
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',

}