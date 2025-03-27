import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative group">
            <div className="relative aspect-square">
              <Image
                src={url}
                alt="product"
                className="object-cover rounded-lg"
                width={200}
                height={200}
              />
            </div>
            <button
              onClick={() => onRemove(url)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="eshop_product" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button onClick={() => open()} className='bg-purple-2 text-white rounded-sm'>
              <Plus className='h-4 w-4 mr-2' />Upload Images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  )
};

export default ImageUpload;
