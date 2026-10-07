# BPM & Camelot Tool

Web con dos herramientas musicales: cálculo de BPM mediante pulsaciones
y búsqueda de tonalidades compatibles según la rueda Camelot.

La lógica está escrita en TypeScript y se compila a JavaScript
para ejecutarse en el navegador.

## Tecnologías

- HTML
- CSS
- TypeScript
- JavaScript generado por el compilador
- Node.js y npm
- Git y GitHub
- Live Server para el servidor local

## Requisitos

- Git.
- Node.js LTS con npm.
- VS Code con la extensión Live Server, o un servidor local equivalente.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/PabloPastor889/bpm-camelot-tool.git
   ```

2. Entra en la carpeta:

   ```bash
   cd bpm-camelot-tool
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Compila TypeScript:

   ```bash
   npm run build
   ```

Mientras la migración no esté incorporada a main, selecciona la rama
migrate-web-typescript antes de instalar y compilar:

```bash
git switch migrate-web-typescript
```

En PowerShell, si npm.ps1 está bloqueado, utiliza npm.cmd
en lugar de npm.

## Ejecutar la web

Después de compilar, abre index.html con Live Server:
botón derecho sobre el archivo y Open with Live Server.

El HTML carga dist/index.js como módulo.
Utiliza un servidor local en lugar de abrir el HTML con doble clic.

## Desarrollo

Para compilar una vez:

```bash
npm run build
```

Para recompilar automáticamente cuando guardes cambios en TypeScript:

```bash
npm run watch
```

Mantén watch activo mientras trabajas.
Para detenerlo, pulsa Ctrl + C en la terminal.

Edita src/index.ts. El archivo dist/index.js se genera automáticamente
y no debe editarse manualmente.

## Uso

### Tap BPM

- Pulsa TAP siguiendo el ritmo para calcular los BPM.
- Pulsa RESET para reiniciar.
- También puedes utilizar la barra espaciadora cuando el foco
  esté fuera de los controles interactivos.
- Tras una pausa de más de dos segundos entre pulsaciones,
  comienza una nueva medición.

### Camelot

- Selecciona una tonalidad.
- Pulsa BUSCAR COMPATIBLES.
- Se muestran las tonalidades vecinas de la rueda Camelot
  y la relativa mayor o menor.

Ejemplo:

```text
Am → Dm · Em · C
```

## Variables de entorno

No se necesitan variables de entorno ni claves de acceso.

## Estructura

- index.html: estructura de la web y enlace al módulo generado.
- css/style.css: estilos.
- src/index.ts: lógica de Tap BPM y Camelot escrita en TypeScript.
- dist/index.js: JavaScript generado al compilar; excluido de Git.
- tsconfig.json: configuración de TypeScript.
- package.json: dependencias y scripts build y watch.
- package-lock.json: versiones de las dependencias.
- .gitignore: excluye dependencias, salida generada y archivos locales.
- README.md: instrucciones del proyecto.

## Comprobaciones manuales

- TAP actualiza los BPM y RESET muestra 0 BPM.
- La barra espaciadora permite registrar pulsaciones.
- Am muestra Dm, Em y C como tonalidades compatibles.
- G#m muestra C#m, D#m y B como tonalidades compatibles.
- TypeScript compila sin errores.
- El modo watch detecta y compila los cambios.