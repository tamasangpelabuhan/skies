'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ReviewModal } from './modals/ReviewModal';

export const ReviewModalWrapper: React.FC = () => {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    reviewTargetOrder,
    reviewTargetProduct,
    addReview,
  } = useStore();

  return (
    <ReviewModal
      isOpen={isReviewModalOpen}
      onClose={() => setIsReviewModalOpen(false)}
      order={reviewTargetOrder}
      product={reviewTargetProduct}
      onSubmitReview={async (data) => {
        await addReview(data);
      }}
    />
  );
};
