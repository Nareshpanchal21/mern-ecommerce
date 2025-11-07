import Address from "../models/AddressModel.js";

// 🟢 Add Address
export const addAddress = async (req, res) => {
  try {
    const { userId, name, mobile, street, city, state, pincode } = req.body;

    if (!userId || !name || !mobile || !street || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = await Address.create({
      userId,
      name,
      mobile,
      street,
      city,
      state,
      pincode,
    });

    res.status(201).json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding address" });
  }
};

// 🟠 Get User Address
export const getUserAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching addresses" });
  }
};
