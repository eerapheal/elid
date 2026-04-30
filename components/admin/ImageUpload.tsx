'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (url: string) => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove
}: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange([...value, result.info.secure_url]);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[150px] h-[150px] rounded-2xl overflow-hidden border border-white/20 glass">
            <div className="z-10 absolute top-2 right-2">
              <Button 
                type="button" 
                onClick={() => onRemove(url)} 
                variant="destructive" 
                size="icon"
                className="rounded-full w-6 h-6"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="elid_preset">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={false}
              variant="secondary"
              onClick={onClick}
              className="w-full h-24 border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 rounded-[32px] flex flex-col gap-2 transition-all"
            >
              <ImagePlus className="h-6 w-6 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Upload Image</span>
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
