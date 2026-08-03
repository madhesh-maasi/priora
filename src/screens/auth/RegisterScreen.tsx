import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/auth';
import { signUpSchema, SignUpForm } from '@/features/auth/schemas/auth.schema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { colors, spacing, typography } from '@/theme';
import { AuthStackParamList } from '@/app/navigation/AuthNavigator';

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { signUp, isLoading, error } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signUp(data);
    } catch (err) {
      console.error('Sign up failed:', err);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Priora to manage your tasks</Text>
      </View>

      <Card style={styles.card}>
        {error && <Text style={styles.error}>{error}</Text>}

        <Controller
          control={control}
          name="displayName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={value}
              onChangeText={onChange}
              error={errors.displayName?.message}
              editable={!isLoading}
            />
          )}
        />

        <View style={styles.spacing} />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              placeholder="you@example.com"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          )}
        />

        <View style={styles.spacing} />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Password"
              placeholder="••••••••"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              helper="Min 8 chars, uppercase, lowercase, number"
              secureTextEntry
              editable={!isLoading}
            />
          )}
        />

        <View style={styles.spacing} />

        <Button onPress={handleSubmit(onSubmit)} loading={isLoading} fullWidth>
          Create Account
        </Button>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  content: {
    padding: spacing[4],
  },
  header: {
    marginBottom: spacing[8],
    marginTop: spacing[4],
  },
  title: {
    ...typography.styles.h1,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
  },
  card: {
    marginBottom: spacing[6],
  },
  error: {
    ...typography.styles.bodySm,
    color: colors.error[600],
    marginBottom: spacing[4],
    padding: spacing[3],
    backgroundColor: colors.error[50],
    borderRadius: 8,
  },
  spacing: {
    height: spacing[4],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.text.secondary,
    ...typography.styles.body,
  },
  footerLink: {
    color: colors.primary[600],
    ...typography.styles.body,
    fontWeight: '600',
  },
});
