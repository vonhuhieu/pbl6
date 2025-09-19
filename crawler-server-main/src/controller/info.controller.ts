import { countInfomation } from "../service/bird.service";
import catchErrors from "../utils/catchErrors";

export const countInfomationHandler = catchErrors(async (req, res) => {
    const result = await countInfomation();
    return res.status(200).json(result);
});