BEGIN;

-- ******************Trasactions:**************************

-- Insert data for contract table

INSERT INTO auth.contract
("start_date", "company_id", "employee_id") VALUES (
'2023-01-01'::timestamp with time zone, '1'::bigint, '1'::bigint)
  returning id;

-- SELECT * FROM auth.contract;

-----------------------------------------------------------------------------

-- Insert data for suscription and payments tables

WITH inserted_suscription AS (
  INSERT INTO auth.suscription
    ("start_date", "end_date", "company_id", "plan_id")
  VALUES 
    ('2025-01-01'::timestamptz, '2026-01-01'::timestamptz, 1::bigint, 2::bigint)
  RETURNING id
),
payment_insert AS (
  INSERT INTO auth.payments
    (amount, suscription_id, "paymentStatus_id")
  SELECT 
    100000::numeric, id, 1::bigint
  FROM inserted_suscription
  RETURNING id
)

-- SELECT * FROM auth.suscription;
-- SELECT * FROM auth.payments;

-----------------------------------------------------------------------------

-- Insert data for profile table

INSERT INTO auth.profile
(
  name,
  "lastName",
  "secondLastName",
  birth_date,
  phone,
  "countryCode",
  "cityCode",
  email,
  "docNum",
  "nitCode",
  "employeeCode",
  username,
  password,
  "userRole_id",
  "docType_id"
  ) VALUES (
  'Pepito Jaimito'::character varying,
  'Perez' ::character varying,
  'Prieto' ::character varying,
  '1990-01-01T05:00:00.000Z'::timestamp with time zone,
  '+573135553333'::character varying,
  'COL'::character varying,
  'BOG'::character varying,
  'pepito.perez@example.com'::character varying,
  1033888333::numeric,
  '900428042-2'::character varying,
  'T12345'::character varying,
  'pepito-perez90'::character varying,
  'User1234*'::character varying,
  '2'::bigint,
  '3'::bigint
  ) returning id;

-- SELECT * FROM auth.profile;

-----------------------------------------------------------------------------

COMMIT;