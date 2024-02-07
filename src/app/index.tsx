import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import {View, FlatList, SectionList, Text} from 'react-native'
import { CATEGORIES, MENU, PRODUCTS } from "@/utils/data/products"
import { useState, useRef } from 'react'
import { Product } from '@/components/product'
import { Link } from 'expo-router'
import { useCartStore } from '@/stores/cart-store'


export default function Home() {
    const[category, setCategory] = useState(CATEGORIES[0])
    const sectitionListRef = useRef<SectionList>(null)
    const cartStore = useCartStore()

    const cartQuantityitems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory)

        const sectionIndex = CATEGORIES.findIndex(
            (category) => category === selectedCategory
        )

        if (sectitionListRef.current) {
            sectitionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0,
            })
        }
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Faça seu pedido" cartQuantityItems={cartQuantityitems}/>
            
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                    <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)}/>
                    
                )}
                horizontal
                className='max-h10 mt-5'
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />
            <SectionList
                ref={sectitionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({ item }) =>
                    <Link href={`/product/${item.id}`} asChild><Product data={item} /></Link>
                }
                renderSectionHeader={({section: {title}}) => 
                <Text className='text-xl text-white font-heading mt-8 mb-3'>
                    {title}
                </Text>}
                className='flex-1 p-5'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            
        </View>
        
    )
}
