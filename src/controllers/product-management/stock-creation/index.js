import { Product } from "../../../models/product/productSchema.js";
import Joi from "joi";
// ----------------------------------------------------------------------

export const createItem = async (req, res, next) => {
    try {
        const { value, error } = Joi.object({
            name: Joi.string().required().min(3).max(20).error(new Error("Enter a Valid Name")),
            subDescription: Joi.string().required().error(new Error("subDescription is required")),
            content: Joi.string().required().error(new Error("content is required")),
            category: Joi.string().required().error(new Error("category is required")),
            productCode: Joi.string().required().error(new Error("productCode is required")),
            gender: Joi.string().required().error(new Error("gender is required")),
            quantity: Joi.number().required().error(new Error("category is required")),
            price: Joi.number().required().error(new Error("price is required")),
            isSale: Joi.boolean().required().error(new Error("isSale is required")),
            regularPrice: Joi.number().required().error(new Error("regularPrice is required")),
            salePrice: Joi.number().required().error(new Error("salePrice is required")),
            addedBy: Joi.string().required().error(new Error("addedBy is required")),
            hide: Joi.boolean().required().error(new Error("hide is required")),
            image: Joi.array().items(Joi.string().uri()).required().error(new Error("image are not rhere"))
        }).validate(req.body);


        if (error) return res.status(400).json({ message: error?.message });

        const { name, hide, subDescription, content, category, productCode, gender, quantity, price, isSale, regularPrice, salePrice, available, addedBy, image } = value;

        if (await Product.findOne({ productCode: productCode })) {
            return res.status(400).json({
                success: false,
                message: "Product with this productCode already exists."
            })
        }

        const ProductDetails = await new Product({
            name,
            subDescription,
            content,
            category,
            productCode,
            gender,
            quantity,
            price,
            isSale,
            regularPrice,
            salePrice,
            addedBy,
            image,
            hide
        })

        await ProductDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Product Created Successfully.',
            ProductDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occured while creating admin',

        })
    }
}

export const modifyItem = async (req, res, next) => {
    try {
        const { value, error } = Joi.object({
            name: Joi.string().required().min(3).max(20).error(new Error("Enter a Valid Name")),
            subDescription: Joi.string().required().error(new Error("subDescription is required")),
            content: Joi.string().required().error(new Error("content is required")),
            category: Joi.string().required().error(new Error("category is required")),
            productCode: Joi.string().required().error(new Error("productCode is required")),
            gender: Joi.string().required().error(new Error("gender is required")),
            quantity: Joi.number().required().error(new Error("category is required")),
            price: Joi.number().required().error(new Error("price is required")),
            isSale: Joi.boolean().required().error(new Error("isSale is required")),
            hide: Joi.boolean().required().error(new Error("hide is required")),
            regularPrice: Joi.number().required().error(new Error("regularPrice is required")),
            salePrice: Joi.number().required().error(new Error("salePrice is required")),
            addedBy: Joi.string().required().error(new Error("addedBy is required")),
            image: Joi.array().items(Joi.string().uri()).required().error(new Error("image are not rhere"))
        }).validate(req.body);

        if (error) return res.status(400).json({ message: error?.message });

        const { name, hide, subDescription, content, category, productCode, gender, quantity, price, isSale, regularPrice, salePrice, available, addedBy, image } = value;

        const existingProduct = await Product.findOne({ productCode });
        if (!existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Product with this productCode doesn't exist."
            });
        }

        const updateProduct = await Product.updateOne(
            { productCode: productCode },
            {
                name,
                subDescription,
                content,
                category,
                productCode,
                gender,
                quantity,
                price,
                isSale,
                regularPrice,
                salePrice,
                addedBy,
                image,
                hide
            }
        )
        if (updateProduct.modifiedCount === 0) {
            return res.status(200).json({
                success: true,
                message: 'No changes were made. Product was already up-to-date.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product Updated Successfully.',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occured while creating admin',

        })
    }
}

export const deleteItem = async (req, res, next) => {
    try {
        const { value, error } = Joi.object({
            productCode: Joi.string().required().error(new Error("productCode is required"))
        }).validate(req.body);
        if (error) return res.status(400).json({ message: error?.message });

        const productDetails = await Product.findOne({ productCode: value.productCode });
        if (!productDetails) {
            return res.status(400).json({
                success: false,
                message: "Product with this productCode doesn't exist."
            });
        }

        const productDeleteResult = await Product.deleteOne({ productCode: value.productCode });

        if (productDeleteResult.deletedCount === 0) {
            return res.status(400).json({
                success: false,
                message: 'Product was not deleted. Try again later.',
                productDeleteResult
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product Deleted Successfully.',
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occured while deleteting product',
        })
    }
}
