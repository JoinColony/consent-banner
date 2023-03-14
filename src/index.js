// var OPEN_CONSENT_FORM_ID = 'PiwikPROConsentForm-open-consent-form';
// var CLOSE_CONSENT_FORM_ID = 'PiwikPROConsentForm-close-consent-form';
// var CONTAINER_ID = 'PiwikPROConsentForm-container';
// var SAVE_ID = 'PiwikPROConsentForm-save';
// var AGREE_TO_ALL_ID = 'PiwikPROConsentForm-agree-to-all';
// var REJECT_ALL_ID = 'PiwikPROConsentForm-reject-all';
// var TOGGLE_DETAILS_ID = 'PiwikPROConsentForm-toggle-details';
// var DETAILS_ID = 'PiwikPROConsentForm-consents';
// var CONSENT_TYPES_ID = 'PiwikPROConsentForm-consent-types';
// var HIDDEN_CLASS = 'PiwikPROConsentForm-hidden';
// var ID_PREFIX = 'PiwikPROConsentForm-';
// var CONSENT_ITEM_CLASS = 'PiwikPROConsentForm-consent-item';
// var CONSENT_ITEM_TYPE_CLASS = 'PiwikPROConsentForm-consent-item-type';
// var CONSENT_ITEM_DESCRIPTION_CLASS = 'PiwikPROConsentForm-consent-item-description';
// var CHECKBOX_CLASS = 'PiwikPROConsentForm-consent-checkbox';
//
// var OPEN_REASON_MANUAL = 'manual';
// var OPEN_REASON_AUTO = 'auto';
//
// /** Descriptions for consent types. */
// var consentTypesDescriptions = {
//   analytics: {
//     name: 'Analytics',
//     description: 'We will store data in an aggregated form about visitors and their experiences on our website. We use this data to fix bugs and improve the experience for all visitors.'
//   },
//   ab_testing_and_personalization: {
//     name: 'AB Testing',
//     description: 'We will create a cookie in your browser to ensure consistency of our A/B tests. A/B tests are small changes displayed to different groups of visitors. We use the data to create a better experience for all visitors. We will also use this cookie to personalize content for you.'
//   },
//   conversion_tracking: {
//     name: 'Conversion Tracking',
//     description: 'We will store data about when you complete certain actions on our website to understand better how you use it. We use this data to improve your experience with our site.'
//   },
//   marketing_automation: {
//     name: 'Marketing Automation',
//     description: 'We will store data to create marketing campaigns for certain groups of visitors.'
//   },
//   remarketing: {
//     name: 'Remarketing',
//     description: 'We will store data to show you our advertisements (only ours) on other websites relevant to your interests.'
//   },
//   user_feedback: {
//     name: 'User Feedback',
//     description: 'We will store data in an aggregated form to analyze the performance of our website\'s user interface. We use this data to improve the site for all visitors.'
//   },
//   custom_consent: {
//     name: 'Custom consent',
//     description: 'Adjust this copy to your needs.'
//   }
// };
//
// /** HTML of the consent form, used to recreate the form after it's closed */
// var initialConsentFormHTML;
//
// function makeConsentFormVisible() {
//   document.getElementById(CONTAINER_ID).classList.remove(HIDDEN_CLASS);
// }
//
// function makeConsentFormHidden() {
//   document.getElementById(CONTAINER_ID).classList.add(HIDDEN_CLASS);
// }
//
// function toggleDetails() {
//   document.getElementById(DETAILS_ID).classList.toggle(HIDDEN_CLASS);
// }
//
// /** For given type, it adds checkbox, consent type and its description to the form */
// function addConsentItemElement(consentType, consentDetails) {
//   var consentItemElement;
//   var checkboxId = ID_PREFIX + 'consent-type-' + consentType;
//   var input, label;
//
//   input = document.createElement('input');
//   input.type = 'checkbox';
//   input.value = consentType;
//   input.checked = consentDetails.status === 1;
//   input.id = checkboxId;
//   input.classList.add(CHECKBOX_CLASS);
//
//   label = document.createElement('label');
//   label.setAttribute('for', checkboxId);
//   label.innerHTML = '' +
//     '<div class="' + CONSENT_ITEM_TYPE_CLASS + '">' +
//     consentTypesDescriptions[consentType].name +
//     '</div>' +
//     '<div class="' + CONSENT_ITEM_DESCRIPTION_CLASS + '">' +
//     consentTypesDescriptions[consentType].description +
//     '</div>';
//
//   consentItemElement = document.createElement('div');
//   consentItemElement.classList.add(CONSENT_ITEM_CLASS);
//   consentItemElement.appendChild(input);
//   consentItemElement.appendChild(label);
//
//   document.getElementById(DETAILS_ID).appendChild(consentItemElement);
// }
//
// /** Adds consent items (checkboxes) to the form */
// function showDetailedConsentTypesList(consentTypes, consentDetails) {
//   consentTypes.forEach(function (consentType) {
//     addConsentItemElement(consentType, consentDetails[consentType]);
//   });
// }
//
// /** Adds consent types list to the form */
// function showSimpleConsentTypesList(consentTypes) {
//   var ul = document.createElement('ul');
//
//   consentTypes.forEach(function (consentType) {
//     var li = document.createElement('li');
//
//     li.innerText = consentTypesDescriptions[consentType].name;
//     ul.appendChild(li);
//   });
//   document.getElementById(CONSENT_TYPES_ID).appendChild(ul);
// }
//
// function closeConsentForm() {
//   makeConsentFormHidden();
// }
//
// /** Saves consent decisions based on the checkboxes statuses and closes the form on success */
// function saveConsents() {
//   var consents = {};
//   var consentCheckboxes = document.getElementsByClassName(CHECKBOX_CLASS);
//   var i, currentCheckbox, currentConsentType, currentChecked;
//
//   for (i = 0; i < consentCheckboxes.length; i++) {
//     currentCheckbox = consentCheckboxes[i];
//     currentConsentType = currentCheckbox.value;
//     currentChecked = currentCheckbox.checked ? 1 : 0;
//     consents[currentConsentType] = { status: currentChecked };
//   }
//
//   ppms.cm.api('setComplianceSettings', { consents: consents }, closeConsentForm, console.error);
// }
//
// /** Sets status from the parameter for all checkboxes in the form */
// function setStatusForAll(status) {
//   var consentCheckboxes = document.getElementsByClassName(CHECKBOX_CLASS);
//   var i;
//
//   for (i = 0; i < consentCheckboxes.length; i++) {
//     consentCheckboxes[i].checked = status;
//   }
// }
//
// function agreeToAll() {
//   setStatusForAll(1);
//   saveConsents();
// }
//
// function rejectAll() {
//   setStatusForAll(0);
//   saveConsents();
// }
//
// function storeInitialHMTL() {
//   initialConsentFormHTML = document.getElementById(CONTAINER_ID).innerHTML;
// }
//
// function restoreInitialHMTL() {
//   document.getElementById(CONTAINER_ID).innerHTML = initialConsentFormHTML;
// }
//
// /** Makes consent form buttons interactive */
// function addEventListenersToConsentFormButtons() {
//   document.getElementById(SAVE_ID).addEventListener('click', function() {
//     saveConsents();
//     ppms.cm.api('trackSaveChoicesClick');
//   });
//   document.getElementById(AGREE_TO_ALL_ID).addEventListener('click', function() {
//     agreeToAll();
//     ppms.cm.api('trackAgreeToAllClick');
//   });
//   document.getElementById(REJECT_ALL_ID).addEventListener('click', function() {
//     rejectAll();
//     ppms.cm.api('trackRejectAllClick');
//   });
//   document.getElementById(TOGGLE_DETAILS_ID).addEventListener('click', function() {
//     toggleDetails();
//   });
//   document.getElementById(CLOSE_CONSENT_FORM_ID).addEventListener('click', function() {
//     closeConsentForm();
//     ppms.cm.api('trackCloseButtonClick');
//   });
// }
//
// /** Opens consent form, and shows consent types from the consentTypesToShow parameter. If consentTypesToShow is
//  * undefined, then all available consents are displayed. */
// function openConsentForm(consentTypesToShow, reason) {
//   ppms.cm.api('getComplianceSettings', function (settings) {
//     var consentDetails = settings.consents;
//     var allTypes = Object.keys(consentDetails);
//
//     restoreInitialHMTL();
//     addEventListenersToConsentFormButtons();
//     showDetailedConsentTypesList(consentTypesToShow || allTypes, consentDetails);
//     showSimpleConsentTypesList(consentTypesToShow || allTypes);
//     makeConsentFormVisible();
//
//     switch (reason) {
//       case OPEN_REASON_MANUAL: ppms.cm.api('trackPrivacyPolicyLinkView'); break;
//       default: ppms.cm.api('trackMainFormView');
//     }
//   }, console.error);
// }
//
// /** Makes "open consent form" button interactive if it's present on the website */
// function addOpenConsentFormButtonListener() {
//   var openConsentFormElement = document.getElementById(OPEN_CONSENT_FORM_ID);
//
//   if (openConsentFormElement) {
//     openConsentFormElement.addEventListener('click', function () {
//       openConsentForm(undefined, OPEN_REASON_MANUAL);
//     });
//   }
// }
//
// /** If there are any new (not decided) consent types, then cookie is saved and openConsentForm function is called. */
// function setNewConsentTypes (newTypes) {
//     ppms.cm.api('setInitialComplianceSettings', ['analytics'], function () { openConsentForm(['analytics'], OPEN_REASON_AUTO); }, console.error);
//   if (newTypes.length > 0) {
//     ppms.cm.api('setInitialComplianceSettings', newTypes, function () { openConsentForm(newTypes, OPEN_REASON_AUTO); }, console.error);
//   }
// }
//
// /** Checks for the consent types user never decided to agree/disagree. Passes those types to setNewConsentTypes function. */
// function setConsents() {
//   ppms.cm.api('getNewComplianceTypes', function (newTypes) { setNewConsentTypes(newTypes); }, console.error);
// }

// function init() {
//   storeInitialHMTL();
//   setConsents();
//   addOpenConsentFormButtonListener();
//   makeConsentFormVisible();
// }

const acceptAllCookies = () => {
  hideConsentModal();
  hideConsentBanner();
  console.log('accepting all cookies');
}

const acceptSelectedCookies = () => {
  hideConsentModal();
  hideConsentBanner();
  console.log('accepting selected cookies');
}

const showConsentBanner = () => {
  const consentBannerElm = document.getElementById('piwik-consent-banner');
  consentBannerElm.classList.remove('piwik-hidden');
}

const hideConsentBanner = () => {
  const consentBannerElm = document.getElementById('piwik-consent-banner');
  consentBannerElm.classList.add('piwik-hidden');
}

const showConsentModal = () => {
  const consentModalElm = document.getElementById('piwik-consent-modal');
  consentModalElm.classList.remove('piwik-hidden');
}

const hideConsentModal = () => {
  const consentModalElm = document.getElementById('piwik-consent-modal');
  consentModalElm.classList.add('piwik-hidden');
}

const openConsentModal = (newTypes) => {
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
  newTypes.forEach((type) => {
    const typeNode = document.getElementById(`piwik-consent-template-cookie-type-${type}`).content.cloneNode(true);
    consentModalContentElm.appendChild(typeNode);
  });

  const closeButtonElm = consentModalElm.getElementById('piwik-consent-modal-button-close');
  const saveButtonElm = consentModalElm.getElementById('piwik-consent-modal-button-save');
  const acceptButtonElm = consentModalElm.getElementById('piwik-consent-modal-button-accept');
  closeButtonElm.addEventListener('click', () => {
    hideConsentModal();
    showConsentBanner();
  });
  acceptButtonElm.addEventListener('click', acceptAllCookies);
  saveButtonElm.addEventListener('click', acceptSelectedCookies);
  rootElm.appendChild(consentModalElm);
}

const openConsentBanner = (newTypes) => {
  const rootElm = document.getElementById('piwik-consent-root');
  const consentBannerElm = document
    .getElementById('piwik-consent-template-consent-banner')
    .content
    .cloneNode(true);
  const configButtonElm = consentBannerElm.getElementById('piwik-consent-banner-button-configure');
  const acceptButtonElm = consentBannerElm.getElementById('piwik-consent-banner-button-accept');
  configButtonElm.addEventListener('click', () => openConsentModal(newTypes));
  acceptButtonElm.addEventListener('click', acceptAllCookies);
  rootElm.appendChild(consentBannerElm);
}

const initCompliance = () => {
  // ppms.cm.api('getNewComplianceTypes', (newTypes) => {
  //   if (newTypes.length > 0) {
  //     ppms.cm.api('setInitialComplianceSettings', newTypes, () => {
  //       openConsentBanner(newTypes);
  //     }, console.error);
  //   }
  // }, console.error);
  // TEMP for testing, uncomment the above instead
  openConsentBanner(['analytics']);
}

const init = () => {
  initCompliance();
}

init();
