import React from 'react';
import type { UseFormRegister, Control } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

interface StaffFormProps {
  register: UseFormRegister<any>;
  control: Control<any>;
}

export const StaffForm: React.FC<StaffFormProps> = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  return (
    <div className="form-section card staff-bg">
      <div className="section-header">
        <h2 className="t-h2 section-title">購入商品（スタッフ入力）</h2>
        <span className="badge-staff t-caption">Staff Only</span>
      </div>
      
      {fields.map((field, index) => (
        <div key={field.id} className="product-row" style={{ flexDirection: 'column', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px dashed var(--border-2)' }}>
          <div style={{ display: 'flex', gap: '12px', width: '100%', alignItems: 'flex-start' }}>
            <div className="form-group flex-1" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">SKU <span className="badge-required">必須</span></label>
              <input 
                type="text" 
                placeholder="CG-C01-GR" 
                {...register(`products.${index}.sku`, { required: 'SKUは必須です' })} 
              />
            </div>
            <div className="form-group w-24" style={{ marginBottom: 0 }}>
              <label className="t-label-bold">数量 <span className="badge-required">必須</span></label>
              <input 
                type="number" 
                min="1"
                {...register(`products.${index}.quantity`, { required: '必須', valueAsNumber: true, min: 1 })} 
              />
            </div>
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="btn-icon btn-remove" aria-label="削除" style={{ marginTop: '26px' }}>
                <Trash2 size={20} />
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
            <label className="t-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', margin: 0 }} {...register(`products.${index}.unpackingService`)} />
              開梱サービス
            </label>
            <label className="t-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', margin: 0 }} {...register(`products.${index}.assemblyService`)} />
              組み立てサービス
            </label>
          </div>
        </div>
      ))}
      
      <button 
        type="button" 
        onClick={() => append({ sku: '', quantity: 1, unpackingService: false, assemblyService: false })} 
        className="btn-line mt-4"
      >
        <Plus size={18} className="mr-2" />
        商品を追加する
      </button>
    </div>
  );
};
