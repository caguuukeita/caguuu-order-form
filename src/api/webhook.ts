const WEBHOOK_URL = import.meta.env.VITE_GAS_WEBHOOK_URL || '';
const CLOUDFLARE_WORKER_URL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL || '';

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

export const submitOrder = async (data: OrderData) => {
  if (!WEBHOOK_URL && !CLOUDFLARE_WORKER_URL) {
    throw new Error('送信先のWebhook URLが設定されていません。');
  }

  // Lark用のテキストフォーマット（複数商品を1つの文字列にまとめる）
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

  // 1. 既存のGASへの送信（バックアップ）
  if (WEBHOOK_URL) {
    requests.push(
      fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(data), // GASは独自の処理があるため生のdataを送る
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // CORS対策
        },
      })
    );
  }

  // 2. Cloudflare Worker (Lark Bitable) への送信
  if (CLOUDFLARE_WORKER_URL) {
    requests.push(
      fetch(CLOUDFLARE_WORKER_URL, {
        method: 'POST',
        body: JSON.stringify(payload), // Lark用にフォーマット済みのデータを含める
        headers: {
          'Content-Type': 'application/json', // Worker側でCORS許可するためJSONで送る
        },
      })
    );
  }

  const responses = await Promise.all(requests);

  for (let i = 0; i < responses.length; i++) {
    const response = responses[i];
    if (!response.ok) {
      let errorText = '';
      try {
        errorText = await response.text();
      } catch (e) {}
      
      const targetUrl = response.url.includes('google') ? 'Googleスプレッドシート(GAS)' : 'Lark連携(Cloudflare)';
      throw new Error(`【${targetUrl}への送信失敗】ステータスコード: ${response.status} - 詳細: ${errorText}`);
    }
  }

  return { success: true };
};
