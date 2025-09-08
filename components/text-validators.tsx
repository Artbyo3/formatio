"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  FileText
} from "lucide-react";

interface TextValidatorsProps {
  onApplyResult: (result: string) => void;
}

export function TextValidators({ onApplyResult }: TextValidatorsProps) {
  const [inputText, setInputText] = useState("");
  const [validationResults, setValidationResults] = useState<{
    [key: string]: { valid: boolean; message: string; value?: string }
  }>({});

  // Validar email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      valid: emailRegex.test(email),
      message: emailRegex.test(email) ? "Email válido" : "Email inválido",
      value: email
    };
  };

  // Validar URL
  const validateURL = (url: string) => {
    try {
      new URL(url);
      return {
        valid: true,
        message: "URL válida",
        value: url
      };
    } catch {
      return {
        valid: false,
        message: "URL inválida",
        value: url
      };
    }
  };

  // Validar teléfono (formato internacional básico)
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return {
      valid: phoneRegex.test(cleanPhone) && cleanPhone.length >= 10,
      message: phoneRegex.test(cleanPhone) && cleanPhone.length >= 10 
        ? "Teléfono válido" 
        : "Teléfono inválido (formato internacional requerido)",
      value: phone
    };
  };

  // Validar tarjeta de crédito (Luhn algorithm)
  const validateCreditCard = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      return {
        valid: false,
        message: "Número de tarjeta inválido (13-19 dígitos requeridos)",
        value: cardNumber
      };
    }

    // Algoritmo de Luhn
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    const isValid = sum % 10 === 0;
    const cardType = getCardType(cleanNumber);
    
    return {
      valid: isValid,
      message: isValid 
        ? `Tarjeta ${cardType} válida` 
        : "Número de tarjeta inválido",
      value: cardNumber
    };
  };

  // Detectar tipo de tarjeta
  const getCardType = (cardNumber: string) => {
    if (/^4/.test(cardNumber)) return "Visa";
    if (/^5[1-5]/.test(cardNumber)) return "Mastercard";
    if (/^3[47]/.test(cardNumber)) return "American Express";
    if (/^6/.test(cardNumber)) return "Discover";
    return "Desconocida";
  };

  // Validar ISBN
  const validateISBN = (isbn: string) => {
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    
    if (cleanISBN.length === 10) {
      return validateISBN10(cleanISBN);
    } else if (cleanISBN.length === 13) {
      return validateISBN13(cleanISBN);
    } else {
      return {
        valid: false,
        message: "ISBN debe tener 10 o 13 dígitos",
        value: isbn
      };
    }
  };

  const validateISBN10 = (isbn: string) => {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(isbn[i]) * (10 - i);
    }
    
    const checkDigit = isbn[9] === 'X' ? 10 : parseInt(isbn[9]);
    const isValid = (sum + checkDigit) % 11 === 0;
    
    return {
      valid: isValid,
      message: isValid ? "ISBN-10 válido" : "ISBN-10 inválido",
      value: isbn
    };
  };

  const validateISBN13 = (isbn: string) => {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
    }
    
    const checkDigit = parseInt(isbn[12]);
    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    const isValid = checkDigit === calculatedCheckDigit;
    
    return {
      valid: isValid,
      message: isValid ? "ISBN-13 válido" : "ISBN-13 inválido",
      value: isbn
    };
  };

  // Validar fecha
  const validateDate = (dateString: string) => {
    const date = new Date(dateString);
    const isValid = !isNaN(date.getTime()) && dateString.trim() !== '';
    
    return {
      valid: isValid,
      message: isValid 
        ? `Fecha válida: ${date.toLocaleDateString()}` 
        : "Fecha inválida",
      value: dateString
    };
  };

  // Validar JSON
  const validateJSON = (jsonString: string) => {
    try {
      JSON.parse(jsonString);
      return {
        valid: true,
        message: "JSON válido",
        value: jsonString
      };
    } catch (error) {
      return {
        valid: false,
        message: `JSON inválido: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        value: jsonString
      };
    }
  };

  // Ejecutar todas las validaciones
  const runAllValidations = () => {
    if (!inputText.trim()) return;

    const results: { [key: string]: { valid: boolean; message: string; value?: string } } = {};

    // Validar cada línea por separado
    const lines = inputText.split('\n').filter(line => line.trim());
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Email
      if (trimmedLine.includes('@')) {
        results[`email_${index}`] = validateEmail(trimmedLine);
      }
      
      // URL
      if (trimmedLine.startsWith('http') || trimmedLine.startsWith('www')) {
        results[`url_${index}`] = validateURL(trimmedLine);
      }
      
      // Teléfono
      if (/[\d\+\-\(\)\s]{10,}/.test(trimmedLine)) {
        results[`phone_${index}`] = validatePhone(trimmedLine);
      }
      
      // Tarjeta de crédito
      if (/[\d\s]{13,19}/.test(trimmedLine)) {
        results[`card_${index}`] = validateCreditCard(trimmedLine);
      }
      
      // ISBN
      if (/[\d\-X]{10,17}/.test(trimmedLine)) {
        results[`isbn_${index}`] = validateISBN(trimmedLine);
      }
      
      // Fecha
      if (/[\d\/\-\.]/.test(trimmedLine)) {
        results[`date_${index}`] = validateDate(trimmedLine);
      }
      
      // JSON
      if (trimmedLine.startsWith('{') || trimmedLine.startsWith('[')) {
        results[`json_${index}`] = validateJSON(trimmedLine);
      }
    });

    setValidationResults(results);
  };

  // Generar reporte
  const generateReport = () => {
    const validCount = Object.values(validationResults).filter(r => r.valid).length;
    const totalCount = Object.keys(validationResults).length;
    
    let report = `REPORTE DE VALIDACIÓN\n`;
    report += `========================\n\n`;
    report += `Total de elementos validados: ${totalCount}\n`;
    report += `Elementos válidos: ${validCount}\n`;
    report += `Elementos inválidos: ${totalCount - validCount}\n`;
    report += `Tasa de validez: ${totalCount > 0 ? Math.round((validCount / totalCount) * 100) : 0}%\n\n`;
    
    report += `DETALLES:\n`;
    report += `==========\n\n`;
    
    Object.entries(validationResults).forEach(([key, result]) => {
      const type = key.split('_')[0];
      const index = key.split('_')[1];
      const icon = result.valid ? '✓' : '✗';
      report += `${icon} ${type.toUpperCase()} (línea ${parseInt(index) + 1}): ${result.message}\n`;
      if (result.value) {
        report += `   Valor: ${result.value}\n`;
      }
      report += `\n`;
    });
    
    onApplyResult(report);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Validadores de Texto
          </CardTitle>
          <CardDescription>
            Valida emails, URLs, teléfonos, tarjetas de crédito y más
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="validation-input">Texto a validar</Label>
            <Input
              id="validation-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pega texto con emails, URLs, teléfonos, etc."
              className="mt-1"
            />
          </div>
          
          <Button onClick={runAllValidations} className="w-full">
            Ejecutar Validaciones
          </Button>
          
          {Object.keys(validationResults).length > 0 && (
            <Button onClick={generateReport} variant="outline" className="w-full">
              Generar Reporte
            </Button>
          )}
        </CardContent>
      </Card>

      {Object.keys(validationResults).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados de Validación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(validationResults).map(([key, result]) => {
                const type = key.split('_')[0];
                const index = key.split('_')[1];
                
                return (
                  <div key={key} className="flex items-center gap-2 p-2 border rounded">
                    {result.valid ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {type.toUpperCase()}
                        </Badge>
                        <span className="text-sm">Línea {parseInt(index) + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.message}
                      </p>
                      {result.value && (
                        <p className="text-xs font-mono bg-muted p-1 rounded mt-1">
                          {result.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
