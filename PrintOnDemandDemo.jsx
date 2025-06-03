import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export default function PrintOnDemandDemo() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState("tshirt");
  const [size, setSize] = useState("M");
  const [price, setPrice] = useState(249);
  const [processing, setProcessing] = useState(false);

  const basePrices = {
    tshirt: 249,
    hoodie: 399,
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    setProduct(value);
    setPrice(basePrices[value]);
  };

  const handleSubmit = async () => {
    setProcessing(true);
    // Här skulle du normalt anropa Stripe och Printful API:n
    setTimeout(() => {
      alert(`Beställning: ${product} (${size}) för ${price} kr. Bild bifogad.`);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Ladda upp din design</h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <div>
            <Label htmlFor="image">Välj bild</Label>
            <Input type="file" id="image" accept="image/*" onChange={handleImageUpload} />
            {preview && (
              <div className="mt-4">
                <p className="mb-2 font-semibold">Förhandsvisning:</p>
                <div className="border p-4 inline-block">
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <img src={preview} alt="Preview" className="max-w-full max-h-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="product">Välj produkt</Label>
            <select id="product" value={product} onChange={handleProductChange} className="w-full p-2 border rounded">
              <option value="tshirt">T-shirt</option>
              <option value="hoodie">Hoodie</option>
            </select>
          </div>

          <div>
            <Label htmlFor="size">Storlek</Label>
            <select id="size" value={size} onChange={(e) => setSize(e.target.value)} className="w-full p-2 border rounded">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className="text-lg font-semibold">
            Pris: {price} kr
          </div>

          <Button onClick={handleSubmit} className="w-full mt-4" disabled={processing}>
            <Upload className="mr-2 h-4 w-4" />
            {processing ? "Bearbetar..." : "Beställ (demo)"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
