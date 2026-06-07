# Dataset de ejemplo para prototipo de importación

## Productos

| id_producto | nombre                  | categoria    |
| ----------- | ----------------------- | ------------ |
| P1          | Auriculares Bluetooth   | Electrónica  |
| P2          | Impresora 3D            | Tecnología   |
| P3          | Cafetera Espresso       | Hogar        |
| P4          | Taladro Inalámbrico     | Herramientas |
| P5          | Lámpara LED Inteligente | Iluminación  |

---

## Proveedores

| id_proveedor | nombre          | país     | rating |
| ------------ | --------------- | -------- | ------ |
| PR1          | TechSource Ltd  | China    | 4.8    |
| PR2          | GlobalTrade Inc | EE.UU.   | 4.5    |
| PR3          | EuroSupply GmbH | Alemania | 4.7    |

---

## Productos ofrecidos por proveedor

| id_producto | id_proveedor | precio_usd | MOQ |
| ----------- | ------------ | ---------- | --- |
| P1          | PR1          | 18         | 50  |
| P1          | PR2          | 24         | 10  |
| P1          | PR3          | 22         | 20  |
| P2          | PR1          | 160        | 5   |
| P2          | PR2          | 185        | 1   |
| P2          | PR3          | 175        | 2   |
| P3          | PR1          | 60         | 20  |
| P3          | PR3          | 75         | 5   |
| P4          | PR1          | 40         | 30  |
| P4          | PR2          | 52         | 10  |
| P5          | PR2          | 15         | 20  |
| P5          | PR3          | 17         | 15  |

---

## Peso por producto

| id_producto | peso_kg |
| ----------- | ------- |
| P1          | 0.4     |
| P2          | 8       |
| P3          | 5       |
| P4          | 2.5     |
| P5          | 0.7     |

---

## Empresas logísticas

| id_logistica | nombre        | costo_base_usd | costo_por_kg_usd |
| ------------ | ------------- | -------------- | ---------------- |
| L1           | FastCourier   | 25             | 8                |
| L2           | GlobalExpress | 20             | 10               |

---

## Impuestos y aranceles

| categoria    | iva_% | arancel_importacion_% |
| ------------ | ----- | --------------------- |
| Electrónica  | 21    | 16                    |
| Tecnología   | 21    | 12                    |
| Hogar        | 21    | 18                    |
| Herramientas | 21    | 14                    |
| Iluminación  | 21    | 10                    |

---

## Permisos disponibles

| id_permiso | descripcion                           |
| ---------- | ------------------------------------- |
| PE1        | Certificación de seguridad eléctrica  |
| PE2        | Declaración de conformidad energética |
| PE3        | Licencia ANMAT                        |

---

## Permisos requeridos por producto

| id_producto | id_permiso |
| ----------- | ---------- |
| P1          | PE1        |
| P2          | PE1        |
| P3          | PE3        |
| P5          | PE2        |

---

## Permisos que posee cada proveedor

| id_proveedor | id_permiso |
| ------------ | ---------- |
| PR1          | PE1        |
| PR1          | PE2        |
| PR2          | PE1        |
| PR3          | PE1        |
| PR3          | PE2        |
| PR3          | PE3        |

---

# Casos de prueba

## Caso 1: Auriculares Bluetooth

Producto: P1

Permiso requerido: PE1

### Proveedores disponibles

| Proveedor       | Precio USD | Cumple permisos |
| --------------- | ---------- | --------------- |
| TechSource Ltd  | 18         | Sí              |
| GlobalTrade Inc | 24         | Sí              |
| EuroSupply GmbH | 22         | Sí              |

---

## Caso 2: Cafetera Espresso

Producto: P3

Permiso requerido: PE3

### Proveedores disponibles

| Proveedor       | Precio USD | Cumple permisos |
| --------------- | ---------- | --------------- |
| TechSource Ltd  | 60         | No              |
| EuroSupply GmbH | 75         | Sí              |

---

## Caso 3: Lámpara LED Inteligente

Producto: P5

Permiso requerido: PE2

### Proveedores disponibles

| Proveedor       | Precio USD | Cumple permisos |
| --------------- | ---------- | --------------- |
| GlobalTrade Inc | 15         | No              |
| EuroSupply GmbH | 17         | Sí              |

---

# Ejemplo de cálculo de costo final

Producto: Auriculares Bluetooth (P1)

Proveedor: TechSource Ltd

Precio producto: 18 USD

Peso: 0.4 kg

Logística elegida: FastCourier

Costo envío:

25 + (0.4 × 8) = 28.2 USD

Subtotal:

18 + 28.2 = 46.2 USD

Arancel (16%):

7.39 USD

IVA (21%):

9.70 USD

### Costo final estimado

63.29 USD

---

# Ranking inicial de proveedores

Ordenado por rating

| Proveedor       | Rating |
| --------------- | ------ |
| TechSource Ltd  | 4.8    |
| EuroSupply GmbH | 4.7    |
| GlobalTrade Inc | 4.5    |

---

# Riesgos considerados

* Proveedor sin permisos necesarios.
* MOQ superior a la cantidad requerida.
* Variación del costo logístico.
* Variación cambiaria.
* Restricciones regulatorias según categoría del producto.

---

# Supuestos del MVP

* Todos los precios están expresados en USD.
* Los costos finales son estimados.
* Se considera importación por courier.
* Los permisos son simplificados.
* El ranking se basa únicamente en rating.
* No se contemplan múltiples destinos ni distintos tipos de importador.
