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
  staffName: string;
  discountRate: number;
  products: {
    sku: string;
    productName: string;
    variation: string;
    unitPrice: number;
    quantity: number;
    unpackingServiceCost: number;
    assemblyServiceCost: number;
  }[];
  summary: {
    subtotal: number;
    discountAmount: number;
    totalAmount: number;
  };
  staffNote: string;
}

const MS_WEBHOOK_URL = import.meta.env.VITE_MS_WEBHOOK_URL || '';

export const submitOrder = async (data: OrderData) => {
  if (!WEBHOOK_URL && !MS_WEBHOOK_URL) {
    throw new Error('送信先のWebhook URLが設定されていません。');
  }

  // Power Automate等でそのまま使えるよう、注文商品詳細のテキストを生成
  const productsDetails = data.products.map(p => {
    let parts = [];
    if (p.productName) parts.push(`商品名: ${p.productName}`);
    parts.push(`SKU: ${p.sku}`);
    if (p.variation) parts.push(`バリエーション情報: ${p.variation}`);
    if (p.unpackingServiceCost > 0) parts.push(`開梱費用: ${p.unpackingServiceCost}`);
    if (p.assemblyServiceCost > 0) parts.push(`組立費用: ${p.assemblyServiceCost}`);
    parts.push(`単価: ${p.unitPrice}`);
    parts.push(`数量: ${p.quantity}`);
    return parts.join('\\n');
  }).join('\\n\\n');

  const formattedProductsString = `スタッフ名: ${data.staffName || '未入力'}\\n${productsDetails}\\n小計: ${data.summary.subtotal}\\n割引額: ${data.summary.discountAmount}\\n決済金額: ${data.summary.totalAmount}`;

  const payload = {
    ...data,
    formattedProducts: formattedProductsString,
    timestamp: new Date().toISOString()
  };

  const requests = [];

  if (WEBHOOK_URL) {
    requests.push(
      fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // GASのCORS対策
        },
      })
    );
  }

  if (MS_WEBHOOK_URL) {
    requests.push(
      fetch(MS_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json', // Power Automateはapplication/jsonを受け付ける
        },
      })
    );
  }

  const responses = await Promise.all(requests);

  for (const response of responses) {
    if (!response.ok) {
      throw new Error('一部のデータ送信に失敗しました');
    }
  }

  return { success: true };
};
