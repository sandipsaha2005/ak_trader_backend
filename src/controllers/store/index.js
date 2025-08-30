import { Store } from "../../models/offline-store/store.js";
import Joi from "joi";
// ----------------------------------------------------------------------

export const createStore = async (req, res, next) => {
    try {
        const { value, error } = Joi.object({
            place: Joi.string().required().min(3).max(20).error(new Error("Enter a Valid Name")),
            subDescription: Joi.string().required().error(new Error("subDescription is required")),
            shopCode: Joi.string().required().error(new Error("shopCode is required")),
            open: Joi.boolean().required().error(new Error("open is required")),
            location: Joi.string().required().error(new Error("location is required")),
            contactNo: Joi.string().required().error(new Error("contactNo is required")),
            email: Joi.string().required().error(new Error("email is required")),
            timing: Joi.string().required().error(new Error("timing is required")),
        }).validate(req.body);

        if (!req.files || !req.files.image) {
            return res.status(400).send("No file uploaded.");
        }
        const image = req.files.image.data.toString('base64');;

        if (error) return res.status(400).json({ message: error?.message });

        const { place, subDescription, shopCode, open, location, contactNo, email, timing
        } = value;

        if (await Store.findOne({ shopCode: shopCode })) {
            return res.status(400).json({
                success: false,
                message: "Store with this shopCode already exists."
            })
        }

        const StoreDetails = await new Store({
            place, subDescription, shopCode, open, location, contactNo, email, timing, image
        })

        await StoreDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Store Created Successfully.',
            StoreDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occured while creating admin',

        })
    }
}

export const modifyStore = async (req, res, next) => {
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

        const existingProduct = await Store.findOne({ productCode });
        if (!existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Store with this productCode doesn't exist."
            });
        }

        const updateProduct = await Store.updateOne(
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
                message: 'No changes were made. Store was already up-to-date.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Store Updated Successfully.',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occured while creating admin',

        })
    }
}

export const deleteStore = async (req, res, next) => {
    try {
        const { value, error } = Joi.object({
            productCode: Joi.string().required().error(new Error("productCode is required"))
        }).validate(req.body);
        if (error) return res.status(400).json({ message: error?.message });

        const productDetails = await Store.findOne({ productCode: value.productCode });
        if (!productDetails) {
            return res.status(400).json({
                success: false,
                message: "Store with this productCode doesn't exist."
            });
        }

        const productDeleteResult = await Store.deleteOne({ productCode: value.productCode });

        if (productDeleteResult.deletedCount === 0) {
            return res.status(400).json({
                success: false,
                message: 'Store was not deleted. Try again later.',
                productDeleteResult
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Store Deleted Successfully.',
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Some error occured while deleteting product',
        })
    }
}

export const getStore = async (req, res, next) => {
    try {
        const storeList = await Store.find({});

        return res.status(200).json({
            success: true,
            storeList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Some error occured while creating admin',

        })
    }

}