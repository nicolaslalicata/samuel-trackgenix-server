import mongoose from 'mongoose';
import AdminModel from '../models/Admins';

const addAdmin = async (req, res) => {
  try {
    const existAdmin = await AdminModel.findOne({ email: req.body.email });
    if (existAdmin) {
      return res.status(400).json({
        message: 'An admin with this email already exists',
        data: undefined,
        error: true,
      });
    }
    const admin = new AdminModel({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender.toLowerCase(),
      phone: req.body.phone,
      dateBirth: req.body.dateBirth,
      city: req.body.city,
      zip: req.body.zip,
      active: req.body.active,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    let allAdmins;
    if (req.query) {
      allAdmins = await AdminModel.find(req.query);
      if (allAdmins.length === 0) {
        return res.status(404).json({
          message: 'Admins not found',
          data: undefined,
          error: true,
        });
      }
    } else {
      allAdmins = await AdminModel.find({});
    }
    return res.status(200).json({
      message: 'The request was successful',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) {
      return res.status(404).json({
        message: `The admin with id: ${req.params.id} was not found`,
        data: undefined,
        error: true,
      });
    }
    const adminById = await AdminModel.findById(req.params.id);
    return res.status(200).json({
      message: 'The request was successful',
      data: adminById,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  addAdmin,
  getAllAdmins,
  getAdminById,
};
