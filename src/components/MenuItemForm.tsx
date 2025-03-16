
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuItem } from "@/types/baker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const menuItemSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().min(5, { message: "Description is required" }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0" }),
  category: z.string().min(2, { message: "Category is required" }),
});

interface MenuItemFormProps {
  onAddItem: (item: MenuItem) => void;
}

export const MenuItemForm = ({ onAddItem }: MenuItemFormProps) => {
  const [isAdding, setIsAdding] = useState(false);
  
  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof menuItemSchema>) => {
    onAddItem({
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
    });
    
    form.reset();
    setIsAdding(false);
  };
  
  return isAdding ? (
    <div className="border rounded-md p-4 bg-gray-50">
      <h4 className="text-md font-medium mb-4">Add Menu Item</h4>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chocolate Cake" {...field} />
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
                  <FormControl>
                    <Input placeholder="Cakes, Cupcakes, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
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
                    <Input placeholder="Delicious chocolate cake..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </Form>
    </div>
  ) : (
    <Button onClick={() => setIsAdding(true)}>Add Menu Item</Button>
  );
};
