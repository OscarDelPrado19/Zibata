import {
    ACCESS_CREDENTIALS,
    EMPLOYEES,
    PROVIDERS,
} from '@/constants/features/access-control';
import type { AccessCredential, Employee, Provider } from '@/types';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  motherLastName: string;
  position: string;
  startDate: Date;
};

export type CreateProviderInput = {
  companyName: string;
  service: string;
  visitDate: Date;
};

export type CreateVisitInput = {
  firstName: string;
  lastName: string;
  motherLastName: string;
  visitDate: Date;
};

type AccessControlStoreValue = {
  employees: Employee[];
  providers: Provider[];
  credentials: AccessCredential[];
  addEmployee: (payload: CreateEmployeeInput) => Employee;
  addProvider: (payload: CreateProviderInput) => Provider;
  addVisit: (payload: CreateVisitInput) => AccessCredential;
};

const AccessControlStoreContext = createContext<AccessControlStoreValue | null>(null);

const formatListDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const normalizeName = (value: string): string => value.trim().toUpperCase();

const buildFullName = (firstName: string, lastName: string, motherLastName: string): string => {
  return [firstName, lastName, motherLastName].map(normalizeName).join(' ').trim();
};

const generateEntityId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const AccessControlProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [providers, setProviders] = useState<Provider[]>(PROVIDERS);
  const [credentials, setCredentials] = useState<AccessCredential[]>(ACCESS_CREDENTIALS);

  const addEmployee = useCallback((payload: CreateEmployeeInput): Employee => {
    const newEmployee: Employee = {
      id: generateEntityId(),
      name: buildFullName(payload.firstName, payload.lastName, payload.motherLastName),
      position: payload.position,
      date: formatListDate(payload.startDate),
      statusColor: '#10B981',
    };

    setEmployees((prev) => [newEmployee, ...prev]);
    return newEmployee;
  }, []);

  const addProvider = useCallback((payload: CreateProviderInput): Provider => {
    const newProvider: Provider = {
      id: generateEntityId(),
      name: normalizeName(payload.companyName),
      company: payload.service,
      date: formatListDate(payload.visitDate),
      statusColor: '#3B82F6',
    };

    setProviders((prev) => [newProvider, ...prev]);
    return newProvider;
  }, []);

  const addVisit = useCallback((payload: CreateVisitInput): AccessCredential => {
    const fullName = buildFullName(payload.firstName, payload.lastName, payload.motherLastName);
    const dateIso = payload.visitDate.toISOString().slice(0, 10);
    const folioSuffix = String(Math.floor(Math.random() * 90000) + 10000);
    const newCredential: AccessCredential = {
      id: generateEntityId(),
      name: fullName,
      date: formatListDate(payload.visitDate),
      statusColor: '#FDE047',
      folio: `${dateIso}/${folioSuffix}`,
      property: 'DISCOVERY CENTER SN',
      visitorCount: 1,
      accessType: 'HOY',
      transportType: 'OTRO',
      qrValue: `ZIBATA|FOLIO:${dateIso}/${folioSuffix}|VISITANTE:${fullName}`,
    };

    setCredentials((prev) => [newCredential, ...prev]);
    return newCredential;
  }, []);

  const value = useMemo<AccessControlStoreValue>(() => {
    return {
      employees,
      providers,
      credentials,
      addEmployee,
      addProvider,
      addVisit,
    };
  }, [employees, providers, credentials, addEmployee, addProvider, addVisit]);

  return (
    <AccessControlStoreContext.Provider value={value}>
      {children}
    </AccessControlStoreContext.Provider>
  );
};

export const useAccessControlStore = (): AccessControlStoreValue => {
  const context = useContext(AccessControlStoreContext);

  if (!context) {
    throw new Error('useAccessControlStore debe usarse dentro de AccessControlProvider');
  }

  return context;
};
