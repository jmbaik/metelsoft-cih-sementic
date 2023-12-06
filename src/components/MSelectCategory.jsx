import React from 'react';
import MSelect from './MSelect';

export default function MSelectCategory({ control }) {
  return (
    <MSelect
      isLabel={false}
      control={control}
      data={[
        { key: '', value: '', text: '-선택' },
        { key: 'pastor', value: 'pastor', text: '목사님영상' },
        { key: 'faith', value: 'faith', text: '삶과 신앙' },
        { key: 'celeb', value: 'celeb', text: '유명인간증영상' },
        { key: 'sermon', value: 'sermon', text: '강해설교영상' },
        { key: 'mercy', value: 'mercy', text: '긍휼사역영상' },
        { key: 'ccm', value: 'ccm', text: '나의성장 CCM' },
      ]}
      name="category"
      required={true}
    />
  );
}
