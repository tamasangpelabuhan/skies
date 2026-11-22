'use client';

import React, { useState } from 'react';
import { useStore } from '../../../context/StoreContext';
import { CustomerOrder } from '../../../types/order';
import { AdminOrdersView } from '../../../components/admin/AdminOrdersView';
import { AdminCredentialsModal } from '../../../components/admin/AdminCredentialsModal';

export default function AdminPesananPage() {
  const { orders, updateOrderStatus, updateOrderCredentials } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  return (
    <div className="space-y-6">
      <AdminOrdersView
        orders={orders}
        onUpdateStatus={updateOrderStatus}
        onOpenCredentialsModal={(order) => setSelectedOrder(order)}
      />

      <AdminCredentialsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onSave={(orderId, creds) => {
          updateOrderCredentials(orderId, creds);
        }}
      />
    </div>
  );
}
