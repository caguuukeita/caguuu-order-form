import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { OrderData } from '../api/webhook';

interface ConfirmScreenProps {
  data: OrderData;
  register: UseFormRegister<any>;
  onBack: () => void;
  isSubmitting: boolean;
}

export const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ data, register, onBack, isSubmitting }) => {
  const formatCurrency = (num: number) => `¥${num.toLocaleString()}`;

  return (
    <div className="card">
      <h2 className="t-h2 section-title">入力内容の確認</h2>
      
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 className="t-h3" style={{ borderBottom: '1px solid var(--border-1)', paddingBottom: '8px', marginBottom: '16px' }}>お客様情報</h3>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px 16px' }}>
          <dt className="t-label-bold" style={{ color: 'var(--fg-2)' }}>氏名</dt>
          <dd className="t-body" style={{ margin: 0 }}>{data.customer.name}</dd>
          <dt className="t-label-bold" style={{ color: 'var(--fg-2)' }}>電話番号</dt>
          <dd className="t-body" style={{ margin: 0 }}>{data.customer.phone}</dd>
          <dt className="t-label-bold" style={{ color: 'var(--fg-2)' }}>メールアドレス</dt>
          <dd className="t-body" style={{ margin: 0 }}>{data.customer.email}</dd>
          <dt className="t-label-bold" style={{ color: 'var(--fg-2)' }}>住所</dt>
          <dd className="t-body" style={{ margin: 0 }}>
            〒{data.customer.zipCode}<br />
            {data.customer.prefecture} {data.customer.address1} {data.customer.address2}
          </dd>
        </dl>
      </div>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-1)', paddingBottom: '8px', marginBottom: '16px' }}>
          <h3 className="t-h3" style={{ margin: 0 }}>注文商品（Staff）</h3>
          <span className="t-caption" style={{ color: 'var(--fg-2)' }}>担当: {data.staffName}</span>
        </div>
        
        {data.products.map((p, i) => (
          <div key={i} style={{ marginBottom: '12px', padding: '16px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span className="t-label-bold" style={{ display: 'block', fontSize: 'var(--fs-16)' }}>{p.productName || '商品名未入力'}</span>
                <span className="t-caption" style={{ color: 'var(--fg-2)' }}>SKU: {p.sku} {p.variation ? ` / ${p.variation}` : ''}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="t-label-bold">{formatCurrency(p.unitPrice)}</span>
                <span className="t-body" style={{ marginLeft: '8px' }}>× {p.quantity}</span>
              </div>
            </div>
            
            {(p.unpackingServiceCost > 0 || p.assemblyServiceCost > 0) && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border-2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {p.unpackingServiceCost > 0 && (
                  <div className="t-caption" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--brand-100)', color: 'var(--brand-700)', padding: '4px 8px', borderRadius: 'var(--radius-xs)' }}>
                    <span>開梱サービス</span>
                    <span>{formatCurrency(p.unpackingServiceCost)}</span>
                  </div>
                )}
                {p.assemblyServiceCost > 0 && (
                  <div className="t-caption" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--brand-100)', color: 'var(--brand-700)', padding: '4px 8px', borderRadius: 'var(--radius-xs)' }}>
                    <span>組み立てサービス</span>
                    <span>{formatCurrency(p.assemblyServiceCost)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)' }}>
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px 16px', fontSize: 'var(--fs-16)' }}>
            <dt style={{ color: 'var(--fg-2)' }}>小計</dt>
            <dd style={{ margin: 0, textAlign: 'right' }}>{formatCurrency(data.summary.subtotal)}</dd>
            
            <dt style={{ color: 'var(--fg-2)' }}>割引額 ({data.discountRate}%)</dt>
            <dd style={{ margin: 0, textAlign: 'right', color: 'var(--sale-red)' }}>-{formatCurrency(data.summary.discountAmount)}</dd>
            
            <div style={{ gridColumn: '1 / -1', height: '1px', backgroundColor: 'var(--border-2)', margin: '4px 0' }}></div>
            
            <dt className="t-label-bold" style={{ fontSize: 'var(--fs-18)' }}>決済金額</dt>
            <dd className="t-label-bold" style={{ margin: 0, textAlign: 'right', fontSize: 'var(--fs-20)', color: 'var(--brand-700)' }}>{formatCurrency(data.summary.totalAmount)}</dd>
          </dl>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-6)', padding: '16px', backgroundColor: 'var(--bg-surface-alt)', border: '1px solid var(--border-2)', borderRadius: 'var(--radius-md)' }}>
        <label className="t-label-bold" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>スタッフ用備考欄</span>
          <span className="badge-staff t-caption">Staff Only</span>
        </label>
        <textarea 
          {...register('staffNote')} 
          style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-2)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-14)', minHeight: '80px', boxSizing: 'border-box' }}
          placeholder="特記事項があれば入力してください"
        />
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
        <button type="button" onClick={onBack} className="btn-line" style={{ flex: 1 }} disabled={isSubmitting}>
          修正する
        </button>
        <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '注文を確定して送信する'}
        </button>
      </div>
    </div>
  );
};
