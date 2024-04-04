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

window.WWebJS.sendMediaMessage = async (
  base64,
  chatId,
  filename,
  caption,
  option = {}
) => {
  try {
    const numberExist = await window.WWebJS.checkNumberStatus(chatId); // xxxxxxx@c.us

    if (!numberExist) return false;
      
    // prepare
    const arr = base64.split(",");
    let mime = arr[0].match(/(?:data:)?(.*?)(?:;base64)?$/i)[1];
    mime = mime.split(/\s+;\s+/).join("; "); // Fix spaces, like "audio/ogg; codecs=opus"
    type = mime.match(/^(.*?)\//)[1];
    
    const msg = await WPP.chat.sendFileMessage(chatId, base64, {
        type: type,
        caption: caption, // Optional
        filename: filename, // Optional
        mimetype: mime // Optional
    });
      
    return true;
    // return { msg: msg, status: true };
  } catch (error) {
    return false;
  }
};
