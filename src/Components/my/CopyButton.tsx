import  { useState } from 'react';

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      // Restaurar estado después de unos segundos
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        className="border border-gray-300 rounded px-2 py-1 w-full"
        type="text"
        value={textToCopy}
        readOnly
      />
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
      >
        {isCopied ? 'Copiado!' : 'Copiar'}
      </button>
    </div>
  );
};

export default CopyButton