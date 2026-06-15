CREATE TABLE "Dominio" (
  "id" SERIAL NOT NULL,
  "dominio" VARCHAR(20) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Sub_dominio" (
  "id" SERIAL NOT NULL,
  "id_dominio" int NOT NULL,
  "subdominio" VARCHAR(50) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Usuarios" (
  "id" SERIAL UNIQUE NOT NULL,
  "id_tipo_autenticacion" int NOT NULL,
  "id_rol" int NOT NULL,
  "nombres" VARCHAR(50) NOT NULL,
  "apellidos" VARCHAR(50) NOT NULL,
  "correo" VARCHAR(50) NOT NULL,
  "contraseña_hash" VARCHAR(100) NOT NULL,
  "estado" boolean DEFAULT true,
  "codigo_2FA" VARCHAR(5),
  "vigencia_2FA" timestamp,
  "estado_2FA" boolean DEFAULT false,
  PRIMARY KEY ("id")
);

CREATE TABLE "Usuarios_tokens" (
  "id" SERIAL NOT NULL,
  "id_usuario" int NOT NULL,
  "token" TEXT NOT NULL,
  "expiracion" timestamp NOT NULL,
  "ip" VARCHAR(100) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Impresoras" (
  "id" SERIAL NOT NULL,
  "id_estatus" int NOT NULL,
  "id_operativa" int NOT NULL,
  "nombre" VARCHAR(100) NOT NULL,
  "ip_impresora" VARCHAR(100),
  "doble_cara" boolean NOT NULL,
  "color" boolean NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Documentos" (
  "id" SERIAL NOT NULL,
  "id_usuario" int NOT NULL,
  "original_nombre" VARCHAR(225) NOT NULL,
  "nombre_interno" VARCHAR(225) NOT NULL,
  "tipo" VARCHAR(10) NOT NULL,
  "tamaño" bigint NOT NULL,
  "ruta" TEXT NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Impresion" (
  "id" SERIAL NOT NULL,
  "id_usuario" int NOT NULL,
  "id_documento" int NOT NULL,
  "id_impresora" int NOT NULL,
  "id_estado_imprecion" int NOT NULL,
  "id_tamaño_papel" int NOT NULL,
  "id_trabajo_extra" int,
  "trabajo_extra" boolean NOT NULL,
  "prioridad" int NOT NULL,
  "copias" int NOT NULL,
  "total_paginas" int NOT NULL,
  "color" boolean NOT NULL,
  "doble_cara" boolean NOT NULL,
  "precio_total" decimal NOT NULL,
  "notas" TEXT NOT NULL,
  "entrada_cola" TIMESTAMPTZ NOT NULL,
  "inicio_impresion" TIMESTAMPTZ NOT NULL,
  "fin_impresion" TIMESTAMPTZ,
  PRIMARY KEY ("id")
);

CREATE TABLE "Trabajos_impresion_extras" (
  "id" SERIAL NOT NULL,
  "opcion_nombre" VARCHAR(100) NOT NULL,
  "costo_extra" decimal NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Productos" (
  "id" SERIAL NOT NULL,
  "id_cateogira" int NOT NULL,
  "nombre" VARCHAR(150) NOT NULL,
  "descripcion" VARCHAR(225) NOT NULL,
  "precio" decimal NOT NULL,
  "stok" int NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Orden" (
  "id" SERIAL NOT NULL,
  "id_usuario" int NOT NULL,
  "id_estado" int NOT NULL,
  "id_metodo_pago" int NOT NULL,
  "precio_total" decimal NOT NULL,
  "entragado" boolean NOT NULL DEFAULT false,
  PRIMARY KEY ("id")
);

CREATE TABLE "producto_ordenes" (
  "id" SERIAL NOT NULL,
  "id_producto" int NOT NULL,
  "id_orden" int NOT NULL,
  "cantidad" int NOT NULL,
  "precio_unitario" decimal NOT NULL,
  "precio_total" decimal NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "impresiones_ordenes" (
  "id" SERIAL NOT NULL,
  "id_impresion" int NOT NULL,
  "id_orden" int NOT NULL,
  "preciototal" decimal NOT NULL,
  PRIMARY KEY ("id")
);

ALTER TABLE "Sub_dominio" ADD FOREIGN KEY ("id_dominio") REFERENCES "Dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Usuarios" ADD FOREIGN KEY ("id_rol") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Usuarios" ADD FOREIGN KEY ("id_tipo_autenticacion") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Usuarios_tokens" ADD FOREIGN KEY ("id_usuario") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Impresoras" ADD FOREIGN KEY ("id_estatus") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Documentos" ADD FOREIGN KEY ("id_usuario") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Impresoras" ADD FOREIGN KEY ("id_operativa") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Impresion" ADD FOREIGN KEY ("id_usuario") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Impresion" ADD FOREIGN KEY ("id_documento") REFERENCES "Documentos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Impresion" ADD FOREIGN KEY ("id_impresora") REFERENCES "Impresoras" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Impresion" ADD FOREIGN KEY ("id_estado_imprecion") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Impresion" ADD FOREIGN KEY ("id_tamaño_papel") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Impresion" ADD FOREIGN KEY ("id_trabajo_extra") REFERENCES "Trabajos_impresion_extras" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Productos" ADD FOREIGN KEY ("id_cateogira") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Orden" ADD FOREIGN KEY ("id_usuario") REFERENCES "Usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Orden" ADD FOREIGN KEY ("id_metodo_pago") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "Orden" ADD FOREIGN KEY ("id_estado") REFERENCES "Sub_dominio" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "producto_ordenes" ADD FOREIGN KEY ("id_producto") REFERENCES "Productos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "producto_ordenes" ADD FOREIGN KEY ("id_orden") REFERENCES "Orden" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "impresiones_ordenes" ADD FOREIGN KEY ("id_impresion") REFERENCES "Impresion" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "impresiones_ordenes" ADD FOREIGN KEY ("id_orden") REFERENCES "Orden" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY IMMEDIATE;