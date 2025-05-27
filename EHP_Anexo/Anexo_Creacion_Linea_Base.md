
# Anexo - Creación de la Línea Base

## Introducción

La creación de líneas base es una práctica de control de versiones que permite establecer puntos de referencia estables dentro del desarrollo del proyecto. Esto garantiza que los cambios realizados puedan ser rastreados y validados correctamente.

## Nomenclatura de la Línea Base

La nomenclatura de las líneas base sigue el estándar QGPT-10 y debe respetar el siguiente formato:

```
EHP_LINEA_BASE_<ITERxx>_<NOMBRE_LB>
```

- `EHP_LINEA_BASE`: Prefijo obligatorio para todas las líneas base del proyecto.
- `<ITERxx>`: Número de iteración con dos dígitos, por ejemplo: `ITER03`.
- `<NOMBRE_LB>`: Nombre descriptivo en PascalCase (sin espacios ni tildes), reflejando el contexto o propósito de la línea base.

## Ejemplo de Línea Base

Para la línea base correspondiente a la ejecución de casos de prueba del TP11, la etiqueta a utilizar es:

```
EHP_LINEA_BASE_ITER03_EjecucionCasosTP11
```

Se crea utilizando el siguiente comando en la terminal:

```bash
git tag -a EHP_LINEA_BASE_ITER03_EjecucionCasosTP11 -m "Línea base 3 - Ejecución de Casos de Prueba TP11"
git push origin EHP_LINEA_BASE_ITER03_EjecucionCasosTP11
```

## Consideraciones Finales

Toda creación de línea base debe ser comunicada al equipo, y la etiqueta generada debe ser registrada en la documentación del proyecto, asegurando su trazabilidad.

---

Fecha de creación: 27-05-2025  
Autor: Lucas Martín Chas Díaz
