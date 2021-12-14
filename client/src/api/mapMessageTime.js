/**
 * Chatboxin viestien saapumisajan muuntaminen oikeaan formaattiin
 * @author Mete Güneysel, Nicklas Sundell
 * @param {*} messages
 * @returns
 */
const mapMessageTime = (messages) =>
  messages.map((message) => {
    const time = new Date(message.messageTime)
      .toLocaleString('en-GB')
      .split(',');
    const today = new Date(Date.now()).toLocaleString('en-GB').split(',');
    let msgTime;
    if (time[0] === today[0]) msgTime = `Today at ${time[1]}`;
    return {
      ...message,
      messageTime: msgTime ?? `${time[0]} at ${time[1]}`,
    };
  });
export default mapMessageTime;
