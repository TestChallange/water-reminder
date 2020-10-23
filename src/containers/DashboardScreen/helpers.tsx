import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'

import { getDateWithHours } from 'helpers/time'

const startHour = 10
const numberOfGlassesPerDay = 6
const hoursInterval = 2

const notificationKeys = Array.from(Array(numberOfGlassesPerDay).keys())

// simplified scheduling notifications for specific daytime hours
// should be extended to use settings provided by user
export const scheduleNotifications = () => {
  const addScheduledNotifications = () => {
    notificationKeys.forEach((key) => {
      PushNotification.localNotificationSchedule({
        channelId: 'water-channel',
        id: key,
        title: 'Drink water!',
        message: "It's time to drink another glass of water.",
        date: getDateWithHours(startHour + key * hoursInterval),
        repeatType: 'day',
      })
    })
  }
  Platform.OS === 'android'
    ? PushNotification.createChannel(
        {
          channelId: 'water-channel',
          channelName: 'Water Channel',
          channelDescription: 'Water Reminder notifications channel',
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        addScheduledNotifications
      )
    : addScheduledNotifications()
}
