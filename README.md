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

## 🖼️ Capturas de pantalla



---

## 🧱 Tecnologías utilizadas

### Front
- React 18
- Vite
- Bootstrap 5
- Axios

### Back
- Python 3
- Flask
- SQLAlchemy
- JWT Authentication

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

## 📦 Instalación y ejecución en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/padel-front.git
cd padel-front
