// /hooks/useTerms.ts
import { useState, useEffect, useCallback } from 'react';
import { TermsData } from '@/types/terms/terms';
import { MOCK_TERMS_DATA } from '@/mock/terms/terms';

export const useTerms = () => {
  const [terms, setTerms] = useState<TermsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTerms(MOCK_TERMS_DATA);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching terms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTerms(MOCK_TERMS_DATA);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    terms,
    isLoading,
    isError,
    refetch,
  };
};
