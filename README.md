# Padel — Sistema de Reservas de Pistas de Pádel

Aplicación web con enfoque en reservar pistas para jugar al pádel.  
Con autenticación de usuarios, selecciones inteligentes de franjas horarios, gestion de reservas y administración.


Frontend desarrollado con **React + Vite** y **Flask** para el Backend.

---

## Demo

**GitHub Pages:**  
https://marcos11195.github.io/padel-front

---

##  Características

-  **Autenticación de usuarios** (login / registro)
-  **Listado de pistas**
-  **Selector de fecha filtrado por pistas**
-  **Selección de franjas horarias**
  - Selección de franjas horarias multiples
  - Solo selecciones consecutivas, no hay reservas separadas
  - Sin alertas intrusivas para mostrar mensaje de error en la selección
- **Cálculo de precio**
  - Cálculo automático del precio a la hora de hacer la reserva con inclusión automática de sobrecargo por fin de semana
- **Visualizar reservas**
  - Permite ver las reservas de pista y horarios realizadas, asi mismo cancelarlas
  - Cancelar reserva
-**Panel de administración**
  - Permite visualizar las pistas y añadir nuevas pistas si es necesario
  - Permite visualizar los usuarios y editarlos manualmente
  - Permite visualizar los horarios editarlos/eliminarlos y añadir nuevas franjas horarias que puedan estar disponibles
  - Permite gestionar las reservas en caso de que sea necesario eliminar o cancelar alguna reserva desde administracion
- **Despliegue en GitHub Pages** 

---

## Capturas de pantalla
<img width="1253" height="682" alt="landing" src="https://github.com/user-attachments/assets/7d534438-c22f-46e3-9488-86c6ebd0b523" />
<img width="1252" height="686" alt="usuario" src="https://github.com/user-attachments/assets/07f7119f-b1e1-45ca-a685-f2ef2ac6f2b5" />
<img width="1254" height="742" alt="admin" src="https://github.com/user-attachments/assets/f1001d24-6702-4e4c-9773-97e342b9ee7b" />



---

## Tecnologías utilizadas

### Front
- React 18
- Vite
- Bootstrap 5
- Axios

### Back
- Python
- Flask
- SQLAlchemy
- JWT

### Infraestructura
- GitHub Pages (frontend)
- PythonAnywhere (backend)

---

Endpoints principales
Método	Endpoint	Descripción
POST	/api/login	Autenticación
POST	/api/register	Registro
GET	/api/pistas	Listado de pistas
POST	/api/disponibilidadpista	Horarios disponibles
POST	/api/reservar	Crear reserva
GET	/api/mis_reservas	Reservas del usuario
POST	/api/cancelar_reserva	Cancelar reserva

# Instalación y ejecución en local

## 1. Clonar el repositorio
git clone https://github.com/marcos11195/padel-front.git<br>
cd padel-front<br>
npm install<br>
## 2.Instalara las dependencias del repositorio 
### Hay que asegurarse de tener node 18+ instalado, para ello hay varias maneras:
## Opcion 1
Instalandolo desde la web<br>
https://nodejs.org<br>
## Opcion 2
Instalandolo desde consola de comandos (powershell)<br>
### 1- instalar NVM
###(windows)
winget install CoreyButler.NVMforWindows<br>
###(macOs/linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
## 2-Instalar node 18 
nvm install 18<br>
## 3-Usar Node18
nvm use 18<br>
configurar el archivo.env (ya esta configurado con el api en este caso)<br>
Ejecutar en modo desarrollo <br>
- npm run dev<br>
para levantar un servidor local<br>
(en caso de usar otro api diferente habria que modificar mas cosas) en este caso no es necesario pero si no se podria levantar tambien el backend en local
