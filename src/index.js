const cookieTypes = [];

const createAcceptAllSettings = () => cookieTypes.reduce((settings, current) => {
  settings.consents[current] = { status: 1 };
  return settings;
}, { consents: {} });

const createSelectedSettings = () => {
  const consentModalElm = document.getElementById('piwik-consent-modal');
  const checkboxElms = Array.from(consentModalElm.querySelectorAll('input[type="checkbox"]'));
  return checkboxElms.reduce((settings, current) => {
    settings.consents[current.name] = current.checked ? { status: 1 } : { status: 0 };
    return settings;
  }, { consents: {} });
};

const acceptAllCookies = () => {
  const settings = createAcceptAllSettings();
  ppms.cm.api('trackAgreeToAllClick');
  ppms.cm.api('setComplianceSettings', settings, () => {
    hideConsentModal();
    hideConsentBanner();
  }, console.error);
}

const acceptSelectedCookies = () => {
  const settings = createSelectedSettings();
  ppms.cm.api('trackSaveChoicesClick');
  ppms.cm.api('setComplianceSettings', settings, () => {
    hideConsentModal();
    hideConsentBanner();
  }, console.error);
}

const showConsentBanner = () => {
  const consentBannerElm = document.getElementById('piwik-consent-banner');
  if (!consentBannerElm) return;
  consentBannerElm.classList.remove('piwik-hidden');
}

const hideConsentBanner = () => {
  const consentBannerElm = document.getElementById('piwik-consent-banner');
  if (!consentBannerElm) return;
  consentBannerElm.classList.add('piwik-hidden');
}

const showConsentModal = () => {
  const consentModalElm = document.getElementById('piwik-consent-modal');
  if (!consentModalElm) return;
  consentModalElm.classList.remove('piwik-hidden');
}

const hideConsentModal = () => {
  const consentModalElm = document.getElementById('piwik-consent-modal');
  if (!consentModalElm) return;
  consentModalElm.classList.add('piwik-hidden');
}

const getComplianceSettings = () => new Promise((resolve, reject) => {
  ppms.cm.api('getComplianceSettings', resolve, reject);
});

const openConsentModal = async (settings) => {
  hideConsentBanner();
  if (document.getElementById('piwik-consent-modal')) {
    return showConsentModal();
  }
  const rootElm = document.getElementById('piwik-consent-root');
  const consentModalElm = document
    .getElementById('piwik-consent-template-consent-modal')
    .content
    .cloneNode(true);
  const consentModalContentElm = consentModalElm.getElementById('piwik-consent-modal-cookies');
  cookieTypes.forEach((type) => {
    const template = document.getElementById(`piwik-consent-template-cookie-type-${type}`);
    if (!template) {
      console.error(`Could not find template for cookie type ${type}`);
      return;
    }
    const typeNode = template.content.cloneNode(true);
    const checkbox = typeNode.querySelector('input');
    if (settings.consents[checkbox.name] && settings.consents[checkbox.name].status > 0) {
      checkbox.checked = 1;
    }
    consentModalContentElm.appendChild(typeNode);
  });

  const closeButtonElm = consentModalElm.getElementById('piwik-consent-modal-button-close');
  const saveButtonElm = consentModalElm.getElementById('piwik-consent-modal-button-save');
  const acceptButtonElm = consentModalElm.getElementById('piwik-consent-modal-button-accept');
  closeButtonElm.addEventListener('click', () => {
    ppms.cm.api('trackCloseButtonClick');
    hideConsentModal();
    showConsentBanner();
  });
  acceptButtonElm.addEventListener('click', acceptAllCookies);
  saveButtonElm.addEventListener('click', acceptSelectedCookies);
  rootElm.appendChild(consentModalElm);
  ppms.cm.api('trackMainFormView');
}

const openConsentBanner = (settings) => {
  const rootElm = document.getElementById('piwik-consent-root');
  const consentBannerElm = document
    .getElementById('piwik-consent-template-consent-banner')
    .content
    .cloneNode(true);
  const configButtonElm = consentBannerElm.getElementById('piwik-consent-banner-button-configure');
  const acceptButtonElm = consentBannerElm.getElementById('piwik-consent-banner-button-accept');
  configButtonElm.addEventListener('click', () => openConsentModal(settings));
  acceptButtonElm.addEventListener('click', acceptAllCookies);
  rootElm.appendChild(consentBannerElm);
}

const getInitialTypes = () => new Promise((resolve, reject) => {
  ppms.cm.api('getNewComplianceTypes', (newTypes) => {
    if (newTypes.length > 0) {
      ppms.cm.api('setInitialComplianceSettings', newTypes, () => {
        resolve(newTypes);
      }, reject);
    }
    resolve([]);
  }, reject);
})

const init = async () => {
  const settings = await getComplianceSettings();
  const types = await getInitialTypes();
  // Request consent for all new cookie types
  Array.prototype.push.apply(cookieTypes, types);
  // Check if there is an undecided cookie type
  const hasUndecided = Object.values(settings.consents).some((setting) => setting.status === -1);
  // If there are any new cookie types or any undecided ones, get all cookie types to show
  if (cookieTypes.length || hasUndecided) {
    Object.keys(settings.consents).forEach((name) => {
      if (!cookieTypes.includes(name)) {
        cookieTypes.push(name);
      }
    });
  }
  if (cookieTypes.length) {
    openConsentBanner(settings);
  }
}

init();
