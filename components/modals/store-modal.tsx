'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "../ui/modal"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1),

})

export const StoreModal = () => {

    const storeModal = useStoreModal()
    const [loading, setLoading] = useState(false)

    const { isOpen, onClose } = storeModal

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/stores', values)
            window.location.assign(`/${response?.data?.id}`)
            form.reset()
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="e-commerce"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button
                                disabled={loading}
                                variant='outline'
                                onClick={storeModal.onClose}
                            >
                                Cancel

                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                            >
                                Continue

                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}