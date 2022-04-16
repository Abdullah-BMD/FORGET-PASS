const koaRouter = require('koa-router');
// const { deleteAdmin } = require("../model/adminModel")
// const { getNftById } = require("../controller/nft/getNftById")

const router = new koaRouter();

router.get('/testing', (ctx: any) => { ctx.body = "testing successful" })
// router.delete('/deleteAdmin/:id', deleteAdmin)
// router.get('/nft_detail/:id', getNftById)

export {
    router
}