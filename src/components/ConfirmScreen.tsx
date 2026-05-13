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
        <h3 className="t-h3" style={{ borderBottom: '1px solid var(--border-1)', paddingBottom: '8px', marginBottom: '16px' }}>注文商品（Staff）</h3>
        {data.products.map((p, i) => (
          <div key={i} style={{ marginBottom: '12px', padding: '12px', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="t-label-bold">{p.sku}</span>
              <span className="t-body">数量: {p.quantity}</span>
            </div>
            {(p.unpackingService || p.assemblyService) && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {p.unpackingService && <span className="t-caption" style={{ backgroundColor: 'var(--brand-100)', color: 'var(--brand-700)', padding: '4px 8px', borderRadius: 'var(--radius-xs)' }}>開梱サービスあり</span>}
                {p.assemblyService && <span className="t-caption" style={{ backgroundColor: 'var(--brand-100)', color: 'var(--brand-700)', padding: '4px 8px', borderRadius: 'var(--radius-xs)' }}>組み立てあり</span>}
              </div>
            )}
          </div>
        ))}
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
