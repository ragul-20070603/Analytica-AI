
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, PlusCircle, Trash2 } from 'lucide-react';

export default function CleaningPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Data Cleaning & Validation</h1>
        <p className="text-muted-foreground">Configure and apply cleaning steps to your dataset.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Set up the cleaning and validation pipeline for your data. Each step will be executed in order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">Schema Mapping</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-muted-foreground">
                  Map your source columns to the desired schema, or load a configuration from JSON.
                </p>
                <div className="flex items-center justify-end">
                    <Button variant="outline">Load from JSON</Button>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg">
                    <div className="space-y-2">
                        <Label>Source Field</Label>
                        <Input value="customer_id" readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label>Target Field</Label>
                        <Input placeholder="e.g., userID" />
                    </div>
                     <div className="space-y-2">
                        <Input value="transaction_date" readOnly />
                    </div>
                    <div className="space-y-2">
                        <Input placeholder="e.g., purchaseDate" />
                    </div>
                 </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">Cleaning Modules</AccordionTrigger>
              <AccordionContent className="space-y-6">
                {/* Missing Value Imputation */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Missing-Value Imputation</h3>
                     <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <AlertCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Handle rows with missing data.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                     <div className="space-y-2">
                        <Label>Column</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a column" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="age">Age</SelectItem>
                                <SelectItem value="income">Income</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label>Method</Label>
                         <RadioGroup defaultValue="mean" className="flex items-center gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="mean" id="mean" /><Label htmlFor="mean">Mean</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="median" id="median" /><Label htmlFor="median">Median</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="knn" id="knn" /><Label htmlFor="knn">KNN</Label></div>
                        </RadioGroup>
                     </div>
                  </div>
                </div>
                {/* Outlier Detection */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Outlier Detection</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                     <div className="space-y-2">
                        <Label>Column</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a column" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="revenue">Revenue</SelectItem>
                                <SelectItem value="quantity">Quantity</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label>Method</Label>
                         <RadioGroup defaultValue="iqr" className="flex items-center gap-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="iqr" id="iqr" /><Label htmlFor="iqr">IQR</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="z-score" id="z-score" /><Label htmlFor="z-score">Z-Score</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="winsorization" id="winsorization" /><Label htmlFor="winsorization">Winsorization</Label></div>
                        </RadioGroup>
                     </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">Rule-Based Validation</AccordionTrigger>
              <AccordionContent className="space-y-4">
                 <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Validation Rules</h3>
                    <Button variant="ghost" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Rule</Button>
                  </div>
                  <div className="space-y-4">
                    {/* Rule 1 */}
                    <div className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                             <Select defaultValue="consistency">
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="consistency">Consistency Check</SelectItem>
                                    <SelectItem value="skip-pattern">Skip Pattern</SelectItem>
                                    <SelectItem value="custom">Custom Rule</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input placeholder="e.g., 'age' > 18" />
                            <Input placeholder="Error message: Age must be over 18" />
                        </div>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                     {/* Rule 2 */}
                    <div className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                             <Select defaultValue="skip-pattern">
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="consistency">Consistency Check</SelectItem>
                                    <SelectItem value="skip-pattern">Skip Pattern</SelectItem>
                                    <SelectItem value="custom">Custom Rule</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input placeholder="IF 'employed' == false THEN 'income' IS NULL" />
                            <Input placeholder="Error message: Income should be null for unemployed" />
                        </div>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                 </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
           <div className="mt-8 flex justify-end">
            <Button size="lg">Apply Cleaning & Validate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
