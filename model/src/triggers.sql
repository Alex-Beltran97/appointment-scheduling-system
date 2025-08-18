BEGIN;

-- This file contains triggers that automatically update the `updated_at` column

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
AFTER UPDATE ON auth.profile
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
AFTER UPDATE ON auth.user_role
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

CREATE OR REPLACE TRIGGER set_updated_at_services
AFTER UPDATE ON consultant.service
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- consultant.consultant_availability
CREATE OR REPLACE TRIGGER set_updated_at_consultant_availability
AFTER UPDATE ON consultant.consultant_availability
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- consultant.appointments
CREATE OR REPLACE TRIGGER set_updated_at_appointments
AFTER UPDATE ON consultant.appointments
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- consultant.appointment_status
CREATE OR REPLACE TRIGGER set_updated_at_appointment_status
AFTER UPDATE ON consultant.appointment_status
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- consultant.available_slots
CREATE OR REPLACE TRIGGER set_updated_at_available_slots
AFTER UPDATE ON consultant.available_slots
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- consultant.consultant_exceptions
CREATE OR REPLACE TRIGGER set_updated_at_consultant_exceptions
AFTER UPDATE ON consultant.consultant_exceptions
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- consultant.notification
CREATE OR REPLACE TRIGGER set_updated_at_consultant_notification
AFTER UPDATE ON consultant.notification
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- consultant.notification_type
CREATE OR REPLACE TRIGGER set_updated_at_notification_type
AFTER UPDATE ON consultant.notification_type
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

-- auth.profile_img
CREATE OR REPLACE TRIGGER set_updated_at_profile_img
AFTER UPDATE ON auth.profile_img
FOR EACH ROW
WHEN (OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION core.update_updated_at_column();

COMMIT;