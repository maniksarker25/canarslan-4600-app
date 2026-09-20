// /components/ui/profile/FAQItem.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FAQItemProps {
  question: string;
  answer: string;
  isLast?: boolean;
}

const FAQItem = ({ question, answer, isLast = false }: FAQItemProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="px-1 py-1">
      {/* Question Header */}
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
        className="flex-row items-center justify-between py-2.5">
        <Text className="flex-1 pr-2 font-nunitoSemi text-[14px] text-[#1F2937]">
          {question}
        </Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>

      {/* Answer (expanded) */}
      {expanded && (
        <View className="mb-2 border-t border-[#F3F4F6] pt-2.5">
          <Text className="font-nunito text-[13px] leading-5 text-[#4B5563]">
            {answer}
          </Text>
        </View>
      )}

      {/* Divider line if not last */}
      {!isLast && <View className="h-[1px] bg-[#F3F4F6]" />}
    </View>
  );
};

export default FAQItem;
