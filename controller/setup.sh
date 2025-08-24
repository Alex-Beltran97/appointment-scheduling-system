#!/bin/bash

echo "Creando schemas..."
psql -U postgres -d appointment-scheduling-system-db -f ../model/src/schemas.sql

echo "Ejecutando migraciones..."
npm run mig:gen:CreateTables
npm run mig:run

echo "Creando funciones y triggers..."
psql -U postgres -d appointment-scheduling-system-db -f ../model/src/funtions.sql
psql -U postgres -d appointment-scheduling-system-db -f ../model/src/triggers.sql

echo "Insertando datos..."
psql -U postgres -d appointment-scheduling-system-db -f ../model/src/inserts/enums.sql
psql -U postgres -d appointment-scheduling-system-db -f ../model/src/inserts/actors.sql
psql -U postgres -d appointment-scheduling-system-db -f ../model/src/inserts/transactions.sql
psql -U postgres -d appointment-scheduling-system-db -f ../model/src/inserts/appointments.sql

echo "Backend listo para iniciar."
npm run start