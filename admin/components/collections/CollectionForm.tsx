"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pacifico } from "next/font/google";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import Delete from "../custom ui/Delete";
import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CollectionType } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(500).trim().optional(),
  image: z.string(),
  products: z.array(z.string()),
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

interface CollectionFormProps {
  initalData?: CollectionType | null;
}
const CollectionForm: React.FC<CollectionFormProps> = ({ initalData }) => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("[products_GET]", err);
      }
    };
    getProducts();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initalData?.title || "",
      description: initalData?.description || "",
      image: initalData?.image || "",
      products: initalData?.products || [],
    },
  });
  const handlekeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = initalData ? `/api/collections/${initalData._id}` : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error(`Failed to ${initalData ? "update" : "create"} collection`);
      }
      const data = await res.json();
      console.log("Collection created:", data);
      form.reset();
      toast.success(`Collection ${initalData ? "updated" : "created"} successfully`);
      window.location.href = `/collections`;
      // router.push("/collections");
    } catch (err) {
      toast.error(`Failed to ${initalData ? "update" : "create"} collection. Please try again.`);
      console.log("[collection_POST]", err);
    }
  };

  return (
    <div className="p-10">
      {initalData ? (
        <div className="flex justify-between items-center">
          <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Edit Collection</p>
          <Delete id={initalData._id} type="collection" />
        </div>
      ) : (<p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>
        Create Your Collections
      </p>)}

      <p className="text-body-medium text-grey-1 mb-6">
        Collections help your customers find exactly what they're looking for —
        whether it's seasonal items, promotions, or specific categories.
      </p>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title*</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} onKeyDown={handlekeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={5} onKeyDown={handlekeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image*</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Products</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (!field.value.includes(value)) {
                      field.onChange([...field.value, value]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select products" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product: any) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((productId) => {
                    const product = products.find((p: any) => p.id === productId);
                    return (
                      <div
                        key={productId}
                        className="bg-purple-2 text-white px-2 py-1 rounded-md flex items-center gap-1"
                      >
                        {product?.title}
                        <button
                          type="button"
                          onClick={() =>
                            field.onChange(
                              field.value.filter((id) => id !== productId)
                            )
                          }
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit" className="bg-purple-2 text-white mr-10">
            {initalData ? "Update Collection" : "Create Collection"}
          </Button>
          <Button type="button" className="bg-red-500 text-white ml-10 " onClick={() => router.push("/collections")}>
            Discard
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
