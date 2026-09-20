// components/ui/inputs/GooglePlacesAddressInput.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Platform,
  ActivityIndicator,
} from 'react-native';
import InputLabel from '@/components/ui/shared/InputLabel';

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ?? '';

if (!GOOGLE_PLACES_API_KEY) {
  console.error('[GooglePlacesAddressInput] ❌ EXPO_PUBLIC_GOOGLE_PLACES_API_KEY is not set.');
}

export interface SelectedAddress {
  formattedAddress: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

interface PlaceSuggestion {
  place_id: string;
  description: string;
}

interface GooglePlacesAddressInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: boolean;
  showLabel?: boolean;
  labelColor?: string;
  placeholderColor?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  showLeftIcon?: boolean;
  onAddressSelect: (address: SelectedAddress) => void;
  onChangeText?: (text: string) => void;
}

const parseAddressComponents = (components: any[] = []) => {
  const get = (type: string) =>
    components.find((c) => c.types?.includes(type))?.long_name ?? undefined;

  return {
    city: get('locality') || get('postal_town') || get('sublocality'),
    state: get('administrative_area_level_1'),
    zipCode: get('postal_code'),
    country: get('country'),
  };
};

const DEBOUNCE_MS = 350;

const GooglePlacesAddressInput: React.FC<GooglePlacesAddressInputProps> = ({
  label = 'Address',
  placeholder = 'Enter address',
  value = '',
  error = false,
  showLabel = true,
  labelColor = '#374151',
  placeholderColor = '#9CA3AF',
  style,
  inputStyle,
  leftIcon,
  showLeftIcon = false,
  onAddressSelect,
  onChangeText,
}) => {
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionTokenRef = useRef<string>(generateSessionToken());

  const hasLeftIcon = showLeftIcon && leftIcon;

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!GOOGLE_PLACES_API_KEY) {
      console.error('[GooglePlaces] Cannot search — API key missing.');
      return;
    }
    if (query.trim().length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    const url =
      `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
      `?input=${encodeURIComponent(query)}` +
      `&key=${GOOGLE_PLACES_API_KEY}` +
      `&sessiontoken=${sessionTokenRef.current}` +
      `&language=en`;

    console.log('[GooglePlaces] Fetching suggestions for:', query);

    try {
      const res = await fetch(url);
      const json = await res.json();

      console.log(
        '[GooglePlaces] Autocomplete status:',
        json.status,
        'results:',
        json.predictions?.length
      );

      if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
        console.error('[GooglePlaces] ❌ API error:', json.status, json.error_message);
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      const results: PlaceSuggestion[] = (json.predictions ?? []).map((p: any) => ({
        place_id: p.place_id,
        description: p.description,
      }));

      setSuggestions(results);
      setShowDropdown(results.length > 0);
    } catch (err) {
      console.error('[GooglePlaces] ❌ Fetch failed:', err);
      setSuggestions([]);
      setShowDropdown(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleChangeText = (text: string) => {
    onChangeText?.(text);
    setShowDropdown(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(text);
    }, DEBOUNCE_MS);
  };

  const handleSelectSuggestion = async (suggestion: PlaceSuggestion) => {
    setShowDropdown(false);
    setSuggestions([]);

    if (!GOOGLE_PLACES_API_KEY) return;

    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${suggestion.place_id}` +
      `&key=${GOOGLE_PLACES_API_KEY}` +
      `&sessiontoken=${sessionTokenRef.current}` +
      `&fields=formatted_address,address_components,geometry`;

    console.log('[GooglePlaces] Fetching details for:', suggestion.description);

    try {
      const res = await fetch(url);
      const json = await res.json();

      console.log('[GooglePlaces] Details status:', json.status);

      if (json.status !== 'OK') {
        console.error('[GooglePlaces] ❌ Details error:', json.status, json.error_message);
        return;
      }

      const result = json.result;
      const parsed = parseAddressComponents(result.address_components);

      onAddressSelect({
        formattedAddress: result.formatted_address ?? suggestion.description,
        latitude: result.geometry?.location?.lat,
        longitude: result.geometry?.location?.lng,
        ...parsed,
      });

      // New session token for the next search — matches Google's
      // recommended session-based billing pattern for Autocomplete + Details.
      sessionTokenRef.current = generateSessionToken();
    } catch (err) {
      console.error('[GooglePlaces] ❌ Details fetch failed:', err);
    }
  };

  return (
    <View style={{ backgroundColor: 'transparent', ...style }}>
      {showLabel && <InputLabel text={label} style={{ color: labelColor, marginBottom: 6 }} />}

      <View
        style={{ position: 'relative', zIndex: 50, elevation: Platform.OS === 'android' ? 50 : 0 }}>
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => {
            setFocused(true);
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          onBlur={() => {
            setFocused(false);
            // Small delay so a suggestion tap can register before the
            // dropdown disappears from the blur event.
            setTimeout(() => setShowDropdown(false), 150);
          }}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={{
            color: '#111827',
            lineHeight: 16 * 1.1,
            height: 48,
            paddingVertical: 12.5,
            paddingLeft: hasLeftIcon ? 50 : 16,
            paddingRight: 40,
            borderRadius: 10,
            borderWidth: 1.2,
            backgroundColor: '#F9FAFB',
            fontFamily: 'Nunito-Regular',
            fontSize: 14,
            borderColor: error ? '#EF4444' : focused ? '#64748B55' : '#9CA3AF3D',
            ...inputStyle,
          }}
        />

        {isSearching && (
          <ActivityIndicator
            size="small"
            color="#9CA3AF"
            style={{ position: 'absolute', right: 14, top: 14 }}
          />
        )}

        {hasLeftIcon && (
          <View style={{ position: 'absolute', left: 14, top: 12, padding: 4 }}>
            {React.isValidElement(leftIcon) ? React.cloneElement(leftIcon) : leftIcon}
          </View>
        )}

        {showDropdown && suggestions.length > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 52,
              left: 0,
              right: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              zIndex: 100,
              elevation: 100,
              maxHeight: 220,
            }}>
            {suggestions.map((item, idx) => (
              <TouchableOpacity
                key={item.place_id}
                onPress={() => handleSelectSuggestion(item)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderBottomWidth: idx === suggestions.length - 1 ? 0 : 1,
                  borderBottomColor: '#F3F4F6',
                }}>
                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 13, color: '#111827' }}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

// Simple random token for Google's session-based Autocomplete+Details
// billing — doesn't need to be cryptographically secure, just unique
// per search session.
function generateSessionToken(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default GooglePlacesAddressInput;
