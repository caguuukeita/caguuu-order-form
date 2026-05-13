import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CustomerForm } from './components/CustomerForm';
import { StaffForm } from './components/StaffForm';
import { ConfirmScreen } from './components/ConfirmScreen';
import { submitOrder } from './api/webhook';
import type { OrderData } from './api/webhook';
import './App.css';

const Wordmark = () => <div className="t-wordmark" style={{ textAlign: 'center', marginBottom: '32px', marginTop: '16px' }}>CAGUUU</div>;

function App() {
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, control, setValue, getValues, formState: { errors }, reset } = useForm<OrderData>({
    defaultValues: {
      customer: {
        name: '',
        phone: '',
        email: '',
        zipCode: '',
        prefecture: '',
        address1: '',
        address2: ''
      },
      products: [{ sku: '', quantity: 1, unpackingService: false, assemblyService: false }],
      staffNote: ''
    }
  });

  // フォームのバリデーションが通ったら確認画面へ
  const onToConfirm = () => {
    setStep('confirm');
    window.scrollTo(0, 0);
  };

  // 確認画面からの最終送信
  const onFinalSubmit: SubmitHandler<OrderData> = async (data) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await submitOrder(data);
      setStep('success');
      reset();
      window.scrollTo(0, 0);
    } catch (error: any) {
      setErrorMsg(error.message || '送信中にエラーが発生しました');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="app-container">
        <Wordmark />
        <div className="card success-screen">
          <CheckCircle2 size={64} className="success-icon mx-auto" style={{ margin: '0 auto', display: 'block' }} />
          <h2 className="t-h2 success-title">ご注文の登録が完了しました</h2>
          <p className="t-body success-desc">スタッフが内容を確認いたします。</p>
          <button 
            onClick={() => setStep('input')}
            className="btn-primary"
            style={{ maxWidth: '300px', margin: '0 auto', display: 'block' }}
          >
            新しく入力を始める
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Wordmark />
      
      {step === 'input' && (
        <form onSubmit={handleSubmit(onToConfirm)}>
          <CustomerForm register={register as any} setValue={setValue as any} errors={errors as any} />
          
          <StaffForm register={register as any} control={control as any} />

          <div style={{ marginTop: '32px' }}>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              確認画面へ進む
              <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </form>
      )}

      {step === 'confirm' && (
        <form onSubmit={handleSubmit(onFinalSubmit)}>
          <ConfirmScreen 
            data={getValues()} 
            register={register as any} 
            onBack={() => { setStep('input'); window.scrollTo(0, 0); }} 
            isSubmitting={isSubmitting} 
          />

          {errorMsg && (
            <div className="card" style={{ backgroundColor: 'var(--sale-red-soft)', borderColor: 'var(--sale-red)', marginTop: '16px' }}>
              <p className="t-body" style={{ color: 'var(--sale-red-strong)', margin: 0 }}>
                {errorMsg}
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default App;
