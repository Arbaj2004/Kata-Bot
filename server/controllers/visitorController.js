const Visitor = require("../models/visitorsSchema");
const catchAsync = require("../utils/catchAsync");

exports.visitorCountInc = catchAsync(async (req, res, next) => {
    const visitor = await Visitor.findOneAndUpdate(
        {}, // Empty query to find the first document
        { $inc: { count: 1 } }, // Increment the count
        { new: true, upsert: true } // Create the document if it doesn't exist
    );
    console.log(visitor);
    if (!visitor) {
        visitor = await Visitor.create({
            count: 1
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            count: visitor.count
        }
    });
});
exports.getVisitorCount = catchAsync(async (req, res, next) => {
    let visitor = await Visitor.findOne();
    res.status(200).json({
        status: 'success',
        data: {
            count: visitor.count / 2
        }
    });
});

