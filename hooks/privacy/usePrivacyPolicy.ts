// /hooks/privacy/usePrivacyPolicy.ts
import { useState, useEffect, useCallback } from 'react';
import { MOCK_PRIVACY_DATA } from '@/mock/privacy/privacy';
import { PrivacyData } from '@/types/privacy/privacy';

export const usePrivacyPolicy = () => {
  const [privacy, setPrivacy] = useState<PrivacyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPrivacy(MOCK_PRIVACY_DATA);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching privacy policy:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrivacy();
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPrivacy(MOCK_PRIVACY_DATA);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    privacy,
    isLoading,
    isError,
    refetch,
  };
};
