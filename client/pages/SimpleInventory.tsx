import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for simple inventory
const mockInventory = [
  { id: 1, name: 'MacBook Pro 16"', quantity: 5, price: 2499.99 },
  { id: 2, name: 'iPhone 15 Pro', quantity: 12, price: 999.99 },
  { id: 3, name: 'Wireless Mouse', quantity: 25, price: 79.99 },
  { id: 4, name: 'USB-C Cable', quantity: 50, price: 29.99 },
  { id: 5, name: 'Dell Monitor 27"', quantity: 8, price: 299.99 },
];

export default function SimpleInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = mockInventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Package className="h-6 w-6 text-primary mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">Your Inventory</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search your items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg py-6"
              />
            </div>
          </CardContent>
        </Card>

        {/* Inventory List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No items found' : 'No items in inventory'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try searching with different terms' 
                    : 'Start by adding your first item to the inventory'
                  }
                </p>
                <Button asChild>
                  <Link to="/add-item">Add Your First Item</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-6 text-gray-600">
                        <div>
                          <span className="text-sm">Quantity: </span>
                          <span className="font-medium text-lg">{item.quantity}</span>
                        </div>
                        <div>
                          <span className="text-sm">Price: </span>
                          <span className="font-medium text-lg">${item.price}</span>
                        </div>
                        <div>
                          <span className="text-sm">Total Value: </span>
                          <span className="font-medium text-lg text-green-600">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link to={`/update-quantity?item=${item.id}`}>
                          Update Quantity
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary */}
        {filteredItems.length > 0 && (
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {filteredItems.length}
                  </div>
                  <div className="text-gray-600">Items Found</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {filteredItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                  <div className="text-gray-600">Total Quantity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    ${filteredItems.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                  </div>
                  <div className="text-gray-600">Total Value</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
