-- Activar RLS en tablas críticas
ALTER TABLE usuarios_admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios_admin
-- Solo lectura por defecto para evitar enumeración desde el cliente anon
DROP POLICY IF EXISTS usuarios_admin_select_public ON usuarios_admin;
CREATE POLICY usuarios_admin_select_public ON usuarios_admin
AS PERMISSIVE FOR SELECT
TO anon
USING (false);

-- Permitir al backend acceder (service role)
DROP POLICY IF EXISTS usuarios_admin_service_all ON usuarios_admin;
CREATE POLICY usuarios_admin_service_all ON usuarios_admin
AS PERMISSIVE FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Políticas para testimonios
-- Lectura pública solo de testimonios aprobados y visibles
DROP POLICY IF EXISTS testimonios_public_select ON testimonios;
CREATE POLICY testimonios_public_select ON testimonios
AS PERMISSIVE FOR SELECT
TO anon
USING (aprobado = true AND visible = true);

-- Inserción pública de nuevos testimonios (sin poder fijar aprobado)
DROP POLICY IF EXISTS testimonios_public_insert ON testimonios;
CREATE POLICY testimonios_public_insert ON testimonios
AS PERMISSIVE FOR INSERT
TO anon
WITH CHECK (
  aprobado = false AND visible = true
);

-- Actualización restringida solo para admin (usa service_role desde el servidor)
DROP POLICY IF EXISTS testimonios_admin_update ON testimonios;
CREATE POLICY testimonios_admin_update ON testimonios
AS PERMISSIVE FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Opcional: permitir a quien creó el testimonio editar su contenido durante 15 minutos
-- requiere columna user_id o similar; si no, omitir