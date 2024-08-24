const express = require("express");
const {
    addUser,
    getUser,
    applyForLeave,
    applyForReImbusrment,
    getAllRequests,
    viewLeaveRequestById,
    viewReImBursmentRequestById,
    updateLeaveRequestStatus,
    updateReImBursmentRequestStatus,
    getLeaveRequests,
    getReImbusrementRequests,
    getRequestedLeaves,
    getRequestedReImbursments
} = require("../controller/employee.controller");

const { verifyToken, verfiyHrAuth } = require("../middleware/authMiddleware");
const userRoutes = express.Router();

//multer config for uploading documents.
const multer = require('multer');
const { validate } = require("../middleware/validate");
const {
    validateRegister,
    validateLeaveApplyRequest,
    validateUpdateLeaveRequest,
    validateUpdateRmbrstRequest,
    validateViewLeaveRequest,
    validateViewRmbrstRequest
} = require("../validation/employee.validation");

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

userRoutes.post("/addUser", validate(validateRegister), verifyToken, verfiyHrAuth, addUser);
userRoutes.get("/", verifyToken, getUser);
userRoutes.post('/apply/leave', validate(validateLeaveApplyRequest), verifyToken, applyForLeave)
userRoutes.post('/apply/reimbusrment', verifyToken, upload.single('file'), applyForReImbusrment)
userRoutes.get('/requests', verifyToken, verfiyHrAuth, getAllRequests)
userRoutes.get('/leave/requests', verifyToken, verfiyHrAuth, getLeaveRequests)
userRoutes.get('/reimbursement/requests', verifyToken, verfiyHrAuth,getReImbusrementRequests)
userRoutes.get('/requested/leaves', verifyToken, getRequestedLeaves)
userRoutes.get('/requested/reimbursments', verifyToken,getRequestedReImbursments)
userRoutes.get('/leave/:id', validate(validateViewLeaveRequest), verifyToken, viewLeaveRequestById)
userRoutes.get('/reimbursment/:id', validate(validateViewRmbrstRequest), verifyToken, viewReImBursmentRequestById)
userRoutes.patch('/leave/:id', validate(validateUpdateLeaveRequest), verifyToken, verfiyHrAuth, updateLeaveRequestStatus)
userRoutes.patch('/reimbursment/:id', validate(validateUpdateRmbrstRequest), verifyToken, verfiyHrAuth, updateReImBursmentRequestStatus)


module.exports = userRoutes;