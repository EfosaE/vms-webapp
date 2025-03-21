import catchAsync from "../utils/catchAsync";
import db from "../utils/db";



  const getProfile = catchAsync(async(req, res)=>{
    const user = await db.user.findUnique({ where: { id: req.user!.id } });
    res.status(200).json(user);
  })