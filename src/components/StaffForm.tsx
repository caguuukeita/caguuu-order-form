import React from 'react';
import type { UseFormRegister, Control } from 'react-hook-form';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { OrderData } from '../api/webhook';

interface StaffFormProps {
  register: UseFormRegister<OrderData>;
  control: Control<OrderData>;
}

export const StaffForm: React.FC<StaffFormProps> = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  // 自動計算用のWatch
  const formValues = useWatch({ control }) as OrderData;
  const products = formValues.products || [];
  const discountRateStr = formValues.discountRate || 0;
  const discountRate = typeof discountRateStr === 'string' ? parseFloat(discountRateStr) || 0 : discountRateStr;

  const subtotal = products.reduce((sum, p) => {
    const price = (typeof p.unitPrice === 'string' ? parseFloat(p.unitPrice) : p.unitPrice) || 0;
    const unpack = (typeof p.unpackingServiceCost === 'string' ? parseFloat(p.unpackingServiceCost) : p.unpackingServiceCost) || 0;
    const assembly = (typeof p.assemblyServiceCost === 'string' ? parseFloat(p.assemblyServiceCost) : p.assemblyServiceCost) || 0;
    const qty = (typeof p.quantity === 'string' ? parseInt(p.quantity, 10) : p.quantity) || 1;
    return sum + (price + unpack + assembly) * qty;
  }, 0);

  const discountAmount = Math.floor(subtotal * (discountRate / 100));
  const totalAmount = subtotal - discountAmount;

  const formatCurrency = (num: number) => `¥${num.toLocaleString()}`;

  return (
    <div className="form-section card staff-bg">
      <div className="section-header">
        <h2 className="t-h2 section-title">購入商品（スタッフ入力）</h2>
        <span className="badge-staff t-caption">Staff Only</span>
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="t-label-bold">担当スタッフ名 <span className="badge-required">必須</span></label>
        <input 
          type="text" 
          placeholder="山田 太郎" 
          {...register('staffName', { required: 'スタッフ名は必須です' })} 
        />
      </div>
      
      {fields.map((field, index) => (
        <div key={field.id} className="product-row" style={{ flexDirection: 'column', padding: '16px', marginBottom: '16px', backgroundColor: 'var(--white)', border: '1px solid var(--border-2)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="t-h3" style={{ margin: 0 }}>商品 {index + 1}</h3>
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="btn-icon btn-remove" aria-label="削除">
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">SKU <span className="badge-required">必須</span></label>
              <input type="text" placeholder="CG-C01" {...register(`products.${index}.sku` as const, { required: 'SKUは必須です' })} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">商品名 <span className="badge-optional" style={{ fontSize: '12px', color: 'var(--fg-3)', fontWeight: 'normal', marginLeft: '4px' }}>任意</span></label>
              <input type="text" placeholder="デスクチェア" {...register(`products.${index}.productName` as const)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">バリエーション情報 <span className="badge-optional" style={{ fontSize: '12px', color: 'var(--fg-3)', fontWeight: 'normal', marginLeft: '4px' }}>任意</span></label>
              <input type="text" placeholder="カラー: ブラック / サイズ: M" {...register(`products.${index}.variation` as const)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">単価 (円) <span className="badge-required">必須</span></label>
              <input type="number" min="0" placeholder="15000" {...register(`products.${index}.unitPrice` as const, { required: '必須', valueAsNumber: true })} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">数量 <span className="badge-required">必須</span></label>
              <input type="number" min="1" {...register(`products.${index}.quantity` as const, { required: '必須', valueAsNumber: true, min: 1 })} />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">開梱サービス費用 (円)</label>
              <input type="number" min="0" placeholder="0" {...register(`products.${index}.unpackingServiceCost` as const, { valueAsNumber: true })} />
              <p className="t-caption" style={{ color: 'var(--fg-3)', marginTop: '4px' }}>※不要な場合は空欄または0</p>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">組み立てサービス費用 (円)</label>
              <input type="number" min="0" placeholder="0" {...register(`products.${index}.assemblyServiceCost` as const, { valueAsNumber: true })} />
              <p className="t-caption" style={{ color: 'var(--fg-3)', marginTop: '4px' }}>※不要な場合は空欄または0</p>
            </div>
          </div>
        </div>
      ))}
      
      <button 
        type="button" 
        onClick={() => append({ sku: '', productName: '', variation: '', unitPrice: 0, quantity: 1, unpackingServiceCost: 0, assemblyServiceCost: 0 })} 
        className="btn-line"
        style={{ marginBottom: '24px' }}
      >
        <Plus size={18} className="mr-2" />
        商品をさらに追加する
      </button>

      <div className="form-group" style={{ marginBottom: '24px', maxWidth: '200px' }}>
        <label className="t-label-bold">割引率 (%) <span className="badge-required">必須</span></label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="number" 
            min="0" 
            max="100" 
            placeholder="10" 
            {...register('discountRate', { required: '必須', valueAsNumber: true, min: 0, max: 100 })} 
          />
          <span className="t-body">%</span>
        </div>
      </div>

      <div style={{ padding: '16px', backgroundColor: 'var(--white)', border: '1px solid var(--border-2)', borderRadius: 'var(--radius-md)' }}>
        <h3 className="t-h3" style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-1)', paddingBottom: '8px' }}>金額サマリー（自動計算）</h3>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px 16px', fontSize: 'var(--fs-16)' }}>
          <dt style={{ color: 'var(--fg-2)' }}>小計</dt>
          <dd style={{ margin: 0, textAlign: 'right' }}>{formatCurrency(subtotal)}</dd>
          
          <dt style={{ color: 'var(--fg-2)' }}>割引額 ({discountRate}%)</dt>
          <dd style={{ margin: 0, textAlign: 'right', color: 'var(--sale-red)' }}>-{formatCurrency(discountAmount)}</dd>
          
          <div style={{ gridColumn: '1 / -1', height: '1px', backgroundColor: 'var(--border-2)', margin: '4px 0' }}></div>
          
          <dt className="t-label-bold" style={{ fontSize: 'var(--fs-18)' }}>決済金額</dt>
          <dd className="t-label-bold" style={{ margin: 0, textAlign: 'right', fontSize: 'var(--fs-20)', color: 'var(--brand-700)' }}>{formatCurrency(totalAmount)}</dd>
        </dl>
      </div>

    </div>
  );
};
