const express = require("express");
const employeeRouter = express.Router()
const Employee = require("../models/employee.model")
require("dotenv").config()
const authenticate = require("../middleware/auth.middleware")
const jwt = require("jsonwebtoken")


employeeRouter.post('/employees', authenticate, async (req, res) => {
    try {
      const { firstName, lastName, email, department, salary } = req.body;
      const employee = new Employee({ firstName, lastName, email, department, salary });
      await employee.save();
  
      res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
});
  
// Employees API - Read
employeeRouter.get('/employees', authenticate, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default page is 1
        const limit = parseInt(req.query.limit) || 5; // Default limit is 5
        const skip = (page - 1) * limit;
    
        const employees = await Employee.find().skip(skip).limit(limit);
        const totalEmployees = await Employee.countDocuments();
    
        res.json({ employees, totalEmployees });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }
});
  
// Employees API - Update
employeeRouter.put('/employees/:id', authenticate, async (req, res) => {
    try {
      const { firstName, lastName, email, department, salary } = req.body;
      const employee = await Employee.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        email,
        department,
        salary
      });
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
});
  
// Employees API - Delete
employeeRouter.delete('/employees/:id', authenticate, async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
});

  
module.exports = {employeeRouter}