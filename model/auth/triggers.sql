-- Company
CREATE OR REPLACE TRIGGER set_updated_at_company AFTER UPDATE ON core.company
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE core.update_updated_at_column();

-- Contract

CREATE OR REPLACE TRIGGER set_updated_at_contract AFTER UPDATE ON core.contract
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE core.update_updated_at_column();

-- docType
CREATE OR REPLACE TRIGGER set_updated_at_doctype AFTER UPDATE ON core."docType"
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE core.update_updated_at_column();


-- Employee
CREATE OR REPLACE TRIGGER set_updated_at_employee AFTER UPDATE ON core.employee
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE core.update_updated_at_column();

-- Payment Status
CREATE OR REPLACE TRIGGER set_updated_at_payment_status AFTER UPDATE ON core.payment_status
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE core.update_updated_at_column();

-- Payments
CREATE OR REPLACE TRIGGER set_updated_at_payments AFTER UPDATE ON core.payments
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE core.update_updated_at_column();

-- Plan
CREATE OR REPLACE TRIGGER set_updated_at_plan AFTER UPDATE ON core.plan
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE PROCEDURE core.update_updated_at_column();

-- Profile
CREATE TRIGGER set_updated_at_profile
AFTER UPDATE ON core.profile
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- Suscription
CREATE TRIGGER set_updated_at_suscription
AFTER UPDATE ON core.suscription
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- User Role
CREATE TRIGGER set_updated_at_user_role
AFTER UPDATE ON core.user_role
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();