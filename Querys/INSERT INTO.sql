INSERT INTO proveedor (id_proveedor, id_persona, fecha_registro, estado) 
VALUES (1, 2, '2025-03-04T05:35:57.077', 'activo');

INSERT INTO proveedor (id_proveedor, id_persona, fecha_registro, estado) 
VALUES (3, 4, '2023-02-15T00:00:00.000', 'pendiente');

INSERT INTO cliente (id_cliente, id_persona, fecha_registro, estado) 
VALUES (1, 1, '2025-03-04T05:37:18.827', 'inactivo');

INSERT INTO cliente (id_cliente, id_persona, fecha_registro, estado) 
VALUES (2, 1, '2025-03-04T06:24:26.550', 'activo');

INSERT INTO compra (id_compra, id_proveedor, fecha_compra, total, metodo_pago, observaciones) 
VALUES (2, 1, '2025-03-04T06:16:08.290', 50000.00, 'efectivo', NULL);

INSERT INTO venta (id_venta, id_cliente, fecha_venta, total_venta) 
VALUES (1, 1, '2025-03-04T05:41:06.437', 30000.00);

INSERT INTO venta (id_venta, id_cliente, fecha_venta, total_venta) 
VALUES (2, 1, '2025-03-04T06:24:26.550', 50000.00);

INSERT INTO materia_prima (id_materia, nombre, cantidad, unidad_medida, fecha_recepcion, ubicacion) 
VALUES (1, 'Leche', 100.00, 'l', '2025-03-04T05:39:13.050', 'Almacén 1');

INSERT INTO materia_prima (id_materia, nombre, cantidad, unidad_medida, fecha_recepcion, ubicacion) 
VALUES (2, 'Sal', 35.00, 'kg', '2025-03-04T05:39:13.050', 'Almacén 2');

INSERT INTO queso (id_queso, nombre, tipo, peso_unitario_kg, peso_unitario_lb, cantidad_disponible, ubicacion, precio) 
VALUES (1, 'Queso Mozzarella', 'Fresco', 1.20, 2.60, 50.00, 'Bodega A', 12000.00);

INSERT INTO queso (id_queso, nombre, tipo, peso_unitario_kg, peso_unitario_lb, cantidad_disponible, ubicacion, precio) 
VALUES (2, 'Queso Cheddar', 'Maduro', 1.50, NULL, 50.00, NULL, 10000.00);

INSERT INTO produccion (id_produccion, id_queso, fecha_produccion, cantidad_producida, peso_total_kg, peso_total_lb, responsable, estado, observaciones) 
VALUES (1, 1, '2025-03-04T05:41:46.090', 20.00, 24.00, 52.90, 'Carlos López', 'finalizado', NULL);

INSERT INTO detalles_produccion (id_detalles, id_produccion, id_materia, cantidad_usada, unidad_medida) 
VALUES (1, 1, 1, 50.00, 'l');

INSERT INTO detalles_produccion (id_detalles, id_produccion, id_materia, cantidad_usada, unidad_medida) 
VALUES (2, 1, 2, 2.00, 'kg');

INSERT INTO detalles_venta (id_detalle, id_venta, id_queso, presentacion, cantidad, precio_unitario) 
VALUES (2, 1, 1, 'unidad', 2.00, 10000.00);
