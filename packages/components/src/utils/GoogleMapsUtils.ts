export const loadMapApi = () => {
  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDvW5-5pUX6a1CWaP_BlbbSNuZsO-8Zeio&libraries=places&language=no&region=NO&v=quarterly`;
  const scripts = document.getElementsByTagName('script');
  // Go through existing script tags, and return google maps api tag when found.
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapScript = document.createElement('script');
  googleMapScript.src = mapsURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;
  window.document.body.appendChild(googleMapScript);

  return googleMapScript;
};

export const unloadMapApi = () => {
  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDvW5-5pUX6a1CWaP_BlbbSNuZsO-8Zeio&libraries=places&language=no&region=NO&v=quarterly`;
  const scripts = document.getElementsByTagName('script');
  // Go through existing script tags, and return google maps api tag when found.
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapsURL) === 0) {
      scripts[i].remove();
    }
  }
};
