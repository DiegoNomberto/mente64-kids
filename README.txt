MENTE64 KIDS V2.1 CORREGIDA
===========================

Esta versión reemplaza la compilación anterior.

CORRECCIONES REALES
- Logo oficial Mente64 en cabecera, login, splash e icono.
- Barra de estado Android respetada (no se superpone con el logo).
- Navegación inferior con espacio de seguridad sobre los botones del sistema Android.
- Inicio rediseñado y más dinámico.
- 10 clases reales incluidas como MP4 y reproducibles dentro de la app.
- Lista de clases con miniaturas.
- Retos.
- Duelo.
- Duelo REAL contra computadora usando reglas de chess.js; la computadora responde con jugadas legales.
- Tres niveles de comportamiento de computadora.
- Progreso.
- Perfil.
- XP y clases completadas actualizan durante la sesión.
- Login demo funcional.

ACCESO DEMO
Usuario: M64-0001
Contraseña: A7K9P2

ARCHIVOS IMPORTANTES
assets/mente64-logo.png      Logo dentro de la app
assets/icon.png              Icono del APK
assets/adaptive-icon.png     Icono adaptativo Android
assets/splash.png            Splash
assets/videos/clase01.mp4 ... clase10.mp4
assets/thumbs/clase01.jpg ... clase10.jpg

PARA ACTUALIZAR
1. Subir App.js, app.json, package.json, eas.json y README.txt a la raíz.
2. Reemplazar TODO el contenido de assets por el contenido de assets de este paquete.
3. En Codespaces:
   git pull
   npm install
   npx eas-cli build --platform android --profile preview

IMPORTANTE
No es necesario volver a crear el proyecto EAS ni el keystore.
