'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FileUpload from '@/components/FileUpload'

// 创建表单结构
const formSchema = z.object({
  name: z.string().min(1, {
    message: '请输入Server名称'
  }),
  imageUrl: z.string().min(1, {
    message: '请上传Server头像'
  })
})

const InitialModal = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  })
  const [isMounted, setIsMounted] = useState(false)

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('values', values)
    try {
      await axios.post('/api/servers', values)

      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px] bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">创建你的 Server </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            请给你的 Server 创建名称和头像，这些信息可以在稍后进行修改。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="text-black">
                          <FileUpload endpoint="messageFile" onChange={field.onChange} value={field.value} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="请输入..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-grey-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary" type="submit">
                创建
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default InitialModal
