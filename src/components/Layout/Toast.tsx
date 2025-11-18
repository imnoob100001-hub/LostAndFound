import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Toast = ({ message, type }: ToastProps) => {
  const styles = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  return (
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-l-4 shadow-lg ${styles[type]} animate-slide-in`}
    >
      {icons[type]}
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast;
