import { Image, Text, View } from "react-native";
import { Button } from "@/components/button";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";

export default function Product() {
    const { id } = useLocalSearchParams()
    const cartStore = useCartStore()
    const product = PRODUCTS.filter((item) => item.id === id)[0]
    const navigation = useNavigation()

    function handleAddToCart() {
        cartStore.add(product)
        navigation.goBack()
    }

    return (
        <View className="flex-1">
            <Image
                source={product.cover}
                className="w-full h-52"
                resizeMode="cover"
            />

            <View className="p-5 mt-8 flex-1">
                <Text className="text-lime-400 text-2xl font-heading my-2">
                    {formatCurrency(product.price)}
                </Text>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6">
                    {product.description}
                </Text>
                {product.ingredients.map((ingredient) => (
                    <Text className="text-slate-400 font-body text-base leading-6" key={ingredient}>
                        {"\u2022"} {ingredient}
                    </Text>
                ))}

                
            </View>
            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20}/>
                    </Button.Icon>
                    <Button.Text>Adicionar ao pedido</Button.Text>
                </Button>
                <LinkButton title="Voltar" href="/"></LinkButton>
            </View>
        </View>
    )
}