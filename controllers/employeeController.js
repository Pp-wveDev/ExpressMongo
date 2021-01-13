const express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const Employee = mongoose.model('Employee');

// Nuevo Empleado
// -------------------------------------------------------------------------------------------------
router.get('/', (req, res) => {
    res.render('employee/addOrEdit', {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == "") { // Nuevo empleado
        insertEmployee(req, res);
    } else { // Actualizamos empleado
        updateEmployee(req, res);
    }
});
// -------------------------------------------------------------------------------------------------

function insertEmployee(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            console.log('Error during record insertion: ' + err);
            res.render('employee/addOrEdit', {
                viewTitle: "Insert Employee",
                employee: req.body,
                error: "Format error at one or more fields."
            });
        }
    })
}

function updateEmployee(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect("employee/list");
        } else {
            res.render("employee/addOrEdit", {
                viewTitle: 'Update employee',
                employee: req.body
            });
        }
    });
}

// Listar empleados
// -------------------------------------------------------------------------------------------------
router.get('/list', (req, res) => {
    Employee.find({}).lean()
        .exec((err, docs) => {
            if (!err) {
                res.render("employee/list", {
                    list: docs,
                    viewTitle: "Employee list"
                });
            } else {
                console.log("Error in retrieving employee list: " + err);
            }
        });
});
// -------------------------------------------------------------------------------------------------

// Cargar empleado
// -------------------------------------------------------------------------------------------------
router.get("/:id", (req, res) => {
    Employee.findById(req.params.id).lean()
        .exec((err, doc) => {
            if (!err) {
                console.log(doc);
                res.render("employee/addOrEdit", {
                    viewTitle: "Update Employee",
                    employee: doc
                });
            }
        });
});
// -------------------------------------------------------------------------------------------------

// Borrar empleado
// -------------------------------------------------------------------------------------------------
router.get("/delete/:id", (req, res) => {
    Employee.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log("Error in employee delete: " + err);
        }
    });
});
// -------------------------------------------------------------------------------------------------
module.exports = router;