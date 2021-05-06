import { Component } from '@angular/core';
import { CleverTap } from '@ionic-native/clevertap/ngx';
import { ToastController } from '@ionic/angular';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public clevertap: CleverTap, public toastController: ToastController) {
    customElements.define('modal-page', class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
<ion-header>
  <ion-toolbar>
    <ion-title>CT Inbox</ion-title>
    <ion-buttons slot="primary">
      <ion-button onClick=>
        <ion-icon slot="icon-only" name="close"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content class="ion-padding">
  <ion-list>
  <ion-list-header>
      <ion-label>Inbox Messages</ion-label>
    </ion-list-header>
    <ion-item><ion-label>
        <h2>Message 1</h2>
        <p>Details inside Message 1</p>
        </ion-label>
    </ion-item>
    <ion-item><ion-label>
        <h2>Message 2</h2>
        <p>Details inside Message 2</p>
        </ion-label>
    </ion-item>
    <ion-item><ion-label>
        <h2>Message 3</h2>
        <p>Details inside Message 3</p>
        </ion-label>
    </ion-item>
    <ion-list-header>
      <ion-label>CleverTap Functions</ion-label>
    </ion-list-header>
    <ion-item>
      <ion-button expand="full">InitializeInbox</ion-button>
    </ion-item>
    <ion-item>
      <ion-button expand="full">getAllInboxMessages</ion-button>
    </ion-item>
    <ion-item>
      <ion-button expand="block">getUnreadInboxMessages</ion-button>
    </ion-item>
  </ion-list>
</ion-content>`;
      }
    });
    clevertap.onUserLogin({Identity: 'android098768', custom: 122211}).then(() => this.presentToast('User Login'));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  presentModal()
  {
    // create the modal with the `modal-page` component
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'modal-page';
    modalElement.cssClass = 'InboxModalClass';

    // present the modal
    document.body.appendChild(modalElement);
    return modalElement.present();

    async function dismissModal() {
      console.log('dismiss called');
      await modalElement.dismiss({
        dismissed: true
      });
    }
  }
  /* angular function, not used
  async function dismissModal() {
  await modal.dismiss({
    'dismissed': true
  });
} Function used above
  dismissModal() {
    const modalElement = document.getElementsByTagName('ion-modal')[0];
    return modalElement.dismiss();
  }
  */

  clickAlert()
  {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Alert';
    alert.subHeader = 'An alert you made';
    alert.message = 'This is an alert message.';
    alert.buttons = [{
      text: 'Let\'s get to it, then',
      handler: () => {
        console.log('Neutral');
      }
    }, {
      text: 'Let\'s do this!',
      handler: () => {
        console.log('Enthusiastic');
      }
    }];

    document.body.appendChild(alert);
    return alert.present();
  }

  pushChargedEvent1()
  {
    console.log('push charged event');
    this.clevertap.recordChargedEventWithDetailsAndItems({amount: 900, 'Charged ID': 1234}, [{
      Category: 'Book',
      Quantity: 1,
      Title: 'The Title Of This Book'
    }]);
    this.presentToast('Charged Event Pushed');
  }
  recordEventWithName()
  {
    console.log('recordEventWithName');
    this.clevertap.recordEventWithName(eventName: string);
    this.presentToast('recordEventWithName');
  }
  recordEventWithNameAndProps()
  {
    console.log('recordEventWithNameAndProps');
    this.clevertap.recordEventWithNameAndProps(eventName: string, eventProps: any);
    this.presentToast('recordEventWithNameAndProps');
  }
  recordChargedEventWithDetailsAndItems()
  {
    console.log('recordChargedEventWithDetailsAndItems');
    this.clevertap.recordChargedEventWithDetailsAndItems(details: any, items: any);
    this.presentToast('recordChargedEventWithDetailsAndItems');
  }
  eventGetFirstTime()
  {
    console.log('eventGetFirstTime');
    this.clevertap.eventGetFirstTime(eventName: string);
    this.presentToast('eventGetFirstTime');
  }
  eventGetLastTime()
  {
    console.log('eventGetLastTime');
    this.clevertap.eventGetLastTime(eventName: string);
    this.presentToast('eventGetLastTime');
  }
  eventGetOccurrences()
  {
    console.log('eventGetOccurrences');
    this.clevertap.eventGetOccurrences(eventName: string);
    this.presentToast('eventGetOccurrences');
  }
  eventGetDetails()
  {
    console.log('eventGetDetails');
    this.clevertap.eventGetDetails(eventName: string);
    this.presentToast('eventGetDetails');
  }
  getEventHistory()
  {
    console.log('getEventHistory');
    this.clevertap.getEventHistory();
    this.presentToast('getEventHistory');
  }
  recordScreenView()
  {
    console.log('recordScreenView');
    this.clevertap.recordScreenView(screenName: string);
    this.presentToast('recordScreenView');
  }
  getLocation()
  {
    console.log('getLocation');
    this.clevertap.getLocation();
    this.presentToast('getLocation');
  }
  setLocation()
  {
    console.log('setLocation');
    this.clevertap.setLocation(lat: number, lon: number);
    this.presentToast('setLocation');
  }
  onUserLogin()
  {
    console.log('onUserLogin');
    this.clevertap.onUserLogin(profile: any);
    this.presentToast('onUserLogin');
  }
  profileSet()
  {
    console.log('profileSet');
    this.clevertap.profileSet(profile: any);
    this.presentToast('profileSet');
  }
  profileSetGraphUser()
  {
    console.log('profileSetGraphUser');
    this.clevertap.profileSetGraphUser(profile: any);
    this.presentToast('profileSetGraphUser');
  }
  profileGooglePlusUser()
  {
    console.log('profileGooglePlusUser');
    this.clevertap.profileGooglePlusUser(profile: any);
    this.presentToast('profileGooglePlusUser');
  }
  profileGetProperty()
  {
    console.log('profileGetProperty');
    this.clevertap.profileGetProperty(propertyName: string);
    this.presentToast('profileGetProperty');
  }
  profileGetCleverTapAttributionIdentifier()
  {
    console.log('profileGetCleverTapAttributionIdentifier');
    this.clevertap.profileGetCleverTapAttributionIdentifier();
    this.presentToast('profileGetCleverTapAttributionIdentifier');
  }
  profileGetCleverTapID()
  {
    console.log('profileGetCleverTapID');
    this.clevertap.profileGetCleverTapID();
    this.presentToast('profileGetCleverTapID');
  }
  profileRemoveValueForKey()
  {
    console.log('profileRemoveValueForKey');
    this.clevertap.profileRemoveValueForKey(key: string);
    this.presentToast('profileRemoveValueForKey');
  }
  profileSetMultiValues()
  {
    console.log('profileSetMultiValues');
    this.clevertap.profileSetMultiValues(key: string, values: any);
    this.presentToast('profileSetMultiValues');
  }
  profileAddMultiValue()
  {
    console.log('profileAddMultiValue');
    this.clevertap.profileAddMultiValue(key: string, value: string);
    this.presentToast('profileAddMultiValue');
  }
  profileAddMultiValues()
  {
    console.log('profileAddMultiValues');
    this.clevertap.profileAddMultiValues(key: string, values: any);
    this.presentToast('profileAddMultiValues');
  }
  profileRemoveMultiValue()
  {
    console.log('profileRemoveMultiValue');
    this.clevertap.profileRemoveMultiValue(key: string, value: string);
    this.presentToast('profileRemoveMultiValue');
  }
  profileRemoveMultiValues()
  {
    console.log('profileRemoveMultiValues');
    this.clevertap.profileRemoveMultiValues(key: string, values: any);
    this.presentToast('profileRemoveMultiValues');
  }
  enablePersonalization()
  {
    console.log('enablePersonalization');
    this.clevertap.enablePersonalization();
    this.presentToast('enablePersonalization');
  }
  disablePersonalization()
  {
    console.log('disablePersonalization');
    this.clevertap.disablePersonalization();
    this.presentToast('disablePersonalization');
  }
  setOptOut()
  {
    console.log('setOptOut');
    this.clevertap.setOptOut(optOut: boolean);
    this.presentToast('setOptOut');
  }
  setOffline()
  {
    console.log('setOffline');
    this.clevertap.setOffline(offline: boolean);
    this.presentToast('setOffline');
  }
  enableDeviceNetworkInfoReporting()
  {
    console.log('enableDeviceNetworkInfoReporting');
    this.clevertap.enableDeviceNetworkInfoReporting(enable: boolean);
    this.presentToast('enableDeviceNetworkInfoReporting');
  }
  registerPush()
  {
    console.log('registerPush');
    this.clevertap.registerPush();
    this.presentToast('registerPush');
  }
  setPushToken()
  {
    console.log('setPushToken');
    this.clevertap.setPushToken(token: string);
    this.presentToast('setPushToken');
  }
  setPushXiaomiToken()
  {
    console.log('setPushXiaomiToken');
    this.clevertap.setPushXiaomiToken(token: string);
    this.presentToast('setPushXiaomiToken');
  }
  setPushBaiduToken()
  {
    console.log('setPushBaiduToken');
    this.clevertap.setPushBaiduToken(token: string);
    this.presentToast('setPushBaiduToken');
  }
  setPushHuaweiToken()
  {
    console.log('setPushHuaweiToken');
    this.clevertap.setPushHuaweiToken(token: string);
    this.presentToast('setPushHuaweiToken');
  }
  createNotification()
  {
    console.log('createNotification');
    this.clevertap.createNotification(extras: any);
    this.presentToast('createNotification');
  }
  createNotificationChannel()
  {
    console.log('createNotificationChannel');
    this.clevertap.createNotificationChannel(channelID: string, channelName: string, channelDescription: string, importance: number, showBadge: boolean);
    this.presentToast('createNotificationChannel');
  }
  createNotificationChannelWithSound()
  {
    console.log('createNotificationChannelWithSound');
    this.clevertap.createNotificationChannelWithSound(channelID: string, channelName: string, channelDescription: string, importance: number, showBadge: boolean, sound: string);
    this.presentToast('createNotificationChannelWithSound');
  }
  createNotificationChannelWithGroupId()
  {
    console.log('createNotificationChannelWithGroupId');
    this.clevertap.createNotificationChannelWithGroupId(channelID: string, channelName: string, channelDescription: string, importance: number, groupId: string, showBadge: boolean);
    this.presentToast('createNotificationChannelWithGroupId');
  }
  createNotificationChannelWithGroupIdAndSound()
  {
    console.log('createNotificationChannelWithGroupIdAndSound');
    this.clevertap.createNotificationChannelWithGroupIdAndSound(channelID: string, channelName: string, channelDescription: string, importance: number, groupId: string, showBadge: boolean, sound: string);
    this.presentToast('createNotificationChannelWithGroupIdAndSound');
  }
  createNotificationChannelGroup()
  {
    console.log('createNotificationChannelGroup');
    this.clevertap.createNotificationChannelGroup(groupID: string, groupName: string);
    this.presentToast('createNotificationChannelGroup');
  }
  deleteNotificationChannel()
  {
    console.log('deleteNotificationChannel');
    this.clevertap.deleteNotificationChannel(channelID: string);
    this.presentToast('deleteNotificationChannel');
  }
  deleteNotificationChannelGroup()
  {
    console.log('deleteNotificationChannelGroup');
    this.clevertap.deleteNotificationChannelGroup(groupID: string);
    this.presentToast('deleteNotificationChannelGroup');
  }
  sessionGetTimeElapsed()
  {
    console.log('sessionGetTimeElapsed');
    this.clevertap.sessionGetTimeElapsed();
    this.presentToast('sessionGetTimeElapsed');
  }
  sessionGetTotalVisits()
  {
    console.log('sessionGetTotalVisits');
    this.clevertap.sessionGetTotalVisits();
    this.presentToast('sessionGetTotalVisits');
  }
  sessionGetScreenCount()
  {
    console.log('sessionGetScreenCount');
    this.clevertap.sessionGetScreenCount();
    this.presentToast('sessionGetScreenCount');
  }
  sessionGetPreviousVisitTime()
  {
    console.log('sessionGetPreviousVisitTime');
    this.clevertap.sessionGetPreviousVisitTime();
    this.presentToast('sessionGetPreviousVisitTime');
  }
  sessionGetUTMDetails()
  {
    console.log('sessionGetUTMDetails');
    this.clevertap.sessionGetUTMDetails();
    this.presentToast('sessionGetUTMDetails');
  }
  pushInstallReferrer()
  {
    console.log('pushInstallReferrer');
    this.clevertap.pushInstallReferrer(source: string, medium: string, campaign: string);
    this.presentToast('pushInstallReferrer');
  }
  initializeInbox()
  {
    console.log('initializeInbox');
    this.clevertap.initializeInbox();
    this.presentToast('initializeInbox');
  }
  getInboxMessageUnreadCount()
  {
    console.log('getInboxMessageUnreadCount');
    this.clevertap.getInboxMessageUnreadCount();
    this.presentToast('getInboxMessageUnreadCount');
  }
  getInboxMessageCount()
  {
    console.log('getInboxMessageCount');
    this.clevertap.getInboxMessageCount();
    this.presentToast('getInboxMessageCount');
  }
  showInbox()
  {
    console.log('showInbox');
    this.clevertap.showInbox(styleConfig: any);
    this.presentToast('showInbox');
  }
  getAllInboxMessages()
  {
    console.log('getAllInboxMessages');
    this.clevertap.getAllInboxMessages();
    this.presentToast('getAllInboxMessages');
  }
  getUnreadInboxMessages()
  {
    console.log('getUnreadInboxMessages');
    this.clevertap.getUnreadInboxMessages();
    this.presentToast('getUnreadInboxMessages');
  }
  getInboxMessageForId()
  {
    console.log('getInboxMessageForId');
    this.clevertap.getInboxMessageForId(messageId: string);
    this.presentToast('getInboxMessageForId');
  }
  deleteInboxMessageForId()
  {
    console.log('deleteInboxMessageForId');
    this.clevertap.deleteInboxMessageForId(messageId: string);
    this.presentToast('deleteInboxMessageForId');
  }
  markReadInboxMessageForId()
  {
    console.log('markReadInboxMessageForId');
    this.clevertap.markReadInboxMessageForId(messageId: string);
    this.presentToast('markReadInboxMessageForId');
  }
  pushInboxNotificationViewedEventForId()
  {
    console.log('pushInboxNotificationViewedEventForId');
    this.clevertap.pushInboxNotificationViewedEventForId(messageId: string);
    this.presentToast('pushInboxNotificationViewedEventForId');
  }
  pushInboxNotificationClickedEventForId()
  {
    console.log('pushInboxNotificationClickedEventForId');
    this.clevertap.pushInboxNotificationClickedEventForId(messageId: string);
    this.presentToast('pushInboxNotificationClickedEventForId');
  }
  setUIEditorConnectionEnabled()
  {
    console.log('setUIEditorConnectionEnabled');
    this.clevertap.setUIEditorConnectionEnabled(enabled: boolean);
    this.presentToast('setUIEditorConnectionEnabled');
  }
  registerBooleanVariable()
  {
    console.log('registerBooleanVariable');
    this.clevertap.registerBooleanVariable(varName: string);
    this.presentToast('registerBooleanVariable');
  }
  registerDoubleVariable()
  {
    console.log('registerDoubleVariable');
    this.clevertap.registerDoubleVariable(varName: string);
    this.presentToast('registerDoubleVariable');
  }
  registerIntegerVariable()
  {
    console.log('registerIntegerVariable');
    this.clevertap.registerIntegerVariable(varName: string);
    this.presentToast('registerIntegerVariable');
  }
  registerStringVariable()
  {
    console.log('registerStringVariable');
    this.clevertap.registerStringVariable(varName: string);
    this.presentToast('registerStringVariable');
  }
  registerListOfBooleanVariable()
  {
    console.log('registerListOfBooleanVariable');
    this.clevertap.registerListOfBooleanVariable(varName: string);
    this.presentToast('registerListOfBooleanVariable');
  }
  registerListOfDoubleVariable()
  {
    console.log('registerListOfDoubleVariable');
    this.clevertap.registerListOfDoubleVariable(varName: string);
    this.presentToast('registerListOfDoubleVariable');
  }
  registerListOfIntegerVariable()
  {
    console.log('registerListOfIntegerVariable');
    this.clevertap.registerListOfIntegerVariable(varName: string);
    this.presentToast('registerListOfIntegerVariable');
  }
  registerListOfStringVariable()
  {
    console.log('registerListOfStringVariable');
    this.clevertap.registerListOfStringVariable(varName: string);
    this.presentToast('registerListOfStringVariable');
  }
  registerMapOfBooleanVariable()
  {
    console.log('registerMapOfBooleanVariable');
    this.clevertap.registerMapOfBooleanVariable(varName: string);
    this.presentToast('registerMapOfBooleanVariable');
  }
  registerMapOfDoubleVariable()
  {
    console.log('registerMapOfDoubleVariable');
    this.clevertap.registerMapOfDoubleVariable(varName: string);
    this.presentToast('registerMapOfDoubleVariable');
  }
  registerMapOfIntegerVariable()
  {
    console.log('registerMapOfIntegerVariable');
    this.clevertap.registerMapOfIntegerVariable(varName: string);
    this.presentToast('registerMapOfIntegerVariable');
  }
  registerMapOfStringVariable()
  {
    console.log('registerMapOfStringVariable');
    this.clevertap.registerMapOfStringVariable(varName: string);
    this.presentToast('registerMapOfStringVariable');
  }
  getBooleanVariable()
  {
    console.log('getBooleanVariable');
    this.clevertap.getBooleanVariable(varName: string, defaultValue: boolean);
    this.presentToast('getBooleanVariable');
  }
  getDoubleVariable()
  {
    console.log('getDoubleVariable');
    this.clevertap.getDoubleVariable(varName: string, defaultValue: number);
    this.presentToast('getDoubleVariable');
  }
  getIntegerVariable()
  {
    console.log('getIntegerVariable');
    this.clevertap.getIntegerVariable(varName: string, defaultValue: number);
    this.presentToast('getIntegerVariable');
  }
  getStringVariable()
  {
    console.log('getStringVariable');
    this.clevertap.getStringVariable(varName: string, defaultValue: string);
    this.presentToast('getStringVariable');
  }
  getListOfBooleanVariable()
  {
    console.log('getListOfBooleanVariable');
    this.clevertap.getListOfBooleanVariable(varName: string, defaultValue: any);
    this.presentToast('getListOfBooleanVariable');
  }
  getListOfDoubleVariable()
  {
    console.log('getListOfDoubleVariable');
    this.clevertap.getListOfDoubleVariable(varName: string, defaultValue: any);
    this.presentToast('getListOfDoubleVariable');
  }
  getListOfIntegerVariable()
  {
    console.log('getListOfIntegerVariable');
    this.clevertap.getListOfIntegerVariable(varName: string, defaultValue: any);
    this.presentToast('getListOfIntegerVariable');
  }
  getListOfStringVariable()
  {
    console.log('getListOfStringVariable');
    this.clevertap.getListOfStringVariable(varName: string, defaultValue: any);
    this.presentToast('getListOfStringVariable');
  }
  getMapOfBooleanVariable()
  {
    console.log('getMapOfBooleanVariable');
    this.clevertap.getMapOfBooleanVariable(varName: string, defaultValue: any);
    this.presentToast('getMapOfBooleanVariable');
  }
  getMapOfDoubleVariable()
  {
    console.log('getMapOfDoubleVariable');
    this.clevertap.getMapOfDoubleVariable(varName: string, defaultValue: any);
    this.presentToast('getMapOfDoubleVariable');
  }
  getMapOfIntegerVariable()
  {
    console.log('getMapOfIntegerVariable');
    this.clevertap.getMapOfIntegerVariable(varName: string, defaultValue: any);
    this.presentToast('getMapOfIntegerVariable');
  }
  getMapOfStringVariable()
  {
    console.log('getMapOfStringVariable');
    this.clevertap.getMapOfStringVariable(varName: string, defaultValue: any);
    this.presentToast('getMapOfStringVariable');
  }
  getAllDisplayUnits()
  {
    console.log('getAllDisplayUnits');
    this.clevertap.getAllDisplayUnits();
    this.presentToast('getAllDisplayUnits');
  }
  getDisplayUnitForId()
  {
    console.log('getDisplayUnitForId');
    this.clevertap.getDisplayUnitForId(id: string);
    this.presentToast('getDisplayUnitForId');
  }
  pushDisplayUnitViewedEventForID()
  {
    console.log('pushDisplayUnitViewedEventForID');
    this.clevertap.pushDisplayUnitViewedEventForID(id: string);
    this.presentToast('pushDisplayUnitViewedEventForID');
  }
  pushDisplayUnitClickedEventForID()
  {
    console.log('pushDisplayUnitClickedEventForID');
    this.clevertap.pushDisplayUnitClickedEventForID(id: string);
    this.presentToast('pushDisplayUnitClickedEventForID');
  }
  getFeatureFlag()
  {
    console.log('getFeatureFlag');
    this.clevertap.getFeatureFlag(key: string, defaultValue: string);
    this.presentToast('getFeatureFlag');
  }
  setDefaultsMap()
  {
    console.log('setDefaultsMap');
    this.clevertap.setDefaultsMap(defaults: any);
    this.presentToast('setDefaultsMap');
  }
  fetch()
  {
    console.log('fetch');
    this.clevertap.fetch();
    this.presentToast('fetch');
  }
  fetchWithMinimumFetchIntervalInSeconds()
  {
    console.log('fetchWithMinimumFetchIntervalInSeconds');
    this.clevertap.fetchWithMinimumFetchIntervalInSeconds(timeInterval: number);
    this.presentToast('fetchWithMinimumFetchIntervalInSeconds');
  }
  activate()
  {
    console.log('activate');
    this.clevertap.activate();
    this.presentToast('activate');
  }
  fetchAndActivate()
  {
    console.log('fetchAndActivate');
    this.clevertap.fetchAndActivate();
    this.presentToast('fetchAndActivate');
  }
  setMinimumFetchIntervalInSeconds()
  {
    console.log('setMinimumFetchIntervalInSeconds');
    this.clevertap.setMinimumFetchIntervalInSeconds(timeInterval: number);
    this.presentToast('setMinimumFetchIntervalInSeconds');
  }
  getLastFetchTimeStampInMillis()
  {
    console.log('getLastFetchTimeStampInMillis');
    this.clevertap.getLastFetchTimeStampInMillis();
    this.presentToast('getLastFetchTimeStampInMillis');
  }
  getString()
  {
    console.log('getString');
    this.clevertap.getString();
    this.presentToast('getString');
  }
  getBoolean()
  {
    console.log('getBoolean');
    this.clevertap.getBoolean();
    this.presentToast('getBoolean');
  }
  getLong()
  {
    console.log('getLong');
    this.clevertap.getLong();
    this.presentToast('getLong');
  }
  getDouble()
  {
    console.log('getDouble');
    this.clevertap.getDouble();
    this.presentToast('getDouble');
  }
  reset()
  {
    console.log('reset');
    this.clevertap.reset();
    this.presentToast('reset');
  }
  notifyDeviceReady()
  {
    console.log('notifyDeviceReady');
    this.clevertap.notifyDeviceReady();
    this.presentToast('notifyDeviceReady');
  }
  setDebugLevel()
  {
    console.log('setDebugLevel');
    this.clevertap.setDebugLevel(level: number;
    this.presentToast('setDebugLevel');
  }

}
