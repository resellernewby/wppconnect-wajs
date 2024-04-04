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
window.WWebJS.sendMessageToId = async (chatId, message) => {
  try {
    const numberExist = await window.WWebJS.checkNumberStatus(chatId); // xxxxxxx@c.us

    if (!numberExist) return false;
    
    const msg = await WPP.chat.sendTextMessage(chatId, message, { createChat: true });          
      
    return true;
    // return { msg: msg, status: true };
  } catch (error) {
    return false;
  }
};
