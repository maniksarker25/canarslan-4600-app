// /hooks/legal/useLegalInfo.ts
import { useState, useEffect, useCallback } from 'react';
import { MOCK_LEGAL_INFO } from '@/mock/legal/legal';
import { LegalInfoData } from '@/types/legal/legal';

export const useLegalInfo = () => {
  const [legalInfo, setLegalInfo] = useState<LegalInfoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchLegalInfo = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setLegalInfo(MOCK_LEGAL_INFO);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching legal info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLegalInfo();
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLegalInfo(MOCK_LEGAL_INFO);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    legalInfo,
    isLoading,
    isError,
    refetch,
  };
};