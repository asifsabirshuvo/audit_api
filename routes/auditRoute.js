const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auditService = require('./../service/auditService');
const { check, validationResult } = require("express-validator"); //to validate form

router.post("/",[check("name").not().isEmpty(),
		check("address").not().isEmpty(),
		check("description").not().isEmpty(),
		check("latitude").isNumeric().not().isEmpty(),
		check("longitude").isNumeric().not().isEmpty(),
		check("createdAt").not().isEmpty(),
		check("updatedAt").not().isEmpty(),
		check("createdBy").not().isEmpty(),
		check("updatedBy").not().isEmpty(),
	],
	async (req, res) => {
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

router.patch("/",[check("updatedBy").not().isEmpty(),check("code").not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);		

		let validBody = 'valid';
		for (const key of Object.keys(req.body)) {
			if(req.body[key].trim()==undefined || !req.body[key].trim().length>0){
				validBody = `${key} is invalid.`;
			}
		}

		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				message: errors.array(),
			});
		}  else if(validBody!='valid'){
			return res.status(400).json({
				success: false,
				message: validBody,
			});
		}
			else{
			const data = await auditService.updateAudit(req.body);
			return res.status(data.status).json({
				success: data.success,
				message: data.message
			});
	
		
		}
	}
);



router.get("/", async (req, res) => {

	console.log(req.query);

		var page = parseInt(req.query.page?req.query.page:1);
		var limit = parseInt(req.query.limit?((req.query.limit<=10)?req.query.limit:10):10);


		const data = await auditService.getAudits(page,limit);
		return res.status(data.status).json({
			success: data.success,
			message: data.message
		});


  });


  

module.exports = router;
