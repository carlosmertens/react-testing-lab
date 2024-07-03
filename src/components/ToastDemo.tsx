import toast from 'react-hot-toast';

export function ToastDemo() {
  return (
    <button className='btn' onClick={() => toast.success('Success')}>
      Show Toast
    </button>
  );
}
