import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

interface QN_TabsProps {
    tabs: string[];
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    path?: string;
}

export default function QN_Tabs({ tabs, value, setValue, path }: QN_TabsProps) {
    return (
        <View style={[styles.container, path ? styles.withBorder : styles.withBackground]}> 
            <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setValue(tab)}
                        style={[styles.tab, value === tab ? styles.selectedTab : null]}
                    >
                        <Text style={[styles.tabText, value === tab ? styles.selectedTabText : null]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    withBackground: {
        backgroundColor: '#55B7FE',
    },
    withBorder: {
        borderWidth: 1,
        borderColor: '#000',
    },
    scrollViewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: 'transparent',
    },
    selectedTab: {
        backgroundColor: '#55B7FE',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#676767',
    },
    selectedTabText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
