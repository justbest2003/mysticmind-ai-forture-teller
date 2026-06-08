import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Sparkles, Loader2, User, Calendar, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

const fortuneSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ').max(100, 'ชื่อยาวเกินไป'),
  dateOfBirth: z.string().min(1, 'กรุณาเลือกวันเกิด'),
  question: z.string().min(5, 'กรุณากรอกคำถามอย่างน้อย 5 ตัวอักษร').max(500, 'คำถามยาวเกินไป'),
})

export function FortuneForm({ onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fortuneSchema),
    defaultValues: {
      name: '',
      dateOfBirth: '',
      question: '',
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="max-w-2xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2"><User className="w-4 h-4" /> ชื่อ - นามสกุล</Label>
              <Input
                id="name"
                placeholder="กรุณากรอกชื่อของคุณ"
                {...register('name')}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="flex items-center gap-2"><Calendar className="w-4 h-4" /> วันเกิด</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth')}
                disabled={isLoading}
                className="[color-scheme:dark]"
              />
              {errors.dateOfBirth && (
                <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* Question */}
            <div className="space-y-2">
              <Label htmlFor="question" className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> คำถามดูดวง</Label>
              <Textarea
                id="question"
                placeholder="เช่น อยากรู้ดวงการงานช่วงนี้เป็นอย่างไร, ดวงความรักปีนี้จะดีไหม..."
                rows={4}
                {...register('question')}
                disabled={isLoading}
              />
              {errors.question && (
                <p className="text-red-400 text-xs mt-1">{errors.question.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  กำลังทำนาย...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  ดูดวง
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
