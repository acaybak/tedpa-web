"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { createProduct, deleteProduct, updateProduct } from "@/actions/product-actions";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  slug: string;
  code: string | null;
  isActive: boolean;
  isFeatured: boolean;
  category: { id: string; name: string } | null;
  media: { url: string }[];
}

interface Category {
  id: string;
  name: string;
}

export function ProductsClient({
  products,
  categories,
  currentSearch,
  currentPage,
}: {
  products: { data: Product[]; total: number; totalPages: number };
  categories: Category[];
  currentSearch: string;
  currentPage: number;
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditingProduct(null);
    setName(""); setCode(""); setDescription(""); setCategoryId("");
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setCode(product.code || "");
    setDescription(product.slug);
    setCategoryId(product.category?.id || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    if (editingProduct) {
      await updateProduct(editingProduct.id, { name, code, description, categoryId: categoryId || null });
    } else {
      await createProduct({ name, code, description, categoryId: categoryId || null });
    }
    setSaving(false);
    setDialogOpen(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await deleteProduct(id);
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#101114]">Ürünler</h1>
          <p className="text-[#737B86] text-sm">{products.total} ürün</p>
        </div>
        <Button onClick={openCreate} className="bg-[#E30613] hover:bg-[#c00511] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ürün
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <form action="/admin/products" method="GET" className="flex gap-2">
            <div className="relative flex-1">
              <Input name="search" placeholder="Ürün adı veya kodu ile ara..." defaultValue={currentSearch} className="pl-9" />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="submit" variant="outline" size="sm">Ara</Button>
          </form>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          {products.data.length === 0 ? (
            <div className="p-8 text-center text-[#737B86]">
              Henüz ürün bulunmamaktadır. &quot;Yeni Ürün&quot; butonuyla ekleyin.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Ürün</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Kod</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Kategori</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">Durum</th>
                    <th className="text-left text-xs font-medium text-[#737B86] px-4 py-3">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {products.data.map((product: Product) => (
                    <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#F4F5F7] rounded flex items-center justify-center shrink-0">
                            {product.media.length > 0 ? (
                              <img src={product.media[0].url} alt={product.name} className="w-full h-full object-cover rounded" />
                            ) : (
                              <span className="text-xs text-[#737B86]">—</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#101114]">{product.name}</p>
                            <p className="text-xs text-[#737B86]">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-[#737B86]">{product.code || "—"}</td>
                      <td className="px-4 py-3 text-sm">{product.category?.name || "—"}</td>
                      <td className="px-4 py-3">
                        <Badge variant={product.isActive ? "default" : "secondary"} className={product.isActive ? "bg-green-100 text-green-700" : ""}>
                          {product.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Ürün Düzenle" : "Yeni Ürün"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Ürün Adı *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ürün adı" />
            </div>
            <div>
              <Label>Ürün Kodu</Label>
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ürün kodu" />
            </div>
            <div>
              <Label>Kategori</Label>
              <Select value={categoryId} onValueChange={(v: string | null) => v && setCategoryId(v)}>
                <SelectTrigger><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                <SelectContent>
                  {categories.map((cat: Category) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Açıklama</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-[#E30613] hover:bg-[#c00511] text-white">
              {saving ? "Kaydediliyor..." : editingProduct ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
