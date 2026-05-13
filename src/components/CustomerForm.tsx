import React from 'react';
import type { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';

interface CustomerFormProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

export const CustomerForm: React.FC<CustomerFormProps> = ({ register, setValue, errors }) => {
  const errs: any = errors;
  
  const toHalfWidth = (str: string) => {
    return str.replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)).replace(/[^0-9-]/g, '');
  };

  const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = toHalfWidth(e.target.value).replace(/-/g, '');
    setValue('customer.zipCode', value);

    if (value.length === 7) {
      try {
        const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value}`);
        const data = await response.json();
        if (data.status === 200 && data.results) {
          const result = data.results[0];
          setValue('customer.prefecture', result.address1);
          setValue('customer.address1', result.address2 + result.address3);
        }
      } catch (err) {
        console.error('Zipcode lookup failed', err);
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('customer.phone', toHalfWidth(e.target.value));
  };

  return (
    <div className="form-section card">
      <h2 className="t-h2 section-title">お客様情報（配送先）</h2>
      
      <div className="form-group">
        <label className="t-label">氏名 <span className="badge-required">必須</span></label>
        <input 
          type="text" 
          placeholder="家具 太郎" 
          {...register('customer.name', { required: '氏名は必須です' })} 
          className={errs.customer?.name ? 'input-error' : ''}
        />
        {errs.customer?.name && <p className="error-text t-caption">{errs.customer.name.message as string}</p>}
      </div>

      <div className="form-group">
        <label className="t-label">電話番号 <span className="badge-required">必須</span></label>
        <input 
          type="tel" 
          placeholder="09012345678" 
          {...register('customer.phone', { required: '電話番号は必須です' })} 
          onChange={handlePhoneChange}
          className={errs.customer?.phone ? 'input-error' : ''}
        />
        {errs.customer?.phone && <p className="error-text t-caption">{errs.customer.phone.message as string}</p>}
      </div>

      <div className="form-group">
        <label className="t-label">メールアドレス <span className="badge-required">必須</span></label>
        <input 
          type="email" 
          placeholder="mail@example.com" 
          {...register('customer.email', { 
            required: 'メールアドレスは必須です',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "正しいメールアドレスを入力してください"
            }
          })} 
          className={errs.customer?.email ? 'input-error' : ''}
        />
        {errs.customer?.email && <p className="error-text t-caption">{errs.customer.email.message as string}</p>}
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-2)' }}>
          <label className="t-label" style={{ marginBottom: 0 }}>郵便番号 <span className="badge-required">必須</span></label>
          <a href="https://www.post.japanpost.jp/service/search/zipcode/" target="_blank" rel="noopener noreferrer" className="t-caption" style={{ color: 'var(--info-blue)', textDecoration: 'underline' }}>郵便番号検索 | 日本郵便株式会社</a>
        </div>
        <input 
          type="text" 
          placeholder="1000001 (ハイフンなし)" 
          maxLength={8}
          {...register('customer.zipCode', { required: '郵便番号は必須です', minLength: { value: 7, message: '7桁で入力してください' } })} 
          onChange={handleZipCodeChange}
          className={errs.customer?.zipCode ? 'input-error' : ''}
        />
        {errs.customer?.zipCode && <p className="error-text t-caption">{errs.customer.zipCode.message as string}</p>}
      </div>

      <div className="form-group">
        <label className="t-label">都道府県 <span className="badge-required">必須</span></label>
        <select
          {...register('customer.prefecture', { required: '都道府県は必須です' })}
          className={errs.customer?.prefecture ? 'input-error' : ''}
          style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-2)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-16)', backgroundColor: 'var(--white)', color: 'var(--fg-1)' }}
        >
          <option value="">選択してください</option>
          {PREFECTURES.map(pref => (
            <option key={pref} value={pref}>{pref}</option>
          ))}
        </select>
        {errs.customer?.prefecture && <p className="error-text t-caption">{errs.customer.prefecture.message as string}</p>}
      </div>

      <div className="form-group">
        <label className="t-label">市区町村・番地 <span className="badge-required">必須</span></label>
        <input 
          type="text" 
          placeholder="千代田区千代田1-1" 
          {...register('customer.address1', { required: '市区町村・番地は必須です' })} 
          className={errs.customer?.address1 ? 'input-error' : ''}
        />
        {errs.customer?.address1 && <p className="error-text t-caption">{errs.customer.address1.message as string}</p>}
      </div>

      <div className="form-group">
        <label className="t-label">建物名・部屋番号</label>
        <input 
          type="text" 
          placeholder="CAGUUUビル 101" 
          {...register('customer.address2')} 
        />
      </div>
    </div>
  );
};
