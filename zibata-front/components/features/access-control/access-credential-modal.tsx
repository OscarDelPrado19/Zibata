import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { AccessCredential } from '@/types';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type AccessCredentialModalProps = {
  visible: boolean;
  credential: AccessCredential | null;
  onClose: () => void;
};

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

const hexToRgb = (hex: string): RgbColor | null => {
  const normalized = hex.replace('#', '').trim();
  const fullHex = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;

  if (fullHex.length !== 6) {
    return null;
  }

  const value = Number.parseInt(fullHex, 16);
  if (Number.isNaN(value)) {
    return null;
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const toRgba = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return `rgba(15, 75, 110, ${alpha})`;
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

const toReadableAccent = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return '#0F4B6E';
  }

  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  if (luminance <= 0.68) {
    return hex;
  }

  const darkenFactor = 0.45;
  const r = Math.round(rgb.r * (1 - darkenFactor));
  const g = Math.round(rgb.g * (1 - darkenFactor));
  const b = Math.round(rgb.b * (1 - darkenFactor));
  return `rgb(${r}, ${g}, ${b})`;
};

const toIsoDate = (value: string): string => {
  if (value.includes('-') && value.length === 10 && value[4] === '-') {
    return value;
  }

  const parts = value.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }

  return value;
};

export const AccessCredentialModal: React.FC<AccessCredentialModalProps> = ({
  visible,
  credential,
  onClose,
}) => {
  if (!credential) {
    return null;
  }

  const visitorCount = credential.visitorCount ?? 1;
  const propertyLabel = credential.property ?? 'DISCOVERY CENTER SN';
  const accessType = credential.accessType ?? 'HOY';
  const transportType = credential.transportType ?? 'OTRO';
  const folio = credential.folio ?? `${toIsoDate(credential.date)}/${credential.id}`;
  const dateLabel = toIsoDate(credential.date);
  const qrValue = credential.qrValue ?? `ZIBATA|FOLIO:${folio}|VISITANTE:${credential.name}`;
  const accentColor = toReadableAccent(credential.statusColor);
  const accentSoft = toRgba(credential.statusColor, 0.08);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <IconSymbol name="xmark" size={16} color="#334155" />
              </TouchableOpacity>

              <View style={[styles.qrWrapper, { borderColor: accentSoft }]}>
                <QRCode value={qrValue} size={146} backgroundColor="#FFFFFF" color="#111111" />
              </View>

              <View style={styles.folioPill}>
                <View style={[styles.folioDot, { backgroundColor: accentColor }]} />
                <ThemedText style={styles.folioText}>FOLIO: {folio}</ThemedText>
              </View>

              <View style={[styles.card, { borderColor: accentSoft }]}>
                <View style={styles.row}>
                  <IconSymbol name="house.fill" size={18} color={accentColor} />
                  <ThemedText style={styles.primaryText}>{propertyLabel}</ThemedText>
                </View>

                <View style={styles.row}>
                  <IconSymbol name="person.fill" size={18} color={accentColor} />
                  <ThemedText style={styles.secondaryText}>{`${credential.name} (${visitorCount})`}</ThemedText>
                </View>

                <View style={styles.row}>
                  <IconSymbol name="calendar" size={18} color={accentColor} />
                  <ThemedText style={styles.secondaryText}>FECHA: {dateLabel}</ThemedText>
                </View>

                <View style={styles.grid}>
                  <View style={styles.gridItem}>
                    <ThemedText style={styles.gridLabel}>ACCESO</ThemedText>
                    <View style={styles.gridValueRow}>
                      <IconSymbol name="clock.fill" size={16} color={accentColor} />
                      <ThemedText style={styles.gridValue}>{accessType}</ThemedText>
                    </View>
                  </View>

                  <View style={styles.gridItem}>
                    <ThemedText style={styles.gridLabel}>TRANSPORTE</ThemedText>
                    <View style={styles.gridValueRow}>
                      <ThemedText style={styles.gridValue}>{transportType}</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrWrapper: {
    alignSelf: 'center',
    marginTop: 4,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E8EC',
  },
  folioPill: {
    marginTop: 14,
    backgroundColor: '#EEF2F5',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  folioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  folioText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  card: {
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#F2F4F6',
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  primaryText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  grid: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  gridValueRow: {
    marginTop: 8,
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  gridValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
});
