
document.addEventListener('DOMContentLoaded', () => {
  const languageSwitch = document.getElementById('language-switch');
  let currentLanguage = localStorage.getItem('language') || 'pt';

  const setLanguage = (lang) => {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateText();
    updateLanguageSwitch();
  };

  const updateText = () => {
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.getAttribute('data-key');
      const translation = translations[currentLanguage][key];
      if (translations[currentLanguage] && translation) {
        if (Array.isArray(translation)) {
          element.innerHTML = translation.map(item => `<li>${item}</li>`).join('');
        } else if (element.tagName === 'IFRAME') {
          element.src = translation;
        } else {
          element.innerHTML = translation;
        }
      }
    });
  };

  const updateLanguageSwitch = () => {
    if (currentLanguage === 'en') {
      languageSwitch.textContent = 'Português';
    } else {
      languageSwitch.textContent = 'English';
    }
  };

  languageSwitch.addEventListener('click', () => {
    const newLang = currentLanguage === 'en' ? 'pt' : 'en';
    setLanguage(newLang);
  });

  setLanguage(currentLanguage);
});
