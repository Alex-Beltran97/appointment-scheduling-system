BEGIN;

-- ******************Transactions:**************************

-- Insert data for contract table

INSERT INTO core.contract
("start_date", "company_id", "employee_id") VALUES (
'2023-01-01'::timestamp with time zone, '1'::bigint, '1'::bigint)
  returning id;

-- SELECT * FROM core.contract;

-----------------------------------------------------------------------------

-- Insert data for payments table

WITH inserted_payment AS (
  INSERT INTO core.payments
    (amount, "paymentStatus_id", "company_id", "plan_id")
  VALUES 
    (1000000::numeric, 1::bigint, 1::bigint, 1::bigint)
  RETURNING id
)
-- SELECT * FROM core.payments;

-----------------------------------------------------------------------------

-- Insert data for core.suscription table

INSERT INTO core.suscription
  ("start_date", "end_date", "payment_id")
SELECT 
  '2025-06-13'::timestamptz,
  '2025-07-13'::timestamptz,
  id
FROM inserted_payment
RETURNING id;

-- SELECT * FROM core.suscription;

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