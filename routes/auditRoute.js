const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auditService = require('./../service/auditService');
const { check, validationResult } = require("express-validator"); //to validate form

router.post("/", [check("name").not().isEmpty(),
        check("address").not().isEmpty(),
        check("description").not().isEmpty(),
        check("latitude").isNumeric().not().isEmpty(),
        check("longitude").isNumeric().not().isEmpty(),
        check("createdBy").not().isEmpty(),
        check("updatedBy").not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            const data = await auditService.createAudit(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });


        }
    }
);

router.patch("/", [check("updatedBy").not().isEmpty(), check("code").not().isEmpty()],
    async(req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        } else {
            const data = await auditService.updateAudit(req.body);
            return res.status(data.status).json({
                success: data.success,
                message: data.message
            });


        }
    }
);



router.get("/", async(req, res) => {

    var page = parseInt(req.query.page ? req.query.page : 1);
    var limit = parseInt(req.query.limit ? ((req.query.limit <= 10) ? req.query.limit : 10) : 10);


    const data = await auditService.getAudits(page, limit);
    return res.status(data.status).json({
        success: data.success,
        message: data.message
    });

});

router.get("/:code", async(req, res) => {


    const data = await auditService.getSingleAudit(req.params.code);
    return res.status(data.status).json({
        success: data.success,
        message: data.message
    });

});

router.delete("/:code", async(req, res) => {


    const data = await auditService.deleteSingleAudit(req.params.code);
    return res.status(data.status).json({
        success: data.success,
        message: data.message
    });

});



module.exports = router;