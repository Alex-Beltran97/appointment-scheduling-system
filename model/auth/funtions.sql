CREATE OR REPLACE FUNCTION auth.update_updated_at_column() RETURNS TRIGGER
AS $$
DECLARE
	schema_name text := TG_TABLE_SCHEMA;
	table_name text := TG_TABLE_NAME;
	sql text;
BEGIN
	sql := format('UPDATE %I.%I SET updated_at = $1 WHERE id = $2', schema_name, table_name);
	EXECUTE sql USING now(), old.id;
	RETURN NULL;
END
$$
LANGUAGE plpgsql