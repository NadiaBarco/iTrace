Necesito implementar una nueva funcionalidad llamada "Import Readiness Score" en el proyecto React + Vite de iTrace.

Contexto:
iTrace es una plataforma que simula procesos de importación para usuarios y pymes argentinas. El usuario selecciona un producto, proveedor, cantidad y opción logística. El sistema calcula costos, impuestos, permisos requeridos y riesgos.

Objetivo:
Agregar un score visual de 0 a 100 que indique qué tan preparada está una importación para avanzar.

El score NO es un cálculo real de comercio exterior; es una métrica simplificada para el MVP del hackathon.

Reglas iniciales:

Puntaje inicial: 100

Penalizaciones:

* Proveedor sin permisos requeridos: -40
* MOQ superior a la cantidad solicitada: -15
* Rating menor a 4.5: -10
* Riesgo regulatorio: -20
* Riesgo logístico: -10
* Riesgo cambiario: -5

El score final no puede ser menor que 0.

Clasificación visual:

90-100:

* Estado: Excelente
* Color: Verde

70-89:

* Estado: Aceptable
* Color: Amarillo

50-69:

* Estado: Riesgo Medio
* Color: Naranja

0-49:

* Estado: Riesgo Alto
* Color: Rojo

Implementación requerida:

1. Crear una función reusable:
   calculateImportReadinessScore(...)

2. La función debe devolver:
   {
   score: number,
   status: string,
   color: string,
   deductions: string[]
   }

Ejemplo:

{
score: 85,
status: "Aceptable",
color: "yellow",
deductions: [
"MOQ superior a la cantidad requerida"
]
}

3. Crear un componente React:

   <ImportReadinessCard />

Debe mostrar:

* Score grande (ej: 88/100)
* Estado
* Barra de progreso
* Lista de penalizaciones detectadas

4. Integrar el componente en la pantalla de resultados de simulación.

5. Mantener el estilo visual actual del proyecto.

6. Utilizar TypeScript si el proyecto ya está configurado con TS.

7. Mostrar el score para cada proveedor evaluado.

8. Si existen múltiples proveedores, ordenar primero por score y luego por rating.

Generá todo el código necesario, indicando claramente:

* Archivos nuevos
* Archivos modificados
* Código completo de cada cambio
* Explicación breve de la lógica implementada.

EL diseño debe parecer una herramienta SaaS moderna tipo Stripe, Linear o Notion, con tarjetas limpias, badges de riesgo y una visualizacion muy destacada del score