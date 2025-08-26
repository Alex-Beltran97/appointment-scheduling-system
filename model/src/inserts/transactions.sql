BEGIN;

-- ******************Transactions:**************************

-- Insert data for contract table

INSERT INTO core.contract
("start_date", "company_id", "employee_id") VALUES (
'2023-01-01'::timestamp with time zone, '1'::bigint, '1'::bigint)
  returning id;

INSERT INTO core.contract
("start_date", "company_id", "employee_id") VALUES (
'2022-01-01'::timestamp with time zone, '1'::bigint, '2'::bigint)
  returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 2, 3) returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 2, 4) returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 2, 5) returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 2, 6) returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 1, 7) returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 1, 8) returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 1, 9) returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 1, 10) returning id;

INSERT INTO core.contract ("start_date", "company_id", "employee_id") VALUES
('2023-01-01'::timestamp with time zone, 1, 11) returning id;

-- SELECT * FROM core.contract;



-----------------------------------------------------------------------------

-- Insert user data for profile table

WITH inserted_profile AS (
  INSERT INTO auth.profile (
    name, "lastName", "secondLastName", birth_date, phone,
    "countryCode", "departmentCode", "cityCode", email,
    "docNum", "nitCode", username, password,
    "userRole_id", "docType_id"
  ) VALUES (
    'Pepito Jaimito', 'Perez', 'Prieto', '1990-01-01T05:00:00.000Z',
    '+573135553333', 'COL', 'BOG', 'BOG', 'pepito.perez@example.com',
    1033888333, '900428042-2', 'T12345',
    '$2b$10$g1Q9WYzGaTB0JgrsDXe.fuC2FLG/mani0cNe8sbCDI2AObvcUH14O',
    2, 3
  )
  RETURNING id AS profile_id
),
inserted_payment AS (
  INSERT INTO core.payments
    (amount, "paymentStatus_id", "profile_id", "plan_id")
  SELECT
    1000000::numeric, 1::bigint, profile_id, 1::bigint
  FROM inserted_profile
  RETURNING id AS payment_id
)
INSERT INTO core.suscription
  ("start_date", "end_date", "payment_id")
SELECT 
  '2025-06-13'::timestamptz,
  '2025-07-13'::timestamptz,
  payment_id
FROM inserted_payment;


-----------------------------------------------------------------------------

-- Insert admin data for profile table

INSERT INTO auth.profile
(
  name,
  "lastName",
  "secondLastName",
  birth_date,
  phone,
  "countryCode",
  "departmentCode",
  "cityCode",
  email,
  "docNum",
  "nitCode",
  username,
  password,
  "userRole_id",
  "docType_id"
  ) VALUES (
  'Arturo'::character varying,
  'Rojas' ::character varying,
  'Gomez' ::character varying,
  '1990-01-01T05:00:00.000Z'::timestamp with time zone,
  '+573135553333'::character varying,
  'COL'::character varying,
  'BOG'::character varying,
  'BOG'::character varying,
  'arturo.rojas@example.com'::character varying,
  1033888555::numeric,
  '900428555-2'::character varying,
  'T67890'::character varying,
  '$2b$10$g1Q9WYzGaTB0JgrsDXe.fuC2FLG/mani0cNe8sbCDI2AObvcUH14O'::character varying,
  '1'::bigint,
  '3'::bigint
  ) returning id;

-- SELECT * FROM auth.profile;

-----------------------------------------------------------------------------

-- Insert admin data for profile table

INSERT INTO consultant.service (
  consultant_id,
  name,
  description,
  duration_minutes,
  price
)
VALUES (
  1,
  'Asesoria Financiera Personalizada',
  'Sesión de 60 minutos para revisar y planificar tus finanzas personales, incluyendo ahorro, inversión y presupuesto.',
  60,
  150000.00
)
RETURNING id;

-- SELECT * FROM auth.profile;

-----------------------------------------------------------------------------

COMMIT;
