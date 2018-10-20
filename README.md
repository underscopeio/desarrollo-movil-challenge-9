## Challenge 9 del curso de Desarrollo Móvil de Coderhouse

Para poder resolver este challenge seguir los siguientes pasos

1. Hacer un **fork** este repositorio
1. Una vez hecho el **fork**, hacer un clon copiando la URL (en el botón verde) y corriendo `git clone <URL>` en la consola
1. Una vez clonado, moverse dentro de la carpeta del proyecto y correr `npm install` (o `yarn`) para instalar las dependencias necesarias
1. Hacer un **nuevo branch** con tu nombre y apellido para identificarte (ej. `git checkout -b gonzalo-aguirre`)
1. Correr el proyecto usando `expo start`
1. Resolver el enunciado, **haciendo un nuevo commit al resolver cada parte**
1. Hacer un **push** del nuevo branch
1. Desde **github.com** crear un nuevo **pull request** desde ese branch hacia master

### Enunciado

### Configuración Previa

1. Cambiar el `SPOTIFY_CLIENT_ID` con su `clientId`
1. Agregar la nueva `redirectUrl` en la configuración de Spotify 
> Debería ser `https://auth.expo.io/@<TU_USERNAME>/desarrollo-movil-challenge-9`, pero podés verificarlo haciendo un `console.warn('Mi url', redirectUrl)` debajo de la llamada a `AuthSession.getRedirectUrl()` en el archivo `spotify-api-client.js`

#### Integrando Firebase
1. Instalar el SDK de Firebase como dependencia
    > `yarn add firebase` o `npm install firebase`
1. Crear un archivo llamado `firebase.js` y dentro del mismo copiar el snippet que nos da Firebase con la inicialización del mismo


#### Peristiendo data en su Realtime DB
1. TODO: agregar enunciado

