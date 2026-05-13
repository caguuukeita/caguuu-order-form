const WEBHOOK_URL = import.meta.env.VITE_GAS_WEBHOOK_URL || '';

export interface OrderData {
  customer: {
    name: string;
    phone: string;
    email: string;
    zipCode: string;
    prefecture: string;
    address1: string;
    address2: string;
  };
  products: {
    sku: string;
    quantity: number;
    unpackingService: boolean;
    assemblyService: boolean;
  }[];
  staffNote: string;
}

export const submitOrder = async (data: OrderData) => {
  if (!WEBHOOK_URL) {
    throw new Error('VITE_GAS_WEBHOOK_URL is not set.');
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8', // CORS対策
    },
  });

  if (!response.ok) {
    throw new Error('ネットワークエラーが発生しました');
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || '送信に失敗しました');
  }
  return result;
};
