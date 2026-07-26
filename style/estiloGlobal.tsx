import { StyleSheet } from 'react-native';

const palette = {
    background: '#F4F7FB',
    surface: '#FFFFFF',
    surfaceMuted: '#F8FAFC',
    primary: '#12304A',
    primaryPressed: '#0B2236',
    accent: '#2D6A73',
    accentSoft: '#E7F2F3',
    text: '#17212B',
    textMuted: '#667085',
    border: '#D8E0E8',
    borderStrong: '#AEBBC8',
    danger: '#B42318',
    shadow: '#0B1F33',
};

export const Style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 32,
        backgroundColor: palette.background,
    },

    content: {
        width: '100%',
        maxWidth: 560,
        alignSelf: 'center',
    },

    brandBlock: {
        marginBottom: 28,
    },

    eyebrow: {
        marginBottom: 8,
        color: palette.accent,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.4,
        textTransform: 'uppercase',
    },

    title: {
        color: palette.primary,
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -0.6,
        lineHeight: 36,
    },

    subtitle: {
        marginTop: 8,
        color: palette.textMuted,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
    },

    card: {
        width: '100%',
        padding: 24,
        backgroundColor: palette.surface,
        borderWidth: 1,
        borderColor: palette.border,
        borderRadius: 18,
        shadowColor: palette.shadow,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.08,
        shadowRadius: 18,
        elevation: 4,
    },

    form: {
        width: '100%',
        gap: 18,
    },

    fieldGroup: {
        width: '100%',
        gap: 7,
    },

    label: {
        color: palette.text,
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.2,
    },

    input: {
        width: '100%',
        minHeight: 54,
        marginBottom: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: palette.surface,
        borderWidth: 1,
        borderColor: palette.borderStrong,
        borderRadius: 12,
        color: palette.text,
        fontSize: 16,
        fontWeight: '500',
        shadowColor: palette.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 5,
        elevation: 1,
    },
    input2: {
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#072e57',
        borderWidth: 1,
        borderRadius: 12,
        color: '#f3f2f6',
        fontSize: 12,
    },

    inputFocused: {
        borderWidth: 2,
        borderColor: palette.accent,
        backgroundColor: palette.surface,
    },

    inputError: {
        borderColor: palette.danger,
        backgroundColor: '#FFF9F8',
    },

    helperText: {
        color: palette.textMuted,
        fontSize: 12,
        lineHeight: 18,
    },

    errorText: {
        color: palette.danger,
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
        borderRadius: 12,
    },

    buttonPrimary: {
        backgroundColor: palette.primary,
        shadowColor: palette.shadow,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 4,
    },

    buttonPrimaryPressed: {
        backgroundColor: palette.primaryPressed,
        transform: [{ scale: 0.99 }],
    },

    buttonSecondary: {
        backgroundColor: palette.accentSoft,
        borderWidth: 1,
        borderColor: '#C6DEE1',
    },

    buttonTextPrimary: {
        color: palette.surface,
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.2,
    },

    buttonTextSecondary: {
        color: palette.accent,
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.2,
    },

    linkButton: {
        alignSelf: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10,
    },

    linkText: {
        color: palette.accent,
        fontSize: 14,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 22,
        gap: 12,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: palette.border,
    },

    dividerText: {
        color: palette.textMuted,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },

    footer: {
        alignItems: 'center',
        marginTop: 24,
    },

    footerText: {
        color: palette.textMuted,
        fontSize: 13,
        lineHeight: 19,
        textAlign: 'center',
    },
});
