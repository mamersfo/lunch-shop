import Link from 'next/link'
import Image from 'next/image'
import Amount from './amount'

const ProductCard = (product: any) => {
    return (
        <Link
            href={`/shop/${product.slug}`}
            className='card w-96 bg-base-100 shadow-xl border hover:border-black'
        >
            <figure className='relative h-56'>
                <Image
                    src={`http://localhost:54321/storage/v1/object/public/shop/karsten-winegeart-${product.slug}-unsplash-small.jpg`}
                    alt={product.name}
                    width={400}
                    height={400}
                    style={{ objectFit: 'cover' }}
                    priority={true}
                />
            </figure>
            <div className='card-body'>
                <h4 className='card-title flex flex-row justify-between'>
                    <span>
                        {product.name}
                        {product.isNew && (
                            <div className='badge badge-secondary ml-2'>
                                NEW
                            </div>
                        )}
                    </span>
                    <span>
                        <Amount value={product.price} />
                    </span>
                </h4>
                {product.description && (
                    <p className='text-sm'>{product.description}</p>
                )}
                {product.tags && (
                    <div className='card-actions justify-end mt-4'>
                        {product.tags.map((tag: string, idx: number) => (
                            <div
                                key={`sku-${product.id}-tag-${idx}`}
                                className='badge badge-outline'
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    )
}

export default ProductCard
