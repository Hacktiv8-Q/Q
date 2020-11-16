const { sendNotificationToClient } = require('../notify');

class NotificationController {
  static getNotification(req, res, next) {
    const { deviceToken } = req.body

    console.log('deviceToken', deviceToken)

    const tokens = [];

    const notificationData = {
      title: 'New message',
      body: 'This is test message',
    };

    setTimeout(() => {
      sendNotificationToClient(tokens.concat(deviceToken), notificationData);
    }, 5000);

    // console.log('notificationData', notificationData);
    res.status(200).json({ messages: 'Hello' });
  }
}

module.exports = NotificationController
