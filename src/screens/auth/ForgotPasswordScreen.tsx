import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/auth';
import { resetPasswordSchema, ResetPasswordForm } from '@/features/auth/schemas/auth.schema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { colors, spacing, typography } from '@/theme';
import { AuthStackParamList } from '@/app/navigation/AuthNavigator';

type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const { resetPassword, isLoading, error } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      await resetPassword(data.email);
      setSubmitted(true);
    } catch (err) {
      console.error('Password reset failed:', err);
    }
  };

  if (submitted) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We've sent a password reset link to your email address.
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.description}>
            Click the link in the email to reset your password. If you don't see it, check your
            spam folder.
          </Text>
        </Card>

        <Button onPress={() => navigation.navigate('Login')} fullWidth>
          Back to Sign In
        </Button>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
      </View>

      <Card style={styles.card}>
        {error && <Text style={styles.error}>{error}</Text>}

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

        <Button onPress={handleSubmit(onSubmit)} loading={isLoading} fullWidth>
          Send Reset Link
        </Button>
      </Card>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backLink}>Back to Sign In</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 48,
    color: colors.success[600],
    marginBottom: spacing[4],
  },
  title: {
    ...typography.styles.h1,
    color: colors.text.primary,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  card: {
    marginBottom: spacing[6],
  },
  description: {
    ...typography.styles.body,
    color: colors.text.secondary,
    lineHeight: 24,
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
  backLink: {
    textAlign: 'center',
    color: colors.primary[600],
    ...typography.styles.bodySm,
  },
});
