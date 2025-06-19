import { products } from "./constants/data.js";

const DefaultData = async()=>{
    try {
        // await Product.deleteMany({});
        // await Product.insertMany(products);
        console.log("default data insert kar diya bhai")
    } catch (error) {
        console.log("default data insert karne me gadbad hui hai. dekhle bhai ",error.message)
    }
}

export default DefaultData;