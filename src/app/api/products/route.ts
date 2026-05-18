import { NextResponse } from 'next/server';
import { products } from '@/data/mock';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let filteredProducts = products;

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (search) {
    const lowercaseSearch = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(lowercaseSearch)
    );
  }

  // Simulate network delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json({
    data: filteredProducts,
    total: filteredProducts.length
  });
}
