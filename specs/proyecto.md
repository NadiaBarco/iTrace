El dropshiping es un mercado que sigue creciendo 


La plataforma brinda trazabilidad operativa de punta a punta, indicando documentación pendiente, responsables de cada etapa y tiempos estimados para la resolución de incidencias.





FEATURE:
    Itrace

GOAL:
    Centralizar información
	Reducir incertidumbre de clientes de bajo expertice
	Ayudar a pymes a establecerse en el mercado de importacion

INPUTS:
    Usuario ingresa su producto de interés en el search bar

OUTPUTS:
    Opciones de costos finales a traves de diversa información recopilada de sourcing
	requerimientos necesario estatales de parte del cliente 
	costo predecible a  traves de la opciones elegidas por el cliente   

BUSINESS_RULES:
    Searching de permisos y/o licencias estatales, nacionales y provinciales/municipales
    - Sourcing/Scraping de productos, indexación web a traves de filtros, obtencion de productos b2b.
    - 

EDGE_CASES:
    -
    -
    -

ACCEPTANCE_CRITERIA:
    GIVEN Productos seleccionados e informes individuales mostrados
    WHEN Presiones botón de Terminar SIMULACION
    THEN Imprimir informe de gastos total estimados, coste de producto, logística, impuestos a considerar, 	permisos y certificados requeridos. Informe de riesgos separado por proveedores, couriers y pais de origen

NON_FUNCTIONAL_REQUIREMENTS:
    -

OUT_OF_SCOPE:
    -

TEST_CASES:
    - Usuario ingresa producto no existe 
    - Usuario con licencias necesario por X producto 
    - Usuario sin ninguna licencia interesado en Y producto con licencias
    - Empresa no posee permisos necesario para exportación 





Especificacion:

Que problema resuelve: Centraliza informacion sobre importaciones de productos para gente que quiera importar desde Argentina sin perder tiempo ni plata

Entrada y salida: ENTRADA -> 

Para usuario: Producto/s que quisiera importar el usuario, la cantidad solicitada del usuario, 
Para desarrolladores: base de datos de productos, impuestos, ofertas aplicables, 

SALIDA -> Para cada producto buscada simula la importacion del producto que se quiera importar. Es decir que te ofrece opciones de productos (como las paginas webs de supermercados) que se puedan importar de distintos lugares del mundo, con informacion requerida sobre logisticas, permisos, calidad, costos, riesgos que podrán haber, info sobre proveedores, etc. 
Para cada usuario, se simula la compra de productos en un carrito de compras para tener el resumen completo de las compras a realizar, provee informes que ayudan a visualizar la informacion del carrito de compra y poder comparar los costos, calidad, riesgos, impuestos. 
El orden que se muestran los productos es bajo el criterio de valuaciones por parte de los usuarios y practicidad de tramites/servicios provistos por los proveedores. 

CASOS LIMITES -> Productos que no puedan entrar en el pais, el producto no se pueda exportar por permisos de exportacion u otros, 

REESTRICCIONES -> Cosas de farmacia que haga falta mas requisitos (mas licencias, permisos), 

ERRORES ESPERADOS -> Producto no encontrado, stock insuficiente, error interno, carrito vacio, hipervinculos invalidos, 


Recursos clave:
Fuente de datos de importacion, bases de datos de productos de TODO, 
Impuestos y Regimen General de ARCA/AFIP
Precios de los productos por parte de las paginas web que lo ofrecen o mediante una base de datos sobre proveedores, servicios.

Estructuras de coste: 
Mantenimiento de la base de datos, se automatiza la tabla de precios de los proveedores, sus certificados, el regimen general de aduanas, impuestos
