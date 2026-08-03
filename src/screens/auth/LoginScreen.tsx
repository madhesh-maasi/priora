import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/auth';
import { signInSchema, SignInForm } from '@/features/auth/schemas/auth.schema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { colors, spacing, typography } from '@/theme';
import { AuthStackParamList } from '@/app/navigation/AuthNavigator';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { signIn, signInWithGoogle, signInWithApple, isLoading, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      await signIn(data);
    } catch (err) {
      console.error('Sign in failed:', err);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Priora</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
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
              secureTextEntry
              editable={!isLoading}
            />
          )}
        />

        <View style={styles.spacing} />

        <Button onPress={handleSubmit(onSubmit)} loading={isLoading} fullWidth>
          Sign In
        </Button>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button
          onPress={signInWithGoogle}
          variant="outline"
          fullWidth
          disabled={isLoading}
        >
          Sign in with Google
        </Button>

        <View style={styles.spacing} />

        <Button
          onPress={signInWithApple}
          variant="outline"
          fullWidth
          disabled={isLoading}
        >
          Sign in with Apple
        </Button>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[6],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing[4],
    color: colors.text.secondary,
    ...typography.styles.bodySm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing[4],
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
  forgotPassword: {
    textAlign: 'center',
    color: colors.primary[600],
    ...typography.styles.bodySm,
  },
});
