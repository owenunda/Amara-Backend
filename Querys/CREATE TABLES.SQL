-- SQLite
CREATE TABLE proveedor (
    id_proveedor INTEGER PRIMARY KEY,
    id_persona INTEGER NOT NULL,
    fecha_registro TEXT NOT NULL,
    estado TEXT NOT NULL,
    FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
);

CREATE TABLE cliente (
    id_cliente INTEGER PRIMARY KEY,
    id_persona INTEGER NOT NULL,
    fecha_registro TEXT NOT NULL,
    estado TEXT NOT NULL,
    FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
);

CREATE TABLE compra (
    id_compra INTEGER PRIMARY KEY,
    id_proveedor INTEGER NOT NULL,
    fecha_compra TEXT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    metodo_pago TEXT NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor)
);

CREATE TABLE venta (
    id_venta INTEGER PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    fecha_venta TEXT NOT NULL,
    total_venta DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE materia_prima (
    id_materia INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    unidad_medida TEXT NOT NULL,
    fecha_recepcion TEXT NOT NULL,
    ubicacion TEXT NOT NULL
);

CREATE TABLE queso (
    id_queso INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL,
    peso_unitario_kg DECIMAL(10, 2) NOT NULL,
    peso_unitario_lb DECIMAL(10, 2),
    cantidad_disponible DECIMAL(10, 2) NOT NULL,
    ubicacion TEXT,
    precio DECIMAL(10, 2) NOT NULL
);

CREATE TABLE produccion (
    id_produccion INTEGER PRIMARY KEY,
    id_queso INTEGER NOT NULL,
    fecha_produccion TEXT NOT NULL,
    cantidad_producida DECIMAL(10, 2) NOT NULL,
    peso_total_kg DECIMAL(10, 2) NOT NULL,
    peso_total_lb DECIMAL(10, 2) NOT NULL,
    responsable TEXT NOT NULL,
    estado TEXT NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_queso) REFERENCES queso(id_queso)
);

CREATE TABLE detalles_produccion (
    id_detalles INTEGER PRIMARY KEY,
    id_produccion INTEGER NOT NULL,
    id_materia INTEGER NOT NULL,
    cantidad_usada DECIMAL(10, 2) NOT NULL,
    unidad_medida TEXT NOT NULL,
    FOREIGN KEY (id_produccion) REFERENCES produccion(id_produccion),
    FOREIGN KEY (id_materia) REFERENCES materia_prima(id_materia)
);

CREATE TABLE detalles_venta (
    id_detalle INTEGER PRIMARY KEY,
    id_venta INTEGER NOT NULL,
    id_queso INTEGER NOT NULL,
    presentacion TEXT NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_queso) REFERENCES queso(id_queso)
);
