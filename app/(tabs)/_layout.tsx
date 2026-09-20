/* eslint-disable react-hooks/refs */
// app/(customer)/_layout.tsx
import { Tabs } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { BellIcon, HomeIcon, OneManIconBottomLess, OrdersIcon } from '@/components/icons';
import { Text, Animated, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import { useGetNotificationsQuery } from '@/store/api/notificationApi';

export default function CustomerTabs() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const { data: dbNotifications } = useGetNotificationsQuery(undefined, {
    skip: !user,
    pollingInterval: 15000,
  });
  const unreadCount = dbNotifications?.data?.meta?.unreadCount || 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#B91C1C', // 👈 Changed to #B91C1C
        tabBarInactiveTintColor: '#212121', // 👈 Changed to #212121
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
        tabBarStyle: {
          height: 115,
          paddingTop: 14,
          paddingBottom: 0,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#B91C1C22',
        },
      }}>
      {/* Home */}
      <Tabs.Screen
        name="home/index"
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerBackground: () => (
            <LinearGradient colors={['#1F4D7A', '#1F4D7A']} style={{ flex: 1 }} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 11,
                fontFamily: focused ? 'Nunito-ExtraBold' : 'Nunito-SemiBold',
                color: focused ? '#B91C1C' : '#212121', // 👈 Updated colors
                marginTop: 6,
              }}>
              {t('tabs.home')}
            </Text>
          ),
          tabBarIcon: ({ size, focused }) => {
            return (
              <TabIconWrapper focused={focused} size={size}>
                <HomeIcon
                  size={size}
                  color={focused ? '#B91C1C' : '#212121'} // 👈 Updated colors
                />
              </TabIconWrapper>
            );
          },
        }}
      />

      {/* Orders */}
      <Tabs.Screen
        name="orders/index"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 11,
                fontFamily: focused ? 'Nunito-ExtraBold' : 'Nunito-SemiBold',
                color: focused ? '#B91C1C' : '#212121', // 👈 Updated colors
                marginTop: 6,
              }}>
              {t('tabs.orders')}
            </Text>
          ),
          tabBarIcon: ({ size, focused }) => {
            return (
              <TabIconWrapper focused={focused} size={size}>
                <OrdersIcon
                  size={size}
                  color={focused ? '#B91C1C' : '#212121'} // 👈 Updated colors
                />
              </TabIconWrapper>
            );
          },
        }}
      />

      {/* Notifications */}
      <Tabs.Screen
        name="notifications/index"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 11,
                fontFamily: focused ? 'Nunito-ExtraBold' : 'Nunito-SemiBold',
                color: focused ? '#B91C1C' : '#212121', // 👈 Updated colors
                marginTop: 6,
              }}>
              {t('tabs.notifications')}
            </Text>
          ),
          tabBarIcon: ({ size, focused }) => {
            return (
              <TabIconWrapper focused={focused} size={size}>
                <View style={{ position: 'relative' }}>
                  <BellIcon
                    width={size}
                    height={size}
                    color={focused ? '#B91C1C' : '#212121'} // 👈 Updated colors
                  />
                  {unreadCount > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -8,
                        backgroundColor: '#C4202B',
                        borderRadius: 9,
                        minWidth: 18,
                        height: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 3,
                        borderWidth: 1.5,
                        borderColor: '#FFFFFF',
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 10,
                          fontFamily: 'Nunito-Bold',
                          lineHeight: 12,
                          textAlign: 'center',
                        }}>
                        {unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TabIconWrapper>
            );
          },
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile/index"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 11,
                fontFamily: focused ? 'Nunito-ExtraBold' : 'Nunito-SemiBold',
                color: focused ? '#B91C1C' : '#212121', // 👈 Updated colors
                marginTop: 6,
              }}>
              {t('tabs.profile')}
            </Text>
          ),
          tabBarIcon: ({ size, focused }) => {
            return (
              <TabIconWrapper focused={focused} size={size}>
                <OneManIconBottomLess
                  width={size}
                  height={size}
                  color={focused ? '#B91C1C' : '#212121'} // 👈 Updated colors
                />
              </TabIconWrapper>
            );
          },
        }}
      />
    </Tabs>
  );
}

const TabIconWrapper = ({
  focused,
  size,
  children,
}: {
  focused: boolean;
  size: number;
  children: React.ReactNode;
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        // toValue: focused ? -13 : 0,
        toValue: focused ? 0 : 0,
        useNativeDriver: true,
        damping: 12,
        stiffness: 120,
      }),
      Animated.spring(scale, {
        toValue: focused ? 1.1 : 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 120,
      }),
    ]).start();
  }, [focused]);

  const containerSize = size + 24;

  return (
    <Animated.View
      style={{
        width: containerSize,
        height: containerSize,
        borderRadius: containerSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY }, { scale }],
        // shadowColor: focused ? '#B91C1C' : 'transparent', // 👈 Updated shadow color
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: focused ? 0.25 : 0,
        // shadowRadius: 12,
        // elevation: focused ? 8 : 0,
      }}>
      {focused ? (
        <LinearGradient
          colors={['#B91C1C00', '#8B151500', '#5C0E0E00']} // 👈 Updated gradient colors
          // start={{ x: 0.933, y: 0.195 }}
          // end={{ x: 0.067, y: 0.805 }}
          style={{
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {children}
        </LinearGradient>
      ) : (
        children
      )}
    </Animated.View>
  );
};
