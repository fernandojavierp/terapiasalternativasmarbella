-- Crear tabla consultas
CREATE TABLE IF NOT EXISTS consultas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  mensaje TEXT NOT NULL,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activar Row Level Security (RLS)
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción pública (cualquiera puede enviar un formulario de contacto)
DROP POLICY IF EXISTS consultas_insert_public ON consultas;
CREATE POLICY consultas_insert_public ON consultas
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para permitir acceso total (Lectura, Modificación, Borrado) solo al backend
-- usando la key service_role
DROP POLICY IF EXISTS consultas_service_all ON consultas;
CREATE POLICY consultas_service_all ON consultas
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
