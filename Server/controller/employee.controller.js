const bcrypt = require('bcryptjs');
const { User, Leave, Reimbursement } = require('../models');
const { ApiError } = require('../middleware/ApiError');
const { Op } = require('sequelize');

//add user
const addUser = async (req, res, next) => {
    try {
        const { name, email, password, role, address, grade, job_location, reporting_manager, joining_date } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            throw new ApiError(400, `User already exist`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            address,
            grade,
            job_location,
            reporting_manager,
            joining_date,
        });

        //add leave for user 
        await Leave.create({
            user_id: newUser.id
          });

        res.status(201).json({
            success: true,
            message: 'User added successfully',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });

    } catch (error) {
        next(error);
    }
};


//get user details along with total leave and balance leave
const getUser = async (req, res, next) => {
    try {
        const { id } = req.user
        const userData = await User.findOne({
            where: { id },
            attributes: ['id', 'name', 'email', 'role', 'address', 'grade', 'job_location', 'reporting_manager', 'joining_date']
        });

        if (!userData) {
            throw new ApiError(404, 'User not found');
        }

        const leaveData = await Leave.findOne({
            where: { user_id: id, leave_type: "Casual Leave" },
            order: [['createdAt', 'DESC']],
        });

        if (!leaveData) {
            throw new ApiError(404, 'User leave record is not found');
        }

        const totalLeave = leaveData.total_leave;
        const leavesTaken = leaveData.total_leave-leaveData.leave_balance
        const balanceLeaves = leaveData.leave_balance

        const responseData = {
            ...userData.get(),
            totalLeave,
            leavesTaken,
            balanceLeaves
        };

        res.status(200).json({
            success: true,
            message: 'User Retrieved',
            data: responseData
        });


    } catch (error) {
        next(error);
    }
};

//apply for leave
const applyForLeave = async (req, res, next) => {
    try {
        const { start_date, end_date, leave_type} = req.body;
        const user_id = req.user.id;

        if(start_date>end_date){
            throw new ApiError(400,'start_date should not be greater than end_date')
        }

        const leaveData = await Leave.findOne({
            where: { user_id, leave_type: "Casual Leave" },
            order: [['createdAt', 'DESC']],
        });

        if (!leaveData) {
            throw new ApiError(404, 'User leave record not found');
        }

        const leaveBalance = leaveData.leave_balance;

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const daysRequested = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

        if (daysRequested > leaveBalance) {
            throw new ApiError(400, 'Insufficient leave balance');
        }

        const newLeave = await Leave.create({
            start_date,
            end_date,
            leave_balance: leaveBalance - daysRequested,
            user_id,
            leave_type:leave_type?leave_type:'Casual Leave'
        });

        res.status(201).json({
            success: true,
            message: 'Leave applied successfully',
            data: newLeave
        });

    } catch (error) {
        next(error);
    }
};

//apply for reimbusrment
const applyForReImbusrment = async (req, res, next) => {
    try {
        const fileName = `${req.file.filename}`
        const { description, amount } = req.body;
        const user_id = req.user.id
        const userData = await User.findOne({ where: { id: user_id } })

        if (!userData) {
            throw new ApiError(404, 'User not found')
        }

        const reimbusrmentData = await Reimbursement.create({
            pdf_attachment: fileName,
            description,
            amount,
            user_id
        })

        res.status(201).json({
            success: true,
            message: 'Reimbusrement applied successfully',
            data: reimbusrmentData
        });

    } catch (error) {
        next(error)
    }
}

//for hr employee, fetch all user's requested leaves
const getLeaveRequests = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: Leave,
                    as: "leaves",
                    attributes: ['id', 'start_date', 'end_date', 'status', 'leave_type', 'leave_balance'],
                    where: {
                        start_date: { [Op.ne]: null },
                        end_date: { [Op.ne]: null },
                    }
                }
            ],
        });

        res.status(200).json({
            success: true,
            message: 'All user leave requests retrieved successfully',
            data: users,
        });

    } catch (error) {
        next(error)
    }
}

//for hr employee, fetch all user's requested imbursrementRequests.
const getReImbusrementRequests = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: Reimbursement,
                    as: 'reimbursements',
                    attributes: ['id', 'amount', 'description', 'status', 'pdf_attachment'],
                }
            ],
        });
        res.status(200).json({
            success: true,
            message: 'All user leave requests retrieved successfully',
            data: users,
        });

    } catch (error) {
        next(error)
    }
}


//get all your requested leaves
const getRequestedLeaves = async (req, res, next)=>{
    try {
        const userId = req.user.id;
        const leaves = await User.findAll({
            where:{id:userId},
            include:[
                {
                    model:Leave,
                    as:'leaves',
                    attributes: ['id', 'start_date', 'end_date', 'status', 'leave_type', 'leave_balance'],
                    where: {
                        start_date: { [Op.ne]: null },
                        end_date: { [Op.ne]: null },
                    }
                }
            ]
        })

        res.status(200).json({
            success: true,
            message: 'All requested leave retrieved successfully',
            data: leaves,
        });
        

    } catch (error) {
        next(error)
    }
}

//get all your requested reimbursements.
const getRequestedReImbursments = async (req, res, next)=>{
    try {
        const userId = req.user.id;
        const leaves = await User.findAll({
            where:{id:userId},
            include:[
                {
                model: Reimbursement,
                    as: 'reimbursements',
                    attributes: ['id', 'amount', 'description', 'status', 'pdf_attachment']
                }
            ]
        })

        res.status(200).json({
            success: true,
            message: 'All requested reimbursment retrieved successfully',
            data: leaves,
        });
        

    } catch (error) {
        next(error)
    }
}


//get all requested leaves and reimbursments
const getAllRequests = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: Leave,
                    as: "leaves",
                    attributes: ['id', 'start_date', 'end_date', 'status', 'leave_type', 'leave_balance'],
                    where: {
                        start_date: { [Op.ne]: null },
                        end_date: { [Op.ne]: null },
                    }
                },
                {
                    model: Reimbursement,
                    as: 'reimbursements',
                    attributes: ['id', 'amount', 'description', 'status', 'pdf_attachment'],
                }
            ],
        });
        res.status(200).json({
            success: true,
            message: 'All user leave and reimbursement requests retrieved successfully',
            data: users,
        });

    } catch (error) {
        next(error)
    }
}

//view leave by id
const viewLeaveRequestById = async (req, res, next) => {
    try {
        const leaveId = req.params.id
        const leaveRequest = await Leave.findOne({
            where: { id: leaveId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'role', 'address', 'grade', 'job_location', 'reporting_manager', 'joining_date']
                }
            ]
        });

        if (!leaveRequest) {
            throw new ApiError(404, 'Leave request not found');
        }

        res.status(200).json({
            success: true,
            message: 'Leave request retrieved successfully',
            data: leaveRequest,
        });


    } catch (error) {
        next(error)
    }
}

//get reimbursment by id
const viewReImBursmentRequestById = async (req, res, next) => {
    try {
        const reimbursementId = req.params.id
        const leaveRequest = await Reimbursement.findOne({
            where: { id: reimbursementId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'role', 'address', 'grade', 'job_location', 'reporting_manager', 'joining_date']
                }
            ]
        });

        if (!leaveRequest) {
            throw new ApiError(404, 'Leave request not found');
        }

        res.status(200).json({
            success: true,
            message: 'Leave request retrieved successfully',
            data: leaveRequest,
        });


    } catch (error) {
        next(error)
    }
}

//only for hr.  approve and reject requested leaves
const updateLeaveRequestStatus = async (req, res, next) => {
    try {
        const leaveId = req.params.id
        const leaveRequest = await Leave.update({status:`${req.body.status}`}, {where:{id:leaveId}});

        if (!leaveRequest[0]>0) {
            throw new ApiError(404, 'Leave request not found');
        }

        res.status(200).json({
            success: true,
            message: 'Leave request updated successfully',
            data: leaveRequest,
        });

    } catch (error) {
        next(error)
    }
}

//only for hr.  approve and reject requested reimbursments,
const updateReImBursmentRequestStatus = async (req, res, next) => {
    try {
        const reimbursementId = req.params.id;
        console.log(req.body.status)
        
        const reimbursementRequest = await Reimbursement.update({status:`${req.body.status}`}, {where:{id:reimbursementId}});
          console.log(reimbursementRequest)
        if (!reimbursementRequest[0]>0) {
            throw new ApiError(404, 'Reimbursement request not found');
        }

        res.status(200).json({
            success: true,
            message: 'ReImbusrement request updated successfully',
            data: reimbursementRequest,
        });


    } catch (error) {
        next(error)
    }
}


module.exports = {
    addUser,
    getUser,
    applyForLeave,
    getLeaveRequests,
    getReImbusrementRequests,
    applyForReImbusrment,
    getAllRequests,
    viewLeaveRequestById,
    viewReImBursmentRequestById,
    updateLeaveRequestStatus,
    updateReImBursmentRequestStatus,
    getRequestedLeaves,
    getRequestedReImbursments
}