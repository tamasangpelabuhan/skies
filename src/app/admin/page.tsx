'use client';

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminOverviewView } from '../../components/admin/AdminOverviewView';

export default function AdminOverviewPage() {
  const { orders } = useStore();

  return <AdminOverviewView orders={orders} />;
}
