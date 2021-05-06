import { Component } from '@angular/core';
import { CleverTap } from '@ionic-native/clevertap/ngx';
import { ToastController } from '@ionic/angular';
// import { ModalController} from '@ionic/angular';

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
        <!-- dismissModal not recognized -->
        <ion-icon slot="icon-only" name="close" (click)="dismissModal()"></ion-icon>
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

  clickAlert(header = 'Alert',
             subHeader= 'An Alert you Made',
             message = 'This is an alert message.')
  {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = header;
    alert.subHeader = subHeader;
    alert.message = message;
    alert.buttons = [{
      text: 'Okay',
      handler: () => {
        console.log('Neutral response');
      }
    }, {
      text: 'Yes!',
      handler: () => {
        console.log('Enthusiastic response');
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
    this.clevertap.recordEventWithName('Test Event');
    this.presentToast('recordEventWithName \"Test Event\"');
  }
  recordEventWithNameAndProps()
  {
    console.log('recordEventWithNameAndProps');
    this.clevertap.recordEventWithNameAndProps('Test Event with Properties', {
      'Property 1': 'First Prop',
      'Color of Text': 'Green'
    });
    this.presentToast('recordEventWithNameAndProps \"Test Event with Properties\"');
  }
  recordChargedEventWithDetailsAndItems()
  {
    // implemented above too
    console.log('recordChargedEventWithDetailsAndItems');
    this.clevertap.recordChargedEventWithDetailsAndItems({amount: 200, 'Charged ID': 5678},
      [{
      Category: 'Food',
      Quantity: 2,
      Title: 'Eggs (Dozen)'
    }]);
    this.presentToast('recordChargedEventWithDetailsAndItems');
  }
  eventGetFirstTime()
  {
    console.log('eventGetFirstTime');
    this.clevertap.eventGetFirstTime('Test Event').then(r => {
      this.clickAlert('eventGetFirstTime', 'Test Event first pushed at', r)
        .then(() => this.presentToast('eventGetFirstTime'));
    });
  }
  eventGetLastTime()
  {
    console.log('eventGetLastTime');
    this.clevertap.eventGetLastTime('Test Event').then(r => {
    this.clickAlert('eventGetLastTime', 'Test Event last pushed at', r)
      .then(() => this.presentToast('eventGetLastTime'));
  });
  }
  eventGetOccurrences()
  {
    console.log('eventGetOccurrences');
    this.clevertap.eventGetOccurrences('Test Event').then(r => {
      this.clickAlert('eventGetOccurrences',
        'Test Event total number of occurrences', r)
        .then(() => this.presentToast('eventGetOccurrences'));
    });
  }
  eventGetDetails()
  {
    console.log('eventGetDetails');
    this.clevertap.eventGetDetails('Test Event with Properties').then(r => {
      this.clickAlert('eventGetDetails',
        'Details for \"Test Event with Properties\"', r)
        .then(() => this.presentToast('eventGetDetails'));
    });
  }
  getEventHistory()
  {
    console.log('getEventHistory');
    this.clevertap.getEventHistory().then(r => {
      this.clickAlert('getEventHistory',
        'Event History is as follows', r)
        .then(() => this.presentToast('getEventHistory'));
    });
  }
  recordScreenView()
  {
    console.log('recordScreenView');
    this.clevertap.recordScreenView('Default Screen');
    this.presentToast('recordScreenView');
  }
  getLocation()
  {
    console.log('getLocation');
    this.clevertap.getLocation().then(r => {
      this.clickAlert('getLocation',
        'Location coordinates', r)
        .then(() => {
          this.presentToast('getLocation' + r);
        });
    });
  }
  setLocation()
  {
    console.log('setLocation');
    this.clevertap.setLocation(38.89, -77.04);
    this.presentToast('setLocation to (38.89, -77.04)');
  }
  onUserLogin()
  {
    console.log('onUserLogin');
    // this.clevertap.onUserLogin(profile:any);
    this.clickAlert('OnUserLogin', '(not called)',
      'Creates a new profile, and used to switch between two profiles.' +
      ' Switching between identified users is a costly operation ');
    this.presentToast('onUserLogin');
  }
  profileSet()
  {
    console.log('profileSet');
    this.clevertap.profileSet({Preference: 'Medium'}).then(() => {
      this.clickAlert('profileSet',
        'Added new attribute', 'Preference: Medium')
        .then(() => {
          this.presentToast('profileSet');
        });
    });
  }
  profileSetGraphUser()
  {
    console.log('profileSetGraphUser');
    this.clevertap.profileSetGraphUser({Frequency: 'Rare'}).then(() => {
      this.clickAlert('profileSetGraphUser',
        'Added new attribute from Facebook User', 'Frequency: Rare')
        .then(() => {
          this.presentToast('profileSetGraphUser');
        });
    });
  }
  profileGooglePlusUser()
  {
    console.log('profileGooglePlusUser');
    this.clevertap.profileGooglePlusUser({Surface: 'Smooth'}).then(() => {
      this.clickAlert('profileGooglePlusUser',
        'Added new attribute from Google User', 'Surface: Smooth')
        .then(() => {
          this.presentToast('profileGooglePlusUser');
        });
    });
  }
  profileGetProperty()
  {
    console.log('profileGetProperty');
    this.clevertap.profileGetProperty('Preference').then(r => {
    this.clickAlert('profileGetProperty',
      'Get value of Property: Preference', r)
      .then(() => this.presentToast('profileGetProperty' + r));
  });
  }
}
