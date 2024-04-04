window.WWebJS = {};
window.WWebJS.isReady = () => {
  return WPP.isReady;
};
window.WWebJS.checkNumberStatus = async (id) => {
  try {
    const isValid = await WPP.contact.queryExists(id);
    return isValid.wid ? true : false;
  } catch (error) {
    return false;
  }
};
