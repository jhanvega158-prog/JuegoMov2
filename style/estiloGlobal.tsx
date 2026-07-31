import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export const Fonts = {
  primary: 'Inter-Black',
} as const;

export function useGlobalFonts() {
  const [loaded, error] = useFonts({
    'Inter-Black': require('../assets/fonts/GoodLookingFont.otf'),
  });

  return [loaded, error] as const;
}

export const Colors = {
  background: '#1a1a2e',
  surface: '#16213e',
  surfaceStrong: '#10182f',
  primary: '#e94560',
  primaryPressed: '#cf3650',
  text: '#ffffff',
  textSoft: '#e2e2e2',
  textMuted: '#a8a8b3',
  border: '#0f3460',
  borderSoft: '#33415f',
  danger: '#ff6b7a',
  shadow: '#090914',
};

export const Style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: Colors.background,
  },

  authScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  profileScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  content: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },

  brandBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },

  brandMark: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderRadius: 29,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 5,
  },

  brandMarkText: {
    fontFamily: Fonts.primary,
    color: Colors.text,
    fontSize: 30,
    fontWeight: '900',
  },

  eyebrow: {
    fontFamily: Fonts.primary,
    marginBottom: 7,
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },

  title: {
    fontFamily: Fonts.primary,
    color: Colors.text,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.4,
    lineHeight: 36,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: Fonts.primary,
    maxWidth: 360,
    marginTop: 8,
    color: Colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    padding: 22,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 6,
  },

  form: {
    width: '100%',
    gap: 17,
  },

  fieldGroup: {
    width: '100%',
    gap: 8,
  },

  label: {
    fontFamily: Fonts.primary,
    color: Colors.textSoft,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  input: {
    fontFamily: Fonts.primary,
    width: '100%',
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: Colors.surfaceStrong,
    borderWidth: 1,
    borderColor: Colors.borderSoft,
    borderRadius: 12,
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },

  input2: {
    fontFamily: Fonts.primary,
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    color: Colors.textSoft,
    fontSize: 14,
    textAlign: 'center',
  },

  inputFocused: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  inputError: {
    borderColor: Colors.danger,
  },

  helperText: {
    fontFamily: Fonts.primary,
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },

  errorText: {
    fontFamily: Fonts.primary,
    color: Colors.danger,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },

  button: {
    width: '100%',
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 13,
  },

  buttonPrimary: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9,
    elevation: 4,
  },

  buttonPrimaryPressed: {
    backgroundColor: Colors.primaryPressed,
    transform: [{ scale: 0.99 }],
  },

  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.borderSoft,
  },

  buttonSecondaryPressed: {
    backgroundColor: Colors.surfaceStrong,
    transform: [{ scale: 0.99 }],
  },

  buttonTextPrimary: {
    fontFamily: Fonts.primary,
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },

  buttonTextSecondary: {
    fontFamily: Fonts.primary,
    color: Colors.textSoft,
    fontSize: 15,
    fontWeight: '700',
  },

  linkButton: {
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  linkText: {
    fontFamily: Fonts.primary,
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderSoft,
  },

  dividerText: {
    fontFamily: Fonts.primary,
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  footer: {
    alignItems: 'center',
    marginTop: 18,
  },

  footerText: {
    fontFamily: Fonts.primary,
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },

  profileHeader: {
    alignItems: 'center',
    marginBottom: 22,
  },

  profileBadge: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: Colors.primary,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: '#46213d',
  },

  profileBadgeText: {
    fontFamily: Fonts.primary,
    color: Colors.text,
    fontSize: 28,
    fontWeight: '900',
  },

  sectionTitle: {
    fontFamily: Fonts.primary,
    marginBottom: 14,
    color: Colors.text,
    fontSize: 17,
    fontWeight: '800',
  },

  readOnlyField: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.surfaceStrong,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },

  readOnlyLabel: {
    fontFamily: Fonts.primary,
    marginBottom: 5,
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  readOnlyValue: {
    fontFamily: Fonts.primary,
    color: Colors.textSoft,
    fontSize: 15,
    fontWeight: '600',
  },
});
