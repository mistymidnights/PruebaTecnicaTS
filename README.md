📌

# **Prueba Técnica**

## **Resumen del proyecto!**

El proyecto consiste en la realización de un gestor de datos o CMS basado en React y Typescript, utilizando otras

herramientas como Ant Design 5.0, React Router Dom o React Icons. El sistema permite mostrar información, crear un nuevo ítem en la base de datos, actualizar campos o borrarlos. El diseño es limpio y simple, y el código incluye comentarios

para facilitar su comprensión. Los datos se recogen de un archivo JSON y se manejan a través de un contexto que

proporciona acceso a los datos y las funciones para manipularlos.

Para iniciar el proyecto simplemente se necesita abrir la terminal dentro del proyecto, descargar todas las dependencias y después abrir el proyecto en local.<hr>

```diff
+ npm i //instalar dependencias
+ npm start //abrir el proyecto
```
## **Archivos nuevos del proyecto**

- _jsonEjemplo.json_ : Está ubicado en la carpeta public. He intentado usar el modelo y sacar los datos de el para agilizar el proceso. Al ser un fichero de “texto” no se ha modificado como tal pero si me sirve como estado inicial para la aplicación.

- _Types.ts_ : Para definir los modelos de la información y agruparlos en un archivo de manera ordenada.

- _DataContext.txs_ : Se utiliza para compartir datos en toda la aplicación. Desde aquí recogemos los datos del json. Se definen otras funciones como la de actualizar los datos, borrarlos y añadir. Todo esto en un estado y realizando copias de estos para no modificar los datos y no poder recuperarlos. El proveedor del contexto envuelve a los componentes hijos (children) y les proporciona acceso a los datos y las funciones para manipular esos datos.

- _ModelList.tsx_ : Muestra lo que sería la página principal del CMS. Se muestran los items (en este caso los he llamado modelos ya que tiene que ver con modelos 2D, 3D) con dos opciones en cada uno. Un botón para ir a la página para editar ese item y ver toda su información y un botón de borrado que abre un popup de confirmación para asegurarnos de que queremos borrar ese item. Importante destacar que al simular funciones de POST, UPDATE, REMOVE si se recarga la página vuelve al estado inicial pero se puede usar sin problema y probar navegando por ella sin hacer recarga.

- _ModelEdit.tsx_ : Página que edita cada item (cada modelo de la lista). En el se muestra la id del modelo para identificar cuál es, posición, título, descripción, tipo de archivo y la url de donde lo podemos encontrar. Se pueden editar campos (simulación) como título y descripción ya que se supone que tiene una posición fija y los demás datos dan información sobre lo que contiene. Al editar los campos y darle al botón de “Guardar cambios” se actualizará el estado del mismo.

- _NewModel.tsx_: Para crear un nuevo modelo y añadirlo a la lista actualizando el estado. El campo de id no es modificable ya que se asigna el siguiente id disponible y no queremos que se puedan repetir. Podemos aquí si podemos asignarle una posición además del título y descripción. En el caso de no rellenar los campos, no se muestran al editarlos ya que están en blanco. Al crear el nuevo modelo se redirige a la “Home” que es nuestro componente “ModelList”. Ahora en la lista aparece otro item con las mismas características que los demás.
  Prueb a Técnic a ECAM 3
