"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pacifico } from "next/font/google";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

const categories = [
    "Tops",
    "Bottoms",
    "Dresses",
    "Activewear",
    "Outerwear",
    "Underwear",
    "Sleepwear"
];

const sizes = ["XS", "S", "M", "L", "XL"];

const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(50).trim(),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1)
});

const pacifico = Pacifico({
    weight: "400",
    subsets: ["latin"],
});

const ProductForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            media: [],
            category: "",
            collections: [],
            tags: [],
            sizes: [],
            price: 0,
            expense: 0
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values);
            console.log(values.media);
            const res = await fetch("/api/products", {
                method: "POST",
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            const data = await res.json();
            console.log("Product created:", data);

            // 清空表单
            form.reset({
                title: "",
                description: "",
                media: [],
                category: "",
                collections: [],
                tags: [],
                sizes: [],
                price: 0,
                expense: 0
            });
        } catch (err) {
            console.log("[product_POST]", err);
        }
    };

    return (
        <div className="p-10">
            <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Create Product</p>
            <p className="text-body-medium text-grey-1 mb-6 ">
                Create a new product to start selling
            </p>
            <Separator className="bg-grey-1 mt-4 mb-7" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} rows={2} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <div className="grid grid-cols-4 gap-4">
                                        <ImageUpload
                                            value={field.value}
                                            onChange={(url) => field.onChange([...field.value, url])}
                                            onRemove={(url) => field.onChange([...field.value.filter((current) => current !== url)])} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="collections"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Collections</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Collections (comma separated)"
                                            value={field.value.join(", ")}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                field.onChange(value.split(",").map(item => item.trim()).filter(Boolean));
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter collections separated by commas
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Press Enter to add a tag"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const input = e.target as HTMLInputElement;
                                                    const value = input.value.trim();
                                                    if (value && !field.value.includes(value)) {
                                                        field.onChange([...field.value, value]);
                                                        input.value = '';
                                                    }
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {field.value.map((tag) => (
                                            <div
                                                key={tag}
                                                className="bg-purple-2 text-white px-2 py-1 rounded-md flex items-center gap-1"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => field.onChange(field.value.filter(t => t !== tag))}
                                                    className="hover:text-red-500"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <FormDescription>
                                        Press Enter to add a tag
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sizes</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            const currentSizes = field.value;
                                            if (currentSizes.includes(value)) {
                                                field.onChange(currentSizes.filter(size => size !== value));
                                            } else {
                                                field.onChange([...currentSizes, value]);
                                            }
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select sizes" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sizes.map((size) => (
                                                <SelectItem key={size} value={size}>
                                                    {size}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {field.value.map((size) => (
                                            <div
                                                key={size}
                                                className="bg-purple-2 text-white px-2 py-1 rounded-md flex items-center gap-1"
                                            >
                                                {size}
                                                <button
                                                    type="button"
                                                    onClick={() => field.onChange(field.value.filter(s => s !== size))}
                                                    className="hover:text-red-500"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <FormDescription>
                                        Select available sizes for this product
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Product Price"
                                                step="0.01"
                                                min="0.1"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="expense"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cost</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Product Cost"
                                                step="0.01"
                                                min="0.1"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="bg-purple-2 text-white">
                        Create Product
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ProductForm;
