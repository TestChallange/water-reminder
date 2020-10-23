import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'

export const initPushNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification: typeof PushNotification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  })
}
