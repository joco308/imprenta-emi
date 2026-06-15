-- =========================================
-- DOMINIO
-- =========================================
INSERT INTO "Dominio" ("id", "dominio") VALUES
(1, 'Roles'),                  -- Roles de usuario del sistema
(2, 'Autenticacion'),          -- Métodos de autenticación de usuario
(3, 'Estado_Impresora'),       -- Estados operativos de una impresora
(4, 'Tipo_Impresora'),         -- Tipo/tecnología de la impresora
(5, 'Estado_Impresion'),       -- Estados del trabajo de impresión
(6, 'Tamaño_Papel'),           -- Tamaños de papel disponibles
(7, 'Categoria_Producto'),     -- Categorías de productos en venta
(8, 'Metodo_Pago'),            -- Métodos de pago de una orden
(9, 'Estado_Orden');           -- Estados del ciclo de vida de una orden

-- Reinicia el contador de SERIAL para evitar colisiones con futuros INSERT
SELECT setval(pg_get_serial_sequence('"Dominio"', 'id'), (SELECT MAX("id") FROM "Dominio"));


-- =========================================
-- SUB_DOMINIO
-- =========================================

-- Dominio 1: Roles (usado por Usuarios.id_rol)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(1, 1, 'Administrador'),
(2, 1, 'Estudiante'),
(3, 1, 'Docente'),
(4, 1, 'Invitado');

-- Dominio 2: Autenticacion (usado por Usuarios.id_tipo_autenticacion)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(5, 2, 'Microsoft');

-- Dominio 3: Estado_Impresora (usado por Impresoras.id_estatus)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(6, 3, 'Disponible'),
(7, 3, 'Ocupada'),
(8, 3, 'Mantenimiento'),
(9, 3, 'Fuera de Servicio');

-- Dominio 4: Tipo_Impresora (usado por Impresoras.id_operativa)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(10, 4, 'Laser'),
(11, 4, 'Inyeccion de Tinta'),
(12, 4, 'Multifuncional');

-- Dominio 5: Estado_Impresion (usado por Impresion.id_estado_imprecion)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(13, 5, 'En Cola'),
(14, 5, 'Imprimiendo'),
(15, 5, 'Completado'),
(16, 5, 'Cancelado'),
(17, 5, 'Error');

-- Dominio 6: Tamaño_Papel (usado por Impresion.id_tamaño_papel)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(18, 6, 'Carta'),
(19, 6, 'A4'),
(20, 6, 'Oficio'),
(21, 6, 'A3');

-- Dominio 7: Categoria_Producto (usado por Productos.id_cateogira)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(22, 7, 'Papeleria'),
(23, 7, 'Cuadernos'),
(24, 7, 'Vinilos'),
(25, 7, 'Accesorios');

-- Dominio 8: Metodo_Pago (usado por Orden.id_metodo_pago)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(26, 8, 'Efectivo'),
(27, 8, 'QR');

-- Dominio 9: Estado_Orden (usado por Orden.id_estado)
INSERT INTO "Sub_dominio" ("id", "id_dominio", "subdominio") VALUES
(28, 9, 'Pendiente'),
(29, 9, 'Pagado'),
(30, 9, 'Entregado'),
(31, 9, 'Cancelado');

-- Reinicia el contador de SERIAL para evitar colisiones con futuros INSERT
SELECT setval(pg_get_serial_sequence('"Sub_dominio"', 'id'), (SELECT MAX("id") FROM "Sub_dominio"));
