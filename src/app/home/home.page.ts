import { Component } from '@angular/core';
import { CleverTap } from '@ionic-native/clevertap/ngx';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(clevertap: CleverTap) {
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
    function pushChargedEvent1()
    {
      clevertap.recordChargedEventWithDetailsAndItems({amount: 300, 'Charged ID': 1234}, [{
        Category: 'Books',
        Quantity: 1,
        Title: 'Book Title'
      }]).then(r => {});
    }
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
  }
  /* angular function, not used
  async function dismissModal() {
  await modal.dismiss({
    'dismissed': true
  });
} Function used above
*/
  dismissModal() {
    const modalElement = document.getElementsByTagName('ion-modal')[0];
    return modalElement.dismiss();
  }

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
  /* cancelled pushChargedEvent
  pushChargedEvent1(){
    CleverTap.recordChargedEventWithDetailsAndItems({amount: 300, 'Charged ID': 1234}, [{
      Category: 'Books',
      Quantity: 1,
      Title: 'Book Title'
    }]).then(r => {});
  }*/
}
