import { VEHICLE_RECORDS } from '@/constants/features/vehicles';
import type { VehicleRecord } from '@/types';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type CreateVehicleInput = {
  brand: string;
  model: string;
  color: string;
  year: string;
  plates: string;
  property: string;
  ownerType: string;
  vehicleType: string;
  hasCirculationCard: boolean;
  hasOfficialId: boolean;
  circulationCardImageUri?: string;
  officialIdImageUri?: string;
};

type VehiclesStoreValue = {
  vehicles: VehicleRecord[];
  addVehicle: (payload: CreateVehicleInput) => VehicleRecord;
};

const VehiclesStoreContext = createContext<VehiclesStoreValue | null>(null);

const normalizeText = (value: string): string => value.trim().toUpperCase();

const generateEntityId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const buildVehicleLabel = (plates: string, brand: string, color: string): string => {
  return `${normalizeText(plates)} / ${normalizeText(brand)} ${normalizeText(color)}`;
};

export const VehiclesProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(VEHICLE_RECORDS);

  const addVehicle = useCallback((payload: CreateVehicleInput): VehicleRecord => {
    const newVehicle: VehicleRecord = {
      id: generateEntityId(),
      label: buildVehicleLabel(payload.plates, payload.brand, payload.color),
      status: 'PENDIENTE',
      statusColor: '#E11D48',
      brand: normalizeText(payload.brand),
      model: normalizeText(payload.model),
      color: normalizeText(payload.color),
      year: payload.year.trim(),
      plates: normalizeText(payload.plates),
      property: normalizeText(payload.property),
      ownerType: normalizeText(payload.ownerType),
      vehicleType: normalizeText(payload.vehicleType),
      hasCirculationCard: payload.hasCirculationCard,
      hasOfficialId: payload.hasOfficialId,
      circulationCardImageUri: payload.circulationCardImageUri,
      officialIdImageUri: payload.officialIdImageUri,
      createdAt: new Date().toISOString(),
    };

    setVehicles((prev) => [newVehicle, ...prev]);
    return newVehicle;
  }, []);

  const value = useMemo<VehiclesStoreValue>(() => {
    return {
      vehicles,
      addVehicle,
    };
  }, [vehicles, addVehicle]);

  return (
    <VehiclesStoreContext.Provider value={value}>
      {children}
    </VehiclesStoreContext.Provider>
  );
};

export const useVehiclesStore = (): VehiclesStoreValue => {
  const context = useContext(VehiclesStoreContext);

  if (!context) {
    throw new Error('useVehiclesStore debe usarse dentro de VehiclesProvider');
  }

  return context;
};
