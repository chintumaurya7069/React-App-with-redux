import express, { json } from "express";
import { Address } from "../model/address.js";

export const addAddress = async (req, res) =>{
    const {userId} = req.params
    const {country, state, city, address1, address2, plotNumber, pinCode} = req.body
try {
    const address = await Address.create({
      country,
      state,
      city,
      address1,
      address2,
      plotNumber,
      pinCode,
      user: userId,
    });
    res.json({
      message: "User Address Added Successfully...!",
      address,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }

}

export const getAddressById = async(req, res) =>{
    const { userId } = req.params;
    try {
        const address = await Address.findById(userId);
        res.
          json({
            message: "Address Fetched Successfully...!",
            address,
            success: true,
          });
    } catch (error) {
    res.json({ message: error.message });
    }
}
