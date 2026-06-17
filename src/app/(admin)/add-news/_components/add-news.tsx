"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { ImageUploadIcon, CheckmarkCircle01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { createClient } from "@/lib/supabase/client";

export default function AddNews() {
  // 1. Siapkan "Kotak Penyimpanan" (State) untuk data kategori
  const [kategoriList, setKategoriList] = useState<{ id: string | number; nama_kategori: string }[]>([]);

  // Panggil satpam/koneksi Supabase
  const supabase = createClient();

  // 2. Fungsi untuk mengambil data dari Supabase secara otomatis saat halaman dibuka
  useEffect(() => {
    const ambilDataKategori = async () => {
      // "Hai Supabase, tolong ambilkan id dan nama_kategori dari tabel kategori"
      const { data, error } = await supabase
        .from('kategori')
        .select('id, nama_kategori');

      if (error) {
        console.error("Gagal mengambil kategori:", error);
      } else if (data) {
        // Masukkan data dari database ke "Kotak Penyimpanan" kita
        setKategoriList(data);
      }
    };

    ambilDataKategori();
  }, []); // Kurung siku kosong artinya: "Jalankan fungsi ini SEKALI SAJA saat halaman pertama kali diload"
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Logika upload bisa ditambahkan di sini
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">

      {/* HEADER STANDAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add News</h1>
          <p className="text-sm text-muted-foreground">
            Create a new article or news to be published.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button>
            <HugeiconsIcon icon={CheckmarkCircle01Icon} strokeWidth={2} className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Provide the basic information for the news article.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter news title" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder="John Doe" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Category</Label>

                  {/* Nantinya value yang disimpan adalah ID kategori (angka), bukan teksnya */}
                  <Select onValueChange={(value) => console.log("Kategori ID yang dipilih:", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>

                        {/* 3. Di sinilah sihirnya terjadi! Kita gunakan .map() untuk melooping (mengulang) baris data */}
                        {kategoriList.map((kat) => (
                          <SelectItem key={kat.id} value={kat.id.toString()}>
                            {kat.nama_kategori}
                          </SelectItem>
                        ))}

                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>
                Add keywords to help users find this article.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tags">Tags (Comma separated)</Label>
                <Input id="tags" placeholder="e.g. Update, Teknologi, Event" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
              <CardDescription>
                Upload an image for the news thumbnail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <HugeiconsIcon
                    icon={ImageUploadIcon}
                    strokeWidth={1.5}
                    className="mx-auto h-12 w-12 text-muted-foreground/50"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}