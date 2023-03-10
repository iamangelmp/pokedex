const pokemonCard = `
<ion-card>
  <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
  <ion-card-header>
    <ion-card-title>Card Title</ion-card-title>
    <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
  </ion-card-header>

  <ion-card-content>
    Here's a small text description for the card content. Nothing more, nothing less.
  </ion-card-content>
</ion-card>

<style>
  /* iOS places the subtitle above the title */
  ion-card-header.ios {
    display: flex;
    flex-flow: column-reverse;
  }
</style>
`

export  default  pokemonCard