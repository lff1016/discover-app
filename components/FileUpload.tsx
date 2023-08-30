'use client'
import { UploadDropzone } from '@/lib/uploadthing'
import { X, FileType } from 'lucide-react'
import Image from 'next/image'
import "@uploadthing/react/styles.css"

interface FileUploadProps {
  value?: string
  onChange?: (url?: string) => void
  endpoint: 'serverImage' | 'messageFile'
}

const FileUpload = ({ value, onChange, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop()?.toLowerCase()
  // 图片
  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image src={value} alt="Upload" fill className="rounded-full" />
        <button
          onClick={() => onChange?.('')}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4"/>
        </button>
      </div>
    )
  }

  // 文件
  if (value && fileType === 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <FileType className='h-10 w-10 fill-indigo-200 stroke-indigo-400'/>
        <a href={value} target='_blank' className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'>
          {value}
        </a>
        <button
          onClick={() => onChange?.('')}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={res => {
        onChange?.(res?.[0]?.url)
      }}
      onUploadError={err => {
        console.log('upload error', err)
      }}
    />
  )
}

export default FileUpload
