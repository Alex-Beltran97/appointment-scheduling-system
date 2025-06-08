-- Company
CREATE OR REPLACE TRIGGER set_updated_at_company AFTER UPDATE ON auth.company
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE auth.update_updated_at_column();

-- Contract

CREATE OR REPLACE TRIGGER set_updated_at_contract AFTER UPDATE ON auth.contract
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE auth.update_updated_at_column();

-- docType
CREATE OR REPLACE TRIGGER set_updated_at_doctype AFTER UPDATE ON auth."docType"
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE auth.update_updated_at_column();


-- Employee
CREATE OR REPLACE TRIGGER set_updated_at_employee AFTER UPDATE ON auth.employee
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE auth.update_updated_at_column();

-- Payment Status
CREATE OR REPLACE TRIGGER set_updated_at_payment_status AFTER UPDATE ON auth.payment_status
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE auth.update_updated_at_column();

-- Payments
CREATE OR REPLACE TRIGGER set_updated_at_payments AFTER UPDATE ON auth.payments
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE auth.update_updated_at_column();

-- Plan
CREATE OR REPLACE TRIGGER set_updated_at_plan AFTER UPDATE ON auth.plan
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE auth.update_updated_at_column();

-- Profile
CREATE TRIGGER set_updated_at_profile
AFTER UPDATE ON auth.profile
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION auth.update_updated_at_column();

-- Suscription
CREATE TRIGGER set_updated_at_suscription
AFTER UPDATE ON auth.suscription
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION auth.update_updated_at_column();

-- User Role
CREATE TRIGGER set_updated_at_user_role
AFTER UPDATE ON auth.user_role
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION auth.update_updated_at_column();