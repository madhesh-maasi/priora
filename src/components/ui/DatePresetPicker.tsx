import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface DatePreset {
  label: string;
  getValue: () => Date;
}

interface DatePresetPickerProps {
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  presets?: DatePreset[];
}

const defaultPresets: DatePreset[] = [
  {
    label: 'Today',
    getValue: () => new Date(),
  },
  {
    label: 'Tomorrow',
    getValue: () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date;
    },
  },
  {
    label: 'This Week',
    getValue: () => {
      const date = new Date();
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1) + 6;
      date.setDate(diff);
      return date;
    },
  },
  {
    label: 'Next Week',
    getValue: () => {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    },
  },
  {
    label: 'This Month',
    getValue: () => {
      const date = new Date();
      date.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
      return date;
    },
  },
  {
    label: 'Next Month',
    getValue: () => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);
      return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },
  },
];

export const DatePresetPicker: React.FC<DatePresetPickerProps> = ({
  onSelect,
  selectedDate,
  presets = defaultPresets,
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handlePresetSelect = (preset: DatePreset) => {
    const date = preset.getValue();
    onSelect(date);
    setSelected(preset.label);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {presets.map((preset) => (
          <TouchableOpacity
            key={preset.label}
            style={[
              styles.preset,
              selected === preset.label && styles.presetActive,
            ]}
            onPress={() => handlePresetSelect(preset)}
          >
            <Text
              style={[
                styles.presetLabel,
                selected === preset.label && styles.presetLabelActive,
              ]}
            >
              {preset.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  preset: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: spacing[2],
    borderWidth: 1,
    borderColor: colors.neutral[300],
    backgroundColor: colors.bg.secondary,
  },
  presetActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  presetLabel: {
    ...typography.styles.labelSmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  presetLabelActive: {
    color: colors.bg.primary,
  },
});
