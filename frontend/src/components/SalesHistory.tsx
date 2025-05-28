import React, { useState, useEffect } from "react";
import api, { getSales, getSaleById } from "../services/api";
import { FileDown } from "lucide-react";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface SaleItem {
  _id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Sale {
  _id: string;
  items: SaleItem[];
  totalAmount: number;
  createdAt: string;
}

const SalesHistory: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setIsLoading(true);
      const data = await getSales();
      setSales(data);
    } catch (error) {
      toast.error("Failed to load sales history");
    } finally {
      setIsLoading(false);
    }
  };

  const generateInvoice = (sale: Sale) => {
  const doc = new jsPDF();

  // Company Info
  doc.setFontSize(12);
  doc.setTextColor(80);
  doc.text("POS APP", 14, 20);
  doc.text("123 Business Street", 14, 27);
  doc.text("Dhaka, Bangladesh", 14, 34);
  doc.text("Phone: 01701055271", 14, 41);
  doc.text("Email: amttawsik.cse@gmail.com", 14, 48);

  // Invoice title
  doc.setFontSize(22);
  doc.setTextColor(30);
  doc.text("INVOICE", 180, 25, { align: "right" });

  // Invoice Details
  doc.setFontSize(11);
  doc.setTextColor(50);
  doc.text(`Invoice #: ${sale._id.slice(-8).toUpperCase()}`, 180, 32, { align: "right" });
  doc.text(`Date: ${new Date(sale.createdAt).toLocaleDateString()}`, 180, 38, { align: "right" });

  // Customer Info (replace with real customer data if available)
  doc.setFontSize(12);
  doc.setTextColor(80);
  doc.text("Bill To:", 14, 60);
  doc.text("John Doe", 14, 67);
  doc.text("johndoe@example.com", 14, 74);

  // Items Table
  autoTable(doc, {
    startY: 85,
    head: [['Item', 'Quantity', 'Unit Price', 'Total']],
    body: sale.items.map(item => [
      item.name,
      item.quantity.toString(),
      `$${item.price.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]),
    theme: 'striped',
    headStyles: {
      fillColor: [26, 115, 232], // Google blue
      textColor: 255,
      fontStyle: 'bold'
    },
    bodyStyles: {
      textColor: 50
    },
    styles: {
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'left' },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 }
    }
  });

  // Total Box
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setDrawColor(26, 115, 232);
  doc.setFillColor(26, 115, 232);
  doc.rect(140, finalY, 50, 10, 'F');
  doc.setTextColor(255);
  doc.setFontSize(12);
  doc.text(`Total: $${sale.totalAmount.toFixed(2)}`, 165, finalY + 7, { align: "center" });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text("Thank you for your business!", 105, finalY + 25, { align: "center" });
  doc.text("Payment due within 30 days.", 105, finalY + 30, { align: "center" });

  return doc;
};


  const handleDownloadInvoice = async (saleId: string) => {
    try {
      setDownloadingId(saleId);
      const sale = await getSaleById(saleId);
      
      // Generate the PDF
      const doc = generateInvoice(sale);
      
      // Save and download
      doc.save(`invoice-${sale._id.slice(-8)}.pdf`);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Failed to download invoice:", error);
      toast.error("Failed to download invoice");
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Sales History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {sale.items.length} {sale.items.length === 1 ? 'item' : 'items'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${sale.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDownloadInvoice(sale._id)}
                    disabled={downloadingId === sale._id}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end gap-1 disabled:opacity-50"
                  >
                    {downloadingId === sale._id ? (
                      <span className="animate-spin h-4 w-4 border-b-2 border-indigo-600 rounded-full inline-block"></span>
                    ) : (
                      <FileDown size={16} />
                    )}
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistory;