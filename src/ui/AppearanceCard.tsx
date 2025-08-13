import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useThemeController } from '@/src/providers/ThemeProvider';
import { Card } from '@/src/ui/Card';
import { SegmentedTabs } from '@/src/ui/SegmentedTabs';
import { ThemeType } from '@/src/theme/theme';
import { PaintBucket } from 'lucide-react-native';

export const AppearanceCard = () => {
    const theme = useTheme();
    const { themeType, setThemeType } = useThemeController();

    const options = [
        { key: 'system', label: 'System' },
        { key: 'light', label: 'Light' },
        { key: 'dark', label: 'Dark' },
    ];

    return (
        <Card style={styles.card}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.brandTint }]}>
                    <PaintBucket size={20} color={theme.colors.brand} />
                </View>
                <Text style={[styles.title, theme.typography.h2]}>
                    Appearance
                </Text>
            </View>
            <Text style={[styles.description, theme.typography.caption]}>
                Choose your preferred app theme
            </Text>

            <View style={styles.segmentContainer}>
                <SegmentedTabs
                    tabs={options}
                    activeKey={themeType}
                    onTabPress={(key) => setThemeType(key as ThemeType)}
                />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    title: {
        fontWeight: '600',
    },
    description: {
        marginBottom: 16,
    },
    segmentContainer: {
        marginVertical: 8,
    },
});

export default AppearanceCard;
