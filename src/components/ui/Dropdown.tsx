import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface DropdownOption {
  label: string;
  value: string | number;
  icon?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onSelect,
  placeholder = 'Select an option',
  label,
  error,
}) => {
  const [visible, setVisible] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.trigger, error && styles.triggerError]}
        onPress={() => setVisible(true)}
      >
        <View style={styles.triggerContent}>
          {selected?.icon && <Text style={styles.icon}>{selected.icon}</Text>}
          <Text style={[styles.triggerText, !selected && styles.placeholder]}>
            {selected?.label || placeholder}
          </Text>
        </View>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    selected?.value === item.value && styles.optionSelected,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  {item.icon && <Text style={styles.optionIcon}>{item.icon}</Text>}
                  <Text
                    style={[
                      styles.optionLabel,
                      selected?.value === item.value && styles.optionLabelSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              scrollEnabled={options.length > 5}
              nestedScrollEnabled={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...typography.styles.labelSmall,
    color: colors.text.primary,
    marginBottom: spacing[1],
    fontWeight: '600',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: spacing[2],
    backgroundColor: colors.bg.secondary,
  },
  triggerError: {
    borderColor: colors.error[500],
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: spacing[2],
    fontSize: 18,
  },
  triggerText: {
    ...typography.styles.body,
    color: colors.text.primary,
  },
  placeholder: {
    color: colors.text.tertiary,
  },
  chevron: {
    color: colors.text.secondary,
    fontSize: 12,
    marginLeft: spacing[2],
  },
  error: {
    ...typography.styles.caption,
    color: colors.error[600],
    marginTop: spacing[1],
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: colors.bg.primary,
    borderRadius: spacing[2],
    maxHeight: 300,
    width: '80%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  optionSelected: {
    backgroundColor: colors.primary[50],
  },
  optionIcon: {
    marginRight: spacing[2],
    fontSize: 18,
  },
  optionLabel: {
    ...typography.styles.body,
    color: colors.text.primary,
    flex: 1,
  },
  optionLabelSelected: {
    color: colors.primary[600],
    fontWeight: '600',
  },
});
