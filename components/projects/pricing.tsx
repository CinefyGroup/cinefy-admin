"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export function Pricing() {
  const form = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing & Units</CardTitle>
        <CardDescription>Enter pricing and unit information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="priceFrom">Price From</Label>
            <Input 
              id="priceFrom" 
              placeholder="Enter starting price" 
              type="number"
              {...form.register("priceFrom", { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priceTo">Price To</Label>
            <Input 
              id="priceTo" 
              placeholder="Enter maximum price" 
              type="number"
              {...form.register("priceTo", { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pricePerSqft">Price Per Sq.Ft.</Label>
            <Input
              id="pricePerSqft"
              placeholder="Enter price per square foot"
              type="number"
              {...form.register("pricePerSqft", { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={form.watch("currency")}
              onValueChange={(value) => form.setValue("currency", value)}
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="inr">INR (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Unit Types</Label>
          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
              <div className="space-y-2">
                <Label htmlFor="unitType">Type</Label>
                <Input
                  id="unitType"
                  placeholder="e.g., 1BHK, Studio"
                  {...form.register("unitTypes.0.type")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitArea">Area (sq.ft.)</Label>
                <Input 
                  id="unitArea" 
                  placeholder="Area" 
                  type="number"
                  {...form.register("unitTypes.0.area", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitPrice">Price</Label>
                <Input 
                  id="unitPrice" 
                  placeholder="Price" 
                  type="number"
                  {...form.register("unitTypes.0.price", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitCount">Total Units</Label>
                <Input 
                  id="unitCount" 
                  placeholder="Count" 
                  type="number"
                  {...form.register("unitTypes.0.count", { valueAsNumber: true })}
                />
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const currentUnits = form.getValues("unitTypes") || [];
                form.setValue("unitTypes", [...currentUnits, {
                  type: "",
                  area: 0,
                  price: 0,
                  count: 0
                }]);
              }}
            >
              + Add Unit Type
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="totalUnits">Total Units</Label>
            <Input
              id="totalUnits"
              placeholder="Enter total number of units"
              type="number"
              {...form.register("totalUnits", { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableUnits">Available Units</Label>
            <Input
              id="availableUnits"
              placeholder="Enter available units"
              type="number"
              {...form.register("availableUnits", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentPlan">Payment Plan</Label>
          <Textarea
            id="paymentPlan"
            placeholder="Enter payment plan details"
            className="min-h-[100px]"
            {...form.register("paymentPlan")}
          />
        </div>
      </CardContent>
    </Card>
  );
} 